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
  firstName: string
  lastName: string
  slug: Slug
  position?: string
  englishPosition?: string
  description?: string
  englishDescription?: string
  picture?: ImageAsset
  linkedIn?: string
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
  englishTitle?: string
  isActive: EventActivitySate
  datetime?: DateTime
  description?: string
  englishDescription?: string
  spotLink?: string
  exportLink?: string
}

export interface EventFull extends EventSummary {
  location?: string
  lecturer?: string
  englishLecturer?: string
}

export interface Picture {
  _type: 'picture'
  _id: string
  title: string
  image: ImageAsset
}

export enum EventActivitySate {
  active = 'active',
  inactive = 'inactive',
  dateDependent = 'dateDependent',
}
