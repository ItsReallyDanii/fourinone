# Architecture

## Overview

Status-beacon is an uptime-monitoring and status-page service for the four-in-one portfolio. It lets operators register **targets** (URLs / services), executes periodic **checks** against them, auto-creates **incidents** when failures are detected, and fires **alert rules** to notify stakeholders. All data lives in Appwrite collections; all logic runs in Appwrite Functions.

## Components

| Component | Responsibility |
|---|---|
| **Appwrite Database** | Stores `targets`, `checks`, `incidents`, `alert_rules` collections |
| **Appwrite Functions** | Serverless endpoints for CRUD, check execution, incident lifecycle, and alerting |
| **Appwrite Auth** | JWT-based identity; maps users to roles |
| **Scheduler (Appwrite CRON)** | Triggers the check-runner function on a fixed interval |

## Data Flow

### Check Execution Path

```
CRON trigger ──► check-runner function
                      │
                      ├─► List enabled targets
                      ├─► For each target: HTTP probe → record check document
                      ├─► If check fails & no open incident → create incident
                      ├─► If check passes & open incident → resolve incident
                      └─► Evaluate alert_rules → fire notifications
```

### Read Path (Status Page)

```
Client (HTTP) ──► status-beacon-query function
                      │
                      ├─► Read target(s)
                      ├─► Read latest checks for target
                      ├─► Read open incidents
                      └─► Return aggregated status payload
```

### Write Path (Admin)

```
Admin (HTTP + JWT) ──► status-beacon-admin function
                            │
                            ├─► Validate payload against JSON Schema
                            ├─► Write to targets / alert_rules collection
                            └─► Return success / error
```

## Technology Stack

- **Backend**: Appwrite Cloud / Self-hosted (>=1.4)
- **Functions Runtime**: Node.js 18 (Appwrite Functions)
- **Schema Validation**: ajv (JSON Schema Draft-07)
- **Auth**: Appwrite built-in (JWT + API key for service calls)
- **Testing**: Vitest (unit), local Appwrite (integration — Phase 2+)

## Deployment

All Appwrite resources (collections, indexes, functions, permissions) are defined declaratively in `/appwrite/*.md` and applied via the Appwrite CLI or Console. The check-runner function is the only CRON-triggered function; all others are HTTP-triggered.
