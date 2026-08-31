#!/usr/bin/env node
/**
 * Prints every question + entry ID for a Google Form, so you can paste
 * them into lib/config.ts.
 *
 * Usage:
 *   npm run entries -- "https://docs.google.com/forms/d/e/XXXX/viewform"
 *   (or just `npm run entries` and paste the URL when prompted)
 */

import readline from "node:readline/promises";

async function getUrl() {
  const arg = process.argv[2];
  if (arg) return arg;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const url = (await rl.question("Paste your Google Form link (viewform URL): ")).trim();
  rl.close();
  return url;
}

const url = await getUrl();
if (!url.includes("docs.google.com/forms")) {
  console.error("That doesn't look like a Google Form URL.");
  process.exit(1);
}

const res = await fetch(url, { redirect: "follow" });
if (!res.ok) {
  console.error(`Could not fetch the form (HTTP ${res.status}). Is it set to "anyone with the link"?`);
  process.exit(1);
}
const html = await res.text();

// Form ID (the /d/e/<id>/ part)
const idMatch = html.match(/\/forms\/d\/e\/([A-Za-z0-9_-]+)\//) ??
  url.match(/\/forms\/d\/e\/([A-Za-z0-9_-]+)/);
if (idMatch) console.log(`\nformId: "${idMatch[1]}"\n`);

// Questions live in the FB_PUBLIC_LOAD_DATA_ blob
const blobMatch = html.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*(\[[\s\S]*?\]);\s*<\/script>/);
if (!blobMatch) {
  console.error("Couldn't find form data in the page. Use the manual method in README.md.");
  process.exit(1);
}

let data;
try {
  data = JSON.parse(blobMatch[1]);
} catch {
  console.error("Couldn't parse form data. Use the manual method in README.md.");
  process.exit(1);
}

const questions = data?.[1]?.[1] ?? [];
console.log("Questions and entry IDs:");
console.log("------------------------");
for (const q of questions) {
  const title = q?.[1];
  const answers = q?.[4];
  if (!title || !Array.isArray(answers)) continue;
  for (const a of answers) {
    const entryId = a?.[0];
    const options = Array.isArray(a?.[1]) ? a[1].map((o) => o?.[0]).filter(Boolean) : [];
    console.log(`  "${title}" -> entry.${entryId}${options.length ? `   options: ${options.join(" | ")}` : ""}`);
  }
}
console.log("\nPaste these into googleForm.fields in lib/config.ts.");
console.log("For choice questions, make sure the option text in config.ts matches EXACTLY.");
