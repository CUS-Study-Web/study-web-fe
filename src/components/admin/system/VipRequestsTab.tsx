import { useState, useEffect } from 'react'
import {
  useGetVipRequestsQuery,
  useApproveVipRequestMutation,
  useDisapproveVipRequestMutation
} from '../../../hooks/queries/useSystemVipRequests'
import Pagination from '../../common/Pagination'
import { ConfirmMiniModal } from '../modals/website/ConfirmMiniModal'

export const VipRequestsTab = () => {
  const [vipSearch, setVipSearch] = useState('')
  const [vipFilter, setVipFilter] = useState('Tất cả')
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
  }, [vipSearch, vipFilter])

  const statusMap: Record<string, string> = {
    'Chờ duyệt': 'WAITING',
    'Đã duyệt': 'APPROVED',
    'Từ chối': 'DECLINED'
  }

  const { data: vipData, isLoading } = useGetVipRequestsQuery({
    search: vipSearch || undefined,
    status: vipFilter !== 'Tất cả' ? statusMap[vipFilter] : undefined,
    page: page - 1,
    size: 10,
    sort: 'createdAt,desc'
  })

  const approveMutation = useApproveVipRequestMutation()
  const rejectMutation = useDisapproveVipRequestMutation()

  const vipRequests = vipData?.data || []

  const handleApprove = (id: string, name: string) => {
    setConfirmState({
      isOpen: true,
      title: 'Duyệt yêu cầu',
      message: `Bạn có chắc chắn muốn duyệt yêu cầu VIP của ${name}?`,
      isDanger: false,
      action: () => {
        approveMutation.mutate(id, { onSuccess: () => setConfirmState(s => ({ ...s, isOpen: false })) })
      }
    })
  }

  const handleReject = (id: string, name: string) => {
    setConfirmState({
      isOpen: true,
      title: 'Từ chối yêu cầu',
      message: `Bạn có chắc chắn muốn từ chối yêu cầu VIP của ${name}?`,
      isDanger: true,
      action: () => {
        rejectMutation.mutate(id, { onSuccess: () => setConfirmState(s => ({ ...s, isOpen: false })) })
      }
    })
  }



  const getStatusBadgeClass = (s: string) => {
    if (s === "APPROVED") return "bg-[var(--success-50)] text-[var(--success-500)]"
    if (s === "DECLINED") return "bg-[var(--error-50)] text-[var(--error-500)]"
    return "bg-[var(--warning-50)] text-[var(--warning-500)]"
  }

  const getStatusLabel = (s: string) => {
    if (s === "APPROVED") return "Đã duyệt"
    if (s === "DECLINED") return "Từ chối"
    return "Chờ duyệt"
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[12px] mb-[18px]">
        <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
          Yêu cầu nâng cấp VIP ({vipData?.paging.total || 0})
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

      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--surface-500)]">
              {["Email", "SĐT", "Ghi chú", "Ngày yêu cầu", "Minh chứng", "Trạng thái", ""].map((h) => (
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
            {isLoading ? (
               <tr>
                 <td colSpan={7} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                   Đang tải...
                 </td>
               </tr>
            ) : vipRequests.length === 0 ? (
               <tr>
                 <td colSpan={7} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                   Không có yêu cầu nào.
                 </td>
               </tr>
            ) : vipRequests.map((r, i) => (
              <tr
                key={r.id}
                className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-400)] ${
                  i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"
                }`}
              >
                <td className="p-[12px_14px] [font-family:var(--font-body)] text-[12.5px] text-[var(--text-secondary-600)]">
                  <div className="font-semibold text-[var(--text-primary)]">{r.name}</div>
                  <div className="text-[12px] text-[var(--text-secondary-300)]">{r.gmail}</div>
                  <div className="mt-[4px]">
                    <span className="inline-block bg-[var(--brand-soft-500)] text-[var(--brand-500)] rounded-full px-[8px] py-[1px] text-[10px] font-bold">
                      {r.mainCourse || 'Chưa rõ'}
                    </span>
                  </div>
                </td>
                <td className="p-[12px_14px] [font-family:var(--font-body)] text-[12.5px] text-[var(--text-secondary-600)] whitespace-nowrap">
                  {r.phone || "---"}
                </td>
                <td className="p-[12px_14px] [font-family:var(--font-body)] text-[12.5px] text-[var(--text-secondary-600)] max-w-[280px]">
                  {r.note || "---"}
                </td>
                <td className="p-[12px_14px] [font-family:var(--font-body)] text-[12.5px] text-[var(--text-secondary-600)] whitespace-nowrap">
                  {r.requestDate}
                </td>
                <td className="p-[12px_14px]">
                  {r.evidenceUrl ? (
                    <a
                      href={r.evidenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-[4px] px-[10px] py-[4px] rounded-[8px] bg-[var(--info-50)] text-[var(--info-500)] [font-family:var(--font-heading)] font-semibold text-[11px] hover:bg-[var(--info-100)] transition-colors duration-130 no-underline"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      Xem
                    </a>
                  ) : (
                    <span className="text-[var(--text-secondary-200)] text-[12px]">---</span>
                  )}
                </td>
                <td className="p-[12px_14px]">
                  <span
                    className={`inline-block px-[11px] py-[4px] rounded-full [font-family:var(--font-heading)] font-bold text-[11px] ${getStatusBadgeClass(
                      r.status
                    )}`}
                  >
                    {getStatusLabel(r.status)}
                  </span>
                </td>
                <td className="p-[12px_14px] relative whitespace-nowrap">
                  {r.status === "WAITING" && (
                    <div className="flex justify-end items-center gap-[6px]">
                      <button
                        onClick={() => handleApprove(r.id, r.name)}
                        disabled={approveMutation.isPending || rejectMutation.isPending}
                        className="px-[12px] py-[5px] rounded-[8px] border-none bg-[var(--success-50)] ![font-family:var(--font-heading)] !font-semibold !text-[12px] !text-[var(--success-600)] hover:bg-[var(--success-100)] cursor-pointer transition-colors duration-130 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => handleReject(r.id, r.name)}
                        disabled={approveMutation.isPending || rejectMutation.isPending}
                        className="px-[12px] py-[5px] rounded-[8px] border-none bg-[var(--error-50)] ![font-family:var(--font-heading)] !font-semibold !text-[12px] !text-[var(--error-600)] hover:bg-[var(--error-100)] cursor-pointer transition-colors duration-130 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Từ chối
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {vipData?.paging && (
        <Pagination
          currentPage={page}
          totalPages={vipData.paging.totalPages}
          onPageChange={setPage}
        />
      )}

      {confirmState.isOpen && (
        <ConfirmMiniModal
          title={confirmState.title}
          message={confirmState.message}
          isDanger={confirmState.isDanger}
          isSubmitting={approveMutation.isPending || rejectMutation.isPending}
          onConfirm={confirmState.action}
          onClose={() => setConfirmState(s => ({ ...s, isOpen: false }))}
        />
      )}
    </div>
  )
}
