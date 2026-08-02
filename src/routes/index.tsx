import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminRoutes from './AdminRoutes'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
