// Krishnaswamy Nagar Ganga Nagar Matriculation School - shared scripts

// Mobile menu toggle
function toggleMenu() {
  var m = document.getElementById('m');
  if (m) m.classList.toggle('open');
}

// Footer year
document.addEventListener('DOMContentLoaded', function () {
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form handler
  var form = document.querySelector('form.form-card');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! We will get back to you shortly.');
      form.reset();
    });
  }
});
// SCROLL PROGRESS BAR
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  const progress = (scrollTop / docHeight) * 100;

  document.querySelector(".scroll-progress").style.width = progress + "%";
});