import {QUICK_STATS, ACTIVITY_LOG, DAYS_IN_WEEK, MONTHS_TO_7, MONTHS, WEEKLY_LOGINS, MONTHLY_REGS, MONTHLY_WEB_TRAFFIC} from './MockData'
import { Suspense, lazy } from 'react'
import StatsCard from '../../components/StatsCard'
import '../../styles/AdminDashboard.css'
import Loading from '../../components/Loading'

const BarChart = lazy(() => import('../../components/Charts').then((m) => ({ default: m.BarChart })))
const LineChart = lazy(() => import('../../components/Charts').then((m) => ({ default: m.LineChart })))

const AdminDashboard = () => {
    return (
      <div className="max-w-[1280px] mx-auto px-[28px] pt-[40px] pb-[80px]">
        {/* Introduction */}
        <div className="mb-[32px]">
          <h1 className="mb-[6px] tracking-[-0.5px]">Tổng quan Quản trị viên</h1>
          <p>Chào mừng trở lại! Đây là hoạt động của hệ thống CUS hôm nay.</p>
        </div>

        {/* Quick status */}
        <div className="grid grid-cols-3 gap-[20px] mb-[32px]">
            {QUICK_STATS.map((s) => {
                return <StatsCard key={s.label} {...s}/>
            })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-[20px] mb-[28px]">
          <div className="surface-card p-[22px_24px] relative h-[280px] w-full">
            <Suspense fallback={<Loading />}>
              <BarChart
                title="Đăng nhập trong tuần (7 ngày gần nhất)"
                label="Số lần đăng nhập"
                labels={DAYS_IN_WEEK}
                data={WEEKLY_LOGINS}
                color="var(--brand-500)"
              />            
            </Suspense>
          </div>
          <div className="surface-card p-[22px_24px] relative h-[280px] w-full">
            <Suspense fallback={<Loading />}>
              <LineChart
                title="Đăng ký theo tháng (Tháng 1-7/2025)"
                label="Số lượt đăng ký"
                labels={MONTHS_TO_7}
                data={MONTHLY_REGS}
                color="var(--info-500)"
              />
            </Suspense>
          </div>
          <div className="surface-card p-[22px_24px] relative h-[280px] w-full">
            <Suspense fallback={<Loading />}>
              <BarChart
                title="Truy cập web theo tháng (Tháng 1-7/2025)"
                label="Số lượt truy cập"
                labels={MONTHS}
                data={MONTHLY_WEB_TRAFFIC}
                color="var(--info-500)"
              />
            </Suspense>
          </div>
        </div>

        {/* Activity log */}
        <div className="surface-card px-[28px] py-[24px]">
          <div className="flex justify-between items-center mb-[20px]">
            <div className="[font-family:var(--font-heading)] font-bold text-[16px] text-[var(--text-primary)]">Hoạt động gần đây</div>
            <button onClick={() => alert("Tính năng đang được phát triển.")} 
                    className="![font-family:var(--font-heading)] !font-semibold !text-[12px] !text-[var(--brand-500)] !cursor-pointer">
              Xem tất cả
            </button>
          </div>
          <div className="flex flex-col">
            {ACTIVITY_LOG.map((a, i) => (
              <div
                key={`${a.text} - ${a.time}`}
                className={`flex items-center gap-[16px] py-[13px] ${i < ACTIVITY_LOG.length - 1 ? ' activity-row-bordered' : ''}`}>
                <div className="w-[8px] h-[8px] rounded-full bg-[var(--brand-500)] shrink-0" />
                <span className="[font-family:var(--font-body)] text-[13.5px] text-[var(--text-primary)] flex-1">{a.text}</span>
                <span className="[font-family:var(--font-body)] text-[12px] text-[var(--text-secondary-200)] shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

export default AdminDashboard