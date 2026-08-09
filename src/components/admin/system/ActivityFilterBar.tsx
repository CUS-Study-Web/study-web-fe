type FilterMode = 'day' | 'week' | 'month' | 'year'

type ActivityFilterBarProps = {
  mode: FilterMode
  setMode: (m: FilterMode) => void
  selDay: string
  setSelDay: (d: string) => void
  selWeek: string
  setSelWeek: (w: string) => void
  selMonth: string
  setSelMonth: (m: string) => void
  selYear: string
  setSelYear: (y: string) => void
  selAsst: string
  setSelAsst: (a: string) => void
  days: string[]
  weeks: string[]
  months: string[]
  years: string[]
  asstNames: string[]
}

export const ActivityFilterBar = ({
  mode,
  setMode,
  selDay,
  setSelDay,
  selWeek,
  setSelWeek,
  selMonth,
  setSelMonth,
  selYear,
  setSelYear,
  selAsst,
  setSelAsst,
  days,
  weeks,
  months,
  years,
  asstNames
}: ActivityFilterBarProps) => {
  const modeLabels: { key: FilterMode; label: string }[] = [
    { key: 'day', label: 'Theo ngày' },
    { key: 'week', label: 'Theo tuần' },
    { key: 'month', label: 'Theo tháng' },
    { key: 'year', label: 'Theo năm' }
  ]

  const selectClass =
    'px-[14px] py-[8px] rounded-[10px] border !border-[var(--border-500)] ![font-family:var(--font-heading)] !font-semibold !text-[13px] !text-[var(--text-primary)] outline-none cursor-pointer bg-white'

  return (
    <div className="bg-white rounded-[16px] border border-[var(--border-300)] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-[16px_20px] mb-[22px]">
      <div className="flex flex-wrap items-center gap-[10px]">
        {/* Period mode toggle */}
        <div className="flex gap-[5px]">
          {modeLabels.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`px-[14px] py-[7px] rounded-[10px] border ${
                mode === m.key
                  ? '!border-transparent !bg-[var(--brand-500)] !text-white'
                  : '!border-[var(--border-500)] !bg-white !text-[var(--text-secondary-600)]'
              } ![font-family:var(--font-heading)] !font-semibold !text-[12.5px] cursor-pointer transition-colors duration-[var(--motion-fast)]`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Period selector */}
        <div className="flex gap-[8px] ml-[6px]">
          {mode === 'day' && (
            <select
              value={selDay}
              onChange={(e) => setSelDay(e.target.value)}
              className={selectClass}
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}
          {mode === 'week' && (
            <select
              value={selWeek}
              onChange={(e) => setSelWeek(e.target.value)}
              className={selectClass}
            >
              {weeks.map((w) => (
                <option key={w} value={w}>
                  Tuần {w}
                </option>
              ))}
            </select>
          )}
          {mode === 'month' && (
            <>
              <select
                value={selMonth}
                onChange={(e) => setSelMonth(e.target.value)}
                className={selectClass}
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    Tháng {m}
                  </option>
                ))}
              </select>
              <select
                value={selYear}
                onChange={(e) => setSelYear(e.target.value)}
                className={selectClass}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </>
          )}
          {mode === 'year' && (
            <select
              value={selYear}
              onChange={(e) => setSelYear(e.target.value)}
              className={selectClass}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Group-by-asst filter */}
        <div className="ml-auto flex items-center gap-[8px]">
          <span className="[font-family:var(--font-heading)] font-semibold text-[12.5px] text-[var(--text-secondary-600)]">
            Trợ giảng:
          </span>
          <select
            value={selAsst}
            onChange={(e) => setSelAsst(e.target.value)}
            className={selectClass}
          >
            {asstNames.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
