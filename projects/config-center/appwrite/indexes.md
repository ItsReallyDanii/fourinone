# Appwrite Indexes

## Index Definitions

### Collection: `flags`

| Index Key | Type | Attributes | Order |
|---|---|---|---|
| `idx_flags_key` | unique | `key` | ASC |
| `idx_flags_enabled` | key | `enabled` | ASC |
| `idx_flags_tags` | key | `tags` | ASC |

### Collection: `rollout_rules`

| Index Key | Type | Attributes | Order |
|---|---|---|---|
| `idx_rules_flagKey` | key | `flagKey` | ASC |
| `idx_rules_flagKey_priority` | key | `flagKey`, `priority` | ASC, DESC |
| `idx_rules_type` | key | `type` | ASC |
| `idx_rules_enabled` | key | `enabled` | ASC |
