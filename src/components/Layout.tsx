import { allRoutes } from '~/utils/routes'

import { Footer } from './Footer'
import { NavbarSitewide } from './navbar/NavbarSitewide'
import { Wave } from '~/components/decoration-components/Wave'



export default function Layout({ children }) {
  return (
    <div className="d-flex flex-col min-h-screen bg-[#111827] relative">
      {/*<Wave top={-70} left={-75} rotate={84} />*/}
      <Wave top={-70} left={-125} rotate={84} />
      <Wave top={-40} left={25} rotate={84} />


      <div className="z-10 relative">
        <NavbarSitewide routes={allRoutes} />
        {children}
        <Footer routes={allRoutes} />
      </div>

    </div>
  )
}
