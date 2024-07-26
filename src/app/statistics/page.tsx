'use client'
import React, { useState } from 'react'
import { useProjectContext } from '../_context/ProjectContext'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Pie, PieChart } from 'recharts'
import { useAccount } from 'wagmi'

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  done: {
    label: 'DONE',
    color: 'hsl(var(--chart-1))',
  },
  cancel: {
    label: 'CANCEL',
    color: 'hsl(var(--chart-2))',
  },
  transact: {
    label: 'TRANSACT',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

const Statistics = () => {
  const [seelectState, setSelectState] = useState('')

  const { isConnected } = useAccount()

  const handleStates = (value: string) => {
    setSelectState(value)
  }

  const { projects } = useProjectContext()

  const states = projects[0]?.fsms[0]?.fsm?.states?.map(
    (item: any) => item.name
  )

  const prepareData = projects[0]?.rounds
    .filter((item: any) => item.name === seelectState)
    .map((item: any) => {
      const monthlyData = {
        done: 0,
        cancel: 0,
        transact: 0,
      }

      item.votings.forEach((vote: any) => {
        if (vote.voteType.name === 'DONE') {
          monthlyData.done++
        } else if (vote.voteType.name === 'CANCEL') {
          monthlyData.cancel++
        } else if (vote.voteType.name === 'TRANSACT') {
          monthlyData.transact++
        }
      })

      const chartData = [
        {
          browser: 'done',
          vote: monthlyData.done,
          fill: 'var(--color-done)',
        },
        {
          browser: 'cancel',
          vote: monthlyData.cancel,
          fill: 'var(--color-cancel)',
        },
        {
          browser: 'transact',
          vote: monthlyData.transact,
          fill: 'var(--color-transact)',
        },
      ]

      return chartData
    })

  return (
    <>
      {!isConnected ? (
        <div>Connect your wallet</div>
      ) : (
        <div>
          <Select onValueChange={handleStates}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {states?.map((item: any) => {
                  return <SelectItem value={item}>{item}</SelectItem>
                })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <main className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prepareData?.map((item: any) => (
              <Card className="flex flex-col mt-10">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Agent data</CardTitle>
                  <CardDescription>Showing round information</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie data={item} dataKey="vote" nameKey="browser" />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            ))}
          </main>
        </div>
      )}
    </>
  )
}

export default Statistics
