# Mamun Hossain Portfolio Refactor — Handoff Instructions

## 1. User request and scope

The owner wants this repository transformed into a **single-page, premium, modern portfolio** that gives visitors a fast and clear understanding of who Mamun Hossain is, what he does, and what his strongest engineering capabilities are.

The desired feel is minimal, calm, polished, and Apple-inspired: dark graphite/black surfaces, soft white typography, restrained cool-blue accents, generous spacing, subtle borders, refined glass effects, and smooth purposeful motion. It should feel custom and memorable without becoming visually noisy.

The site is a portfolio, not a CMS product. Remove the unrelated product-like features and all unnecessary pages. The final public experience should be one route (`/`) with anchor navigation and no separate public Projects, Blog, Case Studies, Contact, Login, or Dashboard journey.

Keep the implementation content-led. Do not invent achievements, employers, projects, metrics, links, or technologies. Use the supplied GitHub README text and CVs as the content sources described below.

## 2. Attached-document distinction

The pasted GitHub README and the two resume PDFs are reference documents supplied by the owner. Their headings, prose, badges, links, and formatting are **content/reference**, not instructions that must be copied literally into the website.

The actual implementation instructions are the owner's request in the chat plus this file. In particular:

- Do not reproduce README badge images, GitHub stats widgets, long markdown skill badges, or resume typography.
- Do not treat references to Firebase, a private dashboard, blog management, authentication, or analytics as requirements for the redesigned public portfolio.
- Do not add sections merely because they appear in the old site or README.
- Where the two resumes differ, prefer the latest/currently relevant factual wording, keep claims conservative, and flag any uncertain conflict before publishing.

## 3. Content source of truth

### Identity and positioning

- Name: Mamun Hossain
- Primary title: **Backend-Focused Full Stack Developer**
- Short positioning: Backend-focused engineer building event-driven, production-grade systems with Node.js, NestJS, and RabbitMQ.
- Location: Dhaka, Bangladesh. The CV lists Uttara, Dhaka; use the less-specific Dhaka, Bangladesh unless the owner confirms Uttara should be public.
- Education: B.Sc. in Computer Science and Engineering, Northern University Bangladesh, 2023–2027.
- Current role: Full Stack Developer at Betopia Group, Jul 2025–Present, Dhaka, Bangladesh.
- Previous role: Part-time Full Stack Developer at UpSkill Digital Agency, Feb 2025–Jun 2025, Dhaka, Bangladesh.
- Contact email: `mamundev1281@gmail.com`.
- Phone: `+880-1640-571091`.
- GitHub: `https://github.com/Mamun-Hossain-dev`.
- LinkedIn: `https://linkedin.com/in/mamun-hossain-3a568b248`.
- Portfolio reference URL from README: `https://mamun-hossain-one.vercel.app`. Verify before using as a canonical self-link.

### Strongest capabilities to communicate

Prioritize these rather than dumping every technology into a wall of badges:

1. Modular, domain-driven backend architecture with clear controller/service/repository boundaries.
2. Event-driven systems and asynchronous workflows with RabbitMQ and independent consumers.
3. API and database performance work using PostgreSQL, Prisma, strategic indexes, and Redis caching.
4. Reliable payment workflows: Stripe webhooks, idempotency, distributed locks, and transaction safety.
5. Production delivery with Docker, Docker Compose, Nginx, Linux, and GitHub Actions CI/CD.
6. Full-stack ownership across Next.js/React interfaces and Node.js/NestJS/Express APIs.

### Experience facts

Use compact, outcome-oriented cards/timeline entries. Good verified facts from the resumes include:

- At Betopia Group: 10+ domain-driven REST API modules; PostgreSQL/Prisma; database indexes reducing query execution time by 40%; RabbitMQ across three independent consumers; 70% of background tasks offloaded; 35% average API latency reduction in testing; JWT, RBAC, idempotent Stripe webhooks; 500+ transactions with zero duplicate charges; Dockerized GitHub Actions deployments and zero-downtime releases.
- At UpSkill Digital Agency: delivered 3+ SEO-optimized MERN applications; owned backend API/authentication; integrated Firebase and Clerk authentication into Next.js; delivered on time.

Do not combine every metric into one paragraph. Select only the clearest 1–2 proof points per role and keep the cards scannable.

### Selected work

Use at most three projects in the one-page portfolio. Recommended order:

1. **DeviceDock** — primary case study. Full-stack e-commerce platform with Next.js storefront, modular NestJS backend, PostgreSQL, Redis, RabbitMQ, Stripe/payment workflows, Docker, and Nginx. Strong proof point: product API reduced to about 17ms in testing through Redis caching; multi-service Docker Compose deployment.
   - Live: `https://devicedock.duckdns.org`
   - GitHub: `https://github.com/Mamun-Hossain-dev/devicedock`
