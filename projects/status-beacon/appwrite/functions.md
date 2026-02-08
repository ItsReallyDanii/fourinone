# Appwrite Functions

## Function Definitions

### 1. `status-beacon-admin`

- **ID**: `status-beacon-admin`
- **Runtime**: `node-18.0`
- **Entrypoint**: `functions/admin/index.js`
- **Purpose**: CRUD operations on `targets` and `alert_rules` collections
- **Actions**: `create_target`, `get_target`, `list_targets`, `update_target`, `delete_target`, `create_alert_rule`, `delete_alert_rule`
- **Timeout**: 15s
- **Execute permission**: `any` (auth checked inside function)

### 2. `status-beacon-query`

- **ID**: `status-beacon-query`
- **Runtime**: `node-18.0`
- **Entrypoint**: `functions/query/index.js`
- **Purpose**: Read-only queries for checks, incidents, and aggregated status
- **Actions**: `get_checks`, `list_incidents`, `get_status`
- **Timeout**: 10s
- **Execute permission**: `any` (auth checked inside function)

### 3. `status-beacon-check-runner`

- **ID**: `status-beacon-check-runner`
- **Runtime**: `node-18.0`
- **Entrypoint**: `functions/check-runner/index.js`
- **Purpose**: Execute health checks against all enabled targets, record check documents, open/resolve incidents, and evaluate alert rules
- **Actions**: N/A (runs autonomously on schedule)
- **Timeout**: 30s
- **Execute permission**: N/A (CRON-triggered, uses server API key)

## Triggers

| Function | Trigger Type | Schedule |
|---|---|---|
| `status-beacon-admin` | HTTP execution | — |
| `status-beacon-query` | HTTP execution | — |
| `status-beacon-check-runner` | CRON schedule | `*/1 * * * *` (every minute) |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `APPWRITE_ENDPOINT` | yes | Appwrite API endpoint URL |
| `APPWRITE_PROJECT_ID` | yes | Appwrite project ID |
| `APPWRITE_API_KEY` | yes | Server-side API key with DB read/write scopes |
| `STATUS_BEACON_DB_ID` | yes | Database ID (`status_beacon_db`) |
| `TARGETS_COLLECTION_ID` | yes | Collection ID (`targets`) |
| `CHECKS_COLLECTION_ID` | yes | Collection ID (`checks`) |
| `INCIDENTS_COLLECTION_ID` | yes | Collection ID (`incidents`) |
| `ALERT_RULES_COLLECTION_ID` | yes | Collection ID (`alert_rules`) |
