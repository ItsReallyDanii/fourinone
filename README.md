# fourinone

Execution-locked, phase-driven portfolio workspace for four Appwrite projects:

- **config-center** (remote config + feature flags)
- **status-beacon** (uptime checks + incident lifecycle)
- **snippet-io** (private snippet vault + search)
- **queue-me** (realtime waiting room)

This repo is built to keep AI-assisted implementation deterministic, auditable, and low-drift.

---

## Workspace Structure

```text
fourinone/
├── README.md
├── PORTFOLIO_ROADMAP.md
├── EXECUTION_CONTROL_DOCUMENT_LOCKED.md
├── CLAUDE_HANDOFF_MASTER.md
├── projects/
│   ├── config-center/
│   ├── status-beacon/
│   ├── snippet-io/
│   └── queue-me/
└── templates/
```

Each project is developed in **phases** with strict scope locks.

---

## Operating Model

All implementation follows a locked control document:

- `STATE=EXECUTE`
- **No scope expansion**
- **No assumption expansion**
- **No dependency expansion**
- **No edits outside targeted project folder**

Expected phase output format:

1. Changed files  
2. Tests/results  
3. Acceptance checklist (pass/fail)  
4. Blockers

---

## Current Progress

### ✅ config-center
- Phase 1 complete: docs, schemas, appwrite definitions
- Phase 2 complete: function stubs, AJV wiring, contract tests

### ✅ status-beacon
- Phase 1 complete: docs, schemas, appwrite definitions
- Phase 2 complete: function stubs, AJV wiring, tests + lint

### ✅ snippet-io
- Phase 1 complete: docs, schemas, appwrite definitions, acceptance report

### ⏳ queue-me
- Planned (same phased approach)

---

## How to Work in This Repo

### 1) Pick one project folder
Example: `projects/status-beacon`

### 2) Use its local lock file as source of truth
`/projects/<project>/EXECUTION_CONTROL_DOCUMENT_LOCKED.md`

### 3) Run only one phase at a time
- **Phase 1:** docs/schemas/appwrite definitions
- **Phase 2:** stubs/contracts/validators/tests
- Later phases: runtime logic, then UI, then hardening

### 4) Keep PRs small and merge per phase

---

## Example Prompt Contract (for coding agents)

```md
Work only in /projects/<project>.
Use /projects/<project>/EXECUTION_CONTROL_DOCUMENT_LOCKED.md as the single source of truth.
STATE=EXECUTE. No scope expansion. No assumption expansion. No dependency expansion.

Implement Phase <N> only.
No edits outside /projects/<project>.

Return exactly:
1) changed files
2) tests + results
3) phase checklist pass/fail
4) blockers
```

---

## Why This Repo Exists

This is a **control-plane style portfolio**: same engineering discipline stamped across multiple products.  
Goal: demonstrate reliable delivery patterns, not random prototype chaos.

---

## License

MIT (or your preferred license once finalized).
