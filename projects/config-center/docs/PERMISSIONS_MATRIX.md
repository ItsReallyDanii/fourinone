# Permissions Matrix

## Roles

| Role | Description |
|---|---|
| `admin` | Full access to all flag and rule operations |
| `editor` | Create, read, update flags and rules; cannot delete |
| `viewer` | Read-only access to flags, rules, and evaluate |
| `service` | Server-to-server via API key; evaluate-only |

## Resource Permissions

### Flags Collection

| Operation | admin | editor | viewer | service |
|---|---|---|---|---|
| Create flag | Y | Y | N | N |
| Read flag | Y | Y | Y | Y |
| Update flag | Y | Y | N | N |
| Delete flag | Y | N | N | N |
| List flags | Y | Y | Y | N |

### Rollout Rules Collection

| Operation | admin | editor | viewer | service |
|---|---|---|---|---|
| Create rule | Y | Y | N | N |
| Read rule | Y | Y | Y | N |
| Update rule | Y | Y | N | N |
| Delete rule | Y | N | N | N |
| List rules | Y | Y | Y | N |

### Evaluate

| Operation | admin | editor | viewer | service |
|---|---|---|---|---|
| Evaluate flag | Y | Y | Y | Y |

## Access Control Rules

1. **Authentication**: All endpoints require a valid Appwrite JWT or API key.
2. **Role assignment**: Roles are stored in Appwrite user labels (`admin`, `editor`, `viewer`). The `service` role is implicit for API-key-authenticated requests.
3. **Enforcement**: Each Appwrite Function checks `req.headers['x-appwrite-user-id']` and the user's labels before processing. API-key requests bypass user-label checks and are constrained to evaluate-only.
4. **Default deny**: If no matching role is found, the request is rejected with `FORBIDDEN`.
5. **No cross-project access**: Collections use Appwrite document-level permissions scoped to the project.
