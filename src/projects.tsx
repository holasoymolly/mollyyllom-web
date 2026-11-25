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
    "Isotipo que se lee como C y F encajadas de cerca, y como tornamesa de lejos.",
    "Logotipo que separa CF en fino y MUSIC en negrita para que marca madre y línea musical convivan.",
    "Sistema de dos colores, verde menta y rojo cálido.",
    "Aplicaciones en merch: bordado, troquelado y repujado en cuero.",
  ],
  shippedEn: [
    "A symbol that reads as C and F locked together up close, and as a turntable from across the room.",
    "A wordmark splitting CF in light and MUSIC in bold so the parent brand and the music line share one block.",
    "A two-color system, mint green and warm red.",
    "Merch applications: embroidery, die cutting and leather embossing.",
  ],
  outcome: [
    "La marca está viva y en uso en los canales de Ciudad Fiel.",
    "Un solo isotipo cubre el sello y la escuela sin necesidad de dos marcas.",
    "La economía del trazo permitió bordarlo, troquelarlo y repujarlo sin volver a dibujarlo.",
  ],
  credits: ["Identidad de marca: Molly Yllom"],
  creditsEn: ["Brand identity: Molly Yllom"],
  outcomeEn: [
    "The brand is live and in use across Ciudad Fiel's channels.",
    "One symbol covers both the label and the school, with no need for two brands.",
    "The economy of the mark let it be embroidered, die cut and embossed without being redrawn.",
  ],
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

