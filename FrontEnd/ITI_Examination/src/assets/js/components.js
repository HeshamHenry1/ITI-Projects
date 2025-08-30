/* Reusable components: navbar and footer */
(function () {
  const current = location.pathname.split('/').pop() || 'index.html';

  const links = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'courses.html', label: 'Courses' },
    { href: 'exams.html', label: 'Exams' },
    { href: 'reports.html', label: 'Reports' },
    { href: 'instructors.html', label: 'Instructors' },
    { href: 'contact.html', label: 'Contact' }
  ];

  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    <div class="container nav-inner">
      <a class="brand" href="index.html" aria-label="ITI">
        <span class="brand-badge">ITI</span>
        <span>Examination</span>
      </a>
      <button class="nav-toggle" aria-label="Menu">☰</button>
      <div class="nav-links" role="menu">
        ${links.map(l => `<a class="nav-link ${current === l.href ? 'active' : ''}" href="${l.href}">${l.label}</a>`).join('')}
      </div>
    </div>
  `;

  const footer = document.createElement('footer');
  const year = new Date().getFullYear();
  footer.innerHTML = `
    <div class="container" style="display:flex;justify-content:space-between;gap:16px;align-items:center;flex-wrap:wrap;">
      <div>© ${year} ITI Examination</div>
      <div class="links">
        ${links.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
      </div>
    </div>
  `;

  document.addEventListener('DOMContentLoaded', function () {
    const headerMount = document.querySelector('[data-mount="nav"]');
    const footerMount = document.querySelector('[data-mount="footer"]');
    if (headerMount) headerMount.replaceWith(nav);
    else document.body.prepend(nav);
    if (footerMount) footerMount.replaceWith(footer);
    else document.body.append(footer);

    const toggle = nav.querySelector('.nav-toggle');
    const linksEl = nav.querySelector('.nav-links');
    toggle.addEventListener('click', () => linksEl.classList.toggle('open'));
  });
})();


