import { DataTable } from '@/components/data-table'
import React from 'react'
import { columns } from './column'

async function getAgentHistories() {
  const res = await fetch('http://localhost:3000/fsmsuites/agents/histories')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function History() {
  const data = await getAgentHistories()

  console.log(data)

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">History List</h3>
      <DataTable data={data} columns={columns} />
    </div>
  )
}
