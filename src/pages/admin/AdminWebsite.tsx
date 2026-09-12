import { useState, useEffect, useRef } from 'react'
import type { Course, Instructor, Achievement, Review, WTab, ModalKey, DocType } from '@/types/admin'
import WebsiteTabsNav from '@/components/admin/website/WebsiteTabsNav'
import {
  CourseModal,
  AddCourseModal,
  InstructorModal,
  AchievementModal,
  ReviewModal,
  DocumentTypeModal,
} from '@/components/admin/modals/WebsiteModals'
import { ConfirmMiniModal } from '@/components/admin/modals/website/ConfirmMiniModal'
import TrangChuTab from '@/components/admin/website/TrangChuTab'
import FooterTab from '@/components/admin/website/FooterTab'
import GoiCuocTab from '@/components/admin/website/GoiCuocTab'
import { Spinner } from '@/components/Loading'

// API Hooks
import {
  useGetAdminCoursesQuery,
  useDeleteCourseMutation,
} from '@/hooks/queries/useCourses'
import {
  useGetBadgesQuery,
  useDeleteBadgeMutation,
} from '@/hooks/queries/useBadges'
import {
  useGetAdminTeachersQuery,
  useDeleteTeacherMutation,
} from '@/hooks/queries/useTeachers'
import {
  useGetAdminLeaderboardsQuery,
  useDeleteLeaderboardMutation,
} from '@/hooks/queries/useLeaderboards'
import {
  useGetAdminReviewsQuery,
  useDeleteReviewMutation,
} from '@/hooks/queries/useReviews'
import { useNotification } from '@/components/common/NotificationProvider'

interface DocTypeActionMenuProps {
  onEdit: () => void
  onDelete: () => void
}

function DocTypeActionMenu({ onEdit, onDelete }: DocTypeActionMenuProps) {
  const [open, setOpen] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right })
    }
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!open) return
    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return
      if (e instanceof MouseEvent) {
        if (btnRef.current?.contains(e.target as Node)) return
        if (menuRef.current?.contains(e.target as Node)) return
      }
      setOpen(false)
    }
    document.addEventListener('mousedown', handleClose)
    document.addEventListener('keydown', handleClose)
    return () => {
      document.removeEventListener('mousedown', handleClose)
      document.removeEventListener('keydown', handleClose)
    }
  }, [open])

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="w-8 h-8 rounded-full border border-[var(--border-strong)] bg-white cursor-pointer inline-flex items-center justify-center hover:bg-[var(--surface-500)] transition-colors"
        aria-label="Tùy chọn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--neutral-500)">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{ position: 'fixed', top: menuPos.top, right: menuPos.right, zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.14)' }}
          className="bg-white rounded-[10px] border border-[var(--border-default)] py-1.5 min-w-[160px]"
        >
          <button
            onClick={() => { setOpen(false); onEdit(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Sửa
          </button>
          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold !text-[#DC2626] text-left transition-colors hover:bg-[#FEF2F2]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Xóa
          </button>
        </div>
      )}
    </>
  )
}

