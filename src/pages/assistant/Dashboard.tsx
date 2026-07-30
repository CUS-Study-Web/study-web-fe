import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/assistant/dashboard/StatCard';
import QuickActions from '../../components/assistant/dashboard/QuickActions';
import RecentActivity from '../../components/assistant/dashboard/RecentActivity';
import { ASST_STAT_CARDS } from '../../types/assistant/mockData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Welcome Section */}
      <div className="mb-[28px]">
        <div className="font-['Be_Vietnam_Pro'] font-[700] text-[24px] text-[#1B1F1C] m-0 mb-[4px]">
          Xin chào, Trợ giảng! 👋
        </div>
        <div className="font-['Noto_Sans'] text-[14px] text-[#6B746D] m-0">
          Dưới đây là tổng quan hoạt động hôm nay.
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-3 gap-[18px] mb-[28px]">
        {ASST_STAT_CARDS.map((card) => (
          <StatCard
            key={card.id}
            label={card.label}
            value={card.value}
            delta={card.delta}
            icon={card.icon}
            color={card.color}
            background={card.background}
          />
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-[1fr_360px] gap-[20px]">
        <QuickActions navigate={navigate} />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
