'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

import { TooltipProvider } from '@/components/tooltip'
import { SidebarProvider } from '@/server/lib/hooks/use-sidebar'

export function Providers({ children, ...props }: ThemeProviderProps)
{
  return (
    <NextThemesProvider {...props}>
      <SidebarProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </SidebarProvider>
    </NextThemesProvider>
  )
}
