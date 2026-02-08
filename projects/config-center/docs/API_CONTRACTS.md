# API Contracts

## Base URL

All endpoints are Appwrite Function executions.

```
POST /v1/functions/{functionId}/executions
```

The function routes internally based on the `action` field in the request body.

## Endpoints

### 1. Create Flag

- **Function**: `config-center-flags`
- **Action**: `create`

**Request Body**:
```json
{
  "action": "create",
  "payload": {
    "key": "enable_dark_mode",
    "description": "Toggle dark mode for users",
    "type": "boolean",
    "defaultValue": false,
    "enabled": true,
    "tags": ["ui", "experiment"]
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "$id": "flag_abc123",
    "key": "enable_dark_mode",
    "description": "Toggle dark mode for users",
    "type": "boolean",
    "defaultValue": false,
    "enabled": true,
    "tags": ["ui", "experiment"],
    "$createdAt": "2026-01-01T00:00:00.000Z",
    "$updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

### 2. Get Flag

- **Function**: `config-center-flags`
- **Action**: `get`

**Request Body**:
```json
{
  "action": "get",
  "payload": {
    "key": "enable_dark_mode"
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "$id": "flag_abc123",
    "key": "enable_dark_mode",
    "description": "Toggle dark mode for users",
    "type": "boolean",
    "defaultValue": false,
    "enabled": true,
    "tags": ["ui", "experiment"],
    "$createdAt": "2026-01-01T00:00:00.000Z",
    "$updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

### 3. List Flags

- **Function**: `config-center-flags`
- **Action**: `list`

**Request Body**:
```json
{
  "action": "list",
  "payload": {
    "limit": 25,
    "offset": 0
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "total": 2,
    "flags": [ "...flag objects..." ]
  }
}
```

### 4. Update Flag

- **Function**: `config-center-flags`
- **Action**: `update`

**Request Body**:
```json
{
  "action": "update",
  "payload": {
    "key": "enable_dark_mode",
    "enabled": false
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": { "...updated flag object..." }
}
```

### 5. Delete Flag

- **Function**: `config-center-flags`
- **Action**: `delete`

**Request Body**:
```json
{
  "action": "delete",
  "payload": {
    "key": "enable_dark_mode"
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": null
}
```

### 6. Evaluate Flag

- **Function**: `config-center-evaluate`
- **Action**: `evaluate`

**Request Body**:
```json
{
  "action": "evaluate",
  "payload": {
    "key": "enable_dark_mode",
    "context": {
      "userId": "user_xyz",
      "environment": "production",
      "attributes": {
        "plan": "pro"
      }
    }
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "key": "enable_dark_mode",
    "value": true,
    "reason": "rollout_rule:percentage_50"
  }
}
```

### 7. Create Rollout Rule

- **Function**: `config-center-rules`
- **Action**: `create`

**Request Body**:
```json
{
  "action": "create",
  "payload": {
    "flagKey": "enable_dark_mode",
    "type": "percentage",
    "value": true,
    "percentage": 50,
    "priority": 1,
    "enabled": true
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "$id": "rule_def456",
    "flagKey": "enable_dark_mode",
    "type": "percentage",
    "value": true,
    "percentage": 50,
    "priority": 1,
    "enabled": true,
    "$createdAt": "2026-01-01T00:00:00.000Z",
    "$updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

### 8. Delete Rollout Rule

- **Function**: `config-center-rules`
- **Action**: `delete`

**Request Body**:
```json
{
  "action": "delete",
  "payload": {
    "ruleId": "rule_def456"
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": null
}
```

## Request/Response Schemas

All requests follow the envelope:

```json
{
  "action": "<string>",
  "payload": { "...action-specific fields..." }
}
```

All responses follow the envelope:

```json
{
  "success": true | false,
  "data": { "...result..." } | null,
  "error": { "code": "<string>", "message": "<string>" } | undefined
}
```

## Error Codes

| Code | HTTP Status | Description |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Request body failed JSON Schema validation |
| `FLAG_NOT_FOUND` | 404 | No flag exists with the given key |
| `RULE_NOT_FOUND` | 404 | No rollout rule exists with the given ID |
| `FLAG_KEY_EXISTS` | 409 | A flag with this key already exists |
| `UNAUTHORIZED` | 401 | Missing or invalid JWT |
| `FORBIDDEN` | 403 | Role lacks required permission |
| `INTERNAL_ERROR` | 500 | Unexpected server error |
