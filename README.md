# The String Alphabet — Translator

A static, responsive website for the fictional String Alphabet, including a translator, complete cipher key, number glyphs, lore archive, and double-meaning examples.

## Run it locally
1. Download or extract this folder.
2. Open `index.html` in a browser.
3. No build tools or API keys are required.

## Publish with GitHub Pages
1. Create a new GitHub repository (for example, `string-alphabet-translator`).
2. Upload `index.html`, `style.css`, `script.js`, and this README to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then press **Save**.
6. Wait for GitHub Pages to publish your site; the URL will appear in the Pages settings.

## Notes
- This is a fictional, custom substitution cipher, not a verified historical language.
- The glyph mapping is a stylized digital interpretation of the handwritten reference; some symbols are approximations because several handwritten glyphs are ambiguous.
- Ordinary letters are converted one-for-one. Spaces and punctuation are preserved.
- Any input matching `MM/DD/YYYY,number` (for example, `05/15/2009,19` or `09/15/2010,20`) maps to the String glyph spelling of `I LOVE YOU`; decoding those glyphs returns `I LOVE YOU`.
- Translation is local in the browser; no text is sent to a server.
