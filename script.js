// Krishnaswamy Nagar Ganga Nagar Matriculation School - Shared Scripts

document.addEventListener('DOMContentLoaded', function () {
  // 1. FOOTER YEAR
  const yearSpan = document.getElementById('y');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 2. MOBILE MENU TOGGLE
  window.toggleMenu = function() {
    const menu = document.getElementById('m');
    if (menu) menu.classList.toggle('open');
  };

  // 3. REVEAL ON SCROLL
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // If it's the stats section, trigger counter
        if (entry.target.classList.contains('stats')) {
          animateStats();
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. ANIMATED STATS COUNTER
  function animateStats() {
    const stats = document.querySelectorAll('.stat strong');
    stats.forEach(stat => {
      const targetText = stat.textContent;
      const target = parseInt(targetText.replace(/\D/g, ''));
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
    const progress = scrollPos / totalHeight;

    // Update scroll progress bar
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) progressBar.style.width = (progress * 100) + '%';

    // Update Back to Top visibility & ring
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
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! We will get back to you shortly.');
      form.reset();
    });
  }

  // 7. LIGHTBOX FOR GALLERY
  const galleryTiles = document.querySelectorAll('.gallery-grid .tile img');
  if (galleryTiles.length > 0) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `
      <span class="lb-close">&times;</span>
      <img class="lb-content" src="" alt="Full view">
    `;
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('.lb-content');
    const lbClose = lb.querySelector('.lb-close');
    galleryTiles.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lb.classList.add('active');
        lbImg.src = img.src;
      });
    });
    lbClose.addEventListener('click', () => lb.classList.remove('active'));
    lb.addEventListener('click', (e) => {
      if (e.target === lb) lb.classList.remove('active');
    });
  }

  // 8. SKELETON LOADER REMOVAL
  const skeletonImages = document.querySelectorAll('img');
  skeletonImages.forEach(img => {
    if (!img.complete) {
      img.parentElement.classList.add('skeleton');
      img.addEventListener('load', () => {
        img.parentElement.classList.remove('skeleton');
      });
    }
  });
});