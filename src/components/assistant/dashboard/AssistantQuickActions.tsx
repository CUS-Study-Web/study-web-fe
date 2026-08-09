import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';

interface AssistantQuickActionsProps {
  navigate: ReturnType<typeof useNavigate>;
}

const AssistantQuickActions = ({ navigate }: AssistantQuickActionsProps) => {
  const materialsPath = ROUTES.ASSISTANT.MATERIALS;
  const coursesPath = ROUTES.ASSISTANT.COURSES;
  const studentsPath = ROUTES.ASSISTANT.STUDENTS;
  const flashcardsPath = ROUTES.ASSISTANT.FLASHCARDS;

  const actions = [
    {
      emoji: '📤',
      label: 'Tải lên tài liệu',
      onClick: () => navigate(`${materialsPath}?upload=1`),
      primary: true,
    },
    {
      emoji: '🃏',
      label: 'Tạo chủ đề Flashcard',
      onClick: () => navigate(`${flashcardsPath}?create=1`),
      primary: false,
    },
    {
      emoji: '📎',
      label: 'Quản lý nội dung khóa học',
      onClick: () => navigate(coursesPath),
      primary: false,
    },
    {
      emoji: '👥',
      label: 'Danh sách học viên',
      onClick: () => navigate(studentsPath),
      primary: false,
    },
  ];

  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-default)] rounded-[var(--radius-lg)] p-5.5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
      <div className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body)] text-[var(--text-primary)] mb-4.5">
        Thao tác nhanh
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <div
            key={action.label}
            role="button"
            onClick={action.onClick}
            className={`flex items-center gap-3 py-4 px-4.5 rounded-[var(--radius-md)] cursor-pointer text-left transition-all duration-140 hover:-translate-y-0.5 ${
              action.primary
                ? 'bg-[var(--brand-500)] text-[var(--text-inverse)] border-none shadow-[0_2px_8px_rgba(44,90,49,0.25)]'
                : 'bg-[var(--brand-soft-200)] text-[var(--brand-500)] border-[1.5px] border-solid border-[var(--brand-soft-500)]'
            }`}
          >
            <span className="text-[22px]">{action.emoji}</span>
            <span className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)]">
              {action.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssistantQuickActions;
