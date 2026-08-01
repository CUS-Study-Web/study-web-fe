import { useNavigate } from 'react-router-dom';
import AssistantStatCard from '../../components/assistant/dashboard/AssistantStatCard';
import AssistantQuickActions from '../../components/assistant/dashboard/AssistantQuickActions';
import AssistantRecentActivity from '../../components/assistant/dashboard/AssistantRecentActivity';
import { ASST_STAT_CARDS } from '../../types/assistant/mockData';

const AssistantDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Welcome Section */}
      <div className="mb-7">
        <div className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-h3)] text-[var(--text-primary)] m-0 mb-1">
          Xin chào, Trợ giảng! 👋
        </div>
        <div className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)] m-0">
          Dưới đây là tổng quan hoạt động hôm nay.
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-3 gap-4.5 mb-7">
        {ASST_STAT_CARDS.map((card) => (
          <AssistantStatCard
            key={card.id}
            {...card}
          />
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-[1fr_360px] gap-5">
        <AssistantQuickActions navigate={navigate} />
        <AssistantRecentActivity />
      </div>
    </div>
  );
};

export default AssistantDashboard;

