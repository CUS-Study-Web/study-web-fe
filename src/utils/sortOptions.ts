export interface SortOption {
  value: string;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: 'createdAt,desc', label: 'Mới nhất' },
  { value: 'createdAt,asc', label: 'Cũ nhất' },
  { value: 'title,asc', label: 'Tên A-Z' },
  { value: 'title,desc', label: 'Tên Z-A' },
  { value: 'downloadCount,desc', label: 'Lượt tải nhiều nhất' },
  { value: 'downloadCount,asc', label: 'Lượt tải ít nhất' },
];
