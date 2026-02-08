# API Contracts

## Base URL

All endpoints are Appwrite Function executions.

```
POST /v1/functions/{functionId}/executions
```

The function routes internally based on the `action` field in the request body.

## Endpoints

### 1. Create Target

- **Function**: `status-beacon-admin`
- **Action**: `create_target`

**Request Body**:
```json
{
  "action": "create_target",
  "payload": {
    "name": "Portfolio API",
    "url": "https://api.example.com/health",
    "method": "GET",
    "intervalSeconds": 60,
    "timeoutMs": 5000,
    "enabled": true,
    "tags": ["api", "production"]
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "$id": "target_abc123",
    "name": "Portfolio API",
    "url": "https://api.example.com/health",
    "method": "GET",
    "intervalSeconds": 60,
    "timeoutMs": 5000,
    "enabled": true,
    "tags": ["api", "production"],
    "$createdAt": "2026-01-01T00:00:00.000Z",
    "$updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

### 2. Get Target

- **Function**: `status-beacon-admin`
- **Action**: `get_target`

**Request Body**:
```json
{
  "action": "get_target",
  "payload": { "targetId": "target_abc123" }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": { "...target object..." }
}
```

### 3. List Targets

- **Function**: `status-beacon-admin`
- **Action**: `list_targets`

**Request Body**:
```json
{
  "action": "list_targets",
  "payload": { "limit": 25, "offset": 0 }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": { "total": 5, "targets": [ "...target objects..." ] }
}
```

### 4. Update Target

- **Function**: `status-beacon-admin`
- **Action**: `update_target`

**Request Body**:
```json
{
  "action": "update_target",
  "payload": { "targetId": "target_abc123", "enabled": false }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": { "...updated target object..." }
}
```

### 5. Delete Target

- **Function**: `status-beacon-admin`
- **Action**: `delete_target`

**Request Body**:
```json
{
  "action": "delete_target",
  "payload": { "targetId": "target_abc123" }
}
```

**Response (200)**:
```json
{ "success": true, "data": null }
```

### 6. Get Latest Checks for Target

- **Function**: `status-beacon-query`
- **Action**: `get_checks`

**Request Body**:
```json
{
  "action": "get_checks",
  "payload": { "targetId": "target_abc123", "limit": 10 }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "total": 10,
    "checks": [
      {
        "$id": "chk_001",
        "targetId": "target_abc123",
        "status": "up",
        "statusCode": 200,
        "latencyMs": 142,
        "checkedAt": "2026-01-01T00:01:00.000Z"
      }
    ]
  }
}
```

### 7. List Open Incidents

- **Function**: `status-beacon-query`
- **Action**: `list_incidents`

**Request Body**:
```json
{
  "action": "list_incidents",
  "payload": { "status": "open", "limit": 25, "offset": 0 }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "total": 1,
    "incidents": [
      {
        "$id": "inc_001",
        "targetId": "target_abc123",
        "status": "open",
        "title": "Portfolio API is down",
        "startedAt": "2026-01-01T00:05:00.000Z",
        "resolvedAt": null
      }
    ]
  }
}
```

### 8. Get Aggregated Status

- **Function**: `status-beacon-query`
- **Action**: `get_status`

**Request Body**:
```json
{
  "action": "get_status",
  "payload": {}
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "overall": "degraded",
    "targets": [
      {
        "targetId": "target_abc123",
        "name": "Portfolio API",
        "status": "down",
        "lastCheckAt": "2026-01-01T00:10:00.000Z"
      }
    ]
  }
}
```

### 9. Create Alert Rule

- **Function**: `status-beacon-admin`
- **Action**: `create_alert_rule`

**Request Body**:
```json
{
  "action": "create_alert_rule",
  "payload": {
    "name": "Slack on any incident",
    "targetId": "*",
    "channel": "webhook",
    "endpoint": "https://hooks.slack.example.com/xyz",
    "events": ["incident.opened", "incident.resolved"],
    "enabled": true
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "$id": "alert_001",
    "name": "Slack on any incident",
    "targetId": "*",
    "channel": "webhook",
    "endpoint": "https://hooks.slack.example.com/xyz",
    "events": ["incident.opened", "incident.resolved"],
    "enabled": true,
    "$createdAt": "2026-01-01T00:00:00.000Z",
    "$updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

### 10. Delete Alert Rule

- **Function**: `status-beacon-admin`
- **Action**: `delete_alert_rule`

**Request Body**:
```json
{
  "action": "delete_alert_rule",
  "payload": { "ruleId": "alert_001" }
}
```

**Response (200)**:
```json
{ "success": true, "data": null }
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
| `TARGET_NOT_FOUND` | 404 | No target exists with the given ID |
| `INCIDENT_NOT_FOUND` | 404 | No incident exists with the given ID |
| `RULE_NOT_FOUND` | 404 | No alert rule exists with the given ID |
| `TARGET_URL_EXISTS` | 409 | A target with this URL already exists |
| `UNAUTHORIZED` | 401 | Missing or invalid JWT |
| `FORBIDDEN` | 403 | Role lacks required permission |
| `INTERNAL_ERROR` | 500 | Unexpected server error |
