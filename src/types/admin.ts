type SysTab = "students" | "assistants" | "stats" | "vip-requests"

type Student = {
  id: number
  name: string
  email: string
  phone: string
  joined: string
  course: string
  progress: number
  examsDone: number
  avgScore: number
  lastLogin: string
  vip: boolean
  status: string
}

type Assistant = {
  id: number
  name: string
  email: string
  phone: string
  joined: string
  status: "Hoạt động" | "Tạm nghỉ"
  courses: number
  exams: number
  students: number
  lastActive: string
}

type VipReq = {
  id: number
  name: string
  email: string
  course: string
  requestDate: string
  note: string
  status: "Chờ duyệt" | "Đã duyệt" | "Từ chối"
}

type StatItem = {
  label: string
  value: number
  color: string
}

type ChartDataPoint = {
  label: string
  value: number
}

type DayStats = {
  traffic: ChartDataPoint[]
  regs: ChartDataPoint[]
  vip: ChartDataPoint[]
}

export type { SysTab, Student, Assistant, VipReq, StatItem, ChartDataPoint, DayStats }
