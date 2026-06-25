import { qs } from "./utils/dom";
import { initDropzone } from "./ui/dropzone";
import { processor } from "./converters/process";
import { pendingRow } from "./ui/results";
import { hydrateIcons } from "./utils/icons";



const elements = {
  uploadBtn: qs<HTMLButtonElement>("#upload-btn"),
  clearBtn: qs<HTMLButtonElement>("#clear-btn"),
  dropZone: qs<HTMLDivElement>("#drop-zone"),
};

const resultDiv = qs<HTMLDivElement>("#result-div");

hydrateIcons();

initDropzone(elements, async (files) => {
  const resolver = files.map(f => pendingRow(resultDiv, f.name));
  hydrateIcons();

  const batchResults = await processor(files);

  batchResults.outcomes.forEach(
    (outcomes, i) => resolver[i](outcomes)
  );

  hydrateIcons();
});

