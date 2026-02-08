# Test Plan

## Test Strategy

- **Unit tests**: Validate schema compliance, input validation, and contract shapes. Run locally with Vitest. No external network calls.
- **Integration tests (Phase 2+)**: Hit a local Appwrite instance to verify end-to-end CRUD, check execution, incident lifecycle, and permission enforcement. Marked with `.integration.test.ts` suffix and excluded from default runs.
- **Determinism**: All unit tests must produce deterministic results. Timestamp-dependent tests use fixed/mocked dates.

## Test Cases

### Schema Validation — Targets

| ID | Description | Expected |
|---|---|---|
| ST-01 | Valid target document passes `target_schema_v1.json` | pass |
| ST-02 | Target missing required `url` field | fail validation |
| ST-03 | Target with invalid `method` value | fail validation |
| ST-04 | Target with `intervalSeconds` below minimum (1) | fail validation |
| ST-05 | Target with `timeoutMs` below minimum (100) | fail validation |

### Schema Validation — Checks

| ID | Description | Expected |
|---|---|---|
| SC-01 | Valid check document passes `check_schema_v1.json` | pass |
| SC-02 | Check missing required `targetId` | fail validation |
| SC-03 | Check with invalid `status` enum value | fail validation |
| SC-04 | Check with negative `latencyMs` | fail validation |

### Schema Validation — Incidents

| ID | Description | Expected |
|---|---|---|
| SI-01 | Valid incident document passes `incident_schema_v1.json` | pass |
| SI-02 | Incident missing required `targetId` | fail validation |
| SI-03 | Incident with invalid `status` enum value | fail validation |
| SI-04 | Incident with `resolvedAt` but status still `open` | fail validation |

### Schema Validation — Alert Rules

| ID | Description | Expected |
|---|---|---|
| SA-01 | Valid alert rule passes `alert_rule_schema_v1.json` | pass |
| SA-02 | Alert rule missing required `channel` | fail validation |
| SA-03 | Alert rule with invalid `channel` enum | fail validation |
| SA-04 | Alert rule with empty `events` array | fail validation |
| SA-05 | Alert rule with `channel=webhook` but missing `endpoint` | fail validation |

### Target CRUD

| ID | Description | Expected |
|---|---|---|
| T-01 | Create target with valid payload | 200 + target object |
| T-02 | Create target with duplicate URL | 409 TARGET_URL_EXISTS |
| T-03 | Get existing target by ID | 200 + target object |
| T-04 | Get non-existent target | 404 TARGET_NOT_FOUND |
| T-05 | Update target `enabled` field | 200 + updated target |
| T-06 | Delete target by ID | 200 + null |
| T-07 | List targets with default pagination | 200 + array |

### Check Execution

| ID | Description | Expected |
|---|---|---|
| CE-01 | Check-runner records "up" check for healthy target | check.status = "up" |
| CE-02 | Check-runner records "down" check for unreachable target | check.status = "down" |
| CE-03 | Check-runner creates incident on first failure | incident.status = "open" |
| CE-04 | Check-runner resolves incident when target recovers | incident.status = "resolved" |

### Alert Rules

| ID | Description | Expected |
|---|---|---|
| AR-01 | Create webhook alert rule | 200 + rule object |
| AR-02 | Delete alert rule | 200 + null |
| AR-03 | Alert fires on incident.opened event | notification dispatched |

### Permissions

| ID | Description | Expected |
|---|---|---|
| P-01 | Viewer cannot create target | 403 |
| P-02 | Editor cannot delete target | 403 |
| P-03 | Service role can write checks | 200 |
| P-04 | Unauthenticated request | 401 |

## Acceptance Criteria

| # | Criterion | Phase |
|---|---|---|
| AC-1 | All required files exist per file tree | 1 |
| AC-2 | `target_schema_v1.json` is valid JSON Schema Draft-07 | 1 |
| AC-3 | `check_schema_v1.json` is valid JSON Schema Draft-07 | 1 |
| AC-4 | `incident_schema_v1.json` is valid JSON Schema Draft-07 | 1 |
| AC-5 | `alert_rule_schema_v1.json` is valid JSON Schema Draft-07 | 1 |
| AC-6 | Collections, indexes, permissions, and functions are fully defined | 1 |
| AC-7 | Schema validation unit tests pass (ST/SC/SI/SA series) | 2 |
| AC-8 | Target CRUD tests pass (T-01 through T-07) | 2 |
| AC-9 | Check execution tests pass (CE-01 through CE-04) | 2 |
| AC-10 | Permission tests pass (P-01 through P-04) | 2 |
