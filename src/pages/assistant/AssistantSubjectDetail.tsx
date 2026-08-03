import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CoursePageHeader from '../../components/assistant/course/CoursePageHeader';
import TabBar from '../../components/assistant/course/TabBar';
import TopicAccordion from '../../components/assistant/course/TopicAccordion';
import {
  DEMO_COURSES,
  DEMO_SUBJECT_META_V2,
  DEMO_SUBJECT_TOPICS,
} from '../../types/assistant/mockData';
import type { SubjectTopic } from '../../types/assistant/models';

const TABS = [
  { key: 'bai-giang', label: 'Bài giảng' },
  { key: 'bai-tap', label: 'Bài tập' },
];

export default function AssistantSubjectDetail() {
  const { courseKey, subjectName } = useParams<{ courseKey: string; subjectName: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bai-giang');

  const decodedSubject = decodeURIComponent(subjectName ?? '');
  const course = DEMO_COURSES.find((c) => c.key === courseKey);
  const meta = DEMO_SUBJECT_META_V2[decodedSubject] ?? { topics: 0, lectures: 0, exercises: 0 };

  // Use mock topic data if available, otherwise build placeholder topics from meta
  const topicsRaw: SubjectTopic[] = DEMO_SUBJECT_TOPICS[decodedSubject] ?? [];

  return (
    <div className="flex flex-col h-full w-full">
      <CoursePageHeader
        breadcrumbs={[
          { label: 'Quản lý khóa học', onClick: () => navigate('/assistant/courses') },
          {
            label: course?.name ?? courseKey ?? '',
            onClick: () => navigate(`/assistant/courses/${courseKey}`),
          },
          { label: decodedSubject },
        ]}
        title={decodedSubject}
        subtitle={`Quản lý nội dung môn học · Khóa ${course?.name ?? courseKey}`}
        rightSlot={
          <div
            onClick={() => console.log('Tải lên')}
            className="flex items-center gap-2 px-5 py-2 rounded-[8px] bg-[var(--brand-500)] hover:bg-[var(--brand-600)] font-[family-name:var(--font-heading)] font-semibold text-[14px] text-white cursor-pointer active:scale-95 transition-all duration-150 select-none shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Tải lên
          </div>
        }
      />

      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-5 flex flex-col gap-3">
        {topicsRaw.length === 0 ? (
          <div className="py-12 text-center text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
            Chưa có nội dung. Hãy tải lên bài giảng hoặc bài tập đầu tiên.
          </div>
        ) : (
          topicsRaw.map((topic) => (
            <TopicAccordion
              key={topic.id}
              topic={topic}
              mode={activeTab === 'bai-giang' ? 'lecture' : 'exercise'}
              onEdit={(id) => console.log('Edit', id)}
              onDelete={(id) => console.log('Delete', id)}
              onView={(id) => console.log('View', id)}
              onDownload={(id) => console.log('Download', id)}
            />
          ))
        )}

        {/* Topics with no mock data — show collapsed placeholders */}
        {topicsRaw.length > 0 && meta.topics > topicsRaw.length &&
          Array.from({ length: meta.topics - topicsRaw.length }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="rounded-[12px] border border-[var(--border-default)] bg-[var(--surface-card)] px-5 py-3.5 flex items-center gap-3 opacity-50"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--neutral-400)] shrink-0" />
              <span className="font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--text-secondary)]">
                Chuyên đề {topicsRaw.length + i + 1}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--surface-muted)] text-[var(--text-tertiary)] font-[family-name:var(--font-heading)] font-semibold text-[11px]">
                0 bài
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
}
