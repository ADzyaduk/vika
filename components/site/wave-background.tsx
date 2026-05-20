type Props = {
  variant?: "hero" | "section" | "deep";
  className?: string;
};

export const WaveBackground = ({ variant = "section", className = "" }: Props): React.ReactElement => {
  if (variant === "hero") {
    return (
      <div className={`wave-bg ${className}`} aria-hidden>
        {/* Layered soft gradient orbs */}
        <div className="absolute -top-32 -left-32 h-[60rem] w-[60rem] rounded-full opacity-70 blur-3xl animate-drift-slow"
          style={{ background: "radial-gradient(circle at center, #f3e6ce 0%, #f3e6ce00 60%)" }} />
        <div className="absolute top-1/3 -right-40 h-[55rem] w-[55rem] rounded-full opacity-60 blur-3xl animate-drift-medium"
          style={{ background: "radial-gradient(circle at center, #e8d6b8 0%, #e8d6b800 60%)" }} />
        <div className="absolute -bottom-40 left-1/4 h-[50rem] w-[50rem] rounded-full opacity-50 blur-3xl animate-drift-fast"
          style={{ background: "radial-gradient(circle at center, #efe1c8 0%, #efe1c800 60%)" }} />

        {/* Animated wavy lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#dccab0" stopOpacity="0" />
              <stop offset="50%" stopColor="#b89978" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#dccab0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-stroke-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e7ddcc" stopOpacity="0" />
              <stop offset="50%" stopColor="#b89978" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#e7ddcc" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="animate-drift-slow" style={{ transformOrigin: "center" }}>
            <path
              d="M -100 540 Q 280 460 560 540 T 1240 540 T 1540 540"
              fill="none"
              stroke="url(#wave-stroke)"
              strokeWidth="1.2"
            />
            <path
              d="M -100 600 Q 320 520 620 600 T 1280 600 T 1540 600"
              fill="none"
              stroke="url(#wave-stroke-2)"
              strokeWidth="1"
            />
            <path
              d="M -100 660 Q 360 580 680 660 T 1320 660 T 1540 660"
              fill="none"
              stroke="url(#wave-stroke)"
              strokeWidth="0.8"
              opacity="0.6"
            />
          </g>
        </svg>

        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>
    );
  }

  if (variant === "deep") {
    return (
      <div className={`wave-bg ${className}`} aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-[80rem] rounded-full opacity-50 blur-3xl animate-drift-slow"
          style={{ background: "radial-gradient(ellipse at center, #e8d6b8 0%, #e8d6b800 60%)" }} />
        <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path
            d="M 0 100 Q 360 40 720 100 T 1440 100 L 1440 200 L 0 200 Z"
            fill="#f5efe4"
            opacity="0.6"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`wave-bg ${className}`} aria-hidden>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[36rem] w-[60rem] rounded-full opacity-40 blur-3xl animate-drift-slow"
        style={{ background: "radial-gradient(ellipse at center, #f3e6ce 0%, #f3e6ce00 60%)" }} />
    </div>
  );
};
