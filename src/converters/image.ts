import { createWorker } from "tesseract.js";
import { logger } from "../utils/logger";

export async function imageToString(imageBuffers: ArrayBuffer[]):
  Promise<string> {
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
    }
  } catch (error) {
    logger.error('OCR failed: ', error);
    throw error;
  } finally {
    await worker.terminate();
  }
  return result.trim();
}
