import { logger } from "../utils/logger";

type DropzoneElements = {
  uploadBtn: HTMLButtonElement;
  clearBtn: HTMLButtonElement;
  dropZone: HTMLDivElement;
};

export function initDropzone({
  uploadBtn,
  clearBtn,
  dropZone }: DropzoneElements,
  onFiles: (files: File[]) => void
): void {
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.accept = ".pdf,.docx,.png,.jpg,.jpeg";
  input.style.display = "none";
  document.body.appendChild(input);

  uploadBtn.addEventListener("click", () => {
    logger.debug("uploadBtn clicked");
    input.click();
  });

  input.addEventListener("change", () =>
    onFiles(Array.from(input.files ?? [])));

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("bg-hover", "border-transparent");
    onFiles(Array.from(e.dataTransfer?.files) ?? []);
  });

  clearBtn.addEventListener("click", () => {
    logger.debug("clearBtn clicked");
    input.value = "";
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("bg-hover", "border-transparent");
  });

  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropZone.classList.remove("bg-hover", "border-transparent");
  });
}
