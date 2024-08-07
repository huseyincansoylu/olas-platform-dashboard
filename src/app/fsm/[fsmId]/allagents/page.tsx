import { DataTable } from '@/components/data-table'
import React from 'react'

export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'instanceName',
    header: 'Instance Name',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'startTime',
    header: 'Start time',
  },
]

const mockAgentsList = [
  {
    id: 1,
    name: 'Agent 1',
    slug: 'agent-1',
    status: 'running',
    numberOfRounds: 10,
    startTime: '2024-07-01T08:00:00Z',
    instanceName: 'Instance A1', // Added instance name
  },
  {
    id: 2,
    name: 'Agent 2',
    slug: 'agent-2',
    status: 'stopped',
    numberOfRounds: 5,
    startTime: '2024-07-02T09:00:00Z',
    instanceName: 'Instance A1', // Added instance name
  },
  {
    id: 3,
    name: 'Agent 3',
    slug: 'agent-3',
    status: 'running',
    numberOfRounds: 8,
    startTime: '2024-07-03T10:00:00Z',
    instanceName: 'Instance A2', // Added instance name
  },
  {
    id: 4,
    name: 'Agent 4',
    slug: 'agent-4',
    status: 'stopped',
    numberOfRounds: 12,
    startTime: '2024-07-04T11:00:00Z',
    instanceName: 'Instance B1', // Added instance name
  },
  {
    id: 5,
    name: 'Agent 5',
    slug: 'agent-5',
    status: 'running',
    numberOfRounds: 7,
    startTime: '2024-07-05T12:00:00Z',
    instanceName: 'Instance C1', // Added instance name
  },
  {
    id: 6,
    name: 'Agent 6',
    slug: 'agent-6',
    status: 'stopped',
    numberOfRounds: 6,
    startTime: '2024-07-06T13:00:00Z',
    instanceName: 'Instance D1', // Added instance name
  },
]

const AllAgents = () => {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">All Agent List</h3>
      <DataTable data={mockAgentsList} columns={columns} />
    </div>
  )
}

export default AllAgents
