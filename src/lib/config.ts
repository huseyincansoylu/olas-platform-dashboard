import { cookieStorage, createStorage } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, gnosis } from 'wagmi/chains'

export const projectId = process.env.PROJECT_ID || '9090'

// Create wagmiConfig
export const config = getDefaultConfig({
  appName: 'App',
  chains: [mainnet, gnosis],
  ssr: true,
  projectId,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
