type FileType = 'pdf' | 'docx' | 'image' | 'unsupported';

export interface Input {
  file: File;
  fileType: FileType;
}

export interface Result {
  markdown: string;
  type: string[];
}

export interface Convertor {
  convert(input: Input): Promise<Result>;
}
