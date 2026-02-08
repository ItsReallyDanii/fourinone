# Appwrite Roles & Permissions

## Role Definitions

| Role | Appwrite Mapping | Description |
|---|---|---|
| `admin` | User label: `admin` | Full CRUD on all collections |
| `editor` | User label: `editor` | Create + read + update (no delete) |
| `viewer` | User label: `viewer` | Read-only access |
| `service` | API key (server-side) | Evaluate-only; no collection browsing |

## Permission Rules

### Collection: `flags`

| Permission | Target |
|---|---|
| `read("label:admin")` | Admin read |
| `read("label:editor")` | Editor read |
| `read("label:viewer")` | Viewer read |
| `create("label:admin")` | Admin create |
| `create("label:editor")` | Editor create |
| `update("label:admin")` | Admin update |
| `update("label:editor")` | Editor update |
| `delete("label:admin")` | Admin delete |

### Collection: `rollout_rules`

| Permission | Target |
|---|---|
| `read("label:admin")` | Admin read |
| `read("label:editor")` | Editor read |
| `read("label:viewer")` | Viewer read |
| `create("label:admin")` | Admin create |
| `create("label:editor")` | Editor create |
| `update("label:admin")` | Admin update |
| `update("label:editor")` | Editor update |
| `delete("label:admin")` | Admin delete |

### Notes

- `service` role (API key) accesses data through Appwrite Functions running with a server-side API key. The function itself enforces evaluate-only access for service callers.
- Document-level permissions are not used; collection-level permissions apply uniformly.
- No `any` or `users` wildcard permissions are granted.
