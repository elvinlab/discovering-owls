import type { Article, Author, Category } from './types'

export const categories: Category[] = [
  {
    id: 'species',
    name: 'Species',
    icon: '🔍'
  },
  {
    id: 'behavior',
    name: 'Behavior',
    icon: '🦅'
  },
  {
    id: 'adaptation',
    name: 'Adaptation',
    icon: '🌿'
  },
  {
    id: 'conservation',
    name: 'Conservation',
    icon: '🌍'
  },
  {
    id: 'mythology',
    name: 'Mythology',
    icon: '📚'
  }
]

export const authors: Author[] = [
  {
    id: '1',
    name: 'Jane Smith',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzY0NzQ4QiIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SlM8L3RleHQ+PC9zdmc+',
    bio: 'Ornithologist specializing in nocturnal birds'
  },
  {
    id: '2',
    name: 'John Doe',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzk0QTNCOCIvPjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SkQ8L3RleHQ+PC9zdmc+',
    bio: 'Wildlife photographer and owl enthusiast'
  }
]

export const articles: Article[] = [
  {
    id: '1',
    slug: 'barn-owl-hunting-techniques',
    title: 'The Barn Owl: Silent Hunter of the Night',
    excerpt: 'Discover how barn owls use their exceptional hearing to hunt in complete darkness',
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
    featuredImage: 'https://images.unsplash.com/photo-1579591919791-0e3737ae3808?auto=format&fit=crop&w=1200',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579591919791-0e3737ae3808?auto=format&fit=crop&w=1200',
        caption: 'A Barn Owl perched on a wooden beam, showcasing its distinctive heart-shaped face'
      },
      {
        url: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=1200',
        caption: 'Barn Owl in flight, demonstrating its silent hunting technique'
      }
    ],
    author: authors[0],
    rating: 4.7,
    readingTime: 6,
    likes: 165,
    categories: [
      {
        id: 'species',
        name: 'Species'
      },
      {
        id: 'behavior',
        name: 'Behavior'
      }
    ],
    publishDate: new Date('2023-05-15'),
    scientificNames: ['Tyto alba'],

  }
]