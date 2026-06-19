export type FileType = 'pdf' | 'docx' | 'image' | 'unsupported';

export interface Input {
  file: File;
  fileType: FileType;
}

export interface Result {
  markdown: string;
  warning: string[];
}

export interface BatchInput {
  files: File[];
}

export interface BatchResult {
  files: File[];
  outcomes: Outcome[];
}

export interface Convertor {
  convert(input: Input): Promise<Result>;
}

export type Outcome =
  | { ok: true; result: Result } | { ok: false; error: string }
  ;
