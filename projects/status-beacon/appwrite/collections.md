# Appwrite Collections

## Collection Definitions

### 1. `targets`

- **Collection ID**: `targets`
- **Database ID**: `status_beacon_db`
- **Document Security**: Enabled

#### Attributes

| Attribute | Type | Size | Required | Default | Description |
|---|---|---|---|---|---|
| `name` | string | 128 | yes | — | Human-readable target name |
| `url` | string | 2048 | yes | — | URL to probe |
| `method` | string | 8 | yes | `"GET"` | HTTP method: `GET`, `HEAD`, `POST` |
| `intervalSeconds` | integer | — | yes | `60` | Seconds between checks (min 1) |
| `timeoutMs` | integer | — | yes | `5000` | Request timeout in ms (min 100) |
| `expectedStatusCode` | integer | — | no | `200` | Expected HTTP status code |
| `enabled` | boolean | — | yes | `true` | Master on/off switch |
| `tags` | string[] | 64 | no | `[]` | Categorization tags |

---

### 2. `checks`

- **Collection ID**: `checks`
- **Database ID**: `status_beacon_db`
- **Document Security**: Enabled

#### Attributes

| Attribute | Type | Size | Required | Default | Description |
|---|---|---|---|---|---|
| `targetId` | string | 36 | yes | — | References `targets.$id` |
| `status` | string | 16 | yes | — | `up`, `down`, `degraded` |
| `statusCode` | integer | — | no | `null` | HTTP response status code |
| `latencyMs` | integer | — | yes | — | Response time in milliseconds |
| `errorMessage` | string | 1024 | no | `null` | Error description if check failed |
| `checkedAt` | string | 30 | yes | — | ISO-8601 timestamp of the check |

---

### 3. `incidents`

- **Collection ID**: `incidents`
- **Database ID**: `status_beacon_db`
- **Document Security**: Enabled

#### Attributes

| Attribute | Type | Size | Required | Default | Description |
|---|---|---|---|---|---|
| `targetId` | string | 36 | yes | — | References `targets.$id` |
| `status` | string | 16 | yes | — | `open`, `resolved` |
| `title` | string | 256 | yes | — | Auto-generated incident title |
| `startedAt` | string | 30 | yes | — | ISO-8601 timestamp when incident opened |
| `resolvedAt` | string | 30 | no | `null` | ISO-8601 timestamp when resolved |
| `checkIds` | string[] | 36 | no | `[]` | Related check document IDs |

---

### 4. `alert_rules`

- **Collection ID**: `alert_rules`
- **Database ID**: `status_beacon_db`
- **Document Security**: Enabled

#### Attributes

| Attribute | Type | Size | Required | Default | Description |
|---|---|---|---|---|---|
| `name` | string | 128 | yes | — | Human-readable rule name |
| `targetId` | string | 36 | yes | — | Target to watch (`*` = all targets) |
| `channel` | string | 16 | yes | — | `webhook`, `email` |
| `endpoint` | string | 2048 | no | `null` | Webhook URL; required when `channel=webhook` |
| `email` | string | 256 | no | `null` | Email address; required when `channel=email` |
| `events` | string[] | 32 | yes | — | Event types: `incident.opened`, `incident.resolved` |
| `enabled` | boolean | — | yes | `true` | Rule on/off switch |
