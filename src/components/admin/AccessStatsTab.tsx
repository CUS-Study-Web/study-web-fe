import { Suspense, lazy } from 'react'
import type { DayStats, ChartDataPoint } from '../../types/admin'
import Loading from '../Loading'

const BarChart = lazy(() => import('../Charts').then((m) => ({ default: m.BarChart })))
const LineChart = lazy(() => import('../Charts').then((m) => ({ default: m.LineChart })))

type AccessStatsTabProps = {
  selDate: string
  setSelDate: (d: string) => void
  selYear: string
  setSelYear: (y: string) => void
  dayStats: DayStats
  monthTraffic: ChartDataPoint[]
  monthRegs: ChartDataPoint[]
  monthVip: ChartDataPoint[]
}

const AccessStatsTab = ({
  selDate,
  setSelDate,
  selYear,
  setSelYear,
  dayStats,
  monthTraffic,
  monthRegs,
  monthVip
}: AccessStatsTabProps) => {
  // deterministic multiplier allows reactive updates on static mock data without database
  const getDailyMultiplier = () => {
    const sum = selDate
      .split('/')
      .reduce((acc, val) => acc + (parseInt(val, 10) || 0), 0)
    return 0.7 + (sum % 7) * 0.15
  }

  const getYearlyMultiplier = () => {
    const yearVal = parseInt(selYear, 10) || 2026
    return 0.8 + ((yearVal - 2020) % 6) * 0.12
  }

  const dailyMul = getDailyMultiplier()
  const yearlyMul = getYearlyMultiplier()

  const adjustDaily = (points: ChartDataPoint[]) =>
    points.map((p) => ({ ...p, value: Math.round(p.value * dailyMul) }))

  const adjustYearly = (points: ChartDataPoint[]) =>
    points.map((p) => ({ ...p, value: Math.round(p.value * yearlyMul) }))

  const dTraffic = adjustDaily(dayStats.traffic)
  const dRegs = adjustDaily(dayStats.regs)
  const dVip = adjustDaily(dayStats.vip)

  const mTraffic = adjustYearly(monthTraffic)
  const mRegs = adjustYearly(monthRegs)
  const mVip = adjustYearly(monthVip)

  return (
    <div className="flex flex-col gap-[32px]">
      {/* Daily Stats Section */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[16px] mb-[18px]">
          <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
            Thống kê theo ngày
          </div>
          <div className="flex items-center gap-[8px] px-[14px] py-[7px] bg-white rounded-[10px] border border-[var(--border-500)] shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B746D" strokeWidth="2" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="#6B746D" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-600)]">
              Chọn ngày:
            </span>
            <input
              type="text"
              value={selDate}
              onChange={(e) => setSelDate(e.target.value)}
              className="border-none outline-none [font-family:var(--font-heading)] !font-semibold text-[13px] text-[var(--text-primary)] w-[90px] bg-transparent focus:ring-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[280px]">
            <Suspense fallback={<Loading />}>
              <BarChart
                title="Lượt truy cập web"
                label="Lượt truy cập"
                labels={dTraffic.map((p) => p.label)}
                data={dTraffic.map((p) => p.value)}
                color="var(--brand-500)"
              />
            </Suspense>
          </div>
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[280px]">
            <Suspense fallback={<Loading />}>
              <BarChart
                title="Lượt đăng ký"
                label="Đăng ký"
                labels={dRegs.map((p) => p.label)}
                data={dRegs.map((p) => p.value)}
                color="var(--info-500)"
              />
            </Suspense>
          </div>
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[280px]">
            <Suspense fallback={<Loading />}>
              <BarChart
                title="Lượt mở VIP"
                label="Mở VIP"
                labels={dVip.map((p) => p.label)}
                data={dVip.map((p) => p.value)}
                color="#9B4E8D"
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Monthly Stats Section */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[16px] mb-[18px]">
          <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
            Thống kê theo tháng
          </div>
          <div className="flex items-center gap-[8px] px-[14px] py-[7px] bg-white rounded-[10px] border border-[var(--border-500)] shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B746D" strokeWidth="2" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="#6B746D" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-600)]">
              Chọn năm:
            </span>
            <input
              type="text"
              value={selYear}
              onChange={(e) => setSelYear(e.target.value)}
              className="border-none outline-none [font-family:var(--font-heading)] !font-semibold text-[13px] text-[var(--text-primary)] w-[50px] bg-transparent focus:ring-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[280px]">
            <Suspense fallback={<Loading />}>
              <LineChart
                title="Lượt truy cập web"
                label="Lượt truy cập"
                labels={mTraffic.map((p) => p.label)}
                data={mTraffic.map((p) => p.value)}
                color="var(--brand-500)"
              />
            </Suspense>
          </div>
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[280px]">
            <Suspense fallback={<Loading />}>
              <LineChart
                title="Lượt đăng ký"
                label="Đăng ký"
                labels={mRegs.map((p) => p.label)}
                data={mRegs.map((p) => p.value)}
                color="var(--info-500)"
              />
            </Suspense>
          </div>
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[280px]">
            <Suspense fallback={<Loading />}>
              <LineChart
                title="Lượt mở VIP"
                label="Mở VIP"
                labels={mVip.map((p) => p.label)}
                data={mVip.map((p) => p.value)}
                color="#9B4E8D"
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccessStatsTab
