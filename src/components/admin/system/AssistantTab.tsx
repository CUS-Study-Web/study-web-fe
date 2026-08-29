import { useState, useEffect } from 'react'
import type { AssistantSummaryResponse } from '../../../types/api/system.api'
import { AssistantDetailModal, CreateAssistantModal } from '../modals/system'
import {
  useListAssistantsQuery,
  useActivateAssistantMutation,
  useDeactivateAssistantMutation,
  useBanAssistantMutation
} from '../../../hooks/queries/useSystemManagement'
import Pagination from '../../common/Pagination'

export const AssistantTab = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAsst, setSelectedAsst] = useState<AssistantSummaryResponse | null>(null)
  const [showCreateAsst, setShowCreateAsst] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [searchQuery])

  const { data: assistantData, isLoading } = useListAssistantsQuery({
    search: searchQuery || undefined,
    page: page - 1,
    size: 10,
    sort: 'createdAt,desc'
  })

  const activateMutation = useActivateAssistantMutation()
  const deactivateMutation = useDeactivateAssistantMutation()
  const banMutation = useBanAssistantMutation()

  const assistants = assistantData?.data || []



  const handleDeleteClick = (id: string, name: string) => {
    if (window.confirm(`Xóa (Ban) tài khoản của trợ giảng ${name}?`)) {
      banMutation.mutate(id)
    }
  }

  const handleToggleStatus = (a: AssistantSummaryResponse) => {
    if (a.status === 'ACTIVE') {
      deactivateMutation.mutate(a.id)
    } else {
      activateMutation.mutate(a.id)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[12px] mb-[20px]">
        <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
          Tài khoản trợ giảng ({assistantData?.paging.total || 0})
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
              className="w-full sm:w-[200px] pl-[32px] pr-[14px] py-[8px] rounded-[10px] border border-[var(--border-500)] [font-family:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-500)]"
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
        {isLoading ? (
          <div className="text-center py-[48px] [font-family:var(--font-body)] text-[14px] text-[var(--text-secondary-300)]">
            Đang tải...
          </div>
        ) : assistants.length === 0 ? (
          <div className="text-center py-[48px] [font-family:var(--font-body)] text-[14px] text-[var(--text-secondary-300)]">
            Không tìm thấy trợ giảng.
          </div>
        ) : assistants.map((a) => (
          <div
            key={a.id}
            className={`flex flex-col md:flex-row items-start md:items-center gap-[18px] p-[18px_22px] bg-[var(--surface-500)] rounded-[16px] border border-[var(--border-300)] ${a.status === 'BANNED' ? 'opacity-50' : ''}`}
          >
            {/* Avatar Circle */}
            <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-700)] flex items-center justify-center shrink-0">
              {a.avatarUrl ? (
                <img src={a.avatarUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="[font-family:var(--font-heading)] font-[800] text-[16px] text-white">
                  {a.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Core Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-[10px] mb-[4px]">
                <span className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)] truncate">
                  {a.name}
                </span>
                <span
                  className={`inline-block rounded-full px-[9px] py-[2px] [font-family:var(--font-heading)] font-semibold text-[11px] ${
                    a.status === 'ACTIVE'
                      ? 'bg-[var(--success-50)] text-[var(--success-500)]'
                      : 'bg-[var(--warning-50)] text-[var(--warning-500)]'
                  }`}
                >
                  {a.status === 'ACTIVE' ? 'Hoạt động' : a.status === 'INACTIVE' ? 'Tạm nghỉ' : 'Bị cấm'}
                </span>
              </div>
              <div className="[font-family:var(--font-body)] text-[12.5px] text-[var(--text-secondary-600)]">
                {a.gmail} · {a.phone || 'Chưa có số ĐT'}
              </div>
              <div className="flex flex-wrap gap-x-[18px] gap-y-[4px] mt-[8px]">
                {[{ label: "Đề thi", v: a.numExams }, { label: "Học viên", v: 0 /* No API for students count yet */ }].map((s) => (
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
                  Hoạt động: {a.lastLogin || 'Chưa đăng nhập'}
                </span>
              </div>
            </div>

            {/* Row Actions */}
            <div className="mt-[12px] md:mt-0 flex self-end md:self-auto items-center gap-[6px]">
              <button
                onClick={() => setSelectedAsst(a)}
                className="px-[12px] py-[5px] rounded-[8px] border border-[var(--border-300)] bg-white ![font-family:var(--font-heading)] !font-semibold !text-[12px] !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130"
              >
                Chi tiết
              </button>
              {a.status !== 'BANNED' && (
                <button
                  onClick={() => handleToggleStatus(a)}
                  className={`px-[12px] py-[5px] rounded-[8px] border-none ![font-family:var(--font-heading)] !font-semibold !text-[12px] ${a.status === 'ACTIVE' ? 'bg-[var(--warning-50)] !text-[var(--warning-600)] hover:bg-[var(--warning-100)]' : 'bg-[var(--success-50)] !text-[var(--success-600)] hover:bg-[var(--success-100)]'} cursor-pointer transition-colors duration-130`}
                >
                  {a.status === 'ACTIVE' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                </button>
              )}
              {a.status !== 'BANNED' && (
                <button
                  onClick={() => handleDeleteClick(a.id, a.name)}
                  className="px-[12px] py-[5px] rounded-[8px] border-none bg-[var(--error-50)] ![font-family:var(--font-heading)] !font-semibold !text-[12px] !text-[var(--error-600)] hover:bg-[var(--error-100)] cursor-pointer transition-colors duration-130"
                >
                  Xóa
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {assistantData?.paging && (
        <Pagination
          currentPage={page}
          totalPages={assistantData.paging.totalPages}
          onPageChange={setPage}
        />
      )}

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
        />
      )}
    </div>
  )
}
