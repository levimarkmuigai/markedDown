import { Input, Outcome } from "../types/index";
import { logger } from "../utils/logger";
import { performanceMonitor } from "../utils/performance";
import { convertDocx } from "./docx";
import { convertImage } from "./image";
import { convertPdf } from "./pdf";

export async function dispatch(input: Input): Promise<Outcome> {
  switch (input.fileType) {
    case 'pdf': {
      const pdfResult = await performanceMonitor(
        'pdf -> markdown',
        () => convertPdf(input.file)
      );

      logger.info(
        `pdf -> markdown took: ${pdfResult.durationMs}ms`);
      return pdfResult.outcome;
    };

    case "docx": {
      const docxResult = await performanceMonitor(
        'docx -> markdown',
        () => convertDocx(input.file)
      );

      logger.info(
        `docx -> markdown took: ${docxResult.durationMs}ms`);
      return docxResult.outcome;
    };

    case "image": {
      const imageResult = await performanceMonitor(
        'image -> markdown',
        () => convertImage(input.file)
      );
      logger.info(
        `image -> markdown took: ${imageResult.outcome}ms`);
      return imageResult.outcome;
    };

    default: {
      const unsupported = (input as Input).fileType;
      logger.error(`unsupported file type: ${unsupported}`)
      return {
        ok: false,
        error: `unsupported file type: ${unsupported}`
      };
    };
  }
}
