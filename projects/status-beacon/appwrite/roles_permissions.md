# Appwrite Roles & Permissions

## Role Definitions

| Role | Appwrite Mapping | Description |
|---|---|---|
| `admin` | User label: `admin` | Full CRUD on all collections |
| `editor` | User label: `editor` | Create + read + update (no delete) |
| `viewer` | User label: `viewer` | Read-only access |
| `service` | API key (server-side) | Check-runner writes + query reads |

## Permission Rules

### Collection: `targets`

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

### Collection: `checks`

| Permission | Target |
|---|---|
| `read("label:admin")` | Admin read |
| `read("label:editor")` | Editor read |
| `read("label:viewer")` | Viewer read |
| `delete("label:admin")` | Admin delete |

> `create` and `update` on `checks` are performed exclusively by the check-runner function using a server API key, not via collection-level user permissions.

### Collection: `incidents`

| Permission | Target |
|---|---|
| `read("label:admin")` | Admin read |
| `read("label:editor")` | Editor read |
| `read("label:viewer")` | Viewer read |
| `update("label:admin")` | Admin resolve |
| `update("label:editor")` | Editor resolve |
| `delete("label:admin")` | Admin delete |

> `create` on `incidents` is performed exclusively by the check-runner function using a server API key.

### Collection: `alert_rules`

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

- `service` role (API key) accesses data through Appwrite Functions running with a server-side API key. The function itself enforces that service callers can only run checks and read queries.
- Document-level permissions are not used; collection-level permissions apply uniformly.
- No `any` or `users` wildcard permissions are granted.
