// ===== HAMBURGER MENU =====
function closeMobile() {
  document.getElementById('mobileNav')?.classList.remove('open');
  document.getElementById('hamburger')?.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');

  hamburger?.addEventListener('click', () => {
    mobileNav.classList.add('open');
    hamburger.classList.add('active');
  });
  mobileClose?.addEventListener('click', closeMobile);

  // ===== HERO SLIDER =====
  const heroBgSlider = document.getElementById('heroBgSlider');
  if (heroBgSlider) {
    const bgImages = heroBgSlider.querySelectorAll('.hero-bg');
    const heroBgDots = document.getElementById('heroBgDots');
    const prevBtn = document.getElementById('prevBgBtn');
    const nextBtn = document.getElementById('nextBgBtn');
    let currentIndex = 0;
    let timer;

    bgImages.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'hero-bg-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      heroBgDots?.appendChild(dot);
    });

    function updateDots() {
      heroBgDots?.querySelectorAll('.hero-bg-dot').forEach((d, i) =>
        d.classList.toggle('active', i === currentIndex)
      );
    }

    function goTo(index) {
      bgImages[currentIndex].classList.remove('active');
      currentIndex = index;
      bgImages[currentIndex].classList.add('active');
      updateDots();
    }

    function next() { goTo((currentIndex + 1) % bgImages.length); }
    function prev() { goTo((currentIndex - 1 + bgImages.length) % bgImages.length); }

    function startTimer() { timer = setInterval(next, 5000); }
    function resetTimer() { clearInterval(timer); startTimer(); }

    prevBtn?.addEventListener('click', () => { prev(); resetTimer(); });
    nextBtn?.addEventListener('click', () => { next(); resetTimer(); });

    setTimeout(startTimer, 1200);
  }

  // ===== SCROLL REVEAL =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
        closeMobile();
      }
    });
  });

  // ===== CONTACT FORM =====
  document.querySelector('.contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.submit-btn');
    btn.textContent = '¡Enviado!';
    btn.style.background = '#2d7a5f';
    setTimeout(() => {
      btn.textContent = 'Enviar Consulta';
      btn.style.background = '';
      this.reset();
    }, 3000);
  });

  // ===== PROFESIONALES SEARCH =====
  const searchInput = document.getElementById('proSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const q = this.value.toLowerCase();
      document.querySelectorAll('#proTable tbody tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
});
