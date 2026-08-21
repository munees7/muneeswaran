/* =========================================================
   MUNEESWARAN — PORTFOLIO SCRIPT
   Handles: navbar scroll state, mobile menu, active-link
   tracking, dark/light theme, scroll-reveal, contact form.
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Navbar scroll shadow ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinkEls = Array.from(document.querySelectorAll('.nav-link'));

  const setActiveLink = (id) => {
    navLinkEls.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Certificate lightbox ---------- */
  const lightbox = document.getElementById('certLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxIssuer = document.getElementById('lightboxIssuer');
  let lastFocusedEl = null;

  const openLightbox = (trigger) => {
    const { certImg, certTitle, certIssuer } = trigger.dataset;
    lightboxImg.src = certImg;
    lightboxImg.alt = `${certTitle} certificate`;
    lightboxTitle.textContent = certTitle;
    lightboxIssuer.innerHTML = certIssuer || '';
    lastFocusedEl = document.activeElement;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close').focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  };

  document.querySelectorAll('[data-cert-img]').forEach((trigger) => {
    trigger.addEventListener('click', () => openLightbox(trigger));
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  /* ---------- Contact form submission ---------- */
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('formSubmit');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot check — if filled, silently treat as spam
      const honeypot = form.querySelector('#website').value;
      if (honeypot) return;

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !subject || !message) {
        statusEl.textContent = 'Please fill in every field before sending.';
        statusEl.className = 'form-status error';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Sending...';
      statusEl.textContent = '';
      statusEl.className = 'form-status';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim(),
          }),
        });

        if (response.ok) {
          statusEl.textContent = 'Message sent — thanks for reaching out! I\'ll reply soon.';
          statusEl.className = 'form-status success';
          form.reset();
        } else {
          const result = await response.json().catch(() => ({}));
          statusEl.textContent = result.error || 'Something went wrong. Please email me directly instead.';
          statusEl.className = 'form-status error';
        }
      } catch (err) {
        statusEl.textContent = 'Connection error. If you\'re viewing this file locally, try opening it with a local server (right-click index.html → "Open with Live Server") or deploy the site to a hosting service.';
        statusEl.className = 'form-status error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      }
    });
  }
})();
