import { useState, useEffect } from 'react'
import type { VipReq } from '../../../types/admin'

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
              className="pl-[30px] pr-[12px] py-[8px] rounded-[10px] border border-[var(--border-500)] [font-family:var(--font-body)] text-[13px] outline-none w-[190px] focus:border-[var(--brand-500)]"
            />
          </div>
          {["Tất cả", "Chờ duyệt", "Đã duyệt", "Từ chối"].map((f) => (
            <button
              key={f}
              onClick={() => setVipFilter(f)}
              className={`px-[13px] py-[7px] rounded-[9px] ![font-family:var(--font-heading)] !font-semibold !text-[12px] cursor-pointer transition-all duration-[var(--motion-fast)] outline-none border ${
                vipFilter === f
                  ? "!border-transparent !bg-[var(--brand-500)] !text-white"
                  : "!border-[var(--border-500)] !bg-white !text-[var(--text-secondary-300)] hover:text-[var(--text-primary)]"
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
