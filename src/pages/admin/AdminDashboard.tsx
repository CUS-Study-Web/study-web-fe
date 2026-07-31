import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {Bar, Line} from 'react-chartjs-2'
import {GenerateOptions, GenerateData} from '../../utils/ChartHelpers'
import {QUICK_STATS, ACTIVITY_LOG, DAYS_IN_WEEK, MONTHS_TO_7, MONTHS, WEEKLY_LOGINS, MONTHLY_REGS, MONTHLY_WEB_TRAFFIC} from './MockData'
import StatsCard from '../../components/StatsCard'
import '../../styles/AdminDashboard.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

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
            <Bar options={GenerateOptions('Đăng nhập trong tuần (7 ngày gần nhất)')} 
                data={GenerateData(DAYS_IN_WEEK, 'Số lần đăng nhập', WEEKLY_LOGINS, '#2C5A31')} />
          </div>
          <div className="surface-card p-[22px_24px] relative h-[280px] w-full">
            <Line options={GenerateOptions('Đăng ký theo tháng (Tháng 1-7/2025)')}
                data={GenerateData(MONTHS_TO_7, 'Số lượt đăng ký', MONTHLY_REGS, '#2F6FAE')}/>
          </div>
          <div className="surface-card p-[22px_24px] relative h-[280px] w-full">
            <Bar options={GenerateOptions('Truy cập web theo tháng (Tháng 1-7/2025)')} 
                data={GenerateData(MONTHS, 'Số lượt truy cập', MONTHLY_WEB_TRAFFIC, '#2F6FAE')} />
          </div>
        </div>

        {/* Activity log */}
        <div className="surface-card px-[28px] py-[24px]">
          <div className="flex justify-between items-center mb-[20px]">
            <div className="[font-family:var(--font-heading)] font-bold text-[16px] text-[#1b1f1c]">Hoạt động gần đây</div>
            <span className="[font-family:var(--font-heading)] font-semibold text-[12px] text-[var(--brand-500)] cursor-pointer">Xem tất cả</span>
          </div>
          <div className="flex flex-col">
            {ACTIVITY_LOG.map((a, i) => (
              <div
                key={`${a.text} - ${a.time}`}
                className={`flex items-center gap-[16px] py-[13px] ${i < ACTIVITY_LOG.length - 1 ? ' activity-row-bordered' : ''}`}>
                <div className="w-[8px] h-[8px] rounded-full bg-[var(--brand-500)] shrink-0" />
                <span className="[font-family:var(--font-body)] text-[13.5px] text-[#1b1f1c] flex-1">{a.text}</span>
                <span className="[font-family:var(--font-body)] text-[12px] text-[#a0aaa2] shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

export default AdminDashboard