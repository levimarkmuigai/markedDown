import { createIcons, CirclePlus, CircleX, CloudUpload, Download, File }
  from "lucide";

export function hydrateIcons(): void {
  createIcons({ icons: { CloudUpload, CircleX, CirclePlus, File, Download } });
}
