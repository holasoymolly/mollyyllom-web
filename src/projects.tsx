export interface Project {
  title: string;
  /**
   * Only when the title carries words beyond the brand name ("Refinamiento",
   * "Identidad"). A plain proper noun reads the same in both languages and
   * leaves this out. Read it through `projectTitle()`, never directly.
   */
  titleEn?: string;
  portfolioImage: string;
  heroImage: string;
  /**
   * On phones the hero (50vh, cover) only shows the middle of a wide image.
   * Set this to the number of subjects in it (3 for a group portrait) and the
   * phone hero shows the whole image at full height instead, swipeable left
   * and right, opening on the middle one, with that many dots under it.
   * Desktop is unchanged. Leave it out for heroes that read fine cropped.
   */
  heroSwipe?: number;
  /**
   * The case opens on the same frame as its grid tile: the logo animation on
   * its flat ground, full bleed. `src` is a wide (3840 × 1680) version of the
   * grid video with its ground extended inside the video itself, so no seam
   * shows (browsers colour-manage video and CSS colours differently). Used by the
   * logo-cover cases (INETXUS, Svelti, Spotlight, RODAI). `heroImage` stays
   * for the share preview (OG) and anywhere a still is needed.
   */
  heroMedia?: { src: string; ground: string };
  paragraphs: string[];
  paragraphsEn: string[];
  images: string[];
  /**
   * The same list for the English page, only when some images carry words
   * (a panel with labels). Each entry lines up with `images`; a project with
   * no words in its images leaves this out and both languages share `images`.
   */
  imagesEn?: string[];
  slug: string;

  /**
   * Case-study fields. All optional: a project without them renders exactly as
   * before, so the 15 projects that are fine as a written piece stay untouched.
   * Only fill these where there is something real to say. Never pad them.
   */
  client?: string;
  /**
   * Only needed when the client line carries words beyond the proper noun (a
   * descriptor or a country). A plain company name reads the same in both
   * languages and can leave this out.
   */
  clientEn?: string;
  year?: string;
  role?: string;
  roleEn?: string;
  scope?: string[];
  scopeEn?: string[];
  /**
   * Overrides the grid tile's kicker, which otherwise reads "Branding ·
   * Identidad" for every project and hides the product, web and systems work.
   * Derived from `scope` / `scopeEn`: the two most representative entries,
   * written exactly as they appear there. A project whose scope really is only
   * branding leaves this out and keeps the default.
   */
  gridLabel?: string;
  gridLabelEn?: string;
  brief?: string;
  briefEn?: string;
  shipped?: string[];
  shippedEn?: string[];
  outcome?: string[];
  outcomeEn?: string[];
  /** Collaborators, so work by other people is never implicitly claimed. */
  credits?: string[];
  creditsEn?: string[];
  /**
   * The case told in chapters (the November 2026 case-page refresh). A project
   * with a `story` renders the new layout: cover, chapter index, chapters made
   * of typed blocks, then what shipped, the outcome and the credits. A project
   * without one keeps the classic page built from `paragraphs` and `images`,
   * untouched. See `CaseStory` below.
   */
  story?: CaseStory;
}

/** A piece of copy written by hand in each language. */
export type Bilingual = { es: string; en: string };

/** One image with an optional two-part caption: what it is, then a detail. */
export interface StoryImage {
  src: string;
  title?: Bilingual;
  detail?: Bilingual;
}

/**
 * Width of a block. `column`: the reading column (default). `wide`: the full
 * content width, running under the chapter index (which steps aside).
 * `bleed`: edge to edge of the page, minus the cover's thin border.
 */
export type StoryWidth = 'column' | 'wide' | 'bleed';

export type StoryBlock =
  /** Up to three real figures. Never invented: each must come from the case. */
  | { kind: 'stats'; items: { value: string; label: Bilingual }[] }
  /** One piece. `solo` is a single piece centred with air around it. */
  | { kind: 'image'; image: StoryImage; size: StoryWidth | 'solo' }
  /** A grid at full content width: one row per subject, one column per angle or version. */
  | { kind: 'mosaic'; columns: Bilingual[]; rows: { title: Bilingual; images: string[] }[] }
  /**
   * Slides that move with arrows, mouse or trackpad drag, swipe and keys.
   * `large` shows each piece big (about 62% of the screen height) instead of
   * a strip of thumbnails.
   */
  | { kind: 'carousel'; label: Bilingual; items: StoryImage[]; large?: boolean; width?: StoryWidth }
  /**
   * Side-by-side pairs; any two proportions work (columns follow each piece's
   * ratio). A carousel by default; `static` stacks them instead.
   */
  | { kind: 'pairs'; label: Bilingual; items: { title: Bilingual; a: StoryImage; b: StoryImage }[]; static?: boolean; width?: StoryWidth }
  /** Before and after of the same frame, large, with a draggable line. */
  | { kind: 'compare'; before: StoryImage; after: StoryImage; hint: Bilingual; width?: StoryWidth }
  /** Close-ups in real/final pairs of the same size, on one clear grid. */
  | { kind: 'details'; groups: { title: Bilingual; real: StoryImage; final: StoryImage }[]; width?: StoryWidth }
  /**
   * Several pieces in columns: a 2-up or 3-up, a collection wall, logo
   * versions, a type specimen as an image. `ratio` crops every tile to one
   * shape (e.g. "1/1"); `fit: 'contain'` shows each piece whole on `ground`
   * (a flat colour), as logos need.
   */
  | {
      kind: 'wall';
      items: StoryImage[];
      columns: { desktop: number; phone: number };
      ratio?: string;
      fit?: 'cover' | 'contain';
      ground?: string;
      width?: StoryWidth;
    }
  /** Colour swatches drawn by the page, with their codes (HEX, RGB, CMYK, Pantone). */
  | { kind: 'palette'; colors: { name?: Bilingual; hex: string; codes?: string[] }[] };

export interface StoryChapter {
  /** Anchor for the chapter index, e.g. "encargo". */
  id: string;
  label: Bilingual;
  heading: Bilingual;
  text?: Bilingual;
  blocks?: StoryBlock[];
}

export interface CaseStory {
  /**
   * `over`: title on the image, only when it has clean room on the left.
   * `top`: title above on the page colour, image below. The safe default.
   */
  cover: {
    variant: 'over' | 'top';
    promise: Bilingual;
    focus?: string;
    /**
     * What the cover shows, when it is not `heroImage`: another image or a
     * video (.mp4), e.g. the logo animating on a flat ground, so the case can
     * open on the same frame as its grid tile. Optional; no case uses it yet.
     */
    media?: string;
    /** Flat colour behind the cover media (a logo on its brand ground). */
    ground?: string;
  };
  /**
   * The "before" the work came from, right under the cover, only if it
   * exists: the same subject before and after, same size and framing.
   */
  origin?: { label: Bilingual; heading: Bilingual; note?: Bilingual; before: StoryImage; after: StoryImage };
  chapters: StoryChapter[];
  /** A near full-bleed closing image after the chapters, plus up to three more below it. */
  closing?: { image: StoryImage; more?: string[] };
}

/**
 * Number of projects shown in the home page grid. The home grid is always this
 * many tiles: new projects enter at the top of `activeProjects` and push the
 * oldest ones off the bottom. `/proyectos` shows the full list, so nothing is
 * ever lost, it just stops appearing on the home page.
 */
/** The project's title in the reader's language. */
export const projectTitle = (project: Project, lang: "es" | "en"): string =>
  lang === "en" ? project.titleEn ?? project.title : project.title;

export const HOME_GRID_LIMIT = 12;

const COL = "/img/projects/la-colmena";
const COLP = `${COL}/piezas`;
const colCover: Bilingual = { es: "Portada", en: "Cover" };
const colIssue = (n: number): Bilingual => ({ es: `No. ${n}`, en: `No. ${n}` });
const colPages = (p: string): Bilingual => ({ es: `Págs. ${p}`, en: `Pages ${p}` });

/**
 * La Colmena told in chapters. Pieces are loose (covers and spreads rendered
 * from the final PDFs at their native 150 ppi size, never enlarged). There is
 * no `origin`: the "before" covers only exist at 453 × 604 (Issuu's viewer)
 * and `origin` would stretch them, so they open the first chapter in a wall.
 * Figures in `stats` come from the five final PDFs
 * and from issue 47's eight interior versions.
 */
const laColmenaStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "La revista del INTEC, rediseñada desde la portada hasta la última página. Van cinco números.",
      en: "INTEC's university magazine, redesigned from the cover to the last page. Five issues so far.",
    },
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      heading: { es: "Una revista que se sintiera como el campus.", en: "A magazine that felt like the campus." },
      text: {
        es: "La Colmena es la revista del INTEC y sale cada trimestre. Cuando me la pasaron en el número 43, llevaba años con la misma cara: una foto de estudio, los titulares chiquitos en una esquina y, por dentro, columnas apretadas con fotos en rectángulo. Yo quería que se sintiera como el campus, con gente real contando lo que hace, y que cada número tuviera su personalidad sin dejar de ser La Colmena.",
        en: "La Colmena is INTEC's university magazine, out every quarter. When it landed on my desk at issue 43, it had worn the same face for years: a studio photo, tiny headlines tucked in a corner and, inside, tight columns with boxed photos. I wanted it to feel like the campus, real people talking about what they do, and I wanted every issue to have its own personality while still being La Colmena.",
      },
      blocks: [
        {
          // The covers before the redesign only exist at 453 × 604 (Issuu's
          // viewer), so they go in a wall, which never enlarges a piece.
          kind: "wall",
          columns: { desktop: 3, phone: 3 },
          items: [40, 41, 42].map((n) => ({
            src: `${COLP}/colmena-antes-${n}.webp`,
            title: colIssue(n),
            detail: { es: "Antes del rediseño", en: "Before the redesign" },
          })),
        },
        {
          kind: "stats",
          items: [
            { value: "5", label: { es: "números, del 43 al 47", en: "issues, 43 to 47" } },
            { value: "28", label: { es: "páginas en cada número", en: "pages in every issue" } },
            { value: "8", label: { es: "versiones del interior de la 47 antes de imprenta", en: "versions of issue 47's inside pages before print" } },
          ],
        },
        {
          kind: "image",
          size: "bleed",
          image: { src: `${COL}/colmena-fotos-1.webp`, title: colIssue(43), detail: { es: "Recién salida de imprenta", en: "Fresh off the press" } },
        },
      ],
    },
    {
      id: "portadas",
      label: { es: "Las portadas", en: "The covers" },
      heading: { es: "Cada portada se arma alrededor de una persona.", en: "Every cover is built around one person." },
      text: {
        es: "El logo del hexágono funcionaba y se quedó. Todo lo demás lo volví a pensar. La portada ahora se arma alrededor de una persona: su nombre va enorme detrás, o escrito a mano, y unas flechas te llevan a las páginas donde está su historia. Con eso la revista dejó de verse como un boletín y empezó a verse como algo que uno quiere agarrar de la mesa.",
        en: "The hexagon logo worked, so it stayed. Everything else I rethought. The cover is now built around one person: their name runs huge behind them, or written by hand, and a few arrows point you to the pages where their story is. That alone took the magazine from newsletter to something you actually want to pick up off the table.",
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "Portadas", en: "Covers" },
          items: [
            { src: `${COLP}/colmena-portada-43.webp`, title: colIssue(43), detail: { es: "Gladeline Rapozo", en: "Gladeline Rapozo" } },
            { src: `${COLP}/colmena-portada-44.webp`, title: colIssue(44), detail: { es: "Maestros de la medicina", en: "Maestros de la medicina" } },
            { src: `${COLP}/colmena-portada-45.webp`, title: colIssue(45), detail: { es: "Arturo del Villar", en: "Arturo del Villar" } },
            { src: `${COLP}/colmena-portada-46.webp`, title: colIssue(46), detail: { es: "Francina Hungría", en: "Francina Hungría" } },
            { src: `${COLP}/colmena-portada-47.webp`, title: colIssue(47), detail: { es: "Ana Veras", en: "Ana Veras" } },
          ],
        },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          items: [
            { src: `${COL}/colmena-serie-mockup.webp`, title: { es: "No. 44, 45 y 46", en: "No. 44, 45 and 46" }, detail: { es: "La serie, lado a lado", en: "The series, side by side" } },
            { src: `${COL}/colmena-pared-mockup.webp`, title: colIssue(47), detail: { es: "El lettering a mano en portada", en: "Hand lettering on the cover" } },
          ],
        },
      ],
    },
    {
      id: "por-dentro",
      label: { es: "Por dentro", en: "Inside" },
      heading: { es: "Lo que promete la portada sigue adentro.", en: "What the cover promises carries on inside." },
      text: {
        es: "La historia de portada repite adentro el mismo juego: el nombre gigante de Gladeline, «Maestros» cortado por tres retratos, Arturo del Villar escrito a mano, Francina Hungría en línea detrás de ella.",
        en: "The cover story plays the same game inside: Gladeline's name set huge, “Maestros” cut by three portraits, Arturo del Villar written by hand, Francina Hungría in outline behind her.",
      },
      blocks: [
        {
          kind: "pairs",
          static: true,
          width: "wide",
          label: { es: "Números", en: "Issues" },
          items: [
            { n: 43, pag: "8–9" },
            { n: 44, pag: "14–15" },
            { n: 45, pag: "14–15" },
            { n: 46, pag: "4–5" },
          ].map(({ n, pag }) => ({
            title: colIssue(n),
            a: { src: `${COLP}/colmena-portada-${n}.webp`, detail: colCover },
            b: { src: `${COLP}/colmena-pliego-${n}.webp`, detail: colPages(pag) },
          })),
        },
        {
          kind: "image",
          size: "bleed",
          image: { src: `${COL}/colmena-fotos-2.webp`, title: colIssue(43), detail: { es: "Lettering, íconos y garabatos, en papel", en: "Lettering, icons and doodles, in print" } },
        },
      ],
    },
    {
      id: "sistema",
      label: { es: "El sistema", en: "The system" },
      heading: { es: "Un sistema con espacio para jugar.", en: "A system with room to play." },
      text: {
        es: "Por dentro armé un sistema con espacio para jugar. Todo el texto va en Akzidenz Grotesk, cada sección tiene su color y los garabatos e íconos se dibujan con el mismo trazo redondo, así que hasta una página de datos tiene algo de mano. El hexágono del logo también se volvió recurso: un panal para ordenar fotos, cifras o bases de datos. La 43 abrió con una paleta amplia; desde la 44, cada número se apoya en los rojos y naranjas de INTEC.",
        en: "Inside, I built a system with room to play. All the text is set in Akzidenz Grotesk, each section has its own colour, and the doodles and icons share the same round stroke, so even a page full of data feels hand-made. The hexagon from the logo turned into a tool too: a honeycomb to hold photos, numbers or databases. Issue 43 opened with a wide palette; from 44 on, every issue leans on INTEC's reds and oranges.",
      },
      blocks: [
        {
          kind: "image",
          size: "wide",
          image: { src: `${COLP}/colmena-pliego-47-sistema.webp`, title: colIssue(47), detail: { es: "Págs. 2–3: el panal, los íconos y los garabatos", en: "Pages 2–3: the honeycomb, the icons and the doodles" } },
        },
        {
          kind: "image",
          size: "solo",
          image: { src: `${COLP}/colmena-sistema-tipografia.webp`, title: { es: "Tipografía", en: "Typeface" }, detail: { es: "Todo el texto de la revista, de los titulares a las notas al pie", en: "Every word in the magazine, from headlines to footnotes" } },
        },
        {
          // The fills with the most area in issues 44 to 46 (read from the final PDFs).
          kind: "palette",
          colors: [
            { name: { es: "Rojo", en: "Red" }, hex: "#CF2E19", codes: ["RGB 207 46 25"] },
            { name: { es: "Rojo oscuro", en: "Dark red" }, hex: "#AC1209", codes: ["RGB 172 18 9"] },
            { name: { es: "Naranja", en: "Orange" }, hex: "#FA7622", codes: ["RGB 250 118 34"] },
            { name: { es: "Amarillo", en: "Yellow" }, hex: "#F9D138", codes: ["RGB 249 209 56"] },
          ],
        },
      ],
    },
    {
      id: "una-portada",
      label: { es: "Una portada", en: "One cover" },
      heading: { es: "De «Preguntar» a «Cuestionar».", en: "From “Preguntar” to “Cuestionar”." },
      text: {
        es: "Cada número arranca con un moodboard y las fotos que manda INTEC. Para la 47 llevé tres caminos con las fotos de Ana Veras, en blanco y negro, a color y a página completa, y escogieron el primero. El lettering pasó de «Preguntar» a «Cuestionar» para abrir el lema del número.",
        en: "Every issue starts with a moodboard and the photos INTEC sends over. For 47 I brought three directions with Ana Veras's photos, black and white, full colour and full bleed, and they picked the first. The lettering went from “Preguntar” to “Cuestionar” to open the issue's motto.",
      },
      blocks: [
        {
          // Same art, same frame (the top band of the cover, rendered from
          // Molly's .ai files at 2700 × 1350): only the word changes.
          kind: "compare",
          width: "wide",
          before: { src: `${COLP}/colmena-compara-preguntar.webp`, title: { es: "Propuesta", en: "Proposal" }, detail: { es: "«Preguntar, investigar, transformar»", en: "“Preguntar, investigar, transformar”" } },
          after: { src: `${COLP}/colmena-compara-cuestionar.webp`, title: { es: "Final", en: "Final" }, detail: { es: "«Cuestionar, investigar, transformar»", en: "“Cuestionar, investigar, transformar”" } },
          hint: { es: "Arrastra la línea o usa las flechas.", en: "Drag the line or use the arrows." },
        },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 3, phone: 1 },
          items: [
            { src: `${COLP}/colmena-propuesta-1.webp`, title: { es: "Propuesta 1", en: "Proposal 1" }, detail: { es: "En blanco y negro. La escogida", en: "Black and white. The one they picked" } },
            { src: `${COLP}/colmena-propuesta-2.webp`, title: { es: "Propuesta 2", en: "Proposal 2" }, detail: { es: "A color", en: "Full colour" } },
            { src: `${COLP}/colmena-propuesta-3.webp`, title: { es: "Propuesta 3", en: "Proposal 3" }, detail: { es: "A página completa", en: "Full bleed" } },
          ],
        },
      ],
    },
  ],
  closing: {
    image: { src: `${COL}/colmena-lino-mockup.webp`, title: colIssue(47), detail: colPages("4–5") },
  },
};

const laColmenaProject: Project = {
  slug: "la-colmena",
  title: "La Colmena",
  client: "INTEC",
  year: "2025 - 2026",
  role: "Diseño editorial y dirección de arte",
  roleEn: "Editorial design and art direction",
  scope: ["Rediseño editorial", "Portadas", "Diagramación", "Lettering e ilustración", "Sistema gráfico"],
  scopeEn: ["Editorial redesign", "Covers", "Layout", "Lettering and illustration", "Graphic system"],
  gridLabel: "Editorial · Rediseño",
  gridLabelEn: "Editorial · Redesign",
  brief: "La Colmena es la revista del INTEC y sale cada trimestre. Cuando me la pasaron en el número 43, llevaba años con la misma cara: una foto de estudio, los titulares chiquitos en una esquina y, por dentro, columnas apretadas con fotos en rectángulo. Yo quería que se sintiera como el campus, con gente real contando lo que hace, y que cada número tuviera su personalidad sin dejar de ser La Colmena.",
  briefEn: "La Colmena is INTEC's university magazine, out every quarter. When it landed on my desk at issue 43, it had worn the same face for years: a studio photo, tiny headlines tucked in a corner and, inside, tight columns with boxed photos. I wanted it to feel like the campus, real people talking about what they do, and I wanted every issue to have its own personality while still being La Colmena.",
  shipped: [
    "El rediseño desde el número 43: portada, maqueta interior y sistema gráfico.",
    "Cinco números de 28 páginas, del 43 al 47, cada uno con su portada y su interior.",
    "Lettering, flechas, garabatos e íconos dibujados para cada número.",
    "Los archivos finales para imprenta y la versión digital de cada número.",
  ],
  shippedEn: [
    "The redesign from issue 43 on: cover, inside layout and graphic system.",
    "Five 28-page issues, 43 to 47, each with its own cover and inside pages.",
    "Lettering, arrows, doodles and icons drawn for every issue.",
    "Print-ready files and a digital edition for every issue.",
  ],
  outcome: [
    "Los números 43 al 46 ya circulan en papel y en Issuu, y la 47 se entregó en noviembre de 2026.",
  ],
  outcomeEn: [
    "Issues 43 to 46 are out in print and on Issuu, and 47 was delivered in November 2026.",
  ],
  credits: [
    "Diseño, diagramación y lettering: Molly Yllom",
    "Dirección de la revista: Carmen Matos (INTEC)",
    "Edición: Cynthia Abreu (INTEC)",
    "Fotografía de la revista: INTEC",
  ],
  creditsEn: [
    "Design, layout and lettering: Molly Yllom",
    "Magazine director: Carmen Matos (INTEC)",
    "Editor: Cynthia Abreu (INTEC)",
    "Magazine photography: INTEC",
  ],
  portfolioImage: "/img/projects/la-colmena/colmena-cortes.mp4",
  heroImage: "/img/projects/la-colmena/colmena-x-MY-01.webp",
  heroSwipe: 5,
  story: laColmenaStory,
  paragraphs: [
    "El logo del hexágono funcionaba y se quedó. Todo lo demás lo volví a pensar. La portada ahora se arma alrededor de una persona: su nombre va enorme detrás, o escrito a mano, y unas flechas te llevan a las páginas donde está su historia. Con eso la revista dejó de verse como un boletín y empezó a verse como algo que uno quiere agarrar de la mesa.",
    "Por dentro armé un sistema con espacio para jugar. Todo el texto va en Akzidenz Grotesk, cada sección tiene su color y los garabatos e íconos se dibujan con el mismo trazo redondo, así que hasta una página de datos tiene algo de mano. El hexágono del logo también se volvió recurso: un panal para ordenar fotos, cifras o bases de datos.",
    "Cada número arranca con un moodboard y las fotos que manda INTEC. Para la 47 llevé tres caminos con las fotos de Ana Veras, en blanco y negro, a color y a página completa, y escogieron el primero. El lettering pasó de «Preguntar» a «Cuestionar» para abrir el lema del número.",
    "Del 43 al 47 van cinco números de 28 páginas. El sistema aguanta temas muy distintos, de medicina a inteligencia artificial, y cada número se reconoce de lejos. Cada uno pasa por varias rondas con las editoras hasta que todo cuadra, y la 47 llegó a ocho versiones del interior antes de irse a imprenta.",
  ],
  paragraphsEn: [
    "The hexagon logo worked, so it stayed. Everything else I rethought. The cover is now built around one person: their name runs huge behind them, or written by hand, and a few arrows point you to the pages where their story is. That alone took the magazine from newsletter to something you actually want to pick up off the table.",
    "Inside, I built a system with room to play. All the text is set in Akzidenz Grotesk, each section has its own colour, and the doodles and icons share the same round stroke, so even a page full of data feels hand-made. The hexagon from the logo turned into a tool too: a honeycomb to hold photos, numbers or databases.",
    "Every issue starts with a moodboard and the photos INTEC sends over. For 47 I brought three directions with Ana Veras's photos, black and white, full colour and full bleed, and they picked the first. The lettering went from “Preguntar” to “Cuestionar” to open the issue's motto.",
    "From 43 to 47 that's five 28-page issues. The system holds up across very different topics, from medicine to artificial intelligence, and you can still spot each issue from across the room. Every one goes through a few rounds with the editors until it all fits, and 47 went through eight versions of the inside pages before it went to print.",
  ],
  images: [
    "/img/projects/la-colmena/colmena-01-antes.webp",
    "/img/projects/la-colmena/colmena-fotos-1.webp",
    "/img/projects/la-colmena/colmena-02-numero-43.webp",
    "/img/projects/la-colmena/colmena-03-sistema.webp",
    "/img/projects/la-colmena/colmena-fotos-2.webp",
    "/img/projects/la-colmena/colmena-04-numero-44.webp",
    "/img/projects/la-colmena/colmena-serie-mockup.webp",
    "/img/projects/la-colmena/colmena-04-numero-45.webp",
    "/img/projects/la-colmena/colmena-04-numero-46.webp",
    "/img/projects/la-colmena/colmena-pared-mockup.webp",
    "/img/projects/la-colmena/colmena-05-portada.webp",
    "/img/projects/la-colmena/colmena-lino-mockup.webp",
  ],
  imagesEn: [
    "/img/projects/la-colmena/colmena-01-antes-en.webp",
    "/img/projects/la-colmena/colmena-fotos-1.webp",
    "/img/projects/la-colmena/colmena-02-numero-43-en.webp",
    "/img/projects/la-colmena/colmena-03-sistema-en.webp",
    "/img/projects/la-colmena/colmena-fotos-2.webp",
    "/img/projects/la-colmena/colmena-04-numero-44-en.webp",
    "/img/projects/la-colmena/colmena-serie-mockup.webp",
    "/img/projects/la-colmena/colmena-04-numero-45-en.webp",
    "/img/projects/la-colmena/colmena-04-numero-46-en.webp",
    "/img/projects/la-colmena/colmena-pared-mockup.webp",
    "/img/projects/la-colmena/colmena-05-portada-en.webp",
    "/img/projects/la-colmena/colmena-lino-mockup.webp",
  ],
};

const ciudadFielProject: Project = {
  slug: "ciudad-fiel",
  title: "Ciudad Fiel",
  client: "Pedro Kelly, productor musical y compositor",
  clientEn: "Pedro Kelly, music producer and composer",
  year: "2021",
  role: "Identidad de marca. Proyecto en solitario",
  roleEn: "Brand identity. Solo project",
  scope: ["Identidad", "Isotipo y logotipo", "Sistema de color", "Aplicaciones y merch"],
  scopeEn: ["Identity", "Symbol and wordmark", "Color system", "Applications and merch"],
  brief: "Pedro Kelly pidió un logo para Ciudad Fiel. El problema real era que una sola marca tenía que sostener dos cosas distintas, un sello discográfico y una escuela para productores que empiezan, y funcionar igual firmando un lanzamiento que colgada en la pared de un salón de clase.",
  briefEn: "Pedro Kelly asked for a logo for Ciudad Fiel. The real problem was that a single mark had to hold two different things, a record label and a school for producers who are just starting, and work equally well signing a release and hanging on a classroom wall.",
  shipped: [
    "Un isotipo que de cerca es una C y una F encajadas, y de lejos una tornamesa.",
    "El logotipo: CF en fino y MUSIC en negrita, la marca madre y la línea musical en un solo bloque.",
    "Dos colores: verde menta y rojo cálido.",
    "Merch bordado, troquelado y repujado en cuero.",
  ],
  shippedEn: [
    "A symbol that reads as C and F locked together up close, and as a turntable from across the room.",
    "The wordmark: CF in light and MUSIC in bold, parent brand and music line in one block.",
    "Two colors: mint green and warm red.",
    "Merch, embroidered, die cut and embossed in leather.",
  ],
  outcome: ["La marca ya está en uso, y un solo isotipo cubre el sello y la escuela."],
  credits: ["Identidad de marca: Molly Yllom"],
  creditsEn: ["Brand identity: Molly Yllom"],
  outcomeEn: ["The brand is in use, and one symbol covers both the label and the school."],
  portfolioImage: "/img/projects/ciudad-fiel/9.mp4",
  heroImage: "/img/projects/ciudad-fiel/2.webp",
  paragraphs: [
    "Ciudad Fiel es una iniciativa musical con dos caras: sello discográfico y escuela para productores que están empezando. La identidad tenía que funcionar igual firmando un lanzamiento que colgada en la pared de un salón de clase.",
    "El isotipo es un solo gesto haciendo tres trabajos a la vez. De cerca es una C y una F encajadas, y de lejos es un tornamesa con el brazo apoyado sobre el disco. Un círculo lleno, un corte limpio, nada más. Esa economía es lo que le permite bordarse en una gorra, troquelarse en un pin o repujarse en cuero sin perder nada.",
    "El sistema se apoya en verde menta y rojo cálido, dos colores que se pelean lo suficiente para leerse desde lejos y se llevan bien en piezas pequeñas. El logotipo separa CF en fino y MUSIC en negrita, para que la marca madre y la línea musical convivan en el mismo bloque. En la merch el isotipo se repite girado en distintas posiciones, como un disco que nunca deja de dar vueltas.",
  ],
  paragraphsEn: [
    "Ciudad Fiel is a music initiative with two sides: a record label and a school for producers who are just starting out. The identity had to work equally well signing a release and hanging on a classroom wall.",
    "The symbol is a single move doing three jobs at once. Up close it is a C and an F locked together, and from across the room it is a turntable with the arm resting on the record. One filled circle, one clean cut, nothing else. That economy is what lets it be embroidered on a cap, die cut into a pin or embossed into leather without losing anything.",
    "The system runs on mint green and warm red, two colors that fight just enough to read from a distance and get along in small pieces. The wordmark splits CF in light and MUSIC in bold so the parent brand and the music line share one block. On merch the symbol repeats at different rotations, like a record that never stops spinning.",
  ],
  images: [
    "/img/projects/ciudad-fiel/1.webp",
    "/img/projects/ciudad-fiel/3.webp",
    "/img/projects/ciudad-fiel/4.webp",
    "/img/projects/ciudad-fiel/5.webp",
    "/img/projects/ciudad-fiel/6.webp",
    "/img/projects/ciudad-fiel/7.webp",
    "/img/projects/ciudad-fiel/8.webp",
    "/img/projects/ciudad-fiel/9.mp4",
    "/img/projects/ciudad-fiel/10.webp",
    "/img/projects/ciudad-fiel/11.webp",
    "/img/projects/ciudad-fiel/12.webp",
    "/img/projects/ciudad-fiel/13.webp",
  ],
};

const BTS = "/img/projects/burn-that-sht";
const BTSP = `${BTS}/piezas`;
const btsScene = (es: string, en: string, src: string): StoryImage => ({
  src,
  title: { es, en },
  detail: { es: "Escena de la campaña, 4:5", en: "Campaign scene, 4:5" },
});
const btsSystem = (src: string, es: string, en: string): StoryImage => ({ src: `${BTSP}/sistema-${src}.webp`, title: { es, en } });

/**
 * Burn That Sh*t told in chapters (F3, 27 Nov 2026). The approved paragraphs
 * are reused word for word, split where a chapter needs only part of them.
 * BORRADOR para Molly: the promise, chapter labels and headings, captions.
 * Lunge uses the copy with the screen refitted (27 Nov), never the original.
 * Figures: 6 scenes × 3 formats = 18 pieces, counted in assets/kv.
 */
const burnThatShtStory: CaseStory = {
  cover: {
    variant: "top",
    media: `${BTSP}/portada-crouch-16x9.webp`,
    promise: {
      es: "El relanzamiento de Burn & Claim: irreverente como siempre, y más grande que nunca.",
      en: "Burn & Claim's relaunch: as cheeky as ever, and bigger than it's ever looked.",
    },
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      heading: { es: "La misma herramienta, con otra cara.", en: "Same tool, new face." },
      text: {
        es: "Burn & Claim estrenaba su app nueva y su look nuevo en noviembre de 2026, y había que contarlo en X sin que pareciera otro producto. Era la misma herramienta para limpiar la wallet y recuperar SOL, solo que más rápida y mucho más linda. La campaña tenía que sonar como siempre ha sonado Burn & Claim, irreverente y directa, y verse más grande que nunca. Y la hice yo sola, con herramientas de IA, así que también tocaba demostrar que una campaña con fotos generadas puede verse de verdad.",
        en: "Burn & Claim was launching its new app and its new look in November 2026, and it had to land on X without looking like a different product. Same tool for cleaning your wallet and getting your SOL back, just faster and a lot better looking. The campaign had to sound the way Burn & Claim always has, cheeky and straight to the point, and look bigger than it ever had. I made it on my own with AI tools, so it also had to prove that a campaign built on generated photos can look real.",
      },
      blocks: [
        {
          kind: "stats",
          items: [
            { value: "6", label: { es: "escenas", en: "scenes" } },
            { value: "3", label: { es: "formatos por escena", en: "formats per scene" } },
            { value: "18", label: { es: "piezas", en: "pieces" } },
          ],
        },
        { kind: "image", size: "bleed", image: { src: `${BTS}/bts-laptop-mockup.webp`, title: { es: "burnandclaim.com", en: "burnandclaim.com" }, detail: { es: "La web nueva, en una escena hecha para la campaña", en: "The new site, in a scene made for the campaign" } } },
      ],
    },
    {
      id: "escenas",
      label: { es: "Las escenas", en: "The scenes" },
      heading: { es: "La app, siempre en la mano de alguien.", en: "The app, always in someone's hand." },
      text: {
        es: "La app nueva era lo que vendíamos, así que tenía que salir en todas las piezas. Las armé alrededor de un Seeker en la mano de alguien: uno agachado que te lo pone en la cara, otra que se tira hacia ti, una mano con un anillo dorado que lo levanta como si fuera un trofeo. Siempre con la pantalla real de la app, justificada arriba para que el logo se vea completo, y montos de ejemplo marcados como ejemplo.",
        en: "The new app was the thing we were selling, so it had to be in every single piece. I built them around a Seeker in someone's hand: a guy crouching and pushing it right at you, a woman lunging toward the camera, a hand with a chunky gold ring holding it up like a trophy. Always with the real app screen, top-aligned so the logo shows in full, and example amounts marked as examples.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 3, phone: 2 },
          items: [
            btsScene("Crouch", "Crouch", `${BTSP}/escena-crouch-4x5.webp`),
            btsScene("Lunge", "Lunge", `${BTSP}/escena-lunge-4x5.webp`),
            btsScene("Ring", "Ring", `${BTSP}/escena-ring-4x5.webp`),
            btsScene("Hands", "Hands", `${BTSP}/escena-hands-4x5.webp`),
            btsScene("Seated", "Seated", `${BTSP}/escena-seated-4x5.webp`),
            btsScene("Phone", "Phone", `${BTSP}/escena-phone-4x5.webp`),
          ],
        },
        { kind: "image", size: "wide", image: { src: `${BTS}/bts-celular-mockup.webp`, title: { es: "burnandclaim.com en el celular", en: "burnandclaim.com on a phone" }, detail: { es: "La sección «What you get», en vivo", en: "The “What you get” section, live" } } },
      ],
    },
    {
      id: "tomas",
      label: { es: "Escoger, no reparar", en: "Pick, don't fix" },
      heading: { es: "Una foto generada no se arregla. Se escoge.", en: "You don't fix a generated photo. You pick one." },
      text: {
        // BORRADOR (QA 28 nov): el párrafo aprobado sin el bloque gris ni las fotos de referencia, menos literal.
        es: "Las fotos las hice con IA, y la primera lección fue que una foto generada no se arregla, se escoge. Pasé varias rondas retocando la misma toma, un dedo por aquí, una uña por allá, y cada arreglo rompía otra cosa. Así que cambié el método: pedía tandas de tomas con el Seeker ya en la mano, y de cada tanda me quedaba con una y no la volvía a pedir.",
        en: "I made the photos with AI, and the first lesson was that you don't fix a generated photo, you pick one. I spent several rounds retouching the same shot, a finger here, a nail there, and every fix broke something else. So I changed the method: I asked for batches of takes with the Seeker already in hand, kept one from each batch and stopped there.",
      },
      blocks: [
        {
          kind: "pairs",
          static: true,
          width: "wide",
          label: { es: "Lunge, antes y después", en: "Lunge, before and after" },
          items: [
            {
              title: { es: "Lunge", en: "Lunge" },
              a: { src: `${BTSP}/lunge-antes-4x5.webp`, title: { es: "Antes", en: "Before" }, detail: { es: "La misma toma, retocada ronda tras ronda", en: "The same shot, retouched round after round" } },
              b: { src: `${BTSP}/escena-lunge-4x5.webp`, title: { es: "Después", en: "After" }, detail: { es: "Una toma escogida de una tanda", en: "One take picked from a batch" } },
            },
          ],
        },
      ],
    },
    {
      id: "capas",
      label: { es: "Lo que vende es real", en: "What sells is real" },
      heading: { es: "La foto se genera. La app, no.", en: "The photo is generated. The app isn't." },
      text: {
        es: "Después, una sola pasada de realismo: probé una versión más creativa que se veía más pulida, pero me cambiaba la uña, el marco y la zapatilla, y me quedé con la fiel. Lo que vende nunca lo generó la IA: la pantalla es la app real, puesta en perspectiva, y el logo, los titulares y el sello van encima, en capas que se actualizan solas cuando cambia la app.",
        en: "Then a single realism pass: I tried a more creative version that looked more polished, but it changed the nail, the frame and the sneaker, so I kept the faithful one. The part that sells was never generated: the screen is the real app, set in perspective, and the logo, the headlines and the stamp sit on top, in layers that update on their own when the app changes.",
      },
      blocks: [
        {
          kind: "wall",
          columns: { desktop: 3, phone: 3 },
          items: [
            { src: `${BTSP}/realismo-cara-toma.webp`, title: { es: "La toma", en: "The take" }, detail: { es: "Tal cual", en: "As is" } },
            { src: `${BTSP}/realismo-cara-fiel.webp`, title: { es: "La pasada fiel", en: "The faithful pass" }, detail: { es: "Se queda", en: "Kept" } },
            { src: `${BTSP}/realismo-cara-creativa.webp`, title: { es: "La creativa", en: "The creative one" }, detail: { es: "Descartada", en: "Dropped" } },
            { src: `${BTSP}/realismo-zapatilla-toma.webp`, title: { es: "La toma", en: "The take" }, detail: { es: "Tal cual", en: "As is" } },
            { src: `${BTSP}/realismo-zapatilla-fiel.webp`, title: { es: "La pasada fiel", en: "The faithful pass" }, detail: { es: "Se queda", en: "Kept" } },
            { src: `${BTSP}/realismo-zapatilla-creativa.webp`, title: { es: "La creativa", en: "The creative one" }, detail: { es: "Cambia la zapatilla", en: "Changes the sneaker" } },
          ],
        },
        { kind: "image", size: "bleed", image: { src: `${BTS}/bts-seeker-mockup.webp`, title: { es: "La app v3 en un Seeker", en: "The v3 app on a Seeker" }, detail: { es: "La primera pantalla del onboarding, en vivo", en: "The first onboarding screen, live" } } },
      ],
    },
    {
      id: "sistema",
      label: { es: "El sistema", en: "The system" },
      heading: { es: "Titular grande, y la app siempre gana.", en: "Big headline, and the app always wins." },
      text: {
        es: "Después vino el orden. Titular grande en Rubik, blanco y rojo sobre casi negro, porque Burn & Claim siempre ha sido eso. El sello y los tags se fueron al cierre, al lado del CTA y lejos del teléfono, porque al principio competían con la app y la app gana.",
        en: "Then came the order. Big headlines in Rubik, white and red on almost black, because that's what Burn & Claim has always been. The stamp and the tags moved down to the closing, next to the CTA and away from the phone, because at first they were fighting with the app, and the app wins.",
      },
      blocks: [
        { kind: "image", size: "wide", image: { src: `${BTSP}/ring-16x9.webp`, title: { es: "Ring", en: "Ring" }, detail: { es: "Escena de la campaña, 16:9", en: "Campaign scene, 16:9" } } },
        {
          kind: "palette",
          colors: [
            { name: { es: "Casi negro", en: "Almost black" }, hex: "#0A0412" },
            { name: { es: "Rojo", en: "Red" }, hex: "#F23A30" },
            { name: { es: "Blanco", en: "White" }, hex: "#FFFFFF" },
          ],
        },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 3, phone: 2 },
          ratio: "1/1",
          items: [
            btsSystem("sello-rojo-456", "Sello rojo", "Red stamp"),
            btsSystem("sello-hands", "Sello blanco", "White stamp"),
            btsSystem("sello-ring", "Sello con la llama", "Stamp with the flame"),
            btsSystem("tag-clean-it", "Tag «Clean it. Claim it.»", "“Clean it. Claim it.” tag"),
            btsSystem("tag-way-faster", "Tag «Way faster.»", "“Way faster.” tag"),
            btsSystem("cta", "Cierre con el CTA", "Closing CTA"),
          ],
        },
      ],
    },
    {
      id: "expectativa",
      label: { es: "La expectativa", en: "The teasers" },
      heading: { es: "Dos posts chiquitos antes del día.", en: "Two tiny posts before the day." },
      text: {
        es: "Antes del día del lanzamiento salieron dos posts chiquitos: la llama apagada, «Something's coming», y al otro día la llama prendida, «Same burn. New look.». Ese era todo el mensaje.",
        en: "Before launch day we put out two tiny posts: the flame unlit, “Something's coming”, and the next day the flame lit, “Same burn. New look.”. That was the whole message.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          items: [
            { src: `${BTSP}/expectativa-1.webp`, title: { es: "Something's coming", en: "Something's coming" }, detail: { es: "24 de noviembre", en: "24 November" } },
            { src: `${BTSP}/expectativa-2.webp`, title: { es: "Same burn. New look.", en: "Same burn. New look." }, detail: { es: "25 de noviembre", en: "25 November" } },
          ],
        },
      ],
    },
  ],
  closing: {
    image: { src: `${BTS}/bts-sticker-mockup.webp`, title: { es: "El sello, de calcomanía", en: "The stamp, as a sticker" }, detail: { es: "Montaje", en: "Mockup" } },
    more: [`${BTSP}/cuadrado-seated-1x1.webp`, `${BTSP}/cuadrado-hands-1x1.webp`, `${BTSP}/cuadrado-phone-1x1.webp`],
  },
};

const burnThatShtProject: Project = {
  slug: "burn-that-sht",
  story: burnThatShtStory,
  title: "Burn That Sh*t",
  client: "Burn & Claim, de Aerosol",
  clientEn: "Burn & Claim, by Aerosol",
  year: "2026",
  role: "Dirección, diseño y campaña, con herramientas de IA",
  roleEn: "Direction, design and campaign, with AI tools",
  scope: ["Concepto visual", "Sistema de campaña", "Dirección de imagen con IA", "Piezas para X e Instagram", "Teasers", "Plantillas editables"],
  scopeEn: ["Visual concept", "Campaign system", "AI image direction", "X and Instagram assets", "Teasers", "Editable templates"],
  gridLabel: "Campaña · Sistema visual",
  gridLabelEn: "Campaign · Visual system",
  brief: "Burn & Claim estrenaba su app nueva y su look nuevo en noviembre de 2026, y había que contarlo en X sin que pareciera otro producto. Era la misma herramienta para limpiar la wallet y recuperar SOL, solo que más rápida y mucho más linda. La campaña tenía que sonar como siempre ha sonado Burn & Claim, irreverente y directa, y verse más grande que nunca. Y la hice yo sola, con herramientas de IA, así que también tocaba demostrar que una campaña con fotos generadas puede verse de verdad.",
  briefEn: "Burn & Claim was launching its new app and its new look in November 2026, and it had to land on X without looking like a different product. Same tool for cleaning your wallet and getting your SOL back, just faster and a lot better looking. The campaign had to sound the way Burn & Claim always has, cheeky and straight to the point, and look bigger than it ever had. I made it on my own with AI tools, so it also had to prove that a campaign built on generated photos can look real.",
  shipped: [
    "El concepto, con la línea de siempre al frente: «Burn that sh*t!».",
    "Seis escenas con la app real en un Seeker, en tres formatos (18 piezas). Fotos generadas con IA y dirigidas por mí.",
    "El sistema: titulares en Rubik 820, negro, rojo y blanco, sellos, tags y un cierre fijo con el CTA.",
    "Dos posts de expectativa (la llama apagada y, al día siguiente, encendida) y todo en PSD editable.",
  ],
  shippedEn: [
    "The concept, with the line Burn & Claim has always had up front: “Burn that sh*t!”.",
    "Six scenes with the real app on a Seeker, in three formats (18 pieces). AI-generated photos, directed by me.",
    "The system: headlines in Rubik 820, black, red and white, stamps, tags and a fixed closing with the CTA.",
    "Two teaser posts (the flame unlit, then lit the next day) and every piece as an editable PSD.",
  ],
  outcome: ["Los teasers salieron en @burnandclaim el 24 y el 25 de noviembre de 2026."],
  outcomeEn: ["The teasers went out on @burnandclaim on 24 and 25 November 2026."],
  credits: [
    "Dirección, diseño y campaña: Molly Yllom, con herramientas de IA bajo su dirección",
  ],
  creditsEn: [
    "Direction, design and campaign: Molly Yllom, with AI tools under her direction",
  ],
  portfolioImage: "/img/projects/burn-that-sht/bts-cortes.mp4",
  heroImage: "/img/projects/burn-that-sht/bts-x-MY-01.webp",
  paragraphs: [
    "La app nueva era lo que vendíamos, así que tenía que salir en todas las piezas. Las armé alrededor de un Seeker en la mano de alguien: uno agachado que te lo pone en la cara, otra que se tira hacia ti, una mano con un anillo dorado que lo levanta como si fuera un trofeo. Siempre con la pantalla real de la app, justificada arriba para que el logo se vea completo, y montos de ejemplo marcados como ejemplo.",
    "Las fotos las hice con IA, y la primera lección fue que una foto generada no se arregla, se escoge. Pasé varias rondas retocando la misma toma, un dedo por aquí, una uña por allá, y cada arreglo rompía otra cosa. Así que cambié el método. Armé cada escena con un bloque gris donde iba el teléfono y pedí tandas de tomas con el Seeker ya en la mano, usando fotos reales de cómo se agarra un teléfono como referencia. De cada tanda me quedé con una y no la volví a pedir. Después, una sola pasada de realismo: probé una versión más creativa que se veía más pulida, pero me cambiaba la uña, el marco y la zapatilla, y me quedé con la fiel. Lo que vende nunca lo generó la IA: la pantalla es la app real, puesta en perspectiva, y el logo, los titulares y el sello van encima, en capas que se actualizan solas cuando cambia la app.",
    "Después vino el orden. Titular grande en Rubik, blanco y rojo sobre casi negro, porque Burn & Claim siempre ha sido eso. El sello y los tags se fueron al cierre, al lado del CTA y lejos del teléfono, porque al principio competían con la app y la app gana. Antes del día del lanzamiento salieron dos posts chiquitos: la llama apagada, «Something's coming», y al otro día la llama prendida, «Same burn. New look.». Ese era todo el mensaje.",
  ],
  paragraphsEn: [
    "The new app was the thing we were selling, so it had to be in every single piece. I built them around a Seeker in someone's hand: a guy crouching and pushing it right at you, a woman lunging toward the camera, a hand with a chunky gold ring holding it up like a trophy. Always with the real app screen, top-aligned so the logo shows in full, and example amounts marked as examples.",
    "I made the photos with AI, and the first lesson was that you don't fix a generated photo, you pick one. I spent several rounds retouching the same shot, a finger here, a nail there, and every fix broke something else. So I changed the method. I set up each scene with a grey block where the phone would go and asked for batches of takes with the Seeker already in hand, using real photos of how people hold a phone as reference. From each batch I kept one and stopped there. Then a single realism pass: I tried a more creative version that looked more polished, but it changed the nail, the frame and the sneaker, so I kept the faithful one. The part that sells was never generated: the screen is the real app, set in perspective, and the logo, the headlines and the stamp sit on top, in layers that update on their own when the app changes.",
    "Then came the order. Big headlines in Rubik, white and red on almost black, because that's what Burn & Claim has always been. The stamp and the tags moved down to the closing, next to the CTA and away from the phone, because at first they were fighting with the app, and the app wins. Before launch day we put out two tiny posts: the flame unlit, “Something's coming”, and the next day the flame lit, “Same burn. New look.”. That was the whole message.",
  ],
  images: [
    "/img/projects/burn-that-sht/bts-x-MY-02a.webp",
    "/img/projects/burn-that-sht/bts-celular-mockup.webp",
    "/img/projects/burn-that-sht/bts-x-MY-02b.webp",
    "/img/projects/burn-that-sht/bts-x-MY-03.webp",
    "/img/projects/burn-that-sht/bts-laptop-mockup.webp",
    "/img/projects/burn-that-sht/bts-proceso-tomas.webp",
    "/img/projects/burn-that-sht/bts-proceso-realismo.webp",
    "/img/projects/burn-that-sht/bts-sticker-mockup.webp",
    "/img/projects/burn-that-sht/bts-proceso-capas.webp",
    "/img/projects/burn-that-sht/bts-x-MY-04.webp",
    "/img/projects/burn-that-sht/bts-seeker-mockup.webp",
    "/img/projects/burn-that-sht/bts-x-MY-05.webp",
  ],
  imagesEn: [
    "/img/projects/burn-that-sht/bts-x-MY-02a.webp",
    "/img/projects/burn-that-sht/bts-celular-mockup.webp",
    "/img/projects/burn-that-sht/bts-x-MY-02b.webp",
    "/img/projects/burn-that-sht/bts-x-MY-03.webp",
    "/img/projects/burn-that-sht/bts-laptop-mockup.webp",
    "/img/projects/burn-that-sht/bts-proceso-tomas-en.webp",
    "/img/projects/burn-that-sht/bts-proceso-realismo-en.webp",
    "/img/projects/burn-that-sht/bts-sticker-mockup.webp",
    "/img/projects/burn-that-sht/bts-proceso-capas-en.webp",
    "/img/projects/burn-that-sht/bts-x-MY-04.webp",
    "/img/projects/burn-that-sht/bts-seeker-mockup.webp",
    "/img/projects/burn-that-sht/bts-x-MY-05-en.webp",
  ],
};

const burnClaimProject: Project = {
  slug: "burn-claim",
  title: "Burn & Claim",
  client: "Aerosol",
  year: "2024 - 2026",
  role: "Identidad de producto, personaje y diseño de la app",
  roleEn: "Product identity, character and app design",
  scope: ["Identidad de submarca", "Ilustración", "Personaje", "Arquitectura de información", "Diseño de interfaz", "Onboarding", "Ficha de tienda", "Handoff a desarrollo"],
  scopeEn: ["Sub-brand identity", "Illustration", "Character", "Information architecture", "Interface design", "Onboarding", "Store listing", "Developer handoff"],
  gridLabel: "Diseño de interfaz · Arquitectura de información",
  gridLabelEn: "Interface design · Information architecture",
  brief: "Burn & Claim recupera el rent de cuentas y NFTs que ya no se usan. Es una operación irreversible en cadena, así que la app tenía que verse confiable antes de que alguien conectara su wallet. El reto era doble: que se sintiera segura sin volverse solemne, y que se leyera como parte de Aerosol sin dejar de tener carácter propio.",
  briefEn: "Burn & Claim reclaims rent from unused accounts and NFTs. It is an irreversible on-chain action, so the app had to look trustworthy before anyone would connect a wallet. The challenge was double: feel safe without turning solemn, and read as part of Aerosol while keeping a character of its own.",
  shipped: [
    "La identidad de la submarca: la llama en forma de gota, el color y Flame Guy en once poses.",
    "El rediseño completo de la app, de la arquitectura de información al diseño final.",
    "La v3: una sola aprobación en Phantom, y lo que recuperas a la vista antes de firmar.",
    "El onboarding, la vista de wallet, el flujo de donación y la ficha en la Solana dApp Store.",
  ],
  shippedEn: [
    "The sub-brand identity: the drop-shaped flame, the color and Flame Guy in eleven poses.",
    "A full app redesign, from information architecture to final design.",
    "v3: one Phantom approval, and what you get back in plain sight before you sign.",
    "The onboarding, the wallet view, the donation flow and the Solana dApp Store listing.",
  ],
  outcome: ["Más de 30,500 wallets han usado Burn & Claim."],
  credits: [
    "Identidad de producto, personaje y diseño de la app: Molly Yllom",
    "Animación de personajes: Manuel Torres",
    "Animaciones de la app en dispositivos: Molly Yllom",
    "Desarrollo de la app: Kelvin y Molly Yllom",
  ],
  creditsEn: [
    "Product identity, character and app design: Molly Yllom",
    "Character animation: Manuel Torres",
    "App-in-device animations: Molly Yllom",
    "App development: Kelvin and Molly Yllom",
  ],
  outcomeEn: ["Over 30,500 wallets have used Burn & Claim."],
  portfolioImage: "/img/projects/burn-claim/16.mp4",
  heroImage: "/img/projects/burn-claim/1.webp",
  paragraphs: [
    "Burn & Claim es una app de Solana que convierte la basura de tu wallet en SOL de vuelta. Tokens muertos, NFTs olvidados y cuentas vacías que llevan años ocupando espacio se queman en un solo flujo, y el rent regresa a tu bolsillo.",
    "La marca parte de una llama con forma de gota, un guiño directo a quemar y a recuperar valor al mismo tiempo. De ahí salió un personaje con lentes de sol que le baja la solemnidad a algo que en el fondo es una operación irreversible en cadena. Rojo intenso sobre morado profundo, tipografía condensada y muy gruesa, y un sistema que se sostiene igual en el isotipo suelto, en el logo completo y en blanco y negro.",
    "El rediseño de la app llevó ese tono al producto, y la v3 lo terminó de aterrizar. Abres y ves de una vez cuánto SOL tienes por recuperar. Antes de firmar ves exactamente lo que vuelve, y una sola aprobación en Phantom cubre todo lo que escogiste. Flame Guy, el personaje, te acompaña en cada paso: se pone las gafas cuando hay algo que quemar y celebra cuando el SOL ya está de vuelta en tu wallet. La idea siempre fue que quemar se sintiera claro, controlado y hasta divertido. Para el relanzamiento, la app salió en las manos de la gente, en la campaña «Burn That Sh*t».",
  ],
  paragraphsEn: [
    "Burn & Claim is a Solana app that turns the junk in your wallet back into SOL. Dead tokens, forgotten NFTs and empty accounts that have been sitting there for years get burned in a single flow, and the rent goes back into your pocket.",
    "The brand starts from a flame shaped like a drop, a direct nod to burning and reclaiming value at the same time. That grew into a character in sunglasses that takes the solemnity out of what is, underneath, an irreversible on chain operation. Bold red over deep purple, heavy condensed type, and a system that holds up equally well as a lone symbol, as the full lockup, and in black and white.",
    "The app redesign carried that tone into the product, and v3 finally nailed it down. You open it and see right away how much SOL you can get back. Before you sign, you see exactly what comes back, and a single Phantom approval covers everything you picked. Flame Guy, the character, walks you through every step: he puts the shades on when there's something to burn and celebrates once the SOL is back in your wallet. The whole point was always for burning to feel clear, controlled and even fun. For the relaunch, the app went out in people's hands, in the “Burn That Sh*t” campaign.",
  ],
  images: [
    "/img/projects/burn-claim/2.webp",
    "/img/projects/burn-claim/4.webp",
    "/img/projects/burn-claim/bc-campana-crouch.webp",
    "/img/projects/burn-claim/5.webp",
    "/img/projects/burn-claim/bc-flame-guy.webp",
    "/img/projects/burn-claim/bc-campana-hands.webp",
    "/img/projects/burn-claim/bc-antes-despues.webp",
    "/img/projects/burn-claim/bc-v3.webp",
    "/img/projects/burn-claim/bc-trio-mockup.webp",
    "/img/projects/burn-claim/bc-campana-lunge.webp",
    "/img/projects/burn-claim/bc-campana-seated.webp",
    "/img/projects/burn-claim/bc-tienda.webp",
    "/img/projects/burn-claim/16.mp4",
  ],
  imagesEn: [
    "/img/projects/burn-claim/2.webp",
    "/img/projects/burn-claim/4.webp",
    "/img/projects/burn-claim/bc-campana-crouch.webp",
    "/img/projects/burn-claim/5.webp",
    "/img/projects/burn-claim/bc-flame-guy.webp",
    "/img/projects/burn-claim/bc-campana-hands.webp",
    "/img/projects/burn-claim/bc-antes-despues-en.webp",
    "/img/projects/burn-claim/bc-v3.webp",
    "/img/projects/burn-claim/bc-trio-mockup.webp",
    "/img/projects/burn-claim/bc-campana-lunge.webp",
    "/img/projects/burn-claim/bc-campana-seated.webp",
    "/img/projects/burn-claim/bc-tienda.webp",
    "/img/projects/burn-claim/16.mp4",
  ],
};

const aerosolProject: Project = {
  slug: "aerosol",
  title: "Aerosol · Identidad 2025",
  titleEn: "Aerosol · Identity 2025",
  client: "Aerosol",
  year: "2024 - 2025",
  role: "Consultora de marca y directora de arte, luego Head of Design",
  roleEn: "Brand consultant and art director, later Head of Design",
  scope: ["Estrategia de marca", "Identidad", "Arquitectura de submarcas", "Sistema de diseño", "Ilustración", "Web"],
  scopeEn: ["Brand strategy", "Identity", "Sub-brand architecture", "Design system", "Illustration", "Web"],
  gridLabel: "Sistema de diseño · Identidad",
  gridLabelEn: "Design system · Identity",
  brief: "Aerosol construye herramientas para el ecosistema Solana. El producto ya funcionaba y tenía usuarios reales, pero la marca lo hacía ver como un proyecto secundario, y los productos se iban acumulando sin un sistema que los relacionara entre sí.",
  briefEn: "Aerosol builds tools for the Solana ecosystem. The product already worked and had real users, but the brand made it look like a side project, and products were piling up with no system relating them to each other.",
  shipped: [
    "La identidad completa: logotipo, isotipo, personaje y color.",
    "La arquitectura de submarcas para Burn & Claim, Spotlight y Aerosol ID.",
    "Una biblioteca de assets, para que nadie tenga que esperar por diseño para encontrar lo que necesita.",
    "El sitio, las páginas de producto, escenas ilustradas, avatares y piezas de comunidad.",
  ],
  shippedEn: [
    "The full identity: wordmark, symbol, character and color.",
    "The sub-brand architecture for Burn & Claim, Spotlight and Aerosol ID.",
    "An asset library, so nobody has to wait on design to find what they need.",
    "The site, product pages, illustrated scenes, avatars and community pieces.",
  ],
  outcome: ["El rol creció con el trabajo: de consultora externa a Head of Design."],
  credits: [
    "Dirección de arte e identidad: Molly Yllom",
    "Animación de personajes: Manuel Torres",
    "Animaciones de producto e interfaz: Molly Yllom",
  ],
  creditsEn: [
    "Art direction and identity: Molly Yllom",
    "Character animation: Manuel Torres",
    "Product and interface animation: Molly Yllom",
  ],
  outcomeEn: ["The role grew with the work: from outside consultant to Head of Design."],
  portfolioImage: "/img/projects/aerosol/14.mp4",
  heroImage: "/img/projects/aerosol/1.webp",
  paragraphs: [
    "Aerosol es un estudio de producto construido sobre Solana. La identidad nace de una idea muy simple: dejar tu marca. De ahí sale la gota de pintura que reemplaza la O del logotipo y que terminó convirtiéndose en el personaje central de todo el sistema.",
    "El sistema visual combina un morado profundo con coral y una paleta amplia de colores saturados, pensada para vivir en pantalla: redes, interfaces de producto, avatares y piezas de comunidad. La gota funciona sola como isotipo y también como personaje que habita escenas ilustradas, de día y de noche, en la ciudad y en la montaña.",
    "Es un branding digital-first, hecho para una comunidad que se mueve rápido. Cada elemento está pensado para ser reconocible en un feed, escalable a cualquier formato y lo suficientemente flexible para que el equipo siga construyendo sobre él.",
  ],
  paragraphsEn: [
    "Aerosol is a product studio built on Solana. The identity comes from a very simple idea: leaving your mark. That is where the paint drip replacing the O in the wordmark comes from, and it ended up becoming the central character of the whole system.",
    "The visual system pairs a deep purple with coral and a wide palette of saturated colors, built to live on screen: social, product interfaces, avatars and community pieces. The drip works on its own as a symbol and also as a character living inside illustrated scenes, by day and by night, in the city and in the mountains.",
    "It is a digital-first brand, made for a community that moves fast. Every element is designed to be recognizable in a feed, scalable to any format and flexible enough for the team to keep building on top of it.",
  ],
  images: [
    "/img/projects/aerosol/2.webp",
    "/img/projects/aerosol/3.mp4",
    "/img/projects/aerosol/4.webp",
    "/img/projects/aerosol/5.webp",
    "/img/projects/aerosol/6.webp",
    "/img/projects/aerosol/7.webp",
    "/img/projects/aerosol/8.mp4",
    "/img/projects/aerosol/9.webp",
    "/img/projects/aerosol/10.webp",
    "/img/projects/aerosol/11.webp",
    "/img/projects/aerosol/12.mp4",
    "/img/projects/aerosol/13.mp4",
  ],
};

const AR = "/img/projects/aerosol-rebrand-2026";
const ARP = `${AR}/piezas`;
const arPost = (es: string, en: string): Bilingual => ({ es: `Post en X, ${es}`, en: `Post on X, ${en}` });

/**
 * Aerosol · Refinamiento 2026 told in chapters (F3, 27 Nov 2026). The brief and
 * the two paragraphs are the approved copy, word for word. BORRADOR para Molly:
 * the promise, chapter labels and headings, the system chapter's text and the
 * captions. The 2025/2026 compare is rendered from the two logo SVGs, aligned on
 * the letters. The phone now shows aerosol.build (live, 27 Nov), not the X
 * profile: devices show the product or its site. Videos are the 1920 masters.
 */
const aerosolRefinamientoStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "La misma Aerosol, solo más afilada: un logo refinado y la campaña para estrenarlo.",
      en: "Same Aerosol, only sharper: a refined logo and the campaign that launched it.",
    },
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      heading: { es: "Refinar, no empezar de cero.", en: "Refine, don't start over." },
      text: {
        es: "Aerosol ya no era un solo producto: se había vuelto un estudio con varios, y el logo seguía hablando como el de un proyecto. La gota tenía lentes y sonrisa, mucha personalidad para una marca que ahora tenía que firmar al lado de socios, caber en un favicon y abrir una presentación. El pedido fue refinar, no empezar de cero: que se siguiera viendo Aerosol, solo que más limpio, y presentarlo sin que pareciera que la empresa se estaba reinventando.",
        en: "Aerosol wasn't one product anymore. It had become a studio with several, and the logo still spoke like a single project's. The drip wore sunglasses and a smile, a lot of personality for a mark that now had to sign next to partners, fit in a favicon and open a deck. The ask was to refine, not start over: still clearly Aerosol, just cleaner, and to launch it without making it look like the company was reinventing itself.",
      },
      blocks: [
        { kind: "image", size: "bleed", image: { src: `${ARP}/campana-familia.webp`, title: { es: "La familia", en: "The family" }, detail: arPost("20 de noviembre", "20 November") } },
      ],
    },
    {
      id: "gota",
      label: { es: "La gota", en: "The drip" },
      heading: { es: "Sin lentes ni sonrisa.", en: "No sunglasses, no smile." },
      text: {
        es: "La regla fue no reinventar nada. Le quité a la gota los lentes y la sonrisa, que eran lo que la hacía personaje y no marca, y dejé todo lo que la hacía Aerosol: la forma, el chorrito y las gotitas alrededor. Así el logo funciona igual de favicon que en un banner, y Splat, con sus lentes, se queda donde mejor vive: en el contenido.",
        en: "The rule was to reinvent nothing. I took the sunglasses and the smile off the drip, since they were what made it a character instead of a mark, and kept everything that made it Aerosol: the shape, the drip and the spray drops around it. Now the logo works the same as a favicon as it does on a banner, and Splat, sunglasses and all, stays where he lives best: in the content.",
      },
      blocks: [
        {
          kind: "compare",
          width: "wide",
          before: { src: `${ARP}/logo-antes-2025.webp`, title: { es: "2025", en: "2025" }, detail: { es: "La gota con lentes y sonrisa", en: "The drip with sunglasses and a smile" } },
          after: { src: `${ARP}/logo-despues-2026.webp`, title: { es: "2026", en: "2026" }, detail: { es: "La misma gota, sin el personaje", en: "The same drip, without the character" } },
          hint: { es: "Arrastra la línea o usa las flechas.", en: "Drag the line or use the arrows." },
        },
        { kind: "image", size: "solo", image: { src: `${ARP}/celular-web-mockup.webp`, title: { es: "aerosol.build en el celular", en: "aerosol.build on a phone" }, detail: { es: "En vivo, en una escena hecha para Aerosol", en: "Live, in a scene made for Aerosol" } } },
      ],
    },
    {
      id: "sistema",
      label: { es: "El sistema", en: "The system" },
      heading: { es: "De un banner a 16\u00a0px.", en: "From a banner down to 16\u00a0px." },
      text: {
        es: "Con la gota limpia, el resto se ordenó solo. El logo vive en horizontal, apilado o como la gota sola, en claro y en oscuro, y la gota se sigue leyendo como ícono a 16 px. El morado y el coral mandan, con seis amigos para cuando hace falta más color. Y para la voz, una sola letra: Rubik, con cuatro roles fijos, del titular grande a la etiqueta.",
        en: "Once the drip was clean, the rest fell into place. The logo lives horizontal, stacked or as the drip on its own, on light and on dark, and the drip still reads as an icon at 16 px. Purple and coral lead, with six friends for when you need more color. And for the voice, one typeface: Rubik, with four fixed roles, from the big headline down to the label.",
      },
      blocks: [
        { kind: "image", size: "bleed", image: { src: `${AR}/aerosol-rebrand-x-MY-03a.webp`, title: { es: "El logo", en: "The logo" }, detail: { es: "Horizontal y apilado, en claro y en oscuro", en: "Horizontal and stacked, on light and on dark" } } },
        { kind: "image", size: "wide", image: { src: `${AR}/aerosol-rebrand-x-MY-03b.webp`, title: { es: "La gota sola", en: "The drip on its own" }, detail: { es: "Y como ícono a 64, 32 y 16 px", en: "And as an icon at 64, 32 and 16 px" } } },
        {
          kind: "palette",
          colors: [
            { name: { es: "Morado", en: "Purple" }, hex: "#3C1253" },
            { name: { es: "Coral", en: "Coral" }, hex: "#FB7B56" },
          ],
        },
        {
          kind: "palette",
          colors: [
            { name: { es: "Lila", en: "Lilac" }, hex: "#945EC7" },
            { name: { es: "Rojo", en: "Red" }, hex: "#F23A30" },
            { name: { es: "Rosa", en: "Pink" }, hex: "#F24B80" },
            { name: { es: "Amarillo", en: "Yellow" }, hex: "#F0C300" },
            { name: { es: "Verde", en: "Green" }, hex: "#00C461" },
            { name: { es: "Turquesa", en: "Turquoise" }, hex: "#28C9DB" },
          ],
        },
        { kind: "image", size: "wide", image: { src: `${AR}/aerosol-rebrand-x-MY-04-en.webp`, title: { es: "Rubik", en: "Rubik" }, detail: { es: "Cuatro roles, con frases de la campaña", en: "Four roles, set in lines from the campaign" } } },
      ],
    },
    {
      id: "campana",
      label: { es: "La campaña", en: "The campaign" },
      heading: { es: "Enseñarlo, no explicarlo.", en: "Show it, don't explain it." },
      text: {
        es: "La campaña tenía que contar lo mismo: que es la misma Aerosol, solo más afilada. Por eso no explica el logo trazo por trazo, lo enseña. Primero un acercamiento a la gota, después la gota cayendo, y el día del reveal el antes convirtiéndose en el después. De ahí salió el resto: un manifiesto, la familia de productos y una tipografía, Rubik, que pone la voz del estudio en cada titular.",
        en: "The campaign had to say the same thing: same Aerosol, only sharper. So it doesn't explain the logo stroke by stroke. It shows it. First a close-up of the drip, then the drip falling, and on reveal day the before turning into the after. Everything else grew from there: a manifesto, the product family and one typeface, Rubik, that gives the studio the same voice in every headline.",
      },
      blocks: [
        { kind: "image", size: "solo", image: { src: `${ARP}/video-antes-despues.mp4`, title: { es: "El reveal", en: "The reveal" }, detail: { es: "Video fijado en @aerosolbuild, 4 de noviembre", en: "Video pinned on @aerosolbuild, 4 November" } } },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          items: [
            { src: `${ARP}/campana-gota-de-cerca.webp`, title: { es: "El primer teaser", en: "The first teaser" }, detail: arPost("2 de noviembre", "2 November") },
            { src: `${ARP}/campana-antes-despues.webp`, title: { es: "Same Aerosol. Sharper.", en: "Same Aerosol. Sharper." }, detail: arPost("4 de noviembre", "4 November") },
            { src: `${ARP}/campana-vision.webp`, title: { es: "We build cool things.", en: "We build cool things." }, detail: arPost("6 de noviembre", "6 November") },
            { src: `${ARP}/campana-onchain-or-not.webp`, title: { es: "Onchain or not.", en: "Onchain or not." }, detail: arPost("9 de noviembre", "9 November") },
            { src: `${ARP}/campana-design-build-ship.webp`, title: { es: "Design. Build. Ship.", en: "Design. Build. Ship." }, detail: arPost("11 de noviembre", "11 November") },
            { src: `${ARP}/campana-more-products.webp`, title: { es: "More products. More people using them.", en: "More products. More people using them." }, detail: arPost("16 de noviembre", "16 November") },
          ],
        },
        { kind: "image", size: "solo", image: { src: `${AR}/aerosol-rebrand-laptop-mockup.webp`, title: { es: "aerosol.build", en: "aerosol.build" }, detail: { es: "La web, ya en Rubik", en: "The site, now in Rubik" } } },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          items: [
            { src: `${ARP}/video-manifiesto.mp4`, title: { es: "El manifiesto", en: "The manifesto" }, detail: arPost("6 de noviembre", "6 November") },
            { src: `${ARP}/video-familia.mp4`, title: { es: "La familia", en: "The family" }, detail: arPost("10 de noviembre", "10 November") },
          ],
        },
      ],
    },
  ],
  closing: {
    image: { src: `${ARP}/campana-banner-x.webp`, title: { es: "El banner de @aerosolbuild", en: "The @aerosolbuild banner" }, detail: { es: "En el perfil desde el 4 de noviembre", en: "On the profile since 4 November" } },
  },
};

const aerosolRefinamientoProject: Project = {
  slug: "aerosol-rebrand-2026",
  story: aerosolRefinamientoStory,
  title: "Aerosol · Refinamiento 2026",
  titleEn: "Aerosol · Refinement 2026",
  client: "Aerosol",
  year: "2026",
  role: "Directora de arte. Refinamiento del logo y campaña",
  roleEn: "Art director. Logo refinement and campaign",
  scope: ["Refinamiento de logo", "Sistema de logo", "Tipografía", "Color", "Campaña de lanzamiento", "Motion"],
  scopeEn: ["Logo refinement", "Logo system", "Typography", "Color", "Launch campaign", "Motion"],
  gridLabel: "Refinamiento de logo · Campaña",
  gridLabelEn: "Logo refinement · Campaign",
  brief: "Aerosol ya no era un solo producto: se había vuelto un estudio con varios, y el logo seguía hablando como el de un proyecto. La gota tenía lentes y sonrisa, mucha personalidad para una marca que ahora tenía que firmar al lado de socios, caber en un favicon y abrir una presentación. El pedido fue refinar, no empezar de cero: que se siguiera viendo Aerosol, solo que más limpio, y presentarlo sin que pareciera que la empresa se estaba reinventando.",
  briefEn: "Aerosol wasn't one product anymore. It had become a studio with several, and the logo still spoke like a single project's. The drip wore sunglasses and a smile, a lot of personality for a mark that now had to sign next to partners, fit in a favicon and open a deck. The ask was to refine, not start over: still clearly Aerosol, just cleaner, and to launch it without making it look like the company was reinventing itself.",
  shipped: [
    "El logo refinado: la misma gota en la O, sin lentes ni sonrisa.",
    "El sistema de logo (horizontal, apilado y la gota sola) y la paleta de morado y coral.",
    "Rubik como tipografía display, con cuatro roles fijos.",
    "La campaña «New look. Same Aerosol.» en X e Instagram, y el perfil nuevo de @aerosolbuild.",
  ],
  shippedEn: [
    "The refined logo: the same drip in the O, with no sunglasses and no smile.",
    "The logo system (horizontal, stacked and the drip on its own) and the purple and coral palette.",
    "Rubik as the display face, with four fixed roles.",
    "The “New look. Same Aerosol.” campaign on X and Instagram, and the new @aerosolbuild profile.",
  ],
  outcome: ["El logo nuevo salió el 4 de noviembre de 2026, con el reveal fijado en @aerosolbuild."],
  outcomeEn: ["The new logo shipped on 4 November 2026, with the reveal pinned on @aerosolbuild."],
  credits: [
    "Refinamiento del logo, dirección de arte y campaña: Molly Yllom",
    "Desarrollo web: equipo de Aerosol",
  ],
  creditsEn: [
    "Logo refinement, art direction and campaign: Molly Yllom",
    "Web development: the Aerosol team",
  ],
  portfolioImage: "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-gota-animada-portada.mp4",
  heroImage: "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-x-MY-01.webp",
  paragraphs: [
    "La regla fue no reinventar nada. Le quité a la gota los lentes y la sonrisa, que eran lo que la hacía personaje y no marca, y dejé todo lo que la hacía Aerosol: la forma, el chorrito y las gotitas alrededor. Así el logo funciona igual de favicon que en un banner, y Splat, con sus lentes, se queda donde mejor vive: en el contenido.",
    "La campaña tenía que contar lo mismo: que es la misma Aerosol, solo más afilada. Por eso no explica el logo trazo por trazo, lo enseña. Primero un acercamiento a la gota, después la gota cayendo, y el día del reveal el antes convirtiéndose en el después. De ahí salió el resto: un manifiesto, la familia de productos y una tipografía, Rubik, que pone la voz del estudio en cada titular.",
  ],
  paragraphsEn: [
    "The rule was to reinvent nothing. I took the sunglasses and the smile off the drip, since they were what made it a character instead of a mark, and kept everything that made it Aerosol: the shape, the drip and the spray drops around it. Now the logo works the same as a favicon as it does on a banner, and Splat, sunglasses and all, stays where he lives best: in the content.",
    "The campaign had to say the same thing: same Aerosol, only sharper. So it doesn't explain the logo stroke by stroke. It shows it. First a close-up of the drip, then the drip falling, and on reveal day the before turning into the after. Everything else grew from there: a manifesto, the product family and one typeface, Rubik, that gives the studio the same voice in every headline.",
  ],
  images: [
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-antes-despues.mp4",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-x-MY-02.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-celular-mockup.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-x-MY-03a.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-manifiesto.mp4",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-x-MY-03b.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-laptop-mockup.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-x-MY-04.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-paleta.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-familia.mp4",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-x-MY-05.webp",
  ],
  imagesEn: [
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-antes-despues.mp4",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-x-MY-02-en.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-celular-mockup.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-x-MY-03a.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-manifiesto.mp4",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-x-MY-03b.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-laptop-mockup.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-x-MY-04-en.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-paleta.webp",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-familia.mp4",
    "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-x-MY-05.webp",
  ],
};

/** the-unhinged, told in chapters (Nov 2026 refresh, collections template). */
const theUnhingedStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "222 personajes locos, hechos a mano rasgo por rasgo.",
      en: "222 unhinged characters, made by hand trait by trait."
    }
  },
  chapters: [
    {
      id: "coleccion",
      label: {
        es: "La colección",
        en: "The collection"
      },
      heading: {
        es: "Locos, pero hechos con cuidado.",
        en: "Unhinged, but carefully made."
      },
      text: {
        es: "The Unhinged es el World 05 del Mollyverse, la quinta colección y la segunda que nace dentro de la plataforma. Después de Molly Degen Punks, que es puro píxel y puras reglas, quería soltar la mano: línea suelta, brazos de fideo, lentes gigantes y una mascota que se te sube al hombro sin pedir permiso. El reto era que 222 personajes se vieran locos y, a la vez, hechos con cuidado.",
        en: "The Unhinged is World 05 of the Mollyverse, the fifth collection and the second one born inside the platform. After Molly Degen Punks, which is all pixels and all rules, I wanted to loosen my hand: loose lines, noodle arms, giant glasses and a pet that climbs onto your shoulder without asking. The challenge was making 222 characters look unhinged and still carefully made."
      },
      blocks: [
        {
          kind: "stats",
          items: [
            {
              value: "222",
              label: {
                es: "piezas: 218 del generador y 4 únicas a mano",
                en: "pieces: 218 from the generator and 4 drawn by hand"
              }
            },
            {
              value: "247",
              label: {
                es: "rasgos dibujados a mano, en 11 capas",
                en: "hand-drawn traits, across 11 layers"
              }
            },
            {
              value: "1,11 SOL",
              label: {
                es: "la 1/1, en un mint de galería",
                en: "for a 1/1, in a gallery mint"
              }
            }
          ]
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: "/img/projects/the-unhinged/piezas/unh-celular.webp",
            title: {
              es: "La ficha de una pieza en la app",
              en: "A piece's page in the app"
            },
            detail: {
              es: "The Unhinged #33",
              en: "The Unhinged #33"
            }
          }
        }
      ]
    },
    {
      id: "personaje",
      label: {
        es: "El personaje",
        en: "The character"
      },
      heading: {
        es: "Un tipo azul en papel cuadriculado.",
        en: "A blue guy on graph paper."
      },
      text: {
        es: "Todo empezó con un solo personaje en papel cuadriculado: un tipo azul con el pelo como brócoli, unos lentes que no le caben en la cara y un mono en el hombro. De ese muñeco saqué las 11 capas y dibujé cada variante a mano, rasgo por rasgo. Nada del arte sale de un prompt. El código solo decide qué dibujos se encuentran.",
        en: "It all started with one character on graph paper: a blue guy with broccoli hair, glasses too big for his face and a monkey on his shoulder. From that guy I pulled out the 11 layers and drew every variant by hand, trait by trait. None of the art comes from a prompt. The code only decides which drawings get to meet."
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: {
            desktop: 2,
            phone: 1
          },
          ratio: "8/5",
          items: [
            {
              src: "/img/projects/the-unhinged/piezas/unh-logo-color-fondo.webp",
              title: {
                es: "Logo a todo color",
                en: "Full-colour logo"
              },
              detail: {
                es: "Sobre la noche de la marca",
                en: "On the brand's night"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-logo-una-tinta-fondo.webp",
              title: {
                es: "Logo a una tinta",
                en: "One-colour logo"
              },
              detail: {
                es: "En el morado de la marca",
                en: "In the brand purple"
              }
            }
          ]
        },
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: {
            es: "Las 1/1, a mano",
            en: "The 1/1s, by hand"
          },
          items: [
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-219-invisible-day.webp",
              title: {
                es: "Invisible Day",
                en: "Invisible Day"
              },
              detail: {
                es: "1/1 a mano",
                en: "Hand-drawn 1/1"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-220-mert.webp",
              title: {
                es: "Mert",
                en: "Mert"
              },
              detail: {
                es: "1/1 a mano",
                en: "Hand-drawn 1/1"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-221-toly.webp",
              title: {
                es: "Toly",
                en: "Toly"
              },
              detail: {
                es: "1/1 a mano",
                en: "Hand-drawn 1/1"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-222-invisible-night.webp",
              title: {
                es: "Invisible Night",
                en: "Invisible Night"
              },
              detail: {
                es: "1/1 a mano",
                en: "Hand-drawn 1/1"
              }
            }
          ]
        }
      ]
    },
    {
      id: "sistema",
      label: {
        es: "El sistema",
        en: "The system"
      },
      heading: {
        es: "El caos también tiene reglas.",
        en: "Chaos has rules too."
      },
      text: {
        es: "Lo que más disfruté fueron las reglas, porque el caos sin reglas se ve feo. Las cejas siempre siguen el color del pelo, hay pares de colores que no pueden mandar juntos, y la rareza decide qué puede llevar cada pieza. Diez monocromáticos son la rareza especial, y como todo sistema necesita a alguien que lo rompa, hay seis chaos donde cada capa va de un color distinto a propósito. Fuera del sistema quedaron cuatro piezas únicas, dibujadas enteras a mano.",
        en: "What I enjoyed most was the rules, because chaos without rules just looks messy. Brows always follow the hair color, some color pairs are never allowed to lead together, and each rarity decides what a piece can carry. Ten monochrome pieces are the special rarity, and since every system needs someone to break it, there are six chaos pieces where every layer is a different color on purpose. Outside the system there are four one-of-ones, drawn entirely by hand."
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: {
            desktop: 4,
            phone: 2
          },
          ratio: "1/1",
          fit: "contain",
          items: [
            {
              src: "/img/projects/the-unhinged/piezas/unh-capa-01-background.webp",
              title: {
                es: "Fondo",
                en: "Background"
              },
              detail: {
                es: "16 variantes",
                en: "16 variations"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-capa-02-body.webp",
              title: {
                es: "Cuerpo",
                en: "Body"
              },
              detail: {
                es: "24 variantes",
                en: "24 variations"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-capa-03-outfit.webp",
              title: {
                es: "Ropa",
                en: "Outfit"
              },
              detail: {
                es: "33 variantes",
                en: "33 variations"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-capa-04-mouth.webp",
              title: {
                es: "Boca",
                en: "Mouth"
              },
              detail: {
                es: "32 variantes",
                en: "32 variations"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-capa-05-eyes.webp",
              title: {
                es: "Ojos",
                en: "Eyes"
              },
              detail: {
                es: "16 variantes",
                en: "16 variations"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-capa-06-accessory.webp",
              title: {
                es: "Accesorio",
                en: "Accessory"
              },
              detail: {
                es: "10 variantes",
                en: "10 variations"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-capa-07-glasses.webp",
              title: {
                es: "Lentes",
                en: "Glasses"
              },
              detail: {
                es: "17 variantes",
                en: "17 variations"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-capa-08-headwear.webp",
              title: {
                es: "Sombrero",
                en: "Headwear"
              },
              detail: {
                es: "17 variantes",
                en: "17 variations"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-capa-09-hair.webp",
              title: {
                es: "Pelo",
                en: "Hair"
              },
              detail: {
                es: "32 variantes",
                en: "32 variations"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-capa-10-brows.webp",
              title: {
                es: "Cejas",
                en: "Brows"
              },
              detail: {
                es: "17 variantes",
                en: "17 variations"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-capa-11-pet.webp",
              title: {
                es: "Mascota",
                en: "Pet"
              },
              detail: {
                es: "33 variantes",
                en: "33 variations"
              }
            }
          ]
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: "/img/projects/the-unhinged/piezas/unh-laptop.webp",
            title: {
              es: "La colección en la app",
              en: "The collection in the app"
            },
            detail: {
              es: "Galería",
              en: "Gallery"
            }
          }
        }
      ]
    },
    {
      id: "piezas",
      label: {
        es: "Las piezas",
        en: "The pieces"
      },
      heading: {
        es: "222 personajes, cuatro hechos enteros a mano.",
        en: "222 characters, four drawn entirely by hand."
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: {
            es: "Especiales",
            en: "Specials"
          },
          items: [
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-55.webp",
              title: {
                es: "Monocromático",
                en: "Monochrome"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-79.webp",
              title: {
                es: "Monocromático",
                en: "Monochrome"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-114.webp",
              title: {
                es: "Monocromático",
                en: "Monochrome"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-160.webp",
              title: {
                es: "Monocromático",
                en: "Monochrome"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-202.webp",
              title: {
                es: "Monocromático",
                en: "Monochrome"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-34.webp",
              title: {
                es: "Chaos",
                en: "Chaos"
              },
              detail: {
                es: "Epic",
                en: "Epic"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-74.webp",
              title: {
                es: "Chaos",
                en: "Chaos"
              },
              detail: {
                es: "Epic",
                en: "Epic"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-99.webp",
              title: {
                es: "Chaos",
                en: "Chaos"
              },
              detail: {
                es: "Epic",
                en: "Epic"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-128.webp",
              title: {
                es: "Chaos",
                en: "Chaos"
              },
              detail: {
                es: "Epic",
                en: "Epic"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-especial-152.webp",
              title: {
                es: "Chaos",
                en: "Chaos"
              },
              detail: {
                es: "Epic",
                en: "Epic"
              }
            }
          ]
        },
        {
          kind: "wall",
          width: "wide",
          columns: {
            desktop: 6,
            phone: 3
          },
          ratio: "1/1",
          items: [
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-12.webp",
              title: {
                es: "#12",
                en: "#12"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-47.webp",
              title: {
                es: "#47",
                en: "#47"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-59.webp",
              title: {
                es: "#59",
                en: "#59"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-71.webp",
              title: {
                es: "#71",
                en: "#71"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-80.webp",
              title: {
                es: "#80",
                en: "#80"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-88.webp",
              title: {
                es: "#88",
                en: "#88"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-97.webp",
              title: {
                es: "#97",
                en: "#97"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-123.webp",
              title: {
                es: "#123",
                en: "#123"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-1.webp",
              title: {
                es: "#1",
                en: "#1"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-9.webp",
              title: {
                es: "#9",
                en: "#9"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-10.webp",
              title: {
                es: "#10",
                en: "#10"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-15.webp",
              title: {
                es: "#15",
                en: "#15"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-17.webp",
              title: {
                es: "#17",
                en: "#17"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-23.webp",
              title: {
                es: "#23",
                en: "#23"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-25.webp",
              title: {
                es: "#25",
                en: "#25"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-28.webp",
              title: {
                es: "#28",
                en: "#28"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-30.webp",
              title: {
                es: "#30",
                en: "#30"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-104.webp",
              title: {
                es: "#104",
                en: "#104"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-2.webp",
              title: {
                es: "#2",
                en: "#2"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-5.webp",
              title: {
                es: "#5",
                en: "#5"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-6.webp",
              title: {
                es: "#6",
                en: "#6"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-7.webp",
              title: {
                es: "#7",
                en: "#7"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-11.webp",
              title: {
                es: "#11",
                en: "#11"
              }
            },
            {
              src: "/img/projects/the-unhinged/piezas/unh-pieza-14.webp",
              title: {
                es: "#14",
                en: "#14"
              }
            }
          ]
        }
      ]
    }
  ],
  closing: {
    image: {
      src: "/img/projects/the-unhinged/piezas/unh-escena.webp",
      title: {
        es: "Las piezas, impresas",
        en: "The pieces, printed"
      },
      detail: {
        es: "Invisible Day e Invisible Night, enmarcadas",
        en: "Invisible Day and Invisible Night, framed"
      }
    }
  }
};

const theUnhingedProject: Project = {
  slug: "the-unhinged",
  title: "The Unhinged",
  client: "Mollyverse",
  year: "2026",
  role: "Ilustración, sistema generativo y dirección de arte",
  roleEn: "Illustration, generative system and art direction",
  scope: ["Ilustración", "Logo", "Sistema de rasgos", "Arte generativo", "Mint", "1/1 a mano"],
  scopeEn: ["Illustration", "Logo", "Trait system", "Generative art", "Mint", "Hand-drawn 1/1s"],
  gridLabel: "Colección NFT · Ilustración",
  gridLabelEn: "NFT collection · Illustration",
  brief: "The Unhinged es el World 05 del Mollyverse, la quinta colección y la segunda que nace dentro de la plataforma. Después de Molly Degen Punks, que es puro píxel y puras reglas, quería soltar la mano: línea suelta, brazos de fideo, lentes gigantes y una mascota que se te sube al hombro sin pedir permiso. El reto era que 222 personajes se vieran locos y, a la vez, hechos con cuidado.",
  briefEn: "The Unhinged is World 05 of the Mollyverse, the fifth collection and the second one born inside the platform. After Molly Degen Punks, which is all pixels and all rules, I wanted to loosen my hand: loose lines, noodle arms, giant glasses and a pet that climbs onto your shoulder without asking. The challenge was making 222 characters look unhinged and still carefully made.",
  shipped: [
    "El personaje base, del boceto en papel cuadriculado a la ilustración, y el logo a todo color y a una tinta.",
    "247 rasgos dibujados a mano en 11 capas, con sus reglas: cejas que siguen al pelo y pares de colores prohibidos.",
    "222 piezas: 218 del generador, con cinco rarezas, 10 monocromáticos y 6 chaos, y 4 únicas hechas a mano.",
    "La página de la colección, una ficha por pieza y el mint de galería en la app del Mollyverse.",
  ],
  shippedEn: [
    "The base character, from a graph-paper sketch to the illustration, and the logo in full color and in one color.",
    "247 hand-drawn traits across 11 layers, with their rules: brows that follow the hair and forbidden color pairs.",
    "222 pieces: 218 from the generator, with five rarities, 10 monochrome and 6 chaos, and 4 one-of-ones drawn by hand.",
    "The collection page, a page for every piece and the gallery mint in the Mollyverse app.",
  ],
  outcome: ["El mint abrió el 3 de septiembre de 2026: eliges la pieza exacta, de 0,11 a 1,11 SOL según su rareza."],
  outcomeEn: ["The mint opened on 3 September 2026: you pick the exact piece, from 0.11 to 1.11 SOL by its rarity."],
  credits: [
    "Arte, generador, app y mint: Molly Yllom, con ayuda de Kelvin y herramientas de IA",
  ],
  creditsEn: [
    "Art, generator, app and mint: Molly Yllom, with help from Kelvin and AI tools",
  ],
  portfolioImage: "/img/projects/the-unhinged/unh-personajes.mp4",
  heroImage: "/img/projects/the-unhinged/piezas/unh-portada.webp",
  paragraphs: [
    "Todo empezó con un solo personaje en papel cuadriculado: un tipo azul con el pelo como brócoli, unos lentes que no le caben en la cara y un mono en el hombro. De ese muñeco saqué las 11 capas y dibujé cada variante a mano, rasgo por rasgo. Nada del arte sale de un prompt. El código solo decide qué dibujos se encuentran.",
    "Lo que más disfruté fueron las reglas, porque el caos sin reglas se ve feo. Las cejas siempre siguen el color del pelo, hay pares de colores que no pueden mandar juntos, y la rareza decide qué puede llevar cada pieza. Diez monocromáticos son la rareza especial, y como todo sistema necesita a alguien que lo rompa, hay seis chaos donde cada capa va de un color distinto a propósito. Fuera del sistema quedaron cuatro piezas únicas, dibujadas enteras a mano.",
  ],
  paragraphsEn: [
    "It all started with one character on graph paper: a blue guy with broccoli hair, glasses too big for his face and a monkey on his shoulder. From that guy I pulled out the 11 layers and drew every variant by hand, trait by trait. None of the art comes from a prompt. The code only decides which drawings get to meet.",
    "What I enjoyed most was the rules, because chaos without rules just looks messy. Brows always follow the hair color, some color pairs are never allowed to lead together, and each rarity decides what a piece can carry. Ten monochrome pieces are the special rarity, and since every system needs someone to break it, there are six chaos pieces where every layer is a different color on purpose. Outside the system there are four one-of-ones, drawn entirely by hand.",
  ],
  images: [
    "/img/projects/the-unhinged/unh-x-MY-02.webp",
    "/img/projects/the-unhinged/unh-x-MY-03.webp",
    "/img/projects/the-unhinged/unh-celular-mockup.webp",
    "/img/projects/the-unhinged/unh-x-MY-04.webp",
    "/img/projects/the-unhinged/unh-x-MY-05.webp",
    "/img/projects/the-unhinged/unh-laptop-mockup.webp",
    "/img/projects/the-unhinged/unh-x-MY-06b.webp",
    "/img/projects/the-unhinged/unh-proceso.mp4",
    "/img/projects/the-unhinged/unh-x-MY-07.webp",
    "/img/projects/the-unhinged/unh-escena-mockup.webp",
    "/img/projects/the-unhinged/unh-x-MY-08.webp",
  ],
  imagesEn: [
    "/img/projects/the-unhinged/unh-x-MY-02.webp",
    "/img/projects/the-unhinged/unh-x-MY-03-en.webp",
    "/img/projects/the-unhinged/unh-celular-mockup.webp",
    "/img/projects/the-unhinged/unh-x-MY-04.webp",
    "/img/projects/the-unhinged/unh-x-MY-05-en.webp",
    "/img/projects/the-unhinged/unh-laptop-mockup.webp",
    "/img/projects/the-unhinged/unh-x-MY-06b-en.webp",
    "/img/projects/the-unhinged/unh-proceso.mp4",
    "/img/projects/the-unhinged/unh-x-MY-07.webp",
    "/img/projects/the-unhinged/unh-escena-mockup.webp",
    "/img/projects/the-unhinged/unh-x-MY-08.webp",
  ],
  story: theUnhingedStory,
};

/** mdp, told in chapters (Nov 2026 refresh, collections template). */
const mdpStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "Un autorretrato en píxel convertido en 111 punks.",
      en: "One pixel self-portrait turned into 111 punks."
    }
  },
  origin: {
    label: {
      es: "Así empezó",
      en: "Where it began"
    },
    heading: {
      es: "El autorretrato del que salieron todos.",
      en: "The self-portrait they all came from."
    },
    before: {
      src: "/img/projects/mdp/piezas/mdp-origen-antes.webp",
      title: {
        es: "Autorretrato",
        en: "Self-portrait"
      },
      detail: {
        es: "La base",
        en: "The base"
      }
    },
    after: {
      src: "/img/projects/mdp/piezas/mdp-origen-despues.webp",
      title: {
        es: "Molly Degen Punk #27",
        en: "Molly Degen Punk #27"
      },
      detail: {
        es: "Una de las 111",
        en: "One of the 111"
      }
    }
  },
  chapters: [
    {
      id: "coleccion",
      label: {
        es: "La colección",
        en: "The collection"
      },
      heading: {
        es: "111 versiones de la misma persona.",
        en: "111 versions of the same person."
      },
      text: {
        es: "Molly Degen Punks es el World 04 del Mollyverse y la primera colección que nació dentro de la plataforma. Salió de un autorretrato mío en píxel, y de ahí hice 111 versiones de la misma persona. El reto era que cada punk se sintiera distinto de verdad y que, aun así, se notara que todos vienen de mí.",
        en: "Molly Degen Punks is World 04 of the Mollyverse and the first collection born inside the platform. It came from a pixel self-portrait, and from that one portrait I made 111 versions of the same person. The challenge was making every punk feel truly different while you could still tell they all come from me."
      },
      blocks: [
        {
          kind: "stats",
          items: [
            {
              value: "111",
              label: {
                es: "punks, todos salidos de mí",
                en: "punks, all of them me"
              }
            },
            {
              value: "215",
              label: {
                es: "variantes dibujadas a mano, en 9 capas",
                en: "hand-drawn variations, across 9 layers"
              }
            },
            {
              value: "0,11 SOL",
              label: {
                es: "mint al azar, agotado en mayo de 2026",
                en: "random mint, sold out in May 2026"
              }
            }
          ]
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: "/img/projects/mdp/piezas/mdp-celular.webp",
            title: {
              es: "La ficha de una pieza en la app",
              en: "A piece's page in the app"
            },
            detail: {
              es: "Molly Degen Punk #104",
              en: "Molly Degen Punk #104"
            }
          }
        }
      ]
    },
    {
      id: "personaje",
      label: {
        es: "El personaje",
        en: "The character"
      },
      heading: {
        es: "Cada rasgo es algo real.",
        en: "Every trait is something real."
      },
      text: {
        es: "Todo empezó con un autorretrato en píxel: el pelo largo con un lado rapado, los lentes redondos y una camisa negra. De ahí saqué 111 versiones mías. Cada rasgo es algo real, un diente de oro, una corona, una banana, una chaqueta como la de Lady Gaga, y en el fondo están mis raíces dominicanas, la cultura degen y lo punk. Por eso digo que es el mundo más personal del Mollyverse.",
        en: "It all started with a pixel self-portrait: long hair with one side shaved, round glasses and a black shirt. From there I made 111 versions of myself. Every trait is something real, a gold tooth, a crown, a banana, a jacket like Lady Gaga's, and underneath it all are my Dominican roots, degen culture and punk. That's why I call it the most personal world in the Mollyverse."
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: {
            es: "Rasgos con historia",
            en: "Traits with a story"
          },
          items: [
            {
              src: "/img/projects/mdp/piezas/mdp-especial-33.webp",
              title: {
                es: "Una corona",
                en: "A crown"
              },
              detail: {
                es: "#33",
                en: "#33"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-especial-22.webp",
              title: {
                es: "Una banana y un diente de oro",
                en: "A banana and a gold tooth"
              },
              detail: {
                es: "#22",
                en: "#22"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-especial-74.webp",
              title: {
                es: "Un diente de oro",
                en: "A gold tooth"
              },
              detail: {
                es: "#74",
                en: "#74"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-especial-104.webp",
              title: {
                es: "Una chaqueta como la de Lady Gaga",
                en: "A jacket like Lady Gaga's"
              },
              detail: {
                es: "#104",
                en: "#104"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-especial-75.webp",
              title: {
                es: "Una chaqueta como la de Lady Gaga",
                en: "A jacket like Lady Gaga's"
              },
              detail: {
                es: "#75",
                en: "#75"
              }
            }
          ]
        }
      ]
    },
    {
      id: "sistema",
      label: {
        es: "El sistema",
        en: "The system"
      },
      heading: {
        es: "No todo puede ir con todo.",
        en: "Not everything goes with everything."
      },
      text: {
        es: "Lo que más me importaba era el contraste. Cada pieza sale de 9 capas dibujadas a mano, pero no todo puede ir con todo: hay rasgos que no conviven y la rareza decide qué puede llevar cada punk. El mint fue al azar, así que no elegías tu punk: te tocaba uno, como pasa con la identidad.",
        en: "What mattered most to me was contrast. Every piece comes from 9 hand-drawn layers, but not everything goes with everything: some traits can't live together, and the rarity decides what each punk is allowed to wear. The mint was random, so you didn't pick your punk. You got one, the way it works with identity."
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: {
            desktop: 3,
            phone: 2
          },
          ratio: "1/1",
          fit: "contain",
          items: [
            {
              src: "/img/projects/mdp/piezas/mdp-capa-01-background.webp",
              title: {
                es: "Fondo",
                en: "Background"
              },
              detail: {
                es: "16 variantes",
                en: "16 variations"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-capa-02-body.webp",
              title: {
                es: "Cuerpo",
                en: "Body"
              },
              detail: {
                es: "31 variantes",
                en: "31 variations"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-capa-03-outfit.webp",
              title: {
                es: "Ropa",
                en: "Outfit"
              },
              detail: {
                es: "26 variantes",
                en: "26 variations"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-capa-04-face.webp",
              title: {
                es: "Cara",
                en: "Face"
              },
              detail: {
                es: "28 variantes",
                en: "28 variations"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-capa-05-hair.webp",
              title: {
                es: "Pelo",
                en: "Hair"
              },
              detail: {
                es: "29 variantes",
                en: "29 variations"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-capa-06-eyeglasses.webp",
              title: {
                es: "Lentes",
                en: "Eyeglasses"
              },
              detail: {
                es: "28 variantes",
                en: "28 variations"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-capa-07-earrings.webp",
              title: {
                es: "Aretes",
                en: "Earrings"
              },
              detail: {
                es: "25 variantes",
                en: "25 variations"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-capa-08-headwear.webp",
              title: {
                es: "Sombrero",
                en: "Headwear"
              },
              detail: {
                es: "16 variantes",
                en: "16 variations"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-capa-09-accessory.webp",
              title: {
                es: "Accesorio",
                en: "Accessory"
              },
              detail: {
                es: "16 variantes",
                en: "16 variations"
              }
            }
          ]
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: "/img/projects/mdp/piezas/mdp-laptop.webp",
            title: {
              es: "La colección en la app",
              en: "The collection in the app"
            },
            detail: {
              es: "Galería",
              en: "Gallery"
            }
          }
        }
      ]
    },
    {
      id: "piezas",
      label: {
        es: "Las piezas",
        en: "The pieces"
      },
      heading: {
        es: "Once Legendary y cien más.",
        en: "Eleven Legendary and a hundred more."
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: {
            es: "Legendary",
            en: "Legendary"
          },
          items: [
            {
              src: "/img/projects/mdp/piezas/mdp-especial-19.webp",
              title: {
                es: "#19",
                en: "#19"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-especial-45.webp",
              title: {
                es: "#45",
                en: "#45"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-especial-63.webp",
              title: {
                es: "#63",
                en: "#63"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-especial-68.webp",
              title: {
                es: "#68",
                en: "#68"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-especial-95.webp",
              title: {
                es: "#95",
                en: "#95"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            }
          ]
        },
        {
          kind: "wall",
          width: "wide",
          columns: {
            desktop: 6,
            phone: 3
          },
          ratio: "1/1",
          items: [
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-0.webp",
              title: {
                es: "#0",
                en: "#0"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-2.webp",
              title: {
                es: "#2",
                en: "#2"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-5.webp",
              title: {
                es: "#5",
                en: "#5"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-8.webp",
              title: {
                es: "#8",
                en: "#8"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-9.webp",
              title: {
                es: "#9",
                en: "#9"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-12.webp",
              title: {
                es: "#12",
                en: "#12"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-14.webp",
              title: {
                es: "#14",
                en: "#14"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-16.webp",
              title: {
                es: "#16",
                en: "#16"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-21.webp",
              title: {
                es: "#21",
                en: "#21"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-24.webp",
              title: {
                es: "#24",
                en: "#24"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-30.webp",
              title: {
                es: "#30",
                en: "#30"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-35.webp",
              title: {
                es: "#35",
                en: "#35"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-38.webp",
              title: {
                es: "#38",
                en: "#38"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-43.webp",
              title: {
                es: "#43",
                en: "#43"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-50.webp",
              title: {
                es: "#50",
                en: "#50"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-57.webp",
              title: {
                es: "#57",
                en: "#57"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-70.webp",
              title: {
                es: "#70",
                en: "#70"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-90.webp",
              title: {
                es: "#90",
                en: "#90"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-1.webp",
              title: {
                es: "#1",
                en: "#1"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-3.webp",
              title: {
                es: "#3",
                en: "#3"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-4.webp",
              title: {
                es: "#4",
                en: "#4"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-6.webp",
              title: {
                es: "#6",
                en: "#6"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-7.webp",
              title: {
                es: "#7",
                en: "#7"
              }
            },
            {
              src: "/img/projects/mdp/piezas/mdp-pieza-10.webp",
              title: {
                es: "#10",
                en: "#10"
              }
            }
          ]
        }
      ]
    }
  ],
  closing: {
    image: {
      src: "/img/projects/mdp/piezas/mdp-escena.webp",
      title: {
        es: "Las piezas, impresas",
        en: "The pieces, printed"
      },
      detail: {
        es: "Tres rasgos con historia: #33, #22 y #75",
        en: "Three traits with a story: #33, #22 and #75"
      }
    }
  }
};

const mdpProject: Project = {
  slug: "mdp",
  title: "Molly Degen Punks",
  client: "Mollyverse",
  year: "2026",
  role: "Pixel art, sistema generativo y dirección de arte",
  roleEn: "Pixel art, generative system and art direction",
  scope: ["Pixel art", "Título", "Sistema de rasgos", "Arte generativo", "Mint"],
  scopeEn: ["Pixel art", "Title", "Trait system", "Generative art", "Mint"],
  gridLabel: "Colección NFT · Pixel art",
  gridLabelEn: "NFT collection · Pixel art",
  brief: "Molly Degen Punks es el World 04 del Mollyverse y la primera colección que nació dentro de la plataforma. Salió de un autorretrato mío en píxel, y de ahí hice 111 versiones de la misma persona. El reto era que cada punk se sintiera distinto de verdad y que, aun así, se notara que todos vienen de mí.",
  briefEn: "Molly Degen Punks is World 04 of the Mollyverse and the first collection born inside the platform. It came from a pixel self-portrait, and from that one portrait I made 111 versions of the same person. The challenge was making every punk feel truly different while you could still tell they all come from me.",
  shipped: [
    "El personaje base, un autorretrato en píxel, y el título de la colección tal como lo lleva la app.",
    "215 variantes dibujadas a mano, píxel por píxel, en 9 capas, con reglas sobre qué puede ir junto y qué no.",
    "111 piezas en cuatro rarezas: 11 Legendary, 22 Epic, 34 Rare y 44 Common.",
    "La página de la colección, una ficha por pieza y el mint en la app del Mollyverse.",
  ],
  shippedEn: [
    "The base character, a pixel self-portrait, and the collection's title as the app carries it.",
    "215 variations drawn by hand, pixel by pixel, across 9 layers, with rules on what can go together and what can't.",
    "111 pieces in four rarities: 11 Legendary, 22 Epic, 34 Rare and 44 Common.",
    "The collection page, a page for every piece and the mint in the Mollyverse app.",
  ],
  outcome: ["El mint abrió el 5 de abril de 2026, al azar y a 0,11 SOL, y se agotó en mayo."],
  outcomeEn: ["The mint opened on 5 April 2026, as a random reveal at 0.11 SOL, and sold out in May."],
  credits: [
    "Arte, generador, app y mint: Molly Yllom, con ayuda de Kelvin y herramientas de IA",
  ],
  creditsEn: [
    "Art, generator, app and mint: Molly Yllom, with help from Kelvin and AI tools",
  ],
  portfolioImage: "/img/projects/mdp/mdp-personajes.mp4",
  heroImage: "/img/projects/mdp/piezas/mdp-portada.webp",
  paragraphs: [
    "Todo empezó con un autorretrato en píxel: el pelo largo con un lado rapado, los lentes redondos y una camisa negra. De ahí saqué 111 versiones mías. Cada rasgo es algo real, un diente de oro, una corona, una banana, una chaqueta como la de Lady Gaga, y en el fondo están mis raíces dominicanas, la cultura degen y lo punk. Por eso digo que es el mundo más personal del Mollyverse.",
    "Lo que más me importaba era el contraste. Cada pieza sale de 9 capas dibujadas a mano, pero no todo puede ir con todo: hay rasgos que no conviven y la rareza decide qué puede llevar cada punk. El mint fue al azar, así que no elegías tu punk: te tocaba uno, como pasa con la identidad.",
  ],
  paragraphsEn: [
    "It all started with a pixel self-portrait: long hair with one side shaved, round glasses and a black shirt. From there I made 111 versions of myself. Every trait is something real, a gold tooth, a crown, a banana, a jacket like Lady Gaga's, and underneath it all are my Dominican roots, degen culture and punk. That's why I call it the most personal world in the Mollyverse.",
    "What mattered most to me was contrast. Every piece comes from 9 hand-drawn layers, but not everything goes with everything: some traits can't live together, and the rarity decides what each punk is allowed to wear. The mint was random, so you didn't pick your punk. You got one, the way it works with identity.",
  ],
  images: [
    "/img/projects/mdp/mdp-x-MY-02.webp",
    "/img/projects/mdp/mdp-x-MY-03.webp",
    "/img/projects/mdp/mdp-celular-mockup.webp",
    "/img/projects/mdp/mdp-x-MY-04.webp",
    "/img/projects/mdp/mdp-x-MY-05.webp",
    "/img/projects/mdp/mdp-laptop-mockup.webp",
    "/img/projects/mdp/mdp-x-MY-06b.webp",
    "/img/projects/mdp/mdp-escena-mockup.webp",
    "/img/projects/mdp/mdp-x-MY-08.webp",
  ],
  imagesEn: [
    "/img/projects/mdp/mdp-x-MY-02.webp",
    "/img/projects/mdp/mdp-x-MY-03-en.webp",
    "/img/projects/mdp/mdp-celular-mockup.webp",
    "/img/projects/mdp/mdp-x-MY-04.webp",
    "/img/projects/mdp/mdp-x-MY-05-en.webp",
    "/img/projects/mdp/mdp-laptop-mockup.webp",
    "/img/projects/mdp/mdp-x-MY-06b-en.webp",
    "/img/projects/mdp/mdp-escena-mockup.webp",
    "/img/projects/mdp/mdp-x-MY-08.webp",
  ],
  story: mdpStory,
};

/** pixeled-flexies-vol-1, told in chapters (Nov 2026 refresh, collections template). */
const pixeledFlexiesVol1Story: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "Mis personajes flexibles, en diez piezas de píxel.",
      en: "My flexible characters, in ten pixel pieces."
    }
  },
  chapters: [
    {
      id: "coleccion",
      label: {
        es: "La colección",
        en: "The collection"
      },
      heading: {
        es: "Mi primer drop en Solana.",
        en: "My first drop on Solana."
      },
      text: {
        es: "Pixeled Flexies Vol. 1 fue mi primer drop en Solana, en 2023, y es el World 01 del Mollyverse. Agarré mis personajes flexibles, los de cuello largo y brazos que se enroscan, y los pasé a píxel. Eran diez piezas, todas 1/1. El reto era que cada una se sintiera como una persona distinta con muy pocos píxeles.",
        en: "Pixeled Flexies Vol. 1 was my first drop on Solana, back in 2023, and it's World 01 of the Mollyverse. I took my flexible characters, the ones with long necks and arms that curl, and turned them into pixels. Ten pieces, every one a 1/1. The challenge was making each one feel like a different person with very few pixels."
      },
      blocks: [
        {
          kind: "stats",
          items: [
            {
              value: "10",
              label: {
                es: "piezas, todas 1/1 y Legendary",
                en: "pieces, every one a 1/1 and Legendary"
              }
            },
            {
              value: "73",
              label: {
                es: "variantes dibujadas a mano, en 10 categorías",
                en: "hand-drawn variations, across 10 categories"
              }
            },
            {
              value: "0,05 SOL",
              label: {
                es: "una por wallet, agotada",
                en: "one per wallet, sold out"
              }
            }
          ]
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-celular.webp",
            title: {
              es: "La ficha de una pieza en la app",
              en: "A piece's page in the app"
            },
            detail: {
              es: "Pixeled Flexy #10",
              en: "Pixeled Flexy #10"
            }
          }
        }
      ]
    },
    {
      id: "personaje",
      label: {
        es: "El personaje",
        en: "The character"
      },
      heading: {
        es: "Los Flexies, en píxel.",
        en: "The Flexies, in pixels."
      },
      text: {
        es: "Los Flexies son mis personajes de siempre: cuellos larguísimos, cuerpos como tubos y brazos que se enroscan. Con esta colección quise ver si sobrevivían al píxel. Los diez saludan igual, con el brazo en espiral y la mano haciendo la paz, y lo demás cambia: el pelo, la ropa, los tenis y hasta uno que es un alien.",
        en: "The Flexies are my characters from way back: super long necks, tube bodies and arms that curl. With this collection I wanted to see if they'd survive being pixels. All ten wave the same way, spiral arm up and fingers making a peace sign, and everything else changes: the hair, the clothes, the sneakers, and one of them is even an alien."
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: {
            es: "Las diez",
            en: "All ten"
          },
          items: [
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-especial-1.webp",
              title: {
                es: "Pixeled Flexy #1",
                en: "Pixeled Flexy #1"
              },
              detail: {
                es: "1/1 · Legendary",
                en: "1/1 · Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-especial-2.webp",
              title: {
                es: "Pixeled Flexy #2",
                en: "Pixeled Flexy #2"
              },
              detail: {
                es: "1/1 · Legendary",
                en: "1/1 · Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-especial-3.webp",
              title: {
                es: "Pixeled Flexy #3",
                en: "Pixeled Flexy #3"
              },
              detail: {
                es: "1/1 · Legendary",
                en: "1/1 · Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-especial-4.webp",
              title: {
                es: "Pixeled Flexy #4",
                en: "Pixeled Flexy #4"
              },
              detail: {
                es: "1/1 · Legendary",
                en: "1/1 · Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-especial-5.webp",
              title: {
                es: "Pixeled Flexy #5",
                en: "Pixeled Flexy #5"
              },
              detail: {
                es: "1/1 · Legendary",
                en: "1/1 · Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-especial-6.webp",
              title: {
                es: "Pixeled Flexy #6",
                en: "Pixeled Flexy #6"
              },
              detail: {
                es: "1/1 · Legendary",
                en: "1/1 · Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-especial-7.webp",
              title: {
                es: "Pixeled Flexy #7",
                en: "Pixeled Flexy #7"
              },
              detail: {
                es: "1/1 · Legendary",
                en: "1/1 · Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-especial-8.webp",
              title: {
                es: "Pixeled Flexy #8",
                en: "Pixeled Flexy #8"
              },
              detail: {
                es: "1/1 · Legendary",
                en: "1/1 · Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-especial-9.webp",
              title: {
                es: "Pixeled Flexy #9",
                en: "Pixeled Flexy #9"
              },
              detail: {
                es: "1/1 · Legendary",
                en: "1/1 · Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-especial-10.webp",
              title: {
                es: "Pixeled Flexy #10",
                en: "Pixeled Flexy #10"
              },
              detail: {
                es: "1/1 · Legendary",
                en: "1/1 · Legendary"
              }
            }
          ]
        }
      ]
    },
    {
      id: "detalles",
      label: {
        es: "Los detalles",
        en: "The details"
      },
      heading: {
        es: "Diez combinaciones, diez 1/1.",
        en: "Ten combinations, ten 1/1s."
      },
      text: {
        es: "Cada rasgo lo dibujé a mano, píxel por píxel, y cada una de las diez combinaciones es única: por eso las diez son 1/1. El mint fue al azar y de una por wallet, así que cada Flexy terminó con una persona distinta. Ahí empezó el Mollyverse, y lo que aprendí aquí es lo que después se volvió el sistema de rasgos de Vol. 2.",
        en: "I drew every trait by hand, pixel by pixel, and each of the ten combinations is unique, which is why all ten are 1/1s. The mint was random and one per wallet, so every Flexy ended up with a different person. That's where the Mollyverse started, and what I learned here is what later became the trait system in Vol. 2."
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: {
            desktop: 4,
            phone: 2
          },
          ratio: "1/1",
          items: [
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-detalle-1.webp",
              title: {
                es: "Pixeled Flexy #1",
                en: "Pixeled Flexy #1"
              },
              detail: {
                es: "El brazo en espiral",
                en: "The spiral arm"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-detalle-3.webp",
              title: {
                es: "Pixeled Flexy #3",
                en: "Pixeled Flexy #3"
              },
              detail: {
                es: "El sombrero de copa",
                en: "The top hat"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-detalle-4.webp",
              title: {
                es: "Pixeled Flexy #4",
                en: "Pixeled Flexy #4"
              },
              detail: {
                es: "El alien",
                en: "The alien"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-detalle-6.webp",
              title: {
                es: "Pixeled Flexy #6",
                en: "Pixeled Flexy #6"
              },
              detail: {
                es: "El flattop y la cinta",
                en: "The flattop and the headband"
              }
            }
          ]
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-laptop.webp",
            title: {
              es: "La colección en la app",
              en: "The collection in the app"
            },
            detail: {
              es: "Galería",
              en: "Gallery"
            }
          }
        }
      ]
    }
  ],
  closing: {
    image: {
      src: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-escena.webp",
      title: {
        es: "Las piezas, impresas",
        en: "The pieces, printed"
      },
      detail: {
        es: "Las diez, en papel de algodón",
        en: "All ten, on cotton paper"
      }
    }
  }
};

const pixeledFlexiesVol1Project: Project = {
  slug: "pixeled-flexies-vol-1",
  title: "Pixeled Flexies Vol. 1",
  client: "Mollyverse",
  year: "2023",
  role: "Pixel art, personajes y dirección de arte",
  roleEn: "Pixel art, characters and art direction",
  scope: ["Pixel art", "Título", "Personajes 1/1", "Mint"],
  scopeEn: ["Pixel art", "Title", "1/1 characters", "Mint"],
  gridLabel: "Colección NFT · Pixel art",
  gridLabelEn: "NFT collection · Pixel art",
  brief: "Pixeled Flexies Vol. 1 fue mi primer drop en Solana, en 2023, y es el World 01 del Mollyverse. Agarré mis personajes flexibles, los de cuello largo y brazos que se enroscan, y los pasé a píxel. Eran diez piezas, todas 1/1. El reto era que cada una se sintiera como una persona distinta con muy pocos píxeles.",
  briefEn: "Pixeled Flexies Vol. 1 was my first drop on Solana, back in 2023, and it's World 01 of the Mollyverse. I took my flexible characters, the ones with long necks and arms that curl, and turned them into pixels. Ten pieces, every one a 1/1. The challenge was making each one feel like a different person with very few pixels.",
  shipped: [
    "El Flexy en píxel, con su cuello largo y el brazo en espiral, y el título de la colección tal como lo lleva la app.",
    "Diez personajes 1/1 dibujados a mano, píxel por píxel, con 73 variantes en 10 categorías.",
    "Las diez piezas, todas Legendary, cada una con su propio color de fondo.",
    "La página de la colección, una ficha por pieza y el mint en la app del Mollyverse.",
  ],
  shippedEn: [
    "The pixel Flexy, with its long neck and spiral arm, and the collection's title as the app carries it.",
    "Ten 1/1 characters drawn by hand, pixel by pixel, with 73 variations across 10 categories.",
    "All ten pieces, every one Legendary, each with its own background colour.",
    "The collection page, a page for every piece and the mint in the Mollyverse app.",
  ],
  outcome: ["Salió en 2023 y volvió en mayo de 2026 en la app, a 0,05 SOL y una por wallet. Se agotó."],
  outcomeEn: ["It came out in 2023 and came back to the app in May 2026, at 0.05 SOL and one per wallet. It sold out."],
  credits: [
    "Arte, generador, app y mint: Molly Yllom, con ayuda de Kelvin y herramientas de IA",
  ],
  creditsEn: [
    "Art, generator, app and mint: Molly Yllom, with help from Kelvin and AI tools",
  ],
  portfolioImage: "/img/projects/pixeled-flexies-vol-1/pfv1-personajes.mp4",
  heroImage: "/img/projects/pixeled-flexies-vol-1/piezas/pfv1-portada.webp",
  paragraphs: [
    "Los Flexies son mis personajes de siempre: cuellos larguísimos, cuerpos como tubos y brazos que se enroscan. Con esta colección quise ver si sobrevivían al píxel. Los diez saludan igual, con el brazo en espiral y la mano haciendo la paz, y lo demás cambia: el pelo, la ropa, los tenis y hasta uno que es un alien.",
    "Cada rasgo lo dibujé a mano, píxel por píxel, y cada una de las diez combinaciones es única: por eso las diez son 1/1. El mint fue al azar y de una por wallet, así que cada Flexy terminó con una persona distinta. Ahí empezó el Mollyverse, y lo que aprendí aquí es lo que después se volvió el sistema de rasgos de Vol. 2.",
  ],
  paragraphsEn: [
    "The Flexies are my characters from way back: super long necks, tube bodies and arms that curl. With this collection I wanted to see if they'd survive being pixels. All ten wave the same way, spiral arm up and fingers making a peace sign, and everything else changes: the hair, the clothes, the sneakers, and one of them is even an alien.",
    "I drew every trait by hand, pixel by pixel, and each of the ten combinations is unique, which is why all ten are 1/1s. The mint was random and one per wallet, so every Flexy ended up with a different person. That's where the Mollyverse started, and what I learned here is what later became the trait system in Vol. 2.",
  ],
  images: [
    "/img/projects/pixeled-flexies-vol-1/pfv1-x-MY-02.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-x-MY-03.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-celular-mockup.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-x-MY-04.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-x-MY-05.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-laptop-mockup.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-x-MY-08.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-escena-mockup.webp",
  ],
  imagesEn: [
    "/img/projects/pixeled-flexies-vol-1/pfv1-x-MY-02.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-x-MY-03-en.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-celular-mockup.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-x-MY-04.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-x-MY-05-en.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-laptop-mockup.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-x-MY-08.webp",
    "/img/projects/pixeled-flexies-vol-1/pfv1-escena-mockup.webp",
  ],
  story: pixeledFlexiesVol1Story,
};

/** pixeled-flexies-vol-2, told in chapters (Nov 2026 refresh, collections template). */
const pixeledFlexiesVol2Story: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "Cien Flexies y mi primer sistema de rasgos.",
      en: "A hundred Flexies and my first trait system."
    }
  },
  origin: {
    label: {
      es: "Así empezó",
      en: "Where it began"
    },
    heading: {
      es: "Del cuerpo a la pieza.",
      en: "From the body to the piece."
    },
    before: {
      src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-origen-antes.webp",
      title: {
        es: "Fondo y cuerpo",
        en: "Background and body"
      },
      detail: {
        es: "Las dos primeras capas",
        en: "The first two layers"
      }
    },
    after: {
      src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-origen-despues.webp",
      title: {
        es: "Pixeled Flexy #17",
        en: "Pixeled Flexy #17"
      },
      detail: {
        es: "Legendary",
        en: "Legendary"
      }
    }
  },
  chapters: [
    {
      id: "coleccion",
      label: {
        es: "La colección",
        en: "The collection"
      },
      heading: {
        es: "Mi primer sistema de rasgos.",
        en: "My first trait system."
      },
      text: {
        es: "Pixeled Flexies Vol. 2 es el World 02 del Mollyverse y salió en 2023, justo después de Vol. 1. Ahí armé mi primer sistema de rasgos completo, desde cero: 100 Flexies que salen de combinar rasgos dibujados a mano. El reto era que el sistema no les quitara la gracia y que cada Flexy tuviera su propia personalidad.",
        en: "Pixeled Flexies Vol. 2 is World 02 of the Mollyverse and came out in 2023, right after Vol. 1. It's where I built my first full trait system, from scratch: 100 Flexies made by combining hand-drawn traits. The challenge was keeping the system from taking the charm away, so every Flexy had its own personality."
      },
      blocks: [
        {
          kind: "stats",
          items: [
            {
              value: "100",
              label: {
                es: "piezas en cuatro rarezas",
                en: "pieces in four rarities"
              }
            },
            {
              value: "139",
              label: {
                es: "variantes dibujadas a mano, en 8 categorías",
                en: "hand-drawn variations, across 8 categories"
              }
            },
            {
              value: "0,03 SOL",
              label: {
                es: "mint al azar, hasta tres por wallet",
                en: "random mint, up to three per wallet"
              }
            }
          ]
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-celular.webp",
            title: {
              es: "La ficha de una pieza en la app",
              en: "A piece's page in the app"
            },
            detail: {
              es: "Pixeled Flexy #17",
              en: "Pixeled Flexy #17"
            }
          }
        }
      ]
    },
    {
      id: "personaje",
      label: {
        es: "El personaje",
        en: "The character"
      },
      heading: {
        es: "El cuello en S.",
        en: "The S-shaped neck."
      },
      text: {
        es: "Después de Vol. 1 quise que los Flexies se movieran más. Aquí el cuello se dobla en S, la cabeza queda de lado y la mano se abre como saludando. Cada fondo lleva un rombo de líneas finas que lo encierra, como si fuera un marco.",
        en: "After Vol. 1 I wanted the Flexies to move more. Here the neck bends into an S, the head turns sideways and the hand opens like it's waving. Every background has a diamond of fine lines around it, like a frame."
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: {
            es: "Legendary",
            en: "Legendary"
          },
          items: [
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-especial-1.webp",
              title: {
                es: "#1",
                en: "#1"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-especial-6.webp",
              title: {
                es: "#6",
                en: "#6"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-especial-17.webp",
              title: {
                es: "#17",
                en: "#17"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-especial-52.webp",
              title: {
                es: "#52",
                en: "#52"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-especial-63.webp",
              title: {
                es: "#63",
                en: "#63"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            }
          ]
        }
      ]
    },
    {
      id: "sistema",
      label: {
        es: "El sistema",
        en: "The system"
      },
      heading: {
        es: "139 rasgos, todos a mano.",
        en: "139 traits, all by hand."
      },
      text: {
        es: "Fue mi primera vez armando un sistema de rasgos completo. Dibujé cada rasgo a mano, cuerpos, ojos, bocas, pelos, ropa y accesorios, y el generador los combinó en 100 piezas. Lo difícil fue decidir qué rasgos podían ir juntos para que ninguno se viera como un error. Lo que aprendí aquí lo usé después en MDP y The Unhinged.",
        en: "It was my first time building a full trait system. I drew every trait by hand, bodies, eyes, mouths, hair, clothes and accessories, and the generator combined them into 100 pieces. The hard part was deciding which traits could go together so none of them looked like a mistake. What I learned here is what I used later on MDP and The Unhinged."
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: {
            desktop: 4,
            phone: 2
          },
          ratio: "1/1",
          fit: "contain",
          items: [
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-capa-01-background.webp",
              title: {
                es: "Fondo",
                en: "Background"
              },
              detail: {
                es: "17 variantes",
                en: "17 variations"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-capa-02-body.webp",
              title: {
                es: "Cuerpo",
                en: "Body"
              },
              detail: {
                es: "19 variantes",
                en: "19 variations"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-capa-03-hair.webp",
              title: {
                es: "Pelo",
                en: "Hair"
              },
              detail: {
                es: "20 variantes",
                en: "20 variations"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-capa-04-accessory.webp",
              title: {
                es: "Accesorio",
                en: "Accessory"
              },
              detail: {
                es: "20 variantes",
                en: "20 variations"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-capa-05-eyes.webp",
              title: {
                es: "Ojos",
                en: "Eyes"
              },
              detail: {
                es: "20 variantes",
                en: "20 variations"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-capa-06-mouth.webp",
              title: {
                es: "Boca",
                en: "Mouth"
              },
              detail: {
                es: "16 variantes",
                en: "16 variations"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-capa-07-face.webp",
              title: {
                es: "Cara",
                en: "Face"
              },
              detail: {
                es: "13 variantes",
                en: "13 variations"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-capa-08-outfit.webp",
              title: {
                es: "Ropa",
                en: "Outfit"
              },
              detail: {
                es: "14 variantes",
                en: "14 variations"
              }
            }
          ]
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-laptop.webp",
            title: {
              es: "La colección en la app",
              en: "The collection in the app"
            },
            detail: {
              es: "Galería",
              en: "Gallery"
            }
          }
        }
      ]
    },
    {
      id: "piezas",
      label: {
        es: "Las piezas",
        en: "The pieces"
      },
      heading: {
        es: "Diez Legendary entre cien.",
        en: "Ten Legendary out of a hundred."
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: {
            es: "Las otras cinco Legendary",
            en: "The other five Legendary"
          },
          items: [
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-especial-67.webp",
              title: {
                es: "#67",
                en: "#67"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-especial-71.webp",
              title: {
                es: "#71",
                en: "#71"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-especial-73.webp",
              title: {
                es: "#73",
                en: "#73"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-especial-77.webp",
              title: {
                es: "#77",
                en: "#77"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-especial-88.webp",
              title: {
                es: "#88",
                en: "#88"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            }
          ]
        },
        {
          kind: "wall",
          width: "wide",
          columns: {
            desktop: 6,
            phone: 3
          },
          ratio: "1/1",
          items: [
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-0.webp",
              title: {
                es: "#0",
                en: "#0"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-2.webp",
              title: {
                es: "#2",
                en: "#2"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-3.webp",
              title: {
                es: "#3",
                en: "#3"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-4.webp",
              title: {
                es: "#4",
                en: "#4"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-5.webp",
              title: {
                es: "#5",
                en: "#5"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-7.webp",
              title: {
                es: "#7",
                en: "#7"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-8.webp",
              title: {
                es: "#8",
                en: "#8"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-9.webp",
              title: {
                es: "#9",
                en: "#9"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-10.webp",
              title: {
                es: "#10",
                en: "#10"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-11.webp",
              title: {
                es: "#11",
                en: "#11"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-12.webp",
              title: {
                es: "#12",
                en: "#12"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-13.webp",
              title: {
                es: "#13",
                en: "#13"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-14.webp",
              title: {
                es: "#14",
                en: "#14"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-15.webp",
              title: {
                es: "#15",
                en: "#15"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-16.webp",
              title: {
                es: "#16",
                en: "#16"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-19.webp",
              title: {
                es: "#19",
                en: "#19"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-20.webp",
              title: {
                es: "#20",
                en: "#20"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-21.webp",
              title: {
                es: "#21",
                en: "#21"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-22.webp",
              title: {
                es: "#22",
                en: "#22"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-23.webp",
              title: {
                es: "#23",
                en: "#23"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-24.webp",
              title: {
                es: "#24",
                en: "#24"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-26.webp",
              title: {
                es: "#26",
                en: "#26"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-27.webp",
              title: {
                es: "#27",
                en: "#27"
              }
            },
            {
              src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-pieza-28.webp",
              title: {
                es: "#28",
                en: "#28"
              }
            }
          ]
        }
      ]
    }
  ],
  closing: {
    image: {
      src: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-escena.webp",
      title: {
        es: "Las piezas, impresas",
        en: "The pieces, printed"
      },
      detail: {
        es: "Tres Legendary en la caja de archivo",
        en: "Three Legendary in the archive box"
      }
    }
  }
};

const pixeledFlexiesVol2Project: Project = {
  slug: "pixeled-flexies-vol-2",
  title: "Pixeled Flexies Vol. 2",
  client: "Mollyverse",
  year: "2023",
  role: "Pixel art, sistema generativo y dirección de arte",
  roleEn: "Pixel art, generative system and art direction",
  scope: ["Pixel art", "Título", "Sistema de rasgos", "Arte generativo", "Mint"],
  scopeEn: ["Pixel art", "Title", "Trait system", "Generative art", "Mint"],
  gridLabel: "Colección NFT · Pixel art",
  gridLabelEn: "NFT collection · Pixel art",
  brief: "Pixeled Flexies Vol. 2 es el World 02 del Mollyverse y salió en 2023, justo después de Vol. 1. Ahí armé mi primer sistema de rasgos completo, desde cero: 100 Flexies que salen de combinar rasgos dibujados a mano. El reto era que el sistema no les quitara la gracia y que cada Flexy tuviera su propia personalidad.",
  briefEn: "Pixeled Flexies Vol. 2 is World 02 of the Mollyverse and came out in 2023, right after Vol. 1. It's where I built my first full trait system, from scratch: 100 Flexies made by combining hand-drawn traits. The challenge was keeping the system from taking the charm away, so every Flexy had its own personality.",
  shipped: [
    "Un Flexy nuevo en píxel, con el cuello en S y la cabeza de lado, y el título de la colección tal como lo lleva la app.",
    "139 variantes dibujadas a mano, píxel por píxel, en 8 categorías.",
    "100 piezas en cuatro rarezas: 10 Legendary, 20 Epic, 30 Rare y 40 Common.",
    "La página de la colección, una ficha por pieza y el mint en la app del Mollyverse.",
  ],
  shippedEn: [
    "A new pixel Flexy, with an S-shaped neck and its head turned sideways, and the collection's title as the app carries it.",
    "139 variations drawn by hand, pixel by pixel, across 8 categories.",
    "100 pieces in four rarities: 10 Legendary, 20 Epic, 30 Rare and 40 Common.",
    "The collection page, a page for every piece and the mint in the Mollyverse app.",
  ],
  outcome: ["Salió en 2023 y desde mayo de 2026 se mintea en la app, al azar, a 0,03 SOL y hasta tres por wallet."],
  outcomeEn: ["It came out in 2023 and since May 2026 it mints in the app, at random, at 0.03 SOL and up to three per wallet."],
  credits: [
    "Arte, generador, app y mint: Molly Yllom, con ayuda de Kelvin y herramientas de IA",
  ],
  creditsEn: [
    "Art, generator, app and mint: Molly Yllom, with help from Kelvin and AI tools",
  ],
  portfolioImage: "/img/projects/pixeled-flexies-vol-2/pfv2-personajes.mp4",
  heroImage: "/img/projects/pixeled-flexies-vol-2/piezas/pfv2-portada.webp",
  paragraphs: [
    "Después de Vol. 1 quise que los Flexies se movieran más. Aquí el cuello se dobla en S, la cabeza queda de lado y la mano se abre como saludando. Cada fondo lleva un rombo de líneas finas que lo encierra, como si fuera un marco.",
    "Fue mi primera vez armando un sistema de rasgos completo. Dibujé cada rasgo a mano, cuerpos, ojos, bocas, pelos, ropa y accesorios, y el generador los combinó en 100 piezas. Lo difícil fue decidir qué rasgos podían ir juntos para que ninguno se viera como un error. Lo que aprendí aquí lo usé después en MDP y The Unhinged.",
  ],
  paragraphsEn: [
    "After Vol. 1 I wanted the Flexies to move more. Here the neck bends into an S, the head turns sideways and the hand opens like it's waving. Every background has a diamond of fine lines around it, like a frame.",
    "It was my first time building a full trait system. I drew every trait by hand, bodies, eyes, mouths, hair, clothes and accessories, and the generator combined them into 100 pieces. The hard part was deciding which traits could go together so none of them looked like a mistake. What I learned here is what I used later on MDP and The Unhinged.",
  ],
  images: [
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-02.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-03.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-celular-mockup.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-04.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-05.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-laptop-mockup.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-06b.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-escena-mockup.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-08.webp",
  ],
  imagesEn: [
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-02.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-03-en.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-celular-mockup.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-04.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-05-en.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-laptop-mockup.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-06b-en.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-escena-mockup.webp",
    "/img/projects/pixeled-flexies-vol-2/pfv2-x-MY-08.webp",
  ],
  story: pixeledFlexiesVol2Story,
};

/** FAMA Collective, told in chapters. Con los bloques y el ritmo de F1.2 (guia-migracion-story.md, sección 4). */
const FM = "/img/projects/fama-collective";
const FMP = `${FM}/piezas`;
const fmMolly: Bilingual = { es: "Montaje de Molly", en: "Mockup by Molly" };
const fmWeb: Bilingual = { es: "famacollective.com", en: "famacollective.com" };
const famaStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "La cara de una disquera dominicana, hecha para que brillen los artistas y no la marca.",
      en: "The face of a Dominican record label, built so the artists shine, not the brand.",
    },
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      heading: { es: "Tenían nombre. Les faltaba todo lo demás.", en: "They had a name. Everything else was missing." },
      text: {
        es: "FAMA Collective es un sello boutique y una editorial musical dominicana que acompaña a sus artistas desde abajo. En 2022 tenían el nombre y el wordmark FAMA, que venía del estudio, pero la disquera no tenía nada propio alrededor: ni colores, ni letra, ni una web donde se viera la música. Me tocaba armarle todo eso sin robarle el protagonismo a los artistas, que son los que tienen que brillar.",
        en: "FAMA Collective is a Dominican boutique record label and publishing company that grows its artists from the ground up. In 2022 they had the name and the FAMA wordmark, which came from the studio, but the label had nothing of its own around it: no colors, no type, no website where the music could actually live. My job was to build all of that without stealing the spotlight from the artists, because they're the ones who have to shine.",
      },
      blocks: [
        { kind: "image", size: "bleed", image: { src: `${FMP}/concreto-mockup.webp`, title: { es: "Logo grabado", en: "Engraved logo" }, detail: fmMolly } },
      ],
    },
    {
      id: "logo",
      label: { es: "El logo", en: "The logo" },
      heading: { es: "Una F que cambia de color.", en: "An F that changes color." },
      text: {
        es: "Primero le hice a la disquera su propio logo, partiendo del wordmark FAMA del estudio y sumándole «collective» debajo, espaciado y finito, y una F partida que funciona sola como ícono y cambia de color según la ocasión.",
        en: "First I gave the label a logo of its own, starting from the studio's FAMA wordmark and setting “collective” underneath, thin and widely spaced, plus a split F that works on its own as an icon and changes color depending on the occasion.",
      },
      blocks: [
        { kind: "image", size: "solo", image: { src: `${FMP}/logo-negro.webp`, title: { es: "FAMA collective", en: "FAMA collective" }, detail: { es: "El logo de la disquera", en: "The label's logo" } } },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 4, phone: 2 },
          ratio: "1/1",
          fit: "contain",
          ground: "#F3F1EC",
          items: [
            { src: `${FMP}/icono-amarillo.webp`, title: { es: "Ícono", en: "Icon" }, detail: { es: "Amarillo", en: "Yellow" } },
            { src: `${FMP}/icono-morado.webp`, title: { es: "Ícono", en: "Icon" }, detail: { es: "Violeta", en: "Violet" } },
            { src: `${FMP}/icono-naranja.webp`, title: { es: "Ícono", en: "Icon" }, detail: { es: "Naranja", en: "Orange" } },
            { src: `${FMP}/icono-verde.webp`, title: { es: "Ícono", en: "Icon" }, detail: { es: "Verde menta", en: "Mint green" } },
          ],
        },
      ],
    },
    {
      id: "sistema",
      label: { es: "La línea gráfica", en: "The visual identity" },
      heading: { es: "Negro, blanco y que el color lo ponga la música.", en: "Black, white, and let the music bring the color." },
      text: {
        es: "Después, la idea fue limpiar. Negro y blanco casi siempre, mucho aire, y que el color lo pusiera la música: cada artista, cada portada, cada foto. Para que la marca no se quedara fría le metí textura, unos mármoles líquidos que se mueven como se mueve un sonido, y una letra monoespaciada, de las de código, que acompaña al logo sin pelearse con él.",
        en: "After that, the idea was to clean things up. Black and white almost always, lots of room, and let the music bring the color: each artist, each cover, each photo. So the brand wouldn't go cold, I gave it texture, liquid marbles that move the way sound moves, and a monospaced, code-style face that sits next to the logo without fighting it.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          items: [
            { src: `${FMP}/letra-butler.webp`, title: { es: "Butler Stencil Light", en: "Butler Stencil Light" }, detail: { es: "La letra del logo", en: "The logo's typeface" } },
            { src: `${FMP}/letra-source-code.webp`, title: { es: "Source Code", en: "Source Code" }, detail: { es: "La letra de apoyo", en: "The supporting typeface" } },
          ],
        },
        {
          kind: "palette",   // la base: casi todo vive aquí
          colors: [
            { name: { es: "Negro", en: "Black" }, hex: "#000000" },
            { name: { es: "Blanco", en: "White" }, hex: "#FFFFFF" },
            { name: { es: "Gris", en: "Grey" }, hex: "#9E9E9E" },
          ],
        },
        {
          kind: "palette",   // los acentos: los que usa el ícono F
          colors: [
            { name: { es: "Violeta", en: "Violet" }, hex: "#7500FF" },
            { name: { es: "Amarillo", en: "Yellow" }, hex: "#FFBB1C" },
            { name: { es: "Naranja", en: "Orange" }, hex: "#FF5C30" },
            { name: { es: "Verde menta", en: "Mint green" }, hex: "#00E0AB" },
          ],
        },
        { kind: "image", size: "bleed", image: { src: `${FMP}/textura-marmol.webp`, title: { es: "Textura", en: "Texture" }, detail: { es: "Mármol líquido", en: "Liquid marble" } } },
      ],
    },
    {
      id: "aplicaciones",
      label: { es: "En el mundo", en: "Out in the world" },
      heading: { es: "Del concreto a la camiseta.", en: "From concrete to a T-shirt." },
      text: {
        es: "La marca tenía que aguantar en concreto, en vidrio y en una camiseta. Casi siempre va sola, sin adornos, y el mármol aparece cuando hay espacio para él.",
        en: "The brand had to hold up on concrete, on glass and on a T-shirt. Most of the time it goes alone, no extras, and the marble shows up when there's room for it.",
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "Aplicaciones", en: "Applications" },
          items: [
            { src: `${FMP}/papeleria-mockup.webp`, title: { es: "Papelería", en: "Stationery" }, detail: fmMolly },
            { src: `${FMP}/puerta-mockup.webp`, title: { es: "Puerta de vidrio", en: "Glass door" }, detail: fmMolly },
            { src: `${FMP}/camiseta-tote-mockup.webp`, title: { es: "Camiseta y tote", en: "Tee and tote" }, detail: fmMolly },
            { src: `${FMP}/pared-mockup.webp`, title: { es: "Recepción", en: "Front desk" }, detail: fmMolly },
            { src: `${FMP}/camiseta-modelo-mockup.webp`, title: { es: "Camiseta", en: "T-shirt" }, detail: fmMolly },
            { src: `${FMP}/gorra-mockup.webp`, title: { es: "Gorra", en: "Cap" }, detail: fmMolly },
            { src: `${FMP}/mochila-mockup.webp`, title: { es: "Mochila", en: "Backpack" }, detail: fmMolly },
          ],
        },
      ],
    },
    {
      id: "web",
      label: { es: "La web", en: "The website" },
      heading: { es: "Fondo negro y los artistas a todo lo que da.", en: "Black background, artists as large as they'd go." },
      text: {
        es: "La web salió de ahí mismo: fondo negro, titulares grandes calados y las fotos de los artistas a todo lo que da. Tiene artistas, cultura, merch y un formulario para mandar proyectos, y sigue en línea.",
        en: "The website came straight out of that: black background, big outlined headlines and the artists' photos as large as they'd go. It has artists, culture, merch and a form for sending in projects, and it's still live.",
      },
      blocks: [
        { kind: "image", size: "wide", image: { src: `${FMP}/web-artistas-completa.webp`, title: { es: "Artistas", en: "Artists" }, detail: { es: "La página completa, tal como está en línea", en: "The full page, as it is live" } } },
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "En pantalla", en: "On screen" },
          items: [
            { src: `${FM}/fama-laptop-concreto-mockup.webp`, title: { es: "Laptop", en: "Laptop" }, detail: { es: "Montaje", en: "Mockup" } },
            { src: `${FM}/fama-celular-estudio-mockup.webp`, title: { es: "Celular", en: "Phone" }, detail: { es: "Montaje", en: "Mockup" } },
            { src: `${FM}/fama-laptop-estudio-mockup.webp`, title: { es: "Laptop", en: "Laptop" }, detail: { es: "Montaje", en: "Mockup" } },
          ],
        },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 3, phone: 1 },
          ratio: "16/10",
          items: [
            { src: `${FMP}/web-cultura.webp`, title: { es: "Cultura", en: "Culture" }, detail: fmWeb },
            { src: `${FMP}/web-proyecto.webp`, title: { es: "Manda tu proyecto", en: "Submit your project" }, detail: fmWeb },
            { src: `${FMP}/web-inicio.webp`, title: { es: "Inicio", en: "Home" }, detail: fmWeb },
          ],
        },
      ],
    },
    {
      id: "lanzamiento",
      label: { es: "El lanzamiento", en: "The launch" },
      heading: { es: "Si da buena música, da FAMA.", en: "Si da buena música, da FAMA." },
      text: {
        es: "Después vino el lanzamiento, con videos cortos de una sola frase: el color de los acentos corriendo por dentro de las letras, o un vinilo girando.",
        en: "Then came the launch, with short one-line videos: the accent colors running through the inside of the letters, or a record spinning.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          ratio: "16/9",
          items: [
            { src: `${FM}/fama-kv-si-da-buena-musica.mp4`, title: { es: "Si da buena música, da FAMA", en: "Si da buena música, da FAMA" }, detail: { es: "Video", en: "Video" } },
            { src: `${FM}/fama-kv-for-the-record.mp4`, title: { es: "For the record", en: "For the record" }, detail: { es: "Video", en: "Video" } },
          ],
        },
        { kind: "image", size: "solo", image: { src: `${FM}/fama-kv-enmarcado-mockup.webp`, title: { es: "El KV, enmarcado", en: "The key visual, framed" }, detail: { es: "Montaje", en: "Mockup" } } },
      ],
    },
    {
      id: "studio-a",
      label: { es: "Live From Studio A", en: "Live From Studio A" },
      heading: { es: "Una portada por canción.", en: "One cover per song." },
      text: {
        es: "En 2023 entré al equipo como directora de arte, y una de las primeras cosas fue Live From Studio A, de Tango Whisky Man: una portada para el EP y una por canción, cada una con su color y su ícono.",
        en: "In 2023 I joined the team as art director, and one of the first things I did was Live From Studio A for Tango Whisky Man: one cover for the EP and one per song, each with its own color and icon.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 6, phone: 2 },
          ratio: "1/1",
          items: [
            { src: `${FMP}/twm-ep.webp`, title: { es: "Live From Studio A", en: "Live From Studio A" }, detail: { es: "EP", en: "EP" } },
            { src: `${FMP}/twm-element.webp`, title: { es: "Element", en: "Element" }, detail: { es: "Sencillo", en: "Single" } },
            { src: `${FMP}/twm-no-regret.webp`, title: { es: "No Regret", en: "No Regret" }, detail: { es: "Sencillo", en: "Single" } },
            { src: `${FMP}/twm-saturday.webp`, title: { es: "Saturday", en: "Saturday" }, detail: { es: "Sencillo", en: "Single" } },
            { src: `${FMP}/twm-the-wait.webp`, title: { es: "The Wait", en: "The Wait" }, detail: { es: "Sencillo", en: "Single" } },
            { src: `${FMP}/twm-busy-living.webp`, title: { es: "Busy Living", en: "Busy Living" }, detail: { es: "Sencillo", en: "Single" } },
          ],
        },
        { kind: "image", size: "solo", image: { src: `${FM}/fama-twm-reproductor-mockup.webp`, title: { es: "Reproductor", en: "Player" }, detail: fmMolly } },
      ],
    },
  ],
  closing: {
    image: { src: `${FM}/fama-twm-vinilo-mockup.webp` },
  },
};

const famaProject: Project = {
  slug: "fama-collective",
  title: "FAMA Collective",
  client: "FAMA Collective",
  clientEn: "FAMA Collective",
  year: "2022 - 2023",
  role: "Adaptación del logo, línea gráfica, web y dirección de arte",
  roleEn: "Logo adaptation, visual identity, website and art direction",
  scope: ["Adaptación del logo", "Línea gráfica", "Paleta y tipografía", "Texturas", "Papelería y merch", "Diseño web", "KVs en video", "Portadas"],
  scopeEn: ["Logo adaptation", "Visual identity", "Color and type", "Textures", "Stationery and merch", "Web design", "Video key visuals", "Cover art"],
  gridLabel: "Branding · Web",
  gridLabelEn: "Branding · Web",
  brief: "FAMA Collective es un sello boutique y una editorial musical dominicana que acompaña a sus artistas desde abajo. En 2022 tenían el nombre y el wordmark FAMA, que venía del estudio, pero la disquera no tenía nada propio alrededor: ni colores, ni letra, ni una web donde se viera la música. Me tocaba armarle todo eso sin robarle el protagonismo a los artistas, que son los que tienen que brillar.",
  briefEn: "FAMA Collective is a Dominican boutique record label and publishing company that grows its artists from the ground up. In 2022 they had the name and the FAMA wordmark, which came from the studio, but the label had nothing of its own around it: no colors, no type, no website where the music could actually live. My job was to build all of that without stealing the spotlight from the artists, because they're the ones who have to shine.",
  shipped: [
    "El logo de la disquera, FAMA collective, adaptado del wordmark del estudio, con su ícono F en cuatro colores, y la línea gráfica: negro y blanco de base, cuatro colores de acento, la tipografía complementaria y texturas de mármol líquido.",
    "La papelería y el merch: tarjetas, sobres, camisetas, tote y gorra.",
    "El diseño de famacollective.com, con artistas, cultura, merch y un formulario para mandar proyectos.",
    "Los KVs en video del lanzamiento y las portadas de Live From Studio A, de Tango Whisky Man.",
  ],
  shippedEn: [
    "The label's logo, FAMA collective, adapted from the studio's wordmark, with its F icon in four colors, and the visual identity: black and white at the core, four accent colors, the supporting typeface and liquid-marble textures.",
    "Stationery and merch: cards, envelopes, tees, a tote and a cap.",
    "The design for famacollective.com, with artists, culture, merch and a form for sending in projects.",
    "The launch video key visuals and the covers for Tango Whisky Man's Live From Studio A.",
  ],
  outcome: [
    "La web que diseñé en 2022 sigue en línea en famacollective.com.",
  ],
  outcomeEn: [
    "The website I designed in 2022 is still live at famacollective.com.",
  ],
  credits: ["Adaptación del logo, línea gráfica, web y dirección de arte: Molly Yllom"],
  creditsEn: ["Logo adaptation, visual identity, website and art direction: Molly Yllom"],
  portfolioImage: "/img/projects/fama-collective/fama-cortes.mp4",
  heroImage: "/img/projects/fama-collective/fama-x-MY-01.webp",
  paragraphs: [
    "Primero le hice a la disquera su propio logo, partiendo del wordmark FAMA del estudio y sumándole «collective» debajo, espaciado y finito, y una F partida que funciona sola como ícono y cambia de color según la ocasión. Después, la idea fue limpiar. Negro y blanco casi siempre, mucho aire, y que el color lo pusiera la música: cada artista, cada portada, cada foto. Para que la marca no se quedara fría le metí textura, unos mármoles líquidos que se mueven como se mueve un sonido, y una letra monoespaciada, de las de código, que acompaña al logo sin pelearse con él.",
    "La web salió de ahí mismo: fondo negro, titulares grandes calados y las fotos de los artistas a todo lo que da. Después vino el lanzamiento, con videos cortos como «Si da buena música, da FAMA». En 2023 entré al equipo como directora de arte, y una de las primeras cosas fue Live From Studio A, de Tango Whisky Man: una portada para el EP y una por canción, cada una con su color y su ícono.",
  ],
  paragraphsEn: [
    "First I gave the label a logo of its own, starting from the studio's FAMA wordmark and setting “collective” underneath, thin and widely spaced, plus a split F that works on its own as an icon and changes color depending on the occasion. After that, the idea was to clean things up. Black and white almost always, lots of room, and let the music bring the color: each artist, each cover, each photo. So the brand wouldn't go cold, I gave it texture, liquid marbles that move the way sound moves, and a monospaced, code-style face that sits next to the logo without fighting it.",
    "The website came straight out of that: black background, big outlined headlines and the artists' photos as large as they'd go. Then came the launch, with short videos like “Si da buena música, da FAMA”. In 2023 I joined the team as art director, and one of the first things I did was Live From Studio A for Tango Whisky Man: one cover for the EP and one per song, each with its own color and icon.",
  ],
  story: famaStory,
  images: [
    "/img/projects/fama-collective/fama-logo.webp",
    "/img/projects/fama-collective/fama-icono.webp",
    "/img/projects/fama-collective/fama-x-MY-03-color.webp",
    "/img/projects/fama-collective/fama-x-MY-05-letra.webp",
    "/img/projects/fama-collective/fama-x-MY-06-letra.webp",
    "/img/projects/fama-collective/fama-x-MY-02-concreto.webp",
    "/img/projects/fama-collective/fama-papeleria-mockup.webp",
    "/img/projects/fama-collective/fama-camiseta-tote-mockup.webp",
    "/img/projects/fama-collective/fama-camiseta-modelo-mockup.webp",
    "/img/projects/fama-collective/fama-laptop-estudio-mockup.webp",
    "/img/projects/fama-collective/fama-kv-si-da-buena-musica.mp4",
    "/img/projects/fama-collective/fama-laptop-concreto-mockup.webp",
    "/img/projects/fama-collective/fama-celular-estudio-mockup.webp",
    "/img/projects/fama-collective/fama-twm-reproductor-mockup.webp",
    "/img/projects/fama-collective/fama-twm-sencillos.webp",
    "/img/projects/fama-collective/fama-twm-vinilo-mockup.webp",
    "/img/projects/fama-collective/fama-kv-enmarcado-mockup.webp",
    "/img/projects/fama-collective/fama-kv-for-the-record.mp4",
  ],
};

/** Jubel, told in chapters. Con los bloques y el ritmo de F1.2 (guia-migracion-story.md, sección 4). Las páginas del manual son confidenciales: ESTA es la variante sin ellas (la que sube). */
const JB = "/img/projects/jubel/piezas";
const jbPost: Bilingual = { es: "Post", en: "Post" };
const jbStory: Bilingual = { es: "Story", en: "Story" };
const jubelStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "Una marca para que comprar por internet en RD se sintiera como recibir un regalo.",
      en: "A brand to make buying online in the DR feel like getting a gift.",
    },
    media: "/img/projects/jubel/jubel-logo-animado-hero.mp4",
    ground: "#FAF6F0",
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      heading: { es: "Que dé confianza y que dé alegría.", en: "Trustworthy, and happy about it." },
      text: {
        es: "Jubel nació en 2020 como un marketplace dominicano: las tiendas se afilian y venden desde un solo lugar, y el pedido te llega a la puerta. En plena pandemia, comprar por internet en RD todavía daba desconfianza. La marca tenía que sentirse cercana y alegre, pero también seria, de esas a las que uno le da la tarjeta sin pensarlo mucho.",
        en: "Jubel started in 2020 as a Dominican marketplace: stores sign up and sell from one place, and your order shows up at your door. In the middle of the pandemic, buying online in the DR still made people nervous. The brand had to feel close and cheerful, but also serious, the kind you hand your card to without thinking twice.",
      },
      blocks: [
        { kind: "image", size: "solo", image: { src: `${JB}/logo-sonrisa.webp`, title: { es: "La sonrisa", en: "The smile" }, detail: { es: "La jota y sus dos puntos", en: "The j and its two dots" } } },
      ],
    },
    {
      id: "logo",
      label: { es: "El logo", en: "The logo" },
      heading: { es: "Una jota que sonríe.", en: "A j that smiles." },
      text: {
        es: "El logo vino primero, en 2020. La jota forma dentro de sí una sonrisa, la de quien abre la puerta y le llegó su paquete, y el amarillo y el naranja están ahí por lo mismo: son alegría. Jubel no te vende cosas, te las trae, y eso tenía que notarse desde la primera letra.",
        en: "The logo came first, in 2020. The j holds a smile inside it, the one you make when you open the door and your package is there, and the yellow and the orange are there for the same reason: they're joy. Jubel doesn't sell you things, it brings them to you, and that had to show from the very first letter.",
      },
      blocks: [
        { kind: "image", size: "wide", image: { src: `${JB}/logo-color.webp`, title: { es: "Jubel Market", en: "Jubel Market" }, detail: { es: "A todo color", en: "Full color" } } },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 4, phone: 2 },
          ratio: "4/3",
          fit: "contain",
          ground: "#FAF6F0",
          items: [
            { src: `${JB}/logo-naranja.webp`, title: { es: "A una tinta", en: "One ink" }, detail: { es: "Pantone 151 C", en: "Pantone 151 C" } },
            { src: `${JB}/logo-amarillo.webp`, title: { es: "A una tinta", en: "One ink" }, detail: { es: "Pantone 7409 C", en: "Pantone 7409 C" } },
            { src: `${JB}/logo-negro.webp`, title: { es: "Negro", en: "Black" }, detail: { es: "Para una sola tinta oscura", en: "For a single dark ink" } },
            { src: `${JB}/logo-grises.webp`, title: { es: "Escala de grises", en: "Greyscale" }, detail: { es: "Para impresión sin color", en: "For printing without color" } },
          ],
        },
      ],
    },
    {
      id: "manual",
      label: { es: "El manual", en: "The guidelines" },
      heading: { es: "Las reglas, para que la sonrisa no se tuerza.", en: "The rules, so the smile stays straight." },
      text: {
        es: "En 2021 hicimos el workshop estratégico con el equipo de Jubel, porque antes de armar el manual quería saber bien a quién le estábamos hablando. De ahí salieron 44 páginas: quién es Jubel y cómo habla, y después el logo con su área de seguridad, los colores, la tipografía y cómo se ve en redes.",
        en: "In 2021 we ran a strategy workshop with the Jubel team, because before putting the guidelines together I wanted to know exactly who we were talking to. Forty-four pages came out of it: who Jubel is and how it talks, then the logo with its clear space, the colors, the typeface and how it all looks on social.",
      },
      blocks: [
        {
          kind: "palette",
          colors: [
            { name: { es: "Naranja Jubel", en: "Jubel orange" }, hex: "#FF8300", codes: ["Pantone 151 C", "C0 M60 Y100 K0", "R255 G131 B0"] },
            { name: { es: "Amarillo Jubel", en: "Jubel yellow" }, hex: "#F4B223", codes: ["Pantone 7409 C", "C3 M32 Y98 K0", "R244 G178 B35"] },
            { name: { es: "Amarillo claro", en: "Light yellow" }, hex: "#FFDFAC", codes: ["Pantone 7409 C al 40 %", "C0 M13 Y36 K0", "R255 G223 B172"] },
            { hex: "#E0592A", codes: ["Pantone 7579 C"] },
            { hex: "#D50057", codes: ["Pantone Rubine Red C"] },
            { hex: "#FF40B4", codes: ["Pantone 806 C"] },
            { hex: "#7E57C5", codes: ["Pantone 2665 C"] },
            { hex: "#602651", codes: ["Pantone 7652 C"] },
            { hex: "#2A7DE1", codes: ["Pantone 2727 C"] },
            { hex: "#00ABC8", codes: ["Pantone 3125 C"] },
            { hex: "#006E63", codes: ["Pantone 562 C"] },
            { hex: "#002B49", codes: ["Pantone 7463 C"] },
          ],
        },
      ],
    },
    {
      id: "cajas",
      label: { es: "Las cajas", en: "The boxes" },
      heading: { es: "La caja es lo primero que tocas.", en: "The box is the first thing you touch." },
      text: {
        es: "Una caja de envío es lo primero que uno toca de una tienda en línea, así que la traté como si fuera el producto. La llevamos por tres rondas hasta llegar a esta: kraft, con la línea de la jota corriendo por los lados y una cinta naranja que se ve desde la acera.",
        en: "A shipping box is the first thing you actually touch from an online store, so I treated it like the product. We took it through three rounds to get here: kraft, with the line of the j running down the sides and an orange tape you can spot from the sidewalk.",
      },
      blocks: [
        { kind: "image", size: "bleed", image: { src: `${JB}/cinta.webp`, title: { es: "Cinta de embalaje", en: "Packing tape" }, detail: { es: "La línea de la jota, en continuo", en: "The line of the j, on repeat" } } },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          ratio: "3/2",
          items: [
            { src: `${JB}/cajas-azul-oscuro.webp`, title: { es: "Cajas de envío", en: "Shipping boxes" }, detail: { es: "La misma línea en azul oscuro", en: "The same line in dark blue" } },
            { src: `${JB}/cajas-amarillo.webp`, title: { es: "Cajas de envío", en: "Shipping boxes" }, detail: { es: "Y en amarillo", en: "And in yellow" } },
          ],
        },
      ],
    },
    {
      id: "linea",
      label: { es: "La línea gráfica", en: "The visual line" },
      heading: { es: "La misma línea, ahora alrededor de la gente.", en: "The same line, now around people." },
      text: {
        es: "Para redes, la línea de la jota se suelta del logo y se curva alrededor de las fotos, sobre degradados y círculos, con frases cortas como «Llegó» o «Llévate». El territorio de la marca es «Encajamos cada detalle de tu vida», y cada pieza lo dice a su manera.",
        en: "On social, the line of the j breaks free from the logo and curves around the photos, over gradients and circles, with short phrases like «Llegó» (“It's here”) or «Llévate» (“Take it with you”). The brand's territory is «Encajamos cada detalle de tu vida» (“We fit every detail of your life”), and each piece says it in its own way.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 4, phone: 2 },
          ratio: "1/1",
          items: [
            { src: `${JB}/kv-llego.webp`, title: { es: "Llegó", en: "Llegó" }, detail: jbPost },
            { src: `${JB}/kv-tour.webp`, title: { es: "Tour de Jubel", en: "Tour de Jubel" }, detail: jbPost },
            { src: `${JB}/kv-caja.webp`, title: { es: "La entrega", en: "The delivery" }, detail: jbPost },
            { src: `${JB}/kv-llevate.webp`, title: { es: "Llévate", en: "Llévate" }, detail: jbPost },
          ],
        },
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "Stories", en: "Stories" },
          items: [
            { src: `${JB}/story-playa.webp`, title: { es: "Si tus planes incluyen playa", en: "Si tus planes incluyen playa" }, detail: jbStory },
            { src: `${JB}/story-celebramos.webp`, title: { es: "Hoy celebramos", en: "Hoy celebramos" }, detail: jbStory },
            { src: `${JB}/story-comprueba.webp`, title: { es: "Comprueba", en: "Comprueba" }, detail: jbStory },
          ],
        },
      ],
    },
  ],
  closing: {
    image: { src: `${JB}/afiches-mockup.webp` },
  },
};

const jubelProject: Project = {
  slug: "jubel",
  title: "Jubel",
  client: "Jubel Market",
  year: "2020 - 2021",
  role: "Dirección de arte y diseño",
  roleEn: "Art direction and design",
  scope: ["Workshop estratégico", "Logo", "Manual de marca", "Empaques", "Línea gráfica", "Redes sociales"],
  scopeEn: ["Strategy workshop", "Logo", "Brand guidelines", "Packaging", "Visual line", "Social media"],
  gridLabel: "Logo · Empaques",
  gridLabelEn: "Logo · Packaging",
  brief: "Jubel nació en 2020 como un marketplace dominicano: las tiendas se afilian y venden desde un solo lugar, y el pedido te llega a la puerta. En plena pandemia, comprar por internet en RD todavía daba desconfianza. La marca tenía que sentirse cercana y alegre, pero también seria, de esas a las que uno le da la tarjeta sin pensarlo mucho.",
  briefEn: "Jubel started in 2020 as a Dominican marketplace: stores sign up and sell from one place, and your order shows up at your door. In the middle of the pandemic, buying online in the DR still made people nervous. The brand had to feel close and cheerful, but also serious, the kind you hand your card to without thinking twice.",
  shipped: [
    "El logo, una jota que forma una sonrisa, con su versión Jubel Market y sus colores Pantone.",
    "El workshop estratégico y el manual de marca de 44 páginas, entregado en abril de 2021.",
    "Las cajas de envío y su cinta, en tres rondas hasta la versión final.",
    "La línea gráfica para redes: degradados, círculos y una línea que se curva como el trazo de la jota.",
  ],
  shippedEn: [
    "The logo, a j that holds a smile, plus its Jubel Market version and Pantone colors.",
    "The strategy workshop and the 44-page brand guidelines, delivered in April 2021.",
    "The shipping boxes and their tape, over three rounds to the final version.",
    "The visual line for social: gradients, circles and a line that curves like the stroke of the j.",
  ],
  credits: ["Dirección de arte y diseño: Molly Yllom", "Estrategia: Jessica Molina", "Creatividad: Carlos Núñez"],
  outcome: ["Jubel salió al mercado y las cajas se produjeron con este diseño."],
  creditsEn: ["Art direction and design: Molly Yllom", "Strategy: Jessica Molina", "Creative: Carlos Núñez"],
  outcomeEn: ["Jubel launched, and the boxes went into production with this design."],
  portfolioImage: "/img/projects/jubel/jubel-logo-animado.mp4",
  heroImage: "/img/projects/jubel/jubel-x-MY-01.webp",
  heroMedia: { src: "/img/projects/jubel/jubel-logo-animado-hero.mp4", ground: "#FAF6F0" },
  paragraphs: [
    "El logo vino primero, en 2020: una jota minúscula que forma dentro de sí una sonrisa, la de quien abre la puerta y le llegó su paquete. Jubel no te vende cosas, te las trae, y eso tenía que notarse. Al año siguiente hicimos el workshop estratégico con el equipo de Jubel, porque antes de armar el manual quería saber bien a quién le estábamos hablando, y de ahí salió todo lo demás.",
    "Lo que más disfruté fueron las cajas. Una caja de envío es lo primero que uno toca de una tienda en línea, así que la traté como si fuera el producto. La llevamos por tres rondas: ilustrada, en degradados y, al final, kraft con la línea de la jota corriendo por los lados y una cinta naranja que se ve desde la acera. En redes la misma línea se curva alrededor de las fotos, con frases cortas como «Llegó» o «Encajamos en tu vida».",
  ],
  paragraphsEn: [
    "The logo came first, in 2020: a lowercase j that holds a smile inside it, the one you make when you open the door and your package is there. Jubel doesn't sell you things, it brings them to you, and that had to show. The next year we ran a strategy workshop with the Jubel team, because before putting the guidelines together I wanted to know exactly who we were talking to, and everything else came out of that.",
    "The boxes were my favorite part. A shipping box is the first thing you actually touch from an online store, so I treated it like the product. We took it through three rounds: illustrated, then gradients, and finally kraft with the line of the j running down the sides and an orange tape you can spot from the sidewalk. On social the same line curves around the photos, with short phrases like «Llegó» or «Encajamos en tu vida».",
  ],
  story: jubelStory,
  images: [
    "/img/projects/jubel/piezas/logo-color.webp",
    "/img/projects/jubel/piezas/cajas-azul-oscuro.webp",
    "/img/projects/jubel/piezas/cinta.webp",
    "/img/projects/jubel/piezas/kv-llego.webp",
    "/img/projects/jubel/piezas/kv-tour.webp",
    "/img/projects/jubel/piezas/kv-caja.webp",
    "/img/projects/jubel/piezas/kv-llevate.webp",
    "/img/projects/jubel/piezas/afiches-mockup.webp",
  ],
};

/** thingies, told in chapters (Nov 2026 refresh, collections template). */
const thingiesStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "Doscientos monstruos con la boca abierta.",
      en: "Two hundred monsters with their mouths wide open."
    }
  },
  origin: {
    label: {
      es: "Así empezó",
      en: "Where it began"
    },
    heading: {
      es: "Un cuerpo, doscientas caras.",
      en: "One body, two hundred faces."
    },
    before: {
      src: "/img/projects/thingies/piezas/th-origen-antes.webp",
      title: {
        es: "Fondo y cuerpo",
        en: "Background and body"
      },
      detail: {
        es: "Las dos primeras capas",
        en: "The first two layers"
      }
    },
    after: {
      src: "/img/projects/thingies/piezas/th-origen-despues.webp",
      title: {
        es: "Monster #22",
        en: "Monster #22"
      },
      detail: {
        es: "Legendary",
        en: "Legendary"
      }
    }
  },
  chapters: [
    {
      id: "coleccion",
      label: {
        es: "La colección",
        en: "The collection"
      },
      heading: {
        es: "Un respiro de los Flexies.",
        en: "A break from the Flexies."
      },
      text: {
        es: "Thingies Monsters es el World 03 del Mollyverse y salió en 2024. Después de dos volúmenes de Flexies, que son más serios, quería algo que se riera: 200 monstruos con la boca abierta, exagerados y con mucha personalidad. El reto era salir del píxel sin perder la mano.",
        en: "Thingies Monsters is World 03 of the Mollyverse and came out in 2024. After two volumes of Flexies, which are more serious, I wanted something that laughs: 200 monsters with their mouths wide open, exaggerated and full of personality. The challenge was leaving pixels behind without losing my hand."
      },
      blocks: [
        {
          kind: "stats",
          items: [
            {
              value: "200",
              label: {
                es: "monstruos en cuatro rarezas",
                en: "monsters in four rarities"
              }
            },
            {
              value: "163",
              label: {
                es: "variantes dibujadas a mano, en 8 categorías",
                en: "hand-drawn variations, across 8 categories"
              }
            },
            {
              value: "0,02 SOL",
              label: {
                es: "hasta cinco por wallet, agotada",
                en: "up to five per wallet, sold out"
              }
            }
          ]
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: "/img/projects/thingies/piezas/th-celular.webp",
            title: {
              es: "La ficha de una pieza en la app",
              en: "A piece's page in the app"
            },
            detail: {
              es: "Monster #22",
              en: "Monster #22"
            }
          }
        }
      ]
    },
    {
      id: "personaje",
      label: {
        es: "El personaje",
        en: "The character"
      },
      heading: {
        es: "Todo cambia menos el cuerpo.",
        en: "Everything changes but the body."
      },
      text: {
        es: "Los Thingies nacieron como un respiro de los Flexies. Todos tienen el mismo cuerpo, un trapecio con patas que parecen ir corriendo, y una boca que ocupa media cara. Lo que cambia es todo lo demás: los ojos, el pelo, la lengua, la nariz y unos lentes que a veces son estrellas y a veces corazones.",
        en: "The Thingies were born as a break from the Flexies. They all share the same body, a trapezoid with legs that look like they're running, and a mouth that takes up half the face. Everything else changes: the eyes, the hair, the tongue, the nose, and glasses that are sometimes stars and sometimes hearts."
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: {
            es: "Legendary",
            en: "Legendary"
          },
          items: [
            {
              src: "/img/projects/thingies/piezas/th-especial-115.webp",
              title: {
                es: "#115",
                en: "#115"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-especial-139.webp",
              title: {
                es: "#139",
                en: "#139"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-especial-144.webp",
              title: {
                es: "#144",
                en: "#144"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-especial-154.webp",
              title: {
                es: "#154",
                en: "#154"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-especial-160.webp",
              title: {
                es: "#160",
                en: "#160"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            }
          ]
        }
      ]
    },
    {
      id: "sistema",
      label: {
        es: "El sistema",
        en: "The system"
      },
      heading: {
        es: "Dejé el píxel y dibujé con línea.",
        en: "I left pixels behind and drew with line."
      },
      text: {
        es: "Esta vez dejé el píxel y dibujé con línea. Hice cada rasgo a mano, 163 en total, y el generador solo decidió cómo se combinaban. Los ojos son la categoría más grande, con 50 variantes, porque en un monstruo así la mirada lo cambia todo.",
        en: "This time I left pixels behind and drew with line. I made every trait by hand, 163 in all, and the generator only decided how they came together. The eyes are the biggest category, with 50 variations, because on a monster like this the look changes everything."
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: {
            desktop: 4,
            phone: 2
          },
          ratio: "1/1",
          fit: "contain",
          items: [
            {
              src: "/img/projects/thingies/piezas/th-capa-01-background.webp",
              title: {
                es: "Fondo",
                en: "Background"
              },
              detail: {
                es: "10 variantes",
                en: "10 variations"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-capa-02-body.webp",
              title: {
                es: "Cuerpo",
                en: "Body"
              },
              detail: {
                es: "10 variantes",
                en: "10 variations"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-capa-03-nose.webp",
              title: {
                es: "Nariz",
                en: "Nose"
              },
              detail: {
                es: "10 variantes",
                en: "10 variations"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-capa-04-eyes.webp",
              title: {
                es: "Ojos",
                en: "Eyes"
              },
              detail: {
                es: "50 variantes",
                en: "50 variations"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-capa-05-accessory.webp",
              title: {
                es: "Accesorio",
                en: "Accessory"
              },
              detail: {
                es: "25 variantes",
                en: "25 variations"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-capa-06-mouth.webp",
              title: {
                es: "Boca",
                en: "Mouth"
              },
              detail: {
                es: "9 variantes",
                en: "9 variations"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-capa-07-tongue.webp",
              title: {
                es: "Lengua",
                en: "Tongue"
              },
              detail: {
                es: "9 variantes",
                en: "9 variations"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-capa-08-hair.webp",
              title: {
                es: "Pelo",
                en: "Hair"
              },
              detail: {
                es: "40 variantes",
                en: "40 variations"
              }
            }
          ]
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: "/img/projects/thingies/piezas/th-laptop.webp",
            title: {
              es: "La colección en la app",
              en: "The collection in the app"
            },
            detail: {
              es: "Galería",
              en: "Gallery"
            }
          }
        }
      ]
    },
    {
      id: "piezas",
      label: {
        es: "Las piezas",
        en: "The pieces"
      },
      heading: {
        es: "Veinte Legendary.",
        en: "Twenty Legendary."
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: {
            es: "Más Legendary",
            en: "More Legendary"
          },
          items: [
            {
              src: "/img/projects/thingies/piezas/th-especial-162.webp",
              title: {
                es: "#162",
                en: "#162"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-especial-167.webp",
              title: {
                es: "#167",
                en: "#167"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-especial-178.webp",
              title: {
                es: "#178",
                en: "#178"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-especial-193.webp",
              title: {
                es: "#193",
                en: "#193"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-especial-9.webp",
              title: {
                es: "#9",
                en: "#9"
              },
              detail: {
                es: "Legendary",
                en: "Legendary"
              }
            }
          ]
        },
        {
          kind: "wall",
          width: "wide",
          columns: {
            desktop: 6,
            phone: 3
          },
          ratio: "1/1",
          items: [
            {
              src: "/img/projects/thingies/piezas/th-pieza-0.webp",
              title: {
                es: "#0",
                en: "#0"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-1.webp",
              title: {
                es: "#1",
                en: "#1"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-2.webp",
              title: {
                es: "#2",
                en: "#2"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-3.webp",
              title: {
                es: "#3",
                en: "#3"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-4.webp",
              title: {
                es: "#4",
                en: "#4"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-5.webp",
              title: {
                es: "#5",
                en: "#5"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-6.webp",
              title: {
                es: "#6",
                en: "#6"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-7.webp",
              title: {
                es: "#7",
                en: "#7"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-8.webp",
              title: {
                es: "#8",
                en: "#8"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-10.webp",
              title: {
                es: "#10",
                en: "#10"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-11.webp",
              title: {
                es: "#11",
                en: "#11"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-13.webp",
              title: {
                es: "#13",
                en: "#13"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-14.webp",
              title: {
                es: "#14",
                en: "#14"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-15.webp",
              title: {
                es: "#15",
                en: "#15"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-16.webp",
              title: {
                es: "#16",
                en: "#16"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-17.webp",
              title: {
                es: "#17",
                en: "#17"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-18.webp",
              title: {
                es: "#18",
                en: "#18"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-19.webp",
              title: {
                es: "#19",
                en: "#19"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-41.webp",
              title: {
                es: "#41",
                en: "#41"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-42.webp",
              title: {
                es: "#42",
                en: "#42"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-43.webp",
              title: {
                es: "#43",
                en: "#43"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-44.webp",
              title: {
                es: "#44",
                en: "#44"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-46.webp",
              title: {
                es: "#46",
                en: "#46"
              }
            },
            {
              src: "/img/projects/thingies/piezas/th-pieza-47.webp",
              title: {
                es: "#47",
                en: "#47"
              }
            }
          ]
        }
      ]
    }
  ],
  closing: {
    image: {
      src: "/img/projects/thingies/piezas/th-escena.webp",
      title: {
        es: "Las piezas, impresas",
        en: "The pieces, printed"
      },
      detail: {
        es: "Dos Legendary, #22 y #9",
        en: "Two Legendary, #22 and #9"
      }
    }
  }
};

const thingiesProject: Project = {
  slug: "thingies",
  title: "Thingies Monsters",
  client: "Mollyverse",
  year: "2024",
  role: "Ilustración, sistema generativo y dirección de arte",
  roleEn: "Illustration, generative system and art direction",
  scope: ["Ilustración", "Título", "Sistema de rasgos", "Arte generativo", "Mint"],
  scopeEn: ["Illustration", "Title", "Trait system", "Generative art", "Mint"],
  gridLabel: "Colección NFT · Ilustración",
  gridLabelEn: "NFT collection · Illustration",
  brief: "Thingies Monsters es el World 03 del Mollyverse y salió en 2024. Después de dos volúmenes de Flexies, que son más serios, quería algo que se riera: 200 monstruos con la boca abierta, exagerados y con mucha personalidad. El reto era salir del píxel sin perder la mano.",
  briefEn: "Thingies Monsters is World 03 of the Mollyverse and came out in 2024. After two volumes of Flexies, which are more serious, I wanted something that laughs: 200 monsters with their mouths wide open, exaggerated and full of personality. The challenge was leaving pixels behind without losing my hand.",
  shipped: [
    "El monstruo base, un cuerpo de trapecio con una boca enorme llena de dientes, y el título de la colección tal como lo lleva la app.",
    "163 variantes dibujadas a mano en 8 categorías: 50 ojos, 40 pelos, 25 accesorios y lo demás.",
    "200 piezas en cuatro rarezas: 20 Legendary, 40 Epic, 60 Rare y 80 Common.",
    "La página de la colección, una ficha por pieza y el mint en la app del Mollyverse.",
  ],
  shippedEn: [
    "The base monster, a trapezoid body with a huge mouth full of teeth, and the collection's title as the app carries it.",
    "163 variations drawn by hand across 8 categories: 50 eyes, 40 hairstyles, 25 accessories and the rest.",
    "200 pieces in four rarities: 20 Legendary, 40 Epic, 60 Rare and 80 Common.",
    "The collection page, a page for every piece and the mint in the Mollyverse app.",
  ],
  outcome: ["Salió en 2024 y volvió a la app en mayo de 2026, a 0,02 SOL y hasta cinco por wallet. Se agotó."],
  outcomeEn: ["It came out in 2024 and came back to the app in May 2026, at 0.02 SOL and up to five per wallet. It sold out."],
  credits: [
    "Arte, generador, app y mint: Molly Yllom, con ayuda de Kelvin y herramientas de IA",
  ],
  creditsEn: [
    "Art, generator, app and mint: Molly Yllom, with help from Kelvin and AI tools",
  ],
  portfolioImage: "/img/projects/thingies/th-personajes.mp4",
  heroImage: "/img/projects/thingies/piezas/th-portada.webp",
  paragraphs: [
    "Los Thingies nacieron como un respiro de los Flexies. Todos tienen el mismo cuerpo, un trapecio con patas que parecen ir corriendo, y una boca que ocupa media cara. Lo que cambia es todo lo demás: los ojos, el pelo, la lengua, la nariz y unos lentes que a veces son estrellas y a veces corazones.",
    "Esta vez dejé el píxel y dibujé con línea. Hice cada rasgo a mano, 163 en total, y el generador solo decidió cómo se combinaban. Los ojos son la categoría más grande, con 50 variantes, porque en un monstruo así la mirada lo cambia todo.",
  ],
  paragraphsEn: [
    "The Thingies were born as a break from the Flexies. They all share the same body, a trapezoid with legs that look like they're running, and a mouth that takes up half the face. Everything else changes: the eyes, the hair, the tongue, the nose, and glasses that are sometimes stars and sometimes hearts.",
    "This time I left pixels behind and drew with line. I made every trait by hand, 163 in all, and the generator only decided how they came together. The eyes are the biggest category, with 50 variations, because on a monster like this the look changes everything.",
  ],
  images: [
    "/img/projects/thingies/th-x-MY-02.webp",
    "/img/projects/thingies/th-x-MY-03.webp",
    "/img/projects/thingies/th-celular-mockup.webp",
    "/img/projects/thingies/th-x-MY-04.webp",
    "/img/projects/thingies/th-x-MY-05.webp",
    "/img/projects/thingies/th-laptop-mockup.webp",
    "/img/projects/thingies/th-x-MY-06b.webp",
    "/img/projects/thingies/th-escena-mockup.webp",
    "/img/projects/thingies/th-x-MY-08.webp",
  ],
  imagesEn: [
    "/img/projects/thingies/th-x-MY-02.webp",
    "/img/projects/thingies/th-x-MY-03-en.webp",
    "/img/projects/thingies/th-celular-mockup.webp",
    "/img/projects/thingies/th-x-MY-04.webp",
    "/img/projects/thingies/th-x-MY-05-en.webp",
    "/img/projects/thingies/th-laptop-mockup.webp",
    "/img/projects/thingies/th-x-MY-06b-en.webp",
    "/img/projects/thingies/th-escena-mockup.webp",
    "/img/projects/thingies/th-x-MY-08.webp",
  ],
  story: thingiesStory,
};

const mollyverseProject: Project = {
  slug: "mollyverse",
  title: "Mollyverse",
  client: "Mollyverse",
  year: "2026",
  role: "Fundadora. Marca, producto y dirección de arte",
  roleEn: "Founder. Brand, product and art direction",
  scope: ["Logo", "Sistema de marca", "Diseño de app", "dApp Store", "Web", "Mollyverse Verify"],
  scopeEn: ["Logo", "Brand system", "App design", "dApp Store", "Website", "Mollyverse Verify"],
  gridLabel: "Logo · Diseño de app",
  gridLabelEn: "Logo · App design",
  brief: "El Mollyverse es mi plataforma para lanzar colecciones de arte hechas a mano en Solana. Necesitaba una marca con carácter propio que a la vez le dejara espacio a cada colección para tener su cara. Tenía que verse bien de favicon, de ícono en la tienda del Seeker y de banner en X, y sin caer en la estética cripto de siempre, con sus degradados de neón.",
  briefEn: "The Mollyverse is my platform for launching hand-drawn art collections on Solana. It needed a brand with its own character that still left room for every collection to have its own face. It had to hold up as a favicon, as an icon on the Seeker store and as a banner on X, and stay away from the usual crypto look with its neon gradients.",
  shipped: [
    "El logo con su marco y el símbolo, los íconos de app y el favicon.",
    "La tipografía (Early GameBoy e Inter) y la paleta de noche, violeta, lila y azul.",
    "El diseño de la app: bienvenida, colecciones, cada pieza, mint y el espacio de cada holder.",
    "La ficha de la dApp Store, mollyverse.art, el perfil de @elmollyverso y Mollyverse Verify.",
  ],
  shippedEn: [
    "The logo with its frame and the symbol, the app icons and the favicon.",
    "The type (Early GameBoy and Inter) and a night, violet, lilac and blue palette.",
    "The app design: welcome flow, collections, every piece, mint and a space for each holder.",
    "The dApp Store listing, mollyverse.art, the @elmollyverso profile and Mollyverse Verify.",
  ],
  outcome: ["La app está en la dApp Store de Solana para el Seeker y en la web."],
  outcomeEn: ["The app is live on the Solana dApp Store for the Seeker and on the web."],
  credits: [
    "Marca, diseño de producto, dirección de arte y colecciones: Molly Yllom, con apoyo de Aerosol",
  ],
  creditsEn: [
    "Brand, product design, art direction and collections: Molly Yllom, with support from Aerosol",
  ],
  portfolioImage: "/img/projects/mollyverse/mollyverse-cortes.mp4",
  heroImage: "/img/projects/mollyverse/mollyverse-x-MY-01.webp",
  paragraphs: [
    "El Mollyverse nació porque quería una casa propia para mis colecciones, en vez de un launchpad que se ve igual para todo el mundo. Lo pensé como un sello de música: el sello tiene su cara y su criterio, y cada disco trae su propia portada. Por eso el logo se lee casi como un sello. Un marco, la palabra partida en dos líneas y el símbolo metido dentro de la o de molly.",
    "La marca está hecha de píxeles, igual que las piezas, y los titulares van en una letra de Game Boy para que se note que esto se hizo a mano, cuadrito por cuadrito. El texto va por el otro lado, en Inter, limpio, para que leer no cueste. Con ese sistema diseñé la app que salió en la dApp Store de Solana para el Seeker, la web y Mollyverse Verify, que es por donde cada holder entra a su espacio en Discord.",
  ],
  paragraphsEn: [
    "I started the Mollyverse because I wanted a home of my own for my collections, instead of a launchpad that looks the same for everybody. I thought about it like a record label: the label has a face and a point of view, and every record gets its own cover. That's why the logo reads almost like a stamp. A frame, the word split over two lines, and the symbol tucked inside the o in molly.",
    "The brand is made of pixels, just like the pieces, and the headlines are set in a Game Boy typeface so you can tell it was made by hand, square by square. The body copy goes the other way, in clean Inter, so reading never gets in the way. With that system I designed the app that shipped on the Solana dApp Store for the Seeker, the website, and Mollyverse Verify, which is how every holder gets into their corner of the Discord.",
  ],
  images: [
    "/img/projects/mollyverse/mollyverse-x-MY-02a.webp",
    "/img/projects/mollyverse/mollyverse-celular-mockup.webp",
    "/img/projects/mollyverse/mollyverse-x-MY-02b.webp",
    "/img/projects/mollyverse/mollyverse-laptop-mockup.webp",
    "/img/projects/mollyverse/mollyverse-x-MY-03.webp",
    "/img/projects/mollyverse/mollyverse-mesa-mockup.webp",
    "/img/projects/mollyverse/mollyverse-x-MY-04.webp",
    "/img/projects/mollyverse/mollyverse-demo-tienda.mp4",
    "/img/projects/mollyverse/mollyverse-x-MY-05.webp",
    "/img/projects/mollyverse/mollyverse-x-celular-mockup.webp",
    "/img/projects/mollyverse/mollyverse-x-MY-07.webp",
  ],
  imagesEn: [
    "/img/projects/mollyverse/mollyverse-x-MY-02a.webp",
    "/img/projects/mollyverse/mollyverse-celular-mockup.webp",
    "/img/projects/mollyverse/mollyverse-x-MY-02b.webp",
    "/img/projects/mollyverse/mollyverse-laptop-mockup.webp",
    "/img/projects/mollyverse/mollyverse-x-MY-03-en.webp",
    "/img/projects/mollyverse/mollyverse-mesa-mockup.webp",
    "/img/projects/mollyverse/mollyverse-x-MY-04.webp",
    "/img/projects/mollyverse/mollyverse-demo-tienda.mp4",
    "/img/projects/mollyverse/mollyverse-x-MY-05.webp",
    "/img/projects/mollyverse/mollyverse-x-celular-mockup.webp",
    "/img/projects/mollyverse/mollyverse-x-MY-07.webp",
  ],
};

const RD = "/img/projects/rodai";
const RDP = `${RD}/piezas`;
const rdCara = (i: number, es: string, en: string): StoryImage => ({ src: `${RDP}/cara-${i}.webp`, title: { es, en } });

/**
 * RODAI told in chapters (F3, 27 Nov 2026). Pieces are loose re-exports of the
 * approved panels with no words baked in (`04-portafolio/rodai/piezas-story.py`):
 * the logo halves and the icon on their brand grounds, the turnaround on white,
 * the eight faces cut from the sheet, and the live X header. Chapter headings,
 * the promise and captions are new copy (draft for Molly); chapter texts reuse
 * the approved brief and paragraphs.
 */
const rodaiStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "Una hoja de personaje para que el ROD salga igualito cada vez, en X y en su web nueva.",
      en: "A character sheet so the ROD shows up as himself every single time, on X and on his new website.",
    },
    media: `${RD}/rodai-logo-animado-hero.mp4`,
    ground: "#fb7b57",
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      heading: { es: "Un ROD distinto en cada dibujo.", en: "A different ROD in every drawing." },
      text: {
        es: "RODAI es la memecoin de la familia Aerosol en Solana, y su marca es el ROD: un personaje con greña, gafas oscuras y media sonrisa. Le hice el logo en 2025. Para 2026 el ROD salía todos los días en X, y cada dibujo lo traía un poco distinto: otro pelo, otra boca, otra proporción. Tocaba que fuera siempre el mismo personaje y que la cuenta entera se viera como una sola marca.",
        en: "RODAI is the Aerosol family's memecoin on Solana, and its mark is the ROD: a character with a messy mop of hair, dark shades and a half smile. I made his logo in 2025. By 2026 the ROD was on X every day, and every drawing brought him back a little different: other hair, another mouth, other proportions. He had to be the same character every single time, and the whole account had to look like one brand.",
      },
      blocks: [
        {
          kind: "image",
          size: "bleed",
          image: {
            src: `${RD}/rodai-celular-mockup.webp`,
            title: { es: "La web nueva", en: "The new website" },
            detail: { es: "El ROD de anfitrión, en el termómetro del ATH", en: "The ROD as host, on the ATH thermometer" },
          },
        },
      ],
    },
    {
      id: "logo",
      label: { es: "El logo", en: "The logo" },
      heading: { es: "El ROD con su nombre.", en: "The ROD and his name." },
      text: {
        es: "El logo va en horizontal y apilado, y el «RODAI» mide lo mismo en los dos. Sobre oscuro el ROD va siempre en su placa coral, porque su pelo morado se pierde en el fondo. Esa placa es también su ícono y su avatar, y se sigue leyendo a 16 px.",
        en: "The logo comes horizontal and stacked, with “RODAI” the same size in both. On dark, the ROD always sits on his coral plate, because his purple hair gets lost in the background. That plate is also his icon and his avatar, and it still reads at 16 px.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          items: [
            { src: `${RDP}/logo-claro.webp`, title: { es: "Sobre claro", en: "On light" }, detail: { es: "Horizontal y apilado", en: "Horizontal and stacked" } },
            { src: `${RDP}/logo-oscuro.webp`, title: { es: "Sobre oscuro", en: "On dark" }, detail: { es: "El ROD en su placa coral", en: "The ROD on his coral plate" } },
          ],
        },
        {
          kind: "image",
          size: "wide",
          image: {
            src: `${RDP}/icono.webp`,
            title: { es: "El ícono", en: "The icon" },
            detail: { es: "Solo y en su placa, grande y a 64, 32 y 16 px", en: "On his own and on his plate, large and at 64, 32 and 16 px" },
          },
        },
      ],
    },
    {
      id: "hoja",
      label: { es: "La hoja", en: "The sheet" },
      heading: { es: "Una hoja como de animación.", en: "A sheet like an animated character's." },
      text: {
        es: "Al ROD le sobraba personalidad. Lo que le faltaba era salir igualito cada vez. Por eso le armé una hoja como la de un personaje de animación: de frente, de lado y de espalda, y ocho caras para cualquier noticia que toque contar. Las gafas no se las quita nunca, así que todo lo dice con la boca y con la inclinación de los lentes. Y no tiene piernas: brinca, se desliza o se recuesta.",
        en: "The ROD had personality to spare. What he was missing was looking like himself every time. So I put together a sheet for him the way you would for an animated character: front, side and back, plus eight faces for whatever the news of the day is. He never takes the shades off, so everything he says comes from his mouth and the tilt of his glasses. And he has no legs. He hops, slides or leans.",
      },
      blocks: [
        {
          kind: "stats",
          items: [
            { value: "5", label: { es: "vistas del cuerpo", en: "body views" } },
            { value: "8", label: { es: "expresiones", en: "expressions" } },
          ],
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: `${RDP}/hoja-vistas.webp`,
            title: { es: "El ROD de cuerpo entero", en: "The ROD, full body" },
            detail: { es: "De frente, de lado y de espalda", en: "Front, side and back" },
          },
        },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 4, phone: 2 },
          ratio: "1/1",
          fit: "contain",
          ground: "#ffffff",
          items: [
            rdCara(0, "Contento", "Happy"),
            rdCara(1, "Riéndose", "Laughing"),
            rdCara(2, "Gritando", "Shouting"),
            rdCara(3, "Sorprendido", "Surprised"),
            rdCara(4, "Presumido", "Smug"),
            rdCara(5, "Triste", "Sad"),
            rdCara(6, "Enojado", "Angry"),
            rdCara(7, "Pensando", "Thinking"),
          ],
        },
      ],
    },
    {
      id: "color",
      label: { es: "Color y letra", en: "Color and type" },
      heading: { es: "El cian es del ROD.", en: "The cyan belongs to the ROD." },
      text: {
        es: "Con la hoja lista, las tarjetas se ordenaron casi solas. Cada serie tiene su fondo, las letras van en Rubik y en los colores de Aerosol, y el cian se queda en el ROD, que es de él. A los banners les quité lo de «token oficial de Aerosol» y le di una frase suya, «Bullish on Solana since 2024». Ahora RODAI se presenta solito.",
        en: "Once the sheet was done, the cards pretty much sorted themselves out. Each series gets its own ground, the words go in Rubik and in Aerosol's colors, and the cyan stays on the ROD, because it's his. I took “official meme token of Aerosol” off the banners and gave him a line of his own, “Bullish on Solana since 2024”. RODAI introduces itself now.",
      },
      blocks: [
        {
          kind: "image",
          size: "wide",
          image: {
            src: `${RDP}/banner-x.webp`,
            title: { es: "El header de @rodaimeme", en: "The @rodaimeme header" },
            detail: { es: "En Rubik, con su frase", en: "In Rubik, with his own line" },
          },
        },
        {
          kind: "palette",
          colors: [
            { name: { es: "Coral", en: "Coral" }, hex: "#FB7B56", codes: ["R251 G123 B86"] },
            { name: { es: "Cian", en: "Cyan" }, hex: "#24CAD4", codes: ["R36 G202 B212"] },
            { name: { es: "Cian claro", en: "Light cyan" }, hex: "#5FEDEC", codes: ["R95 G237 B236"] },
            { name: { es: "Morado", en: "Purple" }, hex: "#3C1253", codes: ["R60 G18 B83"] },
          ],
        },
      ],
    },
    {
      id: "web",
      label: { es: "La web", en: "The website" },
      heading: { es: "El ROD de anfitrión.", en: "The ROD as host." },
      text: {
        es: "Todo eso se está volviendo web. La nueva de RODAI está en desarrollo, con el ROD de la hoja haciendo de anfitrión en cada pantalla.",
        en: "All of it is turning into a website. RODAI's new one is still in development, with the ROD from his sheet hosting every screen.",
      },
      blocks: [
        {
          kind: "image",
          size: "bleed",
          image: {
            src: `${RD}/rodai-laptop-mockup.webp`,
            title: { es: "Pump the ROD", en: "Pump the ROD" },
            detail: { es: "La web nueva, en escritorio", en: "The new website, on desktop" },
          },
        },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          items: [
            { src: `${RD}/rodai-seeker-mockup.webp`, title: { es: "En el Seeker", en: "On the Seeker" }, detail: { es: "El teléfono de Solana Mobile", en: "Solana Mobile's phone" } },
            { src: `${RD}/rodai-celular-web-mockup.webp`, title: { es: "De noche", en: "At night" }, detail: { es: "La misma pantalla, en la mano", en: "The same screen, in hand" } },
          ],
        },
      ],
    },
  ],
};

const rodaiProject: Project = {
  slug: "rodai",
  title: "RODAI",
  client: "RODAI, de Aerosol",
  clientEn: "RODAI, by Aerosol",
  year: "2025 - 2026",
  role: "Logo, personaje y dirección de arte",
  roleEn: "Logo, character and art direction",
  scope: ["Logo", "Personaje", "Hoja de personaje", "Sistema de tarjetas", "Banners", "Redes sociales", "Web (en desarrollo)"],
  scopeEn: ["Logo", "Character", "Character sheet", "Card system", "Banners", "Social media", "Website (in development)"],
  gridLabel: "Logo · Personaje",
  gridLabelEn: "Logo · Character",
  brief: "RODAI es la memecoin de la familia Aerosol en Solana, y su marca es el ROD: un personaje con greña, gafas oscuras y media sonrisa. Le hice el logo en 2025. Para 2026 el ROD salía todos los días en X, y cada dibujo lo traía un poco distinto: otro pelo, otra boca, otra proporción. Tocaba que fuera siempre el mismo personaje y que la cuenta entera se viera como una sola marca.",
  briefEn: "RODAI is the Aerosol family's memecoin on Solana, and its mark is the ROD: a character with a messy mop of hair, dark shades and a half smile. I made his logo in 2025. By 2026 the ROD was on X every day, and every drawing brought him back a little different: other hair, another mouth, other proportions. He had to be the same character every single time, and the whole account had to look like one brand.",
  shipped: [
    "El logo, en horizontal y apilado, y el ROD en su placa coral como ícono y avatar.",
    "La hoja del personaje: cinco vistas, ocho expresiones y sus reglas.",
    "Las reglas de las tarjetas de X y los banners con su frase nueva, «Bullish on Solana since 2024».",
    "El diseño de la web nueva de RODAI, todavía en desarrollo.",
  ],
  shippedEn: [
    "The logo, horizontal and stacked, and the ROD on his coral plate as icon and avatar.",
    "The character sheet: five views, eight expressions and the rules that go with them.",
    "The rules for the X cards, and the banners with his new line, “Bullish on Solana since 2024”.",
    "The design for RODAI's new website, still in development.",
  ],
  outcome: ["El header nuevo está en @rodaimeme desde el 28 de octubre de 2026."],
  outcomeEn: ["The new header has been up on @rodaimeme since 28 October 2026."],
  credits: [
    "Logo, personaje y dirección de arte: Molly Yllom",
    "Producto y desarrollo de la web, comunidad y textos de @rodaimeme: equipo de Aerosol",
  ],
  creditsEn: [
    "Logo, character and art direction: Molly Yllom",
    "Product and web development, community and copy for @rodaimeme: the Aerosol team",
  ],
  portfolioImage: "/img/projects/rodai/rodai-logo-animado.mp4",
  heroImage: "/img/projects/rodai/rodai-x-MY-01.webp",
  heroMedia: { src: "/img/projects/rodai/rodai-logo-animado-hero.mp4", ground: "#fb7b57" },
  paragraphs: [
    "Al ROD le sobraba personalidad. Lo que le faltaba era salir igualito cada vez. Por eso le armé una hoja como la de un personaje de animación: de frente, de lado y de espalda, y ocho caras para cualquier noticia que toque contar. Las gafas no se las quita nunca, así que todo lo dice con la boca y con la inclinación de los lentes. Y no tiene piernas: brinca, se desliza o se recuesta.",
    "Con la hoja lista, las tarjetas se ordenaron casi solas. Cada serie tiene su fondo, las letras van en Rubik y en los colores de Aerosol, y el cian se queda en el ROD, que es de él. A los banners les quité lo de «token oficial de Aerosol» y le di una frase suya, «Bullish on Solana since 2024». Ahora RODAI se presenta solito. Y todo eso se está volviendo web: la nueva de RODAI está en desarrollo, con el ROD de la hoja haciendo de anfitrión en cada pantalla.",
  ],
  paragraphsEn: [
    "The ROD had personality to spare. What he was missing was looking like himself every time. So I put together a sheet for him the way you would for an animated character: front, side and back, plus eight faces for whatever the news of the day is. He never takes the shades off, so everything he says comes from his mouth and the tilt of his glasses. And he has no legs. He hops, slides or leans.",
    "Once the sheet was done, the cards pretty much sorted themselves out. Each series gets its own ground, the words go in Rubik and in Aerosol's colors, and the cyan stays on the ROD, because it's his. I took “official meme token of Aerosol” off the banners and gave him a line of his own, “Bullish on Solana since 2024”. RODAI introduces itself now. And all of it is turning into a website: RODAI's new one is still in development, with the ROD from his sheet hosting every screen.",
  ],
  images: [
    "/img/projects/rodai/rodai-x-MY-02a.webp",
    "/img/projects/rodai/rodai-celular-mockup.webp",
    "/img/projects/rodai/rodai-x-MY-02b.webp",
    "/img/projects/rodai/rodai-x-MY-03.webp",
    "/img/projects/rodai/rodai-laptop-mockup.webp",
    "/img/projects/rodai/rodai-x-MY-04.webp",
    "/img/projects/rodai/rodai-seeker-mockup.webp",
    "/img/projects/rodai/rodai-x-MY-05.webp",
    "/img/projects/rodai/rodai-celular-web-mockup.webp",
  ],
  imagesEn: [
    "/img/projects/rodai/rodai-x-MY-02a.webp",
    "/img/projects/rodai/rodai-celular-mockup.webp",
    "/img/projects/rodai/rodai-x-MY-02b.webp",
    "/img/projects/rodai/rodai-x-MY-03.webp",
    "/img/projects/rodai/rodai-laptop-mockup.webp",
    "/img/projects/rodai/rodai-x-MY-04-en.webp",
    "/img/projects/rodai/rodai-seeker-mockup.webp",
    "/img/projects/rodai/rodai-x-MY-05-en.webp",
    "/img/projects/rodai/rodai-celular-web-mockup.webp",
  ],
  story: rodaiStory,
};

const AF = "/img/projects/aerosolification";
const AFP = `${AF}/piezas`;

/**
 * Aerosolification told in chapters (F3, 27 Nov 2026). The four approved
 * paragraphs are reused word for word, split where a chapter needs only part.
 * The process pieces are the loose images behind the approved panels (the ones
 * without chroma green, on #24222F), never enlarged: the rounds are 600 px and
 * stay small. Kelvin and Sofía only appear illustrated (consent, 26 Nov).
 * BORRADOR para Molly: the promise, chapter labels and headings, captions.
 * The cover stays `top` until the sliding cover variant exists.
 */
const aerosolificationStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "Un estilo de retrato mío, convertido en un skill para que cualquiera del equipo entre a mi mundo.",
      en: "A portrait style of mine, turned into a skill so anyone on the team can step into my world.",
    },
  },
  chapters: [
    {
      id: "origen",
      label: { es: "Así empezó", en: "Where it began" },
      heading: { es: "Primero, mi retrato.", en: "First, my own portrait." },
      text: {
        es: "Todo empezó con mi propio retrato. Partí de una foto y de un borrador de IA que me devolvió naranja y de cuerpo entero, y lo redibujé a mano en Illustrator hasta que se pareció a mí y a lo que yo dibujo. Ese redibujo terminó siendo la regla para todos.",
        en: "It all started with my own portrait. I began with a photo and an AI draft that came back orange and full body, and I redrew it by hand in Illustrator until it looked like me and like the way I draw. That redraw ended up being the rule for everyone.",
      },
      blocks: [
        {
          kind: "wall",
          columns: { desktop: 2, phone: 2 },
          items: [
            { src: `${AFP}/origen-foto.webp`, title: { es: "La foto", en: "The photo" } },
            { src: `${AFP}/origen-borrador-ia.webp`, title: { es: "Borrador de IA", en: "AI draft" }, detail: { es: "Descartado", en: "Dropped" } },
          ],
        },
        { kind: "image", size: "solo", image: { src: `${AFP}/origen-redibujo.webp`, title: { es: "Mi redibujo", en: "My redraw" }, detail: { es: "El post del merge de Mollyverse con Aerosol", en: "The Mollyverse x Aerosol merge post" } } },
      ],
    },
    {
      id: "reglas",
      label: { es: "Las reglas", en: "The rules" },
      heading: { es: "Lo que hace que un retrato sea mío.", en: "What makes a portrait mine." },
      text: {
        es: "Antes de pedirle nada a un modelo escribí qué hace que un retrato sea mío: sin nariz, ojos ovalados y altos, nada de contorno negro, colores planos y puntos como única textura, como mi lado rapado.",
        en: "Before asking a model for anything, I wrote down what makes a portrait mine: no nose, tall oval eyes, no black outline, flat colour and dots as the only texture, like my shaved side.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 4, phone: 2 },
          items: [
            { src: `${AFP}/regla-cara.webp`, title: { es: "Sin nariz", en: "No nose" }, detail: { es: "Ojos ovalados y altos, una sonrisa chiquita", en: "Tall oval eyes, one small smile" } },
            { src: `${AFP}/regla-puntos.webp`, title: { es: "Puntos", en: "Dots" }, detail: { es: "La única textura, como mi lado rapado", en: "The only texture, like my shaved side" } },
            { src: `${AFP}/regla-pelo.webp`, title: { es: "Sin contorno negro", en: "No black outline" }, detail: { es: "Solo el pelo lleva una línea, un tono más oscuro", en: "Only the hair gets a line, one shade darker" } },
            { src: `${AFP}/regla-color.webp`, title: { es: "Color plano", en: "Flat colour" }, detail: { es: "Colores planos en todo el retrato", en: "Flat colour across the whole portrait" } },
          ],
        },
        {
          kind: "palette",
          colors: [
            { name: { es: "Noche", en: "Night" }, hex: "#1A1A23" },
            { name: { es: "Ciudad", en: "City" }, hex: "#482190" },
            { name: { es: "Tinta", en: "Ink" }, hex: "#151128" },
            { name: { es: "Crema", en: "Cream" }, hex: "#FCE9D0" },
            { name: { es: "Oro", en: "Gold" }, hex: "#D4A971" },
          ],
        },
      ],
    },
    {
      id: "rondas",
      label: { es: "Las rondas", en: "The rounds" },
      heading: { es: "Cuatro rondas para enseñarle mi mano.", en: "Four rounds to teach it my hand." },
      text: {
        es: "Enseñarle eso a un modelo tomó cuatro rondas. La primera se parecía a Kelvin, pero no a mi dibujo. La segunda le puso mi camisa, mi collar y mis lentes, y de ahí salió una regla que me encanta: mi personaje se usa para el estilo, nunca para la ropa. En la tercera llegó el estilo y se perdieron la barba y los tatuajes, y a la cuarta ronda el estilo ya era mío, con barba y tatuajes. Sofía salió a la primera.",
        en: "Teaching that to a model took four rounds. The first one looked like Kelvin, but not like my drawing. The second put my shirt, my necklace and my glasses on him, and that gave me a rule I love: my character is there for the style, never for the outfit. The third got the style and lost the beard and the tattoos, and by the fourth round the style was mine, beard and tattoos included. Sofía came out right on the first take.",
      },
      blocks: [
        {
          kind: "wall",
          columns: { desktop: 4, phone: 2 },
          items: [
            { src: `${AFP}/ronda-r1.webp`, title: { es: "Ronda 1", en: "Round 1" }, detail: { es: "Contorno y nariz", en: "Outline and nose" } },
            { src: `${AFP}/ronda-r3.webp`, title: { es: "Ronda 3", en: "Round 3" }, detail: { es: "Sin barba ni tatuajes", en: "No beard, no tattoos" } },
            { src: `${AFP}/ronda-r4.webp`, title: { es: "Ronda 4", en: "Round 4" }, detail: { es: "Se queda", en: "Kept" } },
            { src: `${AFP}/ronda-sofia-raw.webp`, title: { es: "Sofía", en: "Sofía" }, detail: { es: "A la primera", en: "First take" } },
          ],
        },
        { kind: "image", size: "bleed", image: { src: `${AF}/aero-cuadros-mockup.webp`, title: { es: "Kelvin, Molly y Sofía", en: "Kelvin, Molly and Sofía" }, detail: { es: "Montaje", en: "Mockup" } } },
      ],
    },
    {
      id: "cuerpo",
      label: { es: "Un solo cuerpo", en: "One body" },
      heading: { es: "Un solo cuerpo, dibujado de una vez.", en: "One body, drawn in one go." },
      text: {
        es: "Después vino lo que hace que se vean como un grupo. Cada render dibujaba su propio cuerpo, así que ahora todos llevan el mío, sacado de mi archivo, y solo cambian la talla y la ropa. Al principio pegaba la cabeza en el cuerpo y arreglaba las uniones con scripts, y cada arreglo rompía otra cosa. Así que cambié el método: el modelo redibuja el montaje entero, de una vez, y queda limpio.",
        en: "Then came the part that makes them look like a group. Every render drew its own body, so now everyone wears mine, taken from my file, and only the size and the clothes change. At first I was pasting the head onto the body and fixing the joins with scripts, and every fix broke something else. So I changed the method: the model redraws the whole montage in one go, and it comes out clean.",
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "Kelvin, paso a paso", en: "Kelvin, step by step" },
          items: [
            { src: `${AFP}/kelvin-1-render.webp`, title: { es: "La cabeza del render", en: "The head from the render" } },
            { src: `${AFP}/kelvin-2-montaje.webp`, title: { es: "Montaje en mi cuerpo", en: "Montage on my body" } },
            { src: `${AFP}/kelvin-3-redibujo.webp`, title: { es: "Redibujo entero", en: "Whole redraw" }, detail: { es: "Se queda", en: "Kept" } },
          ],
        },
      ],
    },
    {
      id: "encuadre",
      label: { es: "El encuadre", en: "The framing" },
      heading: { es: "La misma cabeza para todos.", en: "The same head for everyone." },
      text: {
        es: "Lo mismo con el encuadre: la cabeza de cada quien se mide y se lleva al tamaño y a la altura de la mía.",
        en: "Same with the framing: each person's head is measured and brought to the size and height of mine.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 3, phone: 1 },
          items: [
            { src: `${AFP}/encuadre-molly.webp`, title: { es: "Molly", en: "Molly" }, detail: { es: "Coronilla al 19 %, barbilla al 69 %", en: "Crown at 19%, chin at 69%" } },
            { src: `${AFP}/encuadre-kelvin.webp`, title: { es: "Kelvin", en: "Kelvin" } },
            { src: `${AFP}/encuadre-sofia.webp`, title: { es: "Sofía", en: "Sofía" } },
          ],
        },
        { kind: "image", size: "bleed", image: { src: `${AF}/aero-stickers-mockup.webp`, title: { es: "Los tres, de calcomanía", en: "All three, as stickers" }, detail: { es: "Montaje", en: "Mockup" } } },
      ],
    },
    {
      id: "skill",
      label: { es: "El skill", en: "The skill" },
      heading: { es: "Del método a un skill.", en: "From method to skill." },
      text: {
        es: "Todo eso quedó en aerosolify, un skill para Claude Code. Le das de una a tres fotos y él hace el resto, con dos reglas mías que no se negocian: un cambio por ronda, con su antes y después, y ningún retrato sale sin que yo lo apruebe. Al final, el estilo es mío.",
        en: "All of that went into aerosolify, a Claude Code skill. You give it one to three photos and it does the rest, with two rules of mine that aren't up for debate: one change per round, shown before and after, and no portrait goes out until I approve it. In the end, the style is mine.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 4, phone: 2 },
          items: [
            { src: `${AFP}/sofia-1-render.webp`, title: { es: "1 · La cabeza", en: "1 · The head" } },
            { src: `${AFP}/sofia-2-montaje.webp`, title: { es: "2 · El montaje", en: "2 · The montage" } },
            { src: `${AFP}/sofia-3-redibujo.webp`, title: { es: "3 · El redibujo", en: "3 · The redraw" } },
            { src: `${AFP}/sofia-4-final.webp`, title: { es: "4 · Aprobado", en: "4 · Approved" } },
          ],
        },
        { kind: "image", size: "wide", image: { src: `${AF}/aero-laptop-mockup.webp`, title: { es: "El tablero «Aerosolified»", en: "The “Aerosolified” board" }, detail: { es: "El manual del skill", en: "The skill's manual" } } },
      ],
    },
  ],
  closing: {
    image: { src: `${AF}/aero-x-MY-02.webp`, title: { es: "Los tres, en la ciudad de Aerosol", en: "All three, in Aerosol's city" } },
  },
};

const aerosolificationProject: Project = {
  slug: "aerosolification",
  story: aerosolificationStory,
  title: "Aerosolification",
  client: "Aerosol",
  clientEn: "Aerosol",
  year: "2026",
  role: "Dirección de arte, ilustración y diseño del skill, con herramientas de IA",
  roleEn: "Art direction, illustration and skill design, with AI tools",
  scope: ["Estilo de ilustración", "Retratos del equipo", "Dirección de imagen con IA", "Reglas de estilo", "Skill para Claude Code"],
  scopeEn: ["Illustration style", "Team portraits", "AI image direction", "Style rules", "Claude Code skill"],
  gridLabel: "Ilustración · Skill de IA",
  gridLabelEn: "Illustration · AI skill",
  brief: "Para el post del merge de Mollyverse con Aerosol me hice un retrato: yo, en busto, con mis lentes, mi camisa de fantasmas y la ciudad de noche detrás. Cuando lo vio, Kelvin preguntó si él y Sofía podían tener uno también, y si se podía hacer un skill para eso. Yo no quería tres dibujos sueltos. Quería que cualquiera del equipo pudiera entrar a ese mundito y que se viera dibujado por mí, sin que me tocara redibujar cada retrato a mano.",
  briefEn: "For the Mollyverse x Aerosol merge post I made myself a portrait: me, from the chest up, with my glasses, my ghost shirt and the city at night behind me. When Kelvin saw it he asked if he and Sofía could get one too, and whether there could be a skill for that. I didn't want three separate drawings. I wanted anyone on the team to be able to step into that little world and look like I drew them, without me redrawing every portrait by hand.",
  shipped: [
    "Las reglas del estilo, sacadas de mi retrato: sin nariz, ojos ovalados, sin contorno negro, color plano y puntos.",
    "Un solo cuerpo para todos y un encuadre fijo, con cada cabeza a la medida de la mía.",
    "Los retratos de Kelvin y de Sofía, con la ciudad de Aerosol y con fondo liso.",
    "aerosolify, el skill para Claude Code que hace el retrato con una a tres fotos, y un tablero que sirve de manual.",
  ],
  shippedEn: [
    "The style rules, taken from my own portrait: no nose, oval eyes, no black outline, flat colour and dots.",
    "One body for everyone and a fixed frame, with every head brought to the measure of mine.",
    "Kelvin's and Sofía's portraits, on Aerosol's city and on a plain background.",
    "aerosolify, the Claude Code skill that makes the portrait from one to three photos, and a board that works as a manual.",
  ],
  outcome: ["El skill está en el repo de skills de Aerosol desde el 2 de noviembre de 2026."],
  outcomeEn: ["The skill has been in Aerosol's skills repo since 2 November 2026."],
  credits: [
    "Dirección de arte, ilustración y skill: Molly Yllom, con herramientas de IA bajo su dirección",
  ],
  creditsEn: [
    "Art direction, illustration and skill: Molly Yllom, with AI tools under her direction",
  ],
  portfolioImage: "/img/projects/aerosolification/aero-cortes.mp4",
  heroImage: "/img/projects/aerosolification/aero-x-MY-01.webp",
  heroSwipe: 3,
  paragraphs: [
    "Todo empezó con mi propio retrato. Partí de una foto y de un borrador de IA que me devolvió naranja y de cuerpo entero, y lo redibujé a mano en Illustrator hasta que se pareció a mí y a lo que yo dibujo. Ese redibujo terminó siendo la regla para todos. Antes de pedirle nada a un modelo escribí qué hace que un retrato sea mío: sin nariz, ojos ovalados y altos, nada de contorno negro, colores planos y puntos como única textura, como mi lado rapado.",
    "Enseñarle eso a un modelo tomó cuatro rondas. La primera se parecía a Kelvin, pero no a mi dibujo. La segunda le puso mi camisa, mi collar y mis lentes, y de ahí salió una regla que me encanta: mi personaje se usa para el estilo, nunca para la ropa. En la tercera llegó el estilo y se perdieron la barba y los tatuajes, y a la cuarta ronda el estilo ya era mío, con barba y tatuajes. Sofía salió a la primera.",
    "Después vino lo que hace que se vean como un grupo. Cada render dibujaba su propio cuerpo, así que ahora todos llevan el mío, sacado de mi archivo, y solo cambian la talla y la ropa. Al principio pegaba la cabeza en el cuerpo y arreglaba las uniones con scripts, y cada arreglo rompía otra cosa. Así que cambié el método: el modelo redibuja el montaje entero, de una vez, y queda limpio. Lo mismo con el encuadre: la cabeza de cada quien se mide y se lleva al tamaño y a la altura de la mía.",
    "Todo eso quedó en aerosolify, un skill para Claude Code. Le das de una a tres fotos y él hace el resto, con dos reglas mías que no se negocian: un cambio por ronda, con su antes y después, y ningún retrato sale sin que yo lo apruebe. Al final, el estilo es mío.",
  ],
  paragraphsEn: [
    "It all started with my own portrait. I began with a photo and an AI draft that came back orange and full body, and I redrew it by hand in Illustrator until it looked like me and like the way I draw. That redraw ended up being the rule for everyone. Before asking a model for anything, I wrote down what makes a portrait mine: no nose, tall oval eyes, no black outline, flat colour and dots as the only texture, like my shaved side.",
    "Teaching that to a model took four rounds. The first one looked like Kelvin, but not like my drawing. The second put my shirt, my necklace and my glasses on him, and that gave me a rule I love: my character is there for the style, never for the outfit. The third got the style and lost the beard and the tattoos, and by the fourth round the style was mine, beard and tattoos included. Sofía came out right on the first take.",
    "Then came the part that makes them look like a group. Every render drew its own body, so now everyone wears mine, taken from my file, and only the size and the clothes change. At first I was pasting the head onto the body and fixing the joins with scripts, and every fix broke something else. So I changed the method: the model redraws the whole montage in one go, and it comes out clean. Same with the framing: each person's head is measured and brought to the size and height of mine.",
    "All of that went into aerosolify, a Claude Code skill. You give it one to three photos and it does the rest, with two rules of mine that aren't up for debate: one change per round, shown before and after, and no portrait goes out until I approve it. In the end, the style is mine.",
  ],
  images: [
    "/img/projects/aerosolification/aero-proceso-origen.webp",
    "/img/projects/aerosolification/aero-laptop-mockup.webp",
    "/img/projects/aerosolification/aero-proceso-reglas.webp",
    "/img/projects/aerosolification/aero-proceso-rondas.webp",
    "/img/projects/aerosolification/aero-cuadros-mockup.webp",
    "/img/projects/aerosolification/aero-proceso-cuerpo.webp",
    "/img/projects/aerosolification/aero-proceso-encuadre.webp",
    "/img/projects/aerosolification/aero-stickers-mockup.webp",
    "/img/projects/aerosolification/aero-proceso-skill.webp",
    "/img/projects/aerosolification/aero-x-MY-02.webp",
  ],
  imagesEn: [
    "/img/projects/aerosolification/aero-proceso-origen-en.webp",
    "/img/projects/aerosolification/aero-laptop-mockup.webp",
    "/img/projects/aerosolification/aero-proceso-reglas-en.webp",
    "/img/projects/aerosolification/aero-proceso-rondas-en.webp",
    "/img/projects/aerosolification/aero-cuadros-mockup.webp",
    "/img/projects/aerosolification/aero-proceso-cuerpo-en.webp",
    "/img/projects/aerosolification/aero-proceso-encuadre-en.webp",
    "/img/projects/aerosolification/aero-stickers-mockup.webp",
    "/img/projects/aerosolification/aero-proceso-skill-en.webp",
    "/img/projects/aerosolification/aero-x-MY-02.webp",
  ],
};

const DY = "/img/projects/daydream";
const DYP = `${DY}/piezas`;
const dyScreen = (file: string, es: string, en: string): StoryImage => ({
  src: `${DYP}/pantalla-${file}.webp`,
  title: { es, en },
  detail: { es: "Propuesta de la app", en: "App proposal" },
});
const dyTeaser = (file: string, line: string): StoryImage => ({
  src: `${DYP}/teaser-${file}.webp`,
  title: { es: line, en: line },
  detail: { es: "Teaser del lanzamiento", en: "Launch teaser" },
});

/**
 * Daydream told in chapters (F3, 28 Nov 2026). Loose pieces from
 * `04-portafolio/daydream/piezas-story.py`: the app screens at their native
 * 3x size with only their rounded corners, the four launch teasers as they
 * are, and a type specimen with no labels (the palette panel becomes the
 * `palette` block). The logo plates (02a, 02b, 02c) carry no words and keep
 * their brand grounds. Four of the six videos go in, and only the screens and teasers no other piece already shows: the Window loop, the
 * laptop, horizon and a look inside (app tour already plays on the laptop,
 * and read what you sign repeats the Blocked screen of the terrace).
 * Chapter texts reuse the approved brief and paragraphs; headings, the
 * promise, the launch text and captions are new drafts for Molly.
 */
const daydreamStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "Una wallet de Solana que se siente como mirar por la ventana un día claro.",
      en: "A Solana wallet that feels like looking out the window on a clear day.",
    },
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      heading: { es: "Nada de fantasmas, escudos ni carteras.", en: "No ghosts, no shields, no wallets." },
      text: {
        es: "Daydream es la wallet de Solana que está armando Aerosol, para gente que vive on-chain. El nombre ya lo decía casi todo: soñar despierto, calma, claridad. Me tocaba hacerle una marca de verdad, con el proceso completo, que se sintiera un poco jovial pero seria, sobria y moderna. Y con una condición que me puse yo: nada de fantasmas, escudos ni carteras, que es lo que tiene medio mundo en crypto.",
        en: "Daydream is the Solana wallet Aerosol is building, for people who live on-chain. The name already said most of it: daydreaming, calm, clarity. My job was to give it a real brand, the full process, something a little playful but still serious, sober and modern. And I set myself one rule: no ghosts, no shields, no wallets, because that's what half of crypto already has.",
      },
      blocks: [
        {
          kind: "image",
          size: "bleed",
          image: {
            src: `${DY}/daydream-cornisa-mockup.webp`,
            title: { es: "Home", en: "Home" },
            detail: { es: "La app, con el cielo detrás", en: "The app, with the sky behind it" },
          },
        },
      ],
    },
    {
      id: "ventana",
      label: { es: "La Ventana", en: "The Window" },
      heading: { es: "Medio sol con el cielo adentro.", en: "Half a sun with the sky inside." },
      text: {
        es: "A este logo le di vueltas. Hubo una D, hubo una luna, hubo un personaje que se leía de noche, y una wallet que se llama Daydream tiene que ser de día. Al final la respuesta fue la más sencilla: una ventana. Medio sol, el cielo adentro y dos nubes que se salen por el borde, como cuando te quedas mirando por la ventana y se te va el tiempo. Se lee a 24 px y tiene su guiño literal, que era justo lo que buscaba.",
        en: "This logo took a few turns. There was a D, there was a moon, there was a character that read like nighttime, and a wallet called Daydream has to live in the daytime. The answer ended up being the simplest one: a window. Half a sun, the sky inside, and two clouds slipping out past the edge, like when you stare out the window and lose track of time. It reads at 24 px and it has its little literal wink, which is exactly what I was after.",
      },
      blocks: [
        {
          kind: "image",
          size: "wide",
          image: {
            src: `${DY}/daydream-x-MY-02a.webp`,
            title: { es: "El logo a todo color", en: "The full-color logo" },
            detail: { es: "Horizontal y apilado, sobre el morado", en: "Horizontal and stacked, on the purple" },
          },
        },
        {
          kind: "image",
          size: "solo",
          image: {
            src: `${DY}/daydream-ventana-loop.mp4`,
            title: { es: "La Ventana, animada", en: "The Window, animated" },
            detail: { es: "Las dos nubes cruzan a distinta velocidad", en: "The two clouds drift at different speeds" },
          },
        },
      ],
    },
    {
      id: "sistema",
      label: { es: "El sistema", en: "The system" },
      heading: { es: "El cielo de fondo y el morado para lo oscuro.", en: "Sky for the ground, purple for the dark." },
      text: {
        es: "Después vino todo lo demás. El cielo pasó a ser el fondo de la marca y de la app, lo oscuro va en el morado de Aerosol y nunca en negro, y a la e del nombre le dibujé un travesaño recto que termina en el recuadro de la a. Las nubes del logo se mueven en la animación y son las mismas que flotan en la app.",
        en: "Then came everything else. The sky became the ground for the brand and the app, the dark parts go in Aerosol's purple and never in black, and I drew the e in the name a straight crossbar that ends in the a's square tab. The clouds in the logo drift in the animation, and they're the same ones floating around the app.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          items: [
            { src: `${DY}/daydream-x-MY-02c.webp`, title: { es: "En blanco", en: "In white" }, detail: { es: "Sobre el cielo de la app", en: "On the app's sky" } },
            { src: `${DY}/daydream-x-MY-02b.webp`, title: { es: "A una tinta", en: "One ink" }, detail: { es: "En morado, sobre Cloud", en: "In purple, on Cloud" } },
          ],
        },
        {
          kind: "palette",
          colors: [
            { name: { es: "Sky", en: "Sky" }, hex: "#7CC0FF", codes: ["R124 G192 B255"] },
            { name: { es: "Purple", en: "Purple" }, hex: "#3C1253", codes: ["R60 G18 B83"] },
            { name: { es: "Cloud", en: "Cloud" }, hex: "#F7F4FA", codes: ["R247 G244 B250"] },
            { name: { es: "Dusk", en: "Dusk" }, hex: "#4A1A66", codes: ["R74 G26 B102"] },
          ],
        },
        {
          kind: "image",
          size: "wide",
          image: {
            src: `${DYP}/letra.webp`,
            title: { es: "La letra", en: "Type" },
            detail: { es: "Funnel Display, Funnel Sans y Geist Mono para las cifras", en: "Funnel Display, Funnel Sans and Geist Mono for the figures" },
          },
        },
      ],
    },
    {
      id: "app",
      label: { es: "La app", en: "The app" },
      heading: { es: "Antes de aprobar, ves qué firmas.", en: "Before you approve, you see what you sign." },
      text: {
        es: "La propuesta de la app la pensé con poco texto, íconos claros y la idea de que firmar algo en Solana no te quite la calma: antes de aprobar, ves qué estás firmando.",
        en: "I designed the app proposal with very little text, clear icons and one idea in mind: signing something on Solana shouldn't cost you your calm. Before you approve, you see what you're signing.",
      },
      blocks: [
        {
          kind: "image",
          size: "bleed",
          image: {
            src: `${DY}/daydream-laptop-video-mockup.mp4`,
            title: { es: "Life inside the Window", en: "Life inside the Window" },
            detail: { es: "La presentación de la app, con el recorrido corriendo", en: "The app presentation, with the tour playing" },
          },
        },
        {
          kind: "image",
          size: "wide",
          image: {
            src: `${DY}/daydream-tres-celulares-mockup.webp`,
            title: { es: "Enviar a varias wallets", en: "Sending to several wallets" },
            detail: { es: "Send, revisión y envío, en una sola transacción", en: "Send, review and sending, in a single transaction" },
          },
        },
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "Más pantallas de la propuesta", en: "More screens from the proposal" },
          items: [
            dyScreen("transaction", "Transacción", "Transaction"),
            dyScreen("activity", "Actividad", "Activity"),
            dyScreen("token", "Token", "Token"),
            dyScreen("contacts", "Contactos", "Contacts"),
            dyScreen("browser", "Navegador", "Browser"),
          ],
        },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          items: [
            { src: `${DY}/daydream-ventana-mockup.webp`, title: { es: "Approve", en: "Approve" }, detail: { es: "Lo que vas a firmar, simulado antes", en: "What you're about to sign, simulated first" } },
            { src: `${DY}/daydream-terraza-mockup.webp`, title: { es: "Bloqueado", en: "Blocked" }, detail: { es: "Un drainer, frenado antes de firmar", en: "A drainer, stopped before you sign" } },
          ],
        },
      ],
    },
    {
      id: "lanzamiento",
      label: { es: "El lanzamiento", en: "The launch" },
      heading: { es: "Algo en el horizonte.", en: "Something on the horizon." },
      text: {
        es: "Para el lanzamiento armé los teasers sobre el mismo cielo, con una frase corta cada uno y la app asomándose, y unos videos breves donde las nubes y el nombre se mueven igual que en la marca.",
        en: "For the launch I made the teasers on the same sky, one short line each with the app peeking in, plus a few short videos where the clouds and the name move just like they do in the brand.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          ratio: "16/9",
          items: [
            dyTeaser("horizon", "Something's on the horizon."),
            { src: `${DY}/daydream-video-horizon.mp4`, title: { es: "Horizon", en: "Horizon" }, detail: { es: "Video del lanzamiento", en: "Launch video" } },
            dyTeaser("solana-only", "Solana only. On purpose."),
            { src: `${DY}/daydream-video-a-look-inside.mp4`, title: { es: "A look inside", en: "A look inside" }, detail: { es: "Video del lanzamiento", en: "Launch video" } },
          ],
        },
      ],
    },
    {
      id: "criterio",
      label: { es: "El criterio", en: "The calls" },
      heading: { es: "Muchas opciones, una sola decisión.", en: "Lots of options, one call." },
      text: {
        es: "Todo esto lo hice con herramientas de IA como apoyo, pero cada decisión fue mía: qué ronda seguía, cuándo una idea se estaba pareciendo demasiado a Phantom, qué pantalla sobraba. La IA me dejó probar muchísimas más opciones en mucho menos tiempo. Saber cuál es la buena sigue siendo trabajo de diseñadora. Hasta las fotos de este caso salieron así: el cielo, la luz y cada toma los escogí yo.",
        en: "I made all of this with AI tools as support, but every call was mine: which round to keep pushing, when an idea was drifting too close to Phantom, which screen didn't need to be there. AI let me try a lot more options in a lot less time. Knowing which one is the one is still a designer's job. Even the photos in this case went that way: I picked the sky, the light and every single take.",
      },
      blocks: [
        {
          kind: "image",
          size: "wide",
          image: {
            src: `${DY}/daydream-mesa-agentes-mockup.webp`,
            title: { es: "Agents", en: "Agents" },
            detail: { es: "La pantalla de los agentes, con su límite diario", en: "The agents screen, with its daily limit" },
          },
        },
        {
          kind: "image",
          size: "bleed",
          image: {
            src: `${DY}/daydream-cama-mockup.webp`,
            title: { es: "Welcome", en: "Welcome" },
            detail: { es: "La primera pantalla", en: "The first screen" },
          },
        },
      ],
    },
  ],
};

const daydreamProject: Project = {
  slug: "daydream",
  title: "Daydream",
  client: "Daydream, de Aerosol",
  clientEn: "Daydream, by Aerosol",
  year: "2026",
  role: "Logo, identidad y propuesta de la app",
  roleEn: "Logo, identity and app proposal",
  scope: ["Logo", "Ícono de app", "Sistema de marca", "Kit de marca", "Redes sociales", "Diseño de app (propuesta)"],
  scopeEn: ["Logo", "App icon", "Brand system", "Brand kit", "Social media", "App design (proposal)"],
  gridLabel: "Logo · App",
  gridLabelEn: "Logo · App",
  brief: "Daydream es la wallet de Solana que está armando Aerosol, para gente que vive on-chain. El nombre ya lo decía casi todo: soñar despierto, calma, claridad. Me tocaba hacerle una marca de verdad, con el proceso completo, que se sintiera un poco jovial pero seria, sobria y moderna. Y con una condición que me puse yo: nada de fantasmas, escudos ni carteras, que es lo que tiene medio mundo en crypto.",
  briefEn: "Daydream is the Solana wallet Aerosol is building, for people who live on-chain. The name already said most of it: daydreaming, calm, clarity. My job was to give it a real brand, the full process, something a little playful but still serious, sober and modern. And I set myself one rule: no ghosts, no shields, no wallets, because that's what half of crypto already has.",
  shipped: [
    "La Ventana: medio sol con el cielo de día adentro y dos nubes cortadas en el borde.",
    "El wordmark en Funnel Display con una e hecha a mano, en horizontal y apilado, y su color, Sky.",
    "El ícono de app, el avatar, la Ventana animada, el kit en Drive y los banners de cielo.",
    "Una propuesta de app de 16 pantallas, los teasers y cuatro videos para el lanzamiento.",
  ],
  shippedEn: [
    "The Window: a half sun holding a daytime sky, with two clouds cut off by its edge.",
    "The wordmark in Funnel Display with a hand-drawn e, horizontal and stacked, and its own color, Sky.",
    "The app icon, the avatar, the animated Window, the kit on Drive and the sky banners.",
    "A 16-screen app proposal, the launch teasers and four short videos.",
  ],
  outcome: ["La marca se aprobó el 22 de octubre de 2026, a la primera presentación."],
  outcomeEn: ["The brand was approved on 22 October 2026, the first time it was shown."],
  credits: [
    "Logo, identidad, kit, propuesta de la app, piezas y mockups: Molly Yllom",
    "Hecho con herramientas de IA, bajo mi dirección",
  ],
  creditsEn: [
    "Logo, identity, kit, app proposal, pieces and mockups: Molly Yllom",
    "Made with AI tools, under my direction",
  ],
  portfolioImage: "/img/projects/daydream/daydream-ventana-loop.mp4",
  heroImage: "/img/projects/daydream/daydream-x-MY-01.webp",
  paragraphs: [
    "A este logo le di vueltas. Hubo una D, hubo una luna, hubo un personaje que se leía de noche, y una wallet que se llama Daydream tiene que ser de día. Al final la respuesta fue la más sencilla: una ventana. Medio sol, el cielo adentro y dos nubes que se salen por el borde, como cuando te quedas mirando por la ventana y se te va el tiempo. Se lee a 24 px y tiene su guiño literal, que era justo lo que buscaba.",
    "Después vino todo lo demás. El cielo pasó a ser el fondo de la marca y de la app, lo oscuro va en el morado de Aerosol y nunca en negro, y a la e del nombre le dibujé un travesaño recto que termina en el recuadro de la a. Las nubes del logo se mueven en la animación y son las mismas que flotan en la app. La propuesta de la app la pensé con poco texto, íconos claros y la idea de que firmar algo en Solana no te quite la calma: antes de aprobar, ves qué estás firmando.",
    "Todo esto lo hice con herramientas de IA como apoyo, pero cada decisión fue mía: qué ronda seguía, cuándo una idea se estaba pareciendo demasiado a Phantom, qué pantalla sobraba. La IA me dejó probar muchísimas más opciones en mucho menos tiempo. Saber cuál es la buena sigue siendo trabajo de diseñadora. Hasta las fotos de este caso salieron así: el cielo, la luz y cada toma los escogí yo.",
  ],
  paragraphsEn: [
    "This logo took a few turns. There was a D, there was a moon, there was a character that read like nighttime, and a wallet called Daydream has to live in the daytime. The answer ended up being the simplest one: a window. Half a sun, the sky inside, and two clouds slipping out past the edge, like when you stare out the window and lose track of time. It reads at 24 px and it has its little literal wink, which is exactly what I was after.",
    "Then came everything else. The sky became the ground for the brand and the app, the dark parts go in Aerosol's purple and never in black, and I drew the e in the name a straight crossbar that ends in the a's square tab. The clouds in the logo drift in the animation, and they're the same ones floating around the app. I designed the app proposal with very little text, clear icons and one idea in mind: signing something on Solana shouldn't cost you your calm. Before you approve, you see what you're signing.",
    "I made all of this with AI tools as support, but every call was mine: which round to keep pushing, when an idea was drifting too close to Phantom, which screen didn't need to be there. AI let me try a lot more options in a lot less time. Knowing which one is the one is still a designer's job. Even the photos in this case went that way: I picked the sky, the light and every single take.",
  ],
  images: [
    "/img/projects/daydream/daydream-x-MY-02a.webp",
    "/img/projects/daydream/daydream-x-MY-02b.webp",
    "/img/projects/daydream/daydream-cornisa-mockup.webp",
    "/img/projects/daydream/daydream-x-MY-02c.webp",
    "/img/projects/daydream/daydream-x-MY-02d.webp",
    "/img/projects/daydream/daydream-laptop-video-mockup.mp4",
    "/img/projects/daydream/daydream-x-MY-04.webp",
    "/img/projects/daydream/daydream-ventana-loop.mp4",
    "/img/projects/daydream/daydream-tres-celulares-mockup.webp",
    "/img/projects/daydream/daydream-x-MY-05a.webp",
    "/img/projects/daydream/daydream-x-MY-05b.webp",
    "/img/projects/daydream/daydream-ventana-mockup.webp",
    "/img/projects/daydream/daydream-video-horizon.mp4",
    "/img/projects/daydream/daydream-terraza-mockup.webp",
    "/img/projects/daydream/daydream-video-read-what-you-sign.mp4",
    "/img/projects/daydream/daydream-x-MY-06.webp",
    "/img/projects/daydream/daydream-video-a-look-inside.mp4",
    "/img/projects/daydream/daydream-mesa-agentes-mockup.webp",
    "/img/projects/daydream/daydream-video-app-tour.mp4",
    "/img/projects/daydream/daydream-cama-mockup.webp",
  ],
  imagesEn: [
    "/img/projects/daydream/daydream-x-MY-02a.webp",
    "/img/projects/daydream/daydream-x-MY-02b.webp",
    "/img/projects/daydream/daydream-cornisa-mockup.webp",
    "/img/projects/daydream/daydream-x-MY-02c.webp",
    "/img/projects/daydream/daydream-x-MY-02d.webp",
    "/img/projects/daydream/daydream-laptop-video-mockup.mp4",
    "/img/projects/daydream/daydream-x-MY-04-en.webp",
    "/img/projects/daydream/daydream-ventana-loop.mp4",
    "/img/projects/daydream/daydream-tres-celulares-mockup.webp",
    "/img/projects/daydream/daydream-x-MY-05a.webp",
    "/img/projects/daydream/daydream-x-MY-05b.webp",
    "/img/projects/daydream/daydream-ventana-mockup.webp",
    "/img/projects/daydream/daydream-video-horizon.mp4",
    "/img/projects/daydream/daydream-terraza-mockup.webp",
    "/img/projects/daydream/daydream-video-read-what-you-sign.mp4",
    "/img/projects/daydream/daydream-x-MY-06.webp",
    "/img/projects/daydream/daydream-video-a-look-inside.mp4",
    "/img/projects/daydream/daydream-mesa-agentes-mockup.webp",
    "/img/projects/daydream/daydream-video-app-tour.mp4",
    "/img/projects/daydream/daydream-cama-mockup.webp",
  ],
  story: daydreamStory,
};

const spotlightProject: Project = {
  slug: "spotlight",
  title: "Spotlight",
  client: "Spotlight, de Aerosol",
  clientEn: "Spotlight, by Aerosol",
  year: "2026",
  role: "Logo, marca y diseño de producto",
  roleEn: "Logo, brand and product design",
  scope: ["Logo", "Refinamiento de marca", "Íconos de app", "Banners", "Web (en desarrollo)", "Dashboard (en desarrollo)"],
  scopeEn: ["Logo", "Brand refinement", "App icons", "Banners", "Website (in development)", "Dashboard (in development)"],
  gridLabel: "Logo · Refinamiento",
  gridLabelEn: "Logo · Refinement",
  brief: "Spotlight es la red de anuncios de Aerosol para Solana: los proyectos ponen sus anuncios dentro de las apps que la gente ya usa, y esas apps cobran por mostrarlos. Su primer logo era un faro con gafas oscuras y una sonrisa, muy simpático. Pero Spotlight le vende a equipos que van a meter dinero en campañas, y ahí la carita pesaba. Había que dejarle la luz y quitarle el chiste, sin que dejara de verse como de la familia.",
  briefEn: "Spotlight is Aerosol's ad network for Solana: projects run their ads inside the apps people already use, and those apps get paid to show them. Its first logo was a headlight wearing dark shades and a grin. Cute, honestly. But Spotlight sells to teams who are about to put money into campaigns, and the little face got in the way. It needed to keep the light, lose the joke, and still look like part of the family.",
  shipped: [
    "El logo: el faro dentro de la O de SPOTLIGHT, en horizontal y apilado.",
    "El faro refinado, sin gafas ni sonrisa, con sus tres anillos de oro.",
    "Los íconos de app, la foto de perfil, los banners y la vista previa de enlaces, en Rubik.",
    "El diseño de la web y del dashboard del anunciante, que el equipo está construyendo.",
  ],
  shippedEn: [
    "The logo: the headlight inside the O of SPOTLIGHT, horizontal and stacked.",
    "The refined headlight: no shades, no grin, just its three rings of gold.",
    "The app icons, the profile picture, the banners and the link preview, in Rubik.",
    "The design for the website and the advertiser dashboard, which the team is building now.",
  ],
  outcome: ["El faro nuevo es la foto de perfil de @spotlightadsapp desde el 18 de junio de 2026."],
  outcomeEn: ["The new headlight has been @spotlightadsapp's profile picture since 18 June 2026."],
  credits: [
    "Logo, marca y diseño de la web y el dashboard: Molly Yllom",
    "Producto, desarrollo y comunidad de @spotlightadsapp: equipo de Aerosol",
  ],
  creditsEn: [
    "Logo, brand, and website and dashboard design: Molly Yllom",
    "Product, development and community for @spotlightadsapp: the Aerosol team",
  ],
  portfolioImage: "/img/projects/spotlight/spotlight-logo-animado.mp4",
  heroImage: "/img/projects/spotlight/spotlight-x-MY-01.webp",
  heroMedia: { src: "/img/projects/spotlight/spotlight-logo-animado-hero.mp4", ground: "#ffffff" },
  paragraphs: [
    "Me gustaba el faro con gafas, no te voy a mentir. Pero en Aerosol ya teníamos claro que la personalidad vive en los personajes, y que cada producto lleva una marca que aguante una reunión seria. Spotlight es justo el que más lo necesitaba, porque es el que le cobra a otros. Así que le quité las gafas y la sonrisa, y me quedé con lo que de verdad decía algo: un círculo de luz, tres anillos de oro, el foco puesto encima de alguien.",
    "El wordmark se quedó igual, porque funcionaba. Lo que cambió fue todo lo de alrededor: el faro se lee a 16 px como favicon y también llena un ícono de app, y el punto amarillo pasó a ser la firma de la marca. En octubre rehice los banners en Rubik, con una sola idea: el faro grande, cortado por el borde, y «Ads for Solana projects.» al lado. Ese mismo idioma de un solo oro sobre negro, con el punto amarillo al final de cada título, es el que diseñé para la web y para el dashboard donde los anunciantes van a ver sus campañas.",
  ],
  paragraphsEn: [
    "I liked the headlight with shades, I'll admit it. But at Aerosol we'd already agreed that personality lives in the characters, and every product gets a mark that can sit through a serious meeting. Spotlight needed that more than any of them, because it's the one asking other people for money. So the shades and the grin came off, and I kept what was actually saying something: a circle of light, three rings of gold, the spot on someone.",
    "The wordmark stayed as it was, because it worked. Everything around it changed. The headlight reads at 16 px as a favicon and still fills an app icon, and the yellow dot became the brand's signature. In October I redid the banners in Rubik around one idea: the headlight big and cropped by the edge, with “Ads for Solana projects.” next to it. That same language, one gold on black with the yellow dot closing every title, is what I designed the website and the dashboard in, where advertisers will watch their campaigns.",
  ],
  images: [
    "/img/projects/spotlight/spotlight-x-MY-02a.webp",
    "/img/projects/spotlight/spotlight-web-mockup.webp",
    "/img/projects/spotlight/spotlight-x-MY-02b.webp",
    "/img/projects/spotlight/spotlight-formatos-mockup.webp",
    "/img/projects/spotlight/spotlight-x-MY-03.webp",
    "/img/projects/spotlight/spotlight-dashboard-celular-mockup.webp",
    "/img/projects/spotlight/spotlight-x-MY-04.webp",
    "/img/projects/spotlight/spotlight-dashboard-mockup.webp",
    "/img/projects/spotlight/spotlight-x-MY-05.webp",
  ],
  imagesEn: [
    "/img/projects/spotlight/spotlight-x-MY-02a.webp",
    "/img/projects/spotlight/spotlight-web-mockup.webp",
    "/img/projects/spotlight/spotlight-x-MY-02b-en.webp",
    "/img/projects/spotlight/spotlight-formatos-mockup.webp",
    "/img/projects/spotlight/spotlight-x-MY-03.webp",
    "/img/projects/spotlight/spotlight-dashboard-celular-mockup.webp",
    "/img/projects/spotlight/spotlight-x-MY-04-en.webp",
    "/img/projects/spotlight/spotlight-dashboard-mockup.webp",
    "/img/projects/spotlight/spotlight-x-MY-05.webp",
  ],
};

const seedMyWalletProject: Project = {
  slug: "seed-my-wallet",
  title: "Seed My Wallet",
  client: "Seed My Wallet, de Aerosol",
  clientEn: "Seed My Wallet, by Aerosol",
  year: "2026",
  role: "Logo, sistema de marca y campaña de lanzamiento",
  roleEn: "Logo, brand system and launch campaign",
  scope: ["Logo", "Sistema de marca", "Glifos", "Íconos de app", "Campaña de lanzamiento", "Tienda de apps"],
  scopeEn: ["Logo", "Brand system", "Glyphs", "App icons", "Launch campaign", "App store listing"],
  gridLabel: "Logo · Campaña de lanzamiento",
  gridLabelEn: "Logo · Launch campaign",
  brief: "Seed My Wallet llena una wallet de Solana devnet con datos de prueba: SOL de devnet, tokens, NFTs y cuentas vacías, para que los developers dejen de probar en mainnet. Lo usan sobre todo developers y agentes, desde una terminal o un servidor MCP, y hasta ahí no tenía marca propia. El pedido fue dársela: que se sintiera de la familia de Aerosol sin ser el logo de Aerosol con otro nombre, y que no se quedara vieja cada vez que el producto sumara un tipo de dato.",
  briefEn: "Seed My Wallet fills a Solana devnet wallet with test data: devnet SOL, tokens, NFTs and empty accounts, so developers can stop testing on mainnet. Most of the people using it are developers and agents, working from a terminal or an MCP server, and it didn't have a brand of its own yet. The job was to give it one that felt like part of the Aerosol family without being Aerosol's logo with a new name, and that wouldn't go stale every time the product added a new kind of test data.",
  shipped: [
    "El ícono: el prompt de una terminal con una hoja en el brazo de arriba, y la gota de SMW Faucet.",
    "El nombre en Geist Mono Bold, en horizontal, apilado y en dos líneas.",
    "Color, forma, el cursor verde que parpadea y un ícono chico ajustado al píxel.",
    "Foto de perfil, banners, la campaña de lanzamiento y el set de la tienda de Solana Mobile.",
  ],
  shippedEn: [
    "The symbol: a terminal prompt with a leaf for its top arm, and the SMW Faucet drop.",
    "The name in Geist Mono Bold, horizontal, stacked and on two lines.",
    "Color, shape, the blinking green cursor and a pixel-fitted small icon.",
    "Profile picture, banners, the launch campaign and the Solana Mobile store set.",
  ],
  outcome: ["La marca está en vivo en seedmywallet.com y en SMW Faucet."],
  outcomeEn: ["The brand is live on seedmywallet.com and on SMW Faucet."],
  credits: [
    "Logo, sistema de marca, piezas de campaña y set de la tienda: Molly Yllom",
    "Producto, desarrollo y videos de lanzamiento: equipo de Aerosol",
  ],
  creditsEn: [
    "Logo, brand system, campaign pieces and store listing: Molly Yllom",
    "Product, development and launch videos: the Aerosol team",
  ],
  portfolioImage: "/img/projects/seed-my-wallet/seed-my-wallet-portada-cursor.mp4",
  heroImage: "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-01.webp",
  paragraphs: [
    "El logo pasó por tres rondas: primero trazos, después formas sólidas y al final cinco finalistas. Me quedé con el prompt de una terminal, ese >_ donde se escribe el siguiente comando, porque habla el idioma de quien lo usa y no depende de cuántos tipos de dato haya hoy. Y como el producto siembra wallets, el brazo de arriba del > es una hoja. Quien programa ve un prompt; si mira otra vez, ve un brote.",
    "Lo demás fue construirlo bien. Un solo módulo manda el ancho del tallo, el alto del cursor y el espacio entre los dos, y la punta lleva un corte vertical, como el borde de la celda en una terminal. De esa misma medida salieron el nombre, la gota de SMW Faucet, el favicon y una ficha para cada tipo de dato. Para el lanzamiento armé las piezas de la campaña y el set de la tienda con eso, enseñando siempre la app de verdad, con una orden llegando item por item.",
  ],
  paragraphsEn: [
    "The logo went through three rounds: line marks first, then solid shapes, and finally five finalists. I went with the terminal prompt, that >_ where you type the next command, because it speaks the language of the people using it and doesn't depend on how many kinds of test data there are today. And since the product seeds wallets, the top arm of the > is a leaf. A developer sees a prompt first; look again and it's a sprout.",
    "The rest was about building it right. One module sets the stem's width, the cursor's height and the gap between them, and the tip has a vertical cut, like the edge of a character cell in a terminal. The name, the SMW Faucet drop, the favicon and a glyph for every kind of test data all came from that same measure. For the launch I put together the campaign pieces and the store listing with all of it, always showing the real app, with an order landing item by item.",
  ],
  images: [
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-02a.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-02b.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-laptop-mockup.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-03a.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-03b.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-celular-mockup.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-04a.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-laptop-x-perfil-mockup.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-04b.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-celular-chat-mockup.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-05.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-video-lanzamiento.mp4",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-06a.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-celular-x-feed-mockup.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-06b.webp",
  ],
  imagesEn: [
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-02a-en.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-02b.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-laptop-mockup.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-03a-en.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-03b.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-celular-mockup.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-04a.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-laptop-x-perfil-mockup.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-04b.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-celular-chat-mockup.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-05-en.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-video-lanzamiento.mp4",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-06a.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-celular-x-feed-mockup.webp",
    "/img/projects/seed-my-wallet/seed-my-wallet-x-MY-06b.webp",
  ],
};

/**
 * Svelti told in chapters (F3). The brand panels carry no words and keep
 * their ground (logo on its own colour); the palette is drawn by the page
 * with the guide's values. The symbol is the circle with the dot, never the
 * arcs from the visual guide.
 */
const SV = "/img/projects/svelti";
const svScene: Bilingual = { es: "Montaje", en: "Mockup" };
const sveltiStory: CaseStory = {
  cover: {
    variant: "top",
    // Borrador para Molly
    promise: {
      es: "Una clínica de piel, y un logo que parte de una célula.",
      en: "A skin clinic, and a logo that starts from a single cell.",
    },
    media: `${SV}/svelti-logo-animado-hero.mp4`,
    ground: "#f8f2ed",
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      // Títulos de capítulo: borrador para Molly
      heading: { es: "La medicina detrás de la estética.", en: "The medicine behind the aesthetics." },
      text: {
        es: "Svelti es una clínica de medicina estética y antiaging. La idea era hablar de la medicina que hay detrás de la estética, pero sin tanto tecnicismo, para que se notara también el lado humano de la clínica.",
        en: "Svelti is an aesthetic medicine and antiaging clinic. The idea was to talk about the medicine behind aesthetics without too much technical language, so the human side of the clinic would come through too.",
      },
      blocks: [
        { kind: "image", size: "bleed", image: { src: `${SV}/svelti-vidrio-mockup.webp`, title: { es: "Vidrio de la entrada", en: "Entrance glass" }, detail: svScene } },
      ],
    },
    {
      id: "logo",
      label: { es: "El logo", en: "The logo" },
      heading: { es: "Una célula en el punto de la i.", en: "A cell in the dot of the i." },
      text: {
        es: "El detalle está en el punto de la i: es una célula en su forma más simple. La piel está hecha de células, capa sobre capa, y ahí es donde trabaja la clínica. Ese punto se volvió también el ícono de la marca.",
        en: "The detail is in the dot of the i: it's a cell in its simplest form. Skin is made of cells, layer upon layer, and that's where the clinic works. That dot also became the brand's symbol.",
      },
      blocks: [
        { kind: "image", size: "wide", image: { src: `${SV}/svelti-x-MY-02.webp`, title: { es: "Logo", en: "Logo" }, detail: { es: "A todo color, sobre crema", en: "Full color, on cream" } } },
        { kind: "image", size: "solo", image: { src: `${SV}/piezas/area-de-proteccion.webp`, title: { es: "Área de protección", en: "Clear space" }, detail: { es: "De la guía visual", en: "From the visual guide" } } },
        { kind: "image", size: "bleed", image: { src: `${SV}/svelti-x-MY-05.webp`, title: { es: "Logo", en: "Logo" }, detail: { es: "En blanco sobre el dorado", en: "White on the gold" } } },
      ],
    },
    {
      id: "color",
      label: { es: "Color y letra", en: "Color and type" },
      heading: { es: "Dorado, oliva, gris cálido y arena.", en: "Gold, olive, warm gray and sand." },
      text: {
        es: "Lo demás acompaña sin hacer ruido: una letra fina y abierta, y una paleta de dorado, oliva, gris cálido y arena que se siente cálida y cercana sin dejar de ser elegante.",
        en: "Everything else stays quiet: a light, open letterform and a palette of gold, olive, warm gray and sand that feels warm and close while staying elegant.",
      },
      blocks: [
        {
          kind: "palette",
          colors: [
            { name: { es: "Dorado", en: "Gold" }, hex: "#AC9651", codes: ["RGB 172 150 81", "CMYK 33 35 81 5", "Pantone 10126 C"] },
            { name: { es: "Dorado claro", en: "Light gold" }, hex: "#CEBE94", codes: ["Pantone 10126 C 60 %"] },
            { name: { es: "Oliva", en: "Olive" }, hex: "#4E524A", codes: ["RGB 78 82 74", "CMYK 65 54 63 36", "Pantone 418 C"] },
            { name: { es: "Gris cálido", en: "Warm gray" }, hex: "#81776F", codes: ["RGB 129 119 111", "CMYK 49 47 51 12", "Pantone Warm Gray 9 C"] },
            { name: { es: "Arena", en: "Sand" }, hex: "#E5CDB5", codes: ["RGB 229 205 181", "CMYK 9 18 27 0", "Pantone 2309 C"] },
          ],
        },
        { kind: "image", size: "bleed", image: { src: `${SV}/svelti-x-MY-08.webp`, title: { es: "Ícono", en: "Symbol" }, detail: { es: "En los colores de la marca", en: "In the brand colors" } } },
        { kind: "image", size: "solo", image: { src: `${SV}/svelti-x-MY-07.webp`, title: { es: "Barlow", en: "Barlow" }, detail: { es: "ExtraLight y Medium", en: "ExtraLight and Medium" } } },
      ],
    },
    {
      id: "aplicaciones",
      label: { es: "Aplicaciones", en: "Applications" },
      heading: { es: "Del papel a la bata.", en: "From paper to the white coat." },
      // Borrador para Molly
      text: {
        es: "La marca la probé donde la clínica la iba a usar de verdad: en la papelería, en las tarjetas, en la bata, en el vidrio de la entrada y en los empaques.",
        en: "I tested the brand where the clinic would actually use it: on stationery, business cards, the white coat, the entrance glass and the packaging.",
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "Pruebas de marca", en: "Brand tests" },
          items: [
            { src: `${SV}/svelti-papeleria-mockup.webp`, title: { es: "Papelería", en: "Stationery" }, detail: svScene },
            { src: `${SV}/svelti-tarjetas-mockup.webp`, title: { es: "Tarjetas", en: "Business cards" }, detail: svScene },
            { src: `${SV}/svelti-uniforme-mockup.webp`, title: { es: "Uniforme", en: "Uniform" }, detail: svScene },
          ],
        },
        { kind: "image", size: "bleed", image: { src: `${SV}/svelti-empaques-mockup.webp`, title: { es: "Empaques", en: "Packaging" }, detail: svScene } },
      ],
    },
  ],
  closing: {
    image: { src: `${SV}/svelti-x-MY-01.webp`, title: { es: "Ícono", en: "Symbol" }, detail: { es: "Sobre el dorado", en: "On the gold" } },
  },
};

const sveltiProject: Project = {
  slug: "svelti",
  title: "Svelti",
  client: "Svelti, medicina estética y antiaging",
  clientEn: "Svelti, aesthetic medicine and antiaging",
  year: "2024",
  role: "Logo e identidad de marca. Proyecto en solitario",
  roleEn: "Logo and brand identity. Solo project",
  scope: ["Concepto", "Logotipo", "Ícono", "Paleta y tipografía", "Guía visual"],
  scopeEn: ["Concept", "Wordmark", "Symbol", "Palette and type", "Visual guide"],
  brief: "Svelti es una clínica de medicina estética y antiaging. La idea era hablar de la medicina que hay detrás de la estética, pero sin tanto tecnicismo, para que se notara también el lado humano de la clínica.",
  briefEn: "Svelti is an aesthetic medicine and antiaging clinic. The idea was to talk about the medicine behind aesthetics without too much technical language, so the human side of the clinic would come through too.",
  shipped: [
    "El concepto y las palabras clave, a partir de lo que pidió la clínica.",
    "Un logotipo en el que el punto de la i es una célula.",
    "El ícono y una paleta de cinco colores, con Barlow.",
    "Una guía visual y pruebas en papelería, uniforme, vidrio y empaques.",
  ],
  shippedEn: [
    "The concept and keywords, built from what the clinic asked for.",
    "A wordmark in which the dot of the i is a cell.",
    "The symbol and a five-color palette, set in Barlow.",
    "A visual guide and tests on stationery, uniform, glass and packaging.",
  ],
  credits: ["Logo e identidad: Molly Yllom"],
  creditsEn: ["Logo and identity: Molly Yllom"],
  portfolioImage: "/img/projects/svelti/svelti-logo-animado.mp4",
  heroImage: "/img/projects/svelti/svelti-x-MY-01.webp",
  heroMedia: { src: "/img/projects/svelti/svelti-logo-animado-hero.mp4", ground: "#f8f2ed" },
  paragraphs: [
    "El detalle está en el punto de la i: es una célula en su forma más simple. La piel está hecha de células, capa sobre capa, y ahí es donde trabaja la clínica. Ese punto se volvió también el ícono de la marca.",
    "Lo demás acompaña sin hacer ruido: una letra fina y abierta, y una paleta de dorado, oliva, gris cálido y arena que se siente cálida y cercana sin dejar de ser elegante.",
  ],
  paragraphsEn: [
    "The detail is in the dot of the i: it's a cell in its simplest form. Skin is made of cells, layer upon layer, and that's where the clinic works. That dot also became the brand's symbol.",
    "Everything else stays quiet: a light, open letterform and a palette of gold, olive, warm gray and sand that feels warm and close while staying elegant.",
  ],
  images: [
    "/img/projects/svelti/svelti-x-MY-02.webp",
    "/img/projects/svelti/svelti-papeleria-mockup.webp",
    "/img/projects/svelti/svelti-x-MY-03.webp",
    "/img/projects/svelti/svelti-tarjetas-mockup.webp",
    "/img/projects/svelti/svelti-x-MY-04.webp",
    "/img/projects/svelti/svelti-uniforme-mockup.webp",
    "/img/projects/svelti/svelti-x-MY-05.webp",
    "/img/projects/svelti/svelti-vidrio-mockup.webp",
    "/img/projects/svelti/svelti-x-MY-06.webp",
    "/img/projects/svelti/svelti-empaques-mockup.webp",
    "/img/projects/svelti/svelti-x-MY-07.webp",
    "/img/projects/svelti/svelti-x-MY-08.webp",
  ],
  story: sveltiStory,
};

const synqProject: Project = {
  slug: "synq",
  title: "Synq",
  client: "Synq, de Aerosol",
  clientEn: "Synq, by Aerosol",
  year: "2026",
  role: "Logo, identidad de marca y lanzamiento",
  roleEn: "Logo, brand identity and launch",
  scope: ["Logotipo a medida", "Ícono", "Color", "Íconos de app", "Aplicaciones", "Diseño de la app de demo", "Ficha de tienda"],
  scopeEn: ["Custom wordmark", "Symbol", "Color", "App icons", "Applications", "Demo app design", "Store listing"],
  gridLabel: "Logotipo a medida · Íconos de app",
  gridLabelEn: "Custom wordmark · App icons",
  brief: "Synq es el inicio de sesión de Aerosol: el que cada app conecta para que su gente entre con la marca de esa app. Se le vende a developers, así que tenía que sentirse seria y al día, sin dejar de ser parte de la familia de Aerosol.",
  briefEn: "Synq is Aerosol's sign-in: the one every app plugs in so its people get in under that app's own brand. It sells to developers, so it had to feel serious and current while still belonging to the Aerosol family.",
  shipped: [
    "Un wordmark dibujado a mano, sin fuente, y el ícono de la telaraña con su araña al centro.",
    "Paleta de noche, morado y turquesa, y la telaraña como sistema gráfico.",
    "Íconos de app en claro, oscuro y tintado, favicon, banners e imagen para compartir.",
    "Para el lanzamiento: las pantallas de Synq Demo, junto con Kelvin, y su ficha de tienda con un video que cambia de marca.",
  ],
  shippedEn: [
    "A hand-drawn wordmark, no font, and the web symbol with its spider at the center.",
    "A night, purple and turquoise palette, and the web as a graphic system.",
    "App icons in light, dark and tinted, favicon, banners and a share image.",
    "For the launch: the Synq Demo screens, together with Kelvin, and its store listing with a video that switches brands.",
  ],
  outcome: ["Synq Demo ya está en la Solana dApp Store."],
  outcomeEn: ["Synq Demo is live on the Solana dApp Store."],
  credits: [
    "Logo e identidad: Molly Yllom",
    "Pantallas de la app Synq Demo: Molly Yllom y Kelvin",
    "Ficha de tienda: Molly Yllom",
    "Producto: equipo de Aerosol",
  ],
  creditsEn: [
    "Logo and identity: Molly Yllom",
    "Synq Demo app screens: Molly Yllom and Kelvin",
    "Store listing: Molly Yllom",
    "Product: the Aerosol team",
  ],
  portfolioImage: "/img/projects/synq/synq-logo-animado-portada.mp4",
  heroImage: "/img/projects/synq/synq-x-MY-01.webp",
  paragraphs: [
    "Synq conecta: cada app, cada marca y cada persona pasan por el mismo punto. Por eso el símbolo es una telaraña, una red donde cada hilo vuelve al centro, con la araña que la teje en el medio. Y el nombre lo dibujé letra por letra, unidas por una sola línea, como si la palabra se estuviera cableando.",
    "Después la telaraña se volvió sistema. Sus anillos siguen creciendo hacia afuera con el mismo trazo, en la espalda de una sudadera o en un sticker, y el ícono sigue siendo el centro de todo.",
    "Y en noviembre le tocó salir. Synq Demo, la app de prueba que diseñamos Kelvin y yo, ya está en la Solana dApp Store, y la ficha la armé yo: siete pantallas reales en el Seeker, cada una con una sola idea, y un video donde la misma app cambia de marca cinco veces sin tocar una línea de código. Ahí se ve lo que la telaraña venía diciendo desde el logo: un solo centro, y cada marca entra por su propio hilo.",
  ],
  paragraphsEn: [
    "Synq connects: every app, every brand and every person goes through the same point. That's why the symbol is a spider web, a network where every thread leads back to the center, with the spider that weaves it in the middle. And I drew the name letter by letter, joined by one single line, as if the word were being wired together.",
    "Then the web became a system. Its rings keep growing outward with the same stroke, on the back of a hoodie or on a sticker, and the symbol stays at the center of it all.",
    "Then in November it was time to go out. Synq Demo, the sample app Kelvin and I designed, is now on the Solana dApp Store, and I put its listing together: seven real screens on the Seeker, one idea each, and a video where the same app changes brands five times without touching a line of code. That's where you see what the web had been saying since the logo: one center, and every brand comes in through its own thread.",
  ],
  images: [
    "/img/projects/synq/synq-x-MY-02.webp",
    "/img/projects/synq/synq-laptop-mockup.webp",
    "/img/projects/synq/synq-x-MY-03.webp",
    "/img/projects/synq/synq-celular-mockup.webp",
    "/img/projects/synq/synq-x-MY-04.webp",
    "/img/projects/synq/synq-sudadera-mockup.webp",
    "/img/projects/synq/synq-x-MY-05.webp",
    "/img/projects/synq/synq-bienvenida-mockup.mp4",
    "/img/projects/synq/synq-stickers-mockup.webp",
    "/img/projects/synq/synq-x-MY-06.webp",
    "/img/projects/synq/synq-x-MY-07.webp",
    "/img/projects/synq/synq-cambio-de-marca-mockup.mp4",
    "/img/projects/synq/synq-tienda.webp",
    "/img/projects/synq/synq-marcas-mockup.webp",
  ],
  imagesEn: [
    "/img/projects/synq/synq-x-MY-02.webp",
    "/img/projects/synq/synq-laptop-mockup.webp",
    "/img/projects/synq/synq-x-MY-03-en.webp",
    "/img/projects/synq/synq-celular-mockup.webp",
    "/img/projects/synq/synq-x-MY-04.webp",
    "/img/projects/synq/synq-sudadera-mockup.webp",
    "/img/projects/synq/synq-x-MY-05.webp",
    "/img/projects/synq/synq-bienvenida-mockup.mp4",
    "/img/projects/synq/synq-stickers-mockup.webp",
    "/img/projects/synq/synq-x-MY-06.webp",
    "/img/projects/synq/synq-x-MY-07-en.webp",
    "/img/projects/synq/synq-cambio-de-marca-mockup.mp4",
    "/img/projects/synq/synq-tienda.webp",
    "/img/projects/synq/synq-marcas-mockup.webp",
  ],
};

/**
 * INETXUS told in chapters (F3). Loose pieces in `piezas/`: the compare pair
 * and the five routes are rendered from the final SVGs/PNGs with no numbers or
 * labels (`04-portafolio/inetxus/piezas-story.py`); facade, glass door and
 * plastic come full size from Molly's own mockups. The brand panels (logo on
 * its own colour) carry their ground, as brand panels may.
 */
const IX = "/img/projects/inetxus";
const IXP = `${IX}/piezas`;
const ixScene: Bilingual = { es: "Montaje", en: "Mockup" };
const ixRoutes: { key: string; name: Bilingual }[] = [
  { key: "01", name: { es: "Intersección", en: "Intersection" } },
  { key: "02", name: { es: "Nodos", en: "Nodes" } },
  { key: "03", name: { es: "Símbolo integrado", en: "Integrated symbol" } },
  { key: "04", name: { es: "Evolución del logo actual", en: "Evolution of the current logo" } },
  { key: "05", name: { es: "ADN del ícono", en: "The icon's DNA" } },
];
const inetxusStory: CaseStory = {
  cover: {
    variant: "top",
    // Borrador para Molly
    promise: {
      es: "El cruce que ya tenía su logo, más limpio y hecho sistema.",
      en: "The crossing its old logo already had, cleaner, and grown into a system.",
    },
    media: `${IX}/inetxus-logo-animado-hero.mp4`,
    ground: "#ffffff",
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      // Títulos de capítulo: borrador para Molly
      heading: { es: "Modernizarlo sin perder su esencia.", en: "Modern, without losing what it was." },
      text: {
        es: "INETXUS trabaja donde se cruzan la tecnología, las redes y la comunicación. Ya tenía un logo, y el pedido era modernizarlo sin perder su esencia: una identidad a la altura de lo que la empresa es hoy, en un mercado lleno de marcas técnicas y frías. El cliente resumió su forma de trabajar en una frase: «Ponemos el cliente en el centro, somos un aliado».",
        en: "INETXUS works where technology, networks and communication meet. It already had a logo, and the ask was to modernize it without losing its essence: an identity that matched who the company is today, in a market full of cold, technical brands. The client summed up how they work in one line: “We put the client at the center. We are an ally.”",
      },
      blocks: [
        { kind: "image", size: "bleed", image: { src: `${IXP}/fachada.webp`, title: { es: "Fachada", en: "Facade" }, detail: ixScene } },
      ],
    },
    {
      id: "logo",
      label: { es: "El logo", en: "The logo" },
      heading: { es: "Una X que es cruce y enlace.", en: "An X that is both a crossing and a link." },
      text: {
        es: "La frase del cliente fue el punto de partida: el cliente en el centro. Por eso la ruta que se quedó fue la X, un cruce que también es enlace, el punto donde se encuentran la tecnología, las redes y la gente que las usa. Y ahí estaba la esencia que había que cuidar: el símbolo de antes ya tenía ese cruce. Lo dejé, quité todo lo demás y lo llevé a una línea más limpia, que se sostiene igual en una pantalla que en una fachada.",
        en: "The client's own line was the starting point: the client at the center. That's why the route that stayed was the X, a crossing that is also a link, the point where technology, networks and the people who use them meet. And that was the essence worth protecting: the old symbol already had that crossing. I kept it, took everything else away and brought it to a cleaner line that holds up the same on a screen as on a facade.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 3, phone: 1 },
          ratio: "4/3",
          items: ixRoutes.map((r) => ({
            src: `${IXP}/ruta-${r.key}.webp`,
            title: r.key === "01" ? { es: `${r.name.es} · la elegida`, en: `${r.name.en} · the one chosen` } : r.name,
            detail: { es: `Ruta ${r.key}`, en: `Route ${r.key}` },
          })),
        },
        {
          kind: "compare",
          width: "wide",
          before: { src: `${IXP}/compare-antes.webp`, title: { es: "Antes", en: "Before" }, detail: { es: "El símbolo anterior", en: "The old symbol" } },
          after: { src: `${IXP}/compare-despues.webp`, title: { es: "Después", en: "After" }, detail: { es: "La X nueva", en: "The new X" } },
          hint: { es: "Arrastra la línea o usa las flechas.", en: "Drag the line or use the arrows." },
        },
        { kind: "image", size: "bleed", image: { src: `${IX}/inetxus-x-MY-05.webp`, title: { es: "Logo", en: "Logo" }, detail: { es: "En blanco sobre el azul", en: "White on the blue" } } },
      ],
    },
    {
      id: "color",
      label: { es: "Color y letra", en: "Color and type" },
      heading: { es: "Navy, azul y un poco de naranja.", en: "Navy, blue and a little orange." },
      // Borrador para Molly
      text: {
        es: "El navy y el azul cargan la parte técnica, y el naranja aparece poco, justo donde algo tiene que verse. La letra es BR Sonoma, clara de cerca y de lejos, igual en una pantalla que en el costado de una camioneta.",
        en: "Navy and blue carry the technical side, and the orange shows up rarely, right where something needs to be seen. The type is BR Sonoma, clear up close and from a distance, on a screen or on the side of a van.",
      },
      blocks: [
        {
          kind: "palette",
          colors: [
            { name: { es: "Navy", en: "Navy" }, hex: "#0A2240", codes: ["RGB 10 34 64", "CMYK 98.54 84.03 45.37 51.17", "Pantone 289 C"] },
            { name: { es: "Azul", en: "Blue" }, hex: "#243BB2", codes: ["RGB 36 59 178", "CMYK 92.2 84.41 0 0", "Pantone 2126 C"] },
            { name: { es: "Naranja", en: "Orange" }, hex: "#FF9D1B", codes: ["RGB 255 157 27", "CMYK 0 45.63 95.93 0", "Pantone 1375 C"] },
            { name: { es: "Gris claro", en: "Light grey" }, hex: "#E2E3E5", codes: ["RGB 226 227 229", "CMYK 10.94 6.93 6.82 0", "Pantone Black 6 C 10 %"] },
            { name: { es: "Negro", en: "Black" }, hex: "#000000", codes: ["RGB 0 0 0", "CMYK 100 100 100 100"] },
          ],
        },
        { kind: "image", size: "wide", image: { src: `${IX}/inetxus-x-MY-06.webp`, title: { es: "Logo vertical", en: "Stacked logo" }, detail: { es: "En negativo sobre el navy", en: "Reversed on the navy" } } },
      ],
    },
    {
      id: "sistema",
      label: { es: "El sistema", en: "The system" },
      heading: { es: "De la web a la camioneta.", en: "From the website to the van." },
      text: {
        es: "Después la X dejó de ser solo un ícono y se volvió sistema. Crece y se sale del borde en la camioneta y en la web, enmarca la foto en el carnet y marca cada equipo en el rack. La idea es que la marca se reconozca aunque el nombre quede muy lejos para leerse.",
        en: "Then the X stopped being just an icon and became a system. It grows and bleeds off the edge on the van and the website, frames the photo on the ID badge and tags every piece of equipment in the rack. The idea is that you know the brand even when the name is too far away to read.",
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "La X en uso", en: "The X at work" },
          items: [
            { src: `${IX}/inetxus-camioneta-mockup.webp`, title: { es: "Camioneta", en: "Van" }, detail: ixScene },
            { src: `${IX}/inetxus-laptop-mockup.webp`, title: { es: "Web", en: "Website" }, detail: ixScene },
            { src: `${IX}/inetxus-carnet-mockup.webp`, title: { es: "Carnet y lanyard", en: "ID badge and lanyard" }, detail: ixScene },
            { src: `${IX}/inetxus-router-mockup.webp`, title: { es: "Etiqueta de equipo", en: "Equipment label" }, detail: ixScene },
          ],
        },
        { kind: "image", size: "bleed", image: { src: `${IX}/inetxus-papeleria-mockup.webp`, title: { es: "Papelería", en: "Stationery" }, detail: ixScene } },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          ratio: "3/2",
          items: [
            { src: `${IXP}/puerta-cristal.webp`, title: { es: "Puerta de cristal", en: "Glass door" }, detail: ixScene },
            { src: `${IXP}/plastico.webp`, title: { es: "Sobre plástico", en: "On plastic" }, detail: ixScene },
          ],
        },
      ],
    },
  ],
  closing: {
    image: { src: `${IX}/inetxus-x-MY-01.webp`, title: { es: "Ícono", en: "Icon" }, detail: { es: "Sobre el navy", en: "On the navy" } },
  },
};

const inetxusProject: Project = {
  slug: "inetxus",
  title: "INETXUS",
  client: "INETXUS, tecnología, redes y comunicación",
  clientEn: "INETXUS, technology, networks and communication",
  year: "2026",
  role: "Rediseño de identidad. Proyecto en solitario",
  roleEn: "Identity redesign. Solo project",
  scope: ["Perfil Estético", "Cinco rutas de logo", "Rediseño de logotipo", "Color y tipografía", "Aplicaciones"],
  scopeEn: ["Aesthetic Profile", "Five logo routes", "Logo redesign", "Color and type", "Applications"],
  gridLabel: "Rediseño de logotipo · Aplicaciones",
  gridLabelEn: "Logo redesign · Applications",
  brief: "INETXUS trabaja donde se cruzan la tecnología, las redes y la comunicación. Ya tenía un logo, y el pedido era modernizarlo sin perder su esencia: una identidad a la altura de lo que la empresa es hoy, en un mercado lleno de marcas técnicas y frías. El cliente resumió su forma de trabajar en una frase: «Ponemos el cliente en el centro, somos un aliado».",
  briefEn: "INETXUS works where technology, networks and communication meet. It already had a logo, and the ask was to modernize it without losing its essence: an identity that matched who the company is today, in a market full of cold, technical brands. The client summed up how they work in one line: \u201cWe put the client at the center. We are an ally.\u201d",
  shipped: [
    "El Perfil Estético del cliente y una brújula de diez palabras para medir cada propuesta.",
    "Cinco rutas de logo, cada una desde un territorio distinto de esa brújula.",
    "Un ícono que moderniza el anterior: una X que es cruce y enlace a la vez.",
    "Navy, azul y naranja con BR Sonoma, y aplicaciones de la web a la camioneta.",
  ],
  shippedEn: [
    "The client's Aesthetic Profile and a ten-word compass to measure every proposal against.",
    "Five logo routes, each from a different part of that compass.",
    "A symbol that modernizes the old one: an X that is both a crossing and a link.",
    "Navy, blue and orange with BR Sonoma, and applications from the website to the van.",
  ],
  credits: ["Rediseño de identidad: Molly Yllom"],
  creditsEn: ["Identity redesign: Molly Yllom"],
  portfolioImage: "/img/projects/inetxus/inetxus-logo-animado.mp4",
  heroImage: "/img/projects/inetxus/inetxus-x-MY-01.webp",
  heroMedia: { src: "/img/projects/inetxus/inetxus-logo-animado-hero.mp4", ground: "#ffffff" },
  paragraphs: [
    "La frase del cliente fue el punto de partida: el cliente en el centro. Por eso la ruta que se quedó fue la X, un cruce que también es enlace, el punto donde se encuentran la tecnología, las redes y la gente que las usa. Y ahí estaba la esencia que había que cuidar: el símbolo de antes ya tenía ese cruce. Lo dejé, quité todo lo demás y lo llevé a una línea más limpia, que se sostiene igual en una pantalla que en una fachada.",
    "Después la X dejó de ser solo un ícono y se volvió sistema. Crece y se sale del borde en la camioneta y en la web, enmarca la foto en el carnet y marca cada equipo en el rack. La idea es que la marca se reconozca aunque el nombre quede muy lejos para leerse.",
  ],
  paragraphsEn: [
    "The client's own line was the starting point: the client at the center. That's why the route that stayed was the X, a crossing that is also a link, the point where technology, networks and the people who use them meet. And that was the essence worth protecting: the old symbol already had that crossing. I kept it, took everything else away and brought it to a cleaner line that holds up the same on a screen as on a facade.",
    "Then the X stopped being just an icon and became a system. It grows and bleeds off the edge on the van and the website, frames the photo on the ID badge and tags every piece of equipment in the rack. The idea is that you know the brand even when the name is too far away to read.",
  ],
  images: [
    "/img/projects/inetxus/inetxus-x-MY-02.webp",
    "/img/projects/inetxus/inetxus-camioneta-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-07.webp",
    "/img/projects/inetxus/inetxus-laptop-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-08.webp",
    "/img/projects/inetxus/inetxus-carnet-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-03.webp",
    "/img/projects/inetxus/inetxus-fachada-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-04.webp",
    "/img/projects/inetxus/inetxus-router-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-05.webp",
    "/img/projects/inetxus/inetxus-puerta-cristal-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-06.webp",
    "/img/projects/inetxus/inetxus-papeleria-mockup.webp",
  ],
  imagesEn: [
    "/img/projects/inetxus/inetxus-x-MY-02.webp",
    "/img/projects/inetxus/inetxus-camioneta-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-07-en.webp",
    "/img/projects/inetxus/inetxus-laptop-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-08.webp",
    "/img/projects/inetxus/inetxus-carnet-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-03.webp",
    "/img/projects/inetxus/inetxus-fachada-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-04.webp",
    "/img/projects/inetxus/inetxus-router-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-05.webp",
    "/img/projects/inetxus/inetxus-puerta-cristal-mockup.webp",
    "/img/projects/inetxus/inetxus-x-MY-06.webp",
    "/img/projects/inetxus/inetxus-papeleria-mockup.webp",
  ],
  story: inetxusStory,
};

const posProject: Project = {
  slug: "pos",
  title: "POS",
  client: "POS Soluciones al punto",
  year: "2026",
  role: "Rediseño de logotipo e identidad",
  roleEn: "Logo redesign and identity",
  scope: ["Bocetos a mano", "Rediseño de logotipo", "Sistema de versiones", "Color y tipografía", "Aplicaciones"],
  scopeEn: ["Hand sketches", "Logo redesign", "Lockup system", "Color and type", "Applications"],
  gridLabel: "Rediseño de logotipo · Aplicaciones",
  gridLabelEn: "Logo redesign · Applications",
  brief: "POS hace arquitectura y mobiliario comercial: arma los espacios donde las marcas venden. El encargo era rediseñar su logotipo.",
  briefEn: "POS does commercial architecture and fixtures: it builds the spaces where brands sell. The brief was to redesign its logo.",
  shipped: [
    "Una hoja de bocetos a mano, de donde salieron tres rutas.",
    "Un isotipo en el que la O se vuelve un edificio.",
    "Cinco versiones del logotipo, y una paleta de carbón y naranja con Manrope.",
    "Aplicaciones: fachada, letreros, puertas, tarjetas, camión y camisetas.",
  ],
  shippedEn: [
    "A sheet of hand sketches, which produced three routes.",
    "A symbol in which the O becomes a building.",
    "Five logo lockups, and a charcoal and orange palette set in Manrope.",
    "Applications: facade, signs, doors, business cards, truck and T-shirts.",
  ],
  credits: ["Rediseño de logotipo e identidad: Molly Yllom"],
  creditsEn: ["Logo redesign and identity: Molly Yllom"],
  portfolioImage: "/img/projects/pos/pos-logo-animado-portada.mp4",
  heroImage: "/img/projects/pos/pos-x-MY-01.webp",
  paragraphs: [
    "POS construye los espacios donde las marcas venden, así que la O del nombre se volvió un edificio. La idea salió en la hoja de bocetos, entre muchas otras, y de las tres rutas que pasaron a vector fue la que se quedó.",
    "Después vino la parte que casi no se ve: suavizar esquinas, armar las versiones, escoger el color y la letra, y llevarlo a letreros, puertas, tarjetas, el camión y las camisetas para comprobar que aguanta fuera de la pantalla.",
  ],
  paragraphsEn: [
    "POS builds the spaces where brands sell, so the O in the name became a building. The idea came out of the sketch sheet, among many others, and of the three routes that made it to vector it was the one that stayed.",
    "Then came the part that barely shows: softening corners, building the lockups, choosing color and type, and taking it onto signs, doors, business cards, the truck and T-shirts to check that it holds up off the screen.",
  ],
  images: [
    "/img/projects/pos/pos-x-MY-03.webp",
    "/img/projects/pos/pos-x-MY-08.webp",
    "/img/projects/pos/pos-x-MY-09.webp",
    "/img/projects/pos/pos-fachada-mockup.webp",
    "/img/projects/pos/pos-x-MY-04.webp",
    "/img/projects/pos/pos-tarjetas-mockup.webp",
    "/img/projects/pos/pos-x-MY-05.webp",
    "/img/projects/pos/pos-letrero-oficina-mockup.webp",
    "/img/projects/pos/pos-x-MY-13.webp",
    "/img/projects/pos/pos-puerta-cristal-mockup.webp",
    "/img/projects/pos/pos-x-MY-14.webp",
    "/img/projects/pos/pos-puerta-interior-mockup.webp",
    "/img/projects/pos/pos-x-MY-06.webp",
    "/img/projects/pos/pos-camion-mockup.webp",
    "/img/projects/pos/pos-x-MY-07.webp",
    "/img/projects/pos/pos-camisetas-mockup.webp",
    "/img/projects/pos/pos-x-MY-10.webp",
    "/img/projects/pos/pos-x-MY-11.webp",
  ],
};

const allianceProject: Project = {
  slug: "alliance",
  title: "Alliance",
  client: "Suheidi Rivera, Alliance Legal Group PLLC (Nueva York)",
  clientEn: "Suheidi Rivera, Alliance Legal Group PLLC (New York)",
  year: "2021",
  role: "Logotipo e identidad de marca",
  roleEn: "Logo and brand identity",
  scope: ["Identidad", "Isotipo y logotipo", "Sistema de color", "Papelería y aplicaciones en relieve"],
  scopeEn: ["Identity", "Symbol and wordmark", "Color system", "Stationery and embossed applications"],
  brief: "Un bufete de Nueva York que necesitaba no parecerse a los demás bufetes. La categoría entera se ve igual: azul marino, dorado y la balanza de la justicia. El encargo era transmitir equilibrio y confianza sin caer en ninguno de esos lugares comunes.",
  briefEn: "A New York law firm that needed to not look like every other law firm. The whole category looks the same: navy, gold and the scales of justice. The brief was to convey balance and trust without landing on any of those clichés.",
  shipped: [
    "Un isotipo de piedras en equilibrio sobre un fulcro: la idea de balance, sin la balanza literal.",
    "Un logotipo en serif clásica, con «Legal Group PLLC» en sans espaciada debajo.",
    "Una paleta cálida de topo y melocotón, en vez del azul marino y dorado de la categoría.",
    "Aplicaciones en relieve: papel negro, relieve dorado y sello de madera.",
  ],
  shippedEn: [
    "A symbol of stones balanced on a fulcrum: the idea of equilibrium, without the literal scales.",
    "A classical serif wordmark, with «Legal Group PLLC» set in spaced sans beneath it.",
    "A warm taupe and peach palette instead of the category's navy and gold.",
    "Embossed applications: black paper, gold emboss and a wooden stamp.",
  ],
  outcome: ["Equilibrio y seriedad, sin un solo recurso gráfico del sector."],
  credits: ["Identidad de marca: Molly Yllom"],
  creditsEn: ["Brand identity: Molly Yllom"],
  outcomeEn: ["Balance and seriousness, without a single stock cue from the sector."],
  portfolioImage: "/img/projects/alliance/alliance-gif-1.mp4",
  heroImage: "/img/projects/alliance/alliance-logo-gold-emboss-mockup.webp",
  paragraphs: [
    "El equilibrio se resolvió con piedras, no con una balanza. Tres círculos y dos travesaños apoyados sobre un fulcro: un montón que se sostiene solo, atrapado justo en el momento en que encuentra su punto.",
    "La decisión de fondo fue cambiar la temperatura de la categoría. En vez del azul marino y el dorado con que se viste todo el sector, la marca corre sobre topo y melocotón. Una serif clásica sostiene la seriedad que un bufete necesita, y una sans espaciada debajo baja el tono lo suficiente para que no se lea como un despacho del siglo pasado.",
    "El isotipo se dibujó pensando en el relieve. Formas macizas, sin línea fina y sin ningún detalle que desaparezca al presionar el papel. Por eso aguanta igual en relieve seco sobre papel negro, en dorado y tallado en un sello de madera.",
  ],
  paragraphsEn: [
    "Balance was solved with stones, not with scales. Three circles and two beams resting on a fulcrum: a stack that holds itself up, caught at the exact moment it finds its point.",
    "The real decision was to change the temperature of the category. Instead of the navy and gold the whole sector wears, the brand runs on taupe and peach. A classical serif carries the seriousness a law firm needs, and a spaced sans underneath lowers the tone just enough that it does not read like a practice from the last century.",
    "The symbol was drawn for emboss. Solid shapes, no hairlines, no detail that disappears when the paper is pressed. That is why it holds up in blind emboss on black paper, in gold, and carved into a wooden stamp.",
  ],
  images: [
    "/img/projects/alliance/alliance-logo-behance-01.webp",
    "/img/projects/alliance/alliance-logo-behance-02.webp",
    "/img/projects/alliance/vintage-wooden-stamp-mockup-design.webp",
    "/img/projects/alliance/alliance-logo-behance-03.webp",
    "/img/projects/alliance/alliance-logo-behance-04.webp",
    "/img/projects/alliance/alliance-logo-behance-05.webp",
    "/img/projects/alliance/alliance-logo-behance-06.webp",
    "/img/projects/alliance/alliance-logo-behance-07.webp",
    "/img/projects/alliance/embossed-logo-mockup-black-paper.webp",
  ],
};

const materDesignProject: Project = {
  slug: "mater-design",
  title: "Mater Design",
  client: "Mater Design (Estados Unidos)",
  clientEn: "Mater Design (United States)",
  year: "2023",
  role: "Identidad de marca",
  roleEn: "Brand identity",
  scope: [
    "Identidad",
    "Logotipo",
    "Sistema de color",
  ],
  scopeEn: [
    "Identity",
    "Logo",
    "Color system",
  ],
  brief: "Mater Design es un estudio de diseño en Estados Unidos. La identidad de un estudio tiene un problema propio: debe ser distintiva sin competir con el trabajo de clientes que va a rodearla todos los días.",
  briefEn: "Mater Design is a design studio in the United States. A studio's own identity has a particular problem: it has to be distinctive without competing with the client work that will surround it every day.",
  shipped: [
    "Un logotipo hecho con formas básicas: cuadrado, círculo y triángulo.",
    "Una paleta viva, pensada para convivir con trabajo ajeno, y sus aplicaciones.",
  ],
  shippedEn: [
    "A logo built from basic shapes: square, circle and triangle.",
    "A vibrant palette made to sit beside other people's work, and its applications.",
  ],
  outcome: ["Una agencia de comunicación visual recibió la marca que imaginaba para su estudio."],
  outcomeEn: ["A visual communication agency got the brand it had in mind for its own studio."],
  credits: [
    "Identidad de marca: Molly Yllom",
  ],
  creditsEn: [
    "Brand identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/mater-design/mater-design-logo-animation-portada.mp4",
  heroImage: "/img/projects/mater-design/mtr-dsgn-x-MY-01.webp",
  paragraphs: [
    "Mater Design es un estudio de diseño radicado en Estados Unidos. Inspirado en palabras como: creatividad, diseño, ideas y pasión; el logo se construyó sobre formas simples como cuadrados, círculos y triángulos, volviendo a lo básico para crear algo impactante y con mucho estilo.",
    "Una paleta viva le da versatilidad dentro del trabajo del propio estudio, donde la identidad tiene que convivir con proyectos de clientes sin competir con ellos.",
  ],
  paragraphsEn: [
    "Mater Design is a design studio based in the United States. Inspired by words like creativity, design, ideas, and passion, the logo was built on simple shapes, squares, circles and triangles, going back to basics to make something bold and full of style.",
    "A vibrant palette gives it versatility inside the studio's own work, where the identity has to sit next to client projects without competing with them.",
  ],
  images: [
    "/img/projects/mater-design/mtr-dsgn-paper-texture-mockup.webp",
    "/img/projects/mater-design/mtr-dsgn-x-MY-02.webp",
    "/img/projects/mater-design/mtr-dsgn-x-MY-03.webp",
    "/img/projects/mater-design/mtr-dsgn-x-MY-04.webp",
    "/img/projects/mater-design/mtr-dsgn-x-MY-05.webp",
    "/img/projects/mater-design/mtr-dsgn-x-MY-06.webp",
    "/img/projects/mater-design/mtr-dsgn-stationary-mockup.webp",
    "/img/projects/mater-design/mtr-dsgn-x-MY-07.webp",
    "/img/projects/mater-design/mtr-dsgn-x-MY-08.webp",
    "/img/projects/mater-design/mtr-dsgn-x-MY-09.webp",
    "/img/projects/mater-design/mtr-dsgn-x-MY-10.webp",
    "/img/projects/mater-design/mtr-dsgn-x-MY-11.webp",
    "/img/projects/mater-design/mtr-dsgn-id-badge-mockup.webp",
  ],
};

const neuschoolProject: Project = {
  slug: "neuschool",
  title: "Neuschool",
  client: "Neuschool",
  year: "2020",
  role: "Rediseño de logotipo",
  roleEn: "Logo redesign",
  scope: [
    "Rediseño de logotipo",
    "Identidad",
    "Aplicaciones digitales",
  ],
  scopeEn: [
    "Logo redesign",
    "Identity",
    "Digital applications",
  ],
  brief: "Neuschool es una plataforma de gestión de estudios que nació de las clases a distancia durante la pandemia. No pedían una marca nueva: querían refrescar la que ya tenían y sumarle un detalle propio, sin perder lo que sus estudiantes ya reconocían.",
  briefEn: "Neuschool is a study management platform born out of remote classes during the pandemic. They were not asking for a new brand: they wanted to refresh the one they had and add a detail of its own, without losing what their students already recognized.",
  shipped: [
    "El logotipo rediseñado, con la estructura que ya se reconocía y un detalle propio.",
    "Aplicaciones para la plataforma.",
  ],
  shippedEn: [
    "The redesigned logo, keeping the structure people knew and adding a detail of its own.",
    "Applications for the platform.",
  ],
  outcome: ["La plataforma estuvo en producción y hoy está en pausa."],
  outcomeEn: ["The platform ran in production and is on hold today."],
  credits: [
    "Rediseño de identidad: Molly Yllom",
  ],
  creditsEn: [
    "Identity redesign: Molly Yllom",
  ],
  portfolioImage: "/img/projects/neuschool/neuschool-gif-1.mp4",
  heroImage: "/img/projects/neuschool/neuschool-notebook-mockup.webp",
  paragraphs: [
    "Acá te presento el re-diseño del logo para Neuschool, una plataforma digital de gestión de estudios que surgió como respuesta a los desafíos que enfrentó la educación en tiempos de distanciamiento social por el Covid-19. Neuschool buscaba dar un nuevo giro a su logo existente y agregar un detalle distintivo que le diera vida propia a la marca.",
    "Inspirada en su compromiso con la innovación educativa, creé un diseño fresco y moderno que refleja la vitalidad y la adaptabilidad de la plataforma.",
    "El rediseño conservó lo que los estudiantes ya reconocían y cambió solo lo que frenaba a la marca, para que la plataforma creciera sin pedirle a sus usuarios que la reaprendieran.",
  ],
  paragraphsEn: [
    "Here is the logo redesign for Neuschool, a digital study management platform that emerged in response to the challenges education faced during the social distancing period of Covid-19. Neuschool wanted to give their existing logo a fresh twist and add a distinctive detail that would give the brand a life of its own.",
    "Inspired by their commitment to educational innovation, I created a fresh and modern design that reflects the platform's vitality and adaptability.",
    "The redesign kept what students already recognized and changed only what was holding the brand back, so the platform could grow without asking its users to relearn it.",
  ],
  images: [
    "/img/projects/neuschool/neuschool-logo-uso-basico-03.webp",
    "/img/projects/neuschool/neuschool-mug-mockup.webp",
    "/img/projects/neuschool/neuschool-logo-uso-basico-05.webp",
    "/img/projects/neuschool/neuschool-logo-uso-basico-06.webp",
    "/img/projects/neuschool/neuschool-logo-uso-basico-07.webp",
    "/img/projects/neuschool/neuschool-logo-uso-basico-08.webp",
    "/img/projects/neuschool/neuschool-logo-uso-basico-09.webp",
    "/img/projects/neuschool/neuschool-ipad-mockup.webp",
    "/img/projects/neuschool/neuschool-headphones-mockup.webp",
    "/img/projects/neuschool/neuschool-logo-uso-basico-10.webp",
  ],
};

const momProject: Project = {
  slug: "mom",
  title: "MOM (Marketing of Minds)",
  client: "Marketing of Minds (MoM)",
  year: "2022",
  role: "Identidad visual",
  roleEn: "Visual identity",
  scope: [
    "Identidad",
    "Logotipo",
    "Sistema flexible",
    "Aplicaciones",
  ],
  scopeEn: [
    "Identity",
    "Logo",
    "Flexible system",
    "Applications",
  ],
  brief: "MoM es una agencia publicitaria dominicana. Una agencia no puede encerrarse en una sola forma: la marca tenía que ser un contenedor capaz de cambiar de contenido sin dejar de ser reconocible.",
  briefEn: "MoM is a Dominican advertising agency. An agency cannot lock itself into a single shape: the brand had to be a container able to change its contents without stopping being recognizable.",
  shipped: [
    "Una caja amarilla donde cabe cualquier idea, y un sistema que toma la forma que haga falta.",
    "Aplicaciones de marca.",
  ],
  shippedEn: [
    "A yellow box where any idea fits, and a system that takes whatever shape is needed.",
    "Brand applications.",
  ],
  outcome: ["La marca sigue en uso por la agencia."],
  outcomeEn: ["The brand is still in use by the agency."],
  credits: [
    "Identidad visual: Molly Yllom",
  ],
  creditsEn: [
    "Visual identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/mom/mom-logo-gif.gif",
  heroImage: "/img/projects/mom/mom-x-my-01.webp",
  paragraphs: [
    "En esta oportunidad les comparto la identidad visual que tuve la oportunidad de crear para la agencia de publicidad dominicana MOM (Marketing of Minds). La idea detrás de este logo era representar un espacio, en este caso la caja amarilla, donde cualquier cosa puede suceder en términos de creatividad y diseño. Este espacio es versátil y se transforma a cualquier forma que necesite.",
    "Con este diseño, buscamos transmitir la esencia de MOM como un lugar donde la creatividad florece y las ideas se convierten en realidad."
  ],
  paragraphsEn: [
    "Here is the visual identity I had the opportunity to create for MOM (Marketing of Minds), a Dominican advertising agency. The idea behind the logo was to represent a space, in this case the yellow box, where anything can happen in terms of creativity and design. This space is versatile and transforms into whatever shape it needs.",
    "With this design, we sought to convey MOM's essence as a place where creativity flourishes and ideas become reality.",
  ],
  images: [
    "/img/projects/mom/mom-x-my-02.webp",
    "/img/projects/mom/mom-x-my-00.webp",
    "/img/projects/mom/mom-x-my-03.webp",
    "/img/projects/mom/mom-x-my-04.webp",
    "/img/projects/mom/mom-x-my-wallsign-mockup.webp",
    "/img/projects/mom/mom-x-my-05.webp",
    "/img/projects/mom/mom-x-my-06.webp",
    "/img/projects/mom/mom-x-my-tshirt-mockup.webp",
    "/img/projects/mom/mom-x-my-07.webp",
    "/img/projects/mom/mom-x-my-08.webp",
    "/img/projects/mom/mom-x-my-09.webp",
    "/img/projects/mom/mom-x-my-enamel-mug-mockup.webp",
    "/img/projects/mom/mom-x-my-10.webp",
    "/img/projects/mom/mom-x-my-11.webp",
    "/img/projects/mom/mom-x-my-12.webp",
    "/img/projects/mom/mom-x-my-doorsign-mockup.webp",
    "/img/projects/mom/mom-x-my-idbadge-mockup.webp",
  ],
};

const neustackProject: Project = {
  slug: "neustack",
  title: "Neustack",
  client: "Neustack",
  year: "2022",
  role: "Rediseño de logotipo",
  roleEn: "Logo redesign",
  scope: [
    "Rediseño de logotipo",
    "Sistema de color",
  ],
  scopeEn: [
    "Logo redesign",
    "Color system",
  ],
  brief: "Neustack necesitaba modernizar su imagen sin volverse otra empresa. El encargo era actualizar, no reinventar: mantener la simplicidad que ya tenía y darle una lectura más segura de sí misma.",
  briefEn: "Neustack needed to modernize its image without becoming another company. The brief was to update, not reinvent: keep the simplicity it already had and give it a more confident read.",
  shipped: [
    "Una N resuelta en un trazo grueso y decidido, en azul y gris.",
    "Una marca hecha para escalar del favicon al stand.",
  ],
  shippedEn: [
    "An N resolved in one bold, decided stroke, in blue and gray.",
    "A mark built to scale from favicon to trade stand.",
  ],
  outcome: ["La marca está en pausa, a la espera del relanzamiento de la empresa."],
  outcomeEn: ["The brand is on hold, waiting on the company's relaunch."],
  credits: [
    "Rediseño de identidad: Molly Yllom",
  ],
  creditsEn: [
    "Identity redesign: Molly Yllom",
  ],
  portfolioImage: "/img/projects/neustack/neustack-gif.mp4",
  heroImage: "/img/projects/neustack/neustack-x-MY-01.webp",
  paragraphs: [
    "El rediseño del logo para Neustack buscaba modernizar su imagen manteniendo la simplicidad. Representé la letra N con una línea gruesa y vibrante, simbolizando la audacia de la empresa en llevar las ideas a la ejecución.",
    "El azul carga la confianza que el sector espera y el gris evita que grite. La marca se construyó para aguantar reducida a un favicon y ampliada a un stand, sin volver a dibujarla.",
  ],
  paragraphsEn: [
    "The logo redesign for Neustack aimed to modernize its image while maintaining simplicity. I represented the letter N with a bold, vibrant line, symbolizing the company's audacity in turning ideas into execution.",
    "Blue carries the trust the sector expects and gray keeps it from shouting. The mark was built to survive being shrunk to a favicon and blown up to a trade stand without redrawing.",
  ],
  images: [
    "/img/projects/neustack/neustack-x-MY-02.webp",
    "/img/projects/neustack/neustack-x-MY-03.webp",
    "/img/projects/neustack/neustack-curved-paper-mockup.webp",
    "/img/projects/neustack/neustack-x-MY-04.webp",
    "/img/projects/neustack/neustack-x-MY-10.webp",
    "/img/projects/neustack/neustack-x-MY-05.webp",
    "/img/projects/neustack/neustack-stationary-mockup.webp",
    "/img/projects/neustack/neustack-stone-wall-metal-sign-mockup.webp",
    "/img/projects/neustack/neustack-x-MY-06.webp",
    "/img/projects/neustack/neustack-x-MY-07.webp",
    "/img/projects/neustack/neustack-thermo-mockup.webp",
    "/img/projects/neustack/neustack-x-MY-09.webp",
    "/img/projects/neustack/neustack-exterior-street-screen-sign-mockup.webp",
  ],
};

const dinerologyProject: Project = {
  slug: "dinerology",
  title: "Dinerology",
  client: "JMMB",
  year: "2022",
  role: "Logotipo y lineamientos gráficos",
  roleEn: "Logo and graphic guidelines",
  scope: [
    "Logotipo",
    "Lineamientos gráficos",
    "Piezas para YouTube",
  ],
  scopeEn: [
    "Logo",
    "Graphic guidelines",
    "YouTube assets",
  ],
  brief: "Dinerology es el canal de YouTube de educación financiera de JMMB. El encargo venía con un límite claro: trabajar dentro de los lineamientos gráficos del banco y con su paleta, sin inventar una marca aparte.",
  briefEn: "Dinerology is JMMB's financial education YouTube channel. The brief came with a hard limit: work inside the bank's existing graphic guidelines and palette, without inventing a separate brand.",
  shipped: [
    "El logotipo del canal, dentro del sistema de JMMB.",
    "Lineamientos gráficos y piezas para YouTube.",
  ],
  shippedEn: [
    "The channel logo, inside the JMMB system.",
    "Graphic guidelines and assets for YouTube.",
  ],
  outcome: ["Bronce en los Effie Awards República Dominicana 2023."],
  outcomeEn: ["Bronze at the Effie Awards Dominican Republic 2023."],
  credits: [
    "Logotipo y lineamientos: Molly Yllom",
  ],
  creditsEn: [
    "Logo and guidelines: Molly Yllom",
  ],
  portfolioImage: "/img/projects/dinerology/logo-6-remix-portada.mp4",
  heroImage: "/img/projects/dinerology/dinerology-japan-exterior-advertising-mockup.webp",
  paragraphs: [
    "Recordando cuando trabajé para crear el logo y la línea gráfica del canal de Youtube «Dinerology», un esfuerzo de JMMB. Me inspiré en la esencia y valores de JMMB, creando un diseño que refleja la innovación, la profesionalidad y la pasión por la educación financiera.",
    "El encargo tenía un límite claro: trabajar dentro de los lineamientos gráficos de JMMB, usando su paleta, sin inventar una marca nueva. La identidad del canal tenía que sentirse propia y seguir leyéndose como banco."
  ],
  paragraphsEn: [
    "Looking back at when I worked to create the logo and graphic guidelines for the YouTube channel «Dinerology», a JMMB initiative. I drew inspiration from JMMB's essence and values, creating a design that reflects innovation, professionalism, and a passion for financial education.",
    "The job came with a hard limit: work inside JMMB's existing graphic guidelines, using their palette, without inventing a new brand. The channel had to feel like its own thing and still read as the bank.",
  ],
  images: [
    "/img/projects/dinerology/dinerology-x-my-logo-behance-01.webp",
    "/img/projects/dinerology/dinerology-x-my-logo-behance-02.webp",
    "/img/projects/dinerology/dinerology-x-my-logo-behance-03.webp",
    "/img/projects/dinerology/dinerology-x-my-logo-behance-04.webp",
    "/img/projects/dinerology/dinerology-black-stand-kiosk-mockup.webp",
  ],
};

const RO = "/img/projects/riccie-oriach";
const ROP = `${RO}/piezas`;
const roMockup: Bilingual = { es: "Montaje", en: "Mockup" };

/**
 * Riccie Oriach told in chapters. The logo pieces are rendered from the 2021
 * vector master (Molly's Drive, 01 CLIENTES/Riccie Oriach/Logo 2021), each on
 * white or on one of the brand's own colours; the merch mockups are the
 * originals already in the folder. The palette codes are transcribed from the
 * brand sheet (riccie-oriach-logo-04).
 */
const riccieOriachStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "Un elefante que también es una R, para una música que no cabe en un solo género.",
      en: "An elephant that is also an R, for music that won't fit in a single genre.",
    },
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      heading: { es: "Un artista que lo mezcla todo.", en: "An artist who mixes it all." },
      text: {
        es: "Esta es la identidad visual que trabajé para Riccie Oriach, un talentoso cantautor dominicano. Riccie Oriach es un artista que expande los sonidos del rock latino con una ola de fusiones caribeñas. Inspirándose en su eclecticismo y sensibilidades artísticas, Riccie ha fusionado ritmos propios de la República Dominicana como la salve, los palos, el gagá, el merengue y el pripri, con estilos internacionales como el rock, el hip-hop, la salsa e incluso el punk.",
        en: "This is the visual identity I created for Riccie Oriach, a talented Dominican singer-songwriter. Riccie Oriach is an artist who expands Latin rock sounds with a wave of Caribbean fusions. Drawing from his eclecticism and artistic sensibilities, Riccie has blended rhythms native to the Dominican Republic, salve, palos, gagá, merengue and pripri, with international styles like rock, hip-hop, salsa, and even punk.",
      },
      blocks: [
        { kind: "image", size: "bleed", image: { src: `${RO}/riccie-oriach-camiseta-mockup.webp`, title: { es: "Camiseta", en: "T-shirt" }, detail: roMockup } },
      ],
    },
    {
      id: "logo",
      label: { es: "El logo", en: "The logo" },
      heading: { es: "Un elefante dentro de una R.", en: "An elephant inside an R." },
      text: {
        es: "El objetivo del logo era capturar visualmente la personalidad única de Riccie Oriach como artista. A través de un diseño distintivo y poderoso, busqué transmitir la energía y la pasión que Riccie infunde en su música.",
        en: "The goal of the logo was to visually capture Riccie Oriach's unique personality as an artist. Through a distinctive and powerful design, I sought to convey the energy and passion that Riccie infuses into his music.",
      },
      blocks: [
        { kind: "image", size: "wide", image: { src: `${ROP}/logo-horizontal.webp`, title: { es: "Logo horizontal", en: "Horizontal logo" }, detail: { es: "A todo color", en: "Full color" } } },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 3, phone: 1 },
          ratio: "1/1",
          items: [
            { src: `${ROP}/logo-vertical.webp`, title: { es: "Logo vertical", en: "Vertical logo" }, detail: { es: "A todo color", en: "Full color" } },
            { src: `${ROP}/logo-vertical-cafe.webp`, title: { es: "Logo vertical", en: "Vertical logo" }, detail: { es: "En negativo, sobre café", en: "Reversed, on brown" } },
            { src: `${ROP}/logo-vertical-mostaza.webp`, title: { es: "Logo vertical", en: "Vertical logo" }, detail: { es: "En negativo, sobre mostaza", en: "Reversed, on mustard" } },
          ],
        },
        {
          kind: "palette",
          colors: [
            { name: { es: "Verde", en: "Green" }, hex: "#8F993E", codes: ["RGB 143 153 62", "CMYK 47 27 96 5", "Pantone 7495 C"] },
            { name: { es: "Café", en: "Brown" }, hex: "#443635", codes: ["RGB 68 54 53", "CMYK 60 66 62 54", "Pantone 439 C"] },
            { name: { es: "Mostaza", en: "Mustard" }, hex: "#D29E0E", codes: ["RGB 210 158 14", "CMYK 19 37 100 1", "Pantone 7555 C"] },
          ],
        },
      ],
    },
    {
      id: "aplicaciones",
      label: { es: "Aplicaciones", en: "Applications" },
      heading: { es: "En la gorra, la taza y la patineta.", en: "On the cap, the mug and the skateboard." },
      blocks: [
        { kind: "image", size: "bleed", image: { src: `${ROP}/logo-horizontal-verde.webp`, title: { es: "Logo horizontal", en: "Horizontal logo" }, detail: { es: "En negativo, sobre verde", en: "Reversed, on green" } } },
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "Montajes", en: "Mockups" },
          items: [
            { src: `${RO}/riccie-oriach-bag-mockup.webp`, title: { es: "Bolso de tela", en: "Tote bag" }, detail: roMockup },
            { src: `${RO}/riccie-oriach-bucket-hat-mockup.webp`, title: { es: "Sombrero de pescador", en: "Bucket hat" }, detail: roMockup },
            { src: `${RO}/riccie-oriach-flathat-mockup.webp`, title: { es: "Gorra", en: "Cap" }, detail: roMockup },
            { src: `${RO}/riccie-oriach-mug-mockup.webp`, title: { es: "Tazas", en: "Mugs" }, detail: roMockup },
            { src: `${RO}/riccie-oriach-skateboard-mockup.webp`, title: { es: "Patinetas", en: "Skateboards" }, detail: roMockup },
            { src: `${RO}/riccie-oriach-sticker-mockup.webp`, title: { es: "Sticker", en: "Sticker" }, detail: roMockup },
            { src: `${RO}/riccie-oriach-acrilico-mockup.webp`, title: { es: "Placa de acrílico", en: "Acrylic plaque" }, detail: roMockup },
          ],
        },
      ],
    },
  ],
  closing: {
    image: { src: `${RO}/riccie-oriach-car-sticker-mockup.webp`, title: { es: "Sticker para carro", en: "Car sticker" }, detail: roMockup },
  },
};

const riccieOriachProject: Project = {
  slug: "riccie-oriach",
  title: "Riccie Oriach",
  client: "Riccie Oriach",
  year: "2021",
  role: "Identidad visual",
  roleEn: "Visual identity",
  scope: [
    "Identidad",
    "Logotipo",
    "Aplicaciones musicales",
  ],
  scopeEn: [
    "Identity",
    "Logo",
    "Music applications",
  ],
  brief: "Riccie Oriach mezcla ritmos dominicanos como salve, palos, gagá, merengue y pripri con rock, hip-hop, salsa y punk. Una marca que representa esa mezcla no puede apoyarse en un solo género sin traicionar al resto.",
  briefEn: "Riccie Oriach mixes Dominican rhythms like salve, palos, gagá, merengue and pripri with rock, hip-hop, salsa and punk. A brand representing that mix cannot lean on a single genre without betraying the rest.",
  shipped: [
    "Un logotipo que carga la personalidad del artista antes que un género.",
    "Un sistema visual para lanzamientos y plataformas.",
  ],
  shippedEn: [
    "A logo that carries the artist's personality before any one genre.",
    "A visual system for releases and platforms.",
  ],
  outcome: ["La identidad sigue viva y en uso por el artista."],
  outcomeEn: ["The identity is still live and in use by the artist."],
  credits: [
    "Identidad visual: Molly Yllom",
  ],
  creditsEn: [
    "Visual identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/riccie-oriach/riccie-oriach-gif.mp4",
  heroImage: "/img/projects/riccie-oriach/piezas/portada.webp",
  paragraphs: [
    "Esta es la identidad visual que trabajé para Riccie Oriach, un talentoso cantautor dominicano. Riccie Oriach es un artista que expande los sonidos del rock latino con una ola de fusiones caribeñas. Inspirándose en su eclecticismo y sensibilidades artísticas, Riccie ha fusionado ritmos propios de la República Dominicana como la salve, los palos, el gagá, el merengue y el pripri, con estilos internacionales como el rock, el hip-hop, la salsa e incluso el punk.",
    "El objetivo del logo era capturar visualmente la personalidad única de Riccie Oriach como artista. A través de un diseño distintivo y poderoso, busqué transmitir la energía y la pasión que Riccie infunde en su música."
  ],
  paragraphsEn: [
    "This is the visual identity I created for Riccie Oriach, a talented Dominican singer-songwriter. Riccie Oriach is an artist who expands Latin rock sounds with a wave of Caribbean fusions. Drawing from his eclecticism and artistic sensibilities, Riccie has blended rhythms native to the Dominican Republic, salve, palos, gagá, merengue and pripri, with international styles like rock, hip-hop, salsa, and even punk.",
    "The goal of the logo was to visually capture Riccie Oriach's unique personality as an artist. Through a distinctive and powerful design, I sought to convey the energy and passion that Riccie infuses into his music.",
  ],
  images: [
    "/img/projects/riccie-oriach/riccie-oriach-logo-02.webp",
    "/img/projects/riccie-oriach/riccie-oriach-logo-03.webp",
    "/img/projects/riccie-oriach/riccie-oriach-logo-04.webp",
    "/img/projects/riccie-oriach/riccie-oriach-logo-07.webp",
    "/img/projects/riccie-oriach/riccie-oriach-logo-05.webp",
    "/img/projects/riccie-oriach/riccie-oriach-logo-06.webp",
    "/img/projects/riccie-oriach/riccie-oriach-acrilico-mockup.webp",
    "/img/projects/riccie-oriach/riccie-oriach-bag-mockup.webp",
    "/img/projects/riccie-oriach/riccie-oriach-bucket-hat-mockup.webp",
    "/img/projects/riccie-oriach/riccie-oriach-camiseta-mockup.webp",
    "/img/projects/riccie-oriach/riccie-oriach-mug-mockup.webp",
    "/img/projects/riccie-oriach/riccie-oriach-flathat-mockup.webp",
    "/img/projects/riccie-oriach/riccie-oriach-skateboard-mockup.webp",
    "/img/projects/riccie-oriach/riccie-oriach-sticker-mockup.webp",
    "/img/projects/riccie-oriach/riccie-oriach-car-sticker-mockup.webp",
  ],
  story: riccieOriachStory,
};

const greenSpiritProject: Project = {
  slug: "green-spirit",
  title: "Green Spirit",
  client: "Green Spirit",
  year: "2019",
  role: "Logotipo e identidad visual",
  roleEn: "Logo and visual identity",
  scope: [
    "Identidad",
    "Logotipo",
    "Sistema de color",
  ],
  scopeEn: [
    "Identity",
    "Logo",
    "Color system",
  ],
  brief: "Green Spirit ayuda a la gente a conectar con las plantas. El riesgo de la categoría es obvio: todo lo verde termina pareciéndose. La marca tenía que salir del producto y no de una idea genérica de naturaleza.",
  briefEn: "Green Spirit helps people connect with plants. The category risk is obvious: everything green ends up looking alike. The brand had to come out of the product rather than a generic idea of nature.",
  shipped: [
    "El logotipo y la identidad visual.",
    "Una paleta orgánica tomada de las plantas, y sus aplicaciones.",
  ],
  shippedEn: [
    "The logo and visual identity.",
    "An organic palette pulled from the plants themselves, and its applications.",
  ],
  outcome: ["La marca sigue viva y en uso."],
  outcomeEn: ["The brand is still live and in use."],
  credits: [
    "Identidad visual: Molly Yllom",
  ],
  creditsEn: [
    "Visual identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/green-spirit/green-spirit-gif.mp4",
  heroImage: "/img/projects/green-spirit/green-spirit-logo-05.webp",
  paragraphs: [
    "En esta ocasión trabajé para crear el logo e identidad visual de Green Spirit. Inspirada en la misión de Green Spirit de ayudar a las personas a conectar con las plantas, creé un diseño que refleja la vitalidad y la armonía de la naturaleza.",
    "Con una paleta de colores frescos y orgánicos, y un diseño distintivo, Green Spirit ahora tiene una identidad visual que comunica su compromiso con la sostenibilidad y el bienestar.",
    "La paleta salió de las plantas mismas y no de una idea genérica de lo verde, para que la marca conviva con el producto sin pelearse con él."
  ],
  paragraphsEn: [
    "This time I worked to create the logo and visual identity for Green Spirit. Inspired by Green Spirit's mission to help people connect with plants, I created a design that reflects the vitality and harmony of nature.",
    "With a palette of fresh, organic colors and a distinctive design, Green Spirit now has a visual identity that communicates their commitment to sustainability and well-being.",
    "The palette came out of the plants themselves rather than a generic idea of green, so the brand sits beside the product instead of fighting it.",
  ],
  images: [
    "/img/projects/green-spirit/green-spirit-logo-06.webp",
    "/img/projects/green-spirit/green-spirit-logo-07.webp",
    "/img/projects/green-spirit/green-spirit-icon-gif.gif",
    "/img/projects/green-spirit/green-spirit-logo-09.webp",
    "/img/projects/green-spirit/green-spirit-logo-10.webp",
    "/img/projects/green-spirit/green-spirit-logo-11.webp",
    "/img/projects/green-spirit/green-spirit-card-mockup.webp",
    "/img/projects/green-spirit/green-spirit-logo-08.webp",
    "/img/projects/green-spirit/green-spirit-pot-mockup.webp",
    "/img/projects/green-spirit/green-spirit-tag-mockup.webp",
    "/img/projects/green-spirit/green-spirit-notebook-mockup.webp",
  ],
};

const distopiaProject: Project = {
  slug: "distopia",
  title: "Distopia",
  client: "Distopia",
  year: "2016",
  role: "Logotipo e identidad visual",
  roleEn: "Logo and visual identity",
  scope: [
    "Identidad",
    "Logotipo",
    "Piezas digitales",
    "Impresos",
    "Murales",
  ],
  scopeEn: [
    "Identity",
    "Logo",
    "Digital assets",
    "Print",
    "Murals",
  ],
  gridLabel: "Identidad · Murales",
  gridLabelEn: "Identity · Murals",
  brief: "Distopia sostuvo la escena de música electrónica dominicana dentro y fuera del país. El nombre pedía un enfoque atípico, y la marca tenía que aguantar tanto una pantalla como la pared de un espacio de fiesta.",
  briefEn: "Distopia supported the Dominican electronic music scene at home and abroad. The name asked for an atypical approach, and the brand had to hold up on a screen and on the wall of a party space alike.",
  shipped: [
    "Un logotipo minimalista con influencia de Op Art.",
    "Piezas digitales e impresas, y murales.",
  ],
  shippedEn: [
    "A minimalist logo with an Op Art influence.",
    "Digital and print pieces, and murals.",
  ],
  outcome: ["La identidad se desplegó en digital, impreso y a escala de mural."],
  outcomeEn: ["The identity rolled out across digital, print and at mural scale."],
  credits: [
    "Identidad visual: Molly Yllom",
  ],
  creditsEn: [
    "Visual identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/distopia/distopia-tee-design-animation-portada.mp4",
  heroImage: "/img/projects/distopia/distopia-posters-mockup.webp",
  paragraphs: [
    "Aquí te comparto el proyecto de diseño de logo e identidad visual para Distopia, una plataforma que en su momento apoyó la escena musical y artística de la cultura de la música electrónica dominicana a nivel local e internacional.",
    "Inspirada en su nombre y su enfoque atípico y distópico, creé un diseño minimalista con influencia del Opt Art, que refleja su carácter único y diferente.",
    "Desde el logo hasta las piezas gráficas digitales y físicas, así como murales e impresos, tuve la oportunidad de desarrollar una identidad visual vibrante y distintiva para la marca."
  ],
  paragraphsEn: [
    "Here is the logo and visual identity design project for Distopia, a platform that once supported the musical and artistic scene of Dominican electronic music culture, both locally and internationally.",
    "Inspired by its name and its atypical, dystopian approach, I created a minimalist design influenced by Op Art, reflecting its unique and distinctive character.",
    "From the logo to digital and physical graphic pieces, as well as murals and print materials, I had the opportunity to develop a vibrant and distinctive visual identity for the brand.",
  ],
  images: [
    "/img/projects/distopia/distopia-tee-design-animation.gif",
    "/img/projects/distopia/distopia-logo-negativo.webp",
    "/img/projects/distopia/distopia-logo-tp-mockup.webp",
    "/img/projects/distopia/distopia-parties.mp4",
    "/img/projects/distopia/distopia-logo-tee-mockup.webp",
    "/img/projects/distopia/distopia-logo-03.webp",
  ],
};

const indhauciProject: Project = {
  slug: "indhauci",
  title: "INDHAUCI",
  client: "Constructora INDHAUCI",
  year: "2020",
  role: "Rediseño de imagen corporativa",
  roleEn: "Corporate image redesign",
  scope: [
    "Identidad corporativa",
    "Logotipo",
    "Aplicaciones",
  ],
  scopeEn: [
    "Corporate identity",
    "Logo",
    "Applications",
  ],
  brief: "Constructora INDHAUCI lleva más de 20 años operando. Rediseñar una marca con dos décadas de reconocimiento acumulado tiene un riesgo claro: modernizarla hasta volverla irreconocible para quienes ya la conocían.",
  briefEn: "Constructora INDHAUCI has been operating for more than 20 years. Redesigning a brand with two decades of accumulated recognition carries an obvious risk: modernizing it until it stops being recognizable to the people who already knew it.",
  shipped: [
    "Un logotipo actualizado, con los códigos que ya identificaban a la empresa.",
    "Su implementación en distintas piezas corporativas.",
  ],
  shippedEn: [
    "An updated logo that keeps the codes that already identified the company.",
    "Its implementation across corporate pieces.",
  ],
  outcome: ["La imagen corporativa sigue en uso por la empresa."],
  outcomeEn: ["The corporate image is still in use by the company."],
  credits: [
    "Rediseño de identidad corporativa: Molly Yllom",
  ],
  creditsEn: [
    "Corporate identity redesign: Molly Yllom",
  ],
  portfolioImage: "/img/projects/indhauci/indhauci-gif-1.mp4",
  heroImage: "/img/projects/indhauci/indhauci-logo-sticker-mockup.webp",
  paragraphs: [
    "Constructora INDHAUCI es la compañía que mis padres fundaron hace más de 20 años. Rediseñar su imagen corporativa significó actualizar una marca con dos décadas de reconocimiento acumulado sin borrar lo que ya la hacía reconocible.",
    "Con orgullo, he tenido la oportunidad de desarrollar una nueva identidad visual que refleje la calidad y el legado de nuestra empresa, la cual llevo muy cerca del corazón.",
    "Desde el logo hasta la implementación en distintas piezas, este proyecto representa un homenaje a nuestra historia y un paso hacia el futuro de INDHAUCI."
  ],
  paragraphsEn: [
    "Constructora INDHAUCI is the company my parents founded more than 20 years ago. Redesigning its corporate image meant updating a brand with two decades of accumulated recognition without erasing what already made it recognizable.",
    "With pride, I had the opportunity to develop a new visual identity that reflects the quality and legacy of our company, which is very close to my heart.",
    "From the logo to its implementation across different pieces, this project represents a tribute to our history and a step toward the future of INDHAUCI.",
  ],
  images: [
    "/img/projects/indhauci/indhauci-logo-animation.gif",
    "/img/projects/indhauci/indhauci-logo-06.webp",
    "/img/projects/indhauci/indhauci-logo-07.webp",
    "/img/projects/indhauci/indhauci-logo-04.webp",
    "/img/projects/indhauci/indhauci-logo-08.webp",
    "/img/projects/indhauci/indhauci-logo-10.webp",
    "/img/projects/indhauci/indhauci-logo-09.webp",
    "/img/projects/indhauci/indhauci-logo-pattern-mockup.webp",
    "/img/projects/indhauci/indhauci-logo-11.webp",
    "/img/projects/indhauci/indhauci-logo-concrete-mockup.webp",
    "/img/projects/indhauci/indhauci-logo-helmet-mockup.webp"
  ],
};

const ditoDicoProject: Project = {
  slug: "dito-dico",
  title: "Dito Dico",
  client: "Dito Dico",
  year: "2018",
  role: "Logotipo, identidad y personaje",
  roleEn: "Logo, identity and character",
  scope: [
    "Identidad",
    "Logotipo",
    "Ilustración de personaje",
    "Aplicaciones",
  ],
  scopeEn: [
    "Identity",
    "Logo",
    "Character illustration",
    "Applications",
  ],
  brief: "Dito Dico es un DJ dominicano que fusiona sonido tropical con funk y electrónica. Un logotipo solo no alcanzaba para cargar esa energía, así que la marca necesitaba una cara.",
  briefEn: "Dito Dico is a Dominican DJ fusing tropical sound with funk and electronic music. A logo on its own could not carry that energy, so the brand needed a face.",
  shipped: [
    "Una mascota ilustrada al estilo de los cartoons de los años 30, con un disco al centro del sistema.",
    "El logotipo y su implementación en distintos materiales.",
  ],
  shippedEn: [
    "An illustrated mascot in a 1930s cartoon style, with a record at the center of the system.",
    "The logo and its use across materials.",
  ],
  outcome: ["La marca y el personaje siguen vivos y en uso por el artista."],
  outcomeEn: ["The brand and the character are still live and in use by the artist."],
  credits: [
    "Identidad e ilustración: Molly Yllom",
  ],
  creditsEn: [
    "Identity and illustration: Molly Yllom",
  ],
  portfolioImage: "/img/projects/dito-dico/dito-dico-gif-1.gif",
  heroImage: "/img/projects/dito-dico/dito-dico-camiseta-mockup-02.webp",
  paragraphs: [
    "Este es el proyecto de diseño de logo e identidad visual que trabajé para Dito Dico, un talentoso DJ dominicano que fusiona el sonido tropical con el funky y lo electrónico.",
    "Me inspiré en su estilo único y enérgico, creamos un personaje mascota caricaturesco de los años 30's que representa al artista a través de su marca.",
    "El elemento central, un «disco», captura la esencia de su música y personalidad. Desde el logo hasta la implementación en diversos materiales, este proyecto refleja la pasión y la creatividad de Dito Dico en cada detalle."
  ],
  paragraphsEn: [
    "This is the logo and visual identity design project I created for Dito Dico, a talented Dominican DJ who fuses tropical sound with funky and electronic music.",
    "Inspired by his unique and energetic style, we created a 1930s-style cartoon mascot character that represents the artist through his brand.",
    "The central element, a 'disc', captures the essence of his music and personality. From the logo to its implementation across various materials, this project reflects Dito Dico's passion and creativity in every detail.",
  ],
  images: [
    "/img/projects/dito-dico/dito-dico-patch-mockup.webp",
    "/img/projects/dito-dico/dito-dico-logo-01.webp",
    "/img/projects/dito-dico/dito-dico-sets.mp4",
    "/img/projects/dito-dico/dito-dico-logo-02.webp",
    "/img/projects/dito-dico/dito-dico-bucket-hat-mockup.webp",
    "/img/projects/dito-dico/dito-dico-logo-03.webp",
    "/img/projects/dito-dico/dito-dico-camiseta-mockup-01.webp",
    "/img/projects/dito-dico/dito-dico-logo-04.webp",
    "/img/projects/dito-dico/dito-dico-hoodie-mockup-02.webp",
    "/img/projects/dito-dico/dito-dico-logo-05.webp",
    "/img/projects/dito-dico/dito-dico-hoodie-mockup-01.webp",
    "/img/projects/dito-dico/dito-dico-logo-06.webp",
    "/img/projects/dito-dico/dito-dico-logo-08.webp",
    "/img/projects/dito-dico/dito-dico-skateboard-mockup.webp"
  ],
};

const bhMobiliarioProject: Project = {
  slug: "bh-mobiliario",
  title: "BH Mobiliario",
  client: "BH Mobiliario",
  year: "2023",
  role: "Identidad de marca",
  roleEn: "Brand identity",
  scope: [
    "Identidad",
    "Logotipo",
    "Aplicaciones",
  ],
  scopeEn: [
    "Identity",
    "Logo",
    "Applications",
  ],
  brief: "BH Mobiliario vende mobiliario de oficina. En una categoría que suele venderse por catálogo y precio, la marca tenía que hablar de producto y de trato al mismo tiempo.",
  briefEn: "BH Mobiliario sells office furniture. In a category usually sold on catalogue and price, the brand had to speak about the product and about how they treat people at the same time.",
  shipped: [
    "Un logotipo en el que un estante de oficina forma las letras BH.",
    "Un sistema visual para el catálogo y la comunicación, y sus aplicaciones.",
  ],
  shippedEn: [
    "A logo where an office shelf forms the letters BH.",
    "A visual system for the catalogue and communication, and its applications.",
  ],
  outcome: ["La marca sigue viva y en uso por la empresa."],
  outcomeEn: ["The brand is still live and in use by the company."],
  credits: [
    "Identidad de marca: Molly Yllom",
  ],
  creditsEn: [
    "Brand identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/bh-mobiliario/bh-mobiliario-web-cover.mp4",
  heroImage: "/img/projects/bh-mobiliario/bh-mobiliario-office-wall-mockup.webp",
  paragraphs: [
    "En BH Mobiliario, la visión es clara: ofrecer soluciones de mobiliario que transformen espacios de trabajo en entornos productivos y acogedores. Mi trabajo en el desarrollo del branding para esta empresa se centró en crear una identidad visual que refleje su compromiso con la calidad y el servicio excepcional.",
    "El logo diseñado representa un estante de oficina que forma elegantemente las letras 'BH', simbolizando tanto la funcionalidad de sus productos como la perspectiva de servicio personalizado que brindan a sus clientes. Esta representación visual encapsula la esencia de BH Mobiliario: un enfoque en la cotidianidad del trabajo y la elegancia del diseño, creando una conexión de confianza y respeto con su audiencia.",
    "Cada pieza de mobiliario, desde escritorios ergonómicos hasta sillas de alta calidad, es una manifestación del compromiso de la empresa con la personalización y la eficiencia. Con esta nueva identidad, BH Mobiliario está listo para llevar su proyecto al siguiente nivel, destacando su profesionalismo y familiaridad en el sector."
  ],
  paragraphsEn: [
    "At BH Mobiliario, the vision is clear: to offer furniture solutions that transform workspaces into productive and welcoming environments. My work on the branding for this company focused on creating a visual identity that reflects their commitment to quality and exceptional service.",
    "The logo represents an office shelf that elegantly forms the letters 'BH', symbolizing both the functionality of their products and the personalized service perspective they offer their clients. This visual representation encapsulates BH Mobiliario's essence: a focus on the everyday work environment and design elegance, building a relationship of trust and respect with their audience.",
    "Every piece of furniture, from ergonomic desks to high-quality chairs, is a manifestation of the company's commitment to customization and efficiency. With this new identity, BH Mobiliario is ready to take their project to the next level, highlighting their professionalism and familiarity in the sector.",
  ],
  images: [
    "/img/projects/bh-mobiliario/bh-mobiliario-x-my-02.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-x-my-01.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-card-mockup.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-x-my-03.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-x-my-04.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-building-sign-mockup.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-door-logo-mockup.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-x-my-05.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-tshirt-mockup.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-paper-texture-mockup.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-x-my-06.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-emboss-mockup.webp",
    "/img/projects/bh-mobiliario/bh-mobiliario-stationary-mockup.webp",
  ],
};

const mlLogoProject: Project = {
  slug: "maria-lunares",
  title: "Maria Lunares",
  client: "Maria Lunares, artista musical independiente",
  clientEn: "Maria Lunares, independent music artist",
  year: "2023 - 2024",
  role: "Dirección creativa, identidad y desarrollo front-end",
  roleEn: "Creative direction, identity and front-end development",
  scope: ["Concepto", "Identidad", "Dirección de arte", "Diseño web", "Desarrollo front-end"],
  scopeEn: ["Concept", "Identity", "Art direction", "Web design", "Front-end development"],
  gridLabel: "Diseño web · Desarrollo front-end",
  gridLabelEn: "Web design · Front-end development",
  brief: "Una artista musical independiente necesitaba una identidad digital propia y un lugar donde viviera. La marca se construyó primero, y el sitio salió de ella.",
  briefEn: "An independent music artist needed a digital identity of her own and a place for it to live. The brand was built first, and the site came out of it.",
  shipped: [
    "El concepto y la identidad visual, a partir del significado del nombre.",
    "La dirección de arte del universo visual del proyecto.",
    "marialunares.com, diseñado y programado por mí en Next.js.",
    "La animación del video oficial de «Raíces».",
  ],
  shippedEn: [
    "Concept and visual identity built out of the meaning of the name.",
    "Art direction for the visual universe of the project.",
    "marialunares.com, designed and coded by me in Next.js.",
    "Animation for the official «Raíces» music video.",
  ],
  outcome: ["El sitio sigue en línea en marialunares.com."],
  outcomeEn: ["The site is still live at marialunares.com."],
  credits: [
    "Dirección creativa, identidad y desarrollo: Molly Yllom",
    "Ilustración del video «Raíces»: Lorena La Chill",
    "Animación del video «Raíces»: Molly Yllom",
  ],
  creditsEn: [
    "Creative direction, identity and development: Molly Yllom",
    "Illustration for the «Raíces» video: Lorena La Chill",
    "Animation for the «Raíces» video: Molly Yllom",
  ],
  portfolioImage: "/img/projects/maria-lunares/ml-logo-animado-1x1-1-portada.mp4",
  heroImage: "/img/projects/maria-lunares/ml-logo-x-my-01.webp",
  paragraphs: [
    "Viene del latín y significa Mares Lunares. Los primeros astrónomos les llamaron así a las manchas de la Luna porque parecen grandes concentraciones de agua, pero no lo son. Son planicies extensas, oscuras y basálticas, resultado de impactos de meteoritos.",
    "Maria Lunares representa esa vista que desde una perspectiva exterior, un ser humano puede parecer algo que no es lo que realmente es.",
  ],
  paragraphsEn: [
    "It comes from Latin and means Lunar Seas. Early astronomers named the moon's dark patches this way because they resemble large concentrations of water, but they are not. They are vast, dark, basaltic plains formed by meteorite impacts.",
    "Maria Lunares represents the view that from an outside perspective, a human being can appear to be something other than what they truly are.",
  ],
  images: [
    "/img/projects/maria-lunares/ml-logo-x-my-02.webp",
    "/img/projects/maria-lunares/maria-lunares-hoodie-mockup.webp",
    "/img/projects/maria-lunares/ml-logo-x-my-03.webp",
    "/img/projects/maria-lunares/maria-lunares-tshirt-mockup.webp",
    "/img/projects/maria-lunares/ml-logo-x-my-04.webp",
    "/img/projects/maria-lunares/maria-lunares-lp-mockup.webp",
    "/img/projects/maria-lunares/maria-lunares-two-mugs-mockup.webp",
    "/img/projects/maria-lunares/maria-lunares-black-sweater-mokcup.webp",
  ],
};

const cdtLogoProject: Project = {
  slug: "canteras-del-tropico",
  title: "Canteras del Trópico",
  client: "Canteras del Trópico",
  year: "2022",
  role: "Logotipo y branding",
  roleEn: "Logo and branding",
  scope: [
    "Identidad",
    "Logotipo",
    "Aplicaciones industriales",
  ],
  scopeEn: [
    "Identity",
    "Logo",
    "Industrial applications",
  ],
  brief: "Canteras del Trópico extrae roca y materiales de alta calidad. La minería se comunica casi siempre desde la fuerza bruta, y aquí hacía falta que también se viera el lado humano y de servicio que diferencia a la empresa.",
  briefEn: "Canteras del Trópico extracts high quality rock and materials. Mining almost always communicates through brute force, and here the human, service-driven side that sets the company apart had to show as well.",
  shipped: [
    "Un logotipo que une piedra y maquinaria de excavación.",
    "Un sistema visual que equilibra fuerza y trato humano, y sus aplicaciones.",
  ],
  shippedEn: [
    "A logo that joins stone and excavation machinery.",
    "A visual system balancing strength with a human approach, and its applications.",
  ],
  outcome: ["La marca sigue viva y en uso por la empresa."],
  outcomeEn: ["The brand is still live and in use by the company."],
  credits: [
    "Identidad de marca: Molly Yllom",
  ],
  creditsEn: [
    "Brand identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/canteras-del-tropico/cdt-logo-2022-animation-portada.mp4",
  heroImage: "/img/projects/canteras-del-tropico/canteras-del-tropico-logo-01.webp",
  paragraphs: [
    "En el proyecto de creación de logo y branding para Canteras del Trópico, me propuse capturar la esencia de una empresa dedicada a la minería y extracción de rocas y materiales de alta calidad. El diseño integra elementos que evocan piedras y excavadoras, simbolizando la fuerza y precisión en sus operaciones. Además, quise resaltar el aspecto de humanidad y servicio que distingue a la empresa, reflejando su compromiso con las comunidades y el medio ambiente. El resultado es una identidad visual que equilibra la robustez de la industria minera con un enfoque humano y orientado al servicio.",
  ],
  paragraphsEn: [
    "In the logo and branding project for Canteras del Trópico, I set out to capture the essence of a company dedicated to mining and extracting high-quality rocks and materials. The design integrates elements evoking stones and excavators, symbolizing the strength and precision of their operations. I also wanted to highlight the human and service-oriented aspect that sets the company apart, reflecting their commitment to communities and the environment. The result is a visual identity that balances the robustness of the mining industry with a human, service-driven approach.",
  ],
  images: [
    "/img/projects/canteras-del-tropico/canteras-del-tropico-logo-02.webp",
    "/img/projects/canteras-del-tropico/canteras-del-tropico-logo-03.webp",
    "/img/projects/canteras-del-tropico/canteras-del-tropico-logo-04.webp",
    "/img/projects/canteras-del-tropico/canteras-del-tropico-logo-05.webp",
    "/img/projects/canteras-del-tropico/canteras-del-tropico-logo-06.webp",
    "/img/projects/canteras-del-tropico/canteras-del-tropico-logo-07.webp",
    "/img/projects/canteras-del-tropico/cdt-papeleria.webp",
  ],
};

const advanced: Project = {
  slug: "advanced-therapy",
  title: "Advanced Therapy",
  client: "Advanced Therapy of South Florida (Estados Unidos)",
  clientEn: "Advanced Therapy of South Florida (United States)",
  year: "2024",
  role: "Logotipo y branding",
  roleEn: "Logo and branding",
  scope: [
    "Identidad",
    "Logotipo",
    "Sistema de color",
    "Aplicaciones",
  ],
  scopeEn: [
    "Identity",
    "Logo",
    "Color system",
    "Applications",
  ],
  brief: "Advanced Therapy of South Florida es un centro de servicios psicológicos. Como en cualquier marca que trata con la confianza de la gente, el diseño tenía que transmitir seriedad sin volverse frío, porque alguien que busca terapia no necesita que lo intimiden.",
  briefEn: "Advanced Therapy of South Florida is a psychological services center. As with any brand dealing in people's trust, the design had to convey seriousness without turning cold, because someone looking for therapy does not need to be intimidated.",
  shipped: [
    "Un logotipo construido sobre la idea de desenredar la mente.",
    "Un sistema visual profesional y cercano, y sus aplicaciones.",
  ],
  shippedEn: [
    "A logo built on the idea of untangling the mind.",
    "A visual system that is professional and approachable, and its applications.",
  ],
  outcome: ["Un cliente estadounidense, en Florida, trabajado en remoto desde Santo Domingo."],
  outcomeEn: ["A US client, in Florida, worked remotely from Santo Domingo."],
  credits: [
    "Identidad de marca: Molly Yllom",
  ],
  creditsEn: [
    "Brand identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/advanced-therapy/atosf-logo-cover-animation.mp4",
  heroImage: "/img/projects/advanced-therapy/atosf-stationary.webp",
  paragraphs: [
    "En el proyecto de creación de logo y branding para Advanced Therapy of South Florida, me propuse capturar la esencia de un centro terapéutico que sirve como refugio para individuos en buscan de servicios psicológicos. Mi objetivo fue diseñar una identidad visual que reflejara profesionalismo, elegancia y modernidad, transmitiendo confianza y dejando una impresión memorable. El concepto se basa en representar a Advanced Therapy como el lugar donde los pacientes pueden desenredar sus mentes y avanzar hacia una mejor salud mental. A través de símbolos que evocan la psicología y la terapia, el logo busca tener un impacto significativo y comunicar la excelencia en el servicio que la clínica brinda a sus pacientes.",
  ],
  paragraphsEn: [
    "In the logo and branding project for Advanced Therapy of South Florida, I set out to capture the essence of a therapeutic center that serves as a refuge for individuals seeking psychological services. My goal was to design a visual identity that reflects professionalism, elegance and modernity, conveying trust and leaving a memorable impression. The concept is based on representing Advanced Therapy as the place where patients can untangle their minds and move toward better mental health. Through symbols that evoke psychology and therapy, the logo seeks to make a meaningful impact and communicate the excellence in service that the clinic provides to its patients.",
  ],
  images: [
    "/img/projects/advanced-therapy/atosf-logo-01.webp",
    "/img/projects/advanced-therapy/atosf-logo-03.webp",
    "/img/projects/advanced-therapy/atosf-emboss-mockup.webp",
    "/img/projects/advanced-therapy/atosf-logo-04.webp",
    "/img/projects/advanced-therapy/atosf-logo-09.webp",
    "/img/projects/advanced-therapy/atosf-logo-05.webp",
    "/img/projects/advanced-therapy/atosf-logo-10.webp",
    "/img/projects/advanced-therapy/atosf-logo-06.webp",
    "/img/projects/advanced-therapy/atosf-stamp-mockup.webp",
    "/img/projects/advanced-therapy/atosf-logo-07.webp",
    "/img/projects/advanced-therapy/atosf-logo-08.webp",
    "/img/projects/advanced-therapy/atosf-thermo-mockup.webp",
    "/img/projects/advanced-therapy/atosf-door-logo-mockup.webp",
  ],
};

/** B-SAFE · Vistas de estudio, told in chapters (Nov 2026 refresh pilot). */
const BSV = "/img/projects/b-safe-vistas/piezas";
const bsvModels: { key: string; title: Bilingual }[] = [
  { key: "lima", title: { es: "Bota lima", en: "Lime boot" } },
  { key: "tenis", title: { es: "Tenis gris", en: "Grey trainer" } },
  { key: "gn", title: { es: "Botín gris y naranja", en: "Grey and orange ankle boot" } },
  { key: "marron", title: { es: "Botín marrón", en: "Brown ankle boot" } },
  { key: "clasica", title: { es: "Bota clásica", en: "Classic boot" } },
];
const bsvModel = (key: string) => bsvModels.find((m) => m.key === key)!.title;
const bsvPhoto: Bilingual = { es: "Foto con celular", en: "Phone photo" };
const bsvFinal: Bilingual = { es: "Vista final, con IA", en: "Final view, made with AI" };

const bSafeVistasStory: CaseStory = {
  cover: {
    variant: "over",
    focus: "62% 50%",
    promise: {
      es: "De una foto de celular a una vista de estudio. Veinte veces, sin cambiar una costura.",
      en: "From a phone photo to a studio view. Twenty times, without changing a single stitch.",
    },
  },
  origin: {
    label: { es: "Así empezó", en: "Where it began" },
    heading: {
      es: "La misma bota, en una foto de celular y en la vista final.",
      en: "The same boot, in a phone photo and in the final view.",
    },
    note: {
      es: "Botín marrón. La foto es de la visita a la oficina de DEINSA, el 3 de noviembre de 2026.",
      en: "Brown ankle boot. The photo is from the visit to DEINSA's office on 3 November 2026.",
    },
    before: { src: `${BSV}/origen-foto.webp`, title: bsvPhoto, detail: { es: "En la oficina de DEINSA", en: "At DEINSA's office" } },
    after: { src: `${BSV}/origen-vista.webp`, title: { es: "Vista final", en: "Final view" }, detail: { es: "Hecha con IA a partir de las fotos", en: "Made with AI from the photos" } },
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      heading: { es: "Fotos de estudio sin estudio.", en: "Studio shots, without a studio." },
      text: {
        es: "DEINSA necesitaba fotos de estudio de sus cinco modelos de B-SAFE para el manual de marca, todas con la misma luz y los mismos ángulos. No había sesión de fotos ni botas en un estudio. Lo que había era una mañana en su oficina, un celular y las botas reales.",
        en: "DEINSA needed studio shots of its five B-SAFE models for the brand manual, all with the same light and the same angles. There was no photo shoot and no studio. What there was: one morning at their office, a phone, and the actual boots.",
      },
      blocks: [
        {
          kind: "stats",
          items: [
            { value: "57", label: { es: "fotos con el celular, en una mañana", en: "phone photos, in one morning" } },
            { value: "20", label: { es: "vistas de estudio, hechas con IA", en: "studio views, made with AI" } },
            { value: "27", label: { es: "páginas del documento entregado", en: "pages in the delivered document" } },
          ],
        },
        {
          kind: "image",
          size: "bleed",
          image: { src: `${BSV}/vista-lima-1.webp`, title: bsvModel("lima"), detail: { es: "Perfil, vista final", en: "Profile, final view" } },
        },
      ],
    },
    {
      id: "vistas",
      label: { es: "Las veinte vistas", en: "The twenty views" },
      heading: { es: "Cinco modelos, cuatro ángulos, la misma luz.", en: "Five models, four angles, the same light." },
      blocks: [
        {
          kind: "mosaic",
          columns: [
            { es: "Perfil", en: "Profile" },
            { es: "Tres cuartos", en: "Three-quarter" },
            { es: "Cenital", en: "Top" },
            { es: "Contrapicado", en: "Low angle" },
          ],
          rows: bsvModels.map((m) => ({
            title: m.title,
            images: [1, 2, 3, 4].map((v) => `${BSV}/vista-${m.key}-${v}.webp`),
          })),
        },
      ],
    },
    {
      id: "partida",
      label: { es: "El punto de partida", en: "Where it started" },
      heading: { es: "Primero, la bota real.", en: "First, the real boot." },
      text: {
        es: "La IA hace botas bonitas con mucha facilidad. Lo difícil es que sean estas botas. Cada vista tenía que poder ponerse al lado de la foto real sin que nada cambiara: las costuras, los colores de los cordones, dónde va cada logo. Por eso empecé por las fotos y no por el prompt.",
        en: "AI makes good-looking boots very easily. The hard part is making them these boots. Every view had to sit next to the real photo without anything changing: the stitching, the lace colors, where each logo goes. That's why I started with the photos, not with a prompt.",
      },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "Fotos de la visita", en: "Photos from the visit" },
          items: bsvModels.map((m) => ({ src: `${BSV}/visita-${m.key}.webp`, title: m.title, detail: bsvPhoto })),
        },
      ],
    },
    {
      id: "foto-a-vista",
      label: { es: "De la foto a la vista", en: "From photo to view" },
      heading: { es: "La foto manda. La vista la sigue.", en: "The photo leads. The view follows." },
      blocks: [
        {
          kind: "pairs",
          static: true,
          width: "wide",
          label: { es: "Modelos", en: "Models" },
          items: ["tenis"].map((k) => ({
            title: bsvModel(k),
            a: { src: `${BSV}/visita-${k}.webp`, detail: bsvPhoto },
            b: { src: `${BSV}/vista-${k}-2.webp`, detail: bsvFinal },
          })),
        },
        {
          kind: "image",
          size: "bleed",
          image: { src: `${BSV}/vista-gn-2.webp`, title: bsvModel("gn"), detail: { es: "Tres cuartos, vista final", en: "Three-quarter, final view" } },
        },
      ],
    },
    {
      id: "logo",
      label: { es: "El logo", en: "The logo" },
      heading: { es: "Pegado encima, parecía una calcomanía.", en: "Pasted on top, it looked like a sticker." },
      text: {
        es: "A mano tampoco quedaba creíble. Lo que funcionó fue dejar que la IA lo renderizara en el material de cada bota, con el logo oficial como guía.",
        en: "Fixing it by hand never felt real either. What worked was letting the AI render it in each boot's own material, with the official logo as the guide.",
      },
      blocks: [
        {
          kind: "compare",
          before: { src: `${BSV}/logo-antes-xl.webp`, title: { es: "Primera prueba", en: "First try" }, detail: { es: "El logo pegado encima", en: "The logo pasted on top" } },
          after: { src: `${BSV}/logo-despues-xl.webp`, title: { es: "Final", en: "Final" }, detail: { es: "Renderizado en el material de la bota", en: "Rendered in the boot's own material" } },
          hint: { es: "Arrastra la línea o usa las flechas.", en: "Drag the line or use the arrows." },
          width: "wide",
        },
      ],
    },
    {
      id: "detalles",
      label: { es: "Los detalles", en: "The details" },
      heading: { es: "La insignia y la cinta, igual que en la bota real.", en: "The badge and the lace tab, just like the real boot." },
      text: {
        es: "Los detalles chiquitos se rehicieron hasta que se parecieron a los reales, iguales en las veinte vistas.",
        en: "The tiny details were redone until they matched the real ones, the same across all twenty views.",
      },
      blocks: [
        {
          kind: "details",
          width: "wide",
          groups: [
            {
              title: { es: "Insignia de la lengüeta", en: "Tongue badge" },
              real: { src: `${BSV}/insignia-real.webp`, detail: { es: "Bota real", en: "Real boot" } },
              final: { src: `${BSV}/insignia-vista.webp`, detail: { es: "Vista final", en: "Final view" } },
            },
            {
              title: { es: "Cinta «EH 18kV»", en: "“EH 18kV” lace tab" },
              real: { src: `${BSV}/cinta-real-cuadrada.webp`, detail: { es: "Bota real", en: "Real boot" } },
              final: { src: `${BSV}/cinta-vista.webp`, detail: { es: "Vista final", en: "Final view" } },
            },
          ],
        },
      ],
    },
  ],
  closing: {
    image: { src: `${BSV}/vista-clasica-2.webp`, title: bsvModel("clasica"), detail: { es: "Tres cuartos", en: "Three-quarter" } },
    more: [1, 3, 4].map((v) => `${BSV}/vista-clasica-${v}.webp`),
  },
};

const bSafeVistasProject: Project = {
  slug: "b-safe-vistas",
  title: "B-SAFE · Vistas de estudio",
  titleEn: "B-SAFE · Studio views",
  client: "B-SAFE, calzado de seguridad de DEINSA",
  clientEn: "B-SAFE, DEINSA's safety footwear",
  year: "2026",
  role: "Fotos, dirección y vistas con IA. Proyecto en solitario",
  roleEn: "Photos, art direction and AI views. Solo project",
  scope: ["Fotos de producto", "Vistas con IA", "Retoque de logos", "Manual de marca"],
  scopeEn: ["Product photos", "AI studio views", "Logo retouching", "Brand manual"],
  gridLabel: "Vistas de estudio · IA",
  gridLabelEn: "Studio views · AI",
  brief: "DEINSA necesitaba fotos de estudio de sus cinco modelos de B-SAFE para el manual de marca, todas con la misma luz y los mismos ángulos. No había sesión de fotos ni botas en un estudio. Lo que había era una mañana en su oficina, un celular y las botas reales.",
  briefEn: "DEINSA needed studio shots of its five B-SAFE models for the brand manual, all with the same light and the same angles. There was no photo shoot and no studio. What there was: one morning at their office, a phone, and the actual boots.",
  shipped: [
    "Una visita a DEINSA para fotografiar cada modelo por todos sus lados: 57 fotos que fueron la referencia de todo.",
    "Veinte vistas de estudio, cuatro por modelo (perfil, tres cuartos, cenital y contrapicado), hechas con IA a partir de esas fotos.",
    "Cada detalle de marca revisado contra la bota real: el logo lateral, la insignia de la lengüeta y la cinta «EH 18kV» de los cordones.",
    "Un documento de 27 páginas con las veinte vistas, listo para el manual.",
  ],
  shippedEn: [
    "A visit to DEINSA to photograph every model from every side: 57 photos that became the reference for everything else.",
    "Twenty studio views, four per model (profile, three-quarter, top and low angle), made with AI from those photos.",
    "Every brand detail checked against the real boot: the side logo, the tongue badge and the \u201cEH 18kV\u201d tab on the laces.",
    "A 27-page document with all twenty views, ready for the manual.",
  ],
  outcome: ["Las veinte vistas se entregaron a DEINSA el 19 de noviembre de 2026 para su manual de marca."],
  outcomeEn: ["The twenty views were delivered to DEINSA on 19 November 2026 for their brand manual."],
  credits: ["Fotos, dirección y vistas: Molly Yllom, con IA (Magnific, Nano Banana 2)"],
  creditsEn: ["Photos, direction and views: Molly Yllom, with AI (Magnific, Nano Banana 2)"],
  portfolioImage: "/img/projects/b-safe-vistas/b-safe-vistas-cortes.mp4",
  heroImage: "/img/projects/b-safe-vistas/b-safe-vistas-hero.webp",
  paragraphs: [
    "La IA hace botas bonitas con mucha facilidad. Lo difícil es que sean estas botas. Cada vista tenía que poder ponerse al lado de la foto real sin que nada cambiara: las costuras, los colores de los cordones, dónde va cada logo. Por eso empecé por las fotos y no por el prompt.",
    "El logo fue lo que más vueltas dio. Pegado encima se veía como una calcomanía, y a mano no quedaba creíble. Lo que funcionó fue dejar que la IA lo renderizara en el material de cada bota, con el logo oficial como guía. Después vinieron los detalles chiquitos, como la insignia de la lengüeta y la cinta de los cordones, que se rehicieron hasta que se parecieron a los reales, igual en todas las vistas.",
  ],
  paragraphsEn: [
    "AI makes good-looking boots very easily. The hard part is making them these boots. Every view had to sit next to the real photo without anything changing: the stitching, the lace colors, where each logo goes. That's why I started with the photos, not with a prompt.",
    "The logo took the most rounds. Pasted on top it looked like a sticker, and fixing it by hand never felt real. What worked was letting the AI render it in each boot's own material, with the official logo as the guide. Then came the tiny details, like the tongue badge and the lace tab, redone until they matched the real ones, the same in every view.",
  ],
  images: [
    "/img/projects/b-safe-vistas/b-safe-vistas-01-visita.webp",
    "/img/projects/b-safe-vistas/b-safe-vistas-02-foto-a-vista.webp",
    "/img/projects/b-safe-vistas/b-safe-vistas-03-logo-antes-despues.webp",
    "/img/projects/b-safe-vistas/b-safe-vistas-04-insignia.webp",
    "/img/projects/b-safe-vistas/b-safe-vistas-05-cinta.webp",
    "/img/projects/b-safe-vistas/b-safe-vistas-06-bota-lima.webp",
    "/img/projects/b-safe-vistas/b-safe-vistas-07-tenis.webp",
    "/img/projects/b-safe-vistas/b-safe-vistas-08-botin-gn.webp",
    "/img/projects/b-safe-vistas/b-safe-vistas-09-botin-marron.webp",
    "/img/projects/b-safe-vistas/b-safe-vistas-10-bota-clasica.webp",
  ],
  story: bSafeVistasStory,
};

/** B-SAFE, told in chapters (F1.2 rhythm). Pieces cut from Molly's final art and the scenes she approved. */
const BS = "/img/projects/b-safe/piezas";
const bsScene: Bilingual = { es: "Montaje", en: "Mockup" };
const bsArt: Bilingual = { es: "Arte final", en: "Final art" };
const bsModels: { key: string; title: Bilingual }[] = [
  { key: "lima", title: { es: "Bota lima", en: "Lime boot" } },
  { key: "tenis", title: { es: "Tenis gris", en: "Grey trainer" } },
  { key: "gn", title: { es: "Botín gris y naranja", en: "Grey and orange ankle boot" } },
  { key: "marron", title: { es: "Botín marrón", en: "Brown ankle boot" } },
  { key: "clasica", title: { es: "Bota clásica", en: "Classic boot" } },
];

const bSafeStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "Una bota de seguridad dentro de la B. Del logo a la caja, a la etiqueta y a la suela.",
      en: "A safety boot inside the B. From the logo to the box, the label and the sole.",
    },
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      heading: { es: "Que aguante y que se sienta bien.", en: "Tough, and comfortable." },
      text: {
        es: "B-SAFE es la marca de botas de seguridad de DEINSA. Una bota así se vende por lo que aguanta, pero se compra por cómo se siente después de diez horas de pie, y el logo tenía que decir las dos cosas. Además tenía que funcionar en todas partes: moldeado en una suela de goma, impreso en una caja de cartón o cosido en la lengüeta.",
        en: "B-SAFE is DEINSA's line of safety boots. A boot like that sells on how much it can take, but people buy it for how it feels after ten hours on their feet, and the logo had to say both. It also had to work everywhere: molded into a rubber sole, printed on a cardboard box, stitched onto a tongue.",
      },
      blocks: [
        {
          kind: "stats",
          items: [
            { value: "9", label: { es: "piezas de empaque y etiquetas", en: "packaging pieces and labels" } },
            { value: "5", label: { es: "modelos con el logo", en: "models carrying the logo" } },
          ],
        },
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "La caja", en: "The box" },
          items: [
            { src: `${BS}/retratos/concreto.webp`, title: { es: "Caja par", en: "Shoe box" }, detail: bsScene },
            { src: `${BS}/retratos/estudio.webp`, title: { es: "Caja par", en: "Shoe box" }, detail: bsScene },
            { src: `${BS}/retratos/caja-abierta.webp`, title: { es: "Caja par y papel interior", en: "Shoe box and tissue paper" }, detail: bsScene },
          ],
        },
      ],
    },
    {
      id: "logo",
      label: { es: "El logo", en: "The logo" },
      heading: { es: "Una bota dentro de la B.", en: "A boot inside the B." },
      text: {
        es: "El símbolo es una bota de seguridad que envuelve el pie: las formas rectas dan la parte industrial y las curvas, la comodidad de alguien que pasa el día entero con ella puesta. Las letras salen de Cold Warm, pero las retoqué hasta que el nombre se sostuviera solo, con esquinas suaves y mucho peso.",
        en: "The symbol is a safety boot wrapping the foot: the straight, solid shapes carry the industrial side, and the curves carry the comfort of someone who wears it all day. The letters come from Cold Warm, but I reworked them until the name could stand on its own, heavy, with soft corners.",
      },
      blocks: [
        { kind: "image", size: "bleed", image: { src: `${BS}/anchas/logo-oscuro-ancho.webp`, title: { es: "Logo", en: "Logo" }, detail: { es: "En negativo", en: "Reversed" } } },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 3, phone: 1 },
          ratio: "1/1",
          items: [
            { src: `${BS}/cuadradas/logo-claro.webp`, title: { es: "Logo", en: "Logo" }, detail: { es: "A todo color", en: "Full color" } },
            { src: `${BS}/cuadradas/icono.webp`, title: { es: "Ícono", en: "Icon" }, detail: { es: "La bota en la B", en: "The boot in the B" } },
            { src: `${BS}/cuadradas/iniciales.webp`, title: { es: "Iniciales", en: "Initials" }, detail: { es: "B·S", en: "B·S" } },
          ],
        },
      ],
    },
    {
      id: "sistema",
      label: { es: "El sistema", en: "The system" },
      heading: { es: "Negro, amarillo y una hoja para la fábrica.", en: "Black, yellow and one sheet for the factory." },
      text: {
        es: "El color es negro y amarillo Pantone 109 C. Una hoja de marca de una página le dice a cada fábrica e imprenta cómo usarlo, con el área de seguridad marcada con la propia bota.",
        en: "The color is black and Pantone 109 C yellow. A one-page brand sheet tells every factory and printer how to use it, with the clear space measured by the boot itself.",
      },
      blocks: [
        {
          kind: "palette",
          colors: [
            { name: { es: "Negro", en: "Black" }, hex: "#000000", codes: ["RGB 0 0 0", "CMYK 100 100 100 100"] },
            { name: { es: "Amarillo", en: "Yellow" }, hex: "#FFD100", codes: ["RGB 255 209 0", "CMYK 1.62 15.59 100 0", "Pantone 109 C"] },
          ],
        },
        { kind: "image", size: "solo", image: { src: `${BS}/anchas/area-ancho.webp`, title: { es: "Área de seguridad", en: "Clear space" }, detail: { es: "De la hoja de marca", en: "From the brand sheet" } } },
      ],
    },
    {
      id: "empaque",
      label: { es: "Empaque y etiquetas", en: "Packaging and labels" },
      heading: { es: "En un estante de cajas marrones, es lo primero que ves.", en: "On a shelf of brown boxes, it's the first thing you see." },
      text: {
        es: "Una marca de botas vive en la caja, en una etiqueta cosida y en una suela que pisa cemento, así que cada pieza se pensó para su material: unas van cosidas, otras pegadas y otras moldeadas. El amarillo hace el trabajo pesado.",
        en: "A boot brand lives on the box, on a stitched label, on a sole that hits concrete, so every piece was designed for its own material: some are stitched, some stuck on, some molded. The yellow does the heavy lifting.",
      },
      blocks: [
        { kind: "image", size: "bleed", image: { src: `${BS}/anchas/cajas-plano-ancho.webp`, title: { es: "Caja par", en: "Shoe box" }, detail: { es: "Arte final, en blanco y en negro", en: "Final art, white and black" } } },
        { kind: "image", size: "solo", image: { src: `${BS}/macro.webp`, title: { es: "Lengüeta y plantilla", en: "Tongue and insole" }, detail: bsScene } },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          fit: "contain",
          ground: "#f3f1ec",
          ratio: "4/3",
          items: [
            { src: `${BS}/etiqueta-lengueta.webp`, title: { es: "Etiqueta de lengüeta", en: "Tongue label" }, detail: bsArt },
            { src: `${BS}/etiqueta-caja.webp`, title: { es: "Etiqueta de caja", en: "Box label" }, detail: bsArt },
            { src: `${BS}/etiqueta-lateral.webp`, title: { es: "Etiqueta lateral", en: "Side label" }, detail: bsArt },
            { src: `${BS}/plantilla.webp`, title: { es: "Plantilla", en: "Insole" }, detail: bsArt },
          ],
        },
      ],
    },
    {
      id: "linea",
      label: { es: "La línea", en: "The line" },
      heading: { es: "Cinco modelos, el mismo logo.", en: "Five models, one logo." },
      text: {
        es: "La bota lima, el tenis gris, los dos botines y la bota clásica llevan el mismo logo en la lengüeta y el costado. Sus vistas de estudio tienen su propio caso.",
        en: "The lime boot, the grey trainer, both ankle boots and the classic boot carry the same logo on the tongue and the side. Their studio views have a case of their own.",
      },
      blocks: [
        { kind: "image", size: "solo", image: { src: `${BS}/modelos.webp`, title: { es: "Tres de los cinco modelos", en: "Three of the five models" }, detail: bsScene } },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          ratio: "16/9",
          items: bsModels.filter((m) => m.key !== "lima").map((m) => ({ src: `/img/projects/b-safe-vistas/piezas/vista-${m.key}-2.webp`, title: m.title, detail: { es: "Vista de estudio", en: "Studio view" } })),
        },
      ],
    },
  ],
  closing: {
    image: { src: `/img/projects/b-safe-vistas/piezas/vista-lima-2.webp`, title: { es: "Bota lima", en: "Lime boot" }, detail: { es: "Vista de estudio", en: "Studio view" } },
  },
};

const bSafeProject: Project = {
  slug: "b-safe",
  title: "B-SAFE",
  client: "B-SAFE, calzado de seguridad de DEINSA",
  clientEn: "B-SAFE, DEINSA's safety footwear",
  year: "2026",
  role: "Logo, identidad y empaque",
  roleEn: "Logo, identity and packaging",
  scope: ["Logo", "Iniciales e ícono", "Color y tipografía", "Empaque y etiquetas", "Hoja de marca"],
  scopeEn: ["Logo", "Initials and icon", "Color and type", "Packaging and labels", "Brand sheet"],
  gridLabel: "Logo · Empaque",
  gridLabelEn: "Logo · Packaging",
  brief: "B-SAFE es la marca de botas de seguridad de DEINSA. Una bota así se vende por lo que aguanta, pero se compra por cómo se siente después de diez horas de pie, y el logo tenía que decir las dos cosas. Además tenía que funcionar en todas partes: moldeado en una suela de goma, impreso en una caja de cartón o cosido en la lengüeta.",
  briefEn: "B-SAFE is DEINSA's line of safety boots. A boot like that sells on how much it can take, but people buy it for how it feels after ten hours on their feet, and the logo had to say both. It also had to work everywhere: molded into a rubber sole, printed on a cardboard box, stitched onto a tongue.",
  shipped: [
    "El logo: una bota de seguridad dentro de la B, y letras hechas a medida a partir de Cold Warm.",
    "Las iniciales B·S y el ícono, para los lugares donde el nombre no cabe.",
    "Negro y amarillo Pantone 109 C, y una hoja de marca de una página para fábricas e imprentas.",
    "El arte final del empaque: caja master, caja par, sticker y etiqueta de caja, papel interior, y las etiquetas de lengüeta, plantilla y costado.",
  ],
  shippedEn: [
    "The logo: a safety boot tucked inside the B, with custom letters built from Cold Warm.",
    "The B·S initials and the icon, for the places where the full name won't fit.",
    "Black and Pantone 109 C yellow, plus a one-page brand sheet for factories and printers.",
    "Final art for the packaging: master carton, shoe box, box sticker and label, tissue paper, and the tongue, insole and side labels.",
  ],
  outcome: ["Los cinco modelos ya llevan el logo en la lengüeta, el costado y la plantilla."],
  outcomeEn: ["All five models now carry the logo on the tongue, the side and the insole."],
  credits: ["Logo, identidad y empaque: Molly Yllom"],
  creditsEn: ["Logo, identity and packaging: Molly Yllom"],
  portfolioImage: "/img/projects/b-safe/b-safe-cortes.mp4",
  heroImage: "/img/projects/b-safe/b-safe-almacen-mockup.webp",
  paragraphs: [
    "Empecé por la bota. El símbolo es una bota de seguridad que envuelve el pie, metida dentro de la B: las formas rectas dan la parte industrial y las curvas, la comodidad de alguien que pasa el día entero con ella puesta. Las letras salen de Cold Warm, pero las retoqué hasta que el nombre se sostuviera solo, con esquinas suaves y mucho peso.",
    "Después vino todo lo demás. Una marca de botas vive en la caja, en una etiqueta cosida y en una suela que pisa cemento, así que cada pieza se pensó para su material. El amarillo hace el trabajo pesado: en un estante lleno de cajas marrones, es lo primero que ves.",
  ],
  paragraphsEn: [
    "I started with the boot. The symbol is a safety boot wrapping the foot, set inside the B: the straight, solid shapes carry the industrial side, and the curves carry the comfort of someone who wears it all day. The letters come from Cold Warm, but I reworked them until the name could stand on its own, heavy, with soft corners.",
    "Then came everything else. A boot brand lives on the box, on a stitched label, on a sole that hits concrete, so every piece was designed for its own material. The yellow does the heavy lifting: on a shelf full of brown boxes, it's the first thing you see.",
  ],
  images: [
    "/img/projects/b-safe/b-safe-x-MY-01.webp",
    "/img/projects/b-safe/b-safe-concreto-mockup.webp",
    "/img/projects/b-safe/b-safe-x-MY-02.webp",
    "/img/projects/b-safe/b-safe-estudio-mockup.webp",
    "/img/projects/b-safe/b-safe-x-MY-03.webp",
    "/img/projects/b-safe/b-safe-etiquetas-mockup.webp",
    "/img/projects/b-safe/b-safe-x-MY-04.webp",
    "/img/projects/b-safe/b-safe-caja-abierta-mockup.webp",
    "/img/projects/b-safe/b-safe-x-MY-06.webp",
    "/img/projects/b-safe/b-safe-modelos-mockup.webp",
    "/img/projects/b-safe/b-safe-x-MY-07.webp",
    "/img/projects/b-safe/b-safe-x-MY-08.webp",
    "/img/projects/b-safe/b-safe-x-MY-05.webp",
  ],
  story: bSafeStory,
};

/** DEXA, told in chapters (F1.2 rhythm). Logos from the official SVGs; mockups v3 approved by Molly. */
const DX = "/img/projects/dexa/piezas";
const dxScene: Bilingual = { es: "Montaje", en: "Mockup" };

const dexaStory: CaseStory = {
  cover: {
    variant: "top",
    promise: {
      es: "Letras que pisan como una bota. Sin dibujar ninguna.",
      en: "Letters that stand like a boot. Without drawing one.",
    },
  },
  chapters: [
    {
      id: "encargo",
      label: { es: "El encargo", en: "The brief" },
      heading: { es: "Calzado de seguridad, sin dibujar una bota.", en: "Safety footwear, without drawing a boot." },
      text: {
        es: "DEXA es la marca con la que DEINSA lleva su calzado de seguridad a Centroamérica y el Caribe, incluidos Jamaica y Trinidad y Tobago. Gerencia la quería profesional, normada e internacional, pero no premium, y prefería una solución tipográfica. La condición más difícil: que se entendiera rápido que es calzado de seguridad, sin dibujar una bota.",
        en: "DEXA is the brand DEINSA uses to take its safety footwear to Central America and the Caribbean, Jamaica and Trinidad and Tobago included. Management wanted it professional, standards-driven and international, but not premium, and they leaned toward a type-only solution. The hard part: it had to read as safety footwear right away, without drawing a boot.",
      },
      blocks: [
        {
          kind: "stats",
          items: [
            { value: "3", label: { es: "rutas de logo", en: "logo routes" } },
            { value: "5", label: { es: "rondas de bocetos", en: "rounds of sketches" } },
            { value: "52", label: { es: "láminas en la presentación", en: "slides in the presentation" } },
          ],
        },
        { kind: "image", size: "bleed", image: { src: `${DX}/caja.webp`, title: { es: "Caja", en: "Box" }, detail: dxScene } },
      ],
    },
    {
      id: "agarre",
      label: { es: "Agarre", en: "Agarre" },
      heading: { es: "Arriba ligera, abajo una suela.", en: "Light on top, a sole below." },
      text: {
        es: "La idea de Agarre es simple: la parte de arriba de las letras es ligera y la de abajo es una suela, más ancha y con tacos. Se lee DEXA de un vistazo y, sin que nadie lo explique, uno piensa en una bota bien plantada. Una línea lima marca la costura, donde las dos partes se unen.",
        en: "The idea behind Agarre is simple: the top of each letter is light, and the bottom is a sole, wider and lugged. You read DEXA at a glance and, without anyone explaining it, you think of a boot planted firmly on the floor. A lime line marks the seam where the two parts meet.",
      },
      blocks: [
        { kind: "image", size: "bleed", image: { src: `${DX}/anchas/logo-claro-ancho.webp`, title: { es: "Logotipo", en: "Wordmark" }, detail: { es: "A todo color", en: "Full color" } } },
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 2, phone: 1 },
          ratio: "1/1",
          items: [
            { src: `${DX}/cuadradas/suela-detalle.webp`, title: { es: "La D, de cerca", en: "The D, up close" }, detail: { es: "Tacos y costura lima", en: "Lugs and lime seam" } },
            { src: `${DX}/cuadradas/logo-oscuro.webp`, title: { es: "Logotipo", en: "Wordmark" }, detail: { es: "En negativo", en: "Reversed" } },
          ],
        },
      ],
    },
    {
      id: "versiones",
      label: { es: "Las versiones", en: "The versions" },
      heading: { es: "Moldeado, bordado y en relieve.", en: "Molded, stitched and embossed." },
      text: {
        es: "Como el logo va a ir moldeado en una suela, bordado en una lengüeta y en relieve en un talón, cada versión se probó en su material. Por debajo de 24 px los tacos se tapan, así que hice una versión pequeña sin ellos. El color sale de DEINSA: el lima como acento sobre negro.",
        en: "The logo is going to be molded into soles, stitched onto tongues and embossed on heels, so every version was tested in its material. Below 24 px the lugs fill in, so I made a small version without them. The color comes from DEINSA: lime as the accent, on black.",
      },
      blocks: [
        {
          kind: "wall",
          width: "wide",
          columns: { desktop: 3, phone: 1 },
          ratio: "1/1",
          items: [
            { src: `${DX}/cuadradas/pequena-claro.webp`, title: { es: "Versión pequeña", en: "Small version" }, detail: { es: "Sin tacos, por debajo de 24 px", en: "No lugs, below 24 px" } },
            { src: `${DX}/cuadradas/pequena-oscuro.webp`, title: { es: "Versión pequeña", en: "Small version" }, detail: { es: "En negativo", en: "Reversed" } },
            { src: `${DX}/anchas/una-tinta-negro.webp`, title: { es: "A una tinta", en: "One color" }, detail: { es: "Negro", en: "Black" } },
          ],
        },
        {
          kind: "palette",
          colors: [
            { name: { es: "Negro", en: "Black" }, hex: "#161616", codes: ["RGB 22 22 22", "CMYK 0 0 0 100", "PMS Neutral Black C"] },
            { name: { es: "Lima", en: "Lime" }, hex: "#94D500", codes: ["RGB 148 213 0", "CMYK 50 0 100 0", "PMS 375 C"] },
          ],
        },
        { kind: "image", size: "solo", image: { src: `${DX}/anchas/area-ancho.webp`, title: { es: "Área de protección", en: "Clear space" }, detail: { es: "X = la altura de la suela", en: "X = the height of the sole" } } },
      ],
    },
    {
      id: "producto",
      label: { es: "En el producto", en: "On the product" },
      heading: { es: "En la etiqueta, la suela y el talón.", en: "On the tag, the sole and the heel." },
      blocks: [
        {
          kind: "carousel",
          large: true,
          width: "wide",
          label: { es: "Montajes", en: "Mockups" },
          items: [
            { src: `${DX}/retratos/hangtag.webp`, title: { es: "Hangtag", en: "Hangtag" }, detail: dxScene },
            { src: `${DX}/retratos/suela.webp`, title: { es: "Suela", en: "Sole" }, detail: dxScene },
            { src: `${DX}/retratos/talon.webp`, title: { es: "Talón", en: "Heel" }, detail: dxScene },
          ],
        },
      ],
    },
  ],
};

const dexaProject: Project = {
  slug: "dexa",
  title: "DEXA",
  client: "DEXA, calzado de seguridad de exportación de DEINSA",
  clientEn: "DEXA, DEINSA's export safety footwear",
  year: "2026",
  role: "Logo. Proyecto en solitario",
  roleEn: "Logo. Solo project",
  scope: ["Brief y Perfil Estético", "Rutas de logo", "Logotipo", "Versiones y mínimos", "Hoja de marca"],
  scopeEn: ["Brief and Aesthetic Profile", "Logo routes", "Wordmark", "Versions and minimum sizes", "Brand sheet"],
  gridLabel: "Logo · Calzado de seguridad",
  gridLabelEn: "Logo · Safety footwear",
  brief: "DEXA es la marca con la que DEINSA lleva su calzado de seguridad a Centroamérica y el Caribe, incluidos Jamaica y Trinidad y Tobago. Gerencia la quería profesional, normada e internacional, pero no premium, y prefería una solución tipográfica. La condición más difícil: que se entendiera rápido que es calzado de seguridad, sin dibujar una bota.",
  briefEn: "DEXA is the brand DEINSA uses to take its safety footwear to Central America and the Caribbean, Jamaica and Trinidad and Tobago included. Management wanted it professional, standards-driven and international, but not premium, and they leaned toward a type-only solution. The hard part: it had to read as safety footwear right away, without drawing a boot.",
  shipped: [
    "El brief, el Perfil Estético y una brújula de diez palabras para medir cada propuesta.",
    "Tres rutas de logo en cinco rondas de bocetos, presentadas con la bota, la caja y el hangtag.",
    "Agarre: las letras se apoyan sobre una suela con tacos, como una bota sobre el piso.",
    "La versión pequeña, los mínimos y el área de protección, con el arte final en Pantone y una hoja de marca para fábricas.",
  ],
  shippedEn: [
    "The brief, the Aesthetic Profile and a ten-word compass to measure every proposal against.",
    "Three logo routes over five rounds of sketches, presented on the boot, the box and the hangtag.",
    "Agarre: the letters stand on a lugged sole, the way a boot stands on the ground.",
    "The small version, minimum sizes and clear space, with Pantone final art and a brand sheet for factories.",
  ],
  outcome: ["DEINSA eligió Agarre y anunció que lo llevará a registro."],
  outcomeEn: ["DEINSA chose Agarre and announced it will register it as a trademark."],
  credits: ["Logo: Molly Yllom"],
  creditsEn: ["Logo: Molly Yllom"],
  portfolioImage: "/img/projects/dexa/dexa-cortes.mp4",
  heroImage: "/img/projects/dexa/dexa-bota-mockup.webp",
  paragraphs: [
    "La idea de Agarre es simple: la parte de arriba de las letras es ligera y la de abajo es una suela, más ancha y con tacos. Se lee DEXA de un vistazo y, sin que nadie lo explique, uno piensa en una bota bien plantada. Es un rasgo del calzado dentro de las letras, que era justo lo que pedía el brief: nada de una bota dibujada.",
    "Como el logo va a ir moldeado en una suela, bordado en una lengüeta y en relieve en un talón, cada versión se probó en su material. Por debajo de 24 px los tacos se tapan, así que hice una versión pequeña sin ellos. El color sale de DEINSA: el lima como acento sobre negro.",
  ],
  paragraphsEn: [
    "The idea behind Agarre is simple: the top of each letter is light, and the bottom is a sole, wider and lugged. You read DEXA at a glance and, without anyone explaining it, you think of a boot planted firmly on the floor. It puts a trait of the footwear inside the letters, which is exactly what the brief asked for: no drawn boot.",
    "The logo is going to be molded into soles, stitched onto tongues and embossed on heels, so every version was tested in its material. Below 24 px the lugs fill in, so I made a small version without them. The color comes from DEINSA: lime as the accent, on black.",
  ],
  images: [
    "/img/projects/dexa/dexa-x-MY-02.webp",
    "/img/projects/dexa/dexa-caja-mockup.webp",
    "/img/projects/dexa/dexa-x-MY-03.webp",
    "/img/projects/dexa/dexa-hangtag-mockup.webp",
    "/img/projects/dexa/dexa-x-MY-04.webp",
    "/img/projects/dexa/dexa-suela-mockup.webp",
    "/img/projects/dexa/dexa-x-MY-05.webp",
    "/img/projects/dexa/dexa-talon-mockup.webp",
    "/img/projects/dexa/dexa-x-MY-06.webp",
  ],
  story: dexaStory,
};

/**
 * Newest first, give or take a place or two. New projects go at the top.
 *
 * Two deliberate exceptions to that order:
 * - the projects carrying interface, design-system and front-end work sit in
 *   the opening tiles. The resume says she designs in the browser and ships the
 *   front end, and a reader who clicks through has to see that on the first
 *   screen rather than eleven tiles down, under a run of identity work;
 * - no two covers of the same kind touch in the grid's rows (2 large, 3, 3):
 *   a logo on a flat ground, a scene, characters, an interface, a photo. The
 *   NFT collections never touch each other or Mollyverse (Molly, 27 nov 2026).
 *   When a project is added, check its neighbours and swap one place if needed.
 */
export const activeProjects = [
  burnThatShtProject,
  aerosolRefinamientoProject,
  rodaiProject,
  aerosolificationProject,
  daydreamProject,
  mollyverseProject,
  seedMyWalletProject,
  bSafeVistasProject,
  bSafeProject,
  theUnhingedProject,
  dexaProject,
  spotlightProject,
  laColmenaProject,
  inetxusProject,
  mdpProject,
  synqProject,
  sveltiProject,
  pixeledFlexiesVol2Project,
  posProject,
  ciudadFielProject,
  thingiesProject,
  famaProject,
  aerosolProject,
  burnClaimProject,
  mlLogoProject,
  neustackProject,
  pixeledFlexiesVol1Project,
  jubelProject,
  allianceProject,
  materDesignProject,
  neuschoolProject,
  momProject,
  riccieOriachProject,
  dinerologyProject,
  greenSpiritProject,
  distopiaProject,
  indhauciProject,
  ditoDicoProject,
  bhMobiliarioProject,
  advanced,
  cdtLogoProject,
];

/**
 * The home grid's own order (Molly, 26 and 27 nov 2026): Aerosol work and
 * client work mixed, so the first screen doesn't read as the portfolio of a
 * single company, and no two covers of the same kind side by side in its rows
 * (2 large, 3, 2, 3, 2). La Colmena is here for the editorial work; Seed My
 * Wallet lives in /proyectos only. Anything not listed is left off the home.
 */
export const homeProjects = [
  burnThatShtProject,
  inetxusProject,
  rodaiProject,
  aerosolificationProject,
  posProject,
  aerosolRefinamientoProject,
  sveltiProject,
  daydreamProject,
  ciudadFielProject,
  synqProject,
  laColmenaProject,
  mlLogoProject,
];

export const projectsBySlug: Record<string, Project> = activeProjects.reduce((acc, project) => {
  acc[project.slug] = project;
  return acc;
}, {} as Record<string, Project>);
