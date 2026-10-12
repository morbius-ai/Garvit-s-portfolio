/**
 * ============================================================================
 * GARVIT SINGH RANA - PORTFOLIO INTERACTIVITY SCRIPT
 * Vanilla ES6+, Zero Dependencies, High-Performance
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------- 1. THEME SWITCHER (DARK / LIGHT) --------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Initialize theme from localStorage or default to 'dark'
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);

      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  }

  // -------------------- 2. DYNAMIC TYPED TEXT EFFECT --------------------
  const typedTextElement = document.getElementById('typed-text');
  if (typedTextElement) {
    const roles = [
      'B.Tech Student',
      'AI & Technology Enthusiast',
      'Web Developer',
      'Digital Productivity Builder',
      'Creative Software Explorer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 45;
    const pauseDelay = 1800;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        // Typing forward
        typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeEffect, pauseDelay);
          return;
        }
      } else {
        // Deleting backward
        typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeEffect, 400);
          return;
        }
      }

      setTimeout(typeEffect, isDeleting ? deleteSpeed : typeSpeed);
    }

    // Start typing after subtle initial pause
    setTimeout(typeEffect, 600);
  }

  // -------------------- 3. HEADER SCROLL & ACTIVE SCROLLSPY --------------------
  const siteHeader = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header blur/shadow effect
    if (siteHeader) {
      if (scrollY > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Active Section Scrollspy
    let currentSectionId = '';
    const scrollThreshold = scrollY + 160;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollThreshold >= sectionTop && scrollThreshold < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Update Desktop Nav Links
    desktopNavLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    // Update Mobile Nav Links
    mobileNavLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger on initial load

  // -------------------- 4. MOBILE HAMBURGER MENU DRAWER --------------------
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav');

  function closeMobileNav() {
    if (menuToggle && mobileNavDrawer) {
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNavDrawer.classList.remove('open');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
    }
  }

  function toggleMobileNav() {
    if (menuToggle && mobileNavDrawer) {
      const isOpen = mobileNavDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        mobileNavDrawer.classList.add('open');
        mobileNavDrawer.setAttribute('aria-hidden', 'false');
      }
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileNav);
  }

  // Close mobile drawer when clicking any mobile link
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close drawer if clicking outside
  document.addEventListener('click', (e) => {
    if (
      mobileNavDrawer &&
      mobileNavDrawer.classList.contains('open') &&
      !mobileNavDrawer.contains(e.target) &&
      menuToggle &&
      !menuToggle.contains(e.target)
    ) {
      closeMobileNav();
    }
  });

  // -------------------- 5. SKILLS FILTERING --------------------
  const filterBtns = document.querySelectorAll('.skills-filter-tabs .filter-btn');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // -------------------- 6. COPY EMAIL FUNCTIONALITY --------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailToCopy = 'Morbius424@gmail.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback for older environments
          const tempInput = document.createElement('textarea');
          tempInput.value = emailToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        const tooltip = copyEmailBtn.querySelector('.tooltip');
        if (tooltip) {
          tooltip.textContent = 'Copied!';
          setTimeout(() => {
            tooltip.textContent = 'Copy';
          }, 2500);
        }

        showToast(`Email copied: ${emailToCopy}`);
      } catch (err) {
        showToast(`Email: ${emailToCopy}`);
      }
    });
  }

  // -------------------- 7. INTERACTIVE CONTACT FORM --------------------
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkField(input, condition) {
      const formGroup = input.closest('.form-group');
      if (!condition) {
        formGroup.classList.add('has-error');
        return false;
      } else {
        formGroup.classList.remove('has-error');
        return true;
      }
    }

    // Clear errors on input
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.closest('.form-group').classList.remove('has-error');
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = checkField(nameInput, nameInput.value.trim().length > 0);
      const isEmailValid = checkField(emailInput, validateEmail(emailInput.value.trim()));
      const isMessageValid = checkField(messageInput, messageInput.value.trim().length > 0);

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        showToast('Please fix the errors in the form.');
        return;
      }

      const senderName = encodeURIComponent(nameInput.value.trim());
      const senderSubject = encodeURIComponent(subjectInput.value.trim() || 'Portfolio Inquiry');
      const senderMessage = encodeURIComponent(
        `Hi Garvit,\n\nFrom: ${nameInput.value.trim()} (${emailInput.value.trim()})\n\nMessage:\n${messageInput.value.trim()}`
      );

      // Construct mailto link
      const mailtoLink = `mailto:Morbius424@gmail.com?subject=${senderSubject}&body=${senderMessage}`;

      showToast(`Thank you, ${nameInput.value.trim()}! Preparing email client...`);

      // Launch mailto fallback
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 700);

      contactForm.reset();
    });
  }

  // -------------------- 8. PROJECT MODAL DETAILS --------------------
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCloseAction = document.getElementById('modal-close-action');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');

  const projectDetails = {
    'portfolio-project': {
      tag: 'Frontend & UI/UX Design System',
      title: 'Personal Portfolio Website',
      liveUrl: '#home',
      liveLabel: 'Explore Live Portfolio ↗',
      github: 'https://github.com/Morbius-ai',
      content: `
        <p><strong>Design Concept:</strong> A futuristic, glassmorphic portfolio engineered for Garvit Singh Rana, B.Tech Student at JECRC University. Incorporates fluid typography, dual themes, and micro-interactions.</p>
        
        <div class="modal-design-block">
          <div class="modal-design-title">🎨 Color Palette & Design Tokens</div>
          <div class="swatch-group">
            <span class="swatch-pill"><span class="swatch-color" style="background:#090d16"></span>#090D16 Deep Obsidian</span>
            <span class="swatch-pill"><span class="swatch-color" style="background:#6366f1"></span>#6366F1 Brand Indigo</span>
            <span class="swatch-pill"><span class="swatch-color" style="background:#06b6d4"></span>#06B6D4 Electric Cyan</span>
            <span class="swatch-pill"><span class="swatch-color" style="background:#f8fafc"></span>#F8FAFC Ghost White</span>
          </div>
          <div class="specs-grid">
            <div class="spec-item"><strong>Typography</strong>Outfit (Headings) + Plus Jakarta Sans (Body)</div>
            <div class="spec-item"><strong>Visual Effects</strong>Glassmorphism, Ambient Orbs, Blur Filter</div>
            <div class="spec-item"><strong>Interactions</strong>Typewriter Hero, Theme Switcher, Nav Spy</div>
            <div class="spec-item"><strong>Build Architecture</strong>Pure Semantic HTML5, CSS3, Vanilla ES6+</div>
          </div>
        </div>

        <p><strong>Key Highlights:</strong></p>
        <ul style="margin-left: 1.25rem; margin-top: 0.5rem; line-height: 1.7;">
          <li>Zero-dependency static asset delivery ready for immediate Vercel deployment.</li>
          <li>System and local-persisted Dark/Light theme switching.</li>
          <li>Browser mockup window previews on cards displaying actual micro-UI designs.</li>
          <li>Comprehensive 7-section layout with responsive navigation drawer.</li>
        </ul>
      `
    },
    'ai-project': {
      tag: 'AI & Machine Intelligence',
      title: 'NeuroPulse AI Studio (AI Website Project)',
      liveUrl: './ai-website.html',
      liveLabel: 'Launch AI Studio Website ↗',
      github: 'https://github.com/Morbius-ai',
      content: `
        <p><strong>Design Concept:</strong> A cutting-edge Generative AI workbench application designed for developers and university students to run prompt workflows, synthesize study cheat-sheets, and benchmark multi-model LLMs.</p>

        <div class="modal-design-block">
          <div class="modal-design-title">🎨 UI/UX Design System & Tokens</div>
          <div class="swatch-group">
            <span class="swatch-pill"><span class="swatch-color" style="background:#090d16"></span>#090D16 Cyber Black</span>
            <span class="swatch-pill"><span class="swatch-color" style="background:#06b6d4"></span>#06B6D4 AI Cyan</span>
            <span class="swatch-pill"><span class="swatch-color" style="background:#6366f1"></span>#6366F1 Deep Indigo</span>
            <span class="swatch-pill"><span class="swatch-color" style="background:#ec4899"></span>#EC4899 Synth Pink</span>
          </div>
          <div class="specs-grid">
            <div class="spec-item"><strong>Typography</strong>Outfit + Plus Jakarta Sans + JetBrains Mono</div>
            <div class="spec-item"><strong>Layout</strong>Responsive Dual-Pane Studio Workbench</div>
            <div class="spec-item"><strong>AI Models</strong>Claude 3.5, GPT-4o, Gemini 1.5 Pro, DeepSeek R1</div>
            <div class="spec-item"><strong>Latency / Stats</strong>Real-time token counting & latency simulator</div>
          </div>
        </div>

        <p><strong>Interactive Features:</strong></p>
        <ul style="margin-left: 1.25rem; margin-top: 0.5rem; line-height: 1.7;">
          <li>Prompt template library: DSA Algorithm Explainer, B.Tech Exam Summary, Resume Polisher.</li>
          <li>Interactive sliders for Temperature (0.0 - 1.0) and Token length (256 - 2048).</li>
          <li>Simulated streaming response generation with code syntax highlighting and one-click copy.</li>
          <li>Instant keyboard shortcut trigger with <kbd>Ctrl+Enter</kbd>.</li>
        </ul>
      `
    },
    'productivity-project': {
      tag: 'Productivity & Utilities',
      title: 'StudyFlow Hub (Student Productivity Project)',
      liveUrl: './student-productivity.html',
      liveLabel: 'Launch StudyFlow Website ↗',
      github: 'https://github.com/Morbius-ai',
      content: `
        <p><strong>Design Concept:</strong> An all-in-one digital productivity operating system built specifically for university students, consolidating focus intervals, daily lecture timelines, and assignment boards.</p>

        <div class="modal-design-block">
          <div class="modal-design-title">🎨 UI/UX Design System & Tokens</div>
          <div class="swatch-group">
            <span class="swatch-pill"><span class="swatch-color" style="background:#0a0f18"></span>#0A0F18 Deep Base</span>
            <span class="swatch-pill"><span class="swatch-color" style="background:#10b981"></span>#10B981 Focus Emerald</span>
            <span class="swatch-pill"><span class="swatch-color" style="background:#14b8a6"></span>#14B8A6 Academic Teal</span>
            <span class="swatch-pill"><span class="swatch-color" style="background:#f43f5e"></span>#F43F5E Urgent Rose</span>
          </div>
          <div class="specs-grid">
            <div class="spec-item"><strong>Typography</strong>Outfit + Plus Jakarta Sans + JetBrains Mono</div>
            <div class="spec-item"><strong>Dashboard</strong>Tri-Column Focus, Tasks & Timetable Matrix</div>
            <div class="spec-item"><strong>Storage</strong>Persistent LocalStorage for notes & task lists</div>
            <div class="spec-item"><strong>Timers</strong>25m Focus / 5m Rest / 15m Break with SVG ring</div>
          </div>
        </div>

        <p><strong>Interactive Features:</strong></p>
        <ul style="margin-left: 1.25rem; margin-top: 0.5rem; line-height: 1.7;">
          <li>Interactive Pomodoro timer with animated circular progress ring and audible alert.</li>
          <li>Real-time campus lecture timetable with active class indicator and classroom details.</li>
          <li>Interactive assignment tracker with priority tags, status updates, and task deletion.</li>
          <li>Auto-saving quick scratchpad notepad for lecture snippets and deadlines.</li>
        </ul>
      `
    }
  };

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !projectModal) return;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.content;
    if (modalGithubLink) modalGithubLink.href = data.github;

    if (modalLiveLink) {
      if (data.liveUrl) {
        modalLiveLink.style.display = 'inline-flex';
        modalLiveLink.href = data.liveUrl;
        if (data.liveUrl === '#home') {
          modalLiveLink.target = '_self';
          modalLiveLink.addEventListener('click', closeProjectModal, { once: true });
        } else {
          modalLiveLink.target = '_blank';
        }
        modalLiveLink.innerHTML = `<span>${data.liveLabel || 'Open Live Site ↗'}</span>`;
      } else {
        modalLiveLink.style.display = 'none';
      }
    }

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeProjectModal);

  // Close modal when clicking on backdrop
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // -------------------- 9. BACK TO TOP BUTTON --------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------- 10. CURRENT YEAR IN FOOTER --------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // -------------------- 11. TOAST NOTIFICATION UTILITY --------------------
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
