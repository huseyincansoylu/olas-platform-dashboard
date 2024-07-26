'use client'
import React from 'react'
import { useProjectContext } from '../_context/ProjectContext'
import dynamic from 'next/dynamic'

const getDynamicComponent = (c: string) =>
  dynamic(() => import(`../projects/${c}`), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  })

const Project = () => {
  // query the db
  const { projects } = useProjectContext()

  const slug = projects?.[0]?.slug

  const component = `${slug}/page.tsx`

  const DynamicComponent = getDynamicComponent(component)

  return <DynamicComponent />
}

export default Project
