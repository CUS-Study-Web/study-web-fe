export const MAX_DOCUMENT_SIZE_MB = 50;
export const MAX_IMAGE_SIZE_MB = 10;
export const FILE_SIZE_ERROR_MESSAGE = 'Vượt quá size limit, hãy thử file nhỏ hơn';

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Extracts the file extension in lower case with leading dot (e.g., ".pdf", ".docx").
 */
export const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.substring(lastDot).toLowerCase();
};

/**
 * Checks if a given file or filename matches the expected file type.
 * Supports types like 'PDF', 'DOCX', 'WORD', 'DOC', 'XLSX', 'EXCEL', 'XLS', 'CSV', 'PPTX', 'PPT', 'IMAGE'.
 */
export const matchFileType = (file: File | string, expectedType: string): boolean => {
  const fileName = typeof file === 'string' ? file : file.name;
  const ext = getFileExtension(fileName);
  const mime = typeof file === 'string' ? '' : (file.type || '').toLowerCase();
  const normalizedType = expectedType.trim().toUpperCase();

  switch (normalizedType) {
    case 'PDF':
      return ext === '.pdf' || mime === 'application/pdf';
    case 'DOCX':
    case 'WORD':
    case 'DOC':
      return (
        ext === '.docx' ||
        ext === '.doc' ||
        mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        mime === 'application/msword'
      );
    case 'XLSX':
    case 'EXCEL':
    case 'XLS':
    case 'CSV':
      return (
        ext === '.xlsx' ||
        ext === '.xls' ||
        ext === '.csv' ||
        mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        mime === 'application/vnd.ms-excel' ||
        mime === 'text/csv'
      );
    case 'PPTX':
    case 'PPT':
      return (
        ext === '.pptx' ||
        ext === '.ppt' ||
        mime === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        mime === 'application/vnd.ms-powerpoint'
      );
    case 'IMAGE':
      return (
        ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ||
        ALLOWED_IMAGE_TYPES.includes(mime)
      );
    default:
      return true;
  }
};

/**
 * Validates that a file matches the user-selected file type.
 * @param file The file or filename to validate
 * @param expectedType The chosen file type (e.g. 'PDF', 'DOCX', 'XLSX', 'Word')
 * @throws Error if the file does not match the chosen file type
 */
export const validateFileTypeMatch = (file: File | string, expectedType: string) => {
  if (!matchFileType(file, expectedType)) {
    throw new Error(`Định dạng file không khớp với loại file đã chọn (${expectedType.toUpperCase()})`);
  }
};

/**
 * Validates a document file (PDF, DOCX, XLSX, etc.) before upload.
 * Checks that the document does not exceed the maximum size limit (50MB).
 * @param file The file to validate
 * @throws Error if the document exceeds 50MB
 */
export const validateDocumentFile = (file: File) => {
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_DOCUMENT_SIZE_MB) {
    throw new Error(FILE_SIZE_ERROR_MESSAGE);
  }
};

/**
 * Validates an image file before upload.
 * @param file The file to validate
 * @throws Error if the file is invalid or exceeds the maximum size limit (10MB)
 */
export const validateImageFile = (file: File) => {
  const ext = getFileExtension(file.name);
  const isValidExt = !ext || ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  const isValidMime = !file.type || ALLOWED_IMAGE_TYPES.includes(file.type);

  if (!isValidExt || !isValidMime) {
    throw new Error(`Định dạng không hợp lệ. Chỉ chấp nhận: ${ALLOWED_IMAGE_TYPES.join(', ')}`);
  }

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
    throw new Error(FILE_SIZE_ERROR_MESSAGE);
  }
};


