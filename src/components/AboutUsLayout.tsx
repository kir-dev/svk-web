import { allRoutes } from '~/utils/routes'

import { Footer } from './Footer'
import { NavbarSitewide } from './navbar/NavbarSitewide'
import { Picture } from '~/lib/sanity.types'
import { getAboutUsBackground } from '~/lib/queries/picture.queries'
import { getClient } from '~/lib/sanity.client'
import { BackgroundFeatures } from "~/components/BackgroundFeatures";
import BackgroundBanner from "~/components/decoration-components/BackgroundBanner";


export default async function AboutUsLayout(
  { children },
) {

  const client = getClient()
  const bg: Picture = await getAboutUsBackground(client)

  return (
    <div className="z-20 relative">
      <NavbarSitewide routes={allRoutes} />

      <BackgroundBanner bg={bg} />

      <div className="d-flex flex-col bg-svk_blue z-10 relative overflow-hidden" style={{clipPath: "inset(0 0 -1px 0)"}}>
        <BackgroundFeatures/>
        <div className="relative z-10">
          {children}
        </div>
      </div>

      <Footer routes={allRoutes} />
    </div>
  )
}
