import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AssistantRoutes from './AssistantRoutes';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/assistant" replace />} />
        <Route path="/assistant/*" element={<AssistantRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
