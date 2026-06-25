// Krishnaswamy Nagar Ganga Nagar Matriculation School - Shared Scripts
// LOADING SCREEN
window.addEventListener('load', function () {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 600); // match transition duration
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const pageLoader = document.getElementById('page-loader');

window.addEventListener('load', () => {

  if(pageLoader){
      pageLoader.style.display='none';
  }

});
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
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setMenuState(!menu.classList.contains('open'));
    });
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

  const progressBar = document.querySelector('.scroll-progress');
  let isScrolling = false;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const scrollPos = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? scrollPos / totalHeight : 0;

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
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  if (btt) {
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // CUSTOM TOAST NOTIFICATION
  function showNotification(message, type = 'success') {
    const existing = document.querySelector('.custom-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;

    const iconSvg = type === 'success'
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <h4>${type === 'success' ? 'Message Sent' : 'Delivery Failed'}</h4>
        <p>${message}</p>
      </div>
      <button class="toast-close" aria-label="Close message">&times;</button>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    });

    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
      }
    }, 5000);
  }

  if (typeof emailjs !== 'undefined') {
    emailjs.init("_4fpT5e0uh0wc-TR6");
  }

  const enquiryForm = document.getElementById("enquiry-form");

  if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      const templateParams = {
        from_name: enquiryForm.from_name.value,
        from_email: enquiryForm.from_email.value,
        phone: enquiryForm.phone.value,
        subject: enquiryForm.subject.value,
        message: enquiryForm.message.value
      };

      // Mail to school
      emailjs.send(
        "service_yzhxdi9",
        "template_4wy93ot",
        templateParams
      )
        .then(() => {
          showNotification("Thank you! We will get back to you shortly.", "success");
          enquiryForm.reset();
        })
        .catch((error) => {
          console.error("FAILED...", error);
          showNotification("Something went wrong. Please try again later.", "error");
        })
        .finally(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        });
    });

  }
  // 7. GALLERY LIGHTBOX
  const galleryTiles = document.querySelectorAll('.gallery-grid .tile img');
  let closeLightbox = null;

  if (galleryTiles.length > 0) {
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <span class="lb-close">&times;</span>
        <img class="lb-content" src="" alt="Expanded gallery image">
      `;
      document.body.appendChild(lightbox);
    }

    const lightboxImage = lightbox.querySelector('.lb-content');
    const lightboxClose = lightbox.querySelector('.lb-close');
    const openLightbox = function (image) {
      lightbox.classList.add('active');
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt || 'Expanded gallery image';
    };

    closeLightbox = function () {
      lightbox.classList.remove('active');
    };

    galleryTiles.forEach((image) => {
      image.style.cursor = 'zoom-in';
      image.addEventListener('click', () => {
        openLightbox(image);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  // 8. STAGGERED GALLERY ANIMATION
  const galleryGrid = document.querySelector('.gallery-grid');
  if (galleryGrid) {
    const tiles = galleryGrid.querySelectorAll('.tile');
    const tileObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(tiles).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (index % 3) * 150);
          tileObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    tiles.forEach((tile) => tileObserver.observe(tile));
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuState(false);
      if (closeLightbox) closeLightbox();
    }
  });
});
