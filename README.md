# Mohamed Yahya Sellami — Portfolio

A complete, editable React + Vite + Tailwind CSS portfolio focused on software development, embedded systems, IoT, and the real-world BlueBox Smart Irrigation System.

## Quick start

Install Node.js 22.12 or newer. Open a terminal inside this project, then run:

```bash
npm install
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`. Keep the terminal running. Stop the development server with `Ctrl+C`.

For a production build and a local production preview:

```bash
npm run build
npm run preview
```

The deployable website is generated in `dist/`. Do not open `index.html` by double-clicking it; use the development or preview server.

## Visual concept

A simple light portfolio with a compact introduction, clear section spacing, and blue accents. The Home section combines the introduction and About content; detailed BlueBox architecture and feature information can be expanded from the project page.

Typography: **Space Grotesk** for headings, **Inter** for body copy, and **IBM Plex Mono** for technical labels. Fonts are bundled and served locally through `@fontsource`; no Google Fonts request is made when viewing the site.

Page order: Home / About, Experience, Skills, Projects, Education, Contact, Footer. The navigation stays visible and adapts to smaller screens. Motion respects reduced-motion preferences.

## Complete project structure

```text
yahya-sellami-portfolio/
  .env.example
  .gitignore
  index.html
  package.json
  package-lock.json
  vite.config.js
  README.md
  public/
    favicon.svg
    cv/
      Mohamed-Yahya-Sellami-CV.pdf
    images/
      README.md
      bluebox/
        .gitkeep
  src/
    main.jsx
    App.jsx
    styles.css
    data/
      portfolio.js
    hooks/
      useActiveSection.js
    lib/
      utils.js
    components/
      Navbar.jsx
      Hero.jsx
      SystemDiagram.jsx
      About.jsx
      Experience.jsx
      Skills.jsx
      Projects.jsx
      ProjectGallery.jsx
      Education.jsx
      Contact.jsx
      Footer.jsx
      ui.jsx
```

The hosted editing checkout also has a Sites-managed `.openai/hosting.json`. It is intentionally excluded from the portable source ZIP. The ZIP does not need it to install, run, build, or deploy on a static host.

## Component architecture

| Component / file | Responsibility |
| --- | --- |
| `App.jsx` | Semantic page structure and section composition |
| `Navbar.jsx` | Sticky navigation, active section, mobile menu, CV link |
| `Hero.jsx` | Introduction, availability, actions, contact icons |
| `SystemDiagram.jsx` | Interactive explanation of the BlueBox architecture |
| `About.jsx` | Profile, optional portrait, approach, availability |
| `Experience.jsx` | Professional vertical timeline |
| `Skills.jsx` | Seven skill categories without invented proficiency scores |
| `Projects.jsx` | BlueBox case study and three explicit project placeholders |
| `ProjectGallery.jsx` | Actual screenshots when configured; reserved image spaces otherwise |
| `Education.jsx` | Bachelor’s and current evening engineering studies |
| `Contact.jsx` | Form validation, copying a draft, mailto mode, optional hosted form delivery |
| `Footer.jsx` | Identity, copyright, links, return to top |
| `ui.jsx` | Reusable buttons, icons, tags, social links, section headings, reveal animation |
| `data/portfolio.js` | Personal details, skills, timeline, project content, image paths |
| `styles.css` | Tailwind v4 theme, reusable component styles, responsive rules |

## 1. Personal details and social links

Open `src/data/portfolio.js` and edit `profile`:

```js
export const profile = {
  name: 'Mohamed Yahya Sellami',
  shortName: 'Yahya Sellami',
  title: 'Junior Full-Stack & IoT Developer | Software Testing',
  location: 'Sfax, Tunisia',
  availability: 'Open to full-time opportunities',
  email: 'sellamimohamedyahya4@gmail.com',
  phone: '50339160',
  linkedin: 'https://www.linkedin.com/in/mohamed-yahya-sellami-7b12562b7/',
  github: 'YOUR_FULL_GITHUB_PROFILE_URL',
  photo: 'images/profile.jpg',
  cv: 'cv/Mohamed-Yahya-Sellami-CV.pdf',
  cvDownloadName: 'Mohamed_Yahya_Sellami_CV.pdf',
};
```

The email, phone, LinkedIn URL, and portrait are configured from the supplied CV and image. A GitHub URL was not listed, so that link remains unset rather than pointing to a guessed account. Update these fields in `profile` when your public contact details change.

The experience, education, project, language, and association details are based on the supplied CV. Review them for accuracy when updating your CV; no dates or project links should be added unless they are verified.

## 2. Current CV PDF

A copy of the supplied CV is included at:

```text
public/cv/Mohamed-Yahya-Sellami-CV.pdf
```

All Download CV buttons link to this file and save it as `Mohamed_Yahya_Sellami_CV.pdf`. To replace it later, overwrite this file or update `profile.cv` and `profile.cvDownloadName` in `src/data/portfolio.js`. The PDF is not automatically regenerated when you edit the website.

## 3. Profile photo

The supplied portrait is stored at `public/images/profile.jpg` and is already configured. To replace it, overwrite that file or add another image under `public/images/` and update `profile.photo` in `src/data/portfolio.js`:

```js
photo: 'images/profile.jpg',
```

Use a sharp portrait of about 800 × 1000 pixels. WebP or a compressed JPEG is suitable. Set `profile.photo` to an empty string to show the designed MYS initials panel instead. To adjust the crop, edit `.profile-photo` in `src/styles.css`.

