'use client'
import { DataTable } from '@/components/data-table'
import React from 'react'
import { columns } from './column'
import { baseurl } from '@/lib/baseUrl'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

async function getAgentHistories(token: string, agentId: string) {
  const res = await fetch(`${baseurl}/api/agents/${agentId}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.json()
}

export default function History() {
  const token = localStorage.getItem('token')

  const { agentId } = useParams<{ agentId: string }>()

  const { data, isLoading } = useQuery({
    queryKey: ['instances', agentId, token],
    queryFn: () => getAgentHistories(token!, agentId),
    enabled: !!token,
  })

  if (isLoading) return 'Loading...'

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">History List</h3>
      <DataTable data={data} columns={columns} />
    </div>
  )
}
