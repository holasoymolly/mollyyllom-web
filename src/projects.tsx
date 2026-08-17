export interface Project {
  title: string;
  portfolioImage: string;
  heroImage: string;
  paragraphs: string[];
  paragraphsEn: string[];
  images: string[];
  slug: string;

  /**
   * Case-study fields. All optional: a project without them renders exactly as
   * before, so the 15 projects that are fine as a written piece stay untouched.
   * Only fill these where there is something real to say. Never pad them.
   */
  client?: string;
  year?: string;
  role?: string;
  roleEn?: string;
  scope?: string[];
  scopeEn?: string[];
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
export const HOME_GRID_LIMIT = 15;

const ciudadFielProject: Project = {
  slug: "ciudad-fiel",
  title: "Ciudad Fiel",
  client: "Pedro Kelly, productor musical y compositor",
  year: "2021",
  role: "Identidad de marca. Proyecto en solitario",
  roleEn: "Brand identity. Solo project",
  scope: ["Identidad", "Isotipo y logotipo", "Sistema de color", "Aplicaciones y merch"],
  scopeEn: ["Identity", "Symbol and wordmark", "Color system", "Applications and merch"],
  brief: "Pedro Kelly pidió un logo para Ciudad Fiel. El problema real era que una sola marca tenía que sostener dos cosas distintas, un sello discográfico y una escuela para productores que empiezan, y funcionar igual firmando un lanzamiento que colgada en la pared de un salón de clase.",
  briefEn: "Pedro Kelly asked for a logo for Ciudad Fiel. The real problem was that a single mark had to hold two different things, a record label and a school for producers who are just starting, and work equally well signing a release and hanging on a classroom wall.",
  shipped: [
    "Isotipo que se lee como C y F encajadas de cerca, y como tornamesa de lejos",
    "Logotipo que separa CF en fino y MUSIC en negrita para que marca madre y línea musical convivan",
    "Sistema de dos colores, verde menta y rojo cálido",
    "Aplicaciones en merch: bordado, troquelado y repujado en cuero",
  ],
  shippedEn: [
    "A symbol that reads as C and F locked together up close, and as a turntable from across the room",
    "A wordmark splitting CF in light and MUSIC in bold so the parent brand and the music line share one block",
    "A two-color system, mint green and warm red",
    "Merch applications: embroidery, die cutting and leather embossing",
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
  brief: "Burn & Claim recupera el rent de cuentas y NFTs que ya no se usan. Es una operación irreversible en cadena, así que la app tenía que verse confiable antes de que alguien conectara su wallet. El reto era doble: que se sintiera segura sin volverse solemne, y que se leyera como parte de Aerosol sin dejar de tener carácter propio.",
  briefEn: "Burn & Claim reclaims rent from unused accounts and NFTs. It is an irreversible on-chain action, so the app had to look trustworthy before anyone would connect a wallet. The challenge was double: feel safe without turning solemn, and read as part of Aerosol while keeping a character of its own.",
  shipped: [
    "Identidad de submarca: llama en forma de gota, personaje y sistema de color",
    "Rediseño completo de la app, de la arquitectura de información a la entrega visual",
    "Onboarding que explica el riesgo sin asustar",
    "Vista de wallet que ordena qué se puede reclamar y cuánto vale",
    "Flujo de donación a los proyectos que construyen en Solana",
  ],
  shippedEn: [
    "Sub-brand identity: drop-shaped flame, character and color system",
    "Full app redesign, from information architecture through final visual delivery",
    "Onboarding that explains the risk without scaring people off",
    "A wallet view that sorts what can be reclaimed and what it is worth",
    "A donation flow routing part of what is recovered to projects building on Solana",
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
  title: "Aerosol",
  client: "Aerosol",
  year: "2024 - 2026",
  role: "Consultora de marca y directora de arte, luego Head of Design",
  roleEn: "Brand consultant and art director, later Head of Design",
  scope: ["Estrategia de marca", "Identidad", "Arquitectura de submarcas", "Sistema de diseño", "Ilustración", "Web"],
  scopeEn: ["Brand strategy", "Identity", "Sub-brand architecture", "Design system", "Illustration", "Web"],
  brief: "Aerosol construye herramientas para el ecosistema Solana. El producto ya funcionaba y tenía usuarios reales, pero la marca lo hacía ver como un proyecto secundario, y los productos se iban acumulando sin un sistema que los relacionara entre sí.",
  briefEn: "Aerosol builds tools for the Solana ecosystem. The product already worked and had real users, but the brand made it look like a side project, and products were piling up with no system relating them to each other.",
  shipped: [
    "Identidad completa: logotipo, isotipo, personaje y sistema de color",
    "Arquitectura de submarcas para Burn & Claim, Spotlight y Aerosol ID",
    "Sistema de diseño por niveles para que producto, marketing y comunidad publiquen sin pasar por diseño",
    "Sitio corporativo y páginas de producto",
    "Escenas ilustradas, avatares y piezas de comunidad",
  ],
  shippedEn: [
    "Full identity: wordmark, symbol, character and color system",
    "Sub-brand architecture for Burn & Claim, Spotlight and Aerosol ID",
    "A tiered design system so product, marketing and community can publish without going through design",
    "Corporate site and product pages",
    "Illustrated scenes, avatars and community pieces",
  ],
  outcome: [
    "La identidad salió el 7 de julio de 2025 y sigue siendo la marca de la compañía.",
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
    "The identity shipped on 7 July 2025 and is still the company brand.",
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

const allianceProject: Project = {
  slug: "alliance",
  title: "Alliance",
  client: "Suheidi Rivera, Alliance Legal Group PLLC (Nueva York)",
  year: "2021",
  role: "Logotipo e identidad de marca",
  roleEn: "Logo and brand identity",
  scope: ["Identidad", "Isotipo y logotipo", "Sistema de color", "Papelería y aplicaciones en relieve"],
  scopeEn: ["Identity", "Symbol and wordmark", "Color system", "Stationery and embossed applications"],
  brief: "Un bufete de Nueva York que necesitaba no parecerse a los demás bufetes. La categoría entera se ve igual: azul marino, dorado y la balanza de la justicia. El encargo era transmitir equilibrio y confianza sin caer en ninguno de esos lugares comunes.",
  briefEn: "A New York law firm that needed to not look like every other law firm. The whole category looks the same: navy, gold and the scales of justice. The brief was to convey balance and trust without landing on any of those clichés.",
  shipped: [
    "Isotipo: piedras apiladas en equilibrio sobre un fulcro, la idea de balance sin la balanza literal",
    "Logotipo en serif clásica con «Legal Group PLLC» en sans espaciada debajo",
    "Paleta cálida de topo y melocotón, en lugar del azul marino y dorado de la categoría",
    "Aplicaciones en relieve: papel negro, relieve dorado y sello de madera",
  ],
  shippedEn: [
    "Symbol: stones stacked in balance on a fulcrum, the idea of equilibrium without the literal scales",
    "A classical serif wordmark with «Legal Group PLLC» set in spaced sans beneath it",
    "A warm taupe and peach palette instead of the category's navy and gold",
    "Embossed applications: black paper, gold emboss and a wooden stamp",
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
  year: "2023 - 2024",
  role: "Dirección creativa, identidad y desarrollo front-end",
  roleEn: "Creative direction, identity and front-end development",
  scope: ["Concepto", "Identidad", "Dirección de arte", "Diseño web", "Desarrollo front-end"],
  scopeEn: ["Concept", "Identity", "Art direction", "Web design", "Front-end development"],
  brief: "Una artista musical independiente necesitaba una identidad digital propia y un lugar donde viviera. La marca se construyó primero, y el sitio salió de ella.",
  briefEn: "An independent music artist needed a digital identity of her own and a place for it to live. The brand was built first, and the site came out of it.",
  shipped: [
    "Concepto e identidad visual a partir del significado del nombre",
    "Dirección de arte para el universo visual del proyecto",
    "marialunares.com, diseñado y programado por mí en Next.js",
    "Animación del video oficial de «Raíces»",
  ],
  shippedEn: [
    "Concept and visual identity built out of the meaning of the name",
    "Art direction for the visual universe of the project",
    "marialunares.com, designed and coded by me in Next.js",
    "Animation for the official «Raíces» music video",
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

/** Newest first. New projects go at the top. */
export const activeProjects = [
  ciudadFielProject,
  burnClaimProject,
  aerosolProject,
  neustackProject,
  allianceProject,
  materDesignProject,
  neuschoolProject,
  momProject,
  dinerologyProject,
  riccieOriachProject,
  mlLogoProject,
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
