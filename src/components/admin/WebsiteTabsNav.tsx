import type { WTab } from '../../types/admin'

type TabItem = {
  key: WTab
  label: string
}

type WebsiteTabsNavProps = {
  activeTab: WTab
  onTabChange: (tab: WTab) => void
}

const WebsiteTabsNav = ({ activeTab, onTabChange }: WebsiteTabsNavProps) => {
  const tabs: TabItem[] = [
    { key: "courses", label: "Danh sách khóa học" },
    { key: "instructors", label: "Đội ngũ giảng viên" },
    { key: "achievements", label: "Bảng thành tích" },
    { key: "reviews", label: "Cảm nhận học viên" }
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
          </button>
        )
      })}
    </div>
  )
}

export default WebsiteTabsNav
export type { WebsiteTabsNavProps }
