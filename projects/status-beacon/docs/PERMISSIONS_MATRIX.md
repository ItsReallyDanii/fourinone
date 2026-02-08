# Permissions Matrix

## Roles

| Role | Description |
|---|---|
| `admin` | Full access to all targets, checks, incidents, and alert rules |
| `editor` | Create, read, update targets and alert rules; cannot delete |
| `viewer` | Read-only access to targets, checks, incidents, aggregated status |
| `service` | Server-to-server via API key; check-runner and query only |

## Resource Permissions

### Targets Collection

| Operation | admin | editor | viewer | service |
|---|---|---|---|---|
| Create | Y | Y | N | N |
| Read | Y | Y | Y | Y |
| Update | Y | Y | N | N |
| Delete | Y | N | N | N |
| List | Y | Y | Y | Y |

### Checks Collection

| Operation | admin | editor | viewer | service |
|---|---|---|---|---|
| Create | N | N | N | Y (check-runner only) |
| Read | Y | Y | Y | Y |
| List | Y | Y | Y | Y |
| Delete | Y | N | N | N |

### Incidents Collection

| Operation | admin | editor | viewer | service |
|---|---|---|---|---|
| Create | N | N | N | Y (check-runner only) |
| Read | Y | Y | Y | Y |
| Update (resolve) | Y | Y | N | Y (check-runner only) |
| List | Y | Y | Y | Y |
| Delete | Y | N | N | N |

### Alert Rules Collection

| Operation | admin | editor | viewer | service |
|---|---|---|---|---|
| Create | Y | Y | N | N |
| Read | Y | Y | Y | N |
| Update | Y | Y | N | N |
| Delete | Y | N | N | N |
| List | Y | Y | Y | N |

## Access Control Rules

1. **Authentication**: All endpoints require a valid Appwrite JWT or API key.
2. **Role assignment**: Roles are stored in Appwrite user labels (`admin`, `editor`, `viewer`). The `service` role is implicit for API-key-authenticated requests.
3. **Enforcement**: Each Appwrite Function checks `req.headers['x-appwrite-user-id']` and the user's labels before processing. API-key requests are constrained to check-runner and read-only query operations.
4. **Default deny**: If no matching role is found, the request is rejected with `FORBIDDEN`.
5. **Check-runner privilege**: Only the `service` role (via server API key) can create check and incident documents. Human users cannot directly write to `checks` or `incidents`.
