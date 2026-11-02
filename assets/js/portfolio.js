/* Native browser APIs only. All professional content lives in static HTML. */
(() => {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const closeMenu = () => { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    closeMenu();
    const destination = document.getElementById(event.target.closest('a').hash.slice(1));
    if (destination) { destination.tabIndex = -1; destination.focus({ preventScroll: true }); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  const desktop = window.matchMedia('(min-width: 1001px)');
  desktop.addEventListener('change', closeMenu);

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('.project-card')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    projects.forEach(card => {
      const show = JSON.parse(card.dataset.groups).includes(button.dataset.filter);
      card.hidden = !show;
      card.classList.remove('filter-enter');
      if (show) { count++; if (!motion.matches) { void card.offsetWidth; card.classList.add('filter-enter'); } }
    });
    document.querySelector('.project-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
  }));

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox.querySelector('img');
  let imageTrigger;
  document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
    imageTrigger = button;
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.dataset.title;
    document.querySelector('#lightbox-title').textContent = button.dataset.title;
    lightbox.showModal();
  }));
  document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) {
    const r = lightbox.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) lightbox.close();
  }});
  lightbox.addEventListener('close', () => { imageTrigger?.focus({ preventScroll: true }); });

  const nodes = [...document.querySelectorAll('.system-node')];
  const routes = [...document.querySelectorAll('[data-route]')];
  const description = document.querySelector('.node-detail');
  const activateNode = node => {
    routes.forEach(route => route.classList.toggle('active', route.dataset.route.split(' ').includes(node.dataset.node)));
    description.textContent = node.dataset.description;
  };
  nodes.forEach(node => {
    node.addEventListener('pointerenter', () => activateNode(node));
    node.addEventListener('focus', () => activateNode(node));
    node.addEventListener('click', () => activateNode(node));
  });
  const architecture = document.querySelector('.architecture');
  architecture.addEventListener('pointerleave', () => {
    if (architecture.contains(document.activeElement)) return;
    routes.forEach(route => route.classList.remove('active'));
    description.textContent = 'Explore a node. Cyan paths carry data; violet paths show governance.';
  });
  // Decorative traffic stops outside the viewport and while the document is hidden.
  let architectureVisible = true;
  let userPaused = false;
  const motionToggle = document.querySelector('.motion-toggle');
  motionToggle.addEventListener('click', () => {
    userPaused = !userPaused;
    motionToggle.setAttribute('aria-pressed', String(userPaused));
    updateTraffic();
  });
  const updateTraffic = () => {
    document.querySelector('.signals').style.animationPlayState = architectureVisible && !document.hidden && !motion.matches && !userPaused ? 'running' : 'paused';
    motionToggle.disabled = motion.matches;
    motionToggle.textContent = motion.matches ? 'Motion reduced' : userPaused ? 'Resume motion' : 'Pause motion';
  };
  document.addEventListener('visibilitychange', updateTraffic);
  motion.addEventListener('change', updateTraffic);

  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); reveal.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(element => reveal.observe(element));
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        nav.querySelectorAll('a').forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-12% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
    const careerObserver = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-active', entry.isIntersecting)), { rootMargin: '-10% 0px -15% 0px' });
    document.querySelectorAll('.timeline-entry').forEach(entry => careerObserver.observe(entry));
    const architectureObserver = new IntersectionObserver(entries => { architectureVisible = entries[0].isIntersecting; updateTraffic(); });
    architectureObserver.observe(architecture);
  }
  const progress = document.querySelector('.scroll-progress');
  const timeline = document.querySelector('.career-timeline');
  let scheduled = false;
  function updateScroll() {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${available > 0 ? window.scrollY / available : 0})`;
    const rect = timeline.getBoundingClientRect();
    const position = Math.max(0, Math.min(1, (window.innerHeight * .65 - rect.top) / rect.height));
    timeline.style.setProperty('--timeline-progress', `${position * 100}%`);
    scheduled = false;
  }
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  window.addEventListener('resize', updateScroll);
  updateScroll(); updateTraffic();
})();
