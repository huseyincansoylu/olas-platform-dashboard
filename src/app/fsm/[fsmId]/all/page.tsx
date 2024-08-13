import { DataTable } from '@/components/data-table'
import React from 'react'

import { baseurl } from '@/lib/baseUrl'
import { columns } from './columns'

async function getInstanceAgents(fsmId: string) {
  const res = await fetch(`${baseurl}/api/fsmsuites/${fsmId}/agents/history`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Agent({ params }: { params: { fsmId: string } }) {
  const data = await getInstanceAgents(params.fsmId)

  console.log(params, 'params')

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">All History</h3>
      <DataTable data={data} columns={columns} />
    </div>
  )
}
