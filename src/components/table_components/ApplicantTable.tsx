import React from 'react'
import { Applicant } from '~/lib/sanity.types'

interface Props {
  applicants: Applicant[]
}

export const ApplicantTable = ({ applicants }: Props) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((applicant, index) => (
          <tr
            key={applicant.name}
            className="transition-all border-slate-400 border-b-2 hover:text-white hover:bg-slate-400"
          >
            <td className="px-4">{index + 1}</td>
            <td className="px-4">{applicant.name}</td>
            <td className="px-4">{applicant.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
