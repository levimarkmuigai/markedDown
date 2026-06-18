import { convertToHtml, images } from "mammoth";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

export async function toMarkDown(buffer: ArrayBuffer): Promise<string> {
  const options = { convertImage: images.dataUri };

  const htmlResult = await convertToHtml({ arrayBuffer: buffer }, options);

  const result = htmlToMarkdown(htmlResult.value);
  return result;
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
