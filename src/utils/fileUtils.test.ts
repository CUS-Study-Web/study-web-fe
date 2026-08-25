import { describe, it, expect } from 'vitest';
import {
  getFileExtension,
  matchFileType,
  validateFileTypeMatch,
  validateDocumentFile,
  validateImageFile,
  getDisplayFileType,
  MAX_DOCUMENT_SIZE_MB,
  MAX_IMAGE_SIZE_MB,
  FILE_SIZE_ERROR_MESSAGE,
} from './fileUtils';

describe('fileUtils', () => {
  describe('getFileExtension', () => {
    it('should extract correct extensions', () => {
      expect(getFileExtension('test.pdf')).toBe('.pdf');
      expect(getFileExtension('document.DOCX')).toBe('.docx');
      expect(getFileExtension('archive.tar.gz')).toBe('.gz');
      expect(getFileExtension('noextension')).toBe('');
    });
  });

  describe('matchFileType & validateFileTypeMatch', () => {
    it('should match PDF files correctly', () => {
      const pdfFile = new File([''], 'exercise.pdf', { type: 'application/pdf' });
      expect(matchFileType(pdfFile, 'PDF')).toBe(true);
      expect(matchFileType('exercise.pdf', 'PDF')).toBe(true);
      expect(() => validateFileTypeMatch(pdfFile, 'PDF')).not.toThrow();

      // Mismatch
      expect(matchFileType(pdfFile, 'DOCX')).toBe(false);
      expect(matchFileType(pdfFile, 'XLSX')).toBe(false);
      expect(() => validateFileTypeMatch(pdfFile, 'DOCX')).toThrow(
        'Định dạng file không khớp với loại file đã chọn (DOCX)'
      );
    });

    it('should match DOCX / Word files correctly', () => {
      const docxFile = new File([''], 'exercise.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      expect(matchFileType(docxFile, 'DOCX')).toBe(true);
      expect(matchFileType(docxFile, 'Word')).toBe(true);
      expect(matchFileType('notes.doc', 'DOCX')).toBe(true);
      expect(() => validateFileTypeMatch(docxFile, 'DOCX')).not.toThrow();

      // Mismatch
      expect(matchFileType(docxFile, 'PDF')).toBe(false);
      expect(() => validateFileTypeMatch(docxFile, 'PDF')).toThrow(
        'Định dạng file không khớp với loại file đã chọn (PDF)'
      );
    });

    it('should match XLSX / Excel files correctly', () => {
      const xlsxFile = new File([''], 'data.xlsx', {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      expect(matchFileType(xlsxFile, 'XLSX')).toBe(true);
      expect(matchFileType('vocab.xls', 'XLSX')).toBe(true);
      expect(() => validateFileTypeMatch(xlsxFile, 'XLSX')).not.toThrow();

      // Mismatch
      expect(matchFileType(xlsxFile, 'PDF')).toBe(false);
      expect(matchFileType(xlsxFile, 'DOCX')).toBe(false);
      expect(() => validateFileTypeMatch(xlsxFile, 'PDF')).toThrow(
        'Định dạng file không khớp với loại file đã chọn (PDF)'
      );
    });
  });

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

  describe('getDisplayFileType', () => {
    it('should normalize known file types', () => {
      expect(getDisplayFileType('PDF')).toBe('PDF');
      expect(getDisplayFileType('docx')).toBe('DOCX');
      expect(getDisplayFileType('word')).toBe('DOCX');
      expect(getDisplayFileType('xlsx')).toBe('XLSX');
      expect(getDisplayFileType('excel')).toBe('XLSX');
      expect(getDisplayFileType('csv')).toBe('XLSX');
      expect(getDisplayFileType('pptx')).toBe('PPTX');
    });

    it('should derive file type from fileUrl if fileType is missing', () => {
      expect(getDisplayFileType(null, 'https://cdn.example.com/homework.docx?v=1')).toBe('DOCX');
      expect(getDisplayFileType('', 'https://cdn.example.com/homework.xlsx')).toBe('XLSX');
      expect(getDisplayFileType(undefined, 'https://cdn.example.com/exam.pdf')).toBe('PDF');
    });

    it('should fallback to PDF if neither is available', () => {
      expect(getDisplayFileType(null, null)).toBe('PDF');
    });
  });
});
