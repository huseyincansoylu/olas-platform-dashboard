import { NextResponse } from 'next/server'

export async function GET() {
  const data = [
    {
      id: 'suite-1-uuid',
      name: 'FSM Suite 1',
      slug: 'fsm-suite-1',
      description: 'Description for FSM Suite 1',
      projectId: 'project-uuid',
      fsms: [
        {
          id: 'fsm-1-uuid',
          name: 'FSM 1',
          slug: 'fsm-1',
          description: 'Description for FSM 1',
          fsmsuiteId: 'suite-1-uuid',
        },
        {
          id: 'fsm-2-uuid',
          name: 'FSM 2',
          slug: 'fsm-2',
          description: 'Description for FSM 2',
          fsmsuiteId: 'suite-1-uuid',
        },
      ],
      instances: [
        {
          id: 'instance-1-uuid',
          name: 'Instance 1',
          slug: 'instance-1',
          status: 'ACTIVE',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z',
        },
        {
          id: 'instance-2-uuid',
          name: 'Instance 2',
          slug: 'instance-2',
          status: 'INACTIVE',
          createdAt: '2024-01-03T00:00:00.000Z',
          updatedAt: '2024-01-04T00:00:00.000Z',
        },
      ],
    },
    {
      id: 'suite-2-uuid',
      name: 'FSM Suite 2',
      slug: 'fsm-suite-2',
      description: 'Description for FSM Suite 2',
      projectId: 'project-uuid',
      fsms: [
        {
          id: 'fsm-3-uuid',
          name: 'FSM 3',
          slug: 'fsm-3',
          description: 'Description for FSM 3',
          fsmsuiteId: 'suite-2-uuid',
        },
        {
          id: 'fsm-4-uuid',
          name: 'FSM 4',
          slug: 'fsm-4',
          description: 'Description for FSM 4',
          fsmsuiteId: 'suite-2-uuid',
        },
      ],
      instances: [
        {
          id: 'instance-3-uuid',
          name: 'Instance 3',
          slug: 'instance-3',
          status: 'ACTIVE',
          createdAt: '2024-01-05T00:00:00.000Z',
          updatedAt: '2024-01-06T00:00:00.000Z',
        },
        {
          id: 'instance-4-uuid',
          name: 'Instance 4',
          slug: 'instance-4',
          status: 'INACTIVE',
          createdAt: '2024-01-07T00:00:00.000Z',
          updatedAt: '2024-01-08T00:00:00.000Z',
        },
      ],
    },
  ]

  return NextResponse.json(data)
}