const burnClaimProject: Project = {
  slug: "burn-claim",
  title: "Burn & Claim",
  client: "Aerosol",
  year: "2024 - 2026",
  role: "Identidad de producto y rediseño de la app",
  roleEn: "Product identity and app redesign",
  scope: ["Identidad de submarca", "Ilustración", "Arquitectura de información", "Diseño de interfaz", "Onboarding", "Handoff a desarrollo"],
  scopeEn: ["Sub-brand identity", "Illustration", "Information architecture", "Interface design", "Onboarding", "Developer handoff"],
  gridLabel: "Diseño de interfaz · Arquitectura de información",
  gridLabelEn: "Interface design · Information architecture",
  brief: "Burn & Claim recupera el rent de cuentas y NFTs que ya no se usan. Es una operación irreversible en cadena, así que la app tenía que verse confiable antes de que alguien conectara su wallet. El reto era doble: que se sintiera segura sin volverse solemne, y que se leyera como parte de Aerosol sin dejar de tener carácter propio.",
  briefEn: "Burn & Claim reclaims rent from unused accounts and NFTs. It is an irreversible on-chain action, so the app had to look trustworthy before anyone would connect a wallet. The challenge was double: feel safe without turning solemn, and read as part of Aerosol while keeping a character of its own.",
  shipped: [
    "Identidad de submarca: llama en forma de gota, personaje y sistema de color.",
    "Rediseño completo de la app, de la arquitectura de información a la entrega visual.",
    "Onboarding que explica el riesgo sin asustar.",
    "Vista de wallet que ordena qué se puede reclamar y cuánto vale.",
    "Flujo de donación a los proyectos que construyen en Solana.",
  ],
  shippedEn: [
    "Sub-brand identity: drop-shaped flame, character and color system.",
    "Full app redesign, from information architecture through final visual delivery.",
    "Onboarding that explains the risk without scaring people off.",
    "A wallet view that sorts what can be reclaimed and what it is worth.",
    "A donation flow routing part of what is recovered to projects building on Solana.",
  ],
  outcome: [
    "Más de 30,500 wallets han usado Burn & Claim.",
    "Primera app de burn destacada en la Solana dApp Store, listada en Phantom, MetaMask y Solflare Discover.",
    "Alianzas con MEW y MonkeDAO.",
    "El primer trimestre de 2026 fue el mejor del producto hasta ahora, con 206,893 transacciones.",
  ],
  credits: [
    "Identidad de producto y rediseño de la app: Molly Yllom",
    "Animación de personajes: Manuel Torres",
    "Animaciones de la app en dispositivos: Molly Yllom",
  ],
  creditsEn: [
    "Product identity and app redesign: Molly Yllom",
    "Character animation: Manuel Torres",
    "App-in-device animations: Molly Yllom",
  ],
  outcomeEn: [
    "Over 30,500 wallets have used Burn & Claim.",
    "First burn app featured in the Solana dApp Store, listed on Phantom, MetaMask and Solflare Discover.",
    "Partnerships with MEW and MonkeDAO.",
    "Q1 2026 was the product's strongest quarter so far, at 206,893 transactions.",
  ],
  portfolioImage: "/img/projects/burn-claim/16.mp4",
  heroImage: "/img/projects/burn-claim/1.webp",
  paragraphs: [
    "Burn & Claim es una app de Solana que convierte la basura de tu wallet en SOL de vuelta. Tokens muertos, NFTs olvidados y cuentas vacías que llevan años ocupando espacio se queman en un solo flujo, y el rent regresa a tu bolsillo.",
    "La marca parte de una llama con forma de gota, un guiño directo a quemar y a recuperar valor al mismo tiempo. De ahí salió un personaje con lentes de sol que le baja la solemnidad a algo que en el fondo es una operación irreversible en cadena. Rojo intenso sobre morado profundo, tipografía condensada y muy gruesa, y un sistema que se sostiene igual en el isotipo suelto, en el logo completo y en blanco y negro.",
    "El rediseño de la app llevó ese tono al producto: un onboarding que explica el riesgo sin asustar, una vista de wallet que ordena qué se puede reclamar y cuánto vale, y un flujo donde parte de lo recuperado va a los proyectos que construyen en Solana. Cada pantalla está pensada para que quemar se sienta claro, controlado y hasta divertido.",
  ],
  paragraphsEn: [
    "Burn & Claim is a Solana app that turns the junk in your wallet back into SOL. Dead tokens, forgotten NFTs and empty accounts that have been sitting there for years get burned in a single flow, and the rent goes back into your pocket.",
    "The brand starts from a flame shaped like a drop, a direct nod to burning and reclaiming value at the same time. That grew into a character in sunglasses that takes the solemnity out of what is, underneath, an irreversible on chain operation. Bold red over deep purple, heavy condensed type, and a system that holds up equally well as a lone symbol, as the full lockup, and in black and white.",
    "The app redesign carried that tone into the product: onboarding that explains the risk without scaring anyone, a wallet view that sorts what can be reclaimed and what it is worth, and a flow where part of what you recover goes to the projects building on Solana. Every screen is built so that burning feels clear, controlled and even fun.",
  ],
  images: [
    "/img/projects/burn-claim/2.webp",
    "/img/projects/burn-claim/3.mp4",
    "/img/projects/burn-claim/4.webp",
    "/img/projects/burn-claim/5.webp",
    "/img/projects/burn-claim/6.webp",
    "/img/projects/burn-claim/7.webp",
    "/img/projects/burn-claim/8.webp",
    "/img/projects/burn-claim/9.mp4",
    "/img/projects/burn-claim/10.webp",
    "/img/projects/burn-claim/11.webp",
    "/img/projects/burn-claim/12.webp",
    "/img/projects/burn-claim/13.webp",
    "/img/projects/burn-claim/14.webp",
    "/img/projects/burn-claim/15.webp",
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
    "Identidad completa: logotipo, isotipo, personaje y sistema de color.",
    "Arquitectura de submarcas para Burn & Claim, Spotlight y Aerosol ID.",
    "Una biblioteca de assets organizada, para que producto, marketing y socios encuentren lo que necesitan sin que diseño sea el cuello de botella.",
    "Sitio corporativo y páginas de producto.",
    "Escenas ilustradas, avatares y piezas de comunidad.",
  ],
  shippedEn: [
    "Full identity: wordmark, symbol, character and color system.",
    "Sub-brand architecture for Burn & Claim, Spotlight and Aerosol ID.",
    "An organized asset library, so product, marketing and partner teams find what they need without design becoming a bottleneck.",
    "Corporate site and product pages.",
    "Illustrated scenes, avatars and community pieces.",
  ],
  outcome: [
    "La identidad salió el 7 de julio de 2025 y es la base que se refinó en 2026.",
    "Con la marca nueva, Burn & Claim fue la primera app de burn destacada en la Solana dApp Store, se listó en MetaMask, Phantom y Solflare Discover, y firmó alianzas con MEW y MonkeDAO.",
    "El refinamiento de marca cambió cómo se define la empresa: pasó de llamarse un web3 product studio a un product studio.",
    "El rol creció con el trabajo, de consultora externa a Head of Design.",
  ],
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
  outcomeEn: [
    "The identity shipped on 7 July 2025 and is the base that was refined in 2026.",
    "With the new brand in place, Burn & Claim became the first burn app featured in the Solana dApp Store, was listed on MetaMask, Phantom and Solflare Discover, and signed partnerships with MEW and MonkeDAO.",
    "The brand refinement changed how the company defines itself: it went from calling itself a web3 product studio to a product studio.",
    "The role grew with the work, from outside consultant to Head of Design.",
  ],
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

const aerosolRefinamientoProject: Project = {
  slug: "aerosol-rebrand-2026",
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
    "El logo refinado: la misma gota en la O, sin lentes ni sonrisa, con la forma y las gotitas de siempre.",
    "Un sistema de logo: horizontal, apilado y la gota sola, en claro y en oscuro.",
    "Rubik como tipografía display, con cuatro roles fijos para titulares, encabezados, subtítulos y etiquetas.",
    "La paleta: morado, coral y los secundarios.",
    "La campaña «New look. Same Aerosol.»: dos teasers, el reveal, el manifiesto del estudio, la familia de productos y las piezas de las semanas siguientes, en X y en Instagram.",
    "Banner, avatar y bio nuevos para @aerosolbuild.",
  ],
  shippedEn: [
    "The refined logo: the same drip in the O, with no sunglasses and no smile, keeping its shape and its spray drops.",
    "A logo system: horizontal, stacked and the drip on its own, in light and dark.",
    "Rubik as the display face, with four fixed roles for display, headings, subheads and labels.",
    "The palette: purple, coral and the secondaries.",
    "The “New look. Same Aerosol.” campaign: two teasers, the reveal, the studio manifesto, the product family and the pieces for the weeks after, on X and Instagram.",
    "A new banner, avatar and bio for @aerosolbuild.",
  ],
  outcome: [
    "El logo refinado salió el 4 de noviembre de 2026, y el post del reveal quedó fijado en @aerosolbuild. Ese mismo día cambió el perfil: avatar, banner y bio.",
    "La campaña corrió en X del 2 al 20 de noviembre, y en Instagram desde el 9.",
    "Rubik es hoy la tipografía de los titulares de aerosol.build y de synq.build.",
  ],
  outcomeEn: [
    "The refined logo shipped on 4 November 2026, and the reveal post was pinned on @aerosolbuild. The profile changed the same day: avatar, banner and bio.",
    "The campaign ran on X from 2 to 20 November, and on Instagram from the 9th.",
    "Rubik now sets the headlines on aerosol.build and synq.build.",
  ],
  credits: [
    "Refinamiento del logo, dirección de arte y campaña: Molly Yllom",
    "Desarrollo web: equipo de Aerosol",
  ],
  creditsEn: [
    "Logo refinement, art direction and campaign: Molly Yllom",
    "Web development: the Aerosol team",
  ],
  portfolioImage: "/img/projects/aerosol-rebrand-2026/aerosol-rebrand-gota-animada.mp4",
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
    "El logo: el lockup con su marco y el símbolo, a color, en negativo y en claro y oscuro.",
    "Los íconos de la app para el Seeker y la web, y el favicon.",
    "Un sistema tipográfico: Early GameBoy para los titulares e Inter para leer.",
    "La paleta: noche, violeta, lila y el azul del marco.",
    "El diseño de la app: bienvenida, colecciones, detalle de cada pieza, mint y el espacio de cada holder.",
    "La ficha de la dApp Store de Solana: ícono, banner, gráfico destacado, capturas y el video demo.",
    "El perfil de @elmollyverso en X (banner y avatar) y las piezas de lanzamiento.",
    "La web, mollyverse.art.",
    "Mollyverse Verify: su logo y la página donde cada holder conecta su wallet para recibir su rol en Discord.",
  ],
  shippedEn: [
    "The logo: the framed lockup and the symbol, in full color, in negative and in light and dark.",
    "The app icons for the Seeker and the web, and the favicon.",
    "A type system: Early GameBoy for headlines and Inter for reading.",
    "The palette: night, violet, lilac and the frame blue.",
    "The app design: welcome flow, collections, a page for every piece, mint and a space for each holder.",
    "The Solana dApp Store listing: icon, banner, feature graphic, screenshots and the demo video.",
    "The @elmollyverso profile on X (banner and avatar) and the launch posts.",
    "The website, mollyverse.art.",
    "Mollyverse Verify: its logo and the page where holders connect their wallet to get their Discord role.",
  ],
  outcome: [
    "La app está en la dApp Store de Solana para el Seeker y en la web. La versión 2.0.0 salió el 26 de mayo de 2026.",
    "Desde julio de 2026 todas las colecciones viven en mollyverse.art, bajo la misma marca.",
    "Mollyverse Verify está en vivo: verifica la wallet de cada holder y le da su rol en el Discord del Mollyverse.",
  ],
  outcomeEn: [
    "The app is live on the Solana dApp Store for the Seeker and on the web. Version 2.0.0 shipped on 26 May 2026.",
    "Since July 2026 every collection lives on mollyverse.art, under one brand.",
    "Mollyverse Verify is live: it checks each holder's wallet and gives them their role in the Mollyverse Discord.",
  ],
  credits: [
    "Marca, diseño de producto, dirección de arte y colecciones: Molly Yllom",
    "Apoyo técnico: equipo de Aerosol",
  ],
  creditsEn: [
    "Brand, product design, art direction and collections: Molly Yllom",
    "Technical support: the Aerosol team",
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
    "/img/projects/mollyverse/mollyverse-x-MY-06.webp",
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
    "/img/projects/mollyverse/mollyverse-x-MY-06.webp",
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
    "El logo: el ROD con el nombre, en horizontal y apilado, en claro y en oscuro.",
    "El ROD en su placa coral, como ícono y como avatar.",
    "La hoja del personaje: cinco vistas, ocho expresiones y sus reglas (las gafas no se las quita, no tiene piernas, el pelo del ícono en cada vista).",
    "Las reglas de las tarjetas de X: un fondo por serie, fondos y letras en los colores de Aerosol, y el cian solo en el ROD.",
    "Los banners en Rubik con su frase nueva, «Bullish on Solana since 2024».",
    "El diseño de la web nueva de RODAI, que todavía está en desarrollo.",
  ],
  shippedEn: [
    "The logo: the ROD with the name, horizontal and stacked, in light and dark.",
    "The ROD on his coral plate, as icon and avatar.",
    "The character sheet: five views, eight expressions and the rules that go with them (the shades stay on, no legs, the icon's hair in every view).",
    "The rules for the X cards: one ground per series, grounds and words in Aerosol's colors, and the cyan only on the ROD.",
    "The banners in Rubik with his new line, “Bullish on Solana since 2024”.",
    "The design for RODAI's new website, which is still in development.",
  ],
  outcome: [
    "El header nuevo está en @rodaimeme desde el 28 de octubre de 2026, y la bio abre con la misma frase.",
    "Desde noviembre, el ROD de las tarjetas de @rodaimeme se dibuja siguiendo su hoja.",
  ],
  outcomeEn: [
    "The new header has been up on @rodaimeme since 28 October 2026, and the bio opens with the same line.",
    "Since November, the ROD on @rodaimeme's cards is drawn from his sheet.",
  ],
  credits: [
    "Logo, personaje y dirección de arte: Molly Yllom",
    "Producto y desarrollo de la web, comunidad y textos de @rodaimeme: equipo de Aerosol",
  ],
  creditsEn: [
    "Logo, character and art direction: Molly Yllom",
    "Product and web development, community and copy for @rodaimeme: the Aerosol team",
  ],
  portfolioImage: "/img/projects/rodai/rodai-cortes.mp4",
  heroImage: "/img/projects/rodai/rodai-x-MY-01.webp",
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
    "El ícono: el prompt de una terminal con una hoja en el brazo de arriba, armado con un solo módulo.",
    "La gota de SMW Faucet, hecha con el mismo cursor y la misma medida.",
    "El nombre en Geist Mono Bold, en horizontal, apilado y en dos líneas, sobre claro y sobre oscuro.",
    "El ícono chico ajustado al píxel para el favicon, los íconos de app y una ficha por cada tipo de dato.",
    "Color, tipografía, forma y movimiento: el cursor verde que parpadea.",
    "Foto de perfil, banners e imagen para compartir de Seed My Wallet y de SMW Faucet.",
    "La campaña de lanzamiento y el set de la tienda de Solana Mobile, con el producto real en pantalla.",
  ],
  shippedEn: [
    "The symbol: a terminal prompt with a leaf for its top arm, built on one single module.",
    "The SMW Faucet drop, made with the same cursor and the same measure.",
    "The name in Geist Mono Bold, horizontal, stacked and on two lines, for light and dark.",
    "A pixel-fitted small icon for the favicon, the app icons and one glyph for each kind of test data.",
    "Color, type, shape and motion: the blinking green cursor.",
    "Profile picture, banners and share image for both Seed My Wallet and SMW Faucet.",
    "The launch campaign and the Solana Mobile store listing, always showing the real product on screen.",
  ],
  outcome: [
    "La marca está en vivo en seedmywallet.com, en la app web y en SMW Faucet.",
    "La app para el Seeker, con el ícono y los glifos, ya se envió a la tienda de Solana Mobile.",
  ],
  outcomeEn: [
    "The brand is live on seedmywallet.com, on the web app and on SMW Faucet.",
    "The Seeker app, with the icon and the glyphs, has been submitted to the Solana Mobile store.",
  ],
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
    "El ícono, en color, blanco, negro y escala de grises.",
    "Paleta de cinco colores, con Barlow como tipografía.",
    "Guía visual y pruebas en papelería, tarjetas, uniforme, vidrio y empaques.",
  ],
  shippedEn: [
    "The concept and keywords, built from what the clinic asked for.",
    "A wordmark in which the dot of the i is a cell.",
    "The symbol, in color, white, black and grayscale.",
    "A five-color palette, set in Barlow.",
    "A visual guide and tests on stationery, business cards, uniform, glass and packaging.",
  ],
  credits: ["Logo e identidad: Molly Yllom"],
  creditsEn: ["Logo and identity: Molly Yllom"],
  portfolioImage: "/img/projects/svelti/svelti-mockups-animado.mp4",
  heroImage: "/img/projects/svelti/svelti-x-MY-01.webp",
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
};

