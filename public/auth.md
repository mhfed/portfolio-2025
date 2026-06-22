# Nguyen Minh Hieu Portfolio auth.md

This document defines how AI agents, web crawlers, and automated systems can request authentication and register to access the APIs and content of the Nguyen Minh Hieu Portfolio website.

## Agent Audience
This specification is designed for AI agents, crawlers, and LLM-based web agents who want programmatically reliable, structured access to this portfolio's data.

## OAuth & Resource Server Discovery
We support standard OAuth 2.0 and OpenID Connect discovery endpoints to let you programmatically discover how to obtain access tokens:
- **Authorization Server Metadata:** `/.well-known/oauth-authorization-server`
- **OpenID Connect Configuration:** `/.well-known/openid-configuration`
- **Protected Resource Metadata:** `/.well-known/oauth-protected-resource`

## Registration Flow
We support the anonymous agent registration flow. If your agent requires credentials:
1. **Initiate Claim:** Request a credential token from our anonymous claim endpoint:
   ```http
   GET /api/agent/claim
   Accept: application/json
   ```
2. **Register Agent:** Register your agent instance with its metadata:
   ```http
   POST /api/agent/register
   Content-Type: application/json

   {
     "agent_name": "MyAwesomeAgent",
     "agent_version": "1.0.0",
     "identity_assertion": "anonymous"
   }
   ```
   This will return an `api_key` for your agent.

## Credential Use
Once you have obtained an `api_key`, authenticate all your requests using the standard HTTP Bearer header:
```http
Authorization: Bearer <your_api_key>
```
For unauthenticated requests, public data (like the main portfolio in Markdown format) remains accessible using standard content negotiation headers:
```http
GET /en
Accept: text/markdown
```
