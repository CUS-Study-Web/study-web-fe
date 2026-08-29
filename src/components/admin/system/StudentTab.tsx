import { useState, useEffect } from 'react'
import type { LearnerSummaryResponse } from '../../../types/api/system.api'
import { StudentDetailModal, CreateVipModal } from '../modals/system'
import { ConfirmMiniModal } from '../modals/website/ConfirmMiniModal'
import {
  useListLearnersQuery,
  useLockLearnerMutation,
  useUnlockLearnerMutation,
  useBanLearnerMutation
} from '../../../hooks/queries/useSystemLearners'
import Pagination from '../../common/Pagination'

export const StudentTab = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<LearnerSummaryResponse | null>(null)
  const [showVipModal, setShowVipModal] = useState(false)
  const [page, setPage] = useState(1)
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean
    title: string
    message: string
    isDanger?: boolean
    action: () => void
  }>({
    isOpen: false,
    title: '',
    message: '',
    action: () => {}
  })

  useEffect(() => {
    setPage(1)
  }, [searchQuery])

  const { data: learnersData, isLoading } = useListLearnersQuery({
    search: searchQuery || undefined,
    page: page - 1,
    size: 10,
    sort: 'createdAt,desc'
  })

  const lockMutation = useLockLearnerMutation()
  const unlockMutation = useUnlockLearnerMutation()
  const banMutation = useBanLearnerMutation()

  const students = learnersData?.data || []



  const getStudentStatus = (s: LearnerSummaryResponse) => {
    if (s.status === 'BANNED') {
      return { text: "Bị cấm", bg: "bg-[var(--error-50)] text-[var(--error-500)]" }
    }
    if (s.status === 'INACTIVE') {
      return { text: "Bị khóa", bg: "bg-[var(--warning-50)] text-[var(--warning-500)]" }
    }
    return { text: "Hoạt động", bg: "bg-[var(--success-50)] text-[var(--success-500)]" }
  }

  const handleToggleBlock = (s: LearnerSummaryResponse) => {
    const isBlocked = s.status === 'INACTIVE'
    setConfirmState({
      isOpen: true,
      title: isBlocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản',
      message: `Bạn có chắc chắn muốn ${isBlocked ? 'mở khóa' : 'khóa'} tài khoản ${s.name}?`,
      isDanger: !isBlocked,
      action: () => {
        const onSuccess = () => setConfirmState(st => ({ ...st, isOpen: false }))
        if (isBlocked) {
          unlockMutation.mutate(s.id, { onSuccess })
        } else {
          lockMutation.mutate(s.id, { onSuccess })
        }
      }
    })
  }

  const handleBanClick = (s: LearnerSummaryResponse) => {
    setConfirmState({
      isOpen: true,
      title: 'Cấm tài khoản',
      message: `Bạn có chắc chắn muốn cấm vĩnh viễn tài khoản ${s.name}?`,
      isDanger: true,
      action: () => {
        banMutation.mutate(s.id, { onSuccess: () => setConfirmState(st => ({ ...st, isOpen: false })) })
      }
    })
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[12px] mb-[18px]">
        <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
          Danh sách học viên ({learnersData?.paging.total || 0})
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

      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--surface-500)]">
              {["Email", "Khóa học chủ yếu", "Tiến độ", "Đ.TB", "Đăng nhập", "Trạng thái", ""].map((h) => (
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
            {isLoading ? (
               <tr>
                 <td colSpan={7} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                   Đang tải...
                 </td>
               </tr>
            ) : students.length === 0 ? (
               <tr>
                 <td colSpan={7} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                   Không tìm thấy học viên.
                 </td>
               </tr>
            ) : students.map((u, i) => {
              const statusInfo = getStudentStatus(u)
              const isBanned = u.status === 'BANNED'
              const isBlocked = u.status === 'INACTIVE'

              return (
                <tr
                  key={u.id}
                  className={`border-b border-[var(--border-100)] transition-colors duration-130 ${
                    i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                  } ${isBanned ? "opacity-55" : ""}`}
                >
                  <td className="p-[12px_12px]">
                    <div className="[font-family:var(--font-body)] text-[12.5px] text-[var(--text-secondary-600)]">
                      {u.gmail}
                    </div>
                    {u.tier === 'VIP' && (
                      <span className="inline-block mt-[4px] bg-[var(--warning-50)] text-[var(--warning-500)] rounded-full px-[7px] py-[1px] [font-family:var(--font-heading)] font-bold text-[10px]">
                        ⭐ VIP
                      </span>
                    )}
                  </td>
                  <td className="p-[12px_12px]">
                    <span className="inline-block bg-[var(--brand-soft-500)] text-[var(--brand-500)] rounded-full px-[9px] py-[3px] [font-family:var(--font-heading)] font-bold text-[11px]">
                      {u.primaryCourse || "Chưa có"}
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
                      u.averageScore >= 7
                        ? "text-[var(--brand-500)]"
                        : u.averageScore >= 5
                        ? "text-[var(--warning-500)]"
                        : "text-[var(--error-500)]"
                    }`}
                  >
                    {u.averageScore}
                  </td>
                  <td className="p-[12px_12px] [font-family:var(--font-body)] text-[12px] text-[var(--text-secondary-600)]">
                    {u.lastLogin || "Chưa đăng nhập"}
                  </td>
                  <td className="p-[12px_12px]">
                    <span
                      className={`inline-block rounded-full px-[10px] py-[3px] [font-family:var(--font-heading)] font-semibold text-[11px] ${statusInfo.bg}`}
                    >
                      {statusInfo.text}
                    </span>
                  </td>
                  <td className="p-[12px_12px]">
                    <div className="flex justify-end items-center gap-[6px]">
                      <button
                        onClick={() => setSelectedStudent(u)}
                        className="px-[12px] py-[5px] rounded-[8px] border border-[var(--border-300)] bg-white ![font-family:var(--font-heading)] !font-semibold !text-[12px] !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130"
                      >
                        Chi tiết
                      </button>
                      {!isBanned && (
                        <button
                          onClick={() => handleToggleBlock(u)}
                          disabled={lockMutation.isPending || unlockMutation.isPending}
                          className={`px-[12px] py-[5px] rounded-[8px] border-none ![font-family:var(--font-heading)] !font-semibold !text-[12px] ${isBlocked ? 'bg-[var(--success-50)] !text-[var(--success-600)] hover:bg-[var(--success-100)]' : 'bg-[var(--warning-50)] !text-[var(--warning-600)] hover:bg-[var(--warning-100)]'} cursor-pointer transition-colors duration-130 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isBlocked ? 'Mở khóa' : 'Khóa'}
                        </button>
                      )}
                      {!isBanned && (
                        <button
                          onClick={() => handleBanClick(u)}
                          disabled={banMutation.isPending}
                          className="px-[12px] py-[5px] rounded-[8px] border-none bg-[var(--error-50)] ![font-family:var(--font-heading)] !font-semibold !text-[12px] !text-[var(--error-600)] hover:bg-[var(--error-100)] cursor-pointer transition-colors duration-130 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Cấm
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {learnersData?.paging && (
        <Pagination
          currentPage={page}
          totalPages={learnersData.paging.totalPages}
          onPageChange={setPage}
        />
      )}

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
        />
      )}

      {confirmState.isOpen && (
        <ConfirmMiniModal
          title={confirmState.title}
          message={confirmState.message}
          isDanger={confirmState.isDanger}
          isSubmitting={lockMutation.isPending || unlockMutation.isPending || banMutation.isPending}
          onConfirm={confirmState.action}
          onClose={() => setConfirmState(s => ({ ...s, isOpen: false }))}
        />
      )}
    </div>
  )
}