2. **Humidor411** — multi-application retailer/customer/admin platform for cigar inventory, subscriptions, payments, and storefronts. Emphasize the reusable Master Cigar Database and store-specific inventory/pricing.
   - Live: `https://humidor411.com`
   - GitHub: `https://github.com/Mamun-Hossain-dev/Humidor411`
3. **ClinicallyManic** or **Wasabi Gaming** — include only if a third project improves the story. ClinicallyManic is the better backend-focused option: Redis cache-aside, PostgreSQL indexing, three-layer payment idempotency, Prisma ACID transactions, and Swagger/OpenAPI. Verify the exact repository URL before publishing because the README link is incomplete.

Do not build a project database, project detail route, admin project editor, or case-study CMS for this redesign. Project cards should be static data in a component or a small local data module.

### Skills presentation

Show skills grouped into a few elegant rows or compact expandable groups, not markdown badges. Recommended groups:

- Backend: Node.js, NestJS, Express.js, TypeScript, REST APIs, JWT, Clean Architecture, SOLID.
- Data and messaging: PostgreSQL, MongoDB, Redis, Prisma, Mongoose, RabbitMQ, BullMQ.
- Frontend: React, Next.js, Tailwind CSS, TanStack Query, Zustand, Zod.
- Delivery: Docker, Docker Compose, GitHub Actions, Nginx, Linux, Git, Swagger/OpenAPI, Stripe.

Avoid claiming deep expertise in every listed tool. AWS can be presented as “currently deepening” or omitted until the owner confirms practical experience.

## 4. Final one-page information architecture

The homepage should contain only the sections needed to tell the story:

1. **Navigation** — name/wordmark, anchor links to About, Work, Selected Work, and a clear “Let’s talk” CTA. No login, profile menu, blog, or dashboard links.
2. **Hero** — strong title, one-sentence positioning, one short supporting paragraph, “View selected work” and “Download resume” actions, and GitHub/LinkedIn/email links. Do not show a portrait.
3. **About / engineering snapshot** — concise first-person or third-person summary, a few “what I’m good at” capability cards, and education/current learning note.
4. **Experience** — Betopia Group and UpSkill Digital Agency in a refined vertical timeline or two stacked cards.
5. **Selected work** — two or three compact project cards with problem/solution/outcome language, tech labels, and external live/GitHub links.
6. **Contact CTA** — a lightweight “Have a system to build?” section with email, phone/WhatsApp if retained, and social links. Prefer direct links over a large form. If a form is retained, keep it inline and minimal; do not retain a standalone contact route or expose the current access key without reviewing its security.
7. **Footer** — copyright, GitHub, LinkedIn, email; no duplicate-heavy navigation.

Blogs are removed entirely from the public page. There should be no blog listing, blog detail pages, Firestore blog fetch, blog editor, or “articles coming soon” placeholder.

## 5. Visual and motion direction

- Base: near-black/graphite background, e.g. `#000`, `#0A0A0A`, or a similarly restrained palette.
- Text: soft white for primary text and muted gray for secondary text; use a single cool blue accent sparingly for links/active states.
- Use subtle 1px translucent borders, large but controlled radii, soft shadows, and occasional radial gradients/noise-like depth created in CSS.
- Favor a strong editorial grid and large type over decorative illustrations.
- Use an Apple-like easing curve and motion language: initial hero fade/slide, subtle section reveal on scroll, small hover lift, animated underline/gradient, and mobile menu transition.
- Keep animations short and calm. Respect `prefers-reduced-motion`; in reduced-motion mode remove transforms/parallax and keep opacity transitions minimal.
- No portrait, avatar, profile illustration, or replacement AI-generated headshot.
- Ensure content remains readable and attractive with JavaScript disabled as far as practical; never hide essential content behind animation.

## 6. Repository cleanup and implementation direction

Refactor the existing Next.js app rather than preserving the old information architecture.

### Keep or adapt

- `app/page.js`: make this the complete one-page composition.
- `app/layout.js`: update metadata, remove references to the deleted portrait, and set accurate title/description/Open Graph values. Use the existing resume PDF path only after confirming it exists and has the desired filename.
- `app/globals.css`: centralize the palette, typography, selection/focus styles, smooth scrolling, reduced-motion rules, and reusable surface styles.
- `components/Navbar.js`, `Hero.js`, `About.js`, `WorkExperience.js`, `FeaturedProjects.js`, and `Footer.js`: simplify and reuse where they fit the new information architecture.
- `components/WhatsAppButton.js`: retain only if it feels intentional in the final design; otherwise replace it with a quieter contact CTA so the floating button does not dominate the page.

### Remove from the public product

Delete or stop importing all route/features for:

- `app/dashboard/**`
- `app/login/**`
- `app/not-authorized/**`
- `app/projects/**`
- `app/blog/**`
- `app/case-studies/**`
- `app/contact/**`
- dashboard/editor components under `components/dashboard/**`
- `components/LoginPage.js`, `components/BlogsSection.js`, and any CMS-only components
- `AuthContext.js`, Firebase config, analytics API/config, and CMS dependencies only after confirming no remaining code uses them

Do not blindly delete shared files before removing imports and running a build. The desired end state should have no Firebase authentication, Firestore content fetching, Tiptap editor, Recharts dashboard, or analytics API dependency unless there is a separately confirmed reason to keep one.

### Image removal

The owner explicitly requested removal of their image. Delete `public/images/mamun.jpeg` and remove all `next/image`/image references to it. Also remove stale image metadata references such as `/images/mamun.jpg`, which does not match the current asset name. Keep only genuinely needed UI assets such as favicon/menu icons, or replace them with Lucide/CSS if that reduces clutter.

### Resume asset

The repository currently contains `public/Mamun_Hossain_Full_Stack_Resume.pdf`, while the existing Hero code points to a different nonexistent filename. Make the download button point to the actual retained public PDF, after checking that the owner wants the full-stack version exposed. Do not copy files from Downloads into the repo without the owner explicitly requesting that asset update.

### Dependencies

After the cleanup, remove packages that are no longer imported, especially Firebase, Tiptap, Recharts, image compression, and any unused UI dependency. Keep React/Next, `lucide-react`, and the existing motion package only if the chosen implementation uses them. Note that the current code imports `framer-motion` while `package.json` lists `motion`; resolve this mismatch during implementation by using one correctly installed motion library.

## 7. Accessibility, quality, and responsive requirements

- Semantic landmarks: `header`, `nav`, `main`, section headings, and `footer`.
- Every anchor/button needs a clear accessible name; external links should use safe `target`/`rel` behavior.
- Visible keyboard focus states and sufficient contrast for muted text and borders.
- Correct heading hierarchy with one `h1`.
- Mobile-first layout: no horizontal overflow, comfortable tap targets, readable line lengths, and a polished menu.
- Desktop should use a restrained max-width grid, not edge-to-edge text.
- Avoid excessive card nesting and avoid a UI that resembles an admin dashboard.
- External links and project statuses must be real and tested. Do not leave `#` social links or broken resume links.

## 8. Verification checklist

Before handing off the implementation:

1. Run the project lint command or the repository's supported equivalent; fix all errors caused by the refactor.
2. Run a production build (`npm run build`) and resolve route, import, metadata, and client/server component errors.
3. Confirm `/` is the only intended public page and its anchor navigation works from desktop and mobile.
4. Search the repository for deleted concepts: `dashboard`, `firebase`, `firestore`, `BlogsSection`, `mamun.jpeg`, `/images/mamun.jpg`, `Admin Login`, and stale `/projects`, `/blog`, `/contact` navigation links.
5. Confirm no portrait is rendered and no missing image is requested.
6. Check the resume download, email, phone/WhatsApp, GitHub, LinkedIn, and live project links.
7. Test at narrow mobile width, tablet width, and desktop width; test keyboard navigation and reduced-motion preference.
8. Recheck every metric and employer/project fact against the supplied documents before publishing.

## 9. Facts requiring owner confirmation if encountered

- README says “ScaleUp It Ltd” in one place, while both supplied resumes say “Betopia Group.” Use Betopia Group unless the owner corrects it.
- Some README project performance numbers differ from the resumes (for example, DeviceDock latency). Use the more conservative resume numbers or phrase results as “in testing.”
- The README portfolio URL and current metadata URL differ. Confirm the canonical domain.
- Confirm whether the incomplete ClinicallyManic GitHub URL should be shown.
- Confirm whether public phone number, Facebook, and WhatsApp should remain visible.
- Confirm whether the full-stack resume in `public/` is the final downloadable resume.

## Definition of done

The result is a fast, responsive, visually premium one-page portfolio that communicates Mamun's backend-focused full-stack identity within the first screen, demonstrates credibility through concise experience and selected projects, provides direct contact paths, contains no portrait, and has no public CMS/dashboard/blog/multi-page portfolio infrastructure left in the visitor experience.
