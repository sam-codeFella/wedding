type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const HaldiIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="2.4" />
    <path d="M12 9.6C10.5 6 11 3.5 12 3c1 .5 1.5 3 0 6.6ZM12 14.4c1.5 3.600 1 6.100 0 6.600-1-.5-1.500-3-0-6.600ZM9.600 12C6 10.500 3.500 11 3 12c.5 1 3 1.500 6.600 0ZM14.400 12c3.600 1.500 6.100 1 6.600 0-.5-1-3-1.500-6.600 0Z" />
  </svg>
);
export const RingIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="15" r="5.500" />
    <path d="m9.500 6.500 2.500-3.500 2.500 3.500-2.500 2.500Z" />
  </svg>
);
export const SparkleIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3c.6 4.500 2.500 6.400 7 7-4.500.6-6.400 2.500-7 7-.6-4.500-2.500-6.400-7-7 4.500-.6 6.400-2.500 7-7ZM19 16.500c.2 1.500.8 2.100 2 2.500-1.200.4-1.800 1-2 2.500-.2-1.500-.8-2.100-2-2.500 1.200-.4 1.800-1 2-2.500Z" />
  </svg>
);
export const StayIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 20V10a8 8 0 0 1 16 0v10M2.500 20h19M9 20v-5a3 3 0 0 1 6 0v5" />
  </svg>
);
export const PinIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21s-6.500-5.800-6.500-11a6.500 6.500 0 0 1 13 0c0 5.200-6.500 11-6.500 11Z" />
    <circle cx="12" cy="10" r="2.300" />
  </svg>
);
export const CalendarIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="3.500" y="5" width="17" height="15.500" rx="2" />
    <path d="M3.500 10h17M8 3v4M16 3v4" />
  </svg>
);
export const eventIcons = { haldi: HaldiIcon, ring: RingIcon, sparkle: SparkleIcon };
