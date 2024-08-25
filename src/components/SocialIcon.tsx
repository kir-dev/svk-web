import { Button, Link } from '@nextui-org/react'
import { SVGProps } from 'react'


interface SocialIcon {
  key: string
  href: string
  icon: React.FC<SVGProps<SVGSVGElement>>
}

export default function SocialIcon({key, href, icon}) {

  const item : SocialIcon = { key, href, icon }

  return(
  <Button
    key={key}
    isIconOnly
    className="p-0 bg-transparent data-[hover=true]:bg-transparent h-10 w-10"
  >
    <Link
      href={href}
      target="_blank"
      className="h-full w-full text-foreground"
    >
      <item.icon className="h-full w-auto fill-current" />
    </Link>
  </Button>
  )
}