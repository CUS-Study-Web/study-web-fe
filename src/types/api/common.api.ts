export interface PagingInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SuccessResponse {
  statusCode: number;
  message: string;
}

export interface SingleResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  statusCode: number;
  message: string;
  data: T[];
  paging: PagingInfo;
}

export interface PagedResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  paging: PagingInfo;
}
