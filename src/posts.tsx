import type { Language } from '@/i18n/translations';

/**
 * A blog entry, in both languages.
 *
 * Her site is the original and LinkedIn is the megaphone: she writes the long
 * version here and posts a short, linked version there. Syncing the other way
 * round is not possible without scraping LinkedIn, which would put her account
 * at risk, so nothing here is ever fetched from anywhere.
 *
 * Both languages are required fields, not optional ones, so `tsc` fails on an
 * entry that only exists in Spanish. Each version is written, never machine
 * translated: her voice in Spanish is not her voice in English, and a reflective
 * piece run through a translator loses exactly the human note the blog is for.
 */
export interface Post {
  slug: string;
  /**
   * `YYYY-MM-DD`, the day it was first published. Drives the ordering of the
   * whole section, so nothing has to be reordered by hand.
   */
  date: string;
  title: string;
  titleEn: string;
  /** One or two sentences. Feeds the listing card and the meta description. */
  excerpt: string;
  excerptEn: string;
  /** The body, one string per paragraph. The first one renders as the lead. */
  paragraphs: string[];
  paragraphsEn: string[];
  /** Optional kicker above the title, e.g. "Marca" / "Brand". */
  topic?: string;
  topicEn?: string;
  /** The LinkedIn post this started life as, credited at the foot of the entry. */
  linkedinUrl?: string;
  /** Optional OG image. Without one the entry falls back to the site default. */
  coverImage?: string;
}

/**
 * Her LinkedIn posts, republished here as the first entries so the section did
 * not launch empty. Spanish is her own text, transcribed from the posts as
 * written. The only edit is the years-of-experience figure, which said 20 in
 * one post and "more than 15" in another: both now say 17+, matching her CV,
 * her site and her LinkedIn, because that number is the one thing a reader can
 * check in two clicks.
 *
 * Only `disenar-no-siempre-es-crear-desde-cero` carries her own English; she
 * wrote both versions that day. The rest are drafts she reviewed before they
 * shipped.
 */
const disenarNoEsCrearDesdeCero: Post = {
  slug: 'a-veces-disenar-es-escuchar',
  date: '2025-07-14',
  topic: 'Oficio',
  topicEn: 'Craft',
  title: 'A veces diseñar es escuchar',
  titleEn: 'Sometimes designing is listening',
  excerpt:
    'Por mucho tiempo creí que diseñar era inventar. Mientras más diseño, más me doy cuenta de que el verdadero trabajo muchas veces no está en crear, sino en escuchar.',
  excerptEn:
    'For a long time I thought design was about inventing. The more I design, the more I realize the real work often lies in listening.',
  paragraphs: [
    'Diseñar no siempre es "crear desde cero", a veces es escuchar lo que ya está ahí.',
    'Por mucho tiempo creí que diseñar era sinónimo de "inventar". De traer algo completamente nuevo al mundo. De crear desde cero.',
    'Pero mientras más diseño, más me doy cuenta de que el verdadero trabajo muchas veces no está en crear, sino en escuchar:',
    `• Escuchar lo que la marca ya está diciendo pero no sabe cómo.
• Escuchar lo que el cliente piensa que necesita, pero aún no ha podido articular.
• Escuchar lo que las formas, los espacios, los colores y los silencios están comunicando.`,
    'Diseñar es tener la sensibilidad para leer lo invisible. Es traducir intenciones en formas. Es conectar puntos entre lo estratégico y lo emocional.',
    'No siempre se trata de tener la idea más original del mundo. A veces, se trata de encontrar la forma más honesta de decir algo.',
    'Y eso, para mí, sigue siendo un acto creativo profundamente poderoso.',
  ],
  paragraphsEn: [
    'Design isn’t always about "creating from scratch." Sometimes, it’s about listening to what’s already there.',
    'For a long time, I thought design was about inventing. About bringing something entirely new into the world. About starting from zero.',
    'But the more I design, the more I realize that the real work often lies in listening:',
    `• Listening to what the brand is already saying, but doesn’t know how to express it.
• Listening to what the client thinks they need, but hasn’t quite figured out yet.
• Listening to what shapes, spaces, colors, and even silences are already communicating.`,
    'Designing means being sensitive enough to read the invisible. It’s translating intentions into form. It’s connecting the strategic with the emotional.',
    'It’s not always about having the most original idea. Sometimes, it’s about finding the most honest way to say something.',
    'And to me, that’s still one of the most powerful creative acts there is.',
  ],
};

