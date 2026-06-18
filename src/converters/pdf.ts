import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { PDFDocumentProxy, TextItem } from "pdfjs-dist/types/src/display/api";
import TurndownService from "turndown";

const CONCURRENCY_LIMIT = 15;
const turndownService = new TurndownService();

export async function toMarkdown(buffer: ArrayBuffer): Promise<string> {
  const pdfDocument = await getDocument({ data: new Uint8Array(buffer) })
    .promise;

  const pageNumbers = Array.from({ length: pdfDocument.numPages },
    (_, i) => i + 1);
  const allResults: string[] = [];

  for (let i = 0; i < pageNumbers.length; i += CONCURRENCY_LIMIT) {
    const chunk = pageNumbers.slice(i, i + CONCURRENCY_LIMIT);
    const chunkResults = await Promise.all(
      chunk.map((pageNum) =>
        extractPageAsMarkdown(pdfDocument, pageNum))
    );
    allResults.push(...chunkResults);
  }

  return allResults.join('\n\n');
}

async function extractPageAsMarkdown(
  pdfDocument: PDFDocumentProxy,
  pageNum: number
): Promise<string> {
  const page = await pdfDocument.getPage(pageNum);
  const textContent = await page.getTextContent();
  const rawText = extractPageText(textContent.items as TextItem[]);
  page.cleanup();
  return turndownService.escape(rawText);
}

function extractPageText(items: TextItem[]): string {
  let pageText = '';
  for (const item of items) {
    pageText += item.str;
    if (item.hasEOL) {
      pageText += '\n';
    } else if (!pageText.endsWith(' ')) {
      pageText += ' ';
    }
  }
  return pageText
}
