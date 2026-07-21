# Mary Jo Suficiencia — AI Video Specialist

A premium, cinematic one-page portfolio for Mary Jo Suficiencia. The site presents her AI video services, creative workflow, tools, selected work, testimonials, and contact options in a responsive studio-style experience.

## Technology

- TanStack Start and TanStack Router
- React 19 and TypeScript
- Tailwind CSS 4 with a custom token-driven CSS design system
- Lucide icons
- Netlify Forms for contact submissions
- Netlify deployment via the TanStack Start Vite adapter

## Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The project is configured for Netlify in `netlify.toml`. For local Netlify feature emulation, use:

```bash
netlify dev --port 8889
```

## Content Updates

- Replace the Calendly placeholder in `src/routes/index.tsx` by updating `calendlyUrl`.
- Add the final demo reel at `public/demo-reel.mp4`; the existing poster remains visible while the video loads.
- Replace the circular profile placeholder in the About section with Mary Jo's final headshot.
- Update `portfolioItems` in `src/routes/index.tsx` with final titles, descriptions, categories, durations, and video or thumbnail behavior.
- Replace the two clearly labeled testimonial placeholders when approved client quotes are available.
- Edit global colors, typography, spacing, radii, and shadows in the `:root` design tokens at the top of `src/styles.css`.

## Contact Form

The contact form posts to Netlify Forms using the static registration file at `public/__forms.html`. Its form name and fields must remain synchronized with the React form in `src/routes/index.tsx`.
