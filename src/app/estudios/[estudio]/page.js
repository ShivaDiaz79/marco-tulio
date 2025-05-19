
import ClientEstudio from './ClientEstudio'

export default function Page({ params }) {
  const { estudio } = params

  return <ClientEstudio estudio={estudio} />
}
