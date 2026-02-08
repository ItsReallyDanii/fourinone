# Permissions Matrix

## Roles

### User
- Authenticated user
- Can create snippets
- Full control over owned snippets
- Read access to public snippets
- Can favorite any accessible snippet

### Guest
- Unauthenticated visitor
- Read-only access to public snippets (future phase)
- No create/update/delete permissions

## Resource Permissions

### Snippets Collection

| Action | Owner | Other Users | Guest |
|--------|-------|-------------|-------|
| Create | ✓ | ✓ | ✗ |
| Read (own) | ✓ | ✗ | ✗ |
| Read (public) | ✓ | ✓ | ✓* |
| Update | ✓ | ✗ | ✗ |
| Delete | ✓ | ✗ | ✗ |

*Future phase

### Snippet Versions Collection

| Action | Snippet Owner | Other Users | Guest |
|--------|---------------|-------------|-------|
| Create | ✓ (via update) | ✗ | ✗ |
| Read (own snippet) | ✓ | ✗ | ✗ |
| Read (public snippet) | ✓ | ✓ | ✓* |
| Update | ✗ (immutable) | ✗ | ✗ |
| Delete | ✗ (keep history) | ✗ | ✗ |

*Future phase

### Tags Collection

| Action | Owner | Other Users | Guest |
|--------|-------|-------------|-------|
| Create | ✓ (via snippet) | ✓ (via snippet) | ✗ |
| Read | ✓ | ✓ | ✓ |
| Update | ✗ (immutable) | ✗ | ✗ |
| Delete | ✓ (cascade) | ✗ | ✗ |

### Favorites Collection

| Action | Owner | Other Users | Guest |
|--------|-------|-------------|-------|
| Create | ✓ | ✗ | ✗ |
| Read | ✓ | ✗ | ✗ |
| Update | ✗ (N/A) | ✗ | ✗ |
| Delete | ✓ | ✗ | ✗ |

## Access Control Rules

### Rule 1: User Isolation
- Users can only access their own snippets by default
- Exception: snippets with `is_public: true` (future phase)

### Rule 2: Owner-Only Modifications
- Only snippet owner (user_id matches) can update or delete
- Enforced at database permission level and function validation

### Rule 3: Version Immutability
- Versions cannot be modified after creation
- Versions inherit parent snippet's permissions
- Deletion not allowed to preserve history

### Rule 4: Tag Visibility
- Tags are globally visible for search/autocomplete
- Tag creation restricted to authenticated users
- Tags automatically created when referenced in snippets

### Rule 5: Favorite Privacy
- Favorites are private to the user
- User can only manage their own favorites
- Favoriting requires read access to the snippet

### Rule 6: Cascade Deletion
- Deleting snippet deletes all versions
- Deleting snippet removes associated tags (if no other references)
- Deleting snippet removes from all user favorites

### Rule 7: Read Permission Inheritance
- Snippet versions inherit read permissions from parent snippet
- Tags inherit permissions from their usage context
