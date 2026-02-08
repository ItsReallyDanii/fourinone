# Test Plan

## Test Strategy

- **Unit tests**: Validate schema compliance, rule evaluation logic, and input validation. Run locally with Vitest. No external network calls.
- **Integration tests (Phase 2+)**: Hit a local Appwrite instance to verify end-to-end CRUD and permission enforcement. Marked with `.integration.test.ts` suffix and excluded from default runs.
- **Determinism**: All unit tests must produce deterministic results. Percentage-based rollout tests use fixed seeds.

## Test Cases

### Schema Validation

| ID | Description | Expected |
|---|---|---|
| S-01 | Valid flag document passes `flag_schema_v1.json` | pass |
| S-02 | Flag missing required `key` field | fail validation |
| S-03 | Flag with invalid `type` value | fail validation |
| S-04 | Valid rollout rule passes `rollout_rule_schema_v1.json` | pass |
| S-05 | Rollout rule with `type=percentage` but missing `percentage` field | fail validation |
| S-06 | Rollout rule with `percentage` outside 0-100 | fail validation |
| S-07 | Rollout rule with `type=user_list` but missing `userIds` | fail validation |

### Flag CRUD

| ID | Description | Expected |
|---|---|---|
| F-01 | Create a new flag with valid payload | 200 + flag object |
| F-02 | Create flag with duplicate key | 409 FLAG_KEY_EXISTS |
| F-03 | Get existing flag by key | 200 + flag object |
| F-04 | Get non-existent flag | 404 FLAG_NOT_FOUND |
| F-05 | Update flag `enabled` field | 200 + updated flag |
| F-06 | Delete flag by key | 200 + null |
| F-07 | List flags with default pagination | 200 + array |

### Rollout Rule CRUD

| ID | Description | Expected |
|---|---|---|
| R-01 | Create percentage rule | 200 + rule object |
| R-02 | Create user_list rule | 200 + rule object |
| R-03 | Create environment rule | 200 + rule object |
| R-04 | Delete rule by ID | 200 + null |

### Evaluate

| ID | Description | Expected |
|---|---|---|
| E-01 | Evaluate disabled flag | returns defaultValue |
| E-02 | Evaluate flag with no rules | returns defaultValue |
| E-03 | Evaluate flag with matching percentage rule (seeded) | returns rule value |
| E-04 | Evaluate flag with user_list rule — user in list | returns rule value |
| E-05 | Evaluate flag with user_list rule — user not in list | returns defaultValue |
| E-06 | Evaluate flag with environment rule — match | returns rule value |
| E-07 | Evaluate flag with environment rule — no match | returns defaultValue |
| E-08 | Multiple rules — highest priority wins | returns highest-priority rule value |

### Permissions

| ID | Description | Expected |
|---|---|---|
| P-01 | Viewer cannot create flag | 403 |
| P-02 | Editor cannot delete flag | 403 |
| P-03 | Service role can evaluate | 200 |
| P-04 | Unauthenticated request | 401 |

## Acceptance Criteria

| # | Criterion | Phase |
|---|---|---|
| AC-1 | All required files exist per file tree | 1 |
| AC-2 | `flag_schema_v1.json` is valid JSON Schema Draft-07 | 1 |
| AC-3 | `rollout_rule_schema_v1.json` is valid JSON Schema Draft-07 | 1 |
| AC-4 | Collections, indexes, permissions, and functions are fully defined | 1 |
| AC-5 | Schema validation unit tests pass (S-01 through S-07) | 2 |
| AC-6 | Flag CRUD tests pass (F-01 through F-07) | 2 |
| AC-7 | Evaluate tests pass (E-01 through E-08) | 2 |
| AC-8 | Permission tests pass (P-01 through P-04) | 2 |
