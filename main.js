// Dados de contato — troque aqui e todos os botões do site são atualizados
const WHATSAPP = '5528992747881'; // DDI + DDD + número, só dígitos
const INSTAGRAM_URL = 'https://www.instagram.com/claudiamelo/';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');

const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll);
onScroll();

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
  });
});

// Links de WhatsApp e Instagram
const formatarTelefone = n => {
  const m = n.replace(/^55/, '').match(/^(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : n;
};

const abrirEmNovaAba = link => {
  link.target = '_blank';
  link.rel = 'noopener';
};

document.querySelectorAll('[data-wpp]').forEach(link => {
  link.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(link.dataset.wpp)}`;
  abrirEmNovaAba(link);
});
document.querySelectorAll('[data-wpp-label]').forEach(el => (el.textContent = formatarTelefone(WHATSAPP)));

document.querySelectorAll('[data-insta]').forEach(link => {
  link.href = INSTAGRAM_URL;
  abrirEmNovaAba(link);
});

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
