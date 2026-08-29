import { useState } from 'react'
import type { SysTab } from '../../types/admin'
import {
  DEFAULT_DAY_STATS,
  MONTHLY_WEB_TRAFFIC_DATA,
  MONTHLY_REGS_FULL,
  MONTHLY_VIP
} from './MockData'
import {
  SystemTabsNav,
  SystemStatsOverview,
  StudentTab,
  AssistantTab,
  VipRequestsTab,
  AccessStatsTab
} from '../../components/admin/SystemComponents'
import {
  useGetVipRequestCountsQuery,
  useGetVipLearnersCountQuery,
  useGetNormalLearnersCountQuery,
  useGetLockedLearnersCountQuery,
  useGetAssistantsCountQuery,
} from '../../hooks/queries/useSystemManagement'

const AdminSystem = () => {
  const [activeTab, setActiveTab] = useState<SysTab>('students')
  const [selDate, setSelDate] = useState('2026-07-23')
  const [selMonth, setSelMonth] = useState('07')

  // Get pending VIP requests count
  const { data: vipCountData } = useGetVipRequestCountsQuery('WAITING');
  const pendingVipCount = vipCountData?.data?.count ?? 0;

  // Stats overview counts from API
  const { data: normalData } = useGetNormalLearnersCountQuery();
  const { data: vipData } = useGetVipLearnersCountQuery();
  const { data: lockedData } = useGetLockedLearnersCountQuery();
  const { data: assistantData } = useGetAssistantsCountQuery();

  const regularCount = normalData?.data?.count ?? 0;
  const vipCount = vipData?.data?.count ?? 0;
  const assistantCount = assistantData?.data?.count ?? 0;
  const bannedCount = lockedData?.data?.count ?? 0;

  return (
    <div className="max-w-[1280px] mx-auto px-[28px] pt-[40px] pb-[80px]">
      {/* Title Header */}
      <div className="mb-[28px]">
        <h1 className="[font-family:var(--font-heading)] font-[800] text-[30px] text-[var(--text-primary)] mb-[6px] tracking-[-0.5px]">
          Quản Trị Hệ Thống
        </h1>
        <p className="[font-family:var(--font-body)] text-[14px] text-[var(--text-secondary-300)]">
          Kiểm duyệt yêu cầu, quản lý học viên và trợ giảng.
        </p>
      </div>

      {/* Stats Cards Row */}
      <SystemStatsOverview
        regularCount={regularCount}
        vipCount={vipCount}
        assistantCount={assistantCount}
        bannedCount={bannedCount}
      />

      {/* Tab panel */}
      <div className="bg-white rounded-[18px] shadow-[var(--shadow-clay-sm)] border border-[rgba(220,233,222,0.5)]">
        <SystemTabsNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pendingVipCount={pendingVipCount}
        />

        <div className="p-[28px]">
          {activeTab === 'students' && <StudentTab />}

          {activeTab === 'assistants' && <AssistantTab />}

          {activeTab === 'vip-requests' && <VipRequestsTab />}

          {activeTab === 'stats' && (
            <AccessStatsTab
              selDate={selDate}
              setSelDate={setSelDate}
              selMonth={selMonth}
              setSelMonth={setSelMonth}
              dayStats={DEFAULT_DAY_STATS}
              monthTraffic={MONTHLY_WEB_TRAFFIC_DATA}
              monthRegs={MONTHLY_REGS_FULL}
              monthVip={MONTHLY_VIP}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminSystem