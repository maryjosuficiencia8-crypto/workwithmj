import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Mary Jo Suficiencia | AI Video Specialist' },
      {
        name: 'description',
        content: 'Cinematic AI-powered videos, UGC, VSLs, 3D animation, claymation, and creative storytelling by AI Video Specialist Mary Jo Suficiencia.',
      },
      { name: 'theme-color', content: '#0B0B0B' },
      { property: 'og:title', content: 'Mary Jo Suficiencia | AI Video Specialist' },
      { property: 'og:description', content: "Dream it. I'll bring it to life with cinematic AI video storytelling." },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  )
}
