import { useState } from "react";
import { GraduationCap } from "lucide-react";

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
          className={`${sizeClasses[size].box} bg-[#004109] flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105`}
        >
          <GraduationCap className={`${sizeClasses[size].icon} text-white`} />
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
