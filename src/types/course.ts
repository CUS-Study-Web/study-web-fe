export interface Subject {
  id: string;
  title: string;
  duration: string;
  lessons: number;
}

export interface Course {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  desc: string;
  img: string;
  headerBg: string;
  cardHeaderBg: string;
  cardBtnColor: string;
  subjects: Subject[];
}
