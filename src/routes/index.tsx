import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowDownRight,
  ArrowUpRight,
  AudioLines,
  Box,
  BrainCircuit,
  Check,
  Clapperboard,
  Menu,
  MessageSquareQuote,
  MousePointer2,
  PackageOpen,
  Palette,
  Play,
  Send,
  X,
} from 'lucide-react'
import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'

export const Route = createFileRoute('/')({
  component: PortfolioPage,
})

const services = [
  {
    icon: MessageSquareQuote,
    number: '01',
    title: 'AI UGC Video Creation',
    description:
      'Engaging, creator-led AI content designed to make products feel relatable, credible, and impossible to scroll past.',
  },
  {
    icon: AudioLines,
    number: '02',
    title: 'AI Video Sales Letters',
    description:
      'Persuasive VSLs that pair conversion-focused messaging with cinematic pacing and purposeful visual storytelling.',
  },
  {
    icon: Box,
    number: '03',
    title: 'Pixar-style 3D Animation',
    description:
      'Expressive, stylized 3D scenes with charming characters, rich worlds, and emotionally resonant visual moments.',
  },
  {
    icon: Palette,
    number: '04',
    title: 'Claymation Animation',
    description:
      'Handcrafted clay-style visuals that bring tactile warmth, personality, and an unmistakable stop-motion feel.',
  },
  {
    icon: PackageOpen,
    number: '05',
    title: 'AI Product Visuals',
    description:
      'Premium product showcases and cinematic concepts created for launches, campaigns, and ecommerce storytelling.',
  },
  {
    icon: BrainCircuit,
    number: '06',
    title: 'Creative AI Storytelling',
    description:
      'End-to-end concept development, scene planning, prompt engineering, and visual direction with a clear narrative arc.',
  },
]

const skillGroups = [
  {
    label: 'AI Video Generation',
    skills: ['Google Veo', 'Kling AI', 'Higgsfield AI', 'OmniFlash', 'ElevenLabs'],
  },
  {
    label: 'AI Image Generation',
    skills: ['ChatGPT Image', 'Nano Banana Pro'],
  },
  {
    label: 'Prompt Engineering',
    skills: ['ChatGPT', 'Claude', 'Character Consistency', 'Cinematic Prompts', 'Style Control'],
  },
  {
    label: 'Editing & Post Production',
    skills: ['Adobe Premiere Pro', 'CapCut Pro', 'Canva Pro'],
  },
  {
    label: 'Creative Practice',
    skills: [
      'Creative Storytelling',
      'Communication',
      'Attention to Detail',
      'Adaptability',
      'Strategic Thinking',
      'Time Management',
      'Problem Solving',
    ],
  },
]

const portfolioItems = [
  {
    title: 'Glow From Within',
    category: 'UGC',
    description: 'A beauty-first social concept balancing natural delivery with elevated product visuals.',
    palette: 'rose',
    duration: '0:24',
  },
  {
    title: 'The Better Morning',
    category: 'VSL',
    description: 'A direct-response wellness story designed around clarity, emotion, and a strong product reveal.',
    palette: 'amber',
    duration: '1:18',
  },
  {
    title: 'A Little Brave',
    category: 'Pixar 3D',
    description: 'A heartfelt character short about courage, curiosity, and taking one small step forward.',
    palette: 'blue',
    duration: '0:42',
  },
  {
    title: 'Made With Care',
    category: 'Claymation',
    description: 'A playful handcrafted product world with tactile surfaces and stop-motion-inspired movement.',
    palette: 'clay',
    duration: '0:31',
  },
  {
    title: 'Everyday Upgrade',
    category: 'UGC',
    description: 'A fast, polished lifestyle edit built to introduce a product benefit in the first three seconds.',
    palette: 'violet',
    duration: '0:19',
  },
  {
    title: 'What If It Was Easy?',
    category: 'VSL',
    description: 'A cinematic coaching VSL moving from audience tension to a confident, hopeful transformation.',
    palette: 'green',
    duration: '1:06',
  },
]

const processSteps = [
  ['Research', "Understand the client's goals, audience, offer, and creative direction."],
  ['Creative Strategy', 'Develop concepts, storyboards, prompts, and a clear visual plan.'],
  ['AI Production', 'Generate visuals, animation, voice, and cinematic sequences using AI.'],
  ['Review & Refinement', 'Polish pacing, visuals, sound, and transitions around feedback.'],
  ['Final Delivery', 'Deliver optimized videos ready for publishing across your channels.'],
]

type ButtonLinkProps = {
  children: ReactNode
  href: string
  variant?: 'primary' | 'secondary' | 'text'
  className?: string
}

