import { allRoutes } from '~/utils/routes'

import { Footer } from './Footer'
import { NavbarSitewide } from './navbar/NavbarSitewide'
import { Blur } from '~/components/decoration-components/Blur'



export default function Layout({ children }) {
  return (
    <div className="d-flex flex-col min-h-screen bg-[#111827]">

      <Blur w={20} h={20} top={50} left={-10} />
      <Blur w={15} h={15} top={0} left={80} />

      <div className="z-10 relative">
        <NavbarSitewide routes={allRoutes} />
        {children}
        <Footer routes={allRoutes} />
      </div>

    </div>
  )
}
