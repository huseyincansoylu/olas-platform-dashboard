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
        onClick={() =>
          router.push(`/fsm/1a43a0f8-78dd-472b-b4c4-003dbdee69a5/all`)
        }
      >
        See All History
      </Button>
    </div>
  )
}
