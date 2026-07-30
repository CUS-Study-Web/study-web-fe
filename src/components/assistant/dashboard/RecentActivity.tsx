import React from 'react';
import { ASST_RECENT_ACTIVITIES } from '../../../types/assistant/mockData';

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white border border-[#E4EBE5] rounded-[18px] p-[22px] shadow-[0_1px_6px_rgba(0,0,0,0.06)] w-full">
      <div className="font-['Be_Vietnam_Pro'] font-[700] text-[16px] text-[#1B1F1C] mb-[16px]">
        Hoạt động gần đây
      </div>
      <div className="flex flex-col gap-0">
        {ASST_RECENT_ACTIVITIES.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start gap-[12px] py-[12px] ${
              index !== ASST_RECENT_ACTIVITIES.length - 1
                ? 'border-b border-[#F4F7F4]'
                : ''
            }`}
          >
            <div className="w-[34px] h-[34px] rounded-[10px] bg-[#F4F7F4] flex items-center justify-center shrink-0 text-[16px]">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-['Noto_Sans'] text-[13px] text-[#1B1F1C] leading-[1.5]">
                {activity.text}
              </div>
              <div className="font-['Noto_Sans'] text-[11px] text-[#A0AAA2] mt-[3px]">
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
