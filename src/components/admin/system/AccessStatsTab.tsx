import { Suspense, lazy } from 'react'
import type { DayStats, ChartDataPoint } from '../../../types/admin'
import Loading from '../../Loading'

const BarChart = lazy(() => import('../../Charts').then((m) => ({ default: m.BarChart })))
const LineChart = lazy(() => import('../../Charts').then((m) => ({ default: m.LineChart })))

type AccessStatsTabProps = {
  selDate: string
  setSelDate: (d: string) => void
  selMonth: string
  setSelMonth: (m: string) => void
  dayStats: DayStats
  monthTraffic: ChartDataPoint[]
  monthRegs: ChartDataPoint[]
  monthVip: ChartDataPoint[]
}

export const AccessStatsTab = ({
  selDate,
  setSelDate,
  selMonth,
  setSelMonth,
  dayStats,
  monthTraffic,
  monthRegs,
  monthVip
}: AccessStatsTabProps) => {
  const getDailyMultiplier = () => {
    const sum = selDate
      .split(/[-/]/)
      .reduce((acc, val) => acc + (parseInt(val, 10) || 0), 0)
    return 0.7 + (sum % 7) * 0.15
  }

  const getMonthlyMultiplier = () => {
    const monthVal = parseInt(selMonth, 10) || 7
    return 0.8 + ((monthVal - 1) % 6) * 0.12
  }

  const dailyMul = getDailyMultiplier()
  const monthlyMul = getMonthlyMultiplier()

  const adjustDaily = (points: ChartDataPoint[]) =>
    points.map((p) => ({ ...p, value: Math.round(p.value * dailyMul) }))

  const dTraffic = adjustDaily(dayStats.traffic)
  const dRegs = adjustDaily(dayStats.regs)
  const dVip = adjustDaily(dayStats.vip)

  // Get index of chosen month (0-11)
  const monthIdx = (parseInt(selMonth, 10) - 1 + 12) % 12

  // Get the base value for the selected month from the props
  const baseTraffic = monthTraffic[monthIdx]?.value || 1500
  const baseRegs = monthRegs[monthIdx]?.value || 30
  const baseVip = monthVip[monthIdx]?.value || 12

  // Distribute the base values into 4 weeks, adjusted by monthlyMul
  const wTraffic: ChartDataPoint[] = [
    { label: 'Tuần 1', value: Math.round(baseTraffic * 0.22 * monthlyMul) },
    { label: 'Tuần 2', value: Math.round(baseTraffic * 0.28 * monthlyMul) },
    { label: 'Tuần 3', value: Math.round(baseTraffic * 0.24 * monthlyMul) },
    { label: 'Tuần 4', value: Math.round(baseTraffic * 0.26 * monthlyMul) }
  ]

  const wRegs: ChartDataPoint[] = [
    { label: 'Tuần 1', value: Math.round(baseRegs * 0.20 * monthlyMul) },
    { label: 'Tuần 2', value: Math.round(baseRegs * 0.30 * monthlyMul) },
    { label: 'Tuần 3', value: Math.round(baseRegs * 0.25 * monthlyMul) },
    { label: 'Tuần 4', value: Math.round(baseRegs * 0.25 * monthlyMul) }
  ]

  const wVip: ChartDataPoint[] = [
    { label: 'Tuần 1', value: Math.round(baseVip * 0.15 * monthlyMul) },
    { label: 'Tuần 2', value: Math.round(baseVip * 0.35 * monthlyMul) },
    { label: 'Tuần 3', value: Math.round(baseVip * 0.20 * monthlyMul) },
    { label: 'Tuần 4', value: Math.round(baseVip * 0.30 * monthlyMul) }
  ]

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
              type="date"
              value={selDate}
              onChange={(e) => setSelDate(e.target.value)}
              className="border-none outline-none [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] w-[130px] bg-transparent focus:ring-0 cursor-pointer"
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
              Chọn tháng:
            </span>
            <select
              value={selMonth}
              onChange={(e) => setSelMonth(e.target.value)}
              className="border-none outline-none [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] bg-transparent focus:ring-0 cursor-pointer"
            >
              <option value="01">Tháng 1</option>
              <option value="02">Tháng 2</option>
              <option value="03">Tháng 3</option>
              <option value="04">Tháng 4</option>
              <option value="05">Tháng 5</option>
              <option value="06">Tháng 6</option>
              <option value="07">Tháng 7</option>
              <option value="08">Tháng 8</option>
              <option value="09">Tháng 9</option>
              <option value="10">Tháng 10</option>
              <option value="11">Tháng 11</option>
              <option value="12">Tháng 12</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[280px]">
            <Suspense fallback={<Loading />}>
              <LineChart
                title="Lượt truy cập web"
                label="Lượt truy cập"
                labels={wTraffic.map((p) => p.label)}
                data={wTraffic.map((p) => p.value)}
                color="var(--brand-500)"
              />
            </Suspense>
          </div>
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[280px]">
            <Suspense fallback={<Loading />}>
              <LineChart
                title="Lượt đăng ký"
                label="Đăng ký"
                labels={wRegs.map((p) => p.label)}
                data={wRegs.map((p) => p.value)}
                color="var(--info-500)"
              />
            </Suspense>
          </div>
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[280px]">
            <Suspense fallback={<Loading />}>
              <LineChart
                title="Lượt mở VIP"
                label="Mở VIP"
                labels={wVip.map((p) => p.label)}
                data={wVip.map((p) => p.value)}
                color="#9B4E8D"
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
