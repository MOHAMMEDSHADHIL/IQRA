const faqItems = [
  ["How do online Quran classes work?", "Classes are held live over WhatsApp or Google Meet at a time arranged with your teacher, with real-time interaction rather than pre-recorded videos."],
  ["Which platform is used for classes?", "We currently teach through WhatsApp and Google Meet, whichever is most convenient for the student."],
  ["Do you offer classes for children?", "Yes, we offer dedicated Kids Quran Classes designed to be interactive and age-appropriate."],
  ["Are separate classes available for girls?", "Yes, girls can attend dedicated classes in a comfortable and suitable learning environment."],
  ["Can I choose my preferred class timing?", "Yes. We offer morning, afternoon and evening slots, and timings can be discussed based on your availability."],
  ["Do you teach Tajweed?", "Yes, our Live Tajweed Classes focus on correct pronunciation and recitation according to Tajweed rules."],
  ["Is Noorani Qaida available for beginners?", "Yes, our Noorani Qaida course builds a strong foundation in Quran reading for beginners of any age."],
  ["How can I enroll?", "Fill out the enrollment form on this page, or contact us directly by phone or WhatsApp at +91 77367 80062."],
];

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const menuBtn = document.getElementById('menu-btn');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

function openMenu() {
  mobileMenu.classList.remove('translate-x-full');
  menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
  menuBtn.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  mobileMenu.classList.add('translate-x-full');
  menuOverlay.classList.add('opacity-0', 'pointer-events-none');
  menuBtn.setAttribute('aria-expanded', 'false');
}
menuBtn.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.menu-link').forEach(a => a.addEventListener('click', closeMenu));

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

const faqList = document.getElementById('faq-list');
faqItems.forEach(([q, a]) => {
  const item = document.createElement('div');
  item.className = 'py-2';
  item.innerHTML = `
    <button class="faq-toggle w-full flex items-center justify-between text-left py-4 font-semibold text-ivory" aria-expanded="false">
      <span>${q}</span>
      <span class="faq-icon text-copper text-xl leading-none transition-transform">+</span>
    </button>
    <div class="accordion-panel">
      <p class="pb-4 text-sm text-ivory/65 leading-relaxed">${a}</p>
    </div>`;
  faqList.appendChild(item);
});
faqList.addEventListener('click', (e) => {
  const btn = e.target.closest('.faq-toggle');
  if (!btn) return;
  const panel = btn.nextElementSibling;
  const icon = btn.querySelector('.faq-icon');
  const isOpen = panel.style.maxHeight && panel.style.maxHeight !== '0px';
  faqList.querySelectorAll('.accordion-panel').forEach(p => p.style.maxHeight = '0px');
  faqList.querySelectorAll('.faq-toggle').forEach(b => { b.setAttribute('aria-expanded', 'false'); b.querySelector('.faq-icon').textContent = '+'; });
  if (!isOpen) {
    panel.style.maxHeight = panel.scrollHeight + 'px';
    btn.setAttribute('aria-expanded', 'true');
    icon.textContent = '–';
  }
});

