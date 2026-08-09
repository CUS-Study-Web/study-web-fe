import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { ALL_ASST_ACTIVITIES } from './MockData'
import { ActivityFilterBar, ActivityGroupedList } from '../../components/admin/SystemComponents'

export default function AdminAsstActivities() {
  const navigate = useNavigate()

  const [mode, setMode] = useState<'day' | 'week' | 'month' | 'year'>('week')
  const [selDay, setSelDay] = useState('26/07/2026')
  const [selWeek, setSelWeek] = useState('W30')
  const [selMonth, setSelMonth] = useState('07')
  const [selYear, setSelYear] = useState('2026')
  const [selAsst, setSelAsst] = useState('Tất cả')

  const days = [...new Set(ALL_ASST_ACTIVITIES.map((a) => a.date))].sort().reverse()
  const weeks = [...new Set(ALL_ASST_ACTIVITIES.map((a) => a.week))].sort().reverse()
  const months = [...new Set(ALL_ASST_ACTIVITIES.map((a) => a.month))].sort().reverse()
  const years = [...new Set(ALL_ASST_ACTIVITIES.map((a) => a.year))].sort().reverse()
  const asstNames = ['Tất cả', ...new Set(ALL_ASST_ACTIVITIES.map((a) => a.asst))]

  const filtered = ALL_ASST_ACTIVITIES.filter((a) => {
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

  // Group by assistant name
  const grouped: Record<string, typeof filtered> = {}
  for (const item of filtered) {
    if (!grouped[item.asst]) grouped[item.asst] = []
    grouped[item.asst].push(item)
  }
  const asstGroups = Object.entries(grouped)

  return (
    <div className="max-w-[960px] mx-auto px-[28px] pt-[40px] pb-[80px]">
      <div className="flex items-center gap-[12px] mb-[28px]">
        <button
          onClick={() => navigate(ROUTES.ADMIN.SYSTEM)}
          className="flex items-center gap-[6px] bg-transparent border-none cursor-pointer ![font-family:var(--font-heading)] !font-semibold !text-[13px] !text-[var(--text-secondary-400)] p-0 hover:!text-[var(--text-primary)] transition-colors duration-[var(--motion-fast)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M12 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Quay lại
        </button>
        <h1 className="![font-family:var(--font-heading)] !font-extrabold !text-[26px] !text-[var(--text-primary)] m-0 tracking-[-0.5px]">
          Lịch sử hoạt động trợ giảng
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

      <ActivityGroupedList filtered={filtered} asstGroups={asstGroups} />
    </div>
  )
}
