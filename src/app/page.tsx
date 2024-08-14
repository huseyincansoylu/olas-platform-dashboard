'use client'
import { DataTable } from '@/components/data-table'
import { instanceColumns, suitesColumns } from './columns'
import SeeAllNav from './see-all-nav'
import { baseurl } from '@/lib/baseUrl'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
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
import { useState } from 'react'

async function getProjectFSMSuites(token: string, projectId: string) {
  const res = await fetch(`${baseurl}/api/projects/${projectId}/fsmsuites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.json()
}

import { useEffect } from 'react'

export default function Home() {
  const searchParams = useSearchParams()
  const { address } = useAccount()

  const [selectedOption, setSelectedOption] = useState<string>('')

  const projectId = searchParams.get('sp')

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const { data, isLoading, isError } = useQuery({
    queryKey: ['fsmsuites', projectId, token],
    queryFn: () => getProjectFSMSuites(token!, projectId!),
    enabled: !!token && !!projectId,
  })

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedOption(data[0].id)
    }
  }, [data])

  if (!address) return 'Please login for the dashboard'

  if (isLoading) return 'Loading...'

  if (isError) return 'Failed to load data'

  if (!data || data.length === 0 || !data[0]) {
    return 'No data available'
  }

  const selectedData = data.find((item: any) => item.id === selectedOption)

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 items-center">
            <h2>Select fsm suite: </h2>
            <Select
              onValueChange={(value) => {
                setSelectedOption(value)
              }}
              value={selectedOption}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select fsm suite" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>FSM Suites</SelectLabel>

                  {data?.map((item: any) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <SeeAllNav />
        </div>

        <h3 className="mb-4 text-lg font-semibold mt-10">Fsms List</h3>
        <DataTable data={selectedData?.fsms || []} columns={suitesColumns} />
        <h3 className="mb-4 text-lg font-semibold mt-10">Instance List</h3>
        <DataTable
          data={selectedData?.instances || []}
          columns={instanceColumns}
        />
      </div>
    </>
  )
}
