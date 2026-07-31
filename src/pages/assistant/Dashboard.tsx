import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/assistant/dashboard/StatCard';
import QuickActions from '../../components/assistant/dashboard/QuickActions';
import RecentActivity from '../../components/assistant/dashboard/RecentActivity';
import { ASST_STAT_CARDS } from '../../types/assistant/mockData';

const Dashboard = () => {
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
          <StatCard
            key={card.id}
            {...card}
          />
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-[1fr_360px] gap-5">
        <QuickActions navigate={navigate} />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
