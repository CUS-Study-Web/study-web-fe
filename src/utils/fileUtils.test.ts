import { describe, it, expect } from 'vitest';
import {
  validateDocumentFile,
  validateImageFile,
  MAX_DOCUMENT_SIZE_MB,
  MAX_IMAGE_SIZE_MB,
  FILE_SIZE_ERROR_MESSAGE,
} from './fileUtils';

describe('fileUtils', () => {
  describe('validateDocumentFile', () => {
    it('should allow document files under or equal to 50MB', () => {
      const validFile = new File(['a'.repeat(1024)], 'test.pdf', {
        type: 'application/pdf',
      });
      expect(() => validateDocumentFile(validFile)).not.toThrow();

      const exact50MBFile = {
        size: MAX_DOCUMENT_SIZE_MB * 1024 * 1024,
        name: 'exact50.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      } as File;
      expect(() => validateDocumentFile(exact50MBFile)).not.toThrow();
    });

    it('should throw "Vượt quá size limit, hãy thử file nhỏ hơn" when document exceeds 50MB', () => {
      const largeFile = {
        size: MAX_DOCUMENT_SIZE_MB * 1024 * 1024 + 1,
        name: 'large.pdf',
        type: 'application/pdf',
      } as File;
      expect(() => validateDocumentFile(largeFile)).toThrow(FILE_SIZE_ERROR_MESSAGE);
    });
  });

  describe('validateImageFile', () => {
    it('should allow image files under or equal to 10MB with valid type', () => {
      const validImage = new File(['image data'], 'avatar.png', {
        type: 'image/png',
      });
      expect(() => validateImageFile(validImage)).not.toThrow();

      const exact10MBImage = {
        size: MAX_IMAGE_SIZE_MB * 1024 * 1024,
        name: 'photo.jpeg',
        type: 'image/jpeg',
      } as File;
      expect(() => validateImageFile(exact10MBImage)).not.toThrow();
    });

    it('should throw "Vượt quá size limit, hãy thử file nhỏ hơn" when image exceeds 10MB', () => {
      const largeImage = {
        size: MAX_IMAGE_SIZE_MB * 1024 * 1024 + 100,
        name: 'huge.png',
        type: 'image/png',
      } as File;
      expect(() => validateImageFile(largeImage)).toThrow(FILE_SIZE_ERROR_MESSAGE);
    });

    it('should throw invalid format error for unsupported image types', () => {
      const invalidTypeFile = new File(['text'], 'test.txt', {
        type: 'text/plain',
      });
      expect(() => validateImageFile(invalidTypeFile)).toThrow(
        /Định dạng không hợp lệ/
      );
    });
  });
});
