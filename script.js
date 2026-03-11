// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.about-grid, .timeline-item, .skill-card, .project-card, .achievement-card, .contact-inner, .section-title, .section-label'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// Stagger delays
['.skill-card', '.achievement-card', '.project-card'].forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });
});

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? '#2dd4bf' : '';
      });
    }
  });
}, { threshold: 0.4 }).observe.call(
  { observe: (el) => sections.forEach(s => new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? '#2dd4bf' : '';
        });
      }
    });
  }, { threshold: 0.4 }).observe(s)) }
);
