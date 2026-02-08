# Architecture

## Overview

Config-center is a feature-flag and remote-configuration service for the four-in-one portfolio. It exposes a minimal REST-style API (via Appwrite Functions) that lets operators create, update, and evaluate feature flags and rollout rules. Clients resolve flag values at runtime by calling the evaluate endpoint.

## Components

| Component | Responsibility |
|---|---|
| **Appwrite Database** | Stores `flags` and `rollout_rules` collections |
| **Appwrite Functions** | Serverless endpoints for CRUD + evaluate operations |
| **Appwrite Auth** | JWT-based identity; maps users to roles |
| **Client SDK (future)** | Thin HTTP wrapper consumed by sibling projects |

## Data Flow

```
Client (HTTP) ──► Appwrite Function (evaluate)
                      │
                      ├─► Read flag document
                      ├─► Read rollout_rules for flag
                      ├─► Evaluate rules (percentage / user-list / env match)
                      └─► Return resolved value
```

### Write Path

```
Admin (HTTP + JWT) ──► Appwrite Function (CRUD)
                            │
                            ├─► Validate payload against JSON Schema
                            ├─► Write to flags / rollout_rules collection
                            └─► Return success / error
```

## Technology Stack

- **Backend**: Appwrite Cloud / Self-hosted (>=1.4)
- **Functions Runtime**: Node.js 18 (Appwrite Functions)
- **Schema Validation**: ajv (JSON Schema Draft-07)
- **Auth**: Appwrite built-in (JWT + API key for service calls)
- **Testing**: Vitest (unit), local Appwrite (integration — Phase 2+)

## Deployment

All Appwrite resources (collections, indexes, functions, permissions) are defined declaratively in `/appwrite/*.md` and applied via the Appwrite CLI or Console. No external infrastructure is required beyond a running Appwrite instance.
