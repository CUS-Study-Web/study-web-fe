import * as XLSX from 'xlsx';

export interface ParsedFlashcard {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaning: string;
}

export const parseFlashcardsFromExcel = (file: File): Promise<ParsedFlashcard[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        const newWords: ParsedFlashcard[] = [];
        // Skip header row if present. Assumes first row is header.
        for (let i = 1; i < jsonData.length; i++) {
          const row: any = jsonData[i];
          if (!row || row.length === 0 || !row[0]) continue;
          newWords.push({
            word: String(row[0] || '').trim(),
            phonetic: String(row[1] || '').trim(),
            partOfSpeech: String(row[2] || '').trim(),
            meaning: String(row[3] || '').trim()
          });
        }
        
        resolve(newWords);
      } catch (error) {
        console.error(error);
        reject(new Error("Không thể đọc file Excel. Vui lòng kiểm tra định dạng."));
      }
    };
    reader.onerror = () => {
      reject(new Error("Đã xảy ra lỗi khi đọc file."));
    };
    reader.readAsArrayBuffer(file);
  });
};
