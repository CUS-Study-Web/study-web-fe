import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '../components/admin/AdminLayout'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminSystem from '../pages/admin/AdminSystem'
import AdminWebsite from '../pages/admin/AdminWebsite'

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="system" element={<AdminSystem />} />
        <Route path="website" element={<AdminWebsite />} />
      </Routes>
    </AdminLayout>
  )
}