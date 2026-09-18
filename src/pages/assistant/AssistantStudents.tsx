import { useState, useEffect } from 'react';
import AssistantStudentDetailPopup from '../../components/assistant/student/AssistantStudentDetailPopup';
import { useListLearnersQuery } from '../../hooks/queries/useSystemLearners';
import type { LearnerSummaryResponse } from '../../types/api/system.api';

// ── Status helpers ────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'Hoạt động',
  INACTIVE: 'Tạm khóa',
  BANNED: 'Bị cấm',
};

const STATUS_STYLE: Record<string, { background: string; color: string }> = {
  ACTIVE: { background: 'var(--brand-soft-500)', color: 'var(--brand-500)' },
  INACTIVE: { background: 'var(--warning-50)', color: 'var(--warning-500)' },
  BANNED: { background: '#FEF2F2', color: '#DC2626' },
};

// ── Main page ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 15;

export default function AssistantStudents() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [detailStudent, setDetailStudent] = useState<LearnerSummaryResponse | null>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(0);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError } = useListLearnersQuery({
    search: search || undefined,
    page,
    size: PAGE_SIZE,
  });

  const students = data?.data ?? [];
  const paging = data?.paging;
  const totalPages = paging?.totalPages ?? 1;
  const total = paging?.total ?? 0;

  return (
    <div className="w-full">
      {detailStudent && (
        <AssistantStudentDetailPopup
          student={detailStudent}
          onClose={() => setDetailStudent(null)}
        />
      )}

      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-[var(--text-primary)] mb-1">
            Danh sách học viên
          </div>
          <div className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)]">
            {isLoading ? 'Đang tải...' : `${total} học viên`}
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-[var(--surface-card)] rounded-[var(--radius-lg)] border border-[var(--border-default)] shadow-[var(--shadow-clay-sm)] overflow-hidden">
        {/* Search Bar */}
        <div className="flex items-center gap-2.5 border-b border-[var(--surface-500)] px-5 py-3.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm theo email hoặc tên..."
            className="flex-1 bg-transparent outline-none border-none font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--surface-500)]">
                {['EMAIL', 'TÊN', 'KHÓA HỌC CHỦ YẾU', 'TIẾN ĐỘ', 'ĐĂNG NHẬP GẦN NHẤT', 'TRẠNG THÁI', ''].map((label) => (
                  <th
                    key={label}
                    className="px-4 py-2.5 whitespace-nowrap font-[family-name:var(--font-heading)] text-[length:var(--text-caption)] font-bold text-[var(--text-secondary)] uppercase tracking-[0.4px]"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={7} className="p-10 text-center font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)]">
                    Đang tải danh sách học viên...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={7} className="p-10 text-center font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[#DC2626]">
                    Đã có lỗi xảy ra khi tải dữ liệu.
                  </td>
                </tr>
              )}
              {!isLoading && !isError && students.map((s) => {
                const statusStyle = STATUS_STYLE[s.status] ?? STATUS_STYLE['INACTIVE'];
                const statusLabel = STATUS_LABEL[s.status] ?? s.status;
                return (
                  <tr key={s.id} className="border-t border-[var(--surface-500)] hover:bg-[var(--surface-400)] transition-colors">
                    {/* Email */}
                    <td className="px-4 py-3.5 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)]">
                      {s.gmail}
                    </td>
                    {/* Name */}
                    <td className="px-4 py-3.5 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)]">
                      {s.name || '—'}
                    </td>
                    {/* Course */}
                    <td className="px-4 py-3.5 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--neutral-800)]">
                      {(!s.primaryCourse || s.primaryCourse === 'N/A') ? 'Chưa có' : s.primaryCourse}
                    </td>
                    {/* Progress */}
                    <td className="px-4 py-3.5 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[var(--surface-500)] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${s.progress ?? 0}%`,
                              background: s.progress === 100 ? 'var(--brand-700)' : 'var(--brand-400)',
                            }}
                          />
                        </div>
                        <span className="font-[family-name:var(--font-heading)] text-[length:var(--text-caption)] font-bold text-[var(--text-primary)] shrink-0">
                          {s.progress ?? 0}%
                        </span>
                      </div>
                    </td>
                    {/* Last Login */}
                    <td className="px-4 py-3.5 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)]">
                      {s.lastLogin || '—'}
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className="inline-block rounded-[var(--radius-pill)] px-2.5 py-1 font-[family-name:var(--font-heading)] text-[length:var(--text-caption)] font-bold"
                        style={statusStyle}
                      >
                        {statusLabel}
                      </span>
                    </td>
                    {/* Chi tiết */}
                    <td className="px-4 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => setDetailStudent(s)}
                        className="px-2.5 py-1 rounded-[6px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[11px] text-[var(--text-primary)] hover:bg-[var(--surface-500)] transition-colors cursor-pointer"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })}
              {!isLoading && !isError && students.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)]">
                    Không tìm thấy học viên nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-[var(--surface-500)]">
            <span className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)]">
              Trang {page + 1} / {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1.5 rounded-[6px] border border-[var(--border-default)] font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] bg-white hover:bg-[var(--surface-500)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                ← Trước
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1.5 rounded-[6px] border border-[var(--border-default)] font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] bg-white hover:bg-[var(--surface-500)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Tiếp →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

