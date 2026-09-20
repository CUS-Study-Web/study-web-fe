import { Suspense, lazy, useState } from 'react';
import Loading from '../../Loading';
import {
  STAT_ACTION_OPTIONS,
  type ActionType,
} from '../../../types/api/system.api';
import { useGetDailyStatsQuery } from '../../../hooks/queries/useSystemStats';

const BarChart = lazy(() => import('../../Charts').then((m) => ({ default: m.BarChart })));
const LineChart = lazy(() => import('../../Charts').then((m) => ({ default: m.LineChart })));

const getTodayStr = () => new Date().toISOString().slice(0, 10);
const getCurrentMonthStr = () => String(new Date().getMonth() + 1).padStart(2, '0');

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

type AccessStatsTabProps = {
  initialDate?: string;
  initialMonth?: string;
};

export const AccessStatsTab = ({
  initialDate,
  initialMonth,
}: AccessStatsTabProps) => {
  const [selDate, setSelDate] = useState(initialDate || getTodayStr());
  const [selMonth, setSelMonth] = useState(initialMonth || getCurrentMonthStr());

  // Independent action selection for each visualization
  const [dailyAction1, setDailyAction1] = useState<ActionType>('LOGIN');
  const [dailyAction2, setDailyAction2] = useState<ActionType>('REGISTER');
  const [dailyAction3, setDailyAction3] = useState<ActionType>('REQUEST_VIP');

  const [monthAction1, setMonthAction1] = useState<ActionType>('LOGIN');
  const [monthAction2, setMonthAction2] = useState<ActionType>('REGISTER');
  const [monthAction3, setMonthAction3] = useState<ActionType>('REQUEST_VIP');

  // Daily stats query for the 7 days ending at selDate
  const { data: dailyStatsData, isLoading: isDailyLoading } = useGetDailyStatsQuery({
    date: selDate,
    days: 7,
  });

  // Calculate days in the selected month for weekly breakdown
  const currentYear = new Date().getFullYear();
  const monthNum = parseInt(selMonth, 10) || (new Date().getMonth() + 1);
  const daysInMonth = new Date(currentYear, monthNum, 0).getDate();
  const lastDateOfMonth = `${currentYear}-${selMonth.padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;

  const { data: monthDaysData, isLoading: isMonthLoading } = useGetDailyStatsQuery({
    date: lastDateOfMonth,
    days: daysInMonth,
  });

  const dailyItems = dailyStatsData?.data?.items || [];
  const dailyLabels = dailyItems.map((item) => formatDayLabel(item.date));

  const getDailyData = (action: ActionType) =>
    dailyItems.map((item) => item.actionCounts?.[action] ?? 0);

  const monthItems = monthDaysData?.data?.items || [];
  const getWeeklyData = (action: ActionType) => {
    const getSum = (start: number, end: number) => {
      let sum = 0;
      for (let i = start; i < end && i < monthItems.length; i++) {
        sum += monthItems[i]?.actionCounts?.[action] ?? 0;
      }
      return sum;
    };
    return [
      getSum(0, 7),
      getSum(7, 14),
      getSum(14, 21),
      getSum(21, monthItems.length),
    ];
  };

  const weeklyLabels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];

  return (
    <div className="flex flex-col gap-[32px]">
      {/* Daily Stats Section */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] mb-[18px]">
          <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
            Thống kê theo ngày (7 ngày gần nhất)
          </div>
          <div className="flex items-center gap-[8px] px-[14px] py-[7px] bg-white rounded-[10px] border border-[var(--border-500)] shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B746D" strokeWidth="2" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="#6B746D" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-600)]">
              Chọn ngày:
            </span>
            <input
              type="date"
              value={selDate}
              onChange={(e) => setSelDate(e.target.value)}
              className="border-none outline-none [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] w-[130px] bg-transparent focus:ring-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
          {/* Daily Card 1 */}
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[310px] flex flex-col">
            <div className="flex items-center justify-between gap-[8px] mb-[10px]">
              <span className="[font-family:var(--font-heading)] font-bold text-[13.5px] text-[var(--text-primary)] truncate">
                {getActionLabel(dailyAction1)}
              </span>
              <select
                value={dailyAction1}
                onChange={(e) => setDailyAction1(e.target.value as ActionType)}
                className="text-[12px] [font-family:var(--font-body)] bg-white border border-[var(--border-500)] rounded-[8px] px-[8px] py-[4px] text-[var(--text-secondary-600)] outline-none cursor-pointer"
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
                    title={getActionLabel(dailyAction1)}
                    label={getActionLabel(dailyAction1)}
                    labels={dailyLabels}
                    data={getDailyData(dailyAction1)}
                    color="var(--brand-500)"
                  />
                )}
              </Suspense>
            </div>
          </div>

          {/* Daily Card 2 */}
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[310px] flex flex-col">
            <div className="flex items-center justify-between gap-[8px] mb-[10px]">
              <span className="[font-family:var(--font-heading)] font-bold text-[13.5px] text-[var(--text-primary)] truncate">
                {getActionLabel(dailyAction2)}
              </span>
              <select
                value={dailyAction2}
                onChange={(e) => setDailyAction2(e.target.value as ActionType)}
                className="text-[12px] [font-family:var(--font-body)] bg-white border border-[var(--border-500)] rounded-[8px] px-[8px] py-[4px] text-[var(--text-secondary-600)] outline-none cursor-pointer"
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
                    title={getActionLabel(dailyAction2)}
                    label={getActionLabel(dailyAction2)}
                    labels={dailyLabels}
                    data={getDailyData(dailyAction2)}
                    color="var(--info-500)"
                  />
                )}
              </Suspense>
            </div>
          </div>

          {/* Daily Card 3 */}
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[310px] flex flex-col">
            <div className="flex items-center justify-between gap-[8px] mb-[10px]">
              <span className="[font-family:var(--font-heading)] font-bold text-[13.5px] text-[var(--text-primary)] truncate">
                {getActionLabel(dailyAction3)}
              </span>
              <select
                value={dailyAction3}
                onChange={(e) => setDailyAction3(e.target.value as ActionType)}
                className="text-[12px] [font-family:var(--font-body)] bg-white border border-[var(--border-500)] rounded-[8px] px-[8px] py-[4px] text-[var(--text-secondary-600)] outline-none cursor-pointer"
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
                    title={getActionLabel(dailyAction3)}
                    label={getActionLabel(dailyAction3)}
                    labels={dailyLabels}
                    data={getDailyData(dailyAction3)}
                    color="#9B4E8D"
                  />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Stats Section */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] mb-[18px]">
          <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
            Thống kê theo tháng (Chia 4 tuần)
          </div>
          <div className="flex items-center gap-[8px] px-[14px] py-[7px] bg-white rounded-[10px] border border-[var(--border-500)] shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B746D" strokeWidth="2" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="#6B746D" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-600)]">
              Chọn tháng:
            </span>
            <select
              value={selMonth}
              onChange={(e) => setSelMonth(e.target.value)}
              className="border-none outline-none [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] bg-transparent focus:ring-0 cursor-pointer"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const val = String(i + 1).padStart(2, '0');
                return (
                  <option key={val} value={val}>
                    Tháng {i + 1}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[16px]">
          {/* Monthly Card 1 */}
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[310px] flex flex-col">
            <div className="flex items-center justify-between gap-[8px] mb-[10px]">
              <span className="[font-family:var(--font-heading)] font-bold text-[13.5px] text-[var(--text-primary)] truncate">
                {getActionLabel(monthAction1)}
              </span>
              <select
                value={monthAction1}
                onChange={(e) => setMonthAction1(e.target.value as ActionType)}
                className="text-[12px] [font-family:var(--font-body)] bg-white border border-[var(--border-500)] rounded-[8px] px-[8px] py-[4px] text-[var(--text-secondary-600)] outline-none cursor-pointer"
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
                {isMonthLoading ? (
                  <Loading />
                ) : (
                  <LineChart
                    title={getActionLabel(monthAction1)}
                    label={getActionLabel(monthAction1)}
                    labels={weeklyLabels}
                    data={getWeeklyData(monthAction1)}
                    color="var(--brand-500)"
                  />
                )}
              </Suspense>
            </div>
          </div>

          {/* Monthly Card 2 */}
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[310px] flex flex-col">
            <div className="flex items-center justify-between gap-[8px] mb-[10px]">
              <span className="[font-family:var(--font-heading)] font-bold text-[13.5px] text-[var(--text-primary)] truncate">
                {getActionLabel(monthAction2)}
              </span>
              <select
                value={monthAction2}
                onChange={(e) => setMonthAction2(e.target.value as ActionType)}
                className="text-[12px] [font-family:var(--font-body)] bg-white border border-[var(--border-500)] rounded-[8px] px-[8px] py-[4px] text-[var(--text-secondary-600)] outline-none cursor-pointer"
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
                {isMonthLoading ? (
                  <Loading />
                ) : (
                  <LineChart
                    title={getActionLabel(monthAction2)}
                    label={getActionLabel(monthAction2)}
                    labels={weeklyLabels}
                    data={getWeeklyData(monthAction2)}
                    color="var(--info-500)"
                  />
                )}
              </Suspense>
            </div>
          </div>

          {/* Monthly Card 3 */}
          <div className="bg-[var(--surface-500)] rounded-[16px] p-[18px_20px] h-[310px] flex flex-col">
            <div className="flex items-center justify-between gap-[8px] mb-[10px]">
              <span className="[font-family:var(--font-heading)] font-bold text-[13.5px] text-[var(--text-primary)] truncate">
                {getActionLabel(monthAction3)}
              </span>
              <select
                value={monthAction3}
                onChange={(e) => setMonthAction3(e.target.value as ActionType)}
                className="text-[12px] [font-family:var(--font-body)] bg-white border border-[var(--border-500)] rounded-[8px] px-[8px] py-[4px] text-[var(--text-secondary-600)] outline-none cursor-pointer"
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
                {isMonthLoading ? (
                  <Loading />
                ) : (
                  <LineChart
                    title={getActionLabel(monthAction3)}
                    label={getActionLabel(monthAction3)}
                    labels={weeklyLabels}
                    data={getWeeklyData(monthAction3)}
                    color="#9B4E8D"
                  />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
