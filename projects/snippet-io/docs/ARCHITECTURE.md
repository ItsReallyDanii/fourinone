# Architecture

## Overview
snippet-io is a code snippet management system that allows users to create, version, tag, and favorite code snippets. The system is built on Appwrite backend with serverless functions for business logic.

## Components

### Core Services
- **Snippet Service**: CRUD operations for code snippets
- **Version Service**: Manages snippet version history
- **Tag Service**: Tag-based organization and search
- **Favorite Service**: User favorites management

### Data Storage
- **Appwrite Database**: Primary data store for snippets, versions, tags, and favorites
- **Appwrite Storage**: Optional binary/file attachments (future phase)

### Authentication & Authorization
- **Appwrite Auth**: User authentication and session management
- **Role-Based Access Control**: Owner/read-only permissions per snippet

## Data Flow

### Create Snippet Flow
1. User submits snippet via API
2. Function validates schema and permissions
3. Snippet document created in snippets collection
4. Initial version created in snippet_versions collection
5. Auto-tagged if tags provided
6. Response with created snippet ID

### Version Snippet Flow
1. User updates existing snippet
2. Function validates ownership
3. New version document created with incremented version number
4. Original snippet updated with latest_version reference
5. Response with new version ID

### Search/Filter Flow
1. User queries with filters (tags, language, user_id)
2. Function builds Appwrite query using indexes
3. Results filtered by read permissions
4. Paginated response returned

## Technology Stack
- Appwrite (Backend)
- Node.js / Python (Functions)
- JSON Schema (Validation)
