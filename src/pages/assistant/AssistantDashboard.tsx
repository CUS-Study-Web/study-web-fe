import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AssistantStatCard from '../../components/assistant/dashboard/AssistantStatCard';
import AssistantQuickActions from '../../components/assistant/dashboard/AssistantQuickActions';
import AssistantRecentActivity from '../../components/assistant/dashboard/AssistantRecentActivity';
import { useAssistantDashboard } from '../../hooks/queries/useAssistantDashboard';

const AssistantDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: dashboardData, isLoading, isError } = useAssistantDashboard();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="text-[var(--text-secondary)]">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="text-[var(--status-error)]">Có lỗi xảy ra khi tải dữ liệu!</div>
      </div>
    );
  }

  const stats = dashboardData?.data;

  const statCards = [
    {
      id: 1,
      label: "Tổng học viên",
      value: stats?.totalLearners.value.toLocaleString('vi-VN') || "0",
      delta: `${stats?.totalLearners.delta && stats.totalLearners.delta > 0 ? '+' : ''}${stats?.totalLearners.delta || 0} tuần này`,
      icon: "👥",
      color: "#2C5A31",
      background: "#DCE9DE"
    },
    {
      id: 2,
      label: "Bài tập đã đăng",
      value: stats?.totalExercises.value.toLocaleString('vi-VN') || "0",
      delta: `${stats?.totalExercises.delta && stats.totalExercises.delta > 0 ? '+' : ''}${stats?.totalExercises.delta || 0} tuần này`,
      icon: "📎",
      color: "#2F6FAE",
      background: "#DDEAF8"
    },
    {
      id: 3,
      label: "Đề thi đã tạo",
      value: stats?.totalExams.value.toLocaleString('vi-VN') || "0",
      delta: `${stats?.totalExams.delta && stats.totalExams.delta > 0 ? '+' : ''}${stats?.totalExams.delta || 0} tuần này`,
      icon: "📝",
      color: "#B45309",
      background: "#FEF3C7"
    }
  ];

  return (
    <div className="w-full">
      {/* Welcome Section */}
      <div className="mb-7">
        <div className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-h3)] text-[var(--text-primary)] m-0 mb-1">
          Xin chào, {user?.name || 'Trợ giảng'}! 👋
        </div>
        <div className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)] m-0">
          Dưới đây là tổng quan hoạt động hôm nay.
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-7 md:mb-10 lg:mb-14">
        {statCards.map((card) => (
          <AssistantStatCard
            key={card.id}
            {...card}
          />
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-5 md:gap-6 lg:gap-8">
        <AssistantQuickActions navigate={navigate} />
        <AssistantRecentActivity activities={stats?.recentActivities} />
      </div>
    </div>
  );
};

export default AssistantDashboard;

