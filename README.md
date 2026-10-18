# Krzysztof Broniszewski — AI Creative & Drone Portfolio

Static multi-page website for GitHub Pages.

## Deployment

Copy all files from this package into the **root** of the existing `drone-ai-gallery` repository (not inside an extra `portfolio_black_gold` folder). Keep existing `images/drone`, `images/ai`, and any other existing media. Commit and push to `main`.

Preview locally with VS Code Live Server using the root `index.html`. Gallery images are retrieved from the **published GitHub repository** through the GitHub Contents API, so new local images only appear after pushing.

## Pages

- `/index.html` — Home
- `/drone-photography/index.html` — drone photo gallery
- `/ai-art/index.html` — AI art gallery
- `/drone-videos/index.html` — original YouTube videos
- `/cv/index.html` — existing CV embed + external link
- `/projects/volcanic-perfume/index.html` — Black Luxury commercial

## Files

`theme.css` is the global black/gold theme; `site.js` handles the menu. `gallery.js` handles the GitHub API galleries and lightbox. `video-data.js` preserves original video IDs; `videos.js` builds video cards. The perfume page retains `project.css` and `project.js`.

The original King of Drone logo has not been included in the package because the binary logo was not among the supplied files. The redesigned site uses a typographic KB mark instead. The CV's own website is external and therefore retains its original internal styling.
