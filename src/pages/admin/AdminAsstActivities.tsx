import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ActivityFilterBar, ActivityGroupedList } from '../../components/admin/SystemComponents'
import { useGetActivityLogsQuery } from '../../hooks/queries/useSystemStats'
import type { ActivityLogItem } from '../../types/api/system.api'
import type { AsstActivity } from '../../types/admin'

const getWeekNumber = (d: Date) => {
  const target = new Date(d.valueOf())
  const dayNr = (d.getDay() + 6) % 7
  target.setDate(target.getDate() - dayNr + 3)
  const firstThursday = target.valueOf()
  target.setMonth(0, 1)
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7))
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000)
}

const mapLogToAsstActivity = (log: ActivityLogItem): AsstActivity => {
  const d = new Date(log.timestamp)
  const valid = !isNaN(d.getTime())
  const day = valid ? String(d.getDate()).padStart(2, '0') : '01'
  const month = valid ? String(d.getMonth() + 1).padStart(2, '0') : '01'
  const year = valid ? String(d.getFullYear()) : '2026'
  const week = valid ? `W${getWeekNumber(d)}` : 'W01'
  const dateStr = `${day}/${month}/${year}`
  return {
    date: dateStr,
    week,
    month,
    year,
    text: log.description || log.actionType,
    asst: log.userName || 'Hệ thống',
  }
}

export default function AdminAsstActivities() {
  const navigate = useNavigate()

  const { data: logData, isLoading } = useGetActivityLogsQuery({
    limit: 100,
    days: 30,
    role: 'ASSISTANT',
  })
  const rawActivities = logData?.data || []

  const activities: AsstActivity[] = useMemo(
    () => rawActivities.map(mapLogToAsstActivity),
    [rawActivities]
  )

  const [mode, setMode] = useState<'day' | 'week' | 'month' | 'year'>('day')

  const now = new Date()
  const todayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`
  const thisWeekStr = `W${getWeekNumber(now)}`
  const thisMonthStr = String(now.getMonth() + 1).padStart(2, '0')
  const thisYearStr = String(now.getFullYear())

  const [selDay, setSelDay] = useState(todayStr)
  const [selWeek, setSelWeek] = useState(thisWeekStr)
  const [selMonth, setSelMonth] = useState(thisMonthStr)
  const [selYear, setSelYear] = useState(thisYearStr)
  const [selAsst, setSelAsst] = useState('Tất cả')

  const days = useMemo(() => {
    const list = [...new Set(activities.map((a) => a.date))].sort().reverse()
    return list.length > 0 ? list : [todayStr]
  }, [activities, todayStr])

  const weeks = useMemo(() => {
    const list = [...new Set(activities.map((a) => a.week))].sort().reverse()
    return list.length > 0 ? list : [thisWeekStr]
  }, [activities, thisWeekStr])

  const months = useMemo(() => {
    const list = [...new Set(activities.map((a) => a.month))].sort().reverse()
    return list.length > 0 ? list : [thisMonthStr]
  }, [activities, thisMonthStr])

  const years = useMemo(() => {
    const list = [...new Set(activities.map((a) => a.year))].sort().reverse()
    return list.length > 0 ? list : [thisYearStr]
  }, [activities, thisYearStr])

  const asstNames = useMemo(() => {
    return ['Tất cả', ...new Set(activities.map((a) => a.asst))]
  }, [activities])

  const filtered = useMemo(() => {
    return activities.filter((a) => {
      const matchTime =
        mode === 'day'
          ? a.date === selDay
          : mode === 'week'
          ? a.week === selWeek
          : mode === 'month'
          ? a.month === selMonth && a.year === selYear
          : a.year === selYear
      const matchAsst = selAsst === 'Tất cả' || a.asst === selAsst
      return matchTime && matchAsst
    })
  }, [activities, mode, selDay, selWeek, selMonth, selYear, selAsst])

  // Group by assistant name
  const asstGroups = useMemo(() => {
    const grouped: Record<string, typeof filtered> = {}
    for (const item of filtered) {
      if (!grouped[item.asst]) grouped[item.asst] = []
      grouped[item.asst].push(item)
    }
    return Object.entries(grouped)
  }, [filtered])

  return (
    <div className="max-w-[960px] mx-auto px-[28px] pt-[40px] pb-[80px]">
      <div className="flex items-center gap-[12px] mb-[28px]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-[6px] bg-transparent border-none cursor-pointer ![font-family:var(--font-heading)] !font-semibold !text-[13px] !text-[var(--text-secondary-400)] p-0 hover:!text-[var(--text-primary)] transition-colors duration-[var(--motion-fast)]"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>
        <h1 className="![font-family:var(--font-heading)] !font-extrabold !text-[26px] !text-[var(--text-primary)] m-0 tracking-[-0.5px]">
          Lịch sử hoạt động
        </h1>
      </div>

      <ActivityFilterBar
        mode={mode}
        setMode={setMode}
        selDay={selDay}
        setSelDay={setSelDay}
        selWeek={selWeek}
        setSelWeek={setSelWeek}
        selMonth={selMonth}
        setSelMonth={setSelMonth}
        selYear={selYear}
        setSelYear={setSelYear}
        selAsst={selAsst}
        setSelAsst={setSelAsst}
        days={days}
        weeks={weeks}
        months={months}
        years={years}
        asstNames={asstNames}
      />

      {isLoading ? (
        <div className="bg-white rounded-[18px] border border-[var(--border-300)] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-[40px_24px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
          Đang tải lịch sử hoạt động...
        </div>
      ) : (
        <ActivityGroupedList filtered={filtered} asstGroups={asstGroups} />
      )}
    </div>
  )
}
