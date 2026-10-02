type Brand = "github" | "linkedin" | "instagram";
export default function BrandIcon({
  brand,
  size = 18,
}: {
  brand: Brand;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {brand === "instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
        </>
      ) : brand === "linkedin" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7.5 10v7M7.5 7v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4" />
        </>
      ) : (
        <path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.2a5.6 5.6 0 0 0-1.5-3.9 5.2 5.2 0 0 0-.1-3.8S18 1 15 3a13.4 13.4 0 0 0-6 0C6 1 4.8 1.4 4.8 1.4a5.2 5.2 0 0 0-.1 3.8A5.6 5.6 0 0 0 3.2 9c0 5.6 3.5 6.8 6.8 7.2A3.5 3.5 0 0 0 9 19v3" />
      )}
    </svg>
  );
}
