import * as XLSX from 'xlsx';

export interface ParsedFlashcard {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaning: string;
}

const readFileAsync = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as ArrayBuffer);
      } else {
        reject(new Error("File trống hoặc không thể đọc."));
      }
    };
    reader.onerror = () => reject(new Error("Đã xảy ra lỗi khi đọc file."));
    reader.readAsArrayBuffer(file);
  });
};

export const parseFlashcardsFromExcel = async (file: File): Promise<ParsedFlashcard[]> => {
  // 1. File extension validation
  const validExtensions = ['xlsx', 'xls', 'csv'];
  const ext = file.name.split('.').pop()?.toLowerCase();
  
  if (!ext || !validExtensions.includes(ext)) {
    throw new Error("Định dạng file không được hỗ trợ. Vui lòng tải lên file .xlsx, .xls hoặc .csv");
  }

  // 2. Read and parse file
  try {
    const buffer = await readFileAsync(file);
    const data = new Uint8Array(buffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (jsonData.length < 2) {
      throw new Error("File không có dữ liệu từ vựng.");
    }

    // 3. Header validation
    const headerRow: any = jsonData[0];
    if (!headerRow || headerRow.length < 4) {
      throw new Error("File bị thiếu cột. Vui lòng đảm bảo đủ 4 cột (Tiếng Anh, Phiên âm, Từ loại, Tiếng Việt).");
    }
    
    const expectedHeaders = ["Tiếng Anh", "Phiên âm", "Từ loại", "Tiếng Việt"];
    
    // Strict validation: exactly 4 columns with exact matching names
    let isHeaderValid = true;
    for (let i = 0; i < 4; i++) {
      if (String(headerRow[i] || '').trim() !== expectedHeaders[i]) {
        isHeaderValid = false;
        break;
      }
    }

    // Ensure there are no extra columns with data
    if (headerRow.length > 4) {
      for (let i = 4; i < headerRow.length; i++) {
        if (String(headerRow[i] || '').trim() !== '') {
          isHeaderValid = false;
          break;
        }
      }
    }

    if (!isHeaderValid) {
      throw new Error("Cấu trúc cột không hợp lệ. File phải có đúng 4 cột với tiêu đề chính xác: Tiếng Anh, Phiên âm, Từ loại, Tiếng Việt.");
    }

    // 4. Data extraction and validation
    const newWords: ParsedFlashcard[] = [];
    
    for (let i = 1; i < jsonData.length; i++) {
      const row: any = jsonData[i];
      
      // Skip completely empty rows
      if (!row || row.length === 0 || row.every((cell: any) => !String(cell).trim())) {
        continue;
      }

      const word = String(row[0] || '').trim();
      const phonetic = String(row[1] || '').trim();
      const partOfSpeech = String(row[2] || '').trim();
      const meaning = String(row[3] || '').trim();

      // Check required fields (Word and Meaning)
      if (!word || !meaning) {
        throw new Error(`Dòng ${i + 1} bị thiếu dữ liệu bắt buộc (Tiếng Anh hoặc Tiếng Việt). Vui lòng điền đủ rồi thử lại.`);
      }

      newWords.push({ word, phonetic, partOfSpeech, meaning });
    }

    if (newWords.length === 0) {
      throw new Error("Không tìm thấy từ vựng hợp lệ nào trong file.");
    }

    return newWords;
    
  } catch (error: any) {
    // Rethrow known errors directly
    if (error.message && !error.message.includes("Cannot read properties")) {
      throw error;
    }
    throw new Error("Không thể đọc file Excel. Vui lòng kiểm tra định dạng hoặc nội dung file.");
  }
};
