import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AssistantRoutes from './AssistantRoutes';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/asst" replace />} />
        <Route path="/asst/*" element={<AssistantRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
