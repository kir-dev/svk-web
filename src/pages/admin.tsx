import Layout from '~/components/Layout'
import { getClient } from '~/lib/sanity.client'
import type { InferGetStaticPropsType } from 'next'
import { Applicant, EventTitleAndID } from '~/lib/sanity.types'
import { getEventTitles } from '~/lib/queries'
import React, { useEffect, useState } from 'react'
import { handleGetApplicantsForEvent } from '~/lib/queries/getApplicantsForEvent'
import { ApplicantTable } from '~/components/table_components/ApplicantTable'
import { useRouter } from 'next/router'
import { getAuthSchUrl } from '~/lib/queries/getAuthSchUrl'
import { Button } from '@nextui-org/react'

export const getStaticProps = async ({ locale }) => {
  const client = getClient()
  const eventTitles: EventTitleAndID[] = await getEventTitles(client)
  return {
    props: {
      eventTitles: eventTitles,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default function AboutUsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const eventTitles = props.eventTitles
  const router = useRouter()

  async function login() {
    const url = await getAuthSchUrl()
    router.push(url)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const authCode = urlParams.get('code')

    //!!!
    if (authCode) {
      setLoggedIn(true)
    }
  }, [])

  const getApplicants = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEventID = event.target.value
    const fetchedApplicants = await handleGetApplicantsForEvent(selectedEventID)
    if (fetchedApplicants) {
      setApplicants(fetchedApplicants)
    }
  }

  if (!loggedIn) {
    return (
      <div className="text-center pt-20">
        <h1 className="text-3xl mb-10">Admin page login</h1>
        <h1 className="text-3xl">|</h1>
        <h1 className="text-3xl mb-10">V</h1>
        <Button className="text-lg" onClick={() => login()}>
          Login
        </Button>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className="text-5xl text-center my-16">Admin page</h1>

      <div className="w-fit mx-auto bg-white text-slate-700 p-16 rounded-lg">
        <select
          className={
            'shadow rounded w-full py-2 px-3 text-gray-700 border-2 bg-white mb-8'
          }
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            getApplicants(event)
          }
        >
          <option value={'incorrectValue'} selected={true} disabled hidden>
            Válassz eseményt
          </option>
          {eventTitles.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
        {applicants.length > 0 ? (
          <ApplicantTable applicants={applicants} />
        ) : (
          <h1>Select event</h1>
        )}
      </div>
    </Layout>
  )
}
