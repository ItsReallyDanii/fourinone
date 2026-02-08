# EXECUTION CONTROL DOCUMENT (LOCKED)

STATE: EXECUTE
VERSION: v1.0
SCOPE_LOCK: ENABLED
ASSUMPTION_EXPANSION: DISABLED
DEPENDENCY_EXPANSION: DISABLED

NON_NEGOTIABLES:
- Local-first development
- No external network calls in tests (unless explicitly marked integration)
- No scope expansion beyond MVP acceptance criteria
- Deterministic outputs for core validation paths

DELIVERABLES:
- Runnable scaffold
- Appwrite schema + index + permission definitions
- Function contracts
- Tests + acceptance report

DONE_DEFINITION:
- All required files exist
- Lint/test pass
- Acceptance checklist all green
- Repro steps verified from clean clone
