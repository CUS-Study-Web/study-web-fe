export const MAX_DOCUMENT_SIZE_MB = 50;
export const MAX_IMAGE_SIZE_MB = 10;
export const FILE_SIZE_ERROR_MESSAGE = 'Vượt quá size limit, hãy thử file nhỏ hơn';

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Validates a document file (PDF, DOCX, XLSX, etc.) before upload.
 * @param file The file to validate
 * @throws Error if the document exceeds the maximum size limit (50MB)
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
  if (file.type && !ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`Định dạng không hợp lệ. Chỉ chấp nhận: ${ALLOWED_IMAGE_TYPES.join(', ')}`);
  }

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
    throw new Error(FILE_SIZE_ERROR_MESSAGE);
  }
};

