/* App interactions and animations */
// Ensure English LTR layout
document.documentElement.setAttribute('dir', 'ltr');

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.12 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// Small helper to inject simple cards from JSON-like arrays
export function renderCardGrid(targetSelector, items) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.innerHTML = items.map(item => `
    <article class="card reveal">
      ${item.badge ? `<span class=badge>${item.badge}</span>` : ''}
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');
  target.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


