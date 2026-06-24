import {
  CloudUpload, CircleX, CirclePlus, Check, Loader, Download,
  createIcons
} from "lucide";
import { qs } from "./utils/dom";
import { initDropzone } from "./ui/dropzone";
import { processor } from "./converters/process";
import { logger } from "./utils/logger";


const elements = {
  uploadBtn: qs<HTMLButtonElement>("#upload-btn"),
  clearBtn: qs<HTMLButtonElement>("#clear-btn"),
  dropZone: qs<HTMLDivElement>("#drop-zone"),
};

createIcons({
  icons: { CloudUpload, CircleX, CirclePlus, Check, Loader, Download }
});

initDropzone(elements, async (files) => {
  const outcomes = processor(files);
});
logger.debug("initDropzone started");
