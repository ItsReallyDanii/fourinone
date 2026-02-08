# Appwrite Indexes

## Index Definitions

### Collection: snippets

#### Index: idx_user_id
- **Type**: Key
- **Attributes**: `user_id` (ASC)
- **Purpose**: Fast lookup of user's snippets
- **Used By**: GET /snippets?user_id={id}

#### Index: idx_language
- **Type**: Key
- **Attributes**: `language` (ASC)
- **Purpose**: Filter snippets by programming language
- **Used By**: GET /snippets?language={lang}

#### Index: idx_created_at
- **Type**: Key
- **Attributes**: `created_at` (DESC)
- **Purpose**: Sort snippets by creation date
- **Used By**: GET /snippets (default ordering)

#### Index: idx_updated_at
- **Type**: Key
- **Attributes**: `updated_at` (DESC)
- **Purpose**: Sort snippets by last update
- **Used By**: GET /snippets?sort=updated

#### Index: idx_user_language
- **Type**: Key
- **Attributes**: `user_id` (ASC), `language` (ASC)
- **Purpose**: Combined filter for user's snippets by language
- **Used By**: GET /snippets?user_id={id}&language={lang}

#### Index: idx_is_public
- **Type**: Key
- **Attributes**: `is_public` (ASC)
- **Purpose**: Filter public snippets (future phase)
- **Used By**: Public snippet browsing

---

### Collection: snippet_versions

#### Index: idx_snippet_id
- **Type**: Key
- **Attributes**: `snippet_id` (ASC)
- **Purpose**: Get all versions of a snippet
- **Used By**: GET /snippets/{id}/versions

#### Index: idx_snippet_version
- **Type**: Unique
- **Attributes**: `snippet_id` (ASC), `version` (ASC)
- **Purpose**: Ensure unique version numbers per snippet
- **Used By**: Version creation validation

#### Index: idx_snippet_created
- **Type**: Key
- **Attributes**: `snippet_id` (ASC), `created_at` (DESC)
- **Purpose**: Get versions ordered by creation time
- **Used By**: GET /snippets/{id}/versions (chronological)

---

### Collection: snippet_tags

#### Index: idx_tag
- **Type**: Key
- **Attributes**: `tag` (ASC)
- **Purpose**: Search snippets by tag
- **Used By**: GET /snippets?tags={tag}

#### Index: idx_snippet_id
- **Type**: Key
- **Attributes**: `snippet_id` (ASC)
- **Purpose**: Get all tags for a snippet
- **Used By**: Tag management operations

#### Index: idx_tag_snippet
- **Type**: Unique
- **Attributes**: `tag` (ASC), `snippet_id` (ASC)
- **Purpose**: Prevent duplicate tag associations
- **Used By**: Tag creation validation

#### Index: idx_user_tag
- **Type**: Key
- **Attributes**: `user_id` (ASC), `tag` (ASC)
- **Purpose**: Get user's snippets by tag
- **Used By**: GET /snippets?user_id={id}&tags={tag}

---

### Collection: favorites

#### Index: idx_user_id
- **Type**: Key
- **Attributes**: `user_id` (ASC)
- **Purpose**: Get all favorites for a user
- **Used By**: GET /favorites

#### Index: idx_snippet_id
- **Type**: Key
- **Attributes**: `snippet_id` (ASC)
- **Purpose**: Find users who favorited a snippet
- **Used By**: Favorite count calculations

#### Index: idx_user_snippet
- **Type**: Unique
- **Attributes**: `user_id` (ASC), `snippet_id` (ASC)
- **Purpose**: Prevent duplicate favorites
- **Used By**: POST /favorites validation

#### Index: idx_user_created
- **Type**: Key
- **Attributes**: `user_id` (ASC), `created_at` (DESC)
- **Purpose**: Get favorites ordered by time
- **Used By**: GET /favorites (chronological)
