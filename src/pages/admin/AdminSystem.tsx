import { useState } from 'react'
import type { SysTab } from '../../types/admin'
import {
  SystemTabsNav,
  SystemStatsOverview,
  StudentTab,
  AssistantTab,
  VipRequestsTab,
  AccessStatsTab,
  QuanLyVipTab
} from '../../components/admin/SystemComponents'
import AssistantFeatureInDevPopup from '../../components/assistant/AssistantFeatureInDevPopup'
import { useGetVipRequestCountsQuery } from '../../hooks/queries/useSystemVipRequests'
import {
  useGetVipLearnersCountQuery,
  useGetNormalLearnersCountQuery,
  useGetLockedLearnersCountQuery,
} from '../../hooks/queries/useSystemLearners'
import { useGetAssistantsCountQuery } from '../../hooks/queries/useSystemAssistants'

const AdminSystem = () => {
  const [activeTab, setActiveTab] = useState<SysTab>('students')
  const [showInDev, setShowInDev] = useState(false)

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
  const lockedCount = lockedData?.data?.count ?? 0;

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
        lockedCount={lockedCount}
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

          {activeTab === 'quan-ly-vip' && <QuanLyVipTab />}

          {activeTab === 'stats' && <AccessStatsTab />}
        </div>
      </div>

      {showInDev && <AssistantFeatureInDevPopup onClose={() => setShowInDev(false)} />}
    </div>
  )
}

export default AdminSystem