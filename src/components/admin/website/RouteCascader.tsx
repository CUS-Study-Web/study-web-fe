import { useState, useRef, useEffect, useMemo, type ComponentType } from 'react'
import { mInput } from '../modals/website/ModalHelpers'
import { useGetCoursesQuery } from '../../../hooks/queries/useCourses'
import { BookOpen, FileText, Globe, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'

export interface RouteOption {
  id: string
  label: string
  url: string
  category: string
  isCustom?: boolean
}

export interface RouteCategory {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
  items: RouteOption[]
}

const STATIC_ROUTES: RouteOption[] = [
  { id: 'about', label: 'Giới thiệu', url: '/about', category: 'Trang tĩnh' },
  { id: 'instructors', label: 'Đội ngũ giảng viên', url: '/instructors', category: 'Trang tĩnh' },
  { id: 'careers', label: 'Tuyển dụng', url: '/careers', category: 'Trang tĩnh' },
  { id: 'documents', label: 'Tài liệu học tập', url: '/documents', category: 'Trang tĩnh' },
  { id: 'terms', label: 'Điều khoản sử dụng', url: '/terms', category: 'Trang tĩnh' },
  { id: 'privacy', label: 'Chính sách bảo mật', url: '/privacy', category: 'Trang tĩnh' },
]

// Strip Vietnamese accents for deep search
const removeAccents = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
}

interface RouteCascaderProps {
  urlValue: string
  onSelect: (label: string, url: string) => void
  onUrlChange: (url: string) => void
  onUrlBlur?: () => void
  placeholder?: string
  maxLength?: number
}

