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
  trend = 0,
  color,
  icon,
}: StatsCardProps) => {
  const isUp = trend >= 0
  return (
    <div className="stats-card">
      <div className="stats-card__header">
        {icon}
        <span className={`stats-card__trend stats-card__trend--${isUp ? 'up' : 'down'}`}>
          {isUp ? '▲' : '▼'} {Math.abs(trend)}%
        </span>
      </div>
      <div className="stats-card__value" style={{ color }}>{value.toLocaleString('vi-VN')}</div>
      <div className="stats-card__label">{label}</div>
      <div className="stats-card__sublabel">{sublabel}</div>
    </div>
  )
}

export default StatsCard