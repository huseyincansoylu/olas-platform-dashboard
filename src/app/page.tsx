'use client'
import { DataTable } from '@/components/data-table'
import { instanceColumns, suitesColumns } from './columns'
import SeeAllNav from './see-all-nav'
import { baseurl } from '@/lib/baseUrl'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useAccount } from 'wagmi'

async function getProjectFSMSuites(token: string, projectId: string) {
  const res = await fetch(`${baseurl}/api/projects/${projectId}/fsmsuites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.json()
}

export default function Home() {
  const searchParams = useSearchParams()
  const { address } = useAccount()

  const projectId = searchParams.get('sp')

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const { data, isLoading, isError } = useQuery({
    queryKey: ['fsmsuites', projectId, token],
    queryFn: () => getProjectFSMSuites(token!, projectId!),
    enabled: !!token && !!projectId,
  })

  if (!address) return 'Please login for the dashboard'

  if (isLoading) return 'Loading...'

  if (isError) return 'Failed to load data'

  if (!data || data.length === 0 || !data[0]) {
    return 'No data available'
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="mb-4 text-xl font-semibold">
            {data[0].name || 'No Name'}
          </h1>
          <SeeAllNav />
        </div>

        <h3 className="mb-4 text-lg font-semibold mt-10">Fsms List</h3>
        <DataTable data={data[0].fsms || []} columns={suitesColumns} />
        <h3 className="mb-4 text-lg font-semibold mt-10">Instance List</h3>
        <DataTable data={data[0].instances || []} columns={instanceColumns} />
      </div>
    </>
  )
}
