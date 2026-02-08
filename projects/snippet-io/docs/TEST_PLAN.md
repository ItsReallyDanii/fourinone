# Test Plan

## Test Strategy

### Unit Tests
- Schema validation for all JSON schemas
- Individual function logic testing
- Permission check validation
- Mock Appwrite SDK responses

### Integration Tests
- Full CRUD operations through API
- Multi-version workflow testing
- Tag association and querying
- Favorite operations
- Marked as integration tests (may call external services)

### Local-First Testing
- All unit tests run without network calls
- Mock data fixtures for deterministic outputs
- No external Appwrite instance required for core tests

### Acceptance Testing
- Validation against acceptance criteria checklist
- End-to-end scenario testing
- Clean clone reproducibility

## Test Cases

### TC-001: Create Snippet
- **Type**: Unit
- **Input**: Valid snippet schema
- **Expected**: Snippet created with ID, initial version created
- **Validation**: Schema compliance, user_id set, timestamps populated

### TC-002: Create Snippet - Invalid Schema
- **Type**: Unit
- **Input**: Missing required fields
- **Expected**: 400 error with validation details
- **Validation**: Error message clarity

### TC-003: Update Snippet Creates Version
- **Type**: Integration
- **Input**: Existing snippet ID, updated content
- **Expected**: New version created, version number incremented
- **Validation**: Original version unchanged, new version exists

### TC-004: Permission - Non-Owner Update
- **Type**: Unit
- **Input**: Snippet owned by User A, update attempt by User B
- **Expected**: 403 Forbidden
- **Validation**: No changes persisted

### TC-005: Permission - Owner Read
- **Type**: Integration
- **Input**: User requests their own snippet
- **Expected**: Snippet returned with all fields
- **Validation**: Data integrity

### TC-006: Tag Association
- **Type**: Integration
- **Input**: Snippet with tags array
- **Expected**: Tags created/linked to snippet
- **Validation**: Tag documents exist, snippet.tags array populated

### TC-007: Tag Search
- **Type**: Integration
- **Input**: Query snippets by tag
- **Expected**: Only snippets with matching tag returned
- **Validation**: Index used, results accurate

### TC-008: Favorite Add
- **Type**: Integration
- **Input**: User favorites accessible snippet
- **Expected**: Favorite record created
- **Validation**: User can list favorites

### TC-009: Favorite Duplicate
- **Type**: Unit
- **Input**: Favorite same snippet twice
- **Expected**: 409 Conflict
- **Validation**: No duplicate records

### TC-010: List Versions
- **Type**: Integration
- **Input**: Snippet ID with multiple versions
- **Expected**: All versions returned in descending order
- **Validation**: Correct count, ordering

### TC-011: Cascade Delete Snippet
- **Type**: Integration
- **Input**: Delete snippet with versions and favorites
- **Expected**: Snippet, versions, and favorites removed
- **Validation**: Related records deleted

### TC-012: Schema Validation - All Schemas
- **Type**: Unit
- **Input**: Valid and invalid payloads for each schema
- **Expected**: Correct validation pass/fail
- **Validation**: JSON Schema compliance

## Acceptance Criteria

### Phase 1 Criteria (Current)
- [x] All documentation files completed (ARCHITECTURE, API_CONTRACTS, PERMISSIONS_MATRIX, TEST_PLAN)
- [x] All JSON schemas created and valid
- [x] All Appwrite definitions documented (collections, indexes, roles, functions)
- [ ] Schemas validate against sample data
- [ ] No runtime logic implemented (documentation only)
- [ ] All files under /projects/snippet-io

### Future Phase Criteria
- [ ] Functions implemented
- [ ] Integration tests pass
- [ ] Appwrite resources deployed
- [ ] API endpoints functional
- [ ] UI implemented
