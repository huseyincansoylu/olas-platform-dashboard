'use client'

import { DataTable } from '@/components/data-table'
import { columns } from '../columns'

export const data = [
  {
    id: 1,
    txHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    createdAt: '2024-07-24T08:30:00Z',
  },
  {
    id: 2,
    txHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
    createdAt: '2024-07-24T08:45:00Z',
  },
  {
    id: 3,
    txHash: '0x3c4d5e6f7890abcdef1234567890abcdef123456',
    createdAt: '2024-07-24T09:00:00Z',
  },
  {
    id: 4,
    txHash: '0x4d5e6f7890abcdef1234567890abcdef12345678',
    createdAt: '2024-07-24T09:15:00Z',
  },
  {
    id: 5,
    txHash: '0x5e6f7890abcdef1234567890abcdef1234567890',
    createdAt: '2024-07-24T09:30:00Z',
  },
  {
    id: 6,
    txHash: '0x6f7890abcdef1234567890abcdef1234567890ab',
    createdAt: '2024-07-24T09:45:00Z',
  },
  {
    id: 7,
    txHash: '0x7890abcdef1234567890abcdef1234567890abcd',
    createdAt: '2024-07-24T10:00:00Z',
  },
  {
    id: 8,
    txHash: '0x890abcdef1234567890abcdef1234567890abcde',
    createdAt: '2024-07-24T10:15:00Z',
  },
]

const Transactions = () => {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Recent Transactions</h3>
      <DataTable data={data} columns={columns} />
    </div>
  )
}

export default Transactions