const synqProject: Project = {
  slug: "synq",
  title: "Synq",
  client: "Synq, de Aerosol",
  clientEn: "Synq, by Aerosol",
  year: "2026",
  role: "Logo e identidad de marca",
  roleEn: "Logo and brand identity",
  scope: ["Logotipo a medida", "Ícono", "Color", "Íconos de app", "Aplicaciones"],
  scopeEn: ["Custom wordmark", "Symbol", "Color", "App icons", "Applications"],
  gridLabel: "Logotipo a medida · Íconos de app",
  gridLabelEn: "Custom wordmark · App icons",
  brief: "Synq es el inicio de sesión de Aerosol: el que cada app conecta para que su gente entre con la marca de esa app. Se le vende a developers, así que tenía que sentirse seria y al día, sin dejar de ser parte de la familia de Aerosol.",
  briefEn: "Synq is Aerosol's sign-in: the one every app plugs in so its people get in under that app's own brand. It sells to developers, so it had to feel serious and current while still belonging to the Aerosol family.",
  shipped: [
    "Un wordmark dibujado a mano, sin fuente: las letras se unen con una sola línea.",
    "El ícono de la telaraña con su araña al centro, en claro y en oscuro.",
    "Paleta de noche, morado y turquesa.",
    "Íconos de app en claro, oscuro y tintado, favicon, banners e imagen para compartir.",
    "La telaraña como sistema gráfico para las aplicaciones.",
  ],
  shippedEn: [
    "A hand-drawn wordmark, no font: the letters join in one single line.",
    "The web symbol with its spider at the center, in light and dark.",
    "A night, purple and turquoise palette.",
    "App icons in light, dark and tinted, favicon, banners and a share image.",
    "The web as a graphic system for the applications.",
  ],
  credits: ["Logo e identidad: Molly Yllom", "Producto: equipo de Aerosol"],
  creditsEn: ["Logo and identity: Molly Yllom", "Product: the Aerosol team"],
  portfolioImage: "/img/projects/synq/synq-logo-animado.mp4",
  heroImage: "/img/projects/synq/synq-x-MY-01.webp",
  paragraphs: [
    "Synq conecta: cada app, cada marca y cada persona pasan por el mismo punto. Por eso el símbolo es una telaraña, una red donde cada hilo vuelve al centro, con la araña que la teje en el medio. Y el nombre lo dibujé letra por letra, unidas por una sola línea, como si la palabra se estuviera cableando.",
    "Después la telaraña se volvió sistema. Sus anillos siguen creciendo hacia afuera con el mismo trazo, en la espalda de una sudadera o en un sticker, y el ícono sigue siendo el centro de todo.",
  ],
  paragraphsEn: [
    "Synq connects: every app, every brand and every person goes through the same point. That's why the symbol is a spider web, a network where every thread leads back to the center, with the spider that weaves it in the middle. And I drew the name letter by letter, joined by one single line, as if the word were being wired together.",
    "Then the web became a system. Its rings keep growing outward with the same stroke, on the back of a hoodie or on a sticker, and the symbol stays at the center of it all.",
  ],
  images: [
    "/img/projects/synq/synq-x-MY-02.webp",
    "/img/projects/synq/synq-laptop-mockup.webp",
    "/img/projects/synq/synq-x-MY-03.webp",
    "/img/projects/synq/synq-celular-mockup.webp",
    "/img/projects/synq/synq-x-MY-04.webp",
    "/img/projects/synq/synq-sudadera-mockup.webp",
    "/img/projects/synq/synq-x-MY-05.webp",
    "/img/projects/synq/synq-stickers-mockup.webp",
    "/img/projects/synq/synq-x-MY-06.webp",
    "/img/projects/synq/synq-x-MY-07.webp",
  ],
  imagesEn: [
    "/img/projects/synq/synq-x-MY-02.webp",
    "/img/projects/synq/synq-laptop-mockup.webp",
    "/img/projects/synq/synq-x-MY-03-en.webp",
    "/img/projects/synq/synq-celular-mockup.webp",
    "/img/projects/synq/synq-x-MY-04.webp",
    "/img/projects/synq/synq-sudadera-mockup.webp",
    "/img/projects/synq/synq-x-MY-05.webp",
    "/img/projects/synq/synq-stickers-mockup.webp",
    "/img/projects/synq/synq-x-MY-06.webp",
    "/img/projects/synq/synq-x-MY-07-en.webp",
  ],
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
    "Un ícono que moderniza el anterior: se queda con su cruce y suelta lo que sobraba, una X que es cruce y enlace a la vez.",
    "Paleta de navy, azul y naranja, con BR Sonoma como tipografía.",
    "Aplicaciones: web, carnet y lanyard, etiqueta de equipos, camioneta, fachada, puerta y papelería.",
  ],
  shippedEn: [
    "The client's Aesthetic Profile and a ten-word compass to measure every proposal against.",
    "Five logo routes, each from a different part of that compass.",
    "A symbol that modernizes the old one: it keeps its crossing and drops everything else, an X that is both a crossing and a link.",
    "A navy, blue and orange palette, set in BR Sonoma.",
    "Applications: website, ID badge and lanyard, equipment label, van, facade, door and stationery.",
  ],
  credits: ["Rediseño de identidad: Molly Yllom"],
  creditsEn: ["Identity redesign: Molly Yllom"],
  portfolioImage: "/img/projects/inetxus/inetxus-mockups-animado.mp4",
  heroImage: "/img/projects/inetxus/inetxus-x-MY-01.webp",
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
    "Cinco versiones del logotipo: horizontal, vertical, solo el ícono, con el lema y con el ícono a la izquierda, cada una en color, blanco y negativo.",
    "Paleta de carbón y naranja, con Manrope como tipografía.",
    "Aplicaciones: fachada, letrero de oficina, puertas, tarjetas, camión y camisetas.",
  ],
  shippedEn: [
    "A sheet of hand sketches, which produced three routes.",
    "A symbol in which the O becomes a building.",
    "Five logo lockups: horizontal, vertical, icon only, with the tagline and with the icon on the left, each in color, white and negative.",
    "A charcoal and orange palette, set in Manrope.",
    "Applications: facade, office sign, doors, business cards, truck and T-shirts.",
  ],
  credits: ["Rediseño de logotipo e identidad: Molly Yllom"],
  creditsEn: ["Logo redesign and identity: Molly Yllom"],
  portfolioImage: "/img/projects/pos/pos-logo-animado.mp4",
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
    "Isotipo: piedras apiladas en equilibrio sobre un fulcro, la idea de balance sin la balanza literal.",
    "Logotipo en serif clásica con «Legal Group PLLC» en sans espaciada debajo.",
    "Paleta cálida de topo y melocotón, en lugar del azul marino y dorado de la categoría.",
    "Aplicaciones en relieve: papel negro, relieve dorado y sello de madera.",
  ],
  shippedEn: [
    "Symbol: stones stacked in balance on a fulcrum, the idea of equilibrium without the literal scales.",
    "A classical serif wordmark with «Legal Group PLLC» set in spaced sans beneath it.",
    "A warm taupe and peach palette instead of the category's navy and gold.",
    "Embossed applications: black paper, gold emboss and a wooden stamp.",
  ],
  outcome: [
    "Un cliente estadounidense, en Nueva York, trabajado en remoto desde Santo Domingo.",
    "La marca resuelve equilibrio y seriedad sin usar ni un solo recurso gráfico del sector.",
    "El isotipo funciona en relieve seco, en dorado y en sello de madera sin perder legibilidad.",
  ],
  credits: ["Identidad de marca: Molly Yllom"],
  creditsEn: ["Brand identity: Molly Yllom"],
  outcomeEn: [
    "A US client, in New York, worked remotely from Santo Domingo.",
    "The brand delivers balance and seriousness without using a single stock cue from the sector.",
    "The symbol holds up in blind emboss, in gold and as a wooden stamp without losing legibility.",
  ],
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
    "Logotipo construido con formas básicas: cuadrado, círculo y triángulo.",
    "Paleta viva pensada para convivir con trabajo ajeno.",
    "Aplicaciones de marca.",
  ],
  shippedEn: [
    "A logo built from basic shapes: square, circle and triangle.",
    "A vibrant palette built to coexist with other people's work.",
    "Brand applications.",
  ],
  outcome: [
    "Un cliente estadounidense más, trabajado en remoto desde Santo Domingo.",
    "El cliente es una agencia de comunicación visual, así que quienes aprobaron el trabajo se dedican a esto. La marca se entregó alineada con la visión que ellos mismos tenían del estudio.",
  ],
  outcomeEn: [
    "Another US client, worked remotely from Santo Domingo.",
    "The client is a visual communication agency, so the people signing off on the work do this for a living. The brand was delivered aligned with the vision they had for their own studio.",
  ],
  credits: [
    "Identidad de marca: Molly Yllom",
  ],
  creditsEn: [
    "Brand identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/mater-design/mater-design-logo-animation.gif",
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
    "Logotipo rediseñado conservando la estructura reconocible.",
    "Detalle distintivo que le da vida propia a la marca.",
    "Aplicaciones para la plataforma.",
  ],
  shippedEn: [
    "A redesigned logo that keeps the recognizable structure.",
    "A distinctive detail that gives the brand a life of its own.",
    "Applications for the platform.",
  ],
  outcome: [
    "La plataforma estuvo en producción y hoy el proyecto está en pausa.",
  ],
  outcomeEn: [
    "The platform ran in production and the project is currently on hold.",
  ],
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
    "Caja amarilla como espacio donde cabe cualquier idea.",
    "Sistema que se transforma en la forma que haga falta.",
    "Aplicaciones de marca.",
  ],
  shippedEn: [
    "A yellow box as the space where any idea fits.",
    "A system that transforms into whatever shape is needed.",
    "Brand applications.",
  ],
  outcome: [
    "La marca sigue en uso por la agencia.",
  ],
  outcomeEn: [
    "The brand is still in use by the agency.",
  ],
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
    "Letra N resuelta en un trazo grueso y decidido.",
    "Azul para confianza, gris para equilibrio.",
    "Marca construida para escalar de favicon a stand.",
  ],
  shippedEn: [
    "The letter N resolved in one bold, decided stroke.",
    "Blue for trust, gray for balance.",
    "A mark built to scale from favicon to trade stand.",
  ],
  outcome: [
    "La marca está en pausa, a la espera del relanzamiento de la empresa como estudio de producto.",
  ],
  outcomeEn: [
    "The brand is on hold, waiting on the company's relaunch as a product studio.",
  ],
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
    "Logotipo del canal dentro del sistema JMMB.",
    "Lineamientos gráficos para el contenido.",
    "Piezas para el formato de YouTube.",
  ],
  shippedEn: [
    "A channel logo inside the JMMB system.",
    "Graphic guidelines for the content.",
    "Assets built for the YouTube format.",
  ],
  outcome: [
    "Dinerology ganó Bronce en los Effie Awards República Dominicana 2023, para MoM y JMMB.",
    "El canal sigue en línea con 175 videos publicados y más de 2,000 suscriptores.",
    "Su episodio más visto supera las 18,000 vistas.",
  ],
  outcomeEn: [
    "Dinerology won Bronze at the Effie Awards Dominican Republic 2023, for MoM and JMMB.",
    "The channel is still online with 175 videos published and over 2,000 subscribers.",
    "Its most watched episode is past 18,000 views.",
  ],
  credits: [
    "Logotipo y lineamientos: Molly Yllom",
  ],
  creditsEn: [
    "Logo and guidelines: Molly Yllom",
  ],
  portfolioImage: "/img/projects/dinerology/logo-6-remix.gif",
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