const loQueNoSeVeEnUnaFoto: Post = {
  slug: 'la-parte-invisible-del-trabajo',
  date: '2025-08-08',
  topic: 'Proceso',
  topicEn: 'Process',
  title: 'La parte invisible del trabajo',
  titleEn: 'The invisible part of the work',
  excerpt:
    'Una foto no muestra los años de trabajo para llegar a un estilo propio, ni los conceptos que cambiaron en el último minuto. Pero todo eso está ahí.',
  excerptEn:
    'A photo does not show the years of work behind a style of your own, or the concepts that changed at the last minute. But all of it is in there.',
  paragraphs: [
    'Lo que no se ve en una foto, también cuenta una historia.',
    'En esta imagen:',
    `1. No se ven los años de trabajo para llegar a un estilo propio.
2. No se ven las veces que un concepto cambió en el último minuto y me obligó a replantear todo.
3. No se ven los proyectos que salieron al mundo y los que nunca vieron la luz.
4. No se ve la mezcla de organización obsesiva y caos creativo que me acompaña en cada entrega.`,
    'Pero todo eso está ahí.',
    'Esta vez, fue el ojo y la sensibilidad de Simón Vélez, amigo y fotógrafo, lo que hizo que esa parte invisible quedara plasmada. No solo tomó una foto, capturó una versión de mí que pocas veces veo desde fuera.',
    'Hoy sigo abierta a proyectos que desafíen mi creatividad y me permitan aportar lo que sé: crear marcas que no solo se vean bien, sino que cuenten quiénes son de verdad.',
    'Si estás buscando elevar tu identidad visual con propósito y autenticidad, me encantaría escucharte.',
  ],
  paragraphsEn: [
    'What a photo does not show also tells a story.',
    'In this image:',
    `1. You do not see the years of work it took to arrive at a style of my own.
2. You do not see the times a concept changed at the last minute and forced me to rethink everything.
3. You do not see the projects that made it into the world, and the ones that never saw the light.
4. You do not see the mix of obsessive organization and creative chaos that comes with me on every delivery.`,
    'But all of it is in there.',
    'This time it was the eye and the sensibility of Simón Vélez, a friend and photographer, that brought the invisible part out. He did not just take a photo, he captured a version of me I rarely get to see from the outside.',
    'I am still open to projects that challenge my creativity and let me bring what I know: building brands that do not only look good, but that say who they really are.',
    'If you are looking to raise your visual identity with purpose and authenticity, I would love to hear from you.',
  ],
};

