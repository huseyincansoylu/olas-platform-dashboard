'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SeeAllNav() {
  const router = useRouter()

  return (
    <div className="space-x-4">
      <Button
        size={'sm'}
        variant="secondary"
        onClick={() => router.push(`/fsm/1/allagents`)}
      >
        See All Agents
      </Button>
      <Button
        size={'sm'}
        variant="secondary"
        onClick={() => router.push(`/fsm/1/allhistories`)}
      >
        See All History
      </Button>
    </div>
  )
}
