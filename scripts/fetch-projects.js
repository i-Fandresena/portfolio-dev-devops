// Usage: node fetch-projects.js <github-username>
// Writes data/projects.json with basic repo info for public repos.

const fs = require('fs');
const path = require('path');

const username = process.argv[2] || process.env.GITHUB_USER;
if (!username) {
  console.error('Usage: node fetch-projects.js <github-username> or set GITHUB_USER');
  process.exit(1);
}

const outDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

console.log(`Fetching public repos for ${username}...`);

fetch(url, { headers: { 'User-Agent': 'node.js' } })
  .then((res) => {
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  })
  .then((repos) => {
    const data = repos.map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
    }));
    fs.writeFileSync(path.join(outDir, 'projects.json'), JSON.stringify(data, null, 2));
    console.log(`Wrote ${data.length} repos to data/projects.json`);
  })
  .catch((err) => {
    console.error('Failed to fetch repos:', err.message || err);
    process.exit(2);
  });
