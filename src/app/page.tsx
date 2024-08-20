'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

import { DataTable } from '@/components/data-table'
import { baseurl } from '@/lib/baseUrl'
import { useProjectContext } from './_context/ProjectContext'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bot, Info } from 'lucide-react'

import Image from 'next/image'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const columns = [
  { accessorKey: 'instanceName', header: 'Instance Name' },
  { accessorKey: 'agentName', header: 'Agent Name' },
  { accessorKey: 'agentStatus', header: 'Status' },
  { accessorKey: 'agentWalletAddress', header: 'Wallet Address' },
  { accessorKey: '', header: 'Transactions' },
  { accessorKey: 'startTime', header: 'Start Time' },
  // { accessorKey: 'endTime', header: 'End Time' },
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
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2 items-center">
          <h2>FSM Suite: </h2>
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

      <Card className="w-[540px] mb-4 border-blue-400">
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
          <div className="space-y-1">
            <CardDescription>{selectedData?.description}</CardDescription>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link">
                <span>Fsm apps </span>{' '}
                <span className="ml-1">
                  <Info height={16} />
                </span>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full" asChild>
              <ScrollArea className="h-[400px] w-[450px] rounded-md border p-4">
                <h3>Fsm Apps-Skills</h3>
                {selectedData?.fsms.map((fsm: any) => (
                  <Card key={fsm.id} className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-sm">{fsm.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs">{fsm.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div className="flex flex-col spaace-y-2">
            <div className="flex items-center space-x-2 text-base font-normal">
              <Bot />
              <span> {historyData?.length} Agents deployed </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Image src="/nft.svg" width={40} height={40} alt="nft-logo" />
            <div className="text-lg font-medium">#149867</div>
          </div>
        </CardContent>
      </Card>

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
    </div>
  )
}
