// ============================================
// NOMAD - Main JavaScript
// Navigation, Animations, Lightbox
// ============================================

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-menu');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lightbox functionality
    initLightbox();

    // Contact form handler
    initContactForm();

    // Load dynamic content
    if (window.location.pathname.includes('sorties.html')) {
        loadSorties();
    } else if (window.location.pathname.includes('galerie.html')) {
        loadGallery();
    } else if (window.location.pathname.includes('membres.html')) {
        loadMembres();
    } else if (window.location.pathname.includes('actualites.html')) {
        loadActualites();
    }
});

// ============================================
// Lightbox Gallery
// ============================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    let images = [];

    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push(img.src);
            item.addEventListener('click', () => {
                currentIndex = index;
                showLightbox();
            });
        }
    });

    function showLightbox() {
        lightbox.classList.add('active');
        lightboxImg.src = images[currentIndex];
        document.body.style.overflow = 'hidden';
    }

    function hideLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    if (closeBtn) closeBtn.addEventListener('click', hideLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') hideLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}

// ============================================
// Contact Form Handler
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate
        if (!name || !email || !subject || !message) {
            showMessage('Veuillez remplir tous les champs', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Veuillez entrer un email valide', 'error');
            return;
        }

        // In a real application, this would send to a server
        // For demo, just show success message
        console.log('Contact form submitted:', { name, email, subject, message });
        
        showMessage('Votre message a été envoyé avec succès !', 'success');
        form.reset();
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('form-message');
    if (!messageDiv) return;

    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type} show`;

    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 5000);
}

// ============================================
// Load Sorties (Outings)
// ============================================
function loadSorties() {
    const container = document.getElementById('sorties-container');
    if (!container) return;

    const sorties = DataManager.getSorties();
    
    if (sorties.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #6c757d;">Aucune sortie pour le moment.</p>';
        return;
    }

    container.innerHTML = sorties.map(sortie => `
        <div class="card">
            ${sortie.image ? `<img src="${sortie.image}" alt="${sortie.title}" class="card-image">` : ''}
            <div class="card-content">
                <span class="card-badge">${sortie.type === 'upcoming' ? 'À venir' : 'Passée'}</span>
                <h3 class="card-title">${sortie.title}</h3>
                <div class="card-meta">
                    <span>📅 ${sortie.date}</span>
                    <span>📍 ${sortie.location}</span>
                </div>
                <p class="card-description">${sortie.description}</p>
            </div>
        </div>
    `).join('');
}

// ============================================
// Load Gallery
// ============================================
function loadGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    const photos = DataManager.getGallery();
    
    if (photos.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #6c757d;">Aucune photo pour le moment.</p>';
        return;
    }

    container.innerHTML = photos.map(photo => `
        <div class="gallery-item">
            <img src="${photo.url}" alt="${photo.caption || 'Photo NOMAD'}">
            <div class="gallery-overlay">
                <span>🔍</span>
            </div>
        </div>
    `).join('');

    // Reinitialize lightbox after loading images
    initLightbox();
}

// ============================================
// Load Members
// ============================================
function loadMembres() {
    const container = document.getElementById('membres-container');
    if (!container) return;

    const membres = DataManager.getMembres();
    
    if (membres.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #6c757d;">Aucun membre pour le moment.</p>';
        return;
    }

    container.innerHTML = membres.map(membre => `
        <div class="member-card">
            <img src="${membre.photo}" alt="${membre.name}" class="member-avatar">
            <h3 class="member-name">${membre.name}</h3>
            <p class="member-role">${membre.role}</p>
            ${membre.description ? `<p class="member-description">${membre.description}</p>` : ''}
        </div>
    `).join('');
}

// ============================================
// Load Actualites (News)
// ============================================
function loadActualites() {
    const container = document.getElementById('actualites-container');
    if (!container) return;

    const actualites = DataManager.getActualites();
    
    if (actualites.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #6c757d;">Aucune actualité pour le moment.</p>';
        return;
    }

    container.innerHTML = actualites.map(actu => `
        <div class="card">
            ${actu.image ? `<img src="${actu.image}" alt="${actu.title}" class="card-image">` : ''}
            <div class="card-content">
                <h3 class="card-title">${actu.title}</h3>
                <div class="card-meta">
                    <span>📅 ${actu.date}</span>
                </div>
                <p class="card-description">${actu.description}</p>
            </div>
        </div>
    `).join('');
}

// ============================================
// Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.card, .stat-card, .member-card').forEach(el => {
    observer.observe(el);
});
