'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useAccountEffect } from 'wagmi'

interface ProjectContextType {
  selectedProjectId: string | null
  setSelectedProjectId: (id: string) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProjectId, setSelectedProjectIdState] = useState<
    string | null
  >(null)

  const setSelectedProjectId = (id: string) => {
    setSelectedProjectIdState(id)
  }

  useAccountEffect({
    onDisconnect() {
      localStorage.removeItem('token')
    },
  })

  return (
    <ProjectContext.Provider
      value={{ selectedProjectId, setSelectedProjectId }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjectContext = (): ProjectContextType => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider')
  }
  return context
}
