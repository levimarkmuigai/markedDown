import { createWorker } from "tesseract.js";
import { logger } from "../utils/logger";
import { Outcome } from "../types/index";

export async function convertImage(file: File):
  Promise<Outcome> {
  const worker = await createWorker('eng');
  logger.info('worker initialized');

  try {

    const { data } = await worker.recognize(file);

    const fileName = file.name.split('.')[0];

    const cleanedText = data.text
      .replace(/\n{3,}/g, '\n\n')
      .replace(/ {2,}/g, '')
      .trim();

    const content = `## Image\n\n${cleanedText}\n\n--\n\n`;
    return {
      ok: true,
      result: {
        content,
        fileName,
        warning: [''],
      }
    }
  } catch (error) {
    logger.error('OCR failed: ', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message :
        'image conversion failed'
    }
  } finally {
    await worker.terminate();
  }
}
