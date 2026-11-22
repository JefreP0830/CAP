# CAP

Tools for Civil Air Patrol, NER-VT014 Champlain Composite Squadron.

Every tool here is **code only**. Cadet and member data never enters this
repository: it stays on the squadron file share and is loaded into a tool at
run time, in the browser, on the machine you are using.

## Tools

| Tool | What it does | Status |
|---|---|---|
| [Cadet Promotion Tracker](tools/cadet-promotion-tracker/) | Squadron-level promotion view from the weekly eServices Cadet Full Track Report | Porting from Antigravity |
| [CAP Rule Changes](tools/pub-forecast/) | Monthly plain-language summary of CAP publication changes plus forecasts, for Vermont Wing | Prototype for review |
| [NLD Operations Plan](tools/nld-ops-plan/) | Vermont Wing plan for CAP National Legislative Day 2027 | Draft for review |
| [After Action Review](tools/aar/) | Lean AAR form on the CAPP 60-32 rubric, with an SDA self-check | Draft for review |
| [Hotwash](tools/hotwash/) | CHECK SIX (Saw, Insight, eXecute) hotwash email for any meeting, mission or training event | Draft for review |
| [Unit Operations Checklist](tools/monthly-ops/) | Printable FY calendar of recurring compliance tasks by month and officer | Draft for review |

## Layout

```
shared/brand/   CAP palette and type tokens used by every tool
tools/<name>/   one folder per tool: index.html, README.md, CHANGELOG.md
docs/           standing decisions
scripts/        repo guards (PII scan)
```

## Data guard

Three layers keep cadet data out:

1. `.gitignore` blocks CSV, Excel, PDF and JSON files.
2. A pre-commit hook (`scripts/pii-scan.sh`) refuses commits containing email
   addresses or CAPID-like values. Turn it on once per clone:
   `git config core.hooksPath .githooks`
3. A GitHub Action runs the same scan, including full history, on every push.

Before this repository is ever made public, run `scripts/pii-scan.sh --history`
and confirm it is clean.