function ButtonLink({ children, href, variant = 'primary', className = '' }: ButtonLinkProps) {
  const external = href.startsWith('http')

  return (
    <a
      className={`button button--${variant} ${className}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
    </a>
  )
}

function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: ReactNode; body?: string }) {
  return (
    <div className="section-intro reveal">
      <span className="eyebrow"><i />{eyebrow}</span>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  )
}

function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const filteredItems = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter)

  const closeMenu = () => setMenuOpen(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormStatus('sending')
    const form = event.currentTarget
    const formData = new FormData(form)
    const encodedData = new URLSearchParams()
    formData.forEach((value, key) => encodedData.append(key, String(value)))

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedData.toString(),
      })

      if (!response.ok) throw new Error('Submission failed')
      form.reset()
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="noise" aria-hidden="true" />

      <header className="navbar">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Mary Jo Suficiencia, home">
          <span className="brand-mark">MJ</span>
          <span className="brand-name">Mary Jo <strong>Suficiencia</strong></span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {[
            ['Home', '#home'],
            ['Services', '#services'],
            ['Portfolio', '#portfolio'],
            ['Process', '#process'],
            ['Contact', '#contact'],
          ].map(([label, href]) => (
            <a href={href} key={href} onClick={closeMenu}>{label}</a>
          ))}
          <ButtonLink href="#contact" className="mobile-booking">Send a Message</ButtonLink>
        </nav>

        <ButtonLink href="#contact" className="desktop-booking">Send a Message</ButtonLink>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <main id="main-content">
        <section className="hero" id="home">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow"><i />AI Video Specialist · Creative Director</span>
            <h1>
              I Turn Ideas Into
              <span>Scroll-Stopping</span>
              AI Videos.
            </h1>
            <p>I create AI-powered videos that combine storytelling, cinematic visuals, and creative strategy to help brands capture attention and stand out.</p>
            <div className="hero-actions">
              <ButtonLink href="#contact">Send a Message</ButtonLink>
              <ButtonLink href="#portfolio" variant="secondary">See My Work</ButtonLink>
            </div>
          </div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
            <span>Scroll to discover</span>
            <ArrowDownRight aria-hidden="true" />
          </a>
          <div className="hero-manifesto">Dream it. <em>I&apos;ll bring it to life.</em></div>
        </section>

        <section className="about section" id="about">
          <div className="about-portrait reveal">
            <div className="portrait-placeholder">
              <img className="portrait-photo" src="/headshot.jpg" alt="Mary Jo Suficiencia" />
            </div>
            <div className="portrait-orbit" aria-hidden="true">Creative direction · AI production · Storytelling ·</div>
          </div>
          <div className="about-copy reveal">
            <span className="eyebrow"><i />About Mary Jo</span>
            <h2>Where imagination meets <em>intentional</em> direction.</h2>
            <p>Hi, I&apos;m Mary Jo, an AI Video Specialist focused on creating engaging, story-driven videos using the latest AI tools and creative workflows. What started as curiosity for AI-generated visuals quickly became a passion for creating polished, cinematic content.</p>
            <p>I specialize in AI UGC videos, Video Sales Letters (VSLs), Pixar-inspired 3D animation, claymation, and cinematic AI storytelling. Rather than relying on one-click AI generation, I focus on creative direction, prompt engineering, scene consistency, camera movement, and visual storytelling to produce videos that feel intentional and memorable.</p>
            <p>My goal is simple: transform ideas into visuals that connect with audiences and help brands stand out.</p>
            <div className="signature">Mary Jo <span>AI Video Specialist</span></div>
          </div>
        </section>

        <section className="services section" id="services">
          <SectionIntro
            eyebrow="Services"
            title={<>Creative AI, <em>beautifully directed.</em></>}
            body="From first concept to final cut, every frame is built around your story, audience, and desired action."
          />
          <div className="service-grid">
            {services.map(({ icon: Icon, number, title, description }, index) => (
              <article className="service-card reveal" key={title} style={{ '--delay': `${index * 55}ms` } as CSSProperties}>
                <div className="service-card-head">
                  <span className="service-icon"><Icon aria-hidden="true" /></span>
                  <span className="service-number">{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="card-arrow"><ArrowUpRight aria-hidden="true" /></span>
              </article>
            ))}
          </div>
        </section>

        <section className="tools section">
          <div className="tools-heading reveal">
            <span className="eyebrow"><i />Tools & Skills</span>
            <h2>The craft behind <em>the magic.</em></h2>
            <p>A modern AI workflow is only powerful when paired with taste, consistency, and a strong point of view.</p>
          </div>
          <div className="skill-list">
            {skillGroups.map((group, index) => (
              <div className="skill-row reveal" key={group.label} style={{ '--delay': `${index * 45}ms` } as CSSProperties}>
                <div className="skill-label"><span>0{index + 1}</span>{group.label}</div>
                <div className="skill-chips">
                  {group.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="portfolio section" id="portfolio">
          <div className="portfolio-heading">
            <SectionIntro eyebrow="Selected Work" title={<>Stories made to <em>move people.</em></>} />
            <div className="filter-bar reveal" role="group" aria-label="Filter portfolio projects">
              {['All', 'UGC', 'VSL', 'Pixar 3D', 'Claymation'].map((filter) => (
                <button
                  type="button"
                  className={activeFilter === filter ? 'active' : ''}
                  onClick={() => setActiveFilter(filter)}
                  key={filter}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="portfolio-grid" aria-live="polite">
            {filteredItems.map((item, index) => (
              <article className={`portfolio-card palette-${item.palette} reveal is-visible`} key={item.title}>
                <div className="project-visual">
                  <div className="visual-orb" aria-hidden="true" />
                  <span className="project-index">0{index + 1}</span>
                  <button className="project-play" type="button" aria-label={`Play ${item.title} placeholder video`}>
                    <Play fill="currentColor" size={18} aria-hidden="true" />
                  </button>
                  <span className="project-duration">{item.duration}</span>
                </div>
                <div className="project-meta">
                  <div><span className="project-tag">{item.category}</span><h3>{item.title}</h3></div>
                  <ArrowUpRight aria-hidden="true" />
                </div>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="portfolio-note reveal"><Clapperboard aria-hidden="true" /><span>Project placeholders are ready for Mary Jo&apos;s final video files and thumbnails.</span></div>
        </section>

        <section className="process section" id="process">
          <SectionIntro
            eyebrow="My Process"
            title={<>From first spark to <em>final frame.</em></>}
            body="A thoughtful, collaborative workflow keeps the creative ambitious and the production clear."
          />
          <div className="process-track">
            {processSteps.map(([title, description], index) => (
              <article className="process-step reveal" key={title} style={{ '--delay': `${index * 70}ms` } as CSSProperties}>
                <div className="step-marker"><span>0{index + 1}</span><i /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials section">
          <SectionIntro eyebrow="Kind Words" title={<>Early feedback, <em>lasting impression.</em></>} />
          <div className="testimonial-grid">
            {[
              { quote: 'Your videos look realistic enough to be used for affiliate marketing.', name: 'Client 1', role: 'Brand Owner' },
              { quote: 'Your editing is good, and the clips are well put together.', name: 'Client 2', role: 'Affiliate Creator' },
              { quote: 'The AI commercial looked surprisingly professional and aligned well with our brand aesthetic.', name: 'Client 3', role: 'Brand Owner' },
            ].map(({ quote, name, role }, index) => (
              <figure className="testimonial-card reveal" key={quote}>
                <div className="quote-mark">“</div>
                <blockquote>{quote}</blockquote>
                <figcaption><span className="avatar-placeholder">0{index + 1}</span><div>{name} <small>{role}</small></div></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-copy reveal">
            <span className="eyebrow"><i />Start a Project</span>
            <h2>Ready to Bring Your Ideas to <em>Life?</em></h2>
            <p>Whether you&apos;re looking for UGC videos, VSLs, Pixar-inspired animation, claymation, or cinematic AI visuals, I&apos;d love to hear about your project. Let&apos;s create something that captures attention and tells a compelling story.</p>
            <a className="email-link" href="mailto:maryjosuficiencia06@gmail.com">
              maryjosuficiencia06@gmail.com <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>

          <form className="contact-form reveal" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="contact" />
            <p className="honeypot"><label>Do not fill this out: <input name="bot-field" /></label></p>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" type="text" placeholder="Jane Smith" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" placeholder="jane@company.com" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="message">Tell me about your project</label>
              <textarea id="message" name="message" rows={5} placeholder="What are we bringing to life?" required />
            </div>
            <button className="button button--primary submit-button" type="submit" disabled={formStatus === 'sending'}>
              <span>{formStatus === 'sending' ? 'Sending…' : 'Send Inquiry'}</span>
              {formStatus === 'success' ? <Check aria-hidden="true" /> : <Send aria-hidden="true" size={17} />}
            </button>
            <div className={`form-message ${formStatus}`} role="status" aria-live="polite">
              {formStatus === 'success' ? 'Thanks — your message is on its way.' : null}
              {formStatus === 'error' ? 'Something went wrong. Please email Mary Jo directly.' : null}
            </div>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span className="brand-mark">MJ</span><span>Mary Jo Suficiencia<br /><small>AI Video Specialist</small></span></div>
        <p>Dream it. I&apos;ll bring it to life.</p>
        <div className="footer-links"><a href="#home">Back to top</a><MousePointer2 aria-hidden="true" size={16} /></div>
      </footer>
    </div>
  )
}