const cuandoDigoQueHagoNfts: Post = {
  slug: 'la-conversacion-sobre-nfts',
  date: '2026-07-08',
  topic: 'Arte digital',
  topicEn: 'Digital art',
  title: 'La conversación sobre NFTs que no estamos teniendo',
  titleEn: 'The NFT conversation we are not having',
  excerpt:
    'Un silencio incómodo y un cambio de tema. Estar en el mundo creativo tradicional y en el digital a la vez me da un punto de vista que casi nadie tiene.',
  excerptEn:
    'An uncomfortable silence and a change of subject. Standing in both the traditional creative world and the digital one gives me a view almost nobody has.',
  paragraphs: [
    'Cuando digo que hago NFTs, ya sé lo que va a pasar...',
    'Un silencio incómodo. Una mirada de "what?". Un cambio de tema sutil.',
    'Trabajé años en agencias de distintos tamaños. Ayudé a formar profesionales más junior que yo. Tengo cierto nivel de credibilidad en el "mundo creativo tradicional". Y también hago colecciones NFT en Solana; construí mi propia plataforma para lanzarlas y venderlas. Y ya puedo decir que vivo con parte de eso.',
    'Estar en ambos mundos me da un punto de vista que casi nadie tiene: la conversación sobre NFTs que necesitamos tener, no la estamos teniendo.',
    'Sí, hay problemas reales en el espacio. Scams. Slop generativo. Especulación pura. He visto colegas perder dinero, colecciones que eran estafas disfrazadas, mercados que colapsaron.',
    'Pero ayer, en pleno 2026, me clonaron una tarjeta de un banco tradicional de aquí. Un scam que les pasa a millones cada día. Y a nadie se le ocurre decirme: "cierra la cuenta, deja de usar tarjetas, todo el sistema es una estafa."',
    'Descartar el ecosistema entero de arte digital por sus peores actores es como descartar toda la música por un género que consideres "malo". No es un argumento honesto.',
    'Lo que casi nadie de ese "mundo creativo tradicional" escucha o quiere escuchar:',
    'Soy diseñadora y artista dominicana. Sin galería en New York o París. Sin escuela de arte fancy. Sin red de coleccionistas heredada. Durante años, el arte tradicional me decía que si quería distribución, audiencia, vivir de esto, tenía que pedir permiso a estructuras que nunca fueron diseñadas para alguien como yo.',
    'Cuando saqué mi primera colección NFT, se vendió a coleccionistas en países a los que nunca he ido. Sin galería intermediando. Sin curador validando. Sin nadie diciéndome que mi trabajo no es "digerible" o "lo suficientemente comercial". Solo yo, mi trabajo y una infraestructura que por primera vez me permite, como artista independiente, llegar a una audiencia global desde el Caribe.',
    'Cuatro colecciones después, tengo control total. Decido qué creo, cuándo, a qué precio. Construyo una comunidad real. Todo en un espacio que el "mundo creativo mainstream" decidió descartar por completo.',
    'Y hay algo que no vieron: el espacio cambió. Los días de las colecciones de 10,000 imágenes generadas se acabaron. Ya casi ni las de 2,000 funcionan. Lo que funciona son colecciones pequeñas. Con concepto. Con historia. Con algo real detrás. Hechas por una persona, no por un script, un prompt y ai.',
    'No estoy aquí para endiosar el espacio. Tuvo su boom; puede volver a caer. Puede que dentro de un año esto ya no me sirva. No lo sé. Pero ahora mismo me está funcionando. Me deja ilustrar libremente lo que yo quiera, sin filtros ni permisos.',
    'Aunque sea temporal, para artistas como yo, es la primera infraestructura de distribución que no requiere pedir permiso, sino amor por lo que haces.',
    'Y esa es la conversación que me gustaría tener.',
  ],
  paragraphsEn: [
    'When I say I make NFTs, I already know what is coming...',
    'An uncomfortable silence. A "what?" look. A subtle change of subject.',
    'I worked for years in agencies of every size. I helped train designers more junior than me. I have a certain level of credibility in the "traditional creative world." And I also make NFT collections on Solana; I built my own platform to launch and sell them. And I can now say part of my living comes from that.',
    'Standing in both worlds gives me a view almost nobody has: the conversation about NFTs we need to be having is not the one we are having.',
    'Yes, there are real problems in the space. Scams. Generative slop. Pure speculation. I have watched colleagues lose money, collections that were scams in disguise, markets that collapsed.',
    'But yesterday, in 2026, a card of mine from a traditional bank here was cloned. A scam that happens to millions of people every day. And it occurs to nobody to tell me: "close the account, stop using cards, the whole system is a fraud."',
    'Writing off the entire digital art ecosystem because of its worst actors is like writing off all music because of one genre you consider bad. It is not an honest argument.',
    'What almost nobody in that "traditional creative world" hears, or wants to hear:',
    'I am a Dominican designer and artist. No gallery in New York or Paris. No fancy art school. No inherited network of collectors. For years, traditional art told me that if I wanted distribution, an audience, a living out of this, I had to ask permission from structures that were never designed for someone like me.',
    'When I released my first NFT collection, it sold to collectors in countries I have never been to. No gallery in the middle. No curator validating it. Nobody telling me my work is not digestible enough, or not commercial enough. Just me, my work, and an infrastructure that for the first time lets me reach a global audience from the Caribbean as an independent artist.',
    'Four collections later, I have full control. I decide what I make, when, and at what price. I am building a real community. All of it in a space the mainstream creative world decided to write off completely.',
    'And there is something they did not see: the space changed. The days of collections of 10,000 generated images are over. Even the ones with 2,000 barely work now. What works are small collections. With a concept. With a story. With something real behind them. Made by a person, not by a script, a prompt and ai.',
    'I am not here to put the space on a pedestal. It had its boom; it can fall again. A year from now this may no longer work for me. I do not know. But right now it is working. It lets me illustrate freely whatever I want, with no filters and no permissions.',
    'Even if it is temporary, for artists like me it is the first distribution infrastructure that does not ask for permission, only for love of what you do.',
    'And that is the conversation I would like to have.',
  ],
};

