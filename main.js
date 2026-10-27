// Dados de contato — troque aqui e todos os botões do site são atualizados
const WHATSAPP = '5500000000000'; // DDI + DDD + número, só dígitos (ex.: 5511999998888)
const INSTAGRAM = 'claudiamelo';  // usuário sem o @

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const toggle = document.getElementById('menuToggle');

const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll);
onScroll();

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  toggle.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
  });
});

// Links de WhatsApp e Instagram
const formatarTelefone = n => {
  const m = n.replace(/^55/, '').match(/^(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : n;
};

document.querySelectorAll('[data-wpp]').forEach(link => {
  link.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(link.dataset.wpp)}`;
  link.target = '_blank';
  link.rel = 'noopener';
  if (link.hasAttribute('data-wpp-label')) link.textContent = formatarTelefone(WHATSAPP);
});

document.querySelectorAll('[data-insta]').forEach(link => {
  link.href = `https://www.instagram.com/${INSTAGRAM}/`;
  link.target = '_blank';
  link.rel = 'noopener';
});
document.querySelectorAll('[data-insta-user]').forEach(el => (el.textContent = `@${INSTAGRAM}`));

// Animação de entrada ao rolar
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// Mantém só uma pergunta aberta por vez
const faqs = document.querySelectorAll('.faq__list details');
faqs.forEach(d => d.addEventListener('toggle', () => {
  if (d.open) faqs.forEach(o => o !== d && (o.open = false));
}));

document.getElementById('year').textContent = new Date().getFullYear();
