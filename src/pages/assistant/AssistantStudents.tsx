import { useState, useMemo } from 'react';
import AssistantStudentDetailPopup from '../../components/assistant/student/AssistantStudentDetailPopup';
import { DEMO_STUDENTS_ASST } from '../../types/assistant/mockData';
import type { AssistantStudent } from '../../types/assistant/models';

export default function AssistantStudents() {
  const [search, setSearch] = useState('');
  const [detailStudent, setDetailStudent] = useState<AssistantStudent | null>(null);

  const filtered = useMemo(() => {
    return DEMO_STUDENTS_ASST.filter(s =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
            {DEMO_STUDENTS_ASST.length} học viên
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
            placeholder="Tìm kiếm theo email hoặc khóa học..."
            className="flex-1 bg-transparent outline-none border-none font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--surface-500)]">
                {['EMAIL', 'KHÓA HỌC CHỦ YẾU', 'TIẾN ĐỘ', 'NGÀY THAM GIA', 'TRẠNG THÁI', ''].map((label) => (
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
              {filtered.map((s) => {
                const isActive = s.status === 'Hoạt động';
                return (
                  <tr key={s.id} className="border-t border-[var(--surface-500)] hover:bg-[var(--surface-400)] transition-colors">
                    {/* Email */}
                    <td className="px-4 py-3.5 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)]">
                      {s.email}
                    </td>
                    {/* Course */}
                    <td className="px-4 py-3.5 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--neutral-800)]">
                      {s.course}
                    </td>
                    {/* Progress */}
                    <td className="px-4 py-3.5 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[var(--surface-500)] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${s.progress}%`,
                              background: s.progress === 100 ? 'var(--brand-700)' : 'var(--brand-400)',
                            }}
                          />
                        </div>
                        <span className="font-[family-name:var(--font-heading)] text-[length:var(--text-caption)] font-bold text-[var(--text-primary)] shrink-0">
                          {s.progress}%
                        </span>
                      </div>
                    </td>
                    {/* Joined */}
                    <td className="px-4 py-3.5 font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)]">
                      {s.joined}
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className="inline-block rounded-[var(--radius-pill)] px-2.5 py-1 font-[family-name:var(--font-heading)] text-[length:var(--text-caption)] font-bold"
                        style={{
                          background: isActive ? 'var(--brand-soft-500)' : 'var(--warning-50)',
                          color: isActive ? 'var(--brand-500)' : 'var(--warning-500)',
                        }}
                      >
                        {s.status}
                      </span>
                    </td>
                    {/* Action */}
                    <td className="px-4 py-3.5 text-center">
                      <div
                        onClick={() => setDetailStudent(s)}
                        className="inline-block cursor-pointer rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--surface-card)] px-3 py-1.5 font-[family-name:var(--font-heading)] text-[length:var(--text-caption)] font-semibold text-[var(--neutral-800)] hover:bg-[var(--surface-400)] transition-colors"
                      >
                        Chi tiết
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)]">
              Không tìm thấy học viên nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
