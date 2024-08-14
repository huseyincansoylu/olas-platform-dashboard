'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import axios from 'axios'
import { navLinks } from '@/lib/navLinks'
import { baseurl } from '@/lib/baseUrl'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { useProjectContext } from '../_context/ProjectContext'

async function getProjects(token: string) {
  const res = await fetch(`${baseurl}/api/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch projects')
  }

  return res.json()
}

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  const { selectedProjectId, setSelectedProjectId } = useProjectContext()
  const [token, setToken] = useState<string | null>(null)
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const { data, isLoading } = useQuery({
    queryKey: ['projects', token, address],
    queryFn: () => getProjects(token!),
    enabled: !!token,
  })

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  }, [])

  useEffect(() => {
    const login = async () => {
      if (!address || token) return

      try {
        // Step 1: Get nonce from server
        const nonceResponse = await axios.post(`${baseurl}/auth/nonce`, {
          address,
        })

        const nonce = nonceResponse.data.nonce

        // Step 2: Sign the nonce
        const message = `${nonce}`

        const signature = await signMessageAsync({ message })

        // Step 3: Send the signed message and address to the server for verification
        const loginResponse = await axios.post(`${baseurl}/auth/verify`, {
          address,
          signature,
        })

        const newToken = loginResponse.data.token
        localStorage.setItem('token', newToken)
        setToken(newToken) // Token'ı state'e kaydediyoruz
      } catch (error) {
        console.error('Login error:', error)
      }
    }

    login()
  }, [address, token, signMessageAsync])

  useEffect(() => {
    if (data && data.length > 0) {
      const firstProjectId = data[0].id
      setSelectedProjectId(firstProjectId)
    }
  }, [data])

  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <Menu />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>Dashboard</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              {navLinks.map((item) => {
                return (
                  <DialogClose asChild key={item.href}>
                    <Link href={item.href}>
                      <Button variant="outline" className="w-full">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Button>
                    </Link>
                  </DialogClose>
                )
              })}
            </div>
          </SheetContent>
        </Dialog>

        {address && (
          <>
            <div>Select Project: </div>
            <div>
              {isLoading ? (
                <div>Loading projects...</div> // Yüklenirken gösterilecek bir mesaj
              ) : (
                <Select
                  onValueChange={(value) => {
                    setSelectedProjectId(value)
                  }}
                  value={selectedProjectId ?? ''}
                >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Projects</SelectLabel>

                      {data?.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </>
        )}

        <div className="flex justify-center items-center gap-2 ml-auto">
          <ConnectButton />
          <ModeToggle />
        </div>
      </header>
      {children}
    </div>
  )
}
