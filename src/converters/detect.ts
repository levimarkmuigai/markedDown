import { FileType } from "../types/index";

const MIME_MAP: Record<string, FileType> = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'image/png': 'image',
  'image/jpeg': 'image',
  'image/webp': 'image',
}

export function detectFileType(file: File): FileType {
  return MIME_MAP[file.type] ?? 'unsupported';
}
