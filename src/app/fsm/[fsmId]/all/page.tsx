'use client'
import { DataTable } from '@/components/data-table'
import React from 'react'

import { baseurl } from '@/lib/baseUrl'
import { columns } from './columns'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

async function getAgentHistories(token: string, fsmId: string) {
  const res = await fetch(`${baseurl}/api/fsmsuites/${fsmId}/agents/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.json()
}

export default function Agent() {
  const token = localStorage.getItem('token')

  const { fsmId } = useParams<{ fsmId: string }>()

  const { data, isLoading } = useQuery({
    queryKey: ['instances', fsmId, token],
    queryFn: () => getAgentHistories(token!, fsmId),
    enabled: !!token,
  })

  if (isLoading) return 'Loading...'

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">All History</h3>
      <DataTable data={data} columns={columns} />
    </div>
  )
}
