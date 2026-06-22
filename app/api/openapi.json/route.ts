import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrl } from '@/lib/utils'

/**
 * OpenAPI 3.1 specification for the portfolio API.
 */
export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl(request)

  const spec = {
    openapi: '3.1.0',
    info: {
      title: 'Nguyen Minh Hieu Portfolio API',
      version: '1.0.0',
      description:
        'REST API for querying portfolio data including work experience, projects, and skills.',
    },
    servers: [{ url: baseUrl }],
    paths: {
      '/api/markdown-portfolio': {
        get: {
          summary: 'Get portfolio as Markdown',
          description:
            'Returns the full portfolio content formatted as Markdown.',
          operationId: 'getMarkdownPortfolio',
          parameters: [
            {
              name: 'locale',
              in: 'query',
              schema: {
                type: 'string',
                enum: ['en', 'vi', 'zh-TW'],
                default: 'en',
              },
              description: 'Language locale for the response.',
            },
          ],
          responses: {
            '200': {
              description: 'Markdown-formatted portfolio content.',
              content: { 'text/markdown': { schema: { type: 'string' } } },
              headers: {
                'x-markdown-tokens': {
                  description: 'Estimated token count for the response.',
                  schema: { type: 'string' },
                },
              },
            },
          },
        },
      },
      '/api/mcp': {
        post: {
          summary: 'MCP Protocol endpoint',
          description:
            'JSON-RPC 2.0 endpoint implementing the Model Context Protocol for AI agent tool calls.',
          operationId: 'mcpHandler',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    jsonrpc: { type: 'string', enum: ['2.0'] },
                    id: { oneOf: [{ type: 'string' }, { type: 'number' }] },
                    method: { type: 'string' },
                    params: { type: 'object' },
                  },
                  required: ['jsonrpc', 'method'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'JSON-RPC response.',
              content: { 'application/json': {} },
            },
          },
        },
      },
      '/api/agent/claim': {
        get: {
          summary: 'Anonymous agent credential claim',
          description:
            'Returns a temporary credential token for anonymous agent registration.',
          operationId: 'claimCredential',
          responses: {
            '200': {
              description: 'Credential token and registration URI.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      credential_token: { type: 'string' },
                      expires_in: { type: 'integer' },
                      register_uri: { type: 'string', format: 'uri' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/agent/register': {
        post: {
          summary: 'Register an AI agent',
          description: 'Registers an agent instance and returns an API key.',
          operationId: 'registerAgent',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    agent_name: { type: 'string' },
                    agent_version: { type: 'string' },
                    identity_assertion: { type: 'string', enum: ['anonymous'] },
                  },
                  required: ['agent_name'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Registration success with API key.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      api_key: { type: 'string' },
                      agent_name: { type: 'string' },
                      registered_at: { type: 'string', format: 'date-time' },
                    },
                  },
                },
              },
            },
            '400': { description: 'Invalid request body.' },
          },
        },
      },
    },
  }

  return NextResponse.json(spec)
}
