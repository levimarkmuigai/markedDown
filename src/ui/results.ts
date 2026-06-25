import { Outcome } from "../types/index";

function toMdName(name: string): string {
  return name.replace(/\.[^.]+$/, ".md");
}

function downloadAnchor(fileName: string, content: string):
  HTMLAnchorElement {
  const blob = new Blob([content], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;

  const icon = document.createElement("i");

  icon.setAttribute("data-lucide", "download");
  a.appendChild(icon);
  return a;
}

export function pendingRow(
  container: HTMLElement,
  fileName: string
): (outcome: Outcome) => void {
  const mdName = toMdName(fileName);

  const row = document.createElement("div");
  row.className = "flex flex-row gap-8 items-center";

  const icon = document.createElement("i");
  icon.setAttribute("data-lucide", "file");

  const label = document.createElement("p");
  label.className = "font-body text-sm text-dark-ink truncate min-w-0 flex-1";
  label.textContent = mdName;

  const slot = document.createElement("span");

  label.textContent = mdName;
  row.appendChild(icon);
  row.appendChild(label);
  row.appendChild(slot);
  container.appendChild(row);

  return (outcome: Outcome) => {
    if (outcome.ok) {
      const fileName = outcome.result.fileName + ".md";
      const anchor = downloadAnchor(fileName, outcome.result.content);

      anchor.addEventListener("click", () => row.remove());

      slot.replaceWith(anchor);
    }
  };
}
