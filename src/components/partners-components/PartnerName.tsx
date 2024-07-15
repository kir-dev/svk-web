interface Props {
  name: string | undefined
}

export const PartnerName = ({ name }: Props) => {
  return <div>{!name && <h1>{name}</h1>}</div>
}
