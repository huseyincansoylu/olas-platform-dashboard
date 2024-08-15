'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DataTable } from '@/components/data-table'
import { baseurl } from '@/lib/baseUrl'
import { useProjectContext } from './_context/ProjectContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const columns = [
  { accessorKey: 'instanceName', header: 'Instance Name' },
  { accessorKey: 'agentName', header: 'Agent Name' },
  { accessorKey: '', header: 'Status' },
  { accessorKey: '', header: 'Wallet Address' },
  { accessorKey: '', header: 'Transactions' },
  { accessorKey: 'startTime', header: 'Start Time' },
  { accessorKey: 'endTime', header: 'End Time' },
]

async function getProjectFSMSuites(token: string, projectId: string) {
  const response = await fetch(
    `${baseurl}/api/projects/${projectId}/fsmsuites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch FSM Suites')
  }

  return response.json()
}

async function getAgentHistories(token: string, fsmId: string) {
  const response = await fetch(
    `${baseurl}/api/fsmsuites/${fsmId}/agents/history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Agent Histories')
  }

  return response.json()
}

export default function Home() {
  const { selectedProjectId } = useProjectContext()
  const { address } = useAccount()

  const [selectedOption, setSelectedOption] = useState<string>('')

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const {
    data: fsmSuites,
    isLoading: fsmLoading,
    isError: fsmError,
  } = useQuery({
    queryKey: ['fsmsuites', selectedProjectId, token],
    queryFn: () => getProjectFSMSuites(token!, selectedProjectId!),
    enabled: !!token && !!selectedProjectId,
  })

  const {
    data: historyData,
    isLoading: historyLoading,
    isError: historyError,
  } = useQuery({
    queryKey: ['instances', selectedOption, token],
    queryFn: () => getAgentHistories(token!, selectedOption),
    enabled: !!token && !!selectedOption,
  })

  useEffect(() => {
    if (fsmSuites && Array.isArray(fsmSuites) && fsmSuites.length > 0) {
      setSelectedOption(fsmSuites[0].id)
    }
  }, [fsmSuites])

  if (!address) return 'Please login for the dashboard'
  if (fsmLoading) return 'Loading FSM Suites...'
  if (fsmError) return 'Failed to load FSM Suites'
  if (!fsmSuites || !Array.isArray(fsmSuites) || fsmSuites.length === 0) {
    return 'No FSM Suites available'
  }

  const selectedData = fsmSuites.find((item: any) => item.id === selectedOption)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2 items-center">
          <h2>Select FSM Suite: </h2>
          <Select
            onValueChange={(value) => setSelectedOption(value)}
            value={selectedOption}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select FSM Suite" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>FSM Suites</SelectLabel>
                {fsmSuites.map((suite: any) => (
                  <SelectItem key={suite.id} value={suite.id}>
                    {suite.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="instances">
        <TabsList>
          <TabsTrigger value="instances">Instances</TabsTrigger>
          <TabsTrigger value="fsms">Fsms</TabsTrigger>
        </TabsList>

        <TabsContent value="fsms">
          {selectedData && selectedData.fsms && (
            <>
              <h3 className="mb-4 text-lg font-semibold mt-5">Fsms</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedData.fsms.map((fsm: any) => (
                  <Card key={fsm.id}>
                    <CardHeader>
                      <CardTitle>{fsm.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{fsm.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="instances">
          <h3 className="mb-4 text-lg font-semibold mt-5">Instance Lists</h3>
          {historyLoading ? (
            'Loading History...'
          ) : historyError ? (
            'Failed to load Agent Histories'
          ) : historyData &&
            Array.isArray(historyData) &&
            historyData.length > 0 ? (
            <DataTable data={historyData} columns={columns} />
          ) : (
            'No history data available'
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
