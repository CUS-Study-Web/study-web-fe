import { useState } from 'react'
import type { SysTab, Student, Assistant, VipReq } from '../../types/admin'
import {
  INIT_STUDENTS,
  INIT_ASSISTANTS,
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

const AdminSystem = () => {
  const [activeTab, setActiveTab] = useState<SysTab>('students')
  const [students, setStudents] = useState<Student[]>(INIT_STUDENTS)
  const [assistants, setAssistants] = useState<Assistant[]>(INIT_ASSISTANTS)
  const [blockedIds, setBlockedIds] = useState<number[]>([])
  const [bannedIds, setBannedIds] = useState<number[]>([])
  const [selDate, setSelDate] = useState('2026-07-23')
  const [selMonth, setSelMonth] = useState('07')

  const [vipRequests, setVipRequests] = useState<VipReq[]>([
    {
      id: 1,
      name: 'Phạm Minh Đức',
      email: 'duc.pm@gmail.com',
      course: 'V-ACT',
      requestDate: '24/07/2026',
      note: 'Tôi muốn nâng cấp VIP để truy cập đầy đủ đề thi.',
      status: 'Chờ duyệt'
    },
    {
      id: 2,
      name: 'Ngô Thị Hương',
      email: 'huong.nt@gmail.com',
      course: 'THPT QG',
      requestDate: '23/07/2026',
      note: 'Cần tài liệu nâng cao cho kỳ thi sắp tới.',
      status: 'Chờ duyệt'
    },
    {
      id: 3,
      name: 'Đinh Văn Tuấn',
      email: 'tuan.dv@gmail.com',
      course: 'HSA',
      requestDate: '20/07/2026',
      note: 'Muốn học thêm các bài thi thử chuyên sâu.',
      status: 'Đã duyệt'
    },
    {
      id: 4,
      name: 'Bùi Thị Lan',
      email: 'lan.bt@gmail.com',
      course: 'V-SAT',
      requestDate: '18/07/2026',
      note: 'Đã thanh toán phí VIP, nhờ admin xác nhận.',
      status: 'Từ chối'
    },
    {
      id: 5,
      name: 'Lý Hoàng Nam',
      email: 'nam.lh@gmail.com',
      course: 'HSCA',
      requestDate: '17/07/2026',
      note: 'Cần truy cập toàn bộ tài liệu để ôn tập tổng hợp.',
      status: 'Chờ duyệt'
    }
  ])

  // Count pending VIP requests
  const pendingVipCount = vipRequests.filter((r) => r.status === 'Chờ duyệt').length

  // Stats overview counts
  const regularCount = students.filter((s) => !s.vip).length
  const vipCount = students.filter((s) => s.vip).length
  const assistantCount = assistants.length
  const bannedCount = bannedIds.length

  // Handlers for Students
  const handleBlockToggle = (id: number) => {
    setBlockedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
    setBannedIds((prev) => prev.filter((x) => x !== id))
  }

  const handleBanToggle = (id: number) => {
    setBannedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
    setBlockedIds((prev) => prev.filter((x) => x !== id))
  }

  const handleAddVip = (data: { name: string; email: string; course: string }) => {
    const newStudent: Student = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: 'Chưa cập nhật',
      joined: new Date().toLocaleDateString('vi-VN'),
      course: data.course,
      progress: 0,
      examsDone: 0,
      avgScore: 0,
      lastLogin: 'Chưa đăng nhập',
      vip: true,
      status: 'Hoạt động'
    }
    setStudents((prev) => [...prev, newStudent])
  }

  // Handlers for Assistants
  const handleToggleAssistantStatus = (id: number) => {
    setAssistants((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === 'Hoạt động' ? 'Tạm nghỉ' : 'Hoạt động' }
          : a
      )
    )
  }

  const handleDeleteAssistant = (id: number) => {
    setAssistants((prev) => prev.filter((a) => a.id !== id))
  }

  const handleCreateAssistant = (newAsst: Assistant) => {
    setAssistants((prev) => [...prev, newAsst])
  }

  // Handlers for VIP Requests
  const handleApproveVipRequest = (id: number) => {
    setVipRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Đã duyệt' } : r))
    )
    const request = vipRequests.find((r) => r.id === id)
    if (request) {
      setStudents((prev) => {
        const exists = prev.some((s) => s.email === request.email)
        if (exists) {
          return prev.map((s) =>
            s.email === request.email ? { ...s, vip: true } : s
          )
        } else {
          return [
            ...prev,
            {
              id: Date.now(),
              name: request.name,
              email: request.email,
              phone: 'Chưa cập nhật',
              joined: new Date().toLocaleDateString('vi-VN'),
              course: request.course,
              progress: 0,
              examsDone: 0,
              avgScore: 0,
              lastLogin: 'Chưa đăng nhập',
              vip: true,
              status: 'Hoạt động'
            }
          ]
        }
      })
    }
  }

  const handleRejectVipRequest = (id: number) => {
    setVipRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Từ chối' } : r))
    )
  }

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
          {activeTab === 'students' && (
            <StudentTab
              students={students}
              bannedIds={bannedIds}
              blockedIds={blockedIds}
              onBlockToggle={handleBlockToggle}
              onBanToggle={handleBanToggle}
              onAddVip={handleAddVip}
            />
          )}

          {activeTab === 'assistants' && (
            <AssistantTab
              assistants={assistants}
              onToggleStatus={handleToggleAssistantStatus}
              onDelete={handleDeleteAssistant}
              onCreateAssistant={handleCreateAssistant}
            />
          )}

          {activeTab === 'vip-requests' && (
            <VipRequestsTab
              vipRequests={vipRequests}
              onApprove={handleApproveVipRequest}
              onReject={handleRejectVipRequest}
            />
          )}

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