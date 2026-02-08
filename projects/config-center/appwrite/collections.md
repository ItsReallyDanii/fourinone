# Appwrite Collections

## Collection Definitions

### 1. `flags`

- **Collection ID**: `flags`
- **Database ID**: `config_center_db`
- **Document Security**: Enabled

#### Attributes

| Attribute | Type | Size | Required | Default | Description |
|---|---|---|---|---|---|
| `key` | string | 128 | yes | — | Unique flag identifier (slug) |
| `description` | string | 512 | no | `""` | Human-readable description |
| `type` | string | 16 | yes | — | Value type: `boolean`, `string`, `number`, `json` |
| `defaultValue` | string | 2048 | yes | — | JSON-encoded default value |
| `enabled` | boolean | — | yes | `true` | Master on/off switch |
| `tags` | string[] | 64 | no | `[]` | Categorization tags |

---

### 2. `rollout_rules`

- **Collection ID**: `rollout_rules`
- **Database ID**: `config_center_db`
- **Document Security**: Enabled

#### Attributes

| Attribute | Type | Size | Required | Default | Description |
|---|---|---|---|---|---|
| `flagKey` | string | 128 | yes | — | References `flags.key` |
| `type` | string | 32 | yes | — | Rule type: `percentage`, `user_list`, `environment` |
| `value` | string | 2048 | yes | — | JSON-encoded value to return when rule matches |
| `percentage` | integer | — | no | `null` | 0-100; required when `type=percentage` |
| `userIds` | string[] | 256 | no | `[]` | User IDs; required when `type=user_list` |
| `environment` | string | 32 | no | `null` | Target environment; required when `type=environment` |
| `priority` | integer | — | yes | `0` | Higher number = higher precedence |
| `enabled` | boolean | — | yes | `true` | Rule on/off switch |
