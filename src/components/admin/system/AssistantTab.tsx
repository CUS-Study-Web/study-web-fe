import { useState, useEffect } from 'react'
import type { Assistant } from '../../../types/admin'
import { AssistantDetailModal, CreateAssistantModal } from '../modals/system'

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
                    className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                  >
                    Xem chi tiết
                  </button>
                  {a.status === 'Hoạt động' && (
                    <button
                      onClick={() => {
                        onToggleStatus(a.id)
                        setActiveDropdownRowId(null)
                      }}
                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--warning-500)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                    >
                      Vô hiệu hóa
                    </button>
                  )}
                  {a.status !== 'Hoạt động' && (
                    <button
                      onClick={() => {
                        onToggleStatus(a.id)
                        setActiveDropdownRowId(null)
                      }}
                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--brand-base-500)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                    >
                      Kích hoạt
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleDeleteClick(a.id, a.name)
                      setActiveDropdownRowId(null)
                    }}
                    className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
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