const elTiempoYLaEnergia: Post = {
  slug: 'el-tiempo-no-es-la-variable-es-la-energia',
  date: '2026-07-22',
  topic: 'Trabajo',
  topicEn: 'Work',
  title: 'El tiempo no es la variable, es la energía',
  titleEn: 'Time is not the variable, energy is',
  excerpt:
    'Un día resolví en una hora algo con lo que llevaba semanas estancada. Eso me hace pensar que la variable real detrás del valor no es el tiempo.',
  excerptEn:
    'One day I solved in an hour something I had been stuck on for weeks. That makes me think the real variable behind value is not time.',
  paragraphs: [
    '"El tiempo es dinero..."',
    'Es una premisa que no se cuestiona mucho. Rige cómo cobramos, cómo trabajamos, cómo medimos si un día fue "productivo." La manifestación más obvia es cobrar por horas. Es la forma más común de convertir tiempo en dinero. Y funciona, al menos como sistema práctico. Cobrar por energía sería complicado porque... ¿Cómo se mide eso?',
    'Pero, para mí, hay algo raro con esa ecuación. El tiempo no es lineal cuando se trata de valor en sí.',
    'Un día, sentada frente a mi compu, resolví en una hora algo con lo que llevaba semanas estancada... Semanas... Y esa hora no fue una hora más "trabajada", fue una hora donde algo se alineó dentro de mí. Presencia, atención, ganas, algo hizo clic. Ese día sentí que fui más productiva que en las tres semanas anteriores completas.',
    'Y me ha pasado al revés también: otras veces, sentada frente a la misma pantalla, algo que pensé que me tomaría unas horas terminó tomándome semanas.',
    'Eso me hace pensar que quizás la variable real detrás del valor no es el tiempo. Es la energía.',
    'Atención. Presencia. Estado mental. Flow. Ganas.',
    'Eso es lo que produce el resultado. El tiempo es apenas el contenedor donde esa energía pasa (o no pasa).',
    'Y otra cosa: la energía no es infinita. No la produces trabajando más horas. Solo se puede redistribuir. Cuando estás estresadx, preocupadx, ansiosx por algo, tu cuerpo reasigna toda esa energía a "sobrevivir la situación." Y no queda casi nada para crear, pensar bien, estar aquí y ahora.',
    'No es el estrés lo que te agota. Es la respuesta al estrés.',
    'Un día tranquilo con 3 horas de foco puede producir más que un día estresado con 12 horas de esfuerzo.',
    'Si eso es cierto, entonces:',
    'Cuando me evalúo, medir "cuánto trabajé hoy" en horas es medir el envase, no el contenido. Puedo haber trabajado 10 horas y hecho poco. Puedo haber trabajado 2 horas con energía y haber movido algo real.',
    'Cuando evalúo a alguien más, exigir "más horas" no es exigir más resultados. Es exigir más del "envase". Y una que otra vez, el envase puede estar vacío.',
    'Y cuando pienso en el éxito, quizá no es la cantidad de esfuerzo. Es la calidad de la energía sostenida en el tiempo.',
    'No estoy diciendo que "el tiempo es dinero" sea mentira. En la práctica sigue funcionando. Pero es una simplificación. Y a veces vale la pena verla como lo que es: un medidor útil que no captura lo que realmente pasa por dentro.',
    'La próxima vez que sientas que "no fue un día productivo" porque no trabajaste "suficientes horas", pregúntate mejor: "¿Le puse energía a lo que hice?" Si la respuesta es sí, quizá el día sí valió, aunque la ecuación tradicional diga lo contrario. 😉',
  ],
  paragraphsEn: [
    '"Time is money..."',
    'It is a premise we rarely question. It governs how we charge, how we work, how we measure whether a day was productive. The most obvious expression of it is charging by the hour. It is the most common way to turn time into money. And it works, at least as a practical system. Charging for energy would be complicated because... how do you even measure that?',
    'But for me there is something odd about that equation. Time is not linear when it comes to value itself.',
    'One day, sitting at my computer, I solved in an hour something I had been stuck on for weeks... Weeks... And that hour was not one more hour worked, it was an hour where something lined up inside me. Presence, attention, appetite, something clicked. That day I felt more productive than in the three previous weeks put together.',
    'And it has happened the other way round too: other times, sitting at the same screen, something I thought would take a few hours ended up taking weeks.',
    'That makes me think the real variable behind value may not be time. It is energy.',
    'Attention. Presence. State of mind. Flow. Appetite.',
    'That is what produces the result. Time is only the container that energy passes through, or does not.',
    'And another thing: energy is not infinite. You do not produce more of it by working more hours. It can only be redistributed. When you are stressed, worried, anxious about something, your body reassigns all of that energy to surviving the situation. And there is almost nothing left to create, to think clearly, to be here and now.',
    'It is not stress that drains you. It is the response to stress.',
    'A calm day with 3 hours of focus can produce more than a stressed day with 12 hours of effort.',
    'If that is true, then:',
    'When I assess myself, measuring how much I worked today in hours is measuring the container, not the contents. I can work 10 hours and do very little. I can work 2 hours with energy and move something real.',
    'When I assess someone else, demanding more hours is not demanding more results. It is demanding more container. And every so often, the container can be empty.',
    'And when I think about success, maybe it is not the amount of effort. It is the quality of the energy sustained over time.',
    'I am not saying "time is money" is a lie. In practice it still works. But it is a simplification. And sometimes it is worth seeing it for what it is: a useful gauge that does not capture what is really going on inside.',
    'The next time you feel it was not a productive day because you did not work enough hours, ask yourself something better: did I put energy into what I did? If the answer is yes, maybe the day did count, even if the traditional equation says otherwise. 😉',
  ],
};

