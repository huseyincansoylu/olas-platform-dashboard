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
import { ReactNode, useEffect } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import axios from 'axios'
import { navLinks } from '@/lib/navLinks'

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  // when the wallet loging happens we need to call your code
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  useEffect(() => {
    const login = async () => {
      if (!address) return

      try {
        // Step 1: Get nonce from server
        const nonceResponse = await axios.post(
          'http://localhost:8000/auth/nonce',
          { address }
        )
        const nonce = nonceResponse.data.nonce

        // Step 2: Sign the nonce
        const message = `One Time Nonce: ${nonce}`

        // const signature = await web3.eth.personal.sign(message, account)

        const signature = await signMessageAsync({ message })

        // Step 3: Send the signed message and address to the server for verification
        const loginResponse = await axios.post(
          'http://localhost:8000/auth/login',
          {
            address,
            signature,
          }
        )

        const token = loginResponse.data.token
        console.log('JWT Token:', token)

        // Opcional: almacenar el token en localStorage o cookies
        localStorage.setItem('token', token)
      } catch (error) {
        console.error('Login error:', error)
      }
    }

    login()
  }, [address])

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
                  <DialogClose asChild>
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
        <div className="flex justify-center items-center gap-2 ml-auto">
          <ConnectButton />
          <ModeToggle />
        </div>
      </header>
      {children}
    </div>
  )
}
