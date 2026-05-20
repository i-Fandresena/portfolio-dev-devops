This folder is a cloned template (devops-portfolio) adapted for Fandresena ANDRIANIAINA.

Quick start
1. Install dependencies:
   - `pnpm install` (inside `portfolio-devops`)
2. Fetch your public GitHub repos and save them to `data/projects.json`:
   - `node scripts/fetch-projects.js i-Fandresena`
   This will create/overwrite `data/projects.json` with your public repos.

How to replace the projects shown in the site
- The site currently uses `src/data/portfolio.ts` for hardcoded project entries.
- There are two approaches:
  1) Quick: Edit `src/data/portfolio.ts` and replace the `PROJECTS` entries with your desired projects (update `githubLink`, `title`, `description`, `image`, `technologies`).
  2) Automated: Run `node scripts/fetch-projects.js <your-github-username>` to populate `data/projects.json`, then adapt the site code to read `data/projects.json` instead of the hardcoded `PROJECTS` list (we can help make this change).

Next recommended steps I can execute for you:
- Update the site to source projects from `data/projects.json` automatically and map fields.
- Run `pnpm install` and `pnpm run dev` in `portfolio-devops` to preview locally.
- Replace additional profile text or images to better match your branding.

If you want me to continue, tell me which of the next steps to perform.
