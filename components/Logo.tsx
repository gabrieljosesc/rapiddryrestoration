import Link from "next/link";
import { site } from "@/lib/site";

/**
 * RapidDry Restoration wordmark: a house outline with a water drop inside,
 * "Rapid" in navy and "Dry" in brand blue, "RESTORATION" letter-spaced below.
 */
export function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="logo__mark"
    >
      <path
        d="M24 4L44 22v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V22L24 4z"
        fill="var(--navy)"
      />
      <path
        d="M24 9.5L40 24v16H8V24L24 9.5z"
        fill="var(--blue)"
      />
      <path
        d="M24 16s-7 8-7 13.5a7 7 0 0 0 14 0C31 24 24 16 24 16z"
        fill="#ffffff"
      />
      <path
        d="M24 27.5s-2.6 3-2.6 5a2.6 2.6 0 0 0 5.2 0c0-2-2.6-5-2.6-5z"
        fill="var(--red)"
      />
    </svg>
  );
}

export function Logo({
  variant = "dark",
  size = 44,
}: {
  variant?: "dark" | "light";
  size?: number;
}) {
  return (
    <Link
      href="/"
      className={`logo logo--${variant}`}
      aria-label={`${site.name} home`}
    >
      <LogoMark size={size} />
      <span className="logo__text">
        <span className="logo__name">
          <span className="logo__rapid">Rapid</span>
          <span className="logo__dry">Dry</span>
        </span>
        <span className="logo__sub">Restoration</span>
      </span>
    </Link>
  );
}
