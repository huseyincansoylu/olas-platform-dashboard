import { NextResponse } from 'next/server'

export async function GET() {
  const agents = [
    {
      id: 'agent-1-uuid',
      name: 'Agent 1',
      slug: 'agent-1',
      status: 'ACTIVE',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z',
    },
    {
      id: 'agent-2-uuid',
      name: 'Agent 2',
      slug: 'agent-2',
      status: 'INACTIVE',
      createdAt: '2024-01-03T00:00:00.000Z',
      updatedAt: '2024-01-04T00:00:00.000Z',
    },
  ]

  return NextResponse.json(agents)
}
