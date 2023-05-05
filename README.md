# Static Generator
Static Generator generate static HTML from Markdown.

## Directories
- src
- dist
- input
- output

## Contents
```
index.html
papers.html
parts.html
projects.html

- papers
- parts
- projects

- styles
- scripts
- assets
```

## To Dos
- article header
- index.html file by auto
- check file when build(exist)
- deploy
- opengraph

```html
<meta property="og:title" content="<%- title %>">
<meta property="og:type" content="website">
<meta property="og:url" content="https://pullquery.github.io">
<meta property="og:image" content="https://avatars.githubusercontent.com/u/108810259?v=4">
```