# API Contracts

## Endpoints

### Snippet Management

#### POST /snippets
Create a new snippet
- **Request Body**: `snippet_schema_v1.json`
- **Response**: Created snippet object with ID
- **Auth**: Required

#### GET /snippets/{id}
Get snippet by ID
- **Response**: Snippet object
- **Auth**: Required (owner or public snippet)

#### PUT /snippets/{id}
Update snippet (creates new version)
- **Request Body**: Partial `snippet_schema_v1.json`
- **Response**: Updated snippet object with new version
- **Auth**: Required (owner only)

#### DELETE /snippets/{id}
Delete snippet
- **Response**: 204 No Content
- **Auth**: Required (owner only)

#### GET /snippets
List snippets with filters
- **Query Params**: 
  - `user_id` (string)
  - `tags` (array)
  - `language` (string)
  - `limit` (int, default: 25)
  - `offset` (int, default: 0)
- **Response**: Array of snippet objects
- **Auth**: Required

### Version Management

#### GET /snippets/{id}/versions
Get all versions of a snippet
- **Response**: Array of `snippet_version_schema_v1.json`
- **Auth**: Required (owner or public snippet)

#### GET /snippets/{id}/versions/{version}
Get specific version
- **Response**: `snippet_version_schema_v1.json`
- **Auth**: Required (owner or public snippet)

### Tag Management

#### GET /tags
List all tags
- **Response**: Array of tag strings
- **Auth**: Required

#### POST /snippets/{id}/tags
Add tags to snippet
- **Request Body**: `{ "tags": ["tag1", "tag2"] }`
- **Response**: Updated snippet object
- **Auth**: Required (owner only)

### Favorites

#### POST /favorites
Add snippet to favorites
- **Request Body**: `favorite_schema_v1.json`
- **Response**: Created favorite object
- **Auth**: Required

#### DELETE /favorites/{snippet_id}
Remove from favorites
- **Response**: 204 No Content
- **Auth**: Required

#### GET /favorites
List user's favorites
- **Response**: Array of favorite objects with snippet details
- **Auth**: Required

## Request/Response Schemas

### Snippet Schema
See `schemas/snippet_schema_v1.json`

### Version Schema
See `schemas/snippet_version_schema_v1.json`

### Tag Schema
See `schemas/snippet_tag_schema_v1.json`

### Favorite Schema
See `schemas/favorite_schema_v1.json`

## Error Codes

### 400 Bad Request
- Invalid request body
- Schema validation failed
- Missing required fields

### 401 Unauthorized
- Missing authentication token
- Invalid or expired token

### 403 Forbidden
- Insufficient permissions
- Not snippet owner

### 404 Not Found
- Snippet not found
- Version not found

### 409 Conflict
- Duplicate snippet title (for same user)
- Favorite already exists

### 422 Unprocessable Entity
- Business logic validation failed
- Invalid language specified
- Tag limit exceeded

### 500 Internal Server Error
- Database error
- Function execution error
