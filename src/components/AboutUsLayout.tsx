import { allRoutes } from '~/utils/routes'

import { Footer } from './Footer'
import { NavbarSitewide } from './navbar/NavbarSitewide'
import { Blur } from '~/components/decoration-components/Blur'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'
import { Picture } from '~/lib/sanity.types'
import { getAboutUsBackground } from '~/lib/queries/picture.queries'
import { getClient } from '~/lib/sanity.client'

export default async function AboutUsLayout(
  { children },
) {

  const client = getClient()
  const bg: Picture = await getAboutUsBackground(client)

  return (
    <div className="z-20 relative">
      <NavbarSitewide routes={allRoutes} />

      <div className={`w-screen aspect-[3/2] sm:aspect-[4/2] md:aspect-[5/2] lg:aspect-[3/1] xl:aspect-[4/1] relative` }>
        <Image src={urlForImage(bg.image)?.url() ?? ''} alt={bg.title} width={0} height={0} sizes="100vw"
               className="w-screen fixed overflow-y-hidden"/>
      </div>

      <div className="d-flex flex-col bg-[#111827] z-10 relative overflow-hidden" style={{clipPath: "inset(0 0 -1px 0)"}}>
        <Blur width={20} height={20} top={50} left={-10} />
        <Blur width={15} height={15} top={0} left={80} />
        <Blur width={15} height={15} top={80} left={55} />
        <div className="relative z-10">
          {children}
        </div>
      </div>

      <Footer routes={allRoutes} />
    </div>
  )
}
