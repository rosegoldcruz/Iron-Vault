type VaultMarkProps = {
  className?: string;
};

export function VaultMark({ className = "" }: VaultMarkProps) {
  return (
    <div
      className={`cut-corners steel-sweep relative isolate flex aspect-square items-center justify-center overflow-hidden border border-white/12 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_18%),linear-gradient(145deg,rgba(212,176,106,0.22),rgba(73,75,81,0.42)_38%,rgba(12,12,14,0.96)_76%)] shadow-[0_32px_80px_rgba(0,0,0,0.48)] ${className}`}
    >
      <div className="absolute inset-[8%] cut-corners border border-white/12 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_28%),linear-gradient(180deg,rgba(16,16,18,0.84),rgba(8,8,9,0.98))]" />
      <div className="absolute inset-[15%] cut-corners border border-[rgba(212,176,106,0.3)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%),repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_2px,transparent_2px,transparent_8px)] opacity-80" />
      <svg
        viewBox="0 0 240 240"
        className="relative z-10 h-[58%] w-[58%] drop-shadow-[0_0_18px_rgba(212,176,106,0.28)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="vaultMarkGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0cf86" />
            <stop offset="55%" stopColor="#d4b06a" />
            <stop offset="100%" stopColor="#8a6b35" />
          </linearGradient>
        </defs>
        <path
          d="M58 48h30v144H58z"
          fill="url(#vaultMarkGradient)"
          opacity="0.96"
        />
        <path
          d="M104 48h31l25 90 24-90h31l-43 144h-26z"
          fill="url(#vaultMarkGradient)"
          opacity="0.96"
        />
        <path
          d="M54 40h132l-8 22H62z"
          fill="#fff7e8"
          opacity="0.16"
        />
      </svg>
      <div className="absolute inset-x-[14%] bottom-[14%] h-px bg-[linear-gradient(90deg,transparent,rgba(212,176,106,0.72),transparent)]" />
    </div>
  );
}