import React from 'react';

interface QuickActionsProps {
  navigate: (path: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ navigate }) => {
  return (
    <div className="bg-white border border-[#E4EBE5] rounded-[18px] p-[22px] shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
      <div className="font-['Be_Vietnam_Pro'] font-[700] text-[16px] text-[#1B1F1C] mb-[18px]">
        Thao tác nhanh
      </div>
      <div className="grid grid-cols-2 gap-[12px]">
        {/* Primary Action */}
        <div
          role="button"
          onClick={() => navigate('/assistant/exams')}
          className="flex items-center gap-[12px] p-[16px_18px] rounded-[14px] cursor-pointer text-left transition-all duration-140 hover:-translate-y-[2px] bg-[#2C5A31] text-white border-none shadow-[0_2px_8px_rgba(44,90,49,0.25)]"
        >
          <span className="text-[22px]">📤</span>
          <span className="font-['Be_Vietnam_Pro'] font-[700] text-[14px]">
            Tải lên tài liệu
          </span>
        </div>

        {/* Secondary Action 1 */}
        <div
          role="button"
          onClick={() => navigate('/assistant/courses')}
          className="flex items-center gap-[12px] p-[16px_18px] rounded-[14px] cursor-pointer text-left transition-all duration-140 hover:-translate-y-[2px] bg-[#EEF5EF] text-[#2C5A31] border-[1.5px] border-solid border-[#DCE9DE]"
        >
          <span className="text-[22px]">📎</span>
          <span className="font-['Be_Vietnam_Pro'] font-[700] text-[14px]">
            Quản lý nội dung khóa học
          </span>
        </div>

        {/* Secondary Action 2 */}
        <div
          role="button"
          onClick={() => navigate('/assistant/students')}
          className="flex items-center gap-[12px] p-[16px_18px] rounded-[14px] cursor-pointer text-left transition-all duration-140 hover:-translate-y-[2px] bg-[#EEF5EF] text-[#2C5A31] border-[1.5px] border-solid border-[#DCE9DE]"
        >
          <span className="text-[22px]">👥</span>
          <span className="font-['Be_Vietnam_Pro'] font-[700] text-[14px]">
            Danh sách học viên
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
