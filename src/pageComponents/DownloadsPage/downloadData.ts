import { RESUME_PDF_URL } from "@/lib/resume";

export interface DownloadItem {
  image: string;
  /**
   * Where the item points. A string is the same target in both languages; the
   * online CV needs one URL per language, since `/cv/**` is outside the `/en`
   * prefix and carries its language in the path instead.
   */
  downloadUrl: string | { es: string; en: string };
  /**
   * `true` leaves the click to the browser: a PDF or an external form. `false`
   * is an internal route and goes through `TransitionLink`.
   */
  external: boolean;
  /** `'view'` opens something to read, `'download'` hands over a file. */
  action?: "download" | "view";
}

export const downloadData: DownloadItem[] = [
  {
    // The thumbnails preview the document itself, the way the template covers
    // below do. A portrait of Molly told a reader nothing about what the file is.
    image: "/img/downloads/cv-pdf-preview.webp",
    downloadUrl: RESUME_PDF_URL,
    external: true,
  },
  {
    image: "/img/downloads/cv-online-preview.webp",
    downloadUrl: { es: "/cv/es", en: "/cv" },
    external: false,
    action: "view",
  },
  {
    image: "/img/downloads/molly-yllom-web-descargas-portadas-1.webp",
    downloadUrl: "https://forms.gle/7xLe2jeHb2qPKsVR8",
    external: true,
  },
  {
    image: "/img/downloads/molly-yllom-plantilla-preferencias-portada.webp",
    downloadUrl: "https://forms.gle/fLKtHgpvFT7YsFLeA",
    external: true,
  },
  {
    image: "/img/downloads/molly-yllom-web-descargas-portadas-02.webp",
    downloadUrl: "https://forms.gle/oTo2azeJw1Cx1XYg6",
    external: true,
  },
  {
    image: "/img/downloads/molly-yllom-web-descargas-portadas-03.webp",
    downloadUrl: "https://forms.gle/R2ub4yCdnwsecgL29",
    external: true,
  },
];
