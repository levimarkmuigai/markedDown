import { BatchResult } from "../types/index";
import { detectFileType } from "./detect";
import { dispatch } from "./dispatcher";

export async function processor(files: File[]): Promise<BatchResult> {
  if (files.length === 0) {
    return { files: [], outcomes: [] };
  }

  const outcomes = await Promise.all(files.map(
    (file) => dispatch(
      {
        file, fileType: detectFileType(file)
      })
  ));

  return { files, outcomes };
}