const desdeElCaribeParaElMundo: Post = {
  slug: 'desde-el-caribe-para-el-mundo',
  date: '2026-09-07',
  topic: 'Remoto',
  topicEn: 'Remote',
  title: 'Desde el Caribe, para el mundo',
  titleEn: 'From the Caribbean, for the world',
  excerpt:
    'Hace unos años, para trabajar con equipos de afuera desde el Caribe, había que hacer maletas. Yo me quedé, y el mundo se volvió remoto antes de que yo tuviera que irme.',
  excerptEn:
    'A few years ago, working with teams abroad from the Caribbean meant packing your bags. I stayed, and the world went remote before I ever had to leave.',
  paragraphs: [
    'Hace unos años, para trabajar con equipos de afuera desde el Caribe, había que hacer maletas... Yo me quedé. Y resulta que el mundo se volvió remoto antes de que yo tuviera que irme.',
    'Diseño y construyo desde Santo Domingo. La marca, el producto, y la web donde ese producto vive: el mismo cerebro que piensa la identidad la lleva hasta el front-end funcionando. No es teoría: llevo años trabajando con equipos y clientes dentro y fuera del país, en remoto, y mi propio ecosistema digital, se vendió casi completo a personas en países que ni conozco.',
    'Durante mucho tiempo creí que para "jugar en grande" tenía que estar en otro lado. Que el techo era geográfico. Y sí, hay una parte incómoda en esto... Crear desde aquí muchas veces significa que el mercado local no siempre puede pagar lo que vale el trabajo. Pero eso no me hace más pequeña. Me hace clara sobre dónde quiero llegar.',
    'Lo remoto no es mi plan B. Es la forma en que ya trabajo. Y lo que traigo a la mesa no es "hago diseño"; es pensar la marca, el producto y su presencia digital de punta a punta, con criterio senior y manos que también saben ejecutar en código.',
    'Así que lo digo sin rodeos y sin drama: estoy abriendo espacio para colaborar con equipos de afuera, en remoto. Si estás construyendo algo y quieres a alguien que lo diseñe y también lo lleve a un producto real, desde la idea hasta la pantalla, mi inbox está abierto.',
    '¿La próxima generación de talento del Caribe se va... O construye desde aquí para el mundo? Yo ya escogí.',
  ],
  paragraphsEn: [
    'A few years ago, working with teams abroad from the Caribbean meant packing your bags... I stayed. And it turns out the world went remote before I ever had to leave.',
    'I design and build from Santo Domingo. The brand, the product, and the site where that product lives: the same brain that thinks through the identity carries it all the way to a working front end. This is not theory. I have spent years working with teams and clients inside and outside the country, remotely, and my own digital ecosystem sold almost entirely to people in countries I have never set foot in.',
    'For a long time I believed that to play at a bigger level I had to be somewhere else. That the ceiling was geographic. And yes, there is an uncomfortable part to this... Building from here often means the local market cannot always pay what the work is worth. But that does not make me smaller. It makes me clear about where I want to get to.',
    'Remote is not my plan B. It is the way I already work. And what I bring to the table is not "I do design"; it is thinking through the brand, the product and its digital presence end to end, with senior judgement and hands that can also execute in code.',
    'So I will say it plainly and without drama: I am opening space to collaborate with teams abroad, remotely. If you are building something and you want someone who will design it and also carry it into a real product, from the idea to the screen, my inbox is open.',
    'Does the next generation of Caribbean talent leave... or build from here for the world? I already chose.',
  ],
};

