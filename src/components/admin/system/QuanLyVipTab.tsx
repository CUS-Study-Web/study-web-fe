import { useState } from "react"
import { useRegisterFormsQuery, useRegisterFormsCountQuery } from "../../../hooks/queries/useRegisterForms"
import { Spinner } from "../../Loading"
import { RegisterFormDetailModal } from "../modals/system/RegisterFormDetailModal"

export default function QuanLyVipTab() {
  const [dateFilter, setDateFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)
  const pageSize = 10

  const queryParams = {
    date: dateFilter !== "all" ? dateFilter : undefined,
    page: currentPage - 1,
    size: pageSize,
    sort: "createdAt,desc"
  }

  const { data: formsData, isLoading } = useRegisterFormsQuery(queryParams)
  const { data: countData } = useRegisterFormsCountQuery({ date: queryParams.date })

  const filtered = formsData?.data || []
  const totalCount = countData?.data?.count || 0
  const totalPages = formsData?.paging?.totalPages || Math.ceil(totalCount / pageSize) || 1

  return (
    <div className="w-full">
      {/* Top Bar / Controls */}
      <div className="flex justify-between items-center mb-5 flex-wrap gap-[14px]">
        {/* Left side: Date Filter */}
        <div className="flex items-center gap-[10px]">
          <label className="[font-family:var(--font-heading)] font-semibold text-[13.5px] text-[#1B1F1C] flex items-center gap-[7px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#2C5A31" strokeWidth="2" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="#2C5A31" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Lọc theo ngày đăng ký:
          </label>
          <input
            type="date"
            value={dateFilter === "all" ? "" : dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value || "all")
              setCurrentPage(1)
            }}
            className="px-[14px] py-[8px] rounded-[10px] border-[1.5px] border-[#D4DCD5] bg-[#FAFCFA] [font-family:var(--font-heading)] font-semibold text-[13px] text-[#1B1F1C] outline-none cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          />
          {dateFilter !== "all" && (
            <button
              onClick={() => {
                setDateFilter("all");
                setCurrentPage(1);
              }}
              className="text-[12px] text-[var(--error-500)] hover:underline [font-family:var(--font-body)] cursor-pointer bg-transparent border-none ml-2"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Right side: Total count indicator */}
        <div className="inline-flex items-center gap-[8px] px-[16px] py-[7px] rounded-full bg-[#DCE9DE] border border-[#C5DAC8]">
          <span className="w-2 h-2 rounded-full bg-[#2C5A31]" />
          <span className="[font-family:var(--font-heading)] font-bold text-[13.5px] text-[#2C5A31]">
            Tổng cộng: {totalCount} thí sinh
          </span>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="overflow-x-auto border border-[#E8EFEA] rounded-[14px]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#F4F7F4] border-b-[1.5px] border-[#E0EAE2]">
              <th className="px-[18px] py-[13px] [font-family:var(--font-heading)] font-bold text-[12.5px] text-[#1B1F1C] uppercase tracking-[0.3px] whitespace-nowrap">
                Họ và tên
              </th>
              <th className="px-[18px] py-[13px] [font-family:var(--font-heading)] font-bold text-[12.5px] text-[#1B1F1C] uppercase tracking-[0.3px] whitespace-nowrap">
                Số điện thoại
              </th>
              <th className="px-[18px] py-[13px] [font-family:var(--font-heading)] font-bold text-[12.5px] text-[#1B1F1C] uppercase tracking-[0.3px] whitespace-nowrap">
                Email
              </th>
              <th className="px-[18px] py-[13px] [font-family:var(--font-heading)] font-bold text-[12.5px] text-[#1B1F1C] uppercase tracking-[0.3px] whitespace-nowrap">
                Môn thi
              </th>
              <th className="px-[18px] py-[13px] [font-family:var(--font-heading)] font-bold text-[12.5px] text-[#1B1F1C] uppercase tracking-[0.3px] whitespace-nowrap">
                Ngày đăng ký
              </th>
              <th className="px-[18px] py-[13px] [font-family:var(--font-heading)] font-bold text-[12.5px] text-[#1B1F1C] uppercase tracking-[0.3px] text-right whitespace-nowrap">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-[18px] py-[36px] text-center">
                  <Spinner size="md" color="brand" />
                </td>
              </tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-[18px] py-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[#6B746D]">
                  Không có dữ liệu.
                </td>
              </tr>
            )}
            {!isLoading && filtered.map((row, idx) => (
              <tr
                key={row.id}
                className={`transition-colors duration-[120ms] hover:bg-[#F9FCF9] ${
                  idx < filtered.length - 1 ? "border-b border-[#EEF3EF]" : ""
                }`}
              >
                {/* 1. Họ và tên */}
                <td className="px-[18px] py-[14px] [font-family:var(--font-heading)] font-semibold text-[13.5px] text-[#1B1F1C] whitespace-nowrap">
                  <div className="flex items-center gap-[10px]">
                    <div className="w-8 h-8 rounded-full bg-[#DCE9DE] flex items-center justify-center text-[#2C5A31] font-bold text-[12px] shrink-0">
                      {row.name?.charAt(0) || '?'}
                    </div>
                    <span>{row.name}</span>
                  </div>
                </td>
                {/* 2. Số điện thoại */}
                <td className="px-[18px] py-[14px] [font-family:var(--font-body)] text-[13px] text-[#3D4540] whitespace-nowrap">
                  {row.phoneNumber || row.phoneNumer}
                </td>
                {/* 3. Email */}
                <td className="px-[18px] py-[14px] [font-family:var(--font-body)] text-[13px] text-[#3D4540] whitespace-nowrap">
                  {row.email}
                </td>
                {/* 4. Môn thi */}
                <td className="px-[18px] py-[14px] whitespace-nowrap">
                  <span className="inline-block px-[11px] py-[4px] rounded-[8px] bg-[#EEF5EF] border border-[#DCE9DE] text-[#2C5A31] [font-family:var(--font-heading)] font-semibold text-[12px]">
                    {row.subject}
                  </span>
                </td>
                {/* 5. Ngày đăng ký */}
                <td className="px-[18px] py-[14px] [font-family:var(--font-heading)] font-semibold text-[13px] text-[#1B1F1C] whitespace-nowrap">
                  {row.registeredDate ? new Date(row.registeredDate).toLocaleDateString('vi-VN') : new Date(row.createdAt).toLocaleDateString('vi-VN')}
                </td>
                {/* 6. Thao tác */}
                <td className="px-[18px] py-[14px] text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setSelectedFormId(row.id)}
                    className="px-[12px] py-[5px] rounded-[8px] border border-[var(--border-300)] bg-white ![font-family:var(--font-heading)] !font-semibold !text-[12px] !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130"
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom: Standard pagination controls */}
      <div className="flex items-center justify-between mt-[18px] pt-[14px] flex-wrap gap-[12px]">
        <div className="[font-family:var(--font-body)] text-[13px] text-[#6B746D]">
          Hiển thị {filtered.length} trên {totalCount} kết quả
        </div>
        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-[14px] py-[6px] rounded-[8px] border-[1.5px] border-[#D4DCD5] bg-white [font-family:var(--font-heading)] font-semibold text-[13px] ${
              currentPage === 1 ? "text-[#A0AAA2] cursor-default" : "text-[#1B1F1C] cursor-pointer"
            }`}
          >
            &lt;
          </button>
          <span className="[font-family:var(--font-heading)] font-semibold text-[13px] text-[#1B1F1C] px-[8px]">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-[14px] py-[6px] rounded-[8px] border-[1.5px] border-[#D4DCD5] bg-white [font-family:var(--font-heading)] font-semibold text-[13px] ${
              currentPage === totalPages ? "text-[#A0AAA2] cursor-default" : "text-[#1B1F1C] cursor-pointer"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedFormId && (
        <RegisterFormDetailModal
          formId={selectedFormId}
          onClose={() => setSelectedFormId(null)}
        />
      )}
    </div>
  )
}

