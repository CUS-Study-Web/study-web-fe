interface Tab {
  key: string;
  label: string;
}

interface AssistantTabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function AssistantTabBar({ tabs, activeTab, onTabChange }: AssistantTabBarProps) {
  const activeIndex = tabs.findIndex((t) => t.key === activeTab);

  return (
    <div
      className="relative flex bg-[var(--surface-muted)] p-[4px] rounded-[10px] w-fit"
      style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)' }}
    >
      {/* Sliding pill */}
      <div
        className="absolute top-[4px] bottom-[4px] rounded-[8px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          width: `calc(${100 / tabs.length}% - 4px)`,
          transform: `translateX(calc(${activeIndex} * 100%))`,
          background: '#ffffff',
          boxShadow: '0 1px 6px rgba(0,0,0,0.10), 0 0.5px 2px rgba(0,0,0,0.06)',
        }}
      />
      {tabs.map((tab) => (
        <div
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`relative z-10 min-w-[120px] px-6 py-2 rounded-[8px] cursor-pointer bg-transparent flex justify-center items-center font-[family-name:var(--font-heading)] text-[14px] transition-all duration-300 select-none ${
            activeTab === tab.key
              ? 'text-[var(--brand-700)] font-semibold'
              : 'text-[var(--text-tertiary)] font-medium hover:text-gray-600'
          }`}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
