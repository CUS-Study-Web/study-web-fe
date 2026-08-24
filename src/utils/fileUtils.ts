export const MAX_IMAGE_SIZE_MB = 10;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Validates an image file before upload.
 * @param file The file to validate
 * @throws Error if the file is invalid
 */
export const validateImageFile = (file: File) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`Định dạng không hợp lệ. Chỉ chấp nhận: ${ALLOWED_IMAGE_TYPES.join(', ')}`);
  }

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
    throw new Error(`Kích thước ảnh không được vượt quá ${MAX_IMAGE_SIZE_MB}MB`);
  }
};
