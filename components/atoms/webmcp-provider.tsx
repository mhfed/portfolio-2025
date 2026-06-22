'use client'

import { useEffect } from 'react'

interface WebMCPTool {
  name: string
  description: string
  inputSchema: {
    type: string
    properties: Record<string, unknown>
    required?: string[]
  }
  execute: (args: Record<string, unknown>) => Promise<Record<string, unknown>>
}

export function WebMCPProvider() {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.navigator ||
      !('modelContext' in window.navigator)
    ) {
      return
    }

    interface NavigatorWithModelContext {
      modelContext?: {
        provideContext?: (options: {
          tools: WebMCPTool[]
          signal?: AbortSignal
        }) => void
        registerTool?: (tool: WebMCPTool & { signal?: AbortSignal }) => void
      }
    }

    const mc = (window.navigator as unknown as NavigatorWithModelContext)
      .modelContext
    if (!mc) return

    const controller = new AbortController()

    const tools: WebMCPTool[] = [
      {
        name: 'get_portfolio_data',
        description:
          "Get Hieu's work experience, projects, and skills details.",
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              enum: ['projects', 'experience', 'skills', 'all'],
              description: 'The category of information to retrieve.',
              default: 'all',
            },
            locale: {
              type: 'string',
              enum: ['en', 'vi', 'zh-TW'],
              description: 'Language locale for the response.',
              default: 'en',
            },
          },
        },
        execute: async (args: Record<string, unknown>) => {
          const category = (args.category as string) || 'all'
          const locale = (args.locale as string) || 'en'

          try {
            const response = await fetch('/api/mcp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'tools/call',
                params: {
                  name: 'get-portfolio-data',
                  arguments: { category, locale },
                },
              }),
              signal: controller.signal,
            })

            if (!response.ok) {
              throw new Error(`API returned ${response.status}`)
            }

            const rpc = await response.json()
            const content = rpc.result?.content?.[0]?.text
            return {
              status: 'success',
              data: content ? JSON.parse(content) : {},
            }
          } catch (err) {
            return {
              status: 'error',
              message: err instanceof Error ? err.message : 'Unknown error',
            }
          }
        },
      },
    ]

    const provideContextFn = mc.provideContext
    const registerToolFn = mc.registerTool

    // Register tools using provideContext
    try {
      if (typeof provideContextFn === 'function') {
        provideContextFn({
          tools,
          signal: controller.signal,
        })
      }
    } catch (e) {
      console.error('Failed to call provideContext:', e)
    }

    // Fallback or double register using registerTool
    try {
      if (typeof registerToolFn === 'function') {
        tools.forEach((tool) => {
          registerToolFn({
            ...tool,
            signal: controller.signal,
          })
        })
      }
    } catch (e) {
      console.error('Failed to call registerTool:', e)
    }

    return () => {
      // Abort controller automatically unregisters the tools
      controller.abort()
    }
  }, [])

  return null
}
