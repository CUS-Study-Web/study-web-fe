import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { ACTIVITY_LOG, MONTHS } from './MockData';
import { Suspense, lazy, useState } from 'react';
import StatsCard from '../../components/StatsCard';
import IconBox from '../../components/IconBox';
import '../../styles/AdminDashboard.css';
import Loading from '../../components/Loading';
import {
  STAT_ACTION_OPTIONS,
  type ActionType,
} from '../../types/api/system.api';
import {
  useGetDailyStatsQuery,
  useGetMonthlyStatsQuery,
} from '../../hooks/queries/useSystemStats';

const BarChart = lazy(() => import('../../components/Charts').then((m) => ({ default: m.BarChart })));
const LineChart = lazy(() => import('../../components/Charts').then((m) => ({ default: m.LineChart })));

const formatDayLabel = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}`;
  }
  return dateStr;
};

const getActionLabel = (action: ActionType) =>
  STAT_ACTION_OPTIONS.find((o) => o.value === action)?.label || action;

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Selected actions for each visualization
  const [chartAction1, setChartAction1] = useState<ActionType>('LOGIN');
  const [chartAction2, setChartAction2] = useState<ActionType>('REGISTER');
  const [chartAction3, setChartAction3] = useState<ActionType>('LOGIN');

  // Queries
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const { data: dailyData, isLoading: isDailyLoading } = useGetDailyStatsQuery({ days: 7 });
  const { data: monthlyData, isLoading: isMonthlyLoading } = useGetMonthlyStatsQuery({ year: currentYear });

  const dailyItems = dailyData?.data?.items || [];
  const dailyLabels = dailyItems.map((item) => formatDayLabel(item.date));

  const monthlyItems = monthlyData?.data?.items || [];
  // Ensure we map across all 12 months
  const getMonthlyDataForAction = (action: ActionType) => {
    return Array.from({ length: 12 }, (_, i) => {
      const monthNum = i + 1;
      const found = monthlyItems.find((item) => item.month === monthNum);
      return found?.actionCounts?.[action] ?? 0;
    });
  };

  // Quick stats computed from real responses
  const weeklyLoginsCount = dailyItems.reduce(
    (acc, cur) => acc + (cur.actionCounts?.['LOGIN'] ?? 0),
    0
  );
  const currentMonthItem = monthlyItems.find((m) => m.month === currentMonth);
  const monthlyRegsCount = currentMonthItem?.actionCounts?.['REGISTER'] ?? 0;
  const monthlyVipCount = currentMonthItem?.actionCounts?.['REQUEST_VIP'] ?? 0;

  const quickStats = [
    {
      label: 'Lượt đăng nhập',
      sublabel: 'Tuần này',
      value: weeklyLoginsCount,
      trend: +12.4,
      color: 'var(--brand-500)',
      icon: (
        <IconBox bg="var(--brand-soft-500)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="var(--brand-500)" strokeWidth="2" />
            <path
              d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
              stroke="var(--brand-500)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </IconBox>
      ),
    },
    {
      label: 'Lượt đăng ký',
      sublabel: 'Tháng này',
      value: monthlyRegsCount,
      trend: +8.2,
      color: 'var(--info-500)',
      icon: (
        <IconBox bg="var(--info-50)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
              stroke="var(--info-500)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconBox>
      ),
    },
    {
      label: 'Lượt mở VIP',
      sublabel: 'Tháng này',
      value: monthlyVipCount,
      trend: -3.5,
      color: 'var(--warning-500)',
      icon: (
        <IconBox bg="var(--warning-50)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"
              stroke="var(--warning-500)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconBox>
      ),
    },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-[28px] pt-[40px] pb-[80px]">
      {/* Introduction */}
      <div className="mb-[32px]">
        <h1 className="mb-[6px] tracking-[-0.5px]">Tổng quan Quản trị viên</h1>
        <p>Chào mừng trở lại! Đây là hoạt động của hệ thống CUS hôm nay.</p>
      </div>

      {/* Quick status */}
      <div className="grid grid-cols-3 gap-[20px] mb-[32px]">
        {quickStats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-[20px] mb-[28px]">
        {/* Chart 1: 7 days daily */}
        <div className="surface-card p-[20px_22px] relative h-[310px] w-full flex flex-col">
          <div className="flex items-center justify-between gap-[8px] mb-[8px]">
            <span className="[font-family:var(--font-heading)] font-bold text-[13px] text-[var(--text-primary)] truncate">
              {getActionLabel(chartAction1)} (7 ngày)
            </span>
            <select
              value={chartAction1}
              onChange={(e) => setChartAction1(e.target.value as ActionType)}
              className="text-[12px] [font-family:var(--font-body)] bg-white border border-[var(--border-500)] rounded-[8px] px-[8px] py-[3px] text-[var(--text-secondary-600)] outline-none cursor-pointer"
            >
              {STAT_ACTION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-h-0">
            <Suspense fallback={<Loading />}>
              {isDailyLoading ? (
                <Loading />
              ) : (
                <BarChart
                  title={getActionLabel(chartAction1)}
                  label={getActionLabel(chartAction1)}
                  labels={dailyLabels}
                  data={dailyItems.map((item) => item.actionCounts?.[chartAction1] ?? 0)}
                  color="var(--brand-500)"
                />
              )}
            </Suspense>
          </div>
        </div>

        {/* Chart 2: Monthly LineChart */}
        <div className="surface-card p-[20px_22px] relative h-[310px] w-full flex flex-col">
          <div className="flex items-center justify-between gap-[8px] mb-[8px]">
            <span className="[font-family:var(--font-heading)] font-bold text-[13px] text-[var(--text-primary)] truncate">
              {getActionLabel(chartAction2)} ({currentYear})
            </span>
            <select
              value={chartAction2}
              onChange={(e) => setChartAction2(e.target.value as ActionType)}
              className="text-[12px] [font-family:var(--font-body)] bg-white border border-[var(--border-500)] rounded-[8px] px-[8px] py-[3px] text-[var(--text-secondary-600)] outline-none cursor-pointer"
            >
              {STAT_ACTION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-h-0">
            <Suspense fallback={<Loading />}>
              {isMonthlyLoading ? (
                <Loading />
              ) : (
                <LineChart
                  title={getActionLabel(chartAction2)}
                  label={getActionLabel(chartAction2)}
                  labels={MONTHS}
                  data={getMonthlyDataForAction(chartAction2)}
                  color="var(--info-500)"
                />
              )}
            </Suspense>
          </div>
        </div>

        {/* Chart 3: Monthly BarChart */}
        <div className="surface-card p-[20px_22px] relative h-[310px] w-full flex flex-col">
          <div className="flex items-center justify-between gap-[8px] mb-[8px]">
            <span className="[font-family:var(--font-heading)] font-bold text-[13px] text-[var(--text-primary)] truncate">
              {getActionLabel(chartAction3)} ({currentYear})
            </span>
            <select
              value={chartAction3}
              onChange={(e) => setChartAction3(e.target.value as ActionType)}
              className="text-[12px] [font-family:var(--font-body)] bg-white border border-[var(--border-500)] rounded-[8px] px-[8px] py-[3px] text-[var(--text-secondary-600)] outline-none cursor-pointer"
            >
              {STAT_ACTION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-h-0">
            <Suspense fallback={<Loading />}>
              {isMonthlyLoading ? (
                <Loading />
              ) : (
                <BarChart
                  title={getActionLabel(chartAction3)}
                  label={getActionLabel(chartAction3)}
                  labels={MONTHS}
                  data={getMonthlyDataForAction(chartAction3)}
                  color="var(--info-500)"
                />
              )}
            </Suspense>
          </div>
        </div>
      </div>

      {/* Activity log */}
      <div className="surface-card px-[28px] py-[24px]">
        <div className="flex justify-between items-center mb-[20px]">
          <div className="[font-family:var(--font-heading)] font-bold text-[16px] text-[var(--text-primary)]">
            Hoạt động gần đây
          </div>
          <button
            onClick={() => navigate(ROUTES.ADMIN.ACTIVITIES)}
            className="![font-family:var(--font-heading)] !font-semibold !text-[12px] !text-[var(--brand-500)] !cursor-pointer"
          >
            Xem tất cả
          </button>
        </div>
        <div className="flex flex-col">
          {ACTIVITY_LOG.map((a, i) => (
            <div
              key={`${a.text} - ${a.time}`}
              className={`flex items-center gap-[16px] py-[13px] ${
                i < ACTIVITY_LOG.length - 1 ? ' activity-row-bordered' : ''
              }`}
            >
              <div className="w-[8px] h-[8px] rounded-full bg-[var(--brand-500)] shrink-0" />
              <span className="[font-family:var(--font-body)] text-[13.5px] text-[var(--text-primary)] flex-1">
                {a.text}
              </span>
              <span className="[font-family:var(--font-body)] text-[12px] text-[var(--text-secondary-200)] shrink-0">
                {a.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;