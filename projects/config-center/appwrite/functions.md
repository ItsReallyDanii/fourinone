# Appwrite Functions

## Function Definitions

### 1. `config-center-flags`

- **ID**: `config-center-flags`
- **Runtime**: `node-18.0`
- **Entrypoint**: `functions/flags/index.js`
- **Purpose**: CRUD operations on the `flags` collection
- **Actions**: `create`, `get`, `list`, `update`, `delete`
- **Timeout**: 15s
- **Execute permission**: `any` (auth checked inside function)

### 2. `config-center-rules`

- **ID**: `config-center-rules`
- **Runtime**: `node-18.0`
- **Entrypoint**: `functions/rules/index.js`
- **Purpose**: CRUD operations on the `rollout_rules` collection
- **Actions**: `create`, `get`, `list`, `update`, `delete`
- **Timeout**: 15s
- **Execute permission**: `any` (auth checked inside function)

### 3. `config-center-evaluate`

- **ID**: `config-center-evaluate`
- **Runtime**: `node-18.0`
- **Entrypoint**: `functions/evaluate/index.js`
- **Purpose**: Resolve a flag value for a given context (user, environment, attributes)
- **Actions**: `evaluate`
- **Timeout**: 5s
- **Execute permission**: `any` (auth checked inside function)

## Triggers

All functions are triggered via **HTTP execution** (`POST /v1/functions/{functionId}/executions`). No schedule or event triggers are used in Phase 1.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `APPWRITE_ENDPOINT` | yes | Appwrite API endpoint URL |
| `APPWRITE_PROJECT_ID` | yes | Appwrite project ID |
| `APPWRITE_API_KEY` | yes | Server-side API key with DB read/write scopes |
| `CONFIG_CENTER_DB_ID` | yes | Database ID (`config_center_db`) |
| `FLAGS_COLLECTION_ID` | yes | Collection ID (`flags`) |
| `RULES_COLLECTION_ID` | yes | Collection ID (`rollout_rules`) |
