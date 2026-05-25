# NeoLink Agent Instructions

This file is the source of truth for project-specific agent behavior in this repository.
If another assistant-specific instruction file is added later, keep it short and point it back to this file.

## Behavior

- Be direct and push back when you disagree; if the user's approach has problems, say so.
- When unsure about something, say you're unsure rather than guessing confidently.
- When something fails, investigate the root cause before retrying.
- Keep diffs scoped to the task: no drive-by reformats or unrelated refactors.

## Update Cadence

- The MarketTrend market/sentiment data and the NeoLink information site should be checked and refreshed once per hour.
- Hourly jobs must attempt to update market quotes, sentiment evidence, latest news, headline candidates, metrics, and source indexes.
- Do not fake freshness: only change visible content timestamps when the underlying content or data actually changes.
- If an hourly run finds no credible new data, keep the previous content timestamp and record the run as a no-change check in the maintenance log.
- Price, quote, sentiment, export, project, policy, IPO, legal, and safety data must keep source, timestamp, and methodology fields when available.

## Repository Sync

- Treat `/Users/julyan/Desktop/NeoLink` as the source repository for NeoLink.
- Treat `/var/www/neolink` as the deployment target, not as the source repository.
- After a verified content update, commit the NeoLink source changes and push `main` to both GitHub (`origin`) and Gitee (`gitee`).
- Do not commit generated runtime state, local crawl artifacts, or unrelated nested projects.

## Teaching

The user is often picking up new systems and domains. When a key term surfaces that they likely have not internalized, explain it in 1-2 sentences and then move on.

Use this format:

> 💡 followed by 1-2 sentence explanation