export default function RouteCascader({
  urlValue,
  onSelect,
  onUrlChange,
  onUrlBlur,
  placeholder = 'URL (ví dụ: /courses/v-act hoặc https://...)',
  maxLength = 500,
}: RouteCascaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategoryId, setActiveCategoryId] = useState<string>('courses')
  const [inputValue, setInputValue] = useState(urlValue)

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep internal input value in sync with prop
  useEffect(() => {
    setInputValue(urlValue)
  }, [urlValue])

  // Fetch courses from response data
  const { data: coursesData, isLoading: isLoadingCourses } = useGetCoursesQuery({ size: 100 })

  // Build course routes ONLY from response data with PUBLISH status
  const courseRoutes = useMemo<RouteOption[]>(() => {
    if (!coursesData?.data || !Array.isArray(coursesData.data)) {
      return []
    }
    return coursesData.data
      .filter((c) => c.status === 'PUBLISH')
      .map((c) => ({
        id: c.id,
        label: c.title,
        url: `/courses/${c.title.toLowerCase().trim()}`,
        category: 'Khóa học',
      }))
  }, [coursesData])

  // Categories definition
  const categories = useMemo<RouteCategory[]>(
    () => [
      {
        id: 'courses',
        label: 'Khóa học',
        icon: BookOpen,
        items: courseRoutes,
      },
      {
        id: 'static',
        label: 'Trang tĩnh',
        icon: FileText,
        items: STATIC_ROUTES,
      },
      {
        id: 'custom',
        label: 'Tùy chỉnh',
        icon: Globe,
        items: [
          {
            id: 'custom-link',
            label: 'Nhập liên kết ngoài (https://...)',
            url: '',
            category: 'Tùy chỉnh',
            isCustom: true,
          },
        ],
      },
    ],
    [courseRoutes]
  )

  // Unified Deep Search: search across category label, item label, and item url
  const searchResults = useMemo<RouteOption[]>(() => {
    const query = inputValue.trim()
    if (!query) return []

    const cleanQ = removeAccents(query)
    const results: RouteOption[] = []

    for (const cat of categories) {
      const catMatches = removeAccents(cat.label).includes(cleanQ)
      for (const item of cat.items) {
        if (item.isCustom) continue

        const labelMatches = removeAccents(item.label).includes(cleanQ)
        const urlMatches = removeAccents(item.url).includes(cleanQ)

        if (catMatches || labelMatches || urlMatches) {
          results.push(item)
        }
      }
    }

    return results
  }, [inputValue, categories])

  const isSearching = inputValue.trim().length > 0 && searchResults.length > 0
  const isSearchEmpty = inputValue.trim().length > 0 && searchResults.length === 0

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle item selection with Dual Auto-Fill
  const handleSelectItem = (item: RouteOption) => {
    if (item.isCustom) {
      setIsOpen(false)
      inputRef.current?.focus()
      return
    }
    // Dual Auto-Fill
    onSelect(item.label, item.url)
    setInputValue(item.url)
    setIsOpen(false)
  }

  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0]

  return (
    <div ref={containerRef} className="relative flex-1">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          placeholder={placeholder}
          value={inputValue}
          maxLength={maxLength}
          className={`${mInput} w-full pr-8`}
          onChange={(e) => {
            setInputValue(e.target.value)
            onUrlChange(e.target.value)
            if (!isOpen) setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            onUrlBlur?.()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false)
            }
          }}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary-400)] hover:text-[var(--text-primary)] cursor-pointer text-xs p-1"
          title="Chọn đường dẫn từ danh mục"
        >
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div
          onMouseDown={(e) => e.preventDefault()} // Prevents blur before click
          className="absolute left-0 top-full mt-1.5 z-50 w-full min-w-[340px] max-w-[440px] bg-white rounded-xl border border-[var(--border-400)] shadow-xl overflow-hidden text-[13px] [font-family:var(--font-body)] animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Unified Deep Search Results View */}
          {isSearching ? (
            <div>
              <div className="px-3.5 py-2 bg-[var(--surface-200)] border-b border-[var(--border-300)] flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-secondary-400)]">
                  Kết quả tìm kiếm ({searchResults.length})
                </span>
                <span className="text-[11px] text-[var(--text-secondary-400)]">
                  Nhấn để tự động điền
                </span>
              </div>
              <div className="max-h-[260px] overflow-y-auto divide-y divide-[var(--border-200)]">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectItem(item)}
                    className="w-full text-left px-3.5 py-2.5 hover:bg-[var(--surface-300)] transition-colors flex flex-col gap-0.5 cursor-pointer"
                  >
                    {/* Path Breadcrumb Display */}
                    <div className="flex items-center gap-1 text-[12px]">
                      <span className="text-[var(--text-secondary-400)] font-medium">
                        {item.category}
                      </span>
                      <span className="text-[var(--text-secondary-400)] font-bold">&gt;</span>
                      <span className="text-[var(--brand-600)] font-bold">{item.label}</span>
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary-500)] font-mono">
                      {item.url}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : isSearchEmpty ? (
            /* Search Query has no matches */
            <div className="p-4 text-center">
              <p className="text-xs text-[var(--text-secondary-400)] mb-2">
                Không tìm thấy đường dẫn có sẵn cho &quot;{inputValue}&quot;
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                }}
                className="px-3 py-1.5 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] text-[var(--brand-600)] rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Giữ nguyên liên kết tùy chỉnh
              </button>
            </div>
          ) : (
            /* Two-Level Cascading Menu (Flyout / Drill-down) */
            <div>
              {/* Breadcrumb Header */}
              <div className="px-3.5 py-2 bg-[var(--surface-200)] border-b border-[var(--border-300)] flex items-center justify-between text-xs font-semibold text-[var(--text-secondary-400)]">
                <div className="flex items-center gap-1.5">
                  <activeCategory.icon className="w-3.5 h-3.5" />
                  <span className="text-[var(--text-primary)] font-bold">
                    {activeCategory.label}
                  </span>
                  <ChevronRight className="w-3 h-3 text-[var(--text-secondary-400)]" />
                  <span className="text-[var(--brand-600)] font-medium">Chọn mục</span>
                </div>
                <span className="text-[11px] text-[var(--text-secondary-400)]">
                  {activeCategory.items.length} mục
                </span>
              </div>

              {/* Two-Column Cascader Panel */}
              <div className="flex h-[240px]">
                {/* Left Column: Categories */}
                <div className="w-[140px] flex-shrink-0 border-r border-[var(--border-300)] bg-[var(--surface-100)] py-1 overflow-y-auto">
                  {categories.map((cat) => {
                    const isActive = cat.id === activeCategoryId
                    const CatIcon = cat.icon
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategoryId(cat.id)}
                        onMouseEnter={() => setActiveCategoryId(cat.id)}
                        className={`w-full text-left px-3 py-2.5 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-white text-[var(--brand-600)] font-bold shadow-sm'
                            : 'text-[var(--text-secondary-600)] hover:bg-[var(--surface-200)] font-medium'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <CatIcon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{cat.label}</span>
                        </span>
                        <ChevronRight className="w-3 h-3 text-[var(--text-secondary-400)]" />
                      </button>
                    )
                  })}
                </div>

                {/* Right Column: Sub-items */}
                <div className="flex-1 py-1 overflow-y-auto">
                  {isLoadingCourses && activeCategory.id === 'courses' ? (
                    <div className="p-4 text-center text-xs text-[var(--text-secondary-400)]">
                      Đang tải danh sách khóa học...
                    </div>
                  ) : activeCategory.items.length === 0 ? (
                    <div className="p-4 text-center text-xs text-[var(--text-secondary-400)]">
                      {activeCategory.id === 'courses'
                        ? 'Chưa có khóa học nào ở trạng thái PUBLISH.'
                        : 'Không có mục nào.'}
                    </div>
                  ) : (
                    activeCategory.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectItem(item)}
                        className="w-full text-left px-3.5 py-2 hover:bg-[var(--surface-200)] transition-colors flex flex-col gap-0.5 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-[var(--text-primary)]">
                            {item.label}
                          </span>
                          {item.isCustom && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--brand-50)] text-[var(--brand-600)] font-medium">
                              Tự do
                            </span>
                          )}
                        </div>
                        {item.url && (
                          <span className="text-[11px] text-[var(--text-secondary-400)] font-mono truncate">
                            {item.url}
                          </span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
