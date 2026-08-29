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

import type { CourseSummaryResponse } from './api/course.api'
import type { BadgeResponse } from './api/badge.api'

export type Course = CourseSummaryResponse

type Instructor = {
  id: number
  name: string
  bio: string
  image?: string
}

type Achievement = {
  id: number
  name: string
  exam: string
  totalScore: string
  subScores: string
  image?: string
}

type Review = {
  id: number
  name: string
  course: string
  time: string
  comment: string
  image?: string
}

type AsstActivity = {
  date: string
  week: string
  month: string
  year: string
  text: string
  asst: string
}

type WTab = "trang-chu" | "footer" | "goi-cuoc" | "courses" | "doc-types" | "instructors" | "achievements" | "reviews"

type ModalKey =
  | "add-course"
  | "edit-course"
  | "add-instructor"
  | "edit-instructor"
  | "add-achievement"
  | "edit-achievement"
  | "add-review"
  | "edit-review"
  | "add-doc-type"
  | "edit-doc-type"

export type {
  SysTab,
  Student,
  Assistant,
  VipReq,
  StatItem,
  ChartDataPoint,
  DayStats,
  Instructor,
  Achievement,
  Review,
  AsstActivity,
  WTab,
  ModalKey,
  DocType
}

type DocType = BadgeResponse
