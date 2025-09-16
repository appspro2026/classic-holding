// Mobile nav toggle
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', ()=>{
  nav.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
      // close nav on mobile
      if(nav.classList.contains('open')){nav.classList.remove('open');navToggle.classList.remove('open');}
    }
  })
});

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  })
},{threshold:0.12});

// Observe multiple revealable selectors
const revealables = document.querySelectorAll('.fade-in, .hero-card, .service-card, .about-quote, .about-text, .team-member, .contact-form');
revealables.forEach(el=>observer.observe(el));

// Animated counters
const counters = document.querySelectorAll('.stat-number');
counters.forEach(counter=>{
  const update = ()=>{
    const target = +counter.dataset.target;
    const current = +counter.innerText;
    const increment = Math.ceil(target / 120);
    if(current < target){
      counter.innerText = current + increment;
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };
  // start when visible
  const cObserver = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){ update(); cObserver.unobserve(counter); }
    })
  },{threshold:0.4});
  cObserver.observe(counter);
});

// Simple form submission mock
const form = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    sendBtn.disabled = true;
    sendBtn.innerText = 'Отправка...';
    setTimeout(()=>{ sendBtn.innerText = 'Отправлено'; }, 1200);
  })
}

// Close nav when clicking outside (mobile)
document.addEventListener('click', (e)=>{
  if(!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('open')){
    nav.classList.remove('open');
    navToggle.classList.remove('open');
  }
});
