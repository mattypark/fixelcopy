# fixelcopy

Study rebuild of a variable-typeface landing page — layout, scroll motion, and a live
variable-font playground, written from scratch with vanilla HTML/CSS/JS on Vite.

## Stack

- Vite (vanilla, no framework)
- Fixel variable font, self-hosted (SIL Open Font License)
- IntersectionObserver reveals, scroll-progress sticky panels, CSS-only transitions
- `lottie-web` for the animated specimens

## Run

```bash
npm install
npm run dev      # http://localhost:5180
npm run build
```

## Notes

- Third-party artwork is not redistributed here: photographic and illustrated assets
  render as sized placeholder blocks so layout and timing stay identical.
- Forms are local-only — no external endpoints are called.
