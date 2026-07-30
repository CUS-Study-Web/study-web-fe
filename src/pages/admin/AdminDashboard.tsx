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
      <div className="admin-dashboard">
        {/* Introduction */}
        <div className="admin-dashboard__intro">
          <h1 className="admin-dashboard__title">Tổng quan Quản trị viên</h1>
          <p className="admin-dashboard__subtitle">Chào mừng trở lại! Đây là hoạt động của hệ thống CUS hôm nay.</p>
        </div>

        {/* Quick status */}
        <div className="admin-dashboard__stats-grid">
            {QUICK_STATS.map((s) => {
                return <StatsCard 
                            key={s.label}
                            {...s}/>
            })}
        </div>

        {/* Charts row */}
        <div className="admin-dashboard__charts-grid">
          <div className="admin-dashboard__card">
            <Bar options={GenerateOptions('Đăng nhập trong tuần (7 ngày gần nhất)')} 
                data={GenerateData(DAYS_IN_WEEK, 'Số lần đăng nhập', WEEKLY_LOGINS, '#2C5A31')} />
          </div>
          <div className="admin-dashboard__card">
            <Line options={GenerateOptions('Đăng ký theo tháng (Tháng 1-7/2025)')}
                data={GenerateData(MONTHS_TO_7, 'Số lượt đăng ký', MONTHLY_REGS, '#2F6FAE')}/>
          </div>
          <div className="admin-dashboard__card">
            <Bar options={GenerateOptions('Truy cập web theo tháng (Tháng 1-7/2025)')} 
                data={GenerateData(MONTHS, 'Số lượt truy cập', MONTHLY_WEB_TRAFFIC, '#2F6FAE')} />
          </div>
        </div>

        {/* Activity log */}
        <div className="admin-dashboard__activity">
          <div className="admin-dashboard__activity-header">
            <div className="admin-dashboard__activity-title">Hoạt động gần đây</div>
            <span className="admin-dashboard__activity-see-all">Xem tất cả</span>
          </div>
          <div className="admin-dashboard__activity-list">
            {ACTIVITY_LOG.map((a, i) => (
              <div
                key={i}
                className={`admin-dashboard__activity-row${i < ACTIVITY_LOG.length - 1 ? ' admin-dashboard__activity-row--bordered' : ''}`}>
                <div className="admin-dashboard__activity-dot" />
                <span className="admin-dashboard__activity-text">{a.text}</span>
                <span className="admin-dashboard__activity-time">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

export default AdminDashboard