# Appwrite Indexes

## Index Definitions

### Collection: `targets`

| Index Key | Type | Attributes | Order |
|---|---|---|---|
| `idx_targets_url` | unique | `url` | ASC |
| `idx_targets_enabled` | key | `enabled` | ASC |
| `idx_targets_tags` | key | `tags` | ASC |

### Collection: `checks`

| Index Key | Type | Attributes | Order |
|---|---|---|---|
| `idx_checks_targetId` | key | `targetId` | ASC |
| `idx_checks_targetId_checkedAt` | key | `targetId`, `checkedAt` | ASC, DESC |
| `idx_checks_status` | key | `status` | ASC |
| `idx_checks_checkedAt` | key | `checkedAt` | DESC |

### Collection: `incidents`

| Index Key | Type | Attributes | Order |
|---|---|---|---|
| `idx_incidents_targetId` | key | `targetId` | ASC |
| `idx_incidents_status` | key | `status` | ASC |
| `idx_incidents_targetId_status` | key | `targetId`, `status` | ASC, ASC |
| `idx_incidents_startedAt` | key | `startedAt` | DESC |

### Collection: `alert_rules`

| Index Key | Type | Attributes | Order |
|---|---|---|---|
| `idx_alert_rules_targetId` | key | `targetId` | ASC |
| `idx_alert_rules_enabled` | key | `enabled` | ASC |
| `idx_alert_rules_channel` | key | `channel` | ASC |
