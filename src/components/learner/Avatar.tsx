type AvatarProps = {
  size?: "sm" | "lg";
  showEdit?: boolean;
  className?: string;
};

export default function Avatar({ size = "sm", showEdit, className = "" }: AvatarProps) {
  const isLg = size === "lg";
  const containerSize = isLg ? "w-20 h-20" : "w-10 h-10";
  const iconSize = isLg ? "40" : "20";
  const borderClass = isLg ? "border-2 border-[#3c6d42]" : "";
  const bgClass = isLg ? "bg-[#254d2d]" : "bg-[var(--brand-base-600)]";

  return (
    <div className={`relative ${className}`}>
      <div className={`${containerSize} rounded-full ${bgClass} ${borderClass} flex items-center justify-center ${isLg ? "shadow-lg" : ""}`}>
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="#9cb6a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      {showEdit && (
        <button
          className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white border border-[var(--border-300)] flex items-center justify-center cursor-pointer shadow-sm hover:bg-gray-100 transition-colors"
          aria-label="Đổi ảnh đại diện"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </button>
      )}
    </div>
  );
}
