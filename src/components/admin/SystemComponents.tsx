import { useState, useEffect, Suspense, lazy } from 'react'
import type { SysTab, Student, Assistant, VipReq, DayStats, ChartDataPoint } from '../../types/admin'
import StatsCard from '../StatsCard'
import Loading from '../Loading'
import {
  StudentDetailModal,
  CreateVipModal,
  CreateAssistantModal,
  AssistantDetailModal
} from './modals/SystemModals'

const BarChart = lazy(() => import('../Charts').then((m) => ({ default: m.BarChart })))
const LineChart = lazy(() => import('../Charts').then((m) => ({ default: m.LineChart })))

// ---------------------------------------------------------------------------
// SystemTabsNav  (formerly TabsNav)
// ---------------------------------------------------------------------------

type TabItem = {
  key: SysTab
  label: string
  badge?: number
}

type SystemTabsNavProps = {
  activeTab: SysTab
  onTabChange: (tab: SysTab) => void
  pendingVipCount: number
}

export const SystemTabsNav = ({ activeTab, onTabChange, pendingVipCount }: SystemTabsNavProps) => {
  const tabs: TabItem[] = [
    { key: "students", label: "Quản lý học viên" },
    { key: "assistants", label: "Quản lý trợ giảng" },
    { key: "vip-requests", label: "Duyệt yêu cầu VIP", badge: pendingVipCount },
    { key: "stats", label: "Thống kê truy cập" }
  ]

  return (
    <div className="flex border-b border-[var(--border-300)] overflow-x-auto">
      {tabs.map((t) => {
        const isActive = activeTab === t.key
        return (
          <button
            key={t.key}
            onClick={() => onTabChange(t.key)}
            style={{
              color: isActive ? 'var(--brand-500)' : 'var(--text-secondary-300)',
              borderBottomColor: isActive ? 'var(--brand-500)' : 'transparent',
            }}
            className="font-semibold text-[13.5px] px-5 py-4 border-b-[2.5px] bg-transparent cursor-pointer flex items-center gap-[7px] whitespace-nowrap transition-all duration-[var(--motion-fast)] outline-none hover:text-[var(--text-primary)]"
          >
            <span className="[font-family:var(--font-heading)]">{t.label}</span>
            {t.badge !== undefined && t.badge > 0 && (
              <span
                className={`rounded-full px-[7px] py-[1px] text-[11px] font-bold ${
                  isActive
                    ? "bg-[var(--brand-500)] text-white"
                    : "bg-[var(--border-500)] text-[var(--text-secondary-300)]"
                }`}
              >
                {t.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SystemStatsOverview  (formerly AdminStatsOverview)
// ---------------------------------------------------------------------------

type SystemStatsOverviewProps = {
  regularCount: number
  vipCount: number
  assistantCount: number
  bannedCount: number
}

export const SystemStatsOverview = ({
  regularCount,
  vipCount,
  assistantCount,
  bannedCount
}: SystemStatsOverviewProps) => {
  const stats = [
    { label: 'Tài khoản thường', value: regularCount, color: 'var(--brand-500)' },
    { label: 'Tài khoản VIP', value: vipCount, color: 'var(--warning-500)' },
    { label: 'Trợ giảng', value: assistantCount, color: 'var(--info-500)' },
    { label: 'Tài khoản bị cấm', value: bannedCount, color: 'var(--error-500)' }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px] mb-[28px]">
      {stats.map((s) => (
        <StatsCard key={s.label} label={s.label} value={s.value} color={s.color} />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// StudentTab
// ---------------------------------------------------------------------------

type StudentTabProps = {
  students: Student[]
  bannedIds: number[]
  blockedIds: number[]
  onBlockToggle: (id: number) => void
  onBanToggle: (id: number) => void
  onAddVip: (studentData: { name: string; email: string; course: string }) => void
}

export const StudentTab = ({
  students,
  bannedIds,
  blockedIds,
  onBlockToggle,
  onBanToggle,
  onAddVip
}: StudentTabProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showVipModal, setShowVipModal] = useState(false)

  const [activeDropdownRowId, setActiveDropdownRowId] = useState<number | null>(null)

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdownRowId(null)
    }
    window.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  // Filter students
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStudentStatus = (s: Student) => {
    if (bannedIds.includes(s.id)) {
      return { text: "Bị cấm", bg: "bg-[var(--error-50)] text-[var(--error-500)]" }
    }
    if (blockedIds.includes(s.id)) {
      return { text: "Bị khóa", bg: "bg-[var(--warning-50)] text-[var(--warning-500)]" }
    }
    return s.status === "Hoạt động"
      ? { text: "Hoạt động", bg: "bg-[var(--success-50)] text-[var(--success-500)]" }
      : { text: s.status, bg: "bg-[var(--warning-50)] text-[var(--warning-500)]" }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[12px] mb-[18px]">
        <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
          Danh sách học viên ({filteredStudents.length})
        </div>
        <div className="flex gap-[10px] items-center w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <svg
              className="absolute left-[11px] top-1/2 -translate-y-1/2 pointer-events-none stroke-[var(--text-secondary-300)]"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="7" cy="7" r="5" strokeWidth="1.6" />
              <path d="M11 11l3 3" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm học viên..."
              className="w-full !sm:w-[200px] pl-[32px] pr-[14px] py-[8px] rounded-[10px] border border-[var(--border-500)] [font-family:var(--font-body)] !text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-500)]"
            />
          </div>
          <button
            onClick={() => setShowVipModal(true)}
            className="![font-family:var(--font-heading)] !font-bold !text-[12px] px-[16px] py-[9px] rounded-[var(--radius-sm)] border-none bg-[var(--warning-500)] !text-white cursor-pointer whitespace-nowrap hover:bg-[var(--warning-600)] transition-colors duration-[var(--motion-fast)]"
          >
            ⭐ Tạo tài khoản VIP
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--surface-500)]">
              {["Email", "Khóa học chủ yếu", "Tiến độ", "Đ.TB", "Đăng nhập", "Thời lượng", "Trạng thái", ""].map((h) => (
                <th
                  key={h}
                  className="[font-family:var(--font-heading)] font-bold text-[11px] text-[var(--text-secondary-300)] p-[10px_12px] text-left uppercase tracking-[0.3px] whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((u, i) => {
              const statusInfo = getStudentStatus(u)
              const isBanned = bannedIds.includes(u.id)
              const isBlocked = blockedIds.includes(u.id)

              return (
                <tr
                  key={u.id}
                  className={`border-b border-[var(--border-100)] transition-colors duration-130 ${
                    i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                  } ${isBanned ? "opacity-55" : ""}`}
                >
                  <td className="p-[12px_12px]">
                    <div className="[font-family:var(--font-body)] text-[12.5px] text-[var(--text-secondary-600)]">
                      {u.email}
                    </div>
                    {u.vip && (
                      <span className="inline-block mt-[4px] bg-[var(--warning-50)] text-[var(--warning-500)] rounded-full px-[7px] py-[1px] [font-family:var(--font-heading)] font-bold text-[10px]">
                        ⭐ VIP
                      </span>
                    )}
                  </td>
                  <td className="p-[12px_12px]">
                    <span className="inline-block bg-[var(--brand-soft-500)] text-[var(--brand-500)] rounded-full px-[9px] py-[3px] [font-family:var(--font-heading)] font-bold text-[11px]">
                      {u.course}
                    </span>
                  </td>
                  <td className="p-[12px_12px]">
                    <div className="flex items-center gap-[7px]">
                      <div className="bg-[var(--brand-soft-500)] rounded-full h-[6px] w-[70px] overflow-hidden">
                        <div
                          style={{ width: `${u.progress}%` }}
                          className={`h-full rounded-full ${
                            u.progress >= 70
                              ? "bg-[var(--brand-500)]"
                              : u.progress >= 40
                              ? "bg-[var(--warning-500)]"
                              : "bg-[var(--error-500)]"
                          }`}
                        />
                      </div>
                      <span className="[font-family:var(--font-body)] text-[11.5px] text-[var(--text-secondary-600)]">
                        {u.progress}%
                      </span>
                    </div>
                  </td>
                  <td
                    className={`p-[12px_12px] [font-family:var(--font-heading)] font-bold text-[13px] ${
                      u.avgScore >= 7
                        ? "text-[var(--brand-500)]"
                        : u.avgScore >= 5
                        ? "text-[var(--warning-500)]"
                        : "text-[var(--error-500)]"
                    }`}
                  >
                    {u.avgScore}
                  </td>
                  <td className="p-[12px_12px] [font-family:var(--font-body)] text-[12px] text-[var(--text-secondary-600)]">
                    {u.lastLogin}
                  </td>
                  <td className="p-[12px_12px] [font-family:var(--font-body)] text-[12px] text-[var(--text-secondary-600)]">
                    {Math.round(u.progress * 0.6 + 10)} giờ
                  </td>
                  <td className="p-[12px_12px]">
                    <span
                      className={`inline-block rounded-full px-[10px] py-[3px] [font-family:var(--font-heading)] font-semibold text-[11px] ${statusInfo.bg}`}
                    >
                      {statusInfo.text}
                    </span>
                  </td>
                  <td className="p-[12px_12px] relative">
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveDropdownRowId(activeDropdownRowId === u.id ? null : u.id)
                        }}
                        className="p-[6px] hover:bg-[var(--surface-600)] rounded-full text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] transition-colors duration-130 cursor-pointer"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>
                      {activeDropdownRowId === u.id && (
                        <div className="absolute right-[12px] top-[38px] bg-white border border-[var(--border-300)] rounded-[10px] shadow-[var(--shadow-clay-sm)] py-[6px] z-[50] min-w-[130px]">
                          <button
                            onClick={() => {
                              setSelectedStudent(u)
                              setActiveDropdownRowId(null)
                            }}
                            className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                          >
                            Chi tiết
                          </button>
                          {!isBanned && !isBlocked && (
                            <button
                              onClick={() => {
                                onBlockToggle(u.id)
                                setActiveDropdownRowId(null)
                              }}
                              className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                            >
                              Khóa
                            </button>
                          )}
                          {isBlocked && (
                            <button
                              onClick={() => {
                                onBlockToggle(u.id)
                                setActiveDropdownRowId(null)
                              }}
                              className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                            >
                              Mở khóa
                            </button>
                          )}
                          {!isBanned && (
                            <button
                              onClick={() => {
                                onBanToggle(u.id)
                                setActiveDropdownRowId(null)
                              }}
                              className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                            >
                              Cấm
                            </button>
                          )}
                          {isBanned && (
                            <button
                              onClick={() => {
                                onBanToggle(u.id)
                                setActiveDropdownRowId(null)
                              }}
                              className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                            >
                              Bỏ cấm
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {showVipModal && (
        <CreateVipModal
          onClose={() => setShowVipModal(false)}
          onCreate={onAddVip}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// AssistantTab
// ---------------------------------------------------------------------------

type AssistantTabProps = {
  assistants: Assistant[]
  onToggleStatus: (id: number) => void
  onDelete: (id: number) => void
  onCreateAssistant: (assistant: Assistant) => void
}

export const AssistantTab = ({
  assistants,
  onToggleStatus,
  onDelete,
  onCreateAssistant
}: AssistantTabProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAsst, setSelectedAsst] = useState<Assistant | null>(null)
  const [showCreateAsst, setShowCreateAsst] = useState(false)
  const [activeDropdownRowId, setActiveDropdownRowId] = useState<number | null>(null)

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdownRowId(null)
    }
    window.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const filteredAssistants = assistants.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteClick = (id: number, name: string) => {
    if (window.confirm(`Xóa tài khoản của trợ giảng ${name}?`)) {
      onDelete(id)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[12px] mb-[20px]">
        <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
          Tài khoản trợ giảng ({filteredAssistants.length})
        </div>
        <div className="flex gap-[10px] items-center w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <svg
              className="absolute left-[11px] top-1/2 -translate-y-1/2 pointer-events-none stroke-[var(--text-secondary-300)]"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="7" cy="7" r="5" strokeWidth="1.6" />
              <path d="M11 11l3 3" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm trợ giảng..."
              className="w-full !sm:w-[200px] pl-[32px] pr-[14px] py-[8px] rounded-[10px] border border-[var(--border-500)] [font-family:var(--font-body)] !text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-500)]"
            />
          </div>
          <button
            onClick={() => setShowCreateAsst(true)}
            className="flex items-center gap-[7px] ![font-family:var(--font-heading)] !font-bold !text-[13px] px-[18px] py-[9px] rounded-[var(--radius-sm)] border-none bg-[var(--brand-500)] !text-white cursor-pointer hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="stroke-white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Tạo tài khoản
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-[14px]">
        {filteredAssistants.map((a) => (
          <div
            key={a.id}
            className="flex flex-col md:flex-row items-start md:items-center gap-[18px] p-[18px_22px] bg-[var(--surface-500)] rounded-[16px] border border-[var(--border-300)]"
          >
            {/* Avatar Circle */}
            <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-700)] flex items-center justify-center shrink-0">
              <span className="[font-family:var(--font-heading)] font-[800] text-[16px] text-white">
                {a.name.charAt(0)}
              </span>
            </div>

            {/* Core Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-[10px] mb-[4px]">
                <span className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)] truncate">
                  {a.name}
                </span>
                <span
                  className={`inline-block rounded-full px-[9px] py-[2px] [font-family:var(--font-heading)] font-semibold text-[11px] ${
                    a.status === 'Hoạt động'
                      ? 'bg-[var(--success-50)] text-[var(--success-500)]'
                      : 'bg-[var(--warning-50)] text-[var(--warning-500)]'
                  }`}
                >
                  {a.status}
                </span>
              </div>
              <div className="[font-family:var(--font-body)] text-[12.5px] text-[var(--text-secondary-600)]">
                {a.email} · {a.phone}
              </div>
              <div className="flex flex-wrap gap-x-[18px] gap-y-[4px] mt-[8px]">
                {[{ label: "Khóa học", v: a.courses }, { label: "Đề thi", v: a.exams }, { label: "Học viên", v: a.students }].map((s) => (
                  <div key={s.label} className="flex gap-[5px] items-baseline">
                    <span className="[font-family:var(--font-heading)] font-bold text-[14px] text-[var(--brand-500)]">
                      {s.v}
                    </span>
                    <span className="[font-family:var(--font-body)] text-[11.5px] text-[var(--text-secondary-600)]">
                      {s.label}
                    </span>
                  </div>
                ))}
                <span className="[font-family:var(--font-body)] text-[11.5px] text-[var(--text-secondary-300)] ml-auto md:ml-0">
                  Hoạt động: {a.lastActive}
                </span>
              </div>
            </div>

            {/* Row Actions */}
            <div className="relative mt-[12px] md:mt-0 flex self-end md:self-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveDropdownRowId(activeDropdownRowId === a.id ? null : a.id)
                }}
                className="p-[6px] hover:bg-[var(--surface-600)] rounded-full text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] transition-colors duration-130 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
              {activeDropdownRowId === a.id && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-[34px] bg-white border border-[var(--border-300)] rounded-[10px] shadow-[var(--shadow-clay-sm)] py-[6px] z-[50] min-w-[130px]"
                >
                  <button
                    onClick={() => {
                      setSelectedAsst(a)
                      setActiveDropdownRowId(null)
                    }}
                    className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => {
                      onToggleStatus(a.id)
                      setActiveDropdownRowId(null)
                    }}
                    className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                  >
                    {a.status === 'Hoạt động' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteClick(a.id, a.name)
                      setActiveDropdownRowId(null)
                    }}
                    className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredAssistants.length === 0 && (
          <div className="text-center py-[48px] [font-family:var(--font-body)] text-[14px] text-[var(--text-secondary-300)]">
            Không tìm thấy trợ giảng.
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedAsst && (
        <AssistantDetailModal
          asst={selectedAsst}
          onClose={() => setSelectedAsst(null)}
        />
      )}

      {showCreateAsst && (
        <CreateAssistantModal
          onClose={() => setShowCreateAsst(false)}
          onCreate={onCreateAssistant}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// VipRequestsTab
// ---------------------------------------------------------------------------

type VipRequestsTabProps = {
  vipRequests: VipReq[]
  onApprove: (id: number) => void
  onReject: (id: number) => void
}

export const VipRequestsTab = ({ vipRequests, onApprove, onReject }: VipRequestsTabProps) => {
  const [activeDropdownRowId, setActiveDropdownRowId] = useState<number | null>(null)
  const [vipSearch, setVipSearch] = useState('')
  const [vipFilter, setVipFilter] = useState('Tất cả')

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdownRowId(null)
    }
    window.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const filteredRequests = vipRequests.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(vipSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(vipSearch.toLowerCase())
    const matchStatus = vipFilter === "Tất cả" || r.status === vipFilter
    return matchSearch && matchStatus
  })

  const getStatusBadgeClass = (s: string) => {
    if (s === "Đã duyệt") return "bg-[var(--success-50)] text-[var(--success-500)]"
    if (s === "Từ chối") return "bg-[var(--error-50)] text-[var(--error-500)]"
    return "bg-[var(--warning-50)] text-[var(--warning-500)]"
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[12px] mb-[18px]">
        <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
          Yêu cầu nâng cấp VIP ({filteredRequests.length})
        </div>
        <div className="flex flex-wrap gap-[8px] items-center">
          <div className="relative">
            <svg
              className="absolute left-[10px] top-1/2 -translate-y-1/2 pointer-events-none stroke-[var(--text-secondary-300)]"
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="7" cy="7" r="5" strokeWidth="1.6" />
              <path d="M11 11l3 3" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              value={vipSearch}
              onChange={(e) => setVipSearch(e.target.value)}
              placeholder="Tìm học viên..."
              className="pl-[30px] pr-[12px] py-[8px] rounded-[10px] border border-[var(--border-500)] [font-family:var(--font-body)] !text-[13px] outline-none w-[190px] focus:border-[var(--brand-500)]"
            />
          </div>
          {["Tất cả", "Chờ duyệt", "Đã duyệt", "Từ chối"].map((f) => (
            <button
              key={f}
              onClick={() => setVipFilter(f)}
              className={`px-[13px] py-[7px] rounded-[9px] ![font-family:var(--font-heading)] !font-semibold !text-[12px] cursor-pointer transition-all duration-[var(--motion-fast)] outline-none border ${
                vipFilter === f
                  ? "!border-transparent !bg-[var(--brand-500)] !text-white"
                  : "!border-[var(--border-500)] !bg-white !text-[var(--text-secondary-300)] !hover:text-[var(--text-primary)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--surface-500)]">
              {["Email", "Ghi chú", "Ngày yêu cầu", "Trạng thái", ""].map((h) => (
                <th
                  key={h}
                  className="p-[10px_14px] [font-family:var(--font-heading)] font-bold text-[11px] text-[var(--text-secondary-300)] text-left uppercase tracking-[0.4px] whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((r, i) => (
              <tr
                key={r.id}
                className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-400)] ${
                  i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                }`}
              >
                <td className="p-[12px_14px] [font-family:var(--font-body)] text-[12.5px] text-[var(--text-secondary-600)]">
                  <div className="font-semibold text-[var(--text-primary)]">{r.name}</div>
                  <div className="text-[12px] text-[var(--text-secondary-300)]">{r.email}</div>
                  <div className="mt-[4px]">
                    <span className="inline-block bg-[var(--brand-soft-500)] text-[var(--brand-500)] rounded-full px-[8px] py-[1px] text-[10px] font-bold">
                      {r.course}
                    </span>
                  </div>
                </td>
                <td className="p-[12px_14px] [font-family:var(--font-body)] text-[12.5px] text-[var(--text-secondary-600)] max-w-[280px]">
                  {r.note || "---"}
                </td>
                <td className="p-[12px_14px] [font-family:var(--font-body)] text-[12.5px] text-[var(--text-secondary-600)] whitespace-nowrap">
                  {r.requestDate}
                </td>
                <td className="p-[12px_14px]">
                  <span
                    className={`inline-block px-[11px] py-[4px] rounded-full [font-family:var(--font-heading)] font-bold text-[11px] ${getStatusBadgeClass(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-[12px_14px] relative whitespace-nowrap">
                  {r.status === "Chờ duyệt" && (
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveDropdownRowId(activeDropdownRowId === r.id ? null : r.id)
                        }}
                        className="p-[6px] hover:bg-[var(--surface-600)] rounded-full text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] transition-colors duration-130 cursor-pointer"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>
                      {activeDropdownRowId === r.id && (
                        <div className="absolute right-[14px] top-[38px] bg-white border border-[var(--border-300)] rounded-[10px] shadow-[var(--shadow-clay-sm)] py-[6px] z-[50] min-w-[120px]">
                          <button
                            onClick={() => {
                              onApprove(r.id)
                              setActiveDropdownRowId(null)
                            }}
                            className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--success-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                          >
                            Duyệt
                          </button>
                          <button
                            onClick={() => {
                              onReject(r.id)
                              setActiveDropdownRowId(null)
                            }}
                            className="w-full text-left px-[14px] py-[8px] text-[13px] [font-family:var(--font-heading)] font-semibold text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                          >
                            Từ chối
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]"
                >
                  Không có yêu cầu nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// AccessStatsTab
// ---------------------------------------------------------------------------

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

export const AccessStatsTab = ({
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
