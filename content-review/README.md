# content-review

A Claude Code skill that evaluates the given markdown content via our internal script.

## How it works

```mermaid
flowchart TD
    A["You call /content-review article.md"] --> B["Your agent downloads the JS script via curl"]
    B --> C["JS script sends a prompt to the Groq API using your system GROQ_API_KEY"]
    C --> D["Your agent receives a JSON response with a detailed review"]
```

## Install

```bash
npx skills add captain-solver/skills@content-review
```

## Usage

```
/content-review path-to-your/article.md
```

## Requirements

A free [Groq API key](https://console.groq.com):

```bash
export GROQ_API_KEY=your_key_here
```
