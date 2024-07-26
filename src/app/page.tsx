'use client'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
    accessorKey: 'numTransactions',
    header: 'Number of transactions',
  },
  {
    accessorKey: 'startTime',
    header: 'Start time',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }: any) => {
      const agentId = row.original.id
      const router = useRouter()

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/transactions/${agentId}`)}
            >
              View transactions
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const mockAgentsList = [
  {
    id: 1,
    status: 'online',
    numTransactions: 23,
    startTime: '2024-07-25 08:00',
  },
  {
    id: 2,
    status: 'offline',
    numTransactions: 5,
    startTime: '2024-07-25 09:30',
  },
  {
    id: 3,
    status: 'online',
    numTransactions: 12,
    startTime: '2024-07-25 11:00',
  },
  {
    id: 4,
    status: 'offline',
    numTransactions: 7,
    startTime: '2024-07-25 12:15',
  },
  {
    id: 5,
    status: 'online',
    numTransactions: 30,
    startTime: '2024-07-25 14:45',
  },
]

export default function Home() {
  return (
    <>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Agent Lists</h3>
        <DataTable data={mockAgentsList} columns={columns} />
      </div>
    </>
  )
}
