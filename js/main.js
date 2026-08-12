/* ==========================================================================
   MAIN JAVASCRIPT — Patrick Melaga Portfolio
   Dual Theme Toggle, Mobile Navigation Drawer, 10 Cameroonian Projects Modal,
   Real Working Contact Form & Touch Optimization
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. DUAL THEME TOGGLE SYSTEM (LIGHT / DARK MODE)
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  const savedTheme = localStorage.getItem('pm_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('pm_theme', isLight ? 'light' : 'dark');

      if (themeIcon) {
        if (isLight) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        } else {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNavDrawer.classList.toggle('active');
    });

    // Close when clicking links
    mobileNavDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('active');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNavDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileNavDrawer.classList.remove('active');
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. LENIS SMOOTH SCROLL INITIALIZATION
     ------------------------------------------------------------------------ */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false // Native touch scroll on mobile devices
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* ------------------------------------------------------------------------
     4. CUSTOM MAGNETIC CURSOR
     ------------------------------------------------------------------------ */
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (cursorDot && cursorRing && window.innerWidth > 992) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const hoverTargets = document.querySelectorAll('a, button, .glass-card, .project-card-10, .filter-chip, .tech-badge-item');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ------------------------------------------------------------------------
     5. 3D CARD TILT & MOUSE GLOW (Desktop Only)
     ------------------------------------------------------------------------ */
  if (window.innerWidth > 992) {
    const tiltCards = document.querySelectorAll('.glass-card, .project-card-10, .photo-frame');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. GSAP REVEAL ANIMATIONS
     ------------------------------------------------------------------------ */
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-text > *, .hero-photo-wrapper', {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });

    gsap.utils.toArray('.section-label, .section-title, .section-subtitle').forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. 10 CAMEROONIAN & GLOBAL PROJECTS DATA & MODAL SYSTEM
     ------------------------------------------------------------------------ */
  const cameroonProjects = {
    feelinx: {
      title: 'Feelinx — Application Mobile Rencontre & Social',
      location: 'Yaoundé, Douala & Afrique',
      category: 'App Mobile • Flutter / Firebase',
      desc: 'Application mobile de rencontre et réseau social africain. Algorithme de correspondance basé sur le profil psychologique, SMS Firebase, paiement Mobile Money et direction artistique Photoshop sur-mesure.',
      tech: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Photoshop UI', 'MoMo API'],
      link: '#'
    },
    cnps: {
      title: 'CNPS CyberGuard — IA de Détection des Cybermenaces',
      location: 'CNPS Siège, Yaoundé',
      category: 'IA & Sécurité • Python / Machine Learning',
      desc: 'Système d’IA et de sécurité réseau déployé pour la Caisse Nationale de Prévoyance Sociale (CNPS Yaoundé). Analyse en temps réel des paquets de données, détection d’anomalies comportementales et tableau de bord de surveillance cyberdéfense.',
      tech: ['Python', 'Scikit-Learn', 'Django', 'MySQL', 'Pandas', 'Cybersecurity Shield'],
      link: '#'
    },
    kurius: {
      title: 'Kurius E-Commerce Hub — Marketplace Cameroun',
      location: 'Douala & Yaoundé',
      category: 'E-Commerce • Django / MySQL / Mobile Money',
      desc: 'Plateforme e-commerce haut de gamme connectant les créateurs et entreprises camerounaises aux consommateurs. Intégration native des paiements Mobile Money (MTN MoMo, Orange Money) et tableau de bord marchand complet.',
      tech: ['Django', 'Python', 'MySQL', 'JavaScript ES6+', 'MoMo API', 'Tailored CSS'],
      link: '#'
    },
    douala_port: {
      title: 'Douala Smart Port Logistics Platform',
      location: 'Port Autonome de Douala (PAD)',
      category: 'Web Platform • Node.js / MySQL / Realtime Maps',
      desc: 'Système web de gestion et suivi en temps réel du transit conteneurs au Port Autonome de Douala. Géolocalisation des navires, gestion des bons de sortie et facturation automatisée.',
      tech: ['Node.js', 'Express', 'MySQL', 'Leaflet Maps API', 'WebSockets', 'Chart.js'],
      link: '#'
    },
    snh: {
      title: 'SNH Energy Analytics Portal',
      location: 'Société Nationale des Hydrocarbures, Yaoundé',
      category: 'IA & Sécurité • Python / Predictive AI',
      desc: 'Portail décisionnel d’analyse prédictive de la production pétrolière et gazière pour la SNH Yaoundé. Modélisation mathématique, tableaux de bord interactifs et sécurisation des données stratégiques.',
      tech: ['Python', 'FastAPI', 'TensorFlow', 'PostgreSQL/MySQL', 'Chart.js', 'Docker'],
      link: '#'
    },
    afriland: {
      title: 'Afriland First Bank Digital Onboarding',
      location: 'Afriland Siège, Yaoundé',
      category: 'Site Vitrine • HTML5 / CSS3 / Security JS',
      desc: 'Portail web vitrine et d’ouverture de compte en ligne sécurisée pour Afriland First Bank Yaoundé. Expérience utilisateur fluide, vérification d’identité KYC et sécurité bancaire renforcée.',
      tech: ['HTML5 Sémantique', 'CSS3 Modern Grid', 'JavaScript ES6+', 'Crypto API', 'Photoshop UI'],
      link: '#'
    },
    sabc: {
      title: 'Brasseries du Cameroun (SABC) Brand Experience',
      location: 'SABC Cameroun',
      category: 'E-Commerce & Vitrine • Web Interactive',
      desc: 'Site web vitrine interactif et système d’authentification des lots par code QR pour les Boissons du Cameroun (SABC). Visualisation 3D des produits et engagement consommateur.',
      tech: ['JavaScript Vanilla', 'GSAP', 'WebGL / Canvas', 'Node.js', 'QR Code Engine'],
      link: '#'
    },
    yaounde_transport: {
      title: 'Yaoundé Urban Mobility & Transports App',
      location: 'Communauté Urbaine de Yaoundé',
      category: 'App Mobile • Flutter / GPS Maps',
      desc: 'Application mobile de cartographie urbaine et de réservation de transports pour la ville de Yaoundé. Calcul d’itinéraires en temps réel et paiement dématérialisé.',
      tech: ['Flutter', 'OpenStreetMap API', 'Node.js', 'MySQL', 'Firebase Messaging'],
      link: '#'
    },
    kribi_port: {
      title: 'Kribi Deep Seaport Telemetry Portal',
      location: 'Port de Kribi',
      category: 'Web Platform • Python / Django / Telemetry',
      desc: 'Interface de supervision maritime et télémétrie en temps réel des accès portuaires de Kribi. Analyse des flux logistiques et rapports automatisés.',
      tech: ['Python', 'Django', 'MySQL', 'WebSockets', 'GSAP Charts'],
      link: '#'
    },
    ccima: {
      title: 'Chambre de Commerce du Cameroun (CCIMA)',
      location: 'CCIMA Yaoundé & Douala',
      category: 'Site Vitrine & Platform • Web Gouvernemental',
      desc: 'Portail institutionnel de la CCIMA pour l’accompagnement des PME camerounaises, l’enregistrement des entreprises et la promotion des exportations internationales.',
      tech: ['Django', 'Python', 'MySQL', 'CSS Grid', 'SEO Engine'],
      link: '#'
    }
  };

  // Filter Chips Logic
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-card-10');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterVal = chip.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Project Modal Logic
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');

  document.querySelectorAll('.project-card-10').forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      const data = cameroonProjects[projectId];

      if (data && projectModal) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = `${data.category} • ${data.location}`;
        modalDesc.textContent = data.desc;
        modalTech.innerHTML = data.tech.map(t => `<span class="project-tag" style="padding: 6px 12px; font-size: 0.85rem;">${t}</span>`).join('');
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  /* ------------------------------------------------------------------------
     8. REAL WORKING CONTACT FORM & DIRECT EMAIL DELIVERABILITY
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const message = document.getElementById('form-message').value;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane fa-spin"></i> Envoi direct à Patrick...';

      // Direct mailto link generation
      const mailtoUrl = `mailto:patrickmelaga@outlook.com?subject=${encodeURIComponent('Nouveau Projet Web - ' + name)}&body=${encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;

        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Client Mail Ouvert !';
        submitBtn.style.background = 'var(--gradient-emerald)';

        if (formStatus) {
          formStatus.innerHTML = `✨ Merci <strong>${name}</strong> ! Votre application e-mail s'est ouverte pour envoyer votre message directement à <strong>patrickmelaga@outlook.com</strong>.`;
          formStatus.style.color = 'var(--accent-emerald)';
        }

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = 'var(--gradient-accent)';
        }, 6000);
      }, 600);
    });
  }

});
