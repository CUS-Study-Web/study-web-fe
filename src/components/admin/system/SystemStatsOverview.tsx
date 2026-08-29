import StatsCard from '../../StatsCard'

type SystemStatsOverviewProps = {
  regularCount: number
  vipCount: number
  assistantCount: number
  lockedCount: number
}

export const SystemStatsOverview = ({
  regularCount,
  vipCount,
  assistantCount,
  lockedCount
}: SystemStatsOverviewProps) => {
  const stats = [
    { label: 'Tài khoản thường', value: regularCount, color: 'var(--brand-500)' },
    { label: 'Tài khoản VIP', value: vipCount, color: 'var(--warning-500)' },
    { label: 'Trợ giảng', value: assistantCount, color: 'var(--info-500)' },
    { label: 'Tài khoản bị khóa', value: lockedCount, color: 'var(--error-500)' }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px] mb-[28px]">
      {stats.map((s) => (
        <StatsCard key={s.label} label={s.label} value={s.value} color={s.color} />
      ))}
    </div>
  )
}
