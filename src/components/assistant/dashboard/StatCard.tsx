import React from 'react';

export interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  icon: string;
  color: string;
  background: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  icon,
  color,
  background,
}) => {
  return (
    <div className="bg-white border border-[#E4EBE5] rounded-[18px] p-[22px_20px] shadow-[0_1px_6px_rgba(0,0,0,0.06)] flex flex-col justify-between">
      <div className="flex justify-between items-start mb-[14px]">
        <div
          className="w-[42px] h-[42px] rounded-[12px] flex items-center justify-center text-[20px]"
          style={{ backgroundColor: background }}
        >
          {icon}
        </div>
      </div>
      <div>
        <div className="font-['Be_Vietnam_Pro'] font-[800] text-[26px] text-[#1B1F1C] leading-[1] mb-[14px]">
          {value}
        </div>
        <div className="font-['Noto_Sans'] text-[12px] text-[#6B746D] mt-[4px] mb-[2px]">
          {label}
        </div>
        <div
          className="font-['Be_Vietnam_Pro'] font-[600] text-[11px]"
          style={{ color: color }}
        >
          {delta}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
