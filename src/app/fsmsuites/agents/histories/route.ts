import { NextResponse } from 'next/server'

export async function GET() {
  const histories = [
    {
      id: 'history-1-uuid',
      startTime: '2024-01-01T00:00:00.000Z',
      endTime: '2024-01-01T01:00:00.000Z',
      timeRan: 3600,
      numberOfRounds: 10,
      agentId: 'agent-uuid',
      agentName: 'Agent 1',
      instanceId: 'instance-uuid',
      instanceName: 'Instance 1',
    },
    {
      id: 'history-2-uuid',
      startTime: '2024-01-02T00:00:00.000Z',
      endTime: '2024-01-02T01:30:00.000Z',
      timeRan: 5400,
      numberOfRounds: 15,
      agentId: 'agent-uuid',
      agentName: 'Agent 1',
      instanceId: 'instance-uuid',
      instanceName: 'Instance 1',
    },
  ]

  return NextResponse.json(histories)
}