const laConsistenciaNoEsSexy: Post = {
  slug: 'la-disciplina-invisible',
  date: '2026-07-02',
  topic: 'Oficio',
  topicEn: 'Craft',
  title: 'La disciplina invisible',
  titleEn: 'Invisible discipline',
  excerpt:
    'Veo a mucha gente hacerse viral una vez y desaparecer a los seis meses. Mientras tanto hay algo que casi nadie muestra: la disciplina invisible.',
  excerptEn:
    'I see a lot of people go viral once and vanish six months later. Meanwhile there is something almost nobody shows: invisible discipline.',
  paragraphs: [
    'La consistencia no es sexy... Pero te lleva lejos. Más lejos de lo que cualquier viral te va a llevar.',
    'Últimamente veo a mucha gente hacerse viral una vez. Un post explota. Aparecen en tres podcasts. Publican un curso. Y a los seis meses, silencio.',
    'Y mientras eso pasa, Instagram y TikTok se llenaron de gente enseñando a otros a hacerse virales. "El hook para agarrarlos en los primeros 3 segundos." "Los 5 tips que nadie te va a decir." "El consejo que cambió mi vida." Todo con la misma estructura. El mismo tono. La misma promesa.',
    'Ya nada suena natural. Nada suena real. Nada suena honesto.',
    'Llevo más de 17 años haciendo esto: diseños, marcas, artes digitales. Y he visto pasar más ciclos de "hacks para crecer rápido" de los que puedo contar. A cada rato aparece una nueva promesa: el shortcut definitivo, el "growth hack" que va a cambiar tu carrera, el post que te va a hacer famoso y cobrar por eso. A cada rato, la misma historia... Subida rápida, caída rápida, nombre olvidado.',
    'Mientras tanto, hay algo que casi nadie muestra: la disciplina invisible.',
    'Los cuatro años que llevo aprendiendo a trabajar con código, un poco cada día, mientras trabajo, mientras diseño, mientras vivo mi vida. Sin bootcamp intensivo. Sin momento "wow" que compartir...',
    'Las cuatro colecciones NFT que hice en tres años, sin una viral, sin acompañamiento mediático, publicándolas mientras el resto del mundo creativo decía (y todavía dice) que los NFTs habían muerto.',
    'Mollyverse, que empezó como una idea que le conté a un amigo, y que fui construyendo en silencio durante meses antes de que estuviera lista para mostrarse.',
    'La consistencia no te hace viral. No te hace famoso de la noche a la mañana. No te da likes explosivos.',
    'Te construye un cuerpo de trabajo, no un momento. Te da credibilidad real, no atención prestada. Te forma como profesional, no como personaje.',
    'Y cuando el ciclo del hype termine (siempre termina), lo que queda es lo que construiste en silencio, mientras nadie miraba.',
    'En un mundo que romantiza los overnight successes, dedicarse a algo por décadas empieza a sonar contracultural...',
    'Y yo prefiero eso.',
    '💜',
  ],
  paragraphsEn: [
    'Consistency is not sexy... But it takes you far. Further than any viral moment will take you.',
    'Lately I see a lot of people go viral once. A post explodes. They show up on three podcasts. They launch a course. And six months later, silence.',
    'And while that happens, Instagram and TikTok filled up with people teaching others how to go viral. "The hook that grabs them in the first 3 seconds." "The 5 tips nobody will tell you." "The advice that changed my life." All with the same structure. The same tone. The same promise.',
    'Nothing sounds natural any more. Nothing sounds real. Nothing sounds honest.',
    'I have been doing this for more than 17 years: design, brands, digital art. And I have watched more cycles of "hacks to grow fast" than I can count. Every so often a new promise shows up: the definitive shortcut, the growth hack that will change your career, the post that will make you famous and paid for it. Every so often, the same story... Fast rise, fast fall, forgotten name.',
    'Meanwhile, there is something almost nobody shows: invisible discipline.',
    'The four years I have spent learning to work with code, a little every day, while I work, while I design, while I live my life. No intensive bootcamp. No "wow" moment to share...',
    'The four NFT collections I made in three years, without a single viral, without any press behind them, publishing them while the rest of the creative world said, and still says, that NFTs were dead.',
    'Mollyverse, which started as an idea I told a friend about, and that I built quietly for months before it was ready to be shown.',
    'Consistency does not make you viral. It does not make you famous overnight. It does not give you explosive likes.',
    'It builds you a body of work, not a moment. It gives you real credibility, not borrowed attention. It shapes you as a professional, not as a character.',
    'And when the hype cycle ends, and it always ends, what is left is what you built quietly, while nobody was looking.',
    'In a world that romanticizes overnight successes, devoting yourself to something for decades starts to sound countercultural...',
    'And I prefer that.',
    '💜',
  ],
};

