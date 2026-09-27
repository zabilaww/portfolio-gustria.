const root = document.documentElement;
root.classList.add('js');

// Sorot cahaya kursor
addEventListener('pointermove', e => {
  root.style.setProperty('--mx', e.clientX + 'px');
  root.style.setProperty('--my', e.clientY + 'px');
});
document.querySelectorAll('.card').forEach(c => c.addEventListener('pointermove', e => {
  const r = c.getBoundingClientRect();
  c.style.setProperty('--x', e.clientX - r.left + 'px');
  c.style.setProperty('--y', e.clientY - r.top + 'px');
}));

// Bungkus gambar proyek agar zoom tidak keluar kartu
document.querySelectorAll('.project-item > img').forEach(img => {
  const w = document.createElement('div'); w.className = 'img-wrap';
  img.replaceWith(w); w.appendChild(img);
});

// Kartu pengalaman
document.querySelectorAll('.flip').forEach(el => {
  const t = () => el.classList.toggle('flipped');
  el.addEventListener('click', t);
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); } });
});

// Muncul saat di-scroll, berurutan per baris
const items = document.querySelectorAll('.heading,.home-content,.about-img,.card,.flip');
const rev = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target, i = [...el.parentElement.children].indexOf(el);
  el.style.transitionDelay = (i % 3) * 0.12 + 's';
  el.classList.add('in');
  rev.unobserve(el);
  setTimeout(() => { el.classList.remove('reveal'); el.style.transitionDelay = ''; }, 1400);
}), { threshold: .15 });
items.forEach(el => { el.classList.add('reveal'); rev.observe(el); });

// Bar skill
const bars = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  const b = en.target.querySelector('.bar b');
  b.style.width = b.dataset.w + '%';
  bars.unobserve(en.target);
}), { threshold: .4 });
document.querySelectorAll('.skill').forEach(s => bars.observe(s));

// Menu aktif
const links = [...document.querySelectorAll('.navbar a')];
const spy = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => spy.observe(s));

// Bar progres scroll
const pb = document.createElement('div'); pb.className = 'progress'; document.body.appendChild(pb);
addEventListener('scroll', () => {
  pb.style.width = scrollY / (root.scrollHeight - innerHeight) * 100 + '%';
}, { passive: true });

// Percikan cahaya kuning
for (let i = 0; i < 16; i++) {
  const s = document.createElement('span'), z = 3 + Math.random() * 5;
  s.className = 'spark';
  s.style.cssText = `left:${Math.random()*100}%;width:${z}px;height:${z}px;animation-duration:${9+Math.random()*10}s;animation-delay:${Math.random()*12}s`;
  document.body.appendChild(s);
}