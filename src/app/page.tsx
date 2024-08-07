import { DataTable } from '@/components/data-table'
import { instanceColumns, suitesColumns } from './columns'
import SeeAllNav from './see-all-nav'
import { baseurl } from '@/lib/baseUrl'

async function getProjectFSMSuites() {
  const res = await fetch(
    `${baseurl}/api/projects/402b322b-5d92-45c4-ab61-5729ecb9723c/fsmsuites`
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getProjectFSMSuites()

  console.log(data[0].fsms)

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="mb-4 text-xl font-semibold">{data[0].name}</h1>
          <SeeAllNav />
        </div>

        <h3 className="mb-4 text-lg font-semibold mt-10">Fsms List</h3>
        <DataTable data={data[0].fsms} columns={suitesColumns} />
        <h3 className="mb-4 text-lg font-semibold mt-10">Instance List</h3>
        <DataTable data={data[0].instances} columns={instanceColumns} />
      </div>
    </>
  )
}
