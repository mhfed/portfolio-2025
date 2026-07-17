---
name: persistent-dev-agent
description: |
  Persistently loop on a dev task until it's fully complete and all quality gates pass.
  The AI MUST keep running — fixing and retrying — until both lint and typecheck pass with zero errors.
metadata:
  author: project
  version: '1.0.0'
  argument-hint: <task-description>
---

# Persistent Dev Agent

Loop on a development task until all quality gates are green.

## Behavior

When invoked, the agent MUST:

1. **Understand** the task from the argument or conversation context
2. **Implement** the changes needed
3. **Check lint** — run `npm run lint` (or detect the project's available lint command). If `eslint` is not installed or the command fails because the tool isn't found, install it first (`npm install --save-dev eslint`) and create a basic config if missing.
4. **Check types** — run `npx tsc --noEmit` (or equivalent type-check command)
5. If **either fails**, fix the errors and go back to step 3
6. Only when **both pass with zero errors**, consider the task done

## Non-negotiable Rules

- **Loop until green**: Do NOT stop or present the task as complete until lint AND typecheck both pass. Keep fixing and retrying.
- **Auto-fix first**: If `npm run lint` reports auto-fixable errors, run `npm run lint -- --fix` first, then re-check.
- **Explain each iteration**: Every time a gate fails, tell the user what failed and what you're fixing before looping back.
- **Install missing tools**: If `eslint` isn't installed, install it and set up a basic config rather than skipping the gate.
- **Max iterations**: If after 10 loops the gates still don't pass, explain the remaining issues and ask for guidance.
- **Stay in scope**: Only modify files relevant to the task. Don't refactor unrelated code.

## Quality Gates

| Gate       | Command                                 | Pass Condition             |
| ---------- | --------------------------------------- | -------------------------- |
| Lint       | `npm run lint` (or detected equivalent) | Zero errors, zero warnings |
| TypeScript | `npx tsc --noEmit`                      | Zero errors                |

The agent should detect the project's package manager (`npm`, `pnpm`, `yarn`, `bun`) from `package.json` or lockfile and use the appropriate commands.

## Usage

```
/persistent-dev-agent <task-description>
```

Examples:

```
/persistent-dev-agent Add error boundaries to all async components
/persistent-dev-agent Fix the navigation flicker on route change
/persistent-dev-agent Refactor the theme toggle to use CSS variables
```
