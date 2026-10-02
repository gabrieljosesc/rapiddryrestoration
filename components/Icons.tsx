import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };
}

export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);

export const DropIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3s-6.5 7-6.5 11.5a6.5 6.5 0 0 0 13 0C18.5 10 12 3 12 3z" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9.5C7.5 20.5 4 17 4 12V6l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const FanIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="2" />
    <path d="M12 10c0-3.5 1.5-6 4-6 2 0 3 1.5 3 3 0 2-2 3-5 3h-2z" />
    <path d="M14 12c3.5 0 6 1.5 6 4 0 2-1.5 3-3 3-2 0-3-2-3-5v-2z" />
    <path d="M12 14c0 3.5-1.5 6-4 6-2 0-3-1.5-3-3 0-2 2-3 5-3h2z" />
    <path d="M10 12c-3.5 0-6-1.5-6-4 0-2 1.5-3 3-3 2 0 3 2 3 5v2z" />
  </svg>
);

export const MouldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4" />
    <circle cx="12" cy="12" r="7.5" strokeDasharray="2 3" />
  </svg>
);

export const HouseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4.5-4.5" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12l4 4L19 7" />
  </svg>
);

export const CheckCircleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </svg>
);

export const ArrowIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
    <circle cx="12" cy="10" r="2.2" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5z" />
  </svg>
);

export const QuoteIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M7.5 6C5 6 3 8 3 10.5V18h7v-7H6.5c0-1.4 1-2.5 2.5-2.5V6H7.5zm10 0C15 6 13 8 13 10.5V18h7v-7h-3.5c0-1.4 1-2.5 2.5-2.5V6h-1.5z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const ChevronIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const LeakIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3s-5 5.5-5 9a5 5 0 0 0 10 0c0-3.5-5-9-5-9z" />
    <path d="M12 9s-2 2.2-2 3.6a2 2 0 0 0 4 0C14 11.2 12 9 12 9z" />
    <path d="M12 17v4" />
  </svg>
);

export const ExtractionIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3s-4.5 5-4.5 8a4.5 4.5 0 0 0 9 0C16.5 8 12 3 12 3z" />
    <path d="M4 17c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 2 .7 2.5 1" />
    <path d="M4 20.5c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0" />
  </svg>
);

export const PipeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 8h6a3 3 0 0 1 3 3v2a3 3 0 0 0 3 3h6" />
    <path d="M3 5v6M21 13v6" />
    <path d="M8 13l-1.5 2M9.5 14.5L8 17M16 7l1.5-2M14.5 8.5L16 6" strokeWidth="1.4" />
  </svg>
);

export const BasementIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 10l9-6 9 6" />
    <path d="M5 9.5V20h14V9.5" />
    <path d="M7 16c1.2-.8 2.3-.8 3.5 0s2.3.8 3.5 0 2.3-.8 3 0" />
  </svg>
);

export const SewerIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2.5 2" />
    <path d="M6.5 16.5c1.2-.8 2.3-.8 3.5 0s2.3.8 3.5 0 2.3-.8 3.5 0" strokeWidth="1.4" />
  </svg>
);

export const TearOutIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 20h16" />
    <path d="M6 20V9l6-5 6 5v11" />
    <path d="M9 20v-5h6v5" strokeDasharray="2 2" />
    <path d="M12 8v3" />
  </svg>
);

export const DryingIcon = FanIcon;

export const DocumentIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5M10 13h6M10 17h6" />
  </svg>
);

export const CameraIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
);

export const ThermometerIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M10 4a2 2 0 0 1 4 0v9.5a3.5 3.5 0 1 1-4 0z" />
    <path d="M12 9v6" />
  </svg>
);

export const BadgeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l2.2 1.7 2.7-.3 1 2.5 2.5 1-.3 2.7L21.5 13l-1.7 2.2.3 2.7-2.5 1-1 2.5-2.7-.3L12 22.5l-2.2-1.7-2.7.3-1-2.5-2.5-1 .3-2.7L2.5 13l1.7-2.2-.3-2.7 2.5-1 1-2.5 2.7.3z" />
    <path d="M9 13l2 2 4-5" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const CalendarIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const ExternalIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </svg>
);

export const AlertIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l10 18H2z" />
    <path d="M12 10v4M12 17.5v.5" />
  </svg>
);

/** Icon lookup used by content-driven cards. */
export const serviceIcons = {
  leak: LeakIcon,
  extraction: ExtractionIcon,
  pipes: PipeIcon,
  basement: BasementIcon,
  sewer: SewerIcon,
  tearout: TearOutIcon,
  drying: DryingIcon,
  mould: MouldIcon,
} as const;

export const quickIcons = {
  drop: DropIcon,
  shield: ShieldIcon,
  fan: FanIcon,
  mould: MouldIcon,
  house: HouseIcon,
  clock: ClockIcon,
} as const;

export const processIcons = {
  phone: PhoneIcon,
  search: SearchIcon,
  drop: DropIcon,
  fan: FanIcon,
  house: HouseIcon,
} as const;
