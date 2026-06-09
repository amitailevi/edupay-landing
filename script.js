// EduPay — Minimal JS
(() => {
  // Nav scroll effect
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50), { passive: true });

  // Mobile menu
  document.querySelector('.mobile-toggle')?.addEventListener('click', () =>
    document.querySelector('.nav-links').classList.toggle('open'));

  // Scroll animations
  const observer = new IntersectionObserver(entries =>
    entries.forEach(e => e.isIntersecting && e.target.classList.add('show')),
    { threshold: 0.1 }
  );
  document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

  // Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    })
  );

  // Counter animation
  document.querySelectorAll('.hero-stat .num').forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let current = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }, 30);
    });
    obs.observe(el);
  });
})();
