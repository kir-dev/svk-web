import { allRoutes } from '~/utils/routes'

import { Footer } from './Footer'
import { NavbarSitewide } from './navbar/NavbarSitewide'
import { BackgroundFeatures } from "~/components/BackgroundFeatures";

export default function Layout({ children }) {
  return (
      <div className="d-flex flex-col min-h-screen bg-svk_blue z-10">
          <BackgroundFeatures />
          <div className="z-20 relative">
              <NavbarSitewide routes={allRoutes} />
              {children}
              <Footer routes={allRoutes} />
          </div>
      </div>
  )
}
