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

const burnThatShtProject: Project = {
  slug: "burn-that-sht",
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
  portfolioImage: "/img/projects/the-unhinged/unh-cortes.mp4",
  heroImage: "/img/projects/the-unhinged/unh-x-MY-01.webp",
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

const aerosolificationProject: Project = {
  slug: "aerosolification",
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
  portfolioImage: "/img/projects/spotlight/spotlight-cortes.mp4",
  heroImage: "/img/projects/spotlight/spotlight-x-MY-01.webp",
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
  portfolioImage: "/img/projects/synq/synq-logo-animado.mp4",
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
  burnThatShtProject,
  aerosolRefinamientoProject,
  aerosolificationProject,
  rodaiProject,
  daydreamProject,
  seedMyWalletProject,
  mollyverseProject,
  theUnhingedProject,
  spotlightProject,
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

/**
 * The home grid's own order (Molly, 26 nov 2026): Aerosol work and client
 * work alternate, each side newest first, so the first screen doesn't read
 * as the portfolio of a single company. /proyectos keeps the date order
 * above. Anything not listed here is left off the home grid.
 */
export const homeProjects = [
  burnThatShtProject,
  inetxusProject,
  aerosolRefinamientoProject,
  posProject,
  rodaiProject,
  sveltiProject,
  aerosolificationProject,
  daydreamProject,
  ciudadFielProject,
  synqProject,
  mlLogoProject,
  seedMyWalletProject,
];

export const projectsBySlug: Record<string, Project> = activeProjects.reduce((acc, project) => {
  acc[project.slug] = project;
  return acc;
}, {} as Record<string, Project>);
