import AdminNavBar from './AdminSidebar'

type AdminLayoutProps = {
  children: React.ReactNode,
  onLogout?: () => void,
}

export default function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--surface-app)]">
      <AdminNavBar onLogout={onLogout} />
      <main className="max-w-[1280px] mx-auto px-[28px] py-[32px]">
        {children}
      </main>
    </div>
  )
}
