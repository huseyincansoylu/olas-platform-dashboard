import { DataTable } from '@/components/data-table'
import React from 'react'

export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'startTime',
    header: 'Start',
  },
  {
    accessorKey: 'endTime',
    header: 'End',
  },
  {
    accessorKey: 'agentName',
    header: 'Agent Name',
  },
  {
    accessorKey: 'numberOfRounds',
    header: 'Number of rounds',
  },
  {
    accessorKey: 'timeRan',
    header: 'Time ran',
  },
]

const mockHistory = [
  {
    id: 1,
    startTime: '2024-07-01T00:00:00Z',
    endTime: '2024-07-01T01:00:00Z',
    timeRan: 4,
    numberOfRounds: 10,
    agentName: 'Agent 1',
  },
  {
    id: 2,
    startTime: '2024-07-02T00:00:00Z',
    endTime: '2024-07-02T01:30:00Z',
    timeRan: 5,
    numberOfRounds: 15,
    agentName: 'Agent 2',
  },
  {
    id: 3,
    startTime: '2024-07-03T00:00:00Z',
    endTime: '2024-07-03T00:45:00Z',
    timeRan: 22,
    numberOfRounds: 8,
    agentName: 'Agent 3',
  },
  {
    id: 4,
    startTime: '2024-07-04T00:00:00Z',
    endTime: '2024-07-04T01:15:00Z',
    timeRan: 8,
    numberOfRounds: 12,
    agentName: 'Agent 4',
  },
]

const History = () => {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">All History List</h3>
      <DataTable data={mockHistory} columns={columns} />
    </div>
  )
}

export default History
