interface AssistantBreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface AssistantCoursePageHeaderProps {
  breadcrumbs: AssistantBreadcrumbItem[];
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}

export default function AssistantCoursePageHeader({
  breadcrumbs,
  title,
  subtitle,
  rightSlot,
}: AssistantCoursePageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-1">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-tertiary)]">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
              {crumb.onClick ? (
                <span
                  onClick={crumb.onClick}
                  className="font-[family-name:var(--font-body)] text-[13px] text-[var(--brand-600)] cursor-pointer hover:underline"
                >
                  {crumb.label}
                </span>
              ) : (
                <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Title */}
        <div className="font-[family-name:var(--font-heading)] font-bold text-[22px] text-[var(--text-primary)] leading-tight">
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)] mt-0.5">
            {subtitle}
          </div>
        )}
      </div>

      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  );
}
