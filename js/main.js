/* ============================================================
   TENDERCARE COMPREHENSIVE COLLEGE — main.js
   Scroll animations · Nav · Page transitions · Feed · Counters
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav scroll state ---
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile drawer toggle ---
  const toggle = document.querySelector('.nav__toggle');
  const drawer = document.querySelector('.nav__drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      drawer.classList.toggle('nav__drawer--open');
      document.body.style.overflow = drawer.classList.contains('nav__drawer--open') ? 'hidden' : '';
    });
    drawer.querySelectorAll('.nav__drawer-link').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('nav__drawer--open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Intersection Observer for scroll animations ---
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (animatedEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    animatedEls.forEach(el => observer.observe(el));
  }

  // --- Animated counters ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const start = performance.now();

          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => countObserver.observe(el));
  }

  // --- Yearbook card flip (touch support) ---
  document.querySelectorAll('.yearbook__card--flip').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // --- Page transition overlay ---
  const overlay = document.querySelector('.page-transition');
  if (overlay) {
    // Animate out on load
    overlay.classList.remove('page-transition--in');
    overlay.classList.add('page-transition--out');
    setTimeout(() => { overlay.style.display = 'none'; }, 500);

    // Animate in on internal link click
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
      link.addEventListener('click', e => {
        e.preventDefault();
        overlay.style.display = 'block';
        overlay.classList.remove('page-transition--out');
        overlay.classList.add('page-transition--in');
        setTimeout(() => { window.location.href = href; }, 420);
      });
    });
  }

  // --- Parallax on hero backgrounds ---
  const parallaxEls = document.querySelectorAll('.parallax');
  if (parallaxEls.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.speed || 0.3);
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }, { passive: true });
  }

  // --- Feed: simulate new post pulse ---
  const feed = document.querySelector('.feed__posts');
  if (feed) {
    // Highlight pinned posts on load
    const pinned = feed.querySelectorAll('.feed__post--pinned');
    pinned.forEach((p, i) => {
      setTimeout(() => p.classList.add('feed__post--new'), i * 200);
    });
  }

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.endsWith(currentPage))) {
      link.classList.add('nav__link--active');
    }
  });

});
