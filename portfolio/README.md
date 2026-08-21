# Muneeswaran — Portfolio Website

A premium, minimal personal portfolio built with plain **HTML, CSS, JavaScript, and PHP** (no frameworks, no build step).

## File structure
```
portfolio/
├── index.html          → all page content
├── css/style.css        → design system + layout + dark mode
├── js/script.js          → nav, theme toggle, scroll reveal, contact form
├── php/contact.php       → contact form email handler
├── assets/
│   ├── img/               → SVG portrait & project mockups (replace with real images)
│   └── Muneeswaran-Resume.pdf   → add your real resume file here
└── README.md
```

## Before you publish, replace these placeholders

1. **Your photo** — swap `assets/img/portrait-placeholder.svg` for a real photo (e.g. `portrait.jpg`) and update the `src` on the `<img class="portrait-img">` tag in `index.html`.
2. **Project screenshots** — replace the four SVGs in `assets/img/` with real screenshots of your projects (same filenames, or update the `src` attributes).
3. **Resume** — add a file named `Muneeswaran-Resume.pdf` inside `assets/`, or change the `href` on the "Download Resume" button.
4. **Links & contact details** — search `index.html` for `yourusername` and `yourname@email.com` and `+91 00000 00000` and replace with your real GitHub, LinkedIn, email, and phone number. Also update the project "Code" / "Live Demo" `href="#"` links.
5. **Education details** — update college/school names, years, and CGPA in the About section's timeline.
6. **Certification links** — update the `href="#"` on each "View certificate" link in the Certifications section.

## Running it locally

This site needs a PHP-capable server for the contact form to work (plain double-clicking `index.html` will still show the whole site, only the form submission needs PHP).

```bash
cd portfolio
php -S localhost:8000
```
Then open `http://localhost:8000` in your browser.

## Setting up the contact form

Open `php/contact.php` and set `$recipientEmail` to your real email address. On most shared hosting (e.g. cPanel/GoDaddy/Hostinger), PHP's built-in `mail()` function used here will work out of the box. If your host requires authenticated SMTP, swap the `mail()` call for a library like PHPMailer.

## Notes

- Dark/light mode toggle uses the button in the navbar; the choice is kept for the current browsing session. To persist it across visits when self-hosting, uncomment the two `localStorage` lines marked in `js/script.js`.
- All icons are inline SVG — no icon-font or external dependency, so the page stays fast.
- Fonts (Poppins, Inter, JetBrains Mono) load from Google Fonts via `<link>` tags in `index.html`.
