import { allRoutes } from '~/utils/routes'

import { Footer } from './Footer'
import { NavbarSitewide } from './navbar/NavbarSitewide'
import { Blur } from '~/components/decoration-components/Blur'
import { Wave } from '~/components/decoration-components/Wave'



export default function Layout({ children }) {
  return (
    <div className="d-flex flex-col min-h-screen bg-[#111827] relative">
      {/*<Wave top={-70} left={-75} rotate={84} />*/}
      <div className="absolute overflow-x-hidden overflow-y-visible h-[2160px] w-screen">
        <Wave top={-45} left={-70} rotate={84} />
        <Wave top={-10} left={90} rotate={84} />
      </div>


      <div className="z-10 relative">
        <NavbarSitewide routes={allRoutes} />
        {children}
        <Footer routes={allRoutes} />
      </div>

    </div>
  )
}
