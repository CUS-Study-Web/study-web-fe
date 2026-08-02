import IconBox from '../../components/IconBox'

// NOTE: icons coupled to data, extract to a config map when data comes from API
const QUICK_STATS = [
    { label: "Lượt truy cập", sublabel: "Tuần này", value: 9_430, trend: +12.4, color: "var(--brand-500)",
    icon: (
        <IconBox bg="var(--brand-soft-500)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="var(--brand-500)" strokeWidth="2"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="var(--brand-500)" strokeWidth="2" strokeLinecap="round"/></svg> 
        </IconBox>
    )},
    { label: "Lượt đăng ký", sublabel: "Tháng này", value: 43, trend: +8.2, color: "var(--info-500)",
    icon: (
        <IconBox bg="var(--info-50)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="var(--info-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>   
        </IconBox>
    )},
    { label: "Lượt mở VIP", sublabel: "Tháng này", value: 18, trend: -3.5, color: "var(--warning-500)",
    icon: (
        <IconBox bg="var(--warning-50)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" stroke="var(--warning-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>   
        </IconBox>
    )},
]

const ACTIVITY_LOG = [
    { time: "14:28:58", text: "Quản trị viên đã đăng nhập" },
    { time: "13:45:12", text: "Học viên Nguyễn Minh Khoa đăng ký khóa V-ACT" },
    { time: "12:30:05", text: "Yêu cầu nâng cấp VIP từ Vũ Ngọc Hà" },
    { time: "11:15:33", text: "Tài liệu mới được tải lên bởi trợ giảng" },
    { time: "10:02:47", text: "Học viên Trần Hữu Long nộp bài thi V-SAT" },
    { time: "09:18:20", text: "Yêu cầu nâng cấp VIP từ Lê Quốc Bảo" },
]

const DAYS_IN_WEEK = [
  'T2', 
  'T3', 
  'T4', 
  'T5', 
  'T6', 
  'T7', 
  'CN',
]

const MONTHS_TO_7 = [
  'T1',
  'T2', 
  'T3', 
  'T4', 
  'T5', 
  'T6', 
  'T7', 
]

const MONTHS = [
  'T1',
  'T2', 
  'T3', 
  'T4', 
  'T5', 
  'T6', 
  'T7', 
  'T8', 
  'T9', 
  'T10', 
  'T11', 
  'T12', 
]

const WEEKLY_LOGINS = [
    38,
    52,
    45,
    61,
    47,
    29,
    18,
]

const MONTHLY_REGS = [
    14,
    22,
    18,
    31,
    27,
    39,
    43,
]

const MONTHLY_WEB_TRAFFIC = [
    980,
    1120,
    1450,
    1380,
    1690,
    1820,
    1847,
    2010,
    1930,
    2140,
    2280,
    2450,
]

export {QUICK_STATS, ACTIVITY_LOG, DAYS_IN_WEEK, MONTHS_TO_7, MONTHS, WEEKLY_LOGINS, MONTHLY_REGS, MONTHLY_WEB_TRAFFIC}