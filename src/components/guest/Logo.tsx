import { useState } from "react";

interface LogoProps {
  imageSrc?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({
  imageSrc = "/logo.jpg",
  size = "md",
  showText = true,
  variant = "dark",
  className = "",
}: LogoProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: { box: "w-8 h-8 rounded-[var(--radius-sm)]", icon: "w-5 h-5", text: "text-xl" },
    md: { box: "w-10 h-10 rounded-[var(--radius-md)]", icon: "w-6 h-6", text: "text-2xl" },
    lg: { box: "w-12 h-12 rounded-[var(--radius-md)]", icon: "w-7 h-7", text: "text-3xl" },
  };

  const textColor = variant === "light" ? "!text-white" : "text-[#1f1f1c]";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {imageSrc && !imgError ? (
        <img
          src={imageSrc}
          alt="CUS Logo"
          onError={() => setImgError(true)}
          className={`${sizeClasses[size].box} object-contain transition-transform group-hover:scale-105`}
        />
      ) : (
        <div
          className={`${sizeClasses[size].box} bg-[#28522d] flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105`}
        >
          {/* Crest SVG Fallback */}
          <svg className={`${sizeClasses[size].icon} fill-current text-white`} viewBox="0 0 24 24">
            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm-3-8l2.5 2.5 5.5-5.5 1.5 1.5-7 7-4-4 1.5-1.5z" />
          </svg>
        </div>
      )}

      {showText && (
        <span
          className={`${sizeClasses[size].text} font-black tracking-tight ${textColor}`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          CUS
        </span>
      )}
    </div>
  );
}