const AdminWebsite = () => {
  const [activeTab, setActiveTab] = useState<WTab>("courses")
  const [showModal, setShowModal] = useState<ModalKey | null>(null)

  // API state for courses
  const { data: coursesData, isLoading: isLoadingCourses } = useGetAdminCoursesQuery({ size: 100 })
  const courses = coursesData?.data || []
  const deleteCourse = useDeleteCourseMutation()

  // API state for doc types (badges)
  const { data: badgesData, isLoading: isLoadingBadges } = useGetBadgesQuery({ page: 0, size: 100 })
  const docTypes = badgesData?.data || []
  const deleteBadge = useDeleteBadgeMutation()

  // API state for instructors (teachers)
  const { data: teachersData, isLoading: isLoadingTeachers } = useGetAdminTeachersQuery({ size: 100 })
  const instructors = teachersData?.data || []
  const deleteTeacher = useDeleteTeacherMutation()

  // API state for achievements (leaderboards)
  const { data: leaderboardsData, isLoading: isLoadingLeaderboards } = useGetAdminLeaderboardsQuery({ size: 100 })
  const achievements = leaderboardsData?.data || []
  const deleteLeaderboard = useDeleteLeaderboardMutation()

  // API state for reviews
  const { data: reviewsData, isLoading: isLoadingReviews } = useGetAdminReviewsQuery({ size: 100 })
  const reviews = reviewsData?.data || []
  const deleteReview = useDeleteReviewMutation()

  // Edit item trackers
  const [editingCourse, setEditingCourse] = useState<Course | undefined>(undefined)
  const [editingInstructor, setEditingInstructor] = useState<Instructor | undefined>(undefined)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | undefined>(undefined)
  const [editingReview, setEditingReview] = useState<Review | undefined>(undefined)
  const [editingDocType, setEditingDocType] = useState<DocType | undefined>(undefined)

  // Deletion targets
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)
  const [docTypeToDelete, setDocTypeToDelete] = useState<DocType | null>(null)
  const [instructorToDelete, setInstructorToDelete] = useState<Instructor | null>(null)
  const [achievementToDelete, setAchievementToDelete] = useState<Achievement | null>(null)
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null)

  // Dropdown row state
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { showSuccess, showError } = useNotification()

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdownId(null)
    }
    window.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleTabChange = (tab: WTab) => {
    setActiveTab(tab)
    setActiveDropdownId(null)
  }

  const tabsConfig: Record<WTab, { label: string; addLabel?: string; addModal?: ModalKey }> = {
    "trang-chu": { label: "Trang chủ" },
    "footer": { label: "Footer" },
    "goi-cuoc": { label: "Gói cước" },
    "courses": { label: "Danh sách khóa học", addLabel: "Thêm khóa học", addModal: "add-course" },
    "doc-types": { label: "Loại tài liệu", addLabel: "Thêm loại tài liệu", addModal: "add-doc-type" },
    "instructors": { label: "Đội ngũ giảng viên", addLabel: "Thêm giảng viên", addModal: "add-instructor" },
    "achievements": { label: "Bảng thành tích", addLabel: "Thêm thành tích", addModal: "add-achievement" },
    "reviews": { label: "Cảm nhận học viên", addLabel: "Thêm cảm nhận", addModal: "add-review" },
  }

  const currentTab = tabsConfig[activeTab]

  // Delete Handlers
  const handleDeleteCourse = async (id: string) => {
    setDeletingId(`course-${id}`)
    const startTime = Date.now()
    try {
      await deleteCourse.mutateAsync(id)
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showSuccess("Xóa khóa học thành công!")
    } catch {
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showError("Lỗi khi xóa khóa học!")
    } finally {
      setDeletingId(null)
      setCourseToDelete(null)
    }
  }

  const handleDeleteInstructor = async (id: string) => {
    setDeletingId(`instr-${id}`)
    const startTime = Date.now()
    try {
      await deleteTeacher.mutateAsync(id)
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showSuccess("Xóa giảng viên thành công!")
    } catch {
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showError("Lỗi khi xóa giảng viên!")
    } finally {
      setDeletingId(null)
      setInstructorToDelete(null)
    }
  }

  const handleDeleteAchievement = async (id: string) => {
    setDeletingId(`ach-${id}`)
    const startTime = Date.now()
    try {
      await deleteLeaderboard.mutateAsync(id)
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showSuccess("Xóa thành tích thành công!")
    } catch {
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showError("Lỗi khi xóa thành tích!")
    } finally {
      setDeletingId(null)
      setAchievementToDelete(null)
    }
  }

  const handleDeleteReview = async (id: string) => {
    setDeletingId(`rev-${id}`)
    const startTime = Date.now()
    try {
      await deleteReview.mutateAsync(id)
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showSuccess("Xóa cảm nhận thành công!")
    } catch {
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showError("Lỗi khi xóa cảm nhận!")
    } finally {
      setDeletingId(null)
      setReviewToDelete(null)
    }
  }

  const handleDeleteDocType = async (id: string) => {
    setDeletingId(`doctype-${id}`)
    const startTime = Date.now()
    try {
      await deleteBadge.mutateAsync(id)
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showSuccess("Xóa loại tài liệu thành công!")
    } catch {
      const elapsed = Date.now() - startTime
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      showError("Lỗi khi xóa loại tài liệu!")
    } finally {
      setDeletingId(null)
      setDocTypeToDelete(null)
    }
  }

  // Common styles
  const thClass = "px-5 py-[11px] [font-family:var(--font-heading)] font-bold text-xs text-[var(--text-secondary-300)] text-left uppercase tracking-[0.4px] whitespace-nowrap"
  const tdCellClass = "px-5 py-3.5 [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-600)] align-middle"
  const tdBoldClass = "px-5 py-3.5 [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] align-middle"

  return (
    <div className="max-w-[1280px] mx-auto pt-[8px] pb-[80px]">
      <div className="mb-[48px]">
        <h1 className="[font-family:var(--font-heading)] font-[800] text-[30px] text-[var(--text-primary)] mb-[6px] tracking-[-0.5px]">
          Quản Lý Website
        </h1>
        <p className="[font-family:var(--font-body)] text-[14px] text-[var(--text-secondary-300)]">
          Quản lý nội dung hiển thị trên trang chủ CUS Education.
        </p>
      </div>

      {/* Tab Panel */}
      <div className="bg-white rounded-[18px] shadow-[var(--shadow-clay-sm)] border border-[rgba(220,233,222,0.5)]">
        <WebsiteTabsNav activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="p-7">
          {/* Header Action Row */}
          <div className="flex items-center justify-between py-4 mb-4">
            <div className="[font-family:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)]">
              {currentTab.label}
            </div>
            {currentTab.addModal && (
              <button
                onClick={() => {
                  setEditingCourse(undefined)
                  setEditingInstructor(undefined)
                  setEditingAchievement(undefined)
                  setEditingReview(undefined)
                  setEditingDocType(undefined)
                  setShowModal(currentTab.addModal!)
                }}
                className="flex items-center gap-2 px-[18px] py-[9px] rounded-[var(--radius-sm)] border-none bg-[var(--brand-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-[13px] cursor-pointer hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)]"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="stroke-white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                {currentTab.addLabel}
              </button>
            )}
          </div>

          {/* CMS form tabs */}
          {activeTab === "trang-chu" && <TrangChuTab />}
          {activeTab === "footer" && <FooterTab />}
          {activeTab === "goi-cuoc" && <GoiCuocTab />}

          {/* Tab Tables */}
          {(activeTab === "courses" || activeTab === "doc-types" || activeTab === "instructors" || activeTab === "achievements" || activeTab === "reviews") && (
            <div className="rounded-[var(--radius-md)] border border-[var(--border-300)] overflow-visible">
              <div>
                {activeTab === "courses" && (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[var(--surface-500)] border-b border-[var(--border-300)]">
                        {["Tiêu đề", "Tiêu đề phụ", "Mô tả", "Trạng thái", ""].map((h) => (
                          <th key={h} className={thClass}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {isLoadingCourses && (
                        <tr>
                          <td colSpan={5} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Đang tải dữ liệu...
                          </td>
                        </tr>
                      )}
                      {!isLoadingCourses && courses.map((c, i) => (
                        <tr
                          key={c.id}
                          className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"}`}
                        >
                          <td className={tdBoldClass}>{c.title}</td>
                          <td className={tdCellClass}>{c.subTitle}</td>
                          <td className={`${tdCellClass} max-w-[260px] truncate`}>{c.description}</td>
                          <td className={tdCellClass}>
                            <span className={`px-2 py-1 rounded-[var(--radius-sm)] text-[11px] font-bold ${
                              c.status === 'PUBLISH' ? 'bg-[#E3F5E7] text-[#1D9A44]' : 
                              c.status === 'DEVELOPING' ? 'bg-[#E3F2FD] text-[#1976D2]' : 
                              'bg-[var(--surface-500)] text-[var(--text-secondary-400)]'
                            }`}>
                              {c.status === 'PUBLISH' ? 'Công khai' : c.status === 'DEVELOPING' ? 'Đang cập nhật' : 'Bản nháp'}
                            </span>
                          </td>
                          <td className={`${tdCellClass} relative whitespace-nowrap`}>
                            {deletingId === `course-${c.id}` ? (
                              <div className="flex justify-end pr-2">
                                <Spinner size="md" color="brand" />
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveDropdownId(activeDropdownId === `course-${c.id}` ? null : `course-${c.id}`)
                                  }}
                                  className="p-[6px] hover:bg-[var(--surface-600)] rounded-full text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] transition-colors duration-130 cursor-pointer"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </button>
                                {activeDropdownId === `course-${c.id}` && (
                                  <div className="absolute right-[12px] top-[38px] bg-white border border-[var(--border-300)] rounded-[10px] shadow-[var(--shadow-clay-sm)] py-[6px] z-[50] min-w-[100px]">
                                    <button
                                      onClick={() => {
                                        setEditingCourse(c)
                                        setShowModal("edit-course")
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      onClick={() => {
                                        setCourseToDelete(c)
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                      {!isLoadingCourses && courses.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Không có khóa học nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {activeTab === "doc-types" && (
                  <div className="w-full">
                    <div className="flex justify-between items-center bg-[var(--surface-500)] border-b border-[var(--border-300)] px-5 py-[11px]">
                      <div className={thClass} style={{ padding: 0 }}>Tên loại tài liệu</div>
                      <div className={thClass} style={{ padding: 0 }}></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                      {isLoadingBadges ? (
                        <div className="col-span-full py-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                          Đang tải dữ liệu...
                        </div>
                      ) : docTypes.length === 0 ? (
                        <div className="col-span-full py-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                          Không có loại tài liệu nào.
                        </div>
                      ) : (
                        [...docTypes].sort((a, b) => a.name.localeCompare(b.name)).map((type) => (
                          <div key={type.id} className="border border-[var(--border-300)] rounded-[12px] p-4 flex items-center justify-between bg-white hover:shadow-[var(--shadow-clay-sm)] transition-shadow">
                            <span className="font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--text-primary)]">
                              {type.name}
                            </span>
                            <div className="relative">
                              {deletingId === `doctype-${type.id}` ? (
                                <Spinner size="md" color="brand" />
                              ) : (
                                <DocTypeActionMenu
                                  onEdit={() => {
                                    setEditingDocType(type)
                                    setShowModal("edit-doc-type")
                                  }}
                                  onDelete={() => setDocTypeToDelete(type)}
                                />
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "instructors" && (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[var(--surface-500)] border-b border-[var(--border-300)]">
                        {["Giảng viên", "Môn học", "Mô tả", ""].map((h) => (
                          <th key={h} className={thClass}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {isLoadingTeachers && (
                        <tr>
                          <td colSpan={4} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Đang tải dữ liệu...
                          </td>
                        </tr>
                      )}
                      {!isLoadingTeachers && instructors.map((inst, i) => (
                        <tr
                          key={inst.id}
                          className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"}`}
                        >
                          <td className={tdBoldClass}>
                            <div className="flex items-center gap-3">
                              {inst.avatarUrl ? (
                                <img src={inst.avatarUrl} alt={inst.name} className="w-9 h-9 rounded-full object-cover shrink-0 border border-[var(--border-300)]" />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-[var(--brand-50)] text-[var(--brand-500)] flex items-center justify-center font-bold text-xs shrink-0">
                                  {inst.name.charAt(0)}
                                </div>
                              )}
                              <span>{inst.name}</span>
                            </div>
                          </td>
                          <td className={tdCellClass}>{inst.subject}</td>
                          <td className={`${tdCellClass} max-w-[260px] truncate`}>{inst.description}</td>
                          <td className={`${tdCellClass} relative whitespace-nowrap`}>
                            {deletingId === `instr-${inst.id}` ? (
                              <div className="flex justify-end pr-2">
                                <Spinner size="md" color="brand" />
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveDropdownId(activeDropdownId === `instr-${inst.id}` ? null : `instr-${inst.id}`)
                                  }}
                                  className="p-[6px] hover:bg-[var(--surface-600)] rounded-full text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] transition-colors duration-130 cursor-pointer"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </button>
                                {activeDropdownId === `instr-${inst.id}` && (
                                  <div className="absolute right-[12px] top-[38px] bg-white border border-[var(--border-300)] rounded-[10px] shadow-[var(--shadow-clay-sm)] py-[6px] z-[50] min-w-[100px]">
                                    <button
                                      onClick={() => {
                                        setEditingInstructor(inst)
                                        setShowModal("edit-instructor")
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      onClick={() => {
                                        setInstructorToDelete(inst)
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                      {!isLoadingTeachers && instructors.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Không có giảng viên nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {activeTab === "achievements" && (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[var(--surface-500)] border-b border-[var(--border-300)]">
                        {["Học viên", "Khóa học", "Tổng điểm", "Danh hiệu", "Điểm thành phần", ""].map((h) => (
                          <th key={h} className={thClass}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {isLoadingLeaderboards && (
                        <tr>
                          <td colSpan={6} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Đang tải dữ liệu...
                          </td>
                        </tr>
                      )}
                      {!isLoadingLeaderboards && achievements.map((a, i) => (
                        <tr
                          key={a.id}
                          className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"}`}
                        >
                          <td className={tdBoldClass}>
                            <div className="flex items-center gap-3">
                              {a.avatarUrl ? (
                                <img src={a.avatarUrl} alt={a.studentName} className="w-9 h-9 rounded-full object-cover shrink-0 border border-[var(--border-300)]" />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-[var(--brand-50)] text-[var(--brand-500)] flex items-center justify-center font-bold text-xs shrink-0">
                                  {a.studentName.charAt(0)}
                                </div>
                              )}
                              <span>{a.studentName}</span>
                            </div>
                          </td>
                          <td className={tdCellClass}>{a.courseName}</td>
                          <td className={tdBoldClass}>{a.sumScore}</td>
                          <td className={tdCellClass}>{a.achievement || '—'}</td>
                          <td className={`${tdCellClass} max-w-[220px] truncate`}>
                            {a.scores && a.scores.length > 0
                              ? a.scores.map((s) => `${s.subjectName}: ${s.score}`).join(' · ')
                              : '—'}
                          </td>
                          <td className={`${tdCellClass} relative whitespace-nowrap`}>
                            {deletingId === `ach-${a.id}` ? (
                              <div className="flex justify-end pr-2">
                                <Spinner size="md" color="brand" />
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveDropdownId(activeDropdownId === `ach-${a.id}` ? null : `ach-${a.id}`)
                                  }}
                                  className="p-[6px] hover:bg-[var(--surface-600)] rounded-full text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] transition-colors duration-130 cursor-pointer"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </button>
                                {activeDropdownId === `ach-${a.id}` && (
                                  <div className="absolute right-[12px] top-[38px] bg-white border border-[var(--border-300)] rounded-[10px] shadow-[var(--shadow-clay-sm)] py-[6px] z-[50] min-w-[100px]">
                                    <button
                                      onClick={() => {
                                        setEditingAchievement(a)
                                        setShowModal("edit-achievement")
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      onClick={() => {
                                        setAchievementToDelete(a)
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                      {!isLoadingLeaderboards && achievements.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Không có thành tích nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {activeTab === "reviews" && (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[var(--surface-500)] border-b border-[var(--border-300)]">
                        {["Học viên", "Khóa học", "Thời gian", "Bình luận", ""].map((h) => (
                          <th key={h} className={thClass}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {isLoadingReviews && (
                        <tr>
                          <td colSpan={5} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Đang tải dữ liệu...
                          </td>
                        </tr>
                      )}
                      {!isLoadingReviews && reviews.map((r, i) => (
                        <tr
                          key={r.id}
                          className={`border-b border-[var(--border-100)] transition-colors duration-130 hover:bg-[var(--surface-500)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--surface-200)]"}`}
                        >
                          <td className={tdBoldClass}>
                            <div className="flex items-center gap-3">
                              {r.avatarUrl ? (
                                <img src={r.avatarUrl} alt={r.studentName} className="w-9 h-9 rounded-full object-cover shrink-0 border border-[var(--border-300)]" />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-[var(--brand-50)] text-[var(--brand-500)] flex items-center justify-center font-bold text-xs shrink-0">
                                  {r.studentName.charAt(0)}
                                </div>
                              )}
                              <span>{r.studentName}</span>
                            </div>
                          </td>
                          <td className={tdCellClass}>{r.course?.title || 'Khóa học'}</td>
                          <td className={tdCellClass}>{r.timeText}</td>
                          <td className={`${tdCellClass} max-w-[260px] truncate`}>{r.comment}</td>
                          <td className={`${tdCellClass} relative whitespace-nowrap`}>
                            {deletingId === `rev-${r.id}` ? (
                              <div className="flex justify-end pr-2">
                                <Spinner size="md" color="brand" />
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveDropdownId(activeDropdownId === `rev-${r.id}` ? null : `rev-${r.id}`)
                                  }}
                                  className="p-[6px] hover:bg-[var(--surface-600)] rounded-full text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] transition-colors duration-130 cursor-pointer"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </button>
                                {activeDropdownId === `rev-${r.id}` && (
                                  <div className="absolute right-[12px] top-[38px] bg-white border border-[var(--border-300)] rounded-[10px] shadow-[var(--shadow-clay-sm)] py-[6px] z-[50] min-w-[100px]">
                                    <button
                                      onClick={() => {
                                        setEditingReview(r)
                                        setShowModal("edit-review")
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--text-secondary-600)] hover:bg-[var(--surface-500)] hover:text-[var(--text-primary)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      onClick={() => {
                                        setReviewToDelete(r)
                                        setActiveDropdownId(null)
                                      }}
                                      className="w-full text-left px-[14px] py-[8px] !text-[13px] ![font-family:var(--font-heading)] !font-semibold !text-[var(--error-500)] hover:bg-[var(--surface-500)] cursor-pointer transition-colors duration-130 block border-none bg-transparent"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                      {!isLoadingReviews && reviews.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-[36px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
                            Không có cảm nhận nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals Container */}
      {showModal === "add-course" && (
        <AddCourseModal onClose={() => setShowModal(null)} />
      )}
      {showModal === "edit-course" && editingCourse && (
        <CourseModal course={editingCourse} onClose={() => setShowModal(null)} />
      )}

      {showModal === "add-instructor" && (
        <InstructorModal onClose={() => setShowModal(null)} />
      )}
      {showModal === "edit-instructor" && (
        <InstructorModal instructor={editingInstructor} onClose={() => setShowModal(null)} />
      )}

      {showModal === "add-achievement" && (
        <AchievementModal onClose={() => setShowModal(null)} />
      )}
      {showModal === "edit-achievement" && (
        <AchievementModal achievement={editingAchievement} onClose={() => setShowModal(null)} />
      )}

      {showModal === "add-review" && (
        <ReviewModal onClose={() => setShowModal(null)} />
      )}
      {showModal === "edit-review" && (
        <ReviewModal review={editingReview} onClose={() => setShowModal(null)} />
      )}

      {showModal === "add-doc-type" && (
        <DocumentTypeModal onClose={() => setShowModal(null)} />
      )}
      {showModal === "edit-doc-type" && (
        <DocumentTypeModal docType={editingDocType} onClose={() => setShowModal(null)} />
      )}

      {/* Delete Confirm Modal for Course */}
      {courseToDelete && (
        <ConfirmMiniModal
          title="Xác nhận xóa khóa học"
          message={
            <span>
              Bạn có chắc chắn muốn xóa khóa học <strong>"{courseToDelete.title}"</strong>? Tất cả dữ liệu liên quan sẽ bị xóa.
            </span>
          }
          isDanger
          confirmText="Xóa khóa học"
          isSubmitting={deletingId === `course-${courseToDelete.id}`}
          onConfirm={() => handleDeleteCourse(courseToDelete.id)}
          onClose={() => setCourseToDelete(null)}
        />
      )}

      {/* Delete Confirm Modal for DocType */}
      {docTypeToDelete && (
        <ConfirmMiniModal
          title="Xác nhận xóa loại tài liệu"
          message={
            <span>
              Bạn có chắc chắn muốn xóa loại tài liệu <strong>"{docTypeToDelete.name}"</strong>? Tất cả dữ liệu liên quan sẽ bị xóa.
            </span>
          }
          isDanger
          confirmText="Xóa loại tài liệu"
          isSubmitting={deletingId === `doctype-${docTypeToDelete.id}`}
          onConfirm={() => handleDeleteDocType(docTypeToDelete.id)}
          onClose={() => setDocTypeToDelete(null)}
        />
      )}

      {/* Delete Confirm Modal for Instructor */}
      {instructorToDelete && (
        <ConfirmMiniModal
          title="Xác nhận xóa giảng viên"
          message={
            <span>
              Bạn có chắc chắn muốn xóa giảng viên <strong>"{instructorToDelete.name}"</strong>?
            </span>
          }
          isDanger
          confirmText="Xóa giảng viên"
          isSubmitting={deletingId === `instr-${instructorToDelete.id}`}
          onConfirm={() => handleDeleteInstructor(instructorToDelete.id)}
          onClose={() => setInstructorToDelete(null)}
        />
      )}

      {/* Delete Confirm Modal for Achievement */}
      {achievementToDelete && (
        <ConfirmMiniModal
          title="Xác nhận xóa thành tích"
          message={
            <span>
              Bạn có chắc chắn muốn xóa thành tích của học viên <strong>"{achievementToDelete.studentName}"</strong>?
            </span>
          }
          isDanger
          confirmText="Xóa thành tích"
          isSubmitting={deletingId === `ach-${achievementToDelete.id}`}
          onConfirm={() => handleDeleteAchievement(achievementToDelete.id)}
          onClose={() => setAchievementToDelete(null)}
        />
      )}

      {/* Delete Confirm Modal for Review */}
      {reviewToDelete && (
        <ConfirmMiniModal
          title="Xác nhận xóa cảm nhận"
          message={
            <span>
              Bạn có chắc chắn muốn xóa cảm nhận của học viên <strong>"{reviewToDelete.studentName}"</strong>?
            </span>
          }
          isDanger
          confirmText="Xóa cảm nhận"
          isSubmitting={deletingId === `rev-${reviewToDelete.id}`}
          onConfirm={() => handleDeleteReview(reviewToDelete.id)}
          onClose={() => setReviewToDelete(null)}
        />
      )}

    </div>
  )
}

export default AdminWebsite