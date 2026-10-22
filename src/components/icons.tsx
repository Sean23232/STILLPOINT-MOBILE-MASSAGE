export function Icon({ name, className = "h-6 w-6" }: { name: "path" | "person" | "layers" | "message"; className?: string }) {
  const common = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    className,
    "aria-hidden": true as const,
  };

  if (name === "path") {
    return (
      <svg {...common}>
        <path d="M6 22.5c4.5-1 6.5-7 8-11 1.2 3.2 3.2 6.2 7 7.2" />
        <circle cx="8" cy="22" r="1.4" fill="currentColor" stroke="none" />
        <path d="M21 12.5h4.5V8" />
      </svg>
    );
  }
  if (name === "person") {
    return (
      <svg {...common}>
        <circle cx="16" cy="11" r="3.2" />
        <path d="M8.5 24.5c1.2-3.6 3.8-5.3 7.5-5.3s6.3 1.7 7.5 5.3" />
      </svg>
    );
  }
  if (name === "layers") {
    return (
      <svg {...common}>
        <path d="M16 7.5 26 12.5 16 17.5 6 12.5 16 7.5Z" />
        <path d="M8 16.5 16 20.5 24 16.5" />
        <path d="M8 20.5 16 24.5 24 20.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M7 9.5h18v10.5H12.5L7 23.5V9.5Z" />
      <path d="M11 13.5h10M11 16.5h6" />
    </svg>
  );
}
