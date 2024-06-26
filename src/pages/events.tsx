import Layout from '~/components/Layout'
import { Text } from '@sanity/ui'
import { Button } from '@nextui-org/react'


export default function EventsPage() {
  {/*TODO az egesz*/}
  return (
    <Layout>
      <h1>
        Aktualis Esemenyek
      </h1>
      <div className="flex flex-wrap justify-center p-5 gap-5">
        <Button>Esemeny</Button>
        <Button>Esemeny</Button>
      </div>
      <h1>
        Korabbi Esemenyek
      </h1>
      <div className="flex flex-wrap justify-center p-5 gap-5">
        <Button>Esemeny</Button>
        <Button>Esemeny</Button>
      </div>
    </Layout>
  )
}