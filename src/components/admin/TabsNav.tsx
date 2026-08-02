import type { SysTab } from '../../types/admin'

type TabItem = {
  key: SysTab
  label: string
  badge?: number
}

type TabsNavProps = {
  activeTab: SysTab
  onTabChange: (tab: SysTab) => void
  pendingVipCount: number
}

const TabsNav = ({ activeTab, onTabChange, pendingVipCount }: TabsNavProps) => {
  const tabs: TabItem[] = [
    { key: "students", label: "Quản lý học viên" },
    { key: "assistants", label: "Quản lý trợ giảng" },
    { key: "vip-requests", label: "Duyệt yêu cầu VIP", badge: pendingVipCount },
    { key: "stats", label: "Thống kê truy cập" }
  ]

  return (
    <div className="flex border-b border-[var(--border-300)] overflow-x-auto">
      {tabs.map((t) => {
        const isActive = activeTab === t.key
        return (
          <button
            key={t.key}
            onClick={() => onTabChange(t.key)}
            style={{
              color: isActive ? 'var(--brand-500)' : 'var(--text-secondary-300)',
              borderBottomColor: isActive ? 'var(--brand-500)' : 'transparent',
            }}
            className="font-semibold text-[13.5px] px-5 py-4 border-b-[2.5px] bg-transparent cursor-pointer flex items-center gap-[7px] whitespace-nowrap transition-all duration-[var(--motion-fast)] outline-none hover:text-[var(--text-primary)]"
          >
            <span className="[font-family:var(--font-heading)]">{t.label}</span>
            {t.badge !== undefined && t.badge > 0 && (
              <span
                className={`rounded-full px-[7px] py-[1px] text-[11px] font-bold ${
                  isActive
                    ? "bg-[var(--brand-500)] text-white"
                    : "bg-[var(--border-500)] text-[var(--text-secondary-300)]"
                }`}
              >
                {t.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default TabsNav
