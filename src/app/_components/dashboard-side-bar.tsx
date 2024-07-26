'use client'

import clsx from 'clsx'
import { ArrowRightLeft, Bot, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useProjectContext } from '../_context/ProjectContext'
import { useAccount } from 'wagmi'

export default function DashboardSideBar() {
  const pathname = usePathname()
  const { isConnected } = useAccount()

  const { projects } = useProjectContext()

  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
          <Link className="flex items-center gap-2 font-semibold ml-1" href="/">
            <span className="">
              {!isConnected ? 'Dashboard' : projects[0]?.name}
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2 ">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className={clsx(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                {
                  'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50':
                    pathname === '/',
                }
              )}
              href="/"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <Bot className="h-3 w-3" />
              </div>
              Agent Status
            </Link>
            <Link
              className={clsx(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                {
                  'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50':
                    pathname === '/statistics',
                }
              )}
              href="/statistics"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <TrendingUp className="h-3 w-3" />
              </div>
              Statistics
            </Link>

            {/* <Link
              className={clsx(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                {
                  'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50':
                    pathname === '/transactions',
                }
              )}
              href="/transactions"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <ArrowRightLeft className="h-3 w-3" />
              </div>
              Transactions
            </Link> */}

            <Link
              className={clsx(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                {
                  'flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50':
                    pathname === '/transactions',
                }
              )}
              href="/project"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <ArrowRightLeft className="h-3 w-3" />
              </div>
              cpi sidebar item (test)
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