## 4. BlueBox project gallery

BlueBox overview images live in `public/images/bluebox/` and are listed in `bluebox.screenshots` in `src/data/portfolio.js`. System-flow diagrams use `bluebox.architectureDiagrams`; mobile app captures use `bluebox.mobileScreenshots`; embedded controller captures live in `public/images/bluebox/embedded/` and use `bluebox.embeddedScreenshots`. The mobile app and embedded screen albums expand below the overview gallery. Selecting a thumbnail opens the image viewer; use its arrows or the keyboard arrow keys to browse, and press Escape to close it. WebP is recommended for new screenshots to keep the gallery light. Write useful alt text and captions, and only add images that are safe to share. The page’s simple sprout icon is a category illustration, not a reproduction of the BlueBox logo; replace it with your genuine logo if desired.

## 5. Replace the extra project placeholders

Edit `additionalProjects` in `src/data/portfolio.js`:

```js
{
  id: 'my-project',
  type: 'Full-stack development',
  title: 'Your real project title',
  description: 'The problem, what you built, and your contribution.',
  icon: 'PanelsTopLeft',
  status: 'project',
  technologies: ['React', 'Spring Boot', 'PostgreSQL'],
  url: 'https://YOUR_REAL_PROJECT_OR_REPOSITORY_URL',
}
```

Keep `status: 'placeholder'` until you have real work to present. No fake projects are presented as completed.

## 6. Contact form delivery

The form has three intentional modes:

| Configuration | Behavior |
| --- | --- |
| No email and no endpoint | **Copy message** copies the inquiry. The page clearly states that nothing has been sent. If clipboard access is unavailable, a selectable draft appears. |
| A real `profile.email`, no endpoint | **Open email draft** opens the visitor’s email application with the recipient, subject, and message. The visitor reviews and sends it. |
| `VITE_CONTACT_FORM_ENDPOINT` configured | **Send message** POSTs JSON to your configured service. Loading, success, timeout, and failure states are shown. |

The default website does not silently store contact messages or pretend to send them.

For direct delivery, create and verify a form with Formspree or use your own compatible endpoint. Copy `.env.example` to `.env.local` and set:

```dotenv
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Restart the development server. For deployment, set this variable in your build environment before building. Vite substitutes `VITE_` values at build time. Never put API secrets in them.

The endpoint must accept JSON fields `name`, `email`, `subject`, `message`, and `_gotcha`, allow browser requests from your domain, and return a non-error HTTP response only when the submission is accepted. Configure validation and anti-spam controls on the service as well. End-to-end message delivery must be tested after your real endpoint is configured; no external messages were sent during development.

## 7. Deploy the portfolio

This is a static frontend. It does not require a Node.js process on your production server.

### Static hosts, including Netlify, Vercel, and Cloudflare Pages

1. Put the project in your Git repository, or choose your provider’s supported static upload workflow.
2. Select the Vite/static-site preset when available.
3. Use `npm run build` as the build command.
4. Use `dist` as the output directory.
5. Use Node.js 22.12 or newer in the build environment.
6. Add `VITE_CONTACT_FORM_ENDPOINT` to the build environment only if you use direct form delivery.
7. Deploy and verify the CV download, images, contact method, and social URLs on the deployed page.

For a manual upload, run `npm run build` locally and upload the **contents** of `dist/`. Do not upload `src/` or `node_modules/` as the public website.

### OVH / Nginx

Run `npm run build`, then copy the contents of `dist/` to a **separate portfolio directory or container** on your VPS and point the portfolio domain/subdomain to it. Keep this separate from the existing BlueBox company website.

Example Nginx configuration (replace the domain and root with your own values):

```nginx
server {
    listen 80;
    server_name portfolio.your-domain.com;
    root /var/www/yahya-portfolio;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Configure HTTPS using your usual hosting setup. This single-page site uses section anchors rather than client-side routes, so a route fallback is unnecessary. The Vite config uses relative asset paths (`base: './'`), and the configured CV/images use `BASE_URL`, allowing deployment under a subfolder as well.

### GitHub Pages

Use the GitHub Pages GitHub Actions workflow described in the official Vite deployment guide below. Its artifact must contain `dist/`. Relative assets are already configured, and navigation uses same-page anchors.

## Accessibility, performance, and SEO

- Semantic header, navigation, main, sections, headings, and footer.
- One descriptive H1 and a logical heading hierarchy.
- Skip link, visible focus indicators, labeled fields, and keyboard-operable diagram and navigation.
- Native email/required-field validation, message length limits, and live form feedback.
- Reduced-motion support; page content remains visible if IntersectionObserver is unavailable.
- Responsive CSS at desktop, tablet, and mobile widths; no heavy animation library.
- Local fonts, tree-shaken icon imports, and lazy-loaded project images.
- A custom favicon and meaningful title, description, and text Open Graph metadata.

This is a client-rendered React application. Search engines that execute JavaScript can inspect the content; metadata is present in the initial HTML. If server-rendered content is a future requirement, add prerendering. No unprovided canonical domain or social preview image has been invented.

## Official references

- [Vite: getting started and Node.js requirements](https://vite.dev/guide/)
- [Vite: static deployment, including GitHub Pages](https://vite.dev/guide/static-deploy)
- [Formspree: submitting with JavaScript](https://help.formspree.io/articles/working-with-react/building-a-form-with-javascript)

All application source files and the dependency lockfile are included. No private credentials or paid assets are required to run the project.
