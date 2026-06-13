import { createWorker } from "tesseract.js";
import { logger } from "../utils/logger";

export async function imageToString(imageBuffers: ArrayBuffer[]):
  Promise<string[]> {
  const result: string[] = [];

  const worker = await createWorker('eng');

  logger.info('worker initialized');

  try {
    for (const buffer of imageBuffers) {
      const { data } = await worker.recognize(buffer);
      result.push(data.text);
    }
  } catch (error) {
    logger.error(error);
    throw error;
  } finally {
    await worker.terminate();
  }
  return result;
}
