# Progressive enhancement changes to OBA Sourceror

## link to prototype
[visit the website](https://follywolly.github.io/project-1-1819/src/#/)

## PE subjects

### 1. Images
- Site still fully functional with images disabled
- Some svg icons/logo's are rendered via img tags, should be placed inline
- Images need alt texts!

### 2. Custom fonts
- Site still fully functional with images disabled
- Some font sizes are too big because the custom font is really small, but this is a styling preference

### 3. Color
- Colorblind friendly, only some contrast issues

### 4. Bandwith
- Actually pretty good: no big images loading in before first full page load, small scripts and some svg's.
- In general: Server side rendering, optimize images and only send above the fold necessary styles and scripts.

### 5. No Mouse / trackpad
- Only the main button, scan barcode, doesn't show feedback on tab.

### 6. No javascript
- Server side render full pages
- Change scan barcode button to a form where you put the title of a book, post to the server and get redirected to a page which is rendered by the server with the specific book. Same goes for the generating of the APA style of the book.

### 7. No cookies
- No cookies used

### 8. No LocalStorage
- App still fully functions if you disable localStorage / sessionStorage, you just shouldn't reload the browser. This does mean however, that you lose all saved scanned books upon revisiting the site.