const iaParaHacernosMasCapaces: Post = {
  slug: 'ia-para-hacernos-mas-capaces',
  date: '2026-06-26',
  topic: 'IA',
  topicEn: 'AI',
  title: '¿Estamos construyendo IA para hacernos más capaces?',
  titleEn: 'Are we building AI to make us more capable?',
  excerpt:
    'Por primera vez estoy del otro lado, ayudando a diseñar y construir productos con inteligencia artificial. Y eso me ha llevado a una pregunta incómoda.',
  excerptEn:
    'For the first time I am on the other side, helping design and build products powered by artificial intelligence. And it has led me to an uncomfortable question.',
  paragraphs: [
    'Mientras más me adentro en el mundo de los modelos de lenguaje (LLMs), hay una idea que no deja de darme vueltas en la cabeza.',
    'Llevo más de 17 años trabajando como diseñadora.',
    'Y como muchos creativos, me ha tocado reinventarme una y otra vez, aprender nuevas herramientas, adaptarme a nuevas tecnologías y abrirme camino en una industria que cambia constantemente.',
    'Desde inicios de este año, por primera vez en mi vida, estoy del otro lado. Estoy ayudando a diseñar y construir productos digitales impulsados por inteligencia artificial.',
    'Y eso me ha llevado a hacerme una pregunta incómoda:',
    '¿Estamos construyendo tecnología para hacer a las personas más capaces... O simplemente para necesitar menos personas?',
    'Últimamente escucho mucho una frase, o alguna variación de ella:',
    '"La IA no reemplazará a las personas. Las reemplazarán las personas que sepan usar IA."',
    'Entiendo la intención... Y de hecho, hasta hace poco yo también pensaba algo parecido.',
    'Pero mientras más trabajo en este mundo, más siento que seguimos optimizando exactamente lo mismo:',
    `- Más velocidad.
- Más productividad.
- Menos personas.`,
    'Solo cambiamos quién sobrevive.',
    'Seguimos hablando de eficiencia, pero muy poco de desarrollo humano.',
    'Y no estoy segura de que ese deba ser nuestro objetivo.',
    'Me emociona profundamente el potencial de la inteligencia artificial.',
    'La uso todos los días.',
    'No quiero un mundo sin IA.',
    'Lo que quiero es un mundo donde la IA no solo nos haga más eficientes, sino también mejores seres humanos.',
    'Que nos ayude a pensar mejor. A aprender más rápido. A desarrollar nuevas habilidades. A mejorar nuestra salud. A crear más. A resolver problemas que antes parecían imposibles.',
    'No solo a producir más con menos personas.',
    'Tal vez la pregunta no sea: "¿Qué trabajos puede reemplazar la IA?"',
    'Sino: "¿Qué capacidades humanas debería ayudarnos a desarrollar?"',
    'No tengo la respuesta... Y, honestamente, tampoco sé cómo será el futuro.',
    'Lo que sí sé es que quiero dedicar los próximos años de mi vida a construir cosas que ayuden a las personas a crecer, no solo a producir más.',
    'Quiero ser parte de un futuro donde la inteligencia artificial no haga menos necesaria a la humanidad, sino más capaz.',
    'Porque, al final, creo que el verdadero avance no será construir la IA más inteligente.',
    'Será construir herramientas que nos ayuden a ser personas más inteligentes, más libres, más creativas y más humanas.',
    'Y si puedo aportar, aunque sea un pequeño granito de arena para construir ese futuro, creo que habrá valido la pena.',
  ],
  paragraphsEn: [
    'The deeper I go into the world of language models (LLMs), the more one idea keeps going round in my head.',
    'I have been working as a designer for more than 17 years.',
    'And like many creatives, I have had to reinvent myself over and over, learn new tools, adapt to new technologies and make my way in an industry that changes constantly.',
    'Since the beginning of this year, for the first time in my life, I am on the other side. I am helping to design and build digital products powered by artificial intelligence.',
    'And that has led me to an uncomfortable question:',
    'Are we building technology to make people more capable... or simply to need fewer people?',
    'Lately I hear one phrase a lot, or some variation of it:',
    '"AI will not replace people. People who know how to use AI will replace them."',
    'I understand the intention... And in fact, until recently I thought something similar.',
    'But the more I work in this world, the more I feel we keep optimizing for exactly the same things:',
    `- More speed.
- More productivity.
- Fewer people.`,
    'We only change who survives.',
    'We keep talking about efficiency, and very little about human development.',
    'And I am not sure that should be our goal.',
    'The potential of artificial intelligence excites me deeply.',
    'I use it every day.',
    'I do not want a world without AI.',
    'What I want is a world where AI does not only make us more efficient, but also better human beings.',
    'That helps us think better. Learn faster. Develop new skills. Improve our health. Create more. Solve problems that used to look impossible.',
    'Not only produce more with fewer people.',
    'Maybe the question is not "what jobs can AI replace?"',
    'But "what human capabilities should it help us develop?"',
    'I do not have the answer... And honestly, I do not know what the future will look like either.',
    'What I do know is that I want to spend the coming years of my life building things that help people grow, not only produce more.',
    'I want to be part of a future where artificial intelligence does not make humanity less necessary, but more capable.',
    'Because in the end, I believe the real advance will not be building the most intelligent AI.',
    'It will be building tools that help us be more intelligent, freer, more creative and more human people.',
    'And if I can contribute even a small grain of sand to building that future, I think it will have been worth it.',
  ],
};

/**
 * Every entry. Order does not matter here: `activePosts` sorts by date, so a
 * new entry can be appended wherever it is convenient to write it.
 */
const posts: Post[] = [
  desdeElCaribeParaElMundo,
  elTiempoYLaEnergia,
  cuandoDigoQueHagoNfts,
  laConsistenciaNoEsSexy,
  iaParaHacernosMasCapaces,
  loQueNoSeVeEnUnaFoto,
  disenarNoEsCrearDesdeCero,
];

/** Newest first, everywhere: the listing, the sitemap and the prev/next links. */
export const activePosts: Post[] = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const postsBySlug: Record<string, Post> = Object.fromEntries(
  activePosts.map((post) => [post.slug, post])
);

/**
 * The date as a reader sees it. Parsed and formatted in UTC so the server and
 * the browser always agree, which a local-timezone parse would not guarantee.
 */
export function formatPostDate(date: string, lang: Language): string {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-DO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

const WORDS_PER_MINUTE = 200;

/** Rounded reading time in minutes, never less than one. */
export function readingMinutes(paragraphs: string[]): number {
  const words = paragraphs.join(' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
