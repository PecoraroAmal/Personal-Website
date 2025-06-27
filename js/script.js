// Funzione per l'indicatore di scroll
function updateScrollIndicator() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector('.scroll-indicator').style.transform = `scaleX(${scrollPercent / 100})`;
}

// Funzione per gestire la navigazione attiva
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-container a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Funzione per scroll reveal
function revealElements() {
  const reveals = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('revealed');
    }
  });
}

// Funzione per copiare l'email
function copyEmail() {
  const email = document.getElementById('email').textContent;
  navigator.clipboard.writeText(email).then(() => {
    const button = document.querySelector('.copy-btn');
    const originalIcon = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.background = '#10b981';
    
    setTimeout(() => {
      button.innerHTML = originalIcon;
      button.style.background = 'var(--primary-color)';
    }, 2000);
  }).catch(err => {
    console.error('Errore nella copia:', err);
    // Fallback per browser più vecchi
    const textArea = document.createElement('textarea');
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    const button = document.querySelector('.copy-btn');
    const originalIcon = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.background = '#10b981';
    
    setTimeout(() => {
      button.innerHTML = originalIcon;
      button.style.background = 'var(--primary-color)';
    }, 2000);
  });
}

// Funzione per smooth scroll
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    const offsetTop = element.offsetTop - 80; // Account for fixed header
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Inizializzazione quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
  // Aggiungi classi per scroll reveal agli elementi
  const elementsToReveal = [
    '.section-title',
    '.project-card',
    '.cv-section',
    '.contact-links li'
  ];
  
  elementsToReveal.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      if (selector === '.project-card') {
        // Alterna left e right per i progetti
        element.classList.add(index % 2 === 0 ? 'scroll-reveal-left' : 'scroll-reveal-right');
      } else if (selector === '.contact-links li') {
        // Bottom reveal per i contatti
        element.classList.add('scroll-reveal');
      } else {
        element.classList.add('scroll-reveal');
      }
    });
  });
  
  // Event listeners
  window.addEventListener('scroll', () => {
    updateScrollIndicator();
    updateActiveNav();
    revealElements();
  });
  
  // Gestione click sui link di navigazione
  document.querySelectorAll('.nav-container a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      smoothScroll(target);
    });
  });
  
  // Reveal iniziale per elementi già visibili
  revealElements();
  updateScrollIndicator();
  updateActiveNav();
  
  // Parallax leggero per il background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    document.body.style.backgroundPosition = `center ${parallax}px`;
  });
});

// Intersection Observer per performance migliore (alternativa più moderna)
if ('IntersectionObserver' in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Osserva gli elementi quando il DOM è pronto
  document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    elementsToObserve.forEach(el => observer.observe(el));
  });
}