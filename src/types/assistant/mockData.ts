import type {
  AssistantLecture,
  AssistantExercise,
  AssistantCourseMaterial,
  AssistantLesson,
  AssistantStatCard,
  AssistantActivity,
  AssistantDocument,
  AssistantStudent
} from './models';

export const ASST_STAT_CARDS: AssistantStatCard[] = [
  {
    id: 1,
    label: "Tổng học viên",
    value: "1.284",
    delta: "+32 tuần này",
    icon: "👥",
    color: "#2C5A31",
    background: "#DCE9DE"
  },
  {
    id: 2,
    label: "Bài tập đã đăng",
    value: "36",
    delta: "+4 tuần này",
    icon: "📎",
    color: "#2F6FAE",
    background: "#DDEAF8"
  },
  {
    id: 3,
    label: "Đề thi đã tạo",
    value: "47",
    delta: "+5 tuần này",
    icon: "📝",
    color: "#B7791F",
    background: "#FBF0DC"
  },
];

export const ASST_RECENT_ACTIVITIES: AssistantActivity[] = [
  {
    id: 1,
    type: "material",
    text: "Đề thi Toán nâng cao 2024 - Đề 12 đã được tải lên",
    time: "5 phút trước",
    icon: "📝"
  },
  {
    id: 2,
    type: "student",
    text: "Học viên Nguyễn Văn A đã đăng ký khóa V-ACT",
    time: "10 phút trước",
    icon: "👨‍🎓"
  },
  {
    id: 3,
    type: "course",
    text: "Khóa học V-SAT đã được cập nhật nội dung",
    time: "30 phút trước",
    icon: "📚"
  },
  {
    id: 4,
    type: "material",
    text: "Đề thi thử THPT Quốc Gia môn Hóa đã được phê duyệt",
    time: "1 giờ trước",
    icon: "📝"
  },
  {
    id: 5,
    type: "student",
    text: "Học viên Trần Thị B đã hoàn thành bài tập Toán",
    time: "2 giờ trước",
    icon: "👨‍🎓"
  }
];

export const COURSE_SUBJECTS: Record<string, string[]> = {
  "V-ACT": ["Toán", "Vật lý", "Hóa học", "Tiếng Anh"],
  "V-SAT": ["Toán", "Vật lý", "Tiếng Anh"],
  "HSA": ["Định lượng", "Tư duy logic", "Đọc hiểu"],
  "HSCA": ["Toán", "Vật lý", "Hóa học"],
  "THPT QG": ["Toán", "Vật lý", "Hóa học", "Tiếng Anh", "Ngữ văn", "Sinh học"]
};

export const COURSE_ACCENT: Record<string, string> = {
  "V-ACT": "#2C5A31",
  "V-SAT": "#1A3F6A",
  "HSA": "#6B2C8A",
  "HSCA": "#8A5C2C",
  "THPT QG": "#2C6B5A",
};

export const COURSE_TAG: Record<string, string> = {
  "V-ACT": "ĐGNL TP.HCM",
  "V-SAT": "Khảo thí QG",
  "HSA": "ĐGNL HN",
  "HSCA": "ĐH Sư phạm",
  "THPT QG": "Bộ GD&ĐT",
};

export const DEMO_SUBJECT_META: Record<string, { topics: number; lectures: number; exercises: number }> = {
  "Toán": { topics: 8, lectures: 32, exercises: 96 },
  "Vật lý": { topics: 6, lectures: 24, exercises: 48 },
  "Hóa học": { topics: 7, lectures: 28, exercises: 84 },
  "Tiếng Anh": { topics: 10, lectures: 40, exercises: 120 },
  "Ngữ văn": { topics: 5, lectures: 20, exercises: 40 },
  "Sinh học": { topics: 6, lectures: 24, exercises: 60 },
};

export const DEMO_LECTURES: AssistantLecture[] = [
  {
    id: 1,
    title: "Đại số tuyến tính — Buổi 1: Ma trận và định thức",
    topic: "Đại số",
    link: "https://youtu.be/abc123",
    uploadedAt: "Hôm nay, 09:15"
  },
  {
    id: 2,
    title: "Đại số tuyến tính — Buổi 2: Hệ phương trình tuyến tính",
    topic: "Đại số",
    link: "https://youtu.be/def456",
    uploadedAt: "Hôm nay, 14:30"
  },
];

export const DEMO_ASST_EXERCISES: AssistantExercise[] = [
  {
    id: 1,
    title: "Bài tập Đại số — Hệ phương trình tuyến tính",
    topic: "Đại số",
    questions: 20,
    fileType: "PDF",
    uploadedAt: "Hôm nay, 09:15"
  },
  {
    id: 2,
    title: "Bài tập Giải tích — Đạo hàm và ứng dụng",
    topic: "Giải tích",
    questions: 25,
    fileType: "DOCX",
    uploadedAt: "Hôm qua, 15:45"
  },
];

export const DEMO_COURSE_MATERIALS: AssistantCourseMaterial[] = [
  {
    id: 1,
    title: "Đề thi thử V-ACT — Đề 01/2024",
    course: "V-ACT",
    questions: 50,
    duration: "90 phút",
    date: "12/07/2024"
  },
  {
    id: 2,
    title: "Đề thi thử V-SAT — Đề 02/2024",
    course: "V-SAT",
    questions: 45,
    duration: "75 phút",
    date: "15/07/2024"
  },
  {
    id: 3,
    title: "Đề thi thử HSA — Đề 03/2024",
    course: "HSA",
    questions: 60,
    duration: "120 phút",
    date: "18/07/2024"
  },
  {
    id: 4,
    title: "Đề thi thử HSCA — Đề 01/2024",
    course: "HSCA",
    questions: 40,
    duration: "60 phút",
    date: "20/07/2024"
  },
  {
    id: 5,
    title: "Đề thi thử THPT QG — Môn Toán Đề 01",
    course: "THPT QG",
    questions: 50,
    duration: "90 phút",
    date: "22/07/2024"
  },
  {
    id: 6,
    title: "Đề thi thử THPT QG — Môn Vật lý Đề 01",
    course: "THPT QG",
    questions: 40,
    duration: "50 phút",
    date: "25/07/2024"
  },
];

export const DEMO_LESSONS_ASST: AssistantLesson[] = [
  {
    id: 1,
    no: "01",
    title: "Giới thiệu khóa học & phương pháp ôn thi",
    duration: "45:12",
    type: "Video",
    status: "Đã xuất bản"
  },
  {
    id: 2,
    no: "02",
    title: "Đại số cơ bản — Ôn lại nền tảng thiết yếu",
    duration: "58:30",
    type: "Video",
    status: "Đã xuất bản"
  },
  {
    id: 3,
    no: "03",
    title: "Hàm số và đồ thị — Lý thuyết & ví dụ minh họa",
    duration: "74:00",
    type: "Video",
    status: "Nháp"
  },
  {
    id: 4,
    no: "04",
    title: "Bài tập tự luận Hàm số và đồ thị",
    duration: "30:00",
    type: "Bài tập",
    status: "Đã xuất bản"
  },
];

export const DEMO_MATERIALS_ASST: AssistantDocument[] = [
  {
    id: 1,
    title: "Đề thi Toán nâng cao 2024 — Đề 01",
    subject: "Toán",
    kythi: "ĐGNL TP.HCM 2024",
    questions: 50,
    duration: "90 phút",
    date: "12/07/2024",
    fileType: "PDF",
    cat: "bai-tap",
    access: "Public"
  },
  {
    id: 2,
    title: "Đề thi Vật lý ĐGNL — Bộ đề 2024",
    subject: "Vật lý",
    kythi: "ĐGNL HN 2024",
    questions: 40,
    duration: "60 phút",
    date: "10/07/2024",
    fileType: "PDF",
    cat: "bai-tap",
    access: "VIP"
  },
  {
    id: 3,
    title: "Lý thuyết Hóa học hữu cơ trọng tâm",
    subject: "Hóa học",
    kythi: "—",
    questions: 0,
    duration: "—",
    date: "05/07/2024",
    fileType: "DOCX",
    cat: "ly-thuyet",
    access: "Public"
  },
  {
    id: 4,
    title: "Bài tập Tiếng Anh chuyên đề Ngữ pháp",
    subject: "Tiếng Anh",
    kythi: "—",
    questions: 30,
    duration: "45 phút",
    date: "08/07/2024",
    fileType: "PDF",
    cat: "bai-tap",
    access: "Public"
  },
  {
    id: 5,
    title: "Đề thi thử Ngữ văn cấu trúc mới",
    subject: "Ngữ văn",
    kythi: "THPT QG 2024",
    questions: 1,
    duration: "120 phút",
    date: "15/07/2024",
    fileType: "PDF",
    cat: "bai-tap",
    access: "Public"
  },
  {
    id: 6,
    title: "Tóm tắt công thức Sinh học di truyền",
    subject: "Sinh học",
    kythi: "—",
    questions: 0,
    duration: "—",
    date: "01/07/2024",
    fileType: "PDF",
    cat: "ly-thuyet",
    access: "VIP"
  },
  {
    id: 7,
    title: "Bài tập Lượng giác nâng cao",
    subject: "Toán",
    kythi: "—",
    questions: 15,
    duration: "60 phút",
    date: "20/07/2024",
    fileType: "DOCX",
    cat: "bai-tap",
    access: "VIP"
  },
  {
    id: 8,
    title: "Đề thi thử THPT QG Môn Toán - Đề 02",
    subject: "Toán",
    kythi: "THPT QG 2024",
    questions: 50,
    duration: "90 phút",
    date: "28/07/2024",
    fileType: "PDF",
    cat: "bai-tap",
    access: "Public"
  },
];

export const DEMO_TOPIC_LIST: string[] = [
  "Đại số", "Giải tích", "Tổ hợp", "Hình học",
  "Xác suất", "Lượng giác", "Phương trình vi phân", "Số học"
];

export const DEMO_STUDENTS_ASST: AssistantStudent[] = [
  {
    id: 1,
    email: "khoa.nm@gmail.com",
    course: "V-ACT",
    progress: 72,
    joined: "12/01/2025",
    status: "Hoạt động",
    isVip: true,
    lastLogin: "Hôm nay, 09:15",
    examsCompleted: 5,
    averageScore: 7.4
  },
  {
    id: 2,
    email: "lananh.tt@gmail.com",
    course: "HSA",
    progress: 55,
    joined: "03/02/2025",
    status: "Hoạt động",
    isVip: false,
    lastLogin: "Hôm qua, 14:20",
    examsCompleted: 3,
    averageScore: 6.8
  },
  {
    id: 3,
    email: "bao.lq@gmail.com",
    course: "V-SAT",
    progress: 38,
    joined: "18/02/2025",
    status: "Chờ duyệt",
    isVip: false,
    lastLogin: "18/02/2025, 08:00",
    examsCompleted: 0,
    averageScore: 0
  },
  {
    id: 4,
    email: "dung.pt@gmail.com",
    course: "HSCA",
    progress: 91,
    joined: "25/02/2025",
    status: "Hoạt động",
    isVip: true,
    lastLogin: "Hôm nay, 10:45",
    examsCompleted: 12,
    averageScore: 8.5
  },
  {
    id: 5,
    email: "duc.hv@gmail.com",
    course: "THPT QG",
    progress: 44,
    joined: "01/03/2025",
    status: "Hoạt động",
    isVip: false,
    lastLogin: "02/03/2025, 19:30",
    examsCompleted: 2,
    averageScore: 5.5
  },
  {
    id: 6,
    email: "ha.vn8@gmail.com",
    course: "V-ACT",
    progress: 20,
    joined: "07/03/2025",
    status: "Chờ duyệt",
    isVip: false,
    lastLogin: "07/03/2025, 11:15",
    examsCompleted: 0,
    averageScore: 0
  },
  {
    id: 7,
    email: "tung.dt@gmail.com",
    course: "HSA",
    progress: 63,
    joined: "14/03/2025",
    status: "Hoạt động",
    isVip: false,
    lastLogin: "Hôm nay, 08:30",
    examsCompleted: 4,
    averageScore: 7.0
  }
];
