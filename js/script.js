// ==========================================
// SMOOTH SCROLL E ANIMAZIONI
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Animazioni al caricamento pagina
    animateOnLoad();
    
    // Observer per animazioni scroll
    setupScrollAnimations();
    
    // Active link nella navigazione
    updateActiveNavLink();
});

// Animazioni al caricamento
function animateOnLoad() {
    const elements = document.querySelectorAll('.glass-card, .stat-item, .project-card, .cv-section, .contact-card');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Intersection Observer per animazioni scroll
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const animatedElements = document.querySelectorAll('.glass-card, .project-card, .cv-section');
    animatedElements.forEach(el => observer.observe(el));
}

// Aggiorna link attivo nella navigazione
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ==========================================
// FUNZIONE COPIA EMAIL
// ==========================================

function copyEmail() {
    const email = document.getElementById('email').textContent;
    
    // Copia negli appunti
    navigator.clipboard.writeText(email).then(() => {
        // Mostra feedback visivo
        showCopyFeedback();
    }).catch(err => {
        console.error('Errore nella copia:', err);
        // Fallback per browser più vecchi
        copyEmailFallback(email);
    });
}

function showCopyFeedback() {
    const btn = event.target.closest('button');
    const originalHTML = btn.innerHTML;
    
    btn.innerHTML = `
        <i class="fas fa-check"></i>
        <span>Copiato!</span>
    `;
    btn.style.background = 'rgba(34, 197, 94, 0.1)';
    btn.style.color = '#16a34a';
    
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.color = '';
    }, 2000);
}

function copyEmailFallback(email) {
    // Metodo fallback per browser più vecchi
    const textarea = document.createElement('textarea');
    textarea.value = email;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('Errore nella copia fallback:', err);
    }
    
    document.body.removeChild(textarea);
}

// ==========================================
// EFFETTI HOVER SEMPLICI
// ==========================================

// Gli effetti hover sono gestiti direttamente nel CSS

// ==========================================
// LOADING PROGRESSIVO IMMAGINI
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                img.classList.add('loaded');
            });
        }
    });
});

// ==========================================
// PERFORMANCE - DEBOUNCE
// ==========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Ottimizza eventi di resize
window.addEventListener('resize', debounce(() => {
    // Eventuali operazioni da eseguire al resize
    updateActiveNavLink();
}, 250));

// ==========================================
// SCROLL SMOOTH PER LINK INTERNI
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80; // Altezza navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// PREFETCH LINKS
// ==========================================

// Precarica pagine al hover per navigazione istantanea
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a, .btn-glass[href^="portfolio"], .btn-glass[href^="curriculum"], .btn-glass[href^="contatti"]');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
            }
        });
    });
});

// ==========================================
// EASTER EGG - KONAMI CODE
// ==========================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%cCiao!', 'font-size: 24px; font-weight: bold;');
console.log('%cSe stai guardando la console, significa che sei curioso! ', 'font-size: 14px;');
console.log('%cSe vuoi saperne di più sui miei progetti, contattami!', 'font-size: 14px; color: #666;');

// ==========================================
// CONTATTO PROGETTO
// ==========================================

function contactProject(projectName, method) {
    const message = `Ciao ho visto il tuo progetto ${projectName} sapresti darmi qualche dettaglio in più?`;
    
    switch(method) {
        case 'email':
            const emailSubject = encodeURIComponent(`Richiesta info: ${projectName}`);
            const emailBody = encodeURIComponent(message);
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=amal.pecoraro2006@gmail.com&su=${emailSubject}&body=${emailBody}`, '_blank');
            break;
            
        case 'telegram':
            const telegramMessage = encodeURIComponent(message);
            window.open(`https://t.me/pecoraroamal?text=${telegramMessage}`, '_blank');
            break;
            
        case 'signal':
            const signalMessage = encodeURIComponent(message);
            window.open(`https://signal.me/#eu/841eOrzUONhq0faytC1W6BJ4StL-Avmp3c-kBQzHZBSWZ_jyrb9O6pRZ7hbhBwTn?text=${signalMessage}`, '_blank');
            break;
    }
}