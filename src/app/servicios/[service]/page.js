import ClientService from "./ClientService"

export default function Page({ params }) {
  const { service } = params
  return <ClientService service={service} />
}


