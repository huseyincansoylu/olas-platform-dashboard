'use client'
import { DataTable } from '@/components/data-table'
import React from 'react'
import { columns } from './columns'
import { baseurl } from '@/lib/baseUrl'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

async function getInstanceAgents(token: string, instanceId: string) {
  const res = await fetch(`${baseurl}/api/instances/${instanceId}/agents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.json()
}

export default function Agent() {
  const token = localStorage.getItem('token')

  const { instanceId } = useParams<{ instanceId: string }>()

  const { data, isLoading } = useQuery({
    queryKey: ['instances', instanceId, token],
    queryFn: () => getInstanceAgents(token!, instanceId),
    enabled: !!token,
  })

  if (isLoading) return 'Loading...'

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Agent List</h3>
      <DataTable data={data} columns={columns} />
    </div>
  )
}
