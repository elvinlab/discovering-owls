import type { Article, Category } from '@/types/article'

export const categories: Category[] = [
  {
    id: 'species',
    name: {
      en: 'Species',
      es: 'Especies',
      pt: 'Espécies'
    },
    icon: '🔍'
  },
  {
    id: 'behavior',
    name: {
      en: 'Behavior',
      es: 'Comportamiento',
      pt: 'Comportamento'
    },
    icon: '🦅'
  },
  {
    id: 'adaptation',
    name: {
      en: 'Adaptation',
      es: 'Adaptación',
      pt: 'Adaptação'
    },
    icon: '🌿'
  },
  {
    id: 'conservation',
    name: {
      en: 'Conservation',
      es: 'Conservación',
      pt: 'Conservação'
    },
    icon: '🌍'
  },
  {
    id: 'mythology',
    name: {
      en: 'Mythology',
      es: 'Mitología',
      pt: 'Mitologia'
    },
    icon: '📚'
  }
]

export const articles: Article[] = [
  {
    id: '1',
    slug: 'barn-owl-hunting-techniques',
    title: {
      en: 'Barn Owl Hunting Techniques',
      es: 'Técnicas de Caza del Búho Campestre',
      pt: 'Técnicas de Caça da Coruja-das-torres'
    },
    excerpt: {
      en: 'Discover the hunting mastery of the Barn Owl, a nocturnal predator with exceptional hearing abilities and silent flight technology.',
      es: 'Descubre el dominio de caza del Búho Campestre, un depredador nocturno con habilidades auditivas excepcionales y tecnología de vuelo silencioso.',
      pt: 'Descubra a maestria de caça da Coruja-das-torres, um predador noturno com habilidades auditivas excepcionais e tecnologia de voo silencioso.'
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
    featuredImage: 'https://brinzal.org/wp-content/uploads/2023/03/Lechuza.jpg',
    images: [
      {
        url: 'https://brinzal.org/wp-content/uploads/2023/03/Lechuza.jpg',
        caption: 'A Barn Owl perched on a wooden beam, showcasing its distinctive heart-shaped face'
      },
      {
        url: 'https://inaturalist-open-data.s3.amazonaws.com/photos/165796940/large.jpg',
        caption: 'Barn Owl in flight, demonstrating its silent hunting technique'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Barn_Owl%2C_Lancashire.jpg',
        caption: 'Barn Owl in flight, demonstrating its silent hunting technique'
      }
    ],
    author:  {
      id: '1',
      name: 'Jane Smith',
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzY0NzQ4QiIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SlM8L3RleHQ+PC9zdmc+',
      bio: {
        en: 'Wildlife biologist and science writer',
        es: 'Bióloga de vida silvestre y escritora científica',
        pt: 'Bióloga da vida selvagem e escritora científica'
      }
    },
    rating: 4.7,
    readingTime: 6,
    likes: 165,
    categories: [
      {
        id: 'species',
        name: {
          en: 'Species',
          es: 'Especies',
          pt: 'Espécies'
        }
      },
      {
        id: 'behavior',
        name: {
          en: 'Behavior',
          es: 'Comportamiento',
          pt: 'Comportamento'
        }
      }
    ],
    publishDate: new Date('2023-05-15'),
    scientificNames: ['Tyto alba'],

  },
  {
    id: '2',
    slug: 'snowy-owl-arctic-adaptations',
    title: {
      en: 'The Snowy Owl: Arctic Majesty',
      es: 'El Búho Nival: Majestad del Ártico',
      pt: 'A Coruja-das-neves: Majestade do Ártico'
    },
    excerpt: {
      en: 'Explore the life of the Snowy Owl, a stunning white predator perfectly adapted to the harsh Arctic tundra.',
      es: 'Explora la vida del Búho Nival, un impresionante depredador blanco perfectamente adaptado a la dura tundra ártica.',
      pt: 'Explore a vida da Coruja-das-neves, um impressionante predador branco perfeitamente adaptado à dura tundra ártica.'
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
    featuredImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Snowy_Owl_%28240866707%29.jpeg',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Snowy_Owl_%28240866707%29.jpeg',
        caption: 'Snowy Owl perched on a snow-covered rock'
      },
      {
        url: 'https://www.allaboutbirds.org/news/wp-content/uploads/2020/07/STanager_Jerry-Smith.jpg',
        caption: 'Snowy Owl in flight over tundra'
      }
    ],
    author: {
      id: '2',
      name: 'Carlos Méndez',
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzRFQkY1NSIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q008L3RleHQ+PC9zdmc+',
      bio: {
        en: 'Arctic wildlife specialist',
        es: 'Especialista en fauna ártica',
        pt: 'Especialista em vida selvagem ártica'
      }
    },
    rating: 4.8,
    readingTime: 7,
    likes: 210,
    categories: [
      {
        id: 'species',
        name: {
          en: 'Species',
          es: 'Especies',
          pt: 'Espécies'
        }
      }
    ],
    publishDate: new Date('2023-06-20'),
    scientificNames: ['Bubo scandiacus']
  }

]