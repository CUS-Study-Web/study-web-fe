import { Routes, Route, Navigate } from 'react-router-dom';
import AssistantLayout from '../components/assistant/AssistantLayout';
import AssistantDashboard from '../pages/assistant/AssistantDashboard';
import AssistantCourses from '../pages/assistant/AssistantCourses';
import AssistantCourseDetail from '../pages/assistant/AssistantCourseDetail';
import AssistantSubjectDetail from '../pages/assistant/AssistantSubjectDetail';
import AssistantUploadExam from '../pages/assistant/AssistantUploadExam';
import AssistantEditExam from '../pages/assistant/AssistantEditExam';
import AssistantMaterials from '../pages/assistant/AssistantMaterials';
import AssistantStudents from '../pages/assistant/AssistantStudents';

export default function AssistantRoutes() {
  return (
    <AssistantLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/assistant/dashboard" replace />} />
        <Route path="dashboard" element={<AssistantDashboard />} />
        <Route path="courses" element={<AssistantCourses />} />
        <Route path="courses/:courseKey" element={<AssistantCourseDetail />} />
        <Route path="courses/:courseKey/upload-exam" element={<AssistantUploadExam />} />
        <Route path="courses/:courseKey/edit-exam/:examId" element={<AssistantEditExam />} />
        <Route path="courses/:courseKey/:subjectName" element={<AssistantSubjectDetail />} />
        <Route path="materials" element={<AssistantMaterials />} />
        <Route path="students" element={<AssistantStudents />} />
      </Routes>
    </AssistantLayout>
  );
}
