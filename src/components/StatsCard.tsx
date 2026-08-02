import '../styles/StatsCard.css'

type StatsCardProps = {
  label: string
  sublabel?: string
  value: number
  trend?: number
  color?: string
  icon?: React.ReactNode
}

const StatsCard = ({
  label,
  sublabel = '',
  value,
  trend,
  color,
  icon,
}: StatsCardProps) => {
  const isUp = trend !== undefined ? trend >= 0 : true
  return (
    <div className="bg-[var(--surface-card)] rounded-[18px] px-[24px] py-[26px] shadow-[var(--shadow-clay-sm)] border border-[rgba(220,233,222,0.5)]">
      {(icon || trend !== undefined) && (
        <div className="flex items-start justify-between mb-[14px]">
          {icon || <div />}
          {trend !== undefined && (
            <span className={`stats-trend stats-trend--${isUp ? 'up' : 'down'}`}>
              {isUp ? '▲' : '▼'} {Math.abs(trend)}%
            </span>
          )}
        </div>
      )}
      <div className="font-bold text-[32px] leading-none mb-[4px] [font-family:var(--font-heading)] [font-weight:800]" style={{ color }}>
        {value.toLocaleString('vi-VN')}
      </div>
      <div className="[font-family:var(--font-heading)] font-bold text-[14px] text-[var(--text-primary)]">{label}</div>
      {sublabel && (
        <div className="[font-family:var(--font-body)] text-[12px] text-[var(--text-secondary-200)] mt-[2px]">{sublabel}</div>
      )}
    </div>
  )
}

export default StatsCard