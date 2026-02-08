# Appwrite Collections

## Collection Definitions

### Collection: snippets
**ID**: `snippets`  
**Name**: Snippets  
**Purpose**: Store user code snippets

#### Attributes
| Name | Type | Size | Required | Array | Default | Description |
|------|------|------|----------|-------|---------|-------------|
| title | string | 200 | Yes | No | - | Snippet title |
| description | string | 1000 | No | No | - | Snippet description |
| content | string | 50000 | Yes | No | - | Code content |
| language | string | 50 | Yes | No | - | Programming language |
| user_id | string | 36 | Yes | No | - | Owner user ID |
| tags | string | 50 | No | Yes | [] | Tag array |
| is_public | boolean | - | No | No | false | Public visibility flag |
| latest_version | integer | - | No | No | 1 | Current version number |
| favorite_count | integer | - | No | No | 0 | Favorite counter |
| created_at | datetime | - | Yes | No | now() | Creation timestamp |
| updated_at | datetime | - | Yes | No | now() | Update timestamp |

#### Permissions
- **Create**: `user:{user_id}` (any authenticated user)
- **Read**: `user:{user_id}` (owner only, expandable to public later)
- **Update**: `user:{user_id}` (owner only)
- **Delete**: `user:{user_id}` (owner only)

---

### Collection: snippet_versions
**ID**: `snippet_versions`  
**Name**: Snippet Versions  
**Purpose**: Store version history of snippets

#### Attributes
| Name | Type | Size | Required | Array | Default | Description |
|------|------|------|----------|-------|---------|-------------|
| snippet_id | string | 36 | Yes | No | - | Parent snippet ID |
| version | integer | - | Yes | No | - | Version number |
| title | string | 200 | Yes | No | - | Title at version |
| description | string | 1000 | No | No | - | Description at version |
| content | string | 50000 | Yes | No | - | Content at version |
| language | string | 50 | Yes | No | - | Language at version |
| user_id | string | 36 | Yes | No | - | User who created version |
| change_summary | string | 500 | No | No | - | Version change notes |
| tags | string | 50 | No | Yes | [] | Tags at version |
| created_at | datetime | - | Yes | No | now() | Version creation time |

#### Permissions
- **Create**: `user:{user_id}` (via function only)
- **Read**: `user:{user_id}` (owner of parent snippet)
- **Update**: None (immutable)
- **Delete**: None (preserve history)

---

### Collection: snippet_tags
**ID**: `snippet_tags`  
**Name**: Snippet Tags  
**Purpose**: Tag-snippet associations for search and filtering

#### Attributes
| Name | Type | Size | Required | Array | Default | Description |
|------|------|------|----------|-------|---------|-------------|
| tag | string | 50 | Yes | No | - | Tag name (normalized) |
| snippet_id | string | 36 | Yes | No | - | Associated snippet ID |
| user_id | string | 36 | Yes | No | - | Snippet owner ID |
| created_at | datetime | - | Yes | No | now() | Association timestamp |

#### Permissions
- **Create**: `user:{user_id}` (via function only)
- **Read**: Any authenticated user (for search)
- **Update**: None (immutable)
- **Delete**: `user:{user_id}` (owner only, cascade)

---

### Collection: favorites
**ID**: `favorites`  
**Name**: Favorites  
**Purpose**: User favorite snippet associations

#### Attributes
| Name | Type | Size | Required | Array | Default | Description |
|------|------|------|----------|-------|---------|-------------|
| user_id | string | 36 | Yes | No | - | User who favorited |
| snippet_id | string | 36 | Yes | No | - | Favorited snippet ID |
| created_at | datetime | - | Yes | No | now() | Favorite timestamp |

#### Permissions
- **Create**: `user:{user_id}` (authenticated users)
- **Read**: `user:{user_id}` (own favorites only)
- **Update**: None (N/A)
- **Delete**: `user:{user_id}` (own favorites only)

## Schema

All collections follow the schemas defined in:
- `schemas/snippet_schema_v1.json`
- `schemas/snippet_version_schema_v1.json`
- `schemas/snippet_tag_schema_v1.json`
- `schemas/favorite_schema_v1.json`
