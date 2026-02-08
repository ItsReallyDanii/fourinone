# Appwrite Roles & Permissions

## Role Definitions

### Built-in Roles

#### Role: users
- **Type**: Appwrite built-in
- **Description**: All authenticated users
- **Scope**: Global
- **Assignment**: Automatic on user authentication

#### Role: guests
- **Type**: Appwrite built-in
- **Description**: Unauthenticated visitors
- **Scope**: Global
- **Assignment**: Default for non-authenticated requests

### Custom Roles
*No custom roles defined for MVP - using Appwrite's document-level permissions*

## Permission Rules

### Document-Level Permissions

#### Snippets Collection

**Create Permission**:
```
Role: user:{$userId}
```
- Any authenticated user can create snippets
- User ID automatically captured from session

**Read Permission**:
```
Role: user:{snippet.user_id}
```
- Only snippet owner can read (MVP)
- Future: Add `any` role for public snippets when `is_public: true`

**Update Permission**:
```
Role: user:{snippet.user_id}
```
- Only snippet owner can update

**Delete Permission**:
```
Role: user:{snippet.user_id}
```
- Only snippet owner can delete

---

#### Snippet Versions Collection

**Create Permission**:
```
Role: user:{version.user_id}
```
- Created via function when snippet is updated
- User must own parent snippet

**Read Permission**:
```
Role: user:{version.user_id}
```
- Inherit from parent snippet ownership
- Only owner can view version history

**Update Permission**:
```
None
```
- Versions are immutable

**Delete Permission**:
```
None
```
- Versions preserved for history (cascade delete via function)

---

#### Snippet Tags Collection

**Create Permission**:
```
Role: users
```
- Any authenticated user (via snippet creation/update)
- Actual creation handled by functions

**Read Permission**:
```
Role: users
```
- All authenticated users can read tags (for search/autocomplete)
- No sensitive data in tags

**Update Permission**:
```
None
```
- Tags are immutable once created

**Delete Permission**:
```
Role: user:{tag.user_id}
```
- Only snippet owner can delete tag associations
- Handled via cascade when snippet deleted

---

#### Favorites Collection

**Create Permission**:
```
Role: user:{$userId}
```
- Any authenticated user can create favorites
- Must have read access to the snippet being favorited

**Read Permission**:
```
Role: user:{favorite.user_id}
```
- Users can only see their own favorites

**Update Permission**:
```
None
```
- Favorites are simple associations (no update needed)

**Delete Permission**:
```
Role: user:{favorite.user_id}
```
- Users can only delete their own favorites

## Access Control Implementation

### Function-Level Validation

Functions must validate:
1. **User Authentication**: Verify session token
2. **Ownership**: Check `user_id` matches session user for owner-only operations
3. **Existence**: Verify referenced documents exist
4. **Read Access**: Verify user can read snippet before favoriting
5. **Business Rules**: Tag limits, version sequencing, etc.

### Security Rules

#### Rule: User Isolation
```javascript
// Snippet query must filter by user_id
Query.equal('user_id', session.userId)
```

#### Rule: Version Sequencing
```javascript
// New version number = latest_version + 1
version = snippet.latest_version + 1
```

#### Rule: Tag Normalization
```javascript
// Tags stored as lowercase
tag = inputTag.toLowerCase().replace(/[^a-z0-9-_]/g, '')
```

#### Rule: Cascade Delete
```javascript
// On snippet delete, also delete:
// - All snippet_versions where snippet_id = snippet.$id
// - All snippet_tags where snippet_id = snippet.$id  
// - All favorites where snippet_id = snippet.$id
```

### Future: Public Snippets

When `is_public: true` feature is implemented:

**Snippets Read Permission** (modified):
```
Roles: [
  user:{snippet.user_id},
  any  // if snippet.is_public === true
]
```

**Versions Read Permission** (modified):
```
Roles: [
  user:{version.user_id},
  any  // if parent snippet.is_public === true
]
```
