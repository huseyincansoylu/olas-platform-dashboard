import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

import { cn } from "@/lib/utils"
import DashboardSideBar from "./_components/dashboard-side-bar"
import DashboardTopNav from "./_components/dashboard-top-nav"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Shutter RFP - Dashboard",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <DashboardSideBar />

            <DashboardTopNav>
              <main className="flex flex-col gap-4 p-4 lg:gap-6">
                {children}
              </main>
            </DashboardTopNav>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
