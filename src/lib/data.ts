import type { Article, Category } from "@/types/article";

export const categories: Category[] = [
  {
    id: "species",
    name: {
      en: "Species",
      es: "Especies",
      pt: "Espécies",
    },
    icon: "🔍",
  },
  {
    id: "behavior",
    name: {
      en: "Behavior",
      es: "Comportamiento",
      pt: "Comportamento",
    },
    icon: "🦅",
  },
  {
    id: "adaptation",
    name: {
      en: "Adaptation",
      es: "Adaptación",
      pt: "Adaptação",
    },
    icon: "🌿",
  },
  {
    id: "conservation",
    name: {
      en: "Conservation",
      es: "Conservación",
      pt: "Conservação",
    },
    icon: "🌍",
  },
  {
    id: "mythology",
    name: {
      en: "Mythology",
      es: "Mitología",
      pt: "Mitologia",
    },
    icon: "📚",
  },
];

export const articles: Article[] = [
  {
    id: "1",
    slug: "barn-owl-hunting-techniques",
    title: {
      en: "Barn Owl Hunting Techniques",
      es: "Técnicas de Caza del Búho Campestre",
      pt: "Técnicas de Caça da Coruja-das-torres",
    },
    excerpt: {
      en: "Discover the hunting mastery of the Barn Owl, a nocturnal predator with exceptional hearing abilities and silent flight technology.",
      es: "Descubre el dominio de caza del Búho Campestre, un depredador nocturno con habilidades auditivas excepcionales y tecnología de vuelo silencioso.",
      pt: "Descubra a maestria de caça da Coruja-das-torres, um predador noturno com habilidades auditivas excepcionais e tecnologia de voo silencioso.",
    },
    content: `# The Barn Owl's Hunting Mastery

The *Tyto alba*, commonly known as the Barn Owl, is a remarkable nocturnal hunter that has evolved specialized adaptations for silent flight and precise hearing. These adaptations make it one of the most efficient nighttime predators in the world.

## Exceptional Hearing Abilities

Barn owls possess asymmetrically positioned ear openings - a unique adaptation that allows them to pinpoint prey with extraordinary accuracy. The right ear opening is typically positioned slightly higher than the left, enabling the owl to create a three-dimensional sound map of its environment.

## Silent Flight Technology

The barn owl's feathers have evolved special adaptations that allow for nearly silent flight:
- Comb-like leading edges on primary wing feathers
- Soft, velvety surfaces that absorb sound
- Flexible trailing edges that reduce air turbulence

## Hunting Strategy

These owls employ a methodical hunting approach:
1. Perch and listen for prey movements
2. Silent glide towards target location
3. Strike with deadly precision using powerful talons

Their success rate in complete darkness can exceed 85%, making them one of nature's most efficient hunters.`,
    featuredImage: "https://brinzal.org/wp-content/uploads/2023/03/Lechuza.jpg",
    images: [
      {
        url: "https://brinzal.org/wp-content/uploads/2023/03/Lechuza.jpg",
        caption:
          "A Barn Owl perched on a wooden beam, showcasing its distinctive heart-shaped face",
      },
      {
        url: "https://inaturalist-open-data.s3.amazonaws.com/photos/165796940/large.jpg",
        caption:
          "Barn Owl in flight, demonstrating its silent hunting technique",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/1/17/Barn_Owl%2C_Lancashire.jpg",
        caption:
          "Barn Owl in flight, demonstrating its silent hunting technique",
      },
    ],
    author: {
      id: "1",
      name: "Jane Smith",
      avatar:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzY0NzQ4QiIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SlM8L3RleHQ+PC9zdmc+",
      bio: {
        en: "Wildlife biologist and science writer",
        es: "Bióloga de vida silvestre y escritora científica",
        pt: "Bióloga da vida selvagem e escritora científica",
      },
    },
    rating: 4.7,
    readingTime: 6,
    likes: 165,
    categories: [
      {
        id: "species",
        name: {
          en: "Species",
          es: "Especies",
          pt: "Espécies",
        },
      },
      {
        id: "behavior",
        name: {
          en: "Behavior",
          es: "Comportamiento",
          pt: "Comportamento",
        },
      },
    ],
    publishDate: new Date("2023-05-15"),
    scientificNames: ["Tyto alba"],
  },
  {
    id: "2",
    slug: "snowy-owl-arctic-adaptations",
    title: {
      en: "The Snowy Owl: Arctic Majesty",
      es: "El Búho Nival: Majestad del Ártico",
      pt: "A Coruja-das-neves: Majestade do Ártico",
    },
    excerpt: {
      en: "Explore the life of the Snowy Owl, a stunning white predator perfectly adapted to the harsh Arctic tundra.",
      es: "Explora la vida del Búho Nival, un impresionante depredador blanco perfectamente adaptado a la dura tundra ártica.",
      pt: "Explore a vida da Coruja-das-neves, um impressionante predador branco perfeitamente adaptado à dura tundra ártica.",
    },
    content: `# The Arctic's White Guardian

  The *Bubo scandiacus*, or Snowy Owl, is one of the most recognizable owl species due to its striking white plumage. These magnificent birds are perfectly adapted to life in the Arctic regions.

  ## Physical Adaptations

  - **Thick plumage**: Provides insulation against temperatures as low as -50°C
  - **Feathered feet**: Act as natural snowshoes and keep toes warm
  - **Yellow eyes**: Among the most acute in the owl family, adapted to the 24-hour daylight of Arctic summers

  ## Hunting Behavior

  Unlike most owls, Snowy Owls are diurnal (active during day), especially in summer when the Arctic has continuous daylight. They primarily hunt:
  - Lemmings (can consume up to 1,600 per year)
  - Arctic hares
  - Small birds

  ## Conservation Status

  Classified as Vulnerable by IUCN due to climate change affecting their Arctic habitat and prey availability.`,
    featuredImage:
      "https://avesexoticas.org/wp-content/uploads/2017/09/descarga-800x450.jpg",
    images: [
      {
        url: "https://www.zoomadrid.com/content/dam/zoo/blog/export/sites/default/files/B%C3%BAho-nival.jpg",
        caption: "Snowy Owl perched on a snow-covered rock",
      },
      {
        url: "https://static.nationalgeographic.es/files/styles/image_3200/public/Buho%20nival%2001_0.jpg?w=1600",
        caption: "Snowy Owl in flight over tundra",
      },
      {
        url: "https://avesexoticas.org/wp-content/uploads/2017/09/descarga-800x450.jpg",
        caption: "Snowy Owl in flight over tundra",
      },
    ],
    author: {
      id: "2",
      name: "Carlos Méndez",
      avatar:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzRFQkY1NSIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q008L3RleHQ+PC9zdmc+",
      bio: {
        en: "Arctic wildlife specialist",
        es: "Especialista en fauna ártica",
        pt: "Especialista em vida selvagem ártica",
      },
    },
    rating: 4.8,
    readingTime: 7,
    likes: 210,
    categories: [
      {
        id: "species",
        name: {
          en: "Species",
          es: "Especies",
          pt: "Espécies",
        },
      },
    ],
    publishDate: new Date("2023-06-20"),
    scientificNames: ["Bubo scandiacus"],
  },
  {
    id: "3",
    slug: "little-owl-cultural-significance",
    title: {
      en: "The Little Owl: Athena's Companion",
      es: "El Mochuelo Europeo: Compañero de Atenea",
      pt: "A Coruja-das-moitas: Companheira de Atena",
    },
    excerpt: {
      en: "Discover the Little Owl, a small but culturally significant species that has been associated with wisdom since ancient times.",
      es: "Descubre el Mochuelo Europeo, una especie pequeña pero culturalmente significativa asociada a la sabiduría desde la antigüedad.",
      pt: "Descubra a Coruja-das-moitas, uma espécie pequena mas culturalmente significativa associada à sabedoria desde a antiguidade.",
    },
    content: `# The Owl of Wisdom

  The *Athene noctua*, or Little Owl, is perhaps the most culturally significant owl species, being the sacred bird of Athena, the Greek goddess of wisdom.

  ## Characteristics

  - **Size**: Only 22 cm tall (smallest European owl)
  - **Appearance**: Compact body with spotted plumage and striking yellow eyes
  - **Habitat**: Prefers open country with scattered trees and rocky areas

  ## Behavior

  Unlike many owls, Little Owls are often active during daylight hours (crepuscular). They exhibit:
  - Distinctive bobbing movements when alert
  - Varied diet (insects, small mammals, earthworms)
  - Territorial calls that sound like a clear "kiew-kiew"

  ## Cultural Importance

  Featured on ancient Greek coins and modern symbols of education. The city of Athens had these owls as protected species.`,
    featuredImage:
      "https://cdn.nubika.es/wp-content/uploads/2022/08/mochuelo-comun-caracteristicas-alimentacion-habitat.jpg",
    images: [
      {
        url: "https://cdn.nubika.es/wp-content/uploads/2022/08/mochuelo-comun-caracteristicas-alimentacion-habitat.jpg",
        caption: "Little Owl perched on a branch",
      },
      {
        url: "https://seo.org/wp-content/uploads/2013/11/F334_Foto_01.jpg",
        caption: "Ancient Greek coin featuring the Little Owl",
      },
    ],
    author: {
      id: "3",
      name: "Elena Papadopoulos",
      avatar:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iI0ZGQjRCNyIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RVA8L3RleHQ+PC9zdmc+",
      bio: {
        en: "Classicist and ornithologist",
        es: "Especialista en clásicas y ornitología",
        pt: "Especialista em clássicas e ornitologia",
      },
    },
    rating: 4.6,
    readingTime: 5,
    likes: 178,
    categories: [
      {
        id: "species",
        name: {
          en: "Species",
          es: "Especies",
          pt: "Espécies",
        },
      },
      {
        id: "mythology",
        name: {
          en: "Mythology",
          es: "Mitología",
          pt: "Mitologia",
        },
      },
    ],
    publishDate: new Date("2023-07-12"),
    scientificNames: ["Athene noctua"],
  },
  {
    id: "4",
    slug: "owl-body-language",
    title: {
      en: "Understanding Owl Body Language",
      es: "Entendiendo el Lenguaje Corporal de los Búhos",
      pt: "Entendendo a Linguagem Corporal das Corujas",
    },
    excerpt: {
      en: "Learn to interpret the subtle body movements and vocalizations that reveal an owl's mood and intentions.",
      es: "Aprende a interpretar los sutiles movimientos corporales y vocalizaciones que revelan el estado de ánimo e intenciones de un búho.",
      pt: "Aprenda a interpretar os sutis movimentos corporais e vocalizações que revelam o humor e intenções de uma coruja.",
    },
    content: `# Silent Communication

  Owls communicate volumes through body language and subtle movements. Understanding these signals provides fascinating insights into their behavior.

  ## Common Signals

  1. **Head bobbing**:
     - Slow bobs: Curiosity or assessing surroundings
     - Rapid bobs: Agitation or defensive posture

  2. **Feather positioning**:
     - Flattened feathers: Fear or submission
     - Puffed-up feathers: Appearing larger to intimidate

  3. **Eye movements**:
     - Wide-open eyes: Alertness
     - Half-closed eyes: Contentment or sleepiness

  ## Vocalizations

  Each species has distinct calls:
  - Territorial calls (long-range)
  - Contact calls (between mates)
  - Begging calls (young owls)
  - Alarm calls (sharp barks or hisses)`,
    featuredImage:
      "https://www.xlsemanal.com/wp-content/uploads/sites/3/2018/04/buhos-3-1-e1524982482932-1024x535.jpg",
    images: [
      {
        url: "https://www.xlsemanal.com/wp-content/uploads/sites/3/2018/04/buhos-3-1-e1524982482932-1024x535.jpg",
        caption: "Great Horned Owl displaying defensive posture",
      },
      {
        url: "https://www.xlsemanal.com/wp-content/uploads/sites/3/2018/04/buhos-3-1-e1524982482932-1024x535.jpg",
        caption: "Owl performing head bobbing motion",
      },
      {
        url: "https://www.muyinteresante.com/wp-content/uploads/sites/5/2022/10/12/6345ecf872c9a-schema.jpeg",
        caption: "Owl performing head bobbing motion",
      },
      {
        url: "https://guiadeaves.com/wp-content/uploads/2023/11/Como-Cazan-Los-Buhos-768x439.jpg",
        caption: "Owl performing head bobbing motion",
      },
    ],
    author: {
      id: "3",
      name: "Elena Papadopoulos",
      avatar:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iI0ZGQjRCNyIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RVA8L3RleHQ+PC9zdmc+",
      bio: {
        en: "Classicist and ornithologist",
        es: "Especialista en clásicas y ornitología",
        pt: "Especialista em clássicas e ornitologia",
      },
    },
    rating: 4.5,
    readingTime: 8,
    likes: 195,
    categories: [
      {
        id: "behavior",
        name: {
          en: "Behavior",
          es: "Comportamiento",
          pt: "Comportamento",
        },
      },
    ],
    publishDate: new Date("2023-08-05"),
    scientificNames: [],
  },
  {
    id: "5",
    slug: "nocturnal-hunting-strategies",
    title: {
      en: "Nocturnal Hunting Strategies of Owls",
      es: "Estrategias Nocturnas de Caza de los Búhos",
      pt: "Estratégias Noturnas de Caça das Corujas",
    },
    excerpt: {
      en: "How owls have evolved extraordinary adaptations to become masters of nighttime hunting.",
      es: "Cómo los búhos han desarrollado adaptaciones extraordinarias para convertirse en maestros de la caza nocturna.",
      pt: "Como as corujas desenvolveram adaptações extraordinárias para se tornarem mestras da caça noturna.",
    },
    content: `# Masters of the Night

  Owls dominate the nocturnal hunting niche through a combination of specialized adaptations:

  ## Sensory Adaptations

  1. **Vision**:
     - Tubular eyes with many rod cells
     - Tapetum lucidum (reflective layer) enhances light
     - Can detect prey in light levels 100x lower than humans

  2. **Hearing**:
     - Asymmetrical ear placement (in some species)
     - Facial disc channels sound
     - Can locate prey by sound alone

  ## Hunting Techniques

  - **Still-hunting**: Perch and wait
  - **Quartering**: Low flight over open ground
  - **Hover-hunting**: Kestrel-like hovering
  - **Stooping**: High-speed dive

  ## Prey Capture

  Talons can exert 300+ psi pressure (comparable to a German Shepherd's bite)`,
    featuredImage:
      "https://guiadeaves.com/wp-content/uploads/2023/11/Como-Duermen-Los-Buhos.jpg",
    images: [
      {
        url: "https://www.elespectador.com/resizer/v2/SIQSYUIB4NDXDLDA7E645TKMDQ.jpg?auth=4104222739634507f71507a5b82f05414e87dc06ae199810d744a2c45f6ef3dd&width=920&height=613&smart=true&quality=60",
        caption: "Tawny Owl capturing prey at night",
      },
      {
        url: "https://www.vertebradosibericos.org/aves/trofico/bubbubtr4.jpg",
        caption: "Tawny Owl capturing prey at night",
      },
      {
        url: "https://guiadeaves.com/wp-content/uploads/2023/11/Como-Duermen-Los-Buhos.jpg",
        caption: "Owl eyeshine demonstrating tapetum lucidum",
      },
    ],
    author: {
      id: "4",
      name: "David Wilson",
      avatar:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzVBODhDNyIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RFA8L3RleHQ+PC9zdmc+",
      bio: {
        en: "Nocturnal animal behaviorist",
        es: "Especialista en comportamiento animal nocturno",
        pt: "Especialista em comportamento animal noturno",
      },
    },
    rating: 4.9,
    readingTime: 9,
    likes: 230,
    categories: [
      {
        id: "behavior",
        name: {
          en: "Behavior",
          es: "Comportamiento",
          pt: "Comportamento",
        },
      },
    ],
    publishDate: new Date("2023-09-18"),
    scientificNames: [],
  },
  {
    id: "6",
    slug: "silent-flight-feathers",
    title: {
      en: "The Science Behind Owls' Silent Flight",
      es: "La Ciencia Detrás del Vuelo Silencioso de los Búhos",
      pt: "A Ciência Por Trás do Voo Silencioso das Corujas",
    },
    excerpt: {
      en: "How owl feathers have evolved unique structures that allow them to hunt without making a sound.",
      es: "Cómo las plumas de los búhos han desarrollado estructuras únicas que les permiten cazar sin hacer ruido.",
      pt: "Como as penas das corujas desenvolveram estruturas únicas que lhes permitem caçar sem fazer ruído.",
    },
    content: `# Nature's Stealth Technology

  Owls are the silent hunters of the night, thanks to extraordinary feather adaptations:

  ## Feather Structure

  1. **Leading Edge**:
     - Comb-like serrations break up turbulent air
     - Reduces noise at frequencies above 2 kHz (prey can hear)

  2. **Trailing Edge**:
     - Flexible fringe dissipates remaining sound
     - Similar principle to noise-reducing turbine blades

  3. **Surface Texture**:
     - Velvety micro-structure absorbs sound
     - Unlike the smooth surfaces of other birds

  ## Aerodynamic Advantages

  - Maintains 80% aerodynamic efficiency despite modifications
  - Allows slower flight speeds for precise hunting
  - Enables last-minute course corrections without noise

  ## Biomimicry Applications

  Engineers are studying owl feathers to develop:
  - Quieter wind turbines
  - Stealth aircraft technology
  - Silent drone propulsion systems`,
    featuredImage:
      "https://newsweekespanol.com/wp-content/uploads/2024/01/Aleteo-buhos.webp",
    images: [
      {
        url: "https://newsweekespanol.com/wp-content/uploads/2024/01/Aleteo-buhos.webp",
        caption: "Close-up of Great Grey Owl wing feathers",
      },
      {
        url: "https://services.meteored.com/img/article/por-que-los-buhos-no-hacen-ruido-cuando-vuelan-los-cientificos-tienen-una-nueva-teoria-1706346893604_512.jpg",
        caption: "Microscope image showing feather serrations",
      },
    ],
    author: {
      id: "5",
      name: "Dr. Lisa Wong",
      avatar:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iI0ZGODhENyIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TFc8L3RleHQ+PC9zdmc+",
      bio: {
        en: "Avian bioacoustics researcher",
        es: "Investigadora en bioacústica aviar",
        pt: "Pesquisadora em bioacústica aviária",
      },
    },
    rating: 4.8,
    readingTime: 10,
    likes: 245,
    categories: [
      {
        id: "adaptation",
        name: {
          en: "Adaptation",
          es: "Adaptación",
          pt: "Adaptação",
        },
      },
    ],
    publishDate: new Date("2023-10-22"),
    scientificNames: [],
  },
  {
    id: "7",
    slug: "owl-night-vision",
    title: {
      en: "Owl Night Vision: Seeing in the Dark",
      es: "Visión Nocturna de los Búhos: Viendo en la Oscuridad",
      pt: "Visão Noturna das Corujas: Enxergando no Escuro",
    },
    excerpt: {
      en: "The remarkable anatomical and neurological adaptations that give owls unparalleled night vision.",
      es: "Las extraordinarias adaptaciones anatómicas y neurológicas que dan a los búhos una visión nocturna sin igual.",
      pt: "As extraordinárias adaptações anatômicas e neurológicas que dão às corujas uma visão noturna sem igual.",
    },
    content: `# Eyes Like Telescopes

  Owls possess visual capabilities that put night vision goggles to shame:

  ## Eye Structure

  1. **Size**:
     - Owl eyes are tubular rather than spherical
     - Take up to 5% of body weight (human eyes: 0.0003%)

  2. **Retina Composition**:
     - High density of rod cells (100,000/mm² vs human 20,000/mm²)
     - Fewer cone cells mean limited color vision

  3. **Pupil Adaptation**:
     - Can dilate enormously to gather light
     - Special muscles control pupil size precisely

  ## Neurological Processing

  - Visual cortex occupies 30% of brain (vs 8% in humans)
  - Enhanced motion detection in low light
  - Can detect prey movements at 0.0000001 lux (moonless night)

  ## Limitations

  - Cannot move eyes in sockets (must turn head)
  - Near-sighted (close objects blurry)
  - Limited color perception (mainly blues and greens)`,
    featuredImage:
      "https://images.unsplash.com/photo-1736148662656-83a390775f32?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      {
        url: "https://images.unsplash.com/photo-1736148662656-83a390775f32?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Close-up of Eurasian Eagle Owl eyes",
      },
      {
        url: "https://www.shutterstock.com/shutterstock/videos/20130988/thumb/8.jpg?ip=x480",
        caption: "Diagram comparing owl and human eye structures",
      },
    ],
    author: {
      id: "5",
      name: "Dr. Lisa Wong",
      avatar:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iI0ZGODhENyIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TFc8L3RleHQ+PC9zdmc+",
      bio: {
        en: "Avian bioacoustics researcher",
        es: "Investigadora en bioacústica aviar",
        pt: "Pesquisadora em bioacústica aviária",
      },
    },
    rating: 4.7,
    readingTime: 8,
    likes: 198,
    categories: [
      {
        id: "adaptation",
        name: {
          en: "Adaptation",
          es: "Adaptación",
          pt: "Adaptação",
        },
      },
    ],
    publishDate: new Date("2023-11-15"),
    scientificNames: [],
  },
  {
    id: '10',
    slug: 'owls-greek-roman-mythology',
    title: {
      en: 'Owls in Greek and Roman Mythology',
      es: 'Búhos en la Mitología Griega y Romana',
      pt: 'Corujas na Mitologia Grega e Romana'
    },
    excerpt: {
      en: 'The sacred role of owls in ancient Mediterranean cultures and their enduring symbolic legacy.',
      es: 'El papel sagrado de los búhos en las culturas mediterráneas antiguas y su legado simbólico perdurable.',
      pt: 'O papel sagrado das corujas nas culturas antigas do Mediterrâneo e seu legado simbólico duradouro.'
    },
    content: `# Athena's Sacred Bird

  The owl held profound significance in classical antiquity:

  ## Greek Mythology

  - **Athena's Companion**: The Little Owl (*Athene noctua*) was sacred to Athena, goddess of wisdom
  - **Omens**: An owl flying over Greek soldiers meant victory
  - **Coinage**: The Athenian tetradrachm featured an owl (5th century BCE)

  ## Roman Adaptations

  - **Minerva's Symbol**: Adopted Athena's association
  - **Prophecy**: Owl calls could predict deaths of emperors
  - **Dual Meaning**: Both wisdom and ill omen

  ## Modern Legacy

  - Still used in academic symbolism
  - Featured on Greek euro coins
  - Continues as wisdom symbol in Western culture`,
    featuredImage: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3WGX51NZbJ4azmlNt8ocqFExsLOL89gzypbnK_hfEmYxTOOVrhF8Rexss-PqOcrXeN4qO7aRf_MP9QGFmlX5j2GdhdGWrjPTuKvLVAiVTKZ9LXdSXyJxxBTQKna-1LwjV7fO28w3uriQi/s640/estrige+-+unka.jpg',
    images: [
      {
        url: 'https://especiesdebuhos.com/wp-content/uploads/owl-in-greek-ruins-15.webp',
        caption: 'Ancient Greek statue of Athena with owl'
      },
      {
        url: 'https://especiesdebuhos.com/wp-content/uploads/noche-magica-en-grecia-29.webp',
        caption: 'Athenian tetradrachm coin with owl design'
      }
    ],
    author: {
      id: "5",
      name: "Dr. Lisa Wong",
      avatar:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iI0ZGODhENyIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TFc8L3RleHQ+PC9zdmc+",
      bio: {
        en: "Avian bioacoustics researcher",
        es: "Investigadora en bioacústica aviar",
        pt: "Pesquisadora em bioacústica aviária",
      },
    },
    rating: 4.8,
    readingTime: 6,
    likes: 176,
    categories: [{
      id: "mythology",
      name: {
        en: "Mythology",
        es: "Mitología",
        pt: "Mitologia",
      },
    }],
    publishDate: new Date('2024-02-14'),
    scientificNames: ['Athene noctua']
  },
];
