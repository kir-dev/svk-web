import { allRoutes } from '~/utils/routes'

import { Footer } from './Footer'
import { NavbarSitewide } from './navbar/NavbarSitewide'
import { Blur } from '~/components/decoration-components/Blur'



export default function Layout({ children }) {
  return (
    <div className="d-flex flex-col min-h-screen bg-[#111827] z-10">
      <Blur width={20} height={20} top={50} left={-10} />
      <Blur width={15} height={15} top={0} left={80} />
      <Blur width={15} height={15} top={80} left={55} />
      <div className="z-20 relative">
        <NavbarSitewide routes={allRoutes} />
            {children}
        <Footer routes={allRoutes} />
      </div>
    </div>
  )
}
