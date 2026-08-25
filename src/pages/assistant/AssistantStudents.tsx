import { useState, useMemo, useRef, useEffect } from 'react';
import AssistantStudentDetailPopup from '../../components/assistant/student/AssistantStudentDetailPopup';

import { DEMO_STUDENTS_ASST } from '../../types/mockData';
import type { AssistantStudent } from '../../types/assistant';

// ── 3-dot action menu per student row ────────────────────────────────────────

interface StudentActionMenuProps {
  student: AssistantStudent;
  onViewDetail: () => void;
}

function StudentActionMenu({ student: _student, onViewDetail }: StudentActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    }
    setOpen(prev => !prev);
  };

  useEffect(() => {
    if (!open) return;
    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
      if (e instanceof MouseEvent) {
        if (btnRef.current?.contains(e.target as Node)) return;
        if (menuRef.current?.contains(e.target as Node)) return;
      }
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('keydown', handleClose);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="w-8 h-8 rounded-full border border-[var(--border-strong)] bg-white cursor-pointer inline-flex items-center justify-center hover:bg-[var(--surface-500)] transition-colors"
        aria-label="Tùy chọn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--neutral-500)">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: menuPos.top,
            right: menuPos.right,
            zIndex: 9999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
          }}
          className="bg-white rounded-[10px] border border-[var(--border-default)] py-1.5 min-w-[160px]"
        >
          {/* Xem chi tiết */}
          <button
            onClick={() => { setOpen(false); onViewDetail(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
            Xem chi tiết
          </button>
        </div>
      )}
    </>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AssistantStudents() {
  const [students] = useState<AssistantStudent[]>(DEMO_STUDENTS_ASST);
  const [search, setSearch] = useState('');
  const [detailStudent, setDetailStudent] = useState<AssistantStudent | null>(null);

  const filtered = useMemo(() => {
    return students.filter(s =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, students]);

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
            {students.length} học viên
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
                    {/* 3-dot Action */}
                    <td className="px-4 py-3.5 text-center">
                      <StudentActionMenu
                        student={s}
                        onViewDetail={() => setDetailStudent(s)}
                      />
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
