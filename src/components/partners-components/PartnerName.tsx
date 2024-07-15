interface Props {
  name: string | undefined
}

export const PartnerName = ({ name }: Props) => {
  return (
    <div className="px-4">
      {<h1 className="text-2xl text-center">{name}</h1>}
    </div>
  )
}
