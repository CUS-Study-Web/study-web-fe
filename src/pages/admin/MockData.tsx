import IconBox from '../../components/IconBox'
import type { Student, Assistant, DayStats, ChartDataPoint, AsstActivity } from '../../types/admin'

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

const INIT_STUDENTS: Student[] = [
  { id: 1, name: "Nguyễn Minh Khoa", email: "khoa.nm@gmail.com", phone: "0911 234 567", joined: "12/01/2025", course: "V-ACT", progress: 72, examsDone: 5, avgScore: 7.4, lastLogin: "Hôm nay, 09:15", vip: true,  status: "Hoạt động" },
  { id: 2, name: "Trần Thị Lan Anh",  email: "lananh.tt@gmail.com", phone: "0922 345 678", joined: "03/02/2025", course: "HSA",   progress: 55, examsDone: 3, avgScore: 6.8, lastLogin: "Hôm nay, 08:30", vip: false, status: "Hoạt động" },
  { id: 3, name: "Lê Quốc Bảo",       email: "bao.lq@gmail.com",   phone: "0933 456 789", joined: "18/02/2025", course: "V-SAT", progress: 38, examsDone: 2, avgScore: 5.9, lastLogin: "17/07/2025",     vip: false, status: "Chờ duyệt" },
  { id: 4, name: "Phạm Thùy Dung",    email: "dung.pt@gmail.com",  phone: "0944 567 890", joined: "25/02/2025", course: "HSCA",  progress: 91, examsDone: 8, avgScore: 8.7, lastLogin: "Hôm nay, 11:02", vip: true,  status: "Hoạt động" },
  { id: 5, name: "Hoàng Văn Đức",     email: "duc.hv@gmail.com",   phone: "0955 678 901", joined: "01/03/2025", course: "THPT QG", progress: 44, examsDone: 4, avgScore: 6.2, lastLogin: "16/07/2025", vip: false, status: "Hoạt động" },
  { id: 6, name: "Vũ Ngọc Hà",        email: "ha.vn@gmail.com",    phone: "0966 789 012", joined: "07/03/2025", course: "V-ACT", progress: 20, examsDone: 1, avgScore: 5.1, lastLogin: "15/07/2025",     vip: false, status: "Chờ duyệt" },
  { id: 7, name: "Đỗ Thanh Tùng",     email: "tung.dt@gmail.com",  phone: "0977 890 123", joined: "14/03/2025", course: "HSA",   progress: 63, examsDone: 6, avgScore: 7.1, lastLogin: "Hôm nay, 07:50", vip: true,  status: "Hoạt động" },
]

const INIT_ASSISTANTS: Assistant[] = [
  { id: 1, name: "Trần Minh Hiếu", email: "hieu.tm@cus.edu.vn", phone: "0901 111 222", joined: "05/01/2025", courses: 3, exams: 12, students: 78, lastActive: "Hôm nay, 10:42", status: "Hoạt động" },
  { id: 2, name: "Lê Thị Phương", email: "phuong.lt@cus.edu.vn", phone: "0912 333 444", joined: "12/02/2025", courses: 2, exams: 8, students: 54, lastActive: "Hôm qua, 16:05", status: "Hoạt động" },
  { id: 3, name: "Nguyễn Quang Vinh", email: "vinh.nq@cus.edu.vn", phone: "0923 555 666", joined: "01/03/2025", courses: 1, exams: 5, students: 32, lastActive: "18/07/2025", status: "Tạm nghỉ" },
]

const DEFAULT_DAY_STATS: DayStats = {
  traffic: [
    { label: "00:00", value: 120 },
    { label: "04:00", value: 80 },
    { label: "08:00", value: 450 },
    { label: "12:00", value: 680 },
    { label: "16:00", value: 890 },
    { label: "20:00", value: 1100 }
  ],
  regs: [
    { label: "00:00", value: 2 },
    { label: "04:00", value: 0 },
    { label: "08:00", value: 8 },
    { label: "12:00", value: 15 },
    { label: "16:00", value: 22 },
    { label: "20:00", value: 35 }
  ],
  vip: [
    { label: "00:00", value: 0 },
    { label: "04:00", value: 0 },
    { label: "08:00", value: 2 },
    { label: "12:00", value: 5 },
    { label: "16:00", value: 7 },
    { label: "20:00", value: 12 }
  ]
}

const MONTHLY_WEB_TRAFFIC_DATA: ChartDataPoint[] = [
  { label: "T1", value: 980 },
  { label: "T2", value: 1120 },
  { label: "T3", value: 1450 },
  { label: "T4", value: 1380 },
  { label: "T5", value: 1690 },
  { label: "T6", value: 1820 },
  { label: "T7", value: 1847 },
  { label: "T8", value: 2010 },
  { label: "T9", value: 1930 },
  { label: "T10", value: 2140 },
  { label: "T11", value: 2280 },
  { label: "T12", value: 2450 }
]

const MONTHLY_REGS_FULL: ChartDataPoint[] = [
  { label: "T1", value: 14 },
  { label: "T2", value: 22 },
  { label: "T3", value: 18 },
  { label: "T4", value: 31 },
  { label: "T5", value: 27 },
  { label: "T6", value: 39 },
  { label: "T7", value: 43 },
  { label: "T8", value: 45 },
  { label: "T9", value: 41 },
  { label: "T10", value: 48 },
  { label: "T11", value: 52 },
  { label: "T12", value: 58 }
]

const MONTHLY_VIP: ChartDataPoint[] = [
  { label: "T1", value: 5 },
  { label: "T2", value: 8 },
  { label: "T3", value: 6 },
  { label: "T4", value: 12 },
  { label: "T5", value: 9 },
  { label: "T6", value: 15 },
  { label: "T7", value: 18 },
  { label: "T8", value: 20 },
  { label: "T9", value: 14 },
  { label: "T10", value: 22 },
  { label: "T11", value: 25 },
  { label: "T12", value: 28 }
]

const WEBSITE_COURSES = [
  { id: 1, title: "V-ACT", subtitle: "Luyện thi ACT theo chuẩn Mỹ", unit: "CUS Education", desc: "Chương trình luyện thi toàn diện cho kỳ thi ACT." },
  { id: 2, title: "V-SAT", subtitle: "Luyện thi SAT chuẩn quốc tế", unit: "CUS Education", desc: "Chương trình SAT cập nhật theo cấu trúc đề thi mới." },
  { id: 3, title: "HSA", subtitle: "Đánh giá tư duy HSA", unit: "CUS Education", desc: "Khóa học luyện đề tư duy chuẩn ĐHQG Hà Nội." },
]

const WEBSITE_INSTRUCTORS = [
  { id: 1, name: "Th.S Nguyễn Văn An", bio: "Giảng viên toán với hơn 10 năm kinh nghiệm giảng dạy." },
  { id: 2, name: "GS.TS Trần Thị Bình", bio: "Chuyên gia tiếng Anh học thuật, tác giả nhiều giáo trình." },
]

const WEBSITE_ACHIEVEMENTS = [
  { id: 1, name: "Phạm Minh Khoa", exam: "V-ACT", totalScore: "112 / 120", subScores: "Ngôn ngữ: 39 · Toán logic: 37 · GQVĐ: 36" },
  { id: 2, name: "Lê Thị Hoa", exam: "V-SAT", totalScore: "1560 / 1600", subScores: "Toán: 800 · Anh: 760" },
]

const WEBSITE_REVIEWS = [
  { id: 1, name: "Nguyễn Tuấn Anh", course: "HSA", time: "Tháng 06/2025", comment: "Giáo viên nhiệt tình, tài liệu rất phong phú." },
  { id: 2, name: "Trần Quỳnh Như", course: "V-ACT", time: "Tháng 05/2025", comment: "Tôi đã cải thiện điểm từ 28 lên 34 chỉ sau 3 tháng." },
]

const ALL_ASST_ACTIVITIES: AsstActivity[] = [
  { date: "26/07/2026", week: "W30", month: "07", year: "2026", text: "Đăng tải đề thi V-ACT mã đề 007",              asst: "Lê Thị Mai" },
  { date: "25/07/2026", week: "W30", month: "07", year: "2026", text: "Tạo bài học mới: Tư duy logic nâng cao",        asst: "Nguyễn Quang Huy" },
  { date: "24/07/2026", week: "W30", month: "07", year: "2026", text: "Trả lời 12 câu hỏi học viên",                   asst: "Lê Thị Mai" },
  { date: "23/07/2026", week: "W30", month: "07", year: "2026", text: "Cập nhật nội dung khóa V-ACT chương 4",         asst: "Trần Bảo Ngọc" },
  { date: "20/07/2026", week: "W29", month: "07", year: "2026", text: "Thêm 3 câu hỏi vào ngân hàng đề HSA",          asst: "Nguyễn Quang Huy" },
  { date: "19/07/2026", week: "W29", month: "07", year: "2026", text: "Phê duyệt 5 bài nộp của học viên",             asst: "Lê Thị Mai" },
  { date: "18/07/2026", week: "W29", month: "07", year: "2026", text: "Cập nhật tiến độ khóa V-SAT tháng 7",          asst: "Trần Bảo Ngọc" },
  { date: "15/07/2026", week: "W28", month: "07", year: "2026", text: "Tải lên tài liệu lý thuyết THPT QG",           asst: "Nguyễn Quang Huy" },
  { date: "10/06/2026", week: "W23", month: "06", year: "2026", text: "Tạo đề thi thử HSCA đợt 2",                    asst: "Lê Thị Mai" },
  { date: "05/06/2026", week: "W22", month: "06", year: "2026", text: "Gửi thông báo lịch học tháng 6 cho học viên",  asst: "Trần Bảo Ngọc" },
  { date: "15/05/2026", week: "W19", month: "05", year: "2026", text: "Tổng kết kết quả thi thử tháng 5",             asst: "Nguyễn Quang Huy" },
  { date: "01/05/2026", week: "W17", month: "05", year: "2026", text: "Khởi động khóa học V-ACT kỳ mới",              asst: "Lê Thị Mai" },
]

export {
  QUICK_STATS,
  ACTIVITY_LOG,
  DAYS_IN_WEEK,
  MONTHS_TO_7,
  MONTHS,
  WEEKLY_LOGINS,
  MONTHLY_REGS,
  MONTHLY_WEB_TRAFFIC,
  INIT_STUDENTS,
  INIT_ASSISTANTS,
  DEFAULT_DAY_STATS,
  MONTHLY_WEB_TRAFFIC_DATA,
  MONTHLY_REGS_FULL,
  MONTHLY_VIP,
  WEBSITE_COURSES,
  WEBSITE_INSTRUCTORS,
  WEBSITE_ACHIEVEMENTS,
  WEBSITE_REVIEWS,
  ALL_ASST_ACTIVITIES
}