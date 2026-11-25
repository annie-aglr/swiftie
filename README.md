# The Taylor Swift Archives

A fan-made, single-page static website that presents six Taylor Swift eras: **Red**, **Lover**, **folklore**, **Midnights**, **1989**, and **Speak Now**. Visitors can browse a rotating hero carousel, search albums and songs, open each album to read short descriptions of three notable songs, and send a contact message.

This is an unofficial fan project. It is not affiliated with or endorsed by Taylor Swift or her team.

## Features

- **Hero carousel:** Cycles through all six eras every 5 seconds, with a collage background and clickable dots. Auto-advance is turned off when the visitor prefers reduced motion.
- **Album grid:** Six cover cards with title and release year. Clicking a card opens the album.
- **Search:** Filters albums by title, release year, or song name. Pressing Enter opens the first matching album. Matching song names are highlighted in the album view.
- **Album modal:** Shows the cover, release date, a short blurb, and descriptions of three notable songs. Closes with the × button, a click outside the box, or the Escape key, and returns focus to the element that opened it.
- **Responsive navigation:** Below 900px wide, the menu collapses into a hamburger button.
- **Active section highlight:** The navbar link for the section in view is underlined as you scroll.
- **Contact form:** Validates name, email, and message in the browser and shows a confirmation.
- **Fallback cover art:** If an external image fails to load, the cover shows a gradient with the album title instead.

## Project Structure

```
.
├── index_1.html   # Page structure and sections
├── style.css      # Layout, theme, responsive rules, and modal styles
└── app.js         # Album data, search, carousel, modal, and form logic
```

`index_1.html` loads `style.css` and `app.js` with relative paths, so keep all three files in the same folder. If you rename the HTML file to `index.html`, most hosts will serve it as the homepage automatically.

## Getting Started

No build step or dependencies are needed.

1. Place the three files in one folder.
2. Open `index_1.html` in a browser, or serve the folder with a local server:

   ```bash
   python -m http.server 8000
   ```

   Then visit `http://localhost:8000/index_1.html`.

Google Fonts (Cormorant Garamond and DM Sans) and the album cover images load from the internet, so an internet connection is needed for the intended look.

## Content

All album data is in the `ALBUMS` array at the top of `app.js`. Each album has:

| Field | Purpose |
| --- | --- |
| `id` | Unique key used by the grid, hero, and modal |
| `title`, `year`, `date` | Name, release year, and full release date |
| `c` | Three colors: gradient start, gradient end, and text color for the fallback cover |
| `img` | Cover image URL (hotlinked from an external site) |
| `blurb` | One-line description shown in the hero and modal |
| `songs` | Three `[title, description]` pairs |

The song descriptions are the archive's own interpretations. Where a song's inspiration has never been confirmed, the text says so, as in the entry for "Dear John." The site does not reproduce song lyrics, and it should stay that way.

## Customizing

- **Add or edit an album:** Change the `ALBUMS` array in `app.js`. The hero, grid, search, and modal all update from that one array.
- **Change carousel speed:** Edit the `5000` value (milliseconds) in the `autoplay()` function in `app.js`.
- **Colors and fonts:** Edit the `:root` variables in `style.css` (`--pink`, `--ink`, `--soft`, and others), and the font links in the `<head>` of the HTML file.
- **Site name and copy:** Update the `<title>`, hero heading, About section, and footer in `index_1.html`.

## Known Limitations

- **Contact form is not connected to a server.** On submit, the form only checks the fields and shows a thank-you message. Nothing is sent or stored. To make it work, connect the form to a service such as Formspree, Netlify Forms, or your own backend.
- **Cover images are hotlinked.** The covers load directly from third-party sites. If those links break or those sites block hotlinking, the gradient fallback appears. For a long-term project, download the images and host them yourself, after checking that you have the right to use them.
- **Search is simple.** It matches substrings only and does not handle typos or partial words across multiple terms.
- **The focus trap is partial.** When the album modal is open, Tab can still reach elements behind it. Escape and click-outside close the modal correctly.

## Browser Support

Any modern browser. The page uses `IntersectionObserver`, `backdrop-filter`, and CSS `aspect-ratio`, which are supported in current versions of Chrome, Edge, Firefox, and Safari.

## Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `footer`) and labeled sections
- Keyboard-accessible cards, dots, and menu button, with visible focus outlines
- Live regions for carousel and form messages
- Respects `prefers-reduced-motion` for autoplay and transitions

## Disclaimer

This is a fan project. Album and song titles belong to their owners. Song descriptions are opinions and interpretations, not statements from the artist.

## License

Add a license before publishing, such as MIT for the code. Artwork, names, and titles are not covered by the code license.
