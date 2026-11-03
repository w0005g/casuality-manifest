# casuality-manifest
Public catalogue for the Game Portal app: `games.config.json` + `games/*.html`.
Push to `main` and the workflow regenerates `manifest.json` (sizes + sha256) and publishes to GitHub Pages.

Add a game: put `games/<id>-<version>.html`, add an entry to `games.config.json`, push.
