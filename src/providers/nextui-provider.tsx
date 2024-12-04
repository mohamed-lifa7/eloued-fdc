'use client'

import {NextUIProvider as NextUI} from '@nextui-org/react'

export function NextUIProvider({children}: { children: React.ReactNode }) {
  return (
    <NextUI>
      {children}
    </NextUI>
  )
}