import { createWorker } from "tesseract.js";
import { logger } from "../utils/logger";
import { Outcome } from "../types/index";

export async function convertImage(imageBuffers: ArrayBuffer[]):
  Promise<Outcome> {
  const worker = await createWorker('eng');
  logger.info('worker initialized');

  let result = "";

  try {
    for (let i = 0; i < imageBuffers.length; i++) {
      const { data } = await worker.recognize(imageBuffers[i]);

      const cleanedText = data.text
        .replace(/\n{3,}/g, '\n\n')
        .replace(/ {2,}/g, '')
        .trim();

      result += `## Image Section ${i + 1}\n\n${cleanedText}\n\n--\n\n`;

      return {
        ok: true,
        result: {
          markdown: result.trim(),
          warning: [''],
        }
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
