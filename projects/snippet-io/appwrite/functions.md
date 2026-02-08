# Appwrite Functions

## Function Definitions

### Function: createSnippet
**Runtime**: Node.js 18  
**Trigger**: HTTP POST  
**Endpoint**: `/snippets`  
**Purpose**: Create new code snippet with initial version

#### Input
```json
{
  "title": "string",
  "description": "string (optional)",
  "content": "string",
  "language": "string",
  "tags": ["string"] (optional)
}
```

#### Process
1. Validate request body against `snippet_schema_v1.json`
2. Extract user_id from session
3. Create snippet document in `snippets` collection
4. Create initial version (v1) in `snippet_versions` collection
5. Create tag associations in `snippet_tags` collection (if tags provided)
6. Return created snippet

#### Output
```json
{
  "$id": "string",
  "title": "string",
  "content": "string",
  "language": "string",
  "user_id": "string",
  "tags": ["string"],
  "latest_version": 1,
  "created_at": "ISO 8601"
}
```

---

### Function: updateSnippet
**Runtime**: Node.js 18  
**Trigger**: HTTP PUT  
**Endpoint**: `/snippets/{id}`  
**Purpose**: Update snippet (creates new version)

#### Input
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "content": "string (optional)",
  "language": "string (optional)",
  "tags": ["string"] (optional),
  "change_summary": "string (optional)"
}
```

#### Process
1. Verify snippet exists and user is owner
2. Validate partial updates
3. Increment version number
4. Create new version document in `snippet_versions`
5. Update snippet document with new version number and fields
6. Update tag associations (add/remove as needed)
7. Return updated snippet

#### Output
```json
{
  "$id": "string",
  "latest_version": 2,
  "updated_at": "ISO 8601",
  ...
}
```

---

### Function: deleteSnippet
**Runtime**: Node.js 18  
**Trigger**: HTTP DELETE  
**Endpoint**: `/snippets/{id}`  
**Purpose**: Delete snippet and all related data

#### Process
1. Verify snippet exists and user is owner
2. Delete all versions from `snippet_versions`
3. Delete all tag associations from `snippet_tags`
4. Delete all favorites from `favorites`
5. Delete snippet document
6. Return success

#### Output
```json
{
  "success": true
}
```

---

### Function: listSnippets
**Runtime**: Node.js 18  
**Trigger**: HTTP GET  
**Endpoint**: `/snippets`  
**Purpose**: List snippets with filters

#### Query Parameters
- `user_id` (optional): Filter by user
- `language` (optional): Filter by language
- `tags` (optional): Filter by tags (comma-separated)
- `limit` (default: 25, max: 100)
- `offset` (default: 0)

#### Process
1. Build Appwrite query from filters
2. Apply user permission filters (owner or public)
3. Execute query with pagination
4. Return results

#### Output
```json
{
  "documents": [...],
  "total": 42,
  "limit": 25,
  "offset": 0
}
```

---

### Function: getSnippet
**Runtime**: Node.js 18  
**Trigger**: HTTP GET  
**Endpoint**: `/snippets/{id}`  
**Purpose**: Get single snippet

#### Process
1. Fetch snippet by ID
2. Verify read permissions
3. Return snippet

---

### Function: listVersions
**Runtime**: Node.js 18  
**Trigger**: HTTP GET  
**Endpoint**: `/snippets/{id}/versions`  
**Purpose**: List all versions of a snippet

#### Process
1. Verify snippet exists and user has read access
2. Query `snippet_versions` where `snippet_id = {id}`
3. Order by version DESC
4. Return versions

---

### Function: getVersion
**Runtime**: Node.js 18  
**Trigger**: HTTP GET  
**Endpoint**: `/snippets/{id}/versions/{version}`  
**Purpose**: Get specific version

#### Process
1. Verify snippet read access
2. Fetch version document
3. Return version

---

### Function: addFavorite
**Runtime**: Node.js 18  
**Trigger**: HTTP POST  
**Endpoint**: `/favorites`  
**Purpose**: Add snippet to user favorites

#### Input
```json
{
  "snippet_id": "string"
}
```

#### Process
1. Verify snippet exists and user has read access
2. Check if favorite already exists
3. Create favorite document
4. Increment snippet.favorite_count
5. Return favorite

---

### Function: removeFavorite
**Runtime**: Node.js 18  
**Trigger**: HTTP DELETE  
**Endpoint**: `/favorites/{snippet_id}`  
**Purpose**: Remove from favorites

#### Process
1. Find favorite by user_id and snippet_id
2. Delete favorite document
3. Decrement snippet.favorite_count
4. Return success

---

### Function: listFavorites
**Runtime**: Node.js 18  
**Trigger**: HTTP GET  
**Endpoint**: `/favorites`  
**Purpose**: List user's favorite snippets

#### Process
1. Query favorites where `user_id = session.userId`
2. Join with snippets collection
3. Return favorites with snippet details

---

### Function: listTags
**Runtime**: Node.js 18  
**Trigger**: HTTP GET  
**Endpoint**: `/tags`  
**Purpose**: Get all unique tags (for autocomplete)

#### Process
1. Query distinct tags from `snippet_tags` collection
2. Filter by user permissions
3. Return unique tag list

## Triggers

All functions are HTTP-triggered (synchronous).

### HTTP Trigger Configuration
- **Method**: Specified per function (GET/POST/PUT/DELETE)
- **Authentication**: Required (Appwrite session)
- **Rate Limiting**: 60 requests/minute per user (Appwrite default)

## Environment Variables

### Required Variables
```
APPWRITE_FUNCTION_ENDPOINT
APPWRITE_FUNCTION_API_KEY
APPWRITE_FUNCTION_PROJECT_ID
DATABASE_ID
SNIPPETS_COLLECTION_ID
VERSIONS_COLLECTION_ID
TAGS_COLLECTION_ID
FAVORITES_COLLECTION_ID
```

### Optional Variables
```
LOG_LEVEL=info
MAX_SNIPPET_SIZE=50000
MAX_TAGS_PER_SNIPPET=20
```

## Function Security

### Input Validation
- All inputs validated against JSON schemas
- SQL injection prevention (not applicable - NoSQL)
- XSS prevention via content sanitization

### Authentication
- All functions require valid Appwrite session
- Session token validated on each request
- User ID extracted from session context

### Authorization
- Owner-only operations check `user_id` match
- Read operations verify document permissions
- Cascade operations verify ownership chain

### Error Handling
- Structured error responses
- No sensitive data in error messages
- Appropriate HTTP status codes
