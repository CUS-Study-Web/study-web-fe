import { useState, useEffect } from 'react'
import type { Student } from '../../../types/admin'
import { StudentDetailModal, CreateVipModal } from '../modals/system'

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
              className="w-full sm:w-[200px] pl-[32px] pr-[14px] py-[8px] rounded-[10px] border border-[var(--border-500)] [font-family:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-500)]"
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
