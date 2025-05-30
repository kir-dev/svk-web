import { ImageAsset, Slug } from 'sanity'
import { DateTime } from 'groq-js'

export interface Partner {
  _type: 'partner'
  _id: string
  name?: string
  link?: string
  image?: ImageAsset
}

export interface Member {
  _type: 'member'
  _id: string
  name: string
  slug: Slug
  position?: string
  description?: string
  picture?: ImageAsset
}

export interface EventPreview {
  _type: 'event'
  _id: string
  slug: Slug
  image?: ImageAsset
  externalLink?: string
}

export interface EventSummary extends EventPreview {
  title: string
  isActive?: boolean
  datetime?: DateTime
  description?: string
  spotLink?: string
  exportLink?: string
}

export interface EventFull extends EventSummary {
  location?: string
  lecturer?: string
}

export interface Picture {
  _type: 'picture'
  _id: string
  title: string
  image: ImageAsset
}
