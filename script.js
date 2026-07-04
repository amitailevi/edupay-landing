// EduPay — Minimal JS
(() => {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50), { passive: true });

  document.querySelector('.mobile-toggle')?.addEventListener('click', () => navLinks.classList.toggle('open'));

  // Close mobile menu on link click
  navLinks?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );

  // Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    })
  );

  // Scroll animations with fallback
  const animated = document.querySelectorAll('[data-anim]');
  if (animated.length) {
    const show = el => el.classList.add('show');
    const observer = new IntersectionObserver(entries =>
      entries.forEach(e => e.isIntersecting && (show(e.target), observer.unobserve(e.target))),
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    );
    animated.forEach(el => observer.observe(el));
    // Fallback: show all after 2s in case observer doesn't fire
    setTimeout(() => animated.forEach(show), 2000);
  }

  // Counter animation
  document.querySelectorAll('.hero-stat .num').forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const format = n => (n >= 1000 ? n.toLocaleString('en-US') : String(n)) + suffix;
    el.textContent = format(target); // Set final value immediately as fallback

    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = performance.now();
      const duration = 1200;
      const animate = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = format(Math.floor(target * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      el.textContent = format(0);
      requestAnimationFrame(animate);
    }, { threshold: 0.5 });
    obs.observe(el);
  });
})();
