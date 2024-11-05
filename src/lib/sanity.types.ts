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
  position?: string
  description?: string
  linkedIn?: string
  picture?: ImageAsset
  linkedInQr?: ImageAsset
}

export interface Lecturer {
  _type: 'lecturer'
  _id: string
  name: string
  title?: string
  image?: ImageAsset
}

export interface EventPreview {
  _type: 'event'
  _id: string
  title: string
  slug: Slug
  datetime?: DateTime
  image?: ImageAsset
}

export interface EventSummary extends EventPreview {
  description?: string
  spotLink?: string
  externalLink?: string
  exportLink?: string
}

export interface EventFull extends EventSummary {
  location?: string
  host?: string
  lecturer?: Lecturer
}

export interface Picture {
  _type: 'pictures'
  _id: string
  title: string
  image: ImageAsset
}
