# Marwa Halli — AI, Data & Intelligent Systems Portfolio

A premium static portfolio focused on **Artificial Intelligence, Data and Intelligent Systems**, with web development presented as a secondary skill. Built with HTML5, CSS3 and vanilla JavaScript. There is no build step.

## Run locally

1. Open a terminal in the `portfolio/` folder.
2. Start a simple local server:
   - Python: `python -m http.server 8080`
   - Then open `http://localhost:8080`
3. You can also use VS Code Live Server.

Do not open `index.html` directly if you want the most reliable local behavior; use a local HTTP server.

## Folder structure

```text
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   └── main.js
├── assets/
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── og-image.jpg
│   │   └── projects/
│   │       ├── projectx.jpg
│   │       ├── snake.jpg
│   │       ├── greenhouse.jpg
│   │       ├── gymaccess.jpg
│   │       ├── hris.jpg
│   │       ├── library.jpg
│   │       └── language.jpg
│   ├── certificates/
│   │   ├── cert-1.jpg
│   │   ├── cert-2.jpg
│   │   └── cert-3.jpg
│   ├── cv/
│   │   └── Marwa_Halli_CV.pdf
│   └── icons/
│       └── favicon.svg
├── README.md
└── .nojekyll
```

## Placeholders to replace

The JPG files included in `assets/` are tasteful generated placeholders so the website never displays broken images.

Replace these with real files when available:

- `assets/images/profile.jpg` — real profile photo.
- `assets/images/og-image.jpg` — Open Graph/social preview image.
- `assets/images/projects/*.jpg` — project screenshots/evidence.
- `assets/certificates/cert-1.jpg`, `cert-2.jpg`, `cert-3.jpg` — certificate images.
- `assets/cv/Marwa_Halli_CV.pdf` — your real CV. The requested path is already wired into the site; the placeholder PDF is intentionally not fabricated.
- Project GitHub links are intentionally empty in `js/data.js`. Add the real links only when you have them.
- `site.formspreeEndpoint` in `js/data.js` is intentionally empty. Add your real Formspree endpoint if you want server-side form delivery. When empty, the form falls back to `mailto:`.

## Edit content

All portfolio facts are centralized in:

`js/data.js`

Edit names, links, education, skills, experience, projects, certifications, languages and form configuration there. `main.js` only renders/interacts with the data.

The About statement is explicitly editable in `data.js` as `about.statement`.

## GitHub Pages deployment

1. Create a new GitHub repository, for example `marwa-halli-portfolio`.
2. Put the contents of this `portfolio/` folder at the repository root.
3. Commit:
   ```bash
   git add .
   git commit -m "Create portfolio"
   git push
   ```
4. On GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select the branch containing the portfolio, usually `main`, and folder `/ (root)`.
7. Save and wait for GitHub Pages to publish the site.
8. The included `.nojekyll` file keeps the site as a plain static project.

## Netlify

Drag the `portfolio/` folder into Netlify Drop, or connect the GitHub repository. No build command is required. Publish directory: the repository root.

## Vercel

Import the GitHub repository. Framework preset can be left as a static/other project. No build command is required; serve the repository root.

## Cloudflare Pages

Create a Pages project from the Git repository. No build command is required. Set the output directory to the repository root if prompted.

## Design and behavior

The site includes:

- Fixed glass navigation with responsive mobile menu.
- Scroll-spy and smooth navigation.
- Hero terminal with typing animation.
- Scroll reveals with reduced-motion support.
- Featured ProjectX selector with Localization Checks and Visual Direction placeholders.
- Benchmark bar animations.
- Other-project filters and accessible detail modal.
- Experience and education timelines.
- Contact form validation with Formspree-or-mailto fallback.
- Scroll progress and back-to-top control.
- Responsive layouts from 320px upward.

## Content integrity

No companies, projects, results, technologies, statistics, awards, testimonials, availability claims or skill levels were invented. Localization Checks and Visual Direction are intentionally marked **To be completed** in every requested template field. Project GitHub links remain placeholders until real links are supplied.

The Licence is explicitly shown as **Obtained 2026**.
