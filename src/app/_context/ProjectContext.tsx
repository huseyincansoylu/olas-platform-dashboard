'use client'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import axios from 'axios'
import { useAccountEffect } from 'wagmi'

type Project = any

interface ProjectContextType {
  projects: Project[]
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([])
  const token = localStorage.getItem('token')

  useAccountEffect({
    onDisconnect() {
      localStorage.removeItem('token')
      setProjects([])
    },
  })

  useEffect(() => {
    if (!token) return
    getProjectInformation()
  }, [token])

  const getProjectInformation = async () => {
    try {
      const { data: projects } = await axios.get<Project[]>(
        'http://localhost:8000/projects',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setProjects(projects)
    } catch (error) {
      console.error('Fetching projects error:', error)
    }
  }

  return (
    <ProjectContext.Provider value={{ projects }}>
      {children}
    </ProjectContext.Provider>
  )
}

const useProjectContext = (): ProjectContextType => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider')
  }
  return context
}

export { ProjectProvider, useProjectContext }
