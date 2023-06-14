"use client"

import { SessionProvider } from "next-auth/react"

type NextAuthProviderProp = {
    children: React.ReactNode
}

export default function NextAuthProvider({children}:NextAuthProviderProp) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
