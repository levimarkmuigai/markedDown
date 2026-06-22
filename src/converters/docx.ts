import { convertToHtml, images } from "mammoth";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { logger } from "../utils/logger";
import { Outcome } from "../types/index";

export async function convertDocx(file: File): Promise<Outcome> {
  try {
    const buffer = await file.arrayBuffer();

    const options = { convertImage: images.dataUri };

    const htmlResult = await convertToHtml({ arrayBuffer: buffer }, options);

    const fileName = file.name.split('.')[0];

    const result = htmlToMarkdown(htmlResult.value);
    return {
      ok: true,
      result: {
        content: result,
        fileName,
        warning: [''],
      }
    };
  } catch (error) {
    logger.error('mammoth failed: ', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'docx conversion error'
    }
  }
}

function htmlToMarkdown(html: string) {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
  });

  turndownService.use(gfm);

  return turndownService.turndown(html);
}
