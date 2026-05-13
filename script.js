// Krishnaswamy Nagar Ganga Nagar Matriculation School - Shared Scripts

document.addEventListener('DOMContentLoaded', function () {
  // 1. FOOTER YEAR
  const yearSpan = document.getElementById('y');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 2. MOBILE MENU TOGGLE
  const menu = document.getElementById('m');
  const menuToggle = document.querySelector('.menu-toggle');

  function setMenuState(isOpen) {
    if (!menu) return;
    menu.classList.toggle('open', isOpen);
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }
  }

  window.toggleMenu = function () {
    if (!menu) return;
    setMenuState(!menu.classList.contains('open'));
  };

  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }

  if (menu) {
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) setMenuState(false);
      });
    });
  }

  document.addEventListener('click', (event) => {
    if (!menu || !menuToggle || window.innerWidth > 768) return;
    if (!menu.classList.contains('open')) return;
    const insideMenu = menu.contains(event.target);
    const onToggle = menuToggle.contains(event.target);
    if (!insideMenu && !onToggle) setMenuState(false);
  });

  // 3. REVEAL ON SCROLL
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.classList.contains('stats')) {
          animateStats();
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => revealObserver.observe(el));

  // 4. ANIMATED STATS COUNTER
  function animateStats() {
    const stats = document.querySelectorAll('.stat strong');
    stats.forEach((stat) => {
      const targetText = stat.textContent;
      const target = parseInt(targetText.replace(/\D/g, ''), 10);
      const suffix = targetText.replace(/[0-9]/g, '');
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + suffix;
        }
      }, 30);
    });
  }

  // 5. BACK TO TOP & SCROLL PROGRESS
  const btt = document.getElementById('backToTop');
  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle ? circle.r.baseVal.value : 0;
  const circumference = 2 * Math.PI * radius;

  if (circle) {
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
  }

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? scrollPos / totalHeight : 0;

    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) progressBar.style.width = (progress * 100) + '%';

    if (btt) {
      if (scrollPos > 400) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }

      if (circle) {
        const offset = circumference - (progress * circumference);
        circle.style.strokeDashoffset = offset;
      }
    }
  });

  if (btt) {
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. CONTACT FORM HANDLER
  const form = document.querySelector('form.form-card');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Thank you! We will get back to you shortly.');
      form.reset();
    });
  }

  // 7. GALLERY LIGHTBOX
  const galleryTiles = document.querySelectorAll('.gallery-grid .tile img');
  let closeLightbox = null;

  if (galleryTiles.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="lb-close">&times;</span>
      <img class="lb-content" src="" alt="Expanded gallery image">
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lb-content');
    const lightboxClose = lightbox.querySelector('.lb-close');
    closeLightbox = function () {
      lightbox.classList.remove('active');
    };

    galleryTiles.forEach((image) => {
      image.style.cursor = 'zoom-in';
      image.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || 'Expanded gallery image';
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuState(false);
      if (closeLightbox) closeLightbox();
    }
  });
});
