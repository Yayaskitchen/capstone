# Prepared for Black Students — Capstone Portfolio Site

A static, multi-page site built from the APPLHSCI 9099 Learning Portfolio, ready to host on
GitHub Pages at `capstone.yayaskitchen.ca`.

## What's here

- `index.html`, `project.html`, `evidence.html`, `findings.html`, `framework.html`,
  `action.html`, `journey.html`, `learning-plan.html`, `competencies.html`,
  `reflection.html`, `artifacts.html`, `closing.html` — the twelve pages of the portfolio
- `assets/style.css` — shared design system
- `assets/nav.js` — shared header/footer + mobile menu (injected on every page)
- `assets/favicon.svg` — site icon
- `404.html` — not-found page
- `CNAME` — tells GitHub Pages to serve this site at `capstone.yayaskitchen.ca`

No build step is required — every file is plain HTML/CSS/JS.

## 1. Push this to a GitHub repository

```bash
cd capstone-site
git init
git add .
git commit -m "Initial capstone portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 2. Turn on GitHub Pages

1. On GitHub, open the repo → **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. GitHub will build the site at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two — confirm it loads before moving on.

## 3. Point your subdomain at GitHub Pages

The `CNAME` file already in this repo tells GitHub the custom domain is
`capstone.yayaskitchen.ca` — you don't need to re-type it in the Pages settings,
though GitHub will show it there once DNS is verified.

At your DNS provider for **yayaskitchen.ca**, add a **CNAME record**:

| Type  | Host / Name  | Value                     |
|-------|--------------|---------------------------|
| CNAME | `capstone`   | `<your-username>.github.io` |

(Some providers want the host as `capstone.yayaskitchen.ca` — use whichever your
provider's UI expects; the target is always your `github.io` address, with no
`https://` and no trailing slash.)

DNS changes can take anywhere from a few minutes to a few hours to propagate.

## 4. Confirm in GitHub Pages settings

Back in **Settings → Pages**, once DNS resolves you'll see the custom domain
verified with a green check. Turn on **Enforce HTTPS** once it becomes available
(GitHub provisions a certificate automatically — this can take up to 24 hours).

## Editing content later

Each page is a self-contained HTML file — open any one of them and edit the text
directly inside its `<section>` blocks. The header, footer, and navigation menu
are generated once by `assets/nav.js`, so adding a new page means:

1. Duplicate an existing `.html` file as a starting template.
2. Add its filename and label to the `PAGES` array at the top of `assets/nav.js`.

## A note on the content

This site reproduces the submitted APPLHSCI 9099 Learning Portfolio prepared by
Malvin L. Wright. It is not an official Thames Valley District School Board
framework, policy, evaluation, or approved implementation resource — see the
Acknowledgements &amp; References page for the full evidence-boundary statements
carried over from the source document.