const riccieOriachProject: Project = {
  slug: "riccie-oriach",
  title: "Riccie Oriach",
  client: "Riccie Oriach",
  year: "2018",
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
    "Logotipo que carga la personalidad del artista antes que un género.",
    "Sistema visual para lanzamientos y plataformas.",
  ],
  shippedEn: [
    "A logo that carries the artist's personality before any one genre.",
    "A visual system for releases and platforms.",
  ],
  outcome: [
    "La identidad sigue viva y en uso por el artista.",
  ],
  outcomeEn: [
    "The identity is still live and in use by the artist.",
  ],
  credits: [
    "Identidad visual: Molly Yllom",
  ],
  creditsEn: [
    "Visual identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/riccie-oriach/riccie-oriach-gif.mp4",
  heroImage: "/img/projects/riccie-oriach/riccie-oriach-logo-01.webp",
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
    "Logotipo e identidad visual.",
    "Paleta orgánica tomada de las plantas mismas.",
    "Aplicaciones de marca.",
  ],
  shippedEn: [
    "Logo and visual identity.",
    "An organic palette pulled from the plants themselves.",
    "Brand applications.",
  ],
  outcome: [
    "La marca sigue viva y en uso.",
  ],
  outcomeEn: [
    "The brand is still live and in use.",
  ],
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
    "Logotipo minimalista con influencia de Op Art.",
    "Piezas gráficas digitales y físicas.",
    "Murales.",
    "Materiales impresos.",
  ],
  shippedEn: [
    "A minimalist logo with an Op Art influence.",
    "Digital and physical graphic pieces.",
    "Murals.",
    "Print materials.",
  ],
  outcome: [
    "La identidad se desplegó en digital, impreso y a escala de mural.",
  ],
  outcomeEn: [
    "The identity rolled out across digital, print and at mural scale.",
  ],
  credits: [
    "Identidad visual: Molly Yllom",
  ],
  creditsEn: [
    "Visual identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/distopia/distopia-tee-design-animation.gif",
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
    "Logotipo actualizado conservando los códigos que ya identificaban a la empresa.",
    "Implementación en distintas piezas corporativas.",
  ],
  shippedEn: [
    "An updated logo that keeps the codes that already identified the company.",
    "Implementation across corporate pieces.",
  ],
  outcome: [
    "La imagen corporativa sigue en uso por la empresa.",
  ],
  outcomeEn: [
    "The corporate image is still in use by the company.",
  ],
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
    "Mascota ilustrada en estilo cartoon de los años 30.",
    "Disco como elemento central del sistema.",
    "Logotipo e implementación en distintos materiales.",
  ],
  shippedEn: [
    "An illustrated mascot in a 1930s cartoon style.",
    "A record as the central element of the system.",
    "Logo and implementation across materials.",
  ],
  outcome: [
    "La marca y el personaje siguen vivos y en uso por el artista.",
  ],
  outcomeEn: [
    "The brand and the character are still live and in use by the artist.",
  ],
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
    "Logotipo donde un estante de oficina forma las letras BH.",
    "Sistema visual para catálogo y comunicación.",
    "Aplicaciones de marca.",
  ],
  shippedEn: [
    "A logo where an office shelf forms the letters BH.",
    "A visual system for catalogue and communication.",
    "Brand applications.",
  ],
  outcome: [
    "La marca sigue viva y en uso por la empresa.",
  ],
  outcomeEn: [
    "The brand is still live and in use by the company.",
  ],
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
    "Concepto e identidad visual a partir del significado del nombre.",
    "Dirección de arte para el universo visual del proyecto.",
    "marialunares.com, diseñado y programado por mí en Next.js.",
    "Animación del video oficial de «Raíces».",
  ],
  shippedEn: [
    "Concept and visual identity built out of the meaning of the name.",
    "Art direction for the visual universe of the project.",
    "marialunares.com, designed and coded by me in Next.js.",
    "Animation for the official «Raíces» music video.",
  ],
  outcome: [
    "El sitio sigue en línea en marialunares.com.",
    "Marca y sitio salieron de la misma mano, sin traspaso entre diseño y desarrollo.",
  ],
  outcomeEn: [
    "The site is still live at marialunares.com.",
    "Brand and site came from the same hand, with no handoff between design and build.",
  ],
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
  portfolioImage: "/img/projects/maria-lunares/ml-logo-animado-1x1-1.mp4",
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
    "Logotipo que integra piedra y maquinaria de excavación.",
    "Sistema visual que equilibra robustez y trato humano.",
    "Aplicaciones de marca.",
  ],
  shippedEn: [
    "A logo integrating stone and excavation machinery.",
    "A visual system balancing robustness with a human approach.",
    "Brand applications.",
  ],
  outcome: [
    "La marca sigue viva y en uso por la empresa.",
  ],
  outcomeEn: [
    "The brand is still live and in use by the company.",
  ],
  credits: [
    "Identidad de marca: Molly Yllom",
  ],
  creditsEn: [
    "Brand identity: Molly Yllom",
  ],
  portfolioImage: "/img/projects/canteras-del-tropico/cdt-logo-2022-animation.gif",
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
    "Logotipo construido sobre la idea de desenredar la mente.",
    "Sistema visual de tono profesional y cercano.",
    "Aplicaciones de marca.",
  ],
  shippedEn: [
    "A logo built on the idea of untangling the mind.",
    "A visual system that is professional and approachable.",
    "Brand applications.",
  ],
  outcome: [
    "Un cliente estadounidense, en Florida, trabajado en remoto desde Santo Domingo.",
  ],
  outcomeEn: [
    "A US client, in Florida, worked remotely from Santo Domingo.",
  ],
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

/**
 * Newest first. New projects go at the top.
 *
 * One deliberate exception to that order: the projects carrying interface,
 * design-system and front-end work sit in the opening tiles. The resume says
 * she designs in the browser and ships the front end, and a reader who clicks
 * through has to see that on the first screen rather than eleven tiles down,
 * under a run of identity work that reads as a single block.
 */
export const activeProjects = [
  aerosolRefinamientoProject,
  rodaiProject,
  seedMyWalletProject,
  mollyverseProject,
  inetxusProject,
  synqProject,
  sveltiProject,
  posProject,
  ciudadFielProject,
  burnClaimProject,
  aerosolProject,
  mlLogoProject,
  neustackProject,
  allianceProject,
  materDesignProject,
  neuschoolProject,
  momProject,
  dinerologyProject,
  riccieOriachProject,
  greenSpiritProject,
  distopiaProject,
  indhauciProject,
  ditoDicoProject,
  bhMobiliarioProject,
  cdtLogoProject,
  advanced,
];

export const projectsBySlug: Record<string, Project> = activeProjects.reduce((acc, project) => {
  acc[project.slug] = project;
  return acc;
}, {} as Record<string, Project>);
