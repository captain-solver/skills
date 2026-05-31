---
name: content-review
description: Evaluates a markdown blog article using an internal script and returns structured JSON scores per metric.
---

# Content Review — Blog Article Evaluator

The skill evaluates the given markdown blog article via our internal script.

## Arguments

```
<file-path>
```

- `file-path` — path to a markdown article, e.g. `path-to-your/article.md` (required)

If no file path is provided, ask the user for it.

## How to run

`<skill-dir>` is the directory containing this SKILL.md file.

```bash
node "<skill-dir>/dist/content-review.js" "<file-path>"
```

Example:

```bash
node "<skill-dir>/dist/content-review.js" contents/example.md
```

## Output

Always strict JSON — either a result or an error:

**Success:**

```json
[
  { "reviewer": "<model-id>", "metrics": { "E1": { "score": 75, "description": "..." }, ... }, "summary": "...", "totalScore": 80 },
  { "reviewer": "<model-id>", "metrics": { ... }, "summary": "...", "totalScore": 72 }
]
```

**Error:**

```json
{ "status": "ERROR", "error": "..." }
```

- Display the JSON output verbatim to the user.
- Do not summarize or reformat the response.

## Error handling

If the output contains `"GROQ_API_KEY environment variable is missing or empty"`, tell the user:

> This skill requires a free Groq API key. Get one at https://console.groq.com, then set it:
>
> ```
> export GROQ_API_KEY=your_key_here
> ```
