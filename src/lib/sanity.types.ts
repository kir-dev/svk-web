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

export interface EventTitleAndID {
  _type: 'event'
  _id: string
  title: string
}

export interface EventPreview extends EventTitleAndID {
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
  _type: 'picture'
  _id: string
  title: string
  image: ImageAsset
}

export interface Applicant {
  _type: 'applicant'
  name: string
  email: string
  eventID: string
}
