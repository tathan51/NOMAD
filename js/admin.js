// ============================================
// NOMAD - Admin Panel JavaScript
// Authentication and Content Management
// ============================================

// Simple authentication (for demo purposes)
const AUTH = {
    credentials: {
        username: 'admin',
        password: 'nomad2026'
    },

    login(username, password) {
        if (username === this.credentials.username && password === this.credentials.password) {
            sessionStorage.setItem('nomad_admin_logged_in', 'true');
            sessionStorage.setItem('nomad_admin_user', username);
            return true;
        }
        return false;
    },

    logout() {
        sessionStorage.removeItem('nomad_admin_logged_in');
        sessionStorage.removeItem('nomad_admin_user');
        window.location.href = 'login.html';
    },

    isLoggedIn() {
        return sessionStorage.getItem('nomad_admin_logged_in') === 'true';
    },

    getUser() {
        return sessionStorage.getItem('nomad_admin_user') || 'Admin';
    },

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
        }
    }
};

// ============================================
// Login Page Handler
// ============================================
if (window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        // Redirect if already logged in
        if (AUTH.isLoggedIn()) {
            window.location.href = 'dashboard.html';
            return;
        }

        const loginForm = document.getElementById('login-form');
        const errorDiv = document.getElementById('login-error');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (AUTH.login(username, password)) {
                window.location.href = 'dashboard.html';
            } else {
                errorDiv.textContent = 'Identifiants incorrects';
                errorDiv.classList.add('show');
                
                setTimeout(() => {
                    errorDiv.classList.remove('show');
                }, 3000);
            }
        });
    });
}

// ============================================
// Dashboard Page Handler
// ============================================
if (window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        AUTH.requireAuth();

        // Set user name
        const userNameEl = document.getElementById('admin-user-name');
        if (userNameEl) {
            userNameEl.textContent = AUTH.getUser();
        }

        // Logout handler
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                AUTH.logout();
            });
        }

        // Load statistics
        loadDashboardStats();

        // Initialize section handlers
        initSortiesAdmin();
        initGalleryAdmin();
        initMembresAdmin();
        initActualitesAdmin();

        // Set active nav
        setActiveNav();
    });
}

// ============================================
// Dashboard Statistics
// ============================================
function loadDashboardStats() {
    const stats = DataManager.getStats();
    
    const statsEls = {
        sorties: document.getElementById('stat-sorties'),
        photos: document.getElementById('stat-photos'),
        membres: document.getElementById('stat-membres'),
        actualites: document.getElementById('stat-actualites')
    };

    if (statsEls.sorties) statsEls.sorties.textContent = stats.totalSorties;
    if (statsEls.photos) statsEls.photos.textContent = stats.totalPhotos;
    if (statsEls.membres) statsEls.membres.textContent = stats.totalMembres;
    if (statsEls.actualites) statsEls.actualites.textContent = stats.totalActualites;
}

// ============================================
// Sorties Admin
// ============================================
function initSortiesAdmin() {
    const section = document.getElementById('sorties-section');
    if (!section) return;

    loadSortiesTable();

    const addBtn = document.getElementById('add-sortie-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => showSortieModal());
    }
}

function loadSortiesTable() {
    const tbody = document.getElementById('sorties-tbody');
    if (!tbody) return;

    const sorties = DataManager.getSorties();
    
    tbody.innerHTML = sorties.map(sortie => `
        <tr>
            <td>${sortie.title}</td>
            <td>${sortie.date}</td>
            <td>${sortie.location}</td>
            <td><span class="badge">${sortie.type === 'upcoming' ? 'À venir' : 'Passée'}</span></td>
            <td class="table-actions">
                <button class="btn-edit" onclick="editSortie('${sortie.id}')">Modifier</button>
                <button class="btn-delete" onclick="deleteSortie('${sortie.id}')">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function showSortieModal(sortieId = null) {
    const modal = document.getElementById('sortie-modal');
    const form = document.getElementById('sortie-form');
    const title = document.getElementById('sortie-modal-title');
    
    if (!modal || !form) return;

    if (sortieId) {
        const sorties = DataManager.getSorties();
        const sortie = sorties.find(s => s.id === sortieId);
        if (sortie) {
            title.textContent = 'Modifier la sortie';
            document.getElementById('sortie-id').value = sortie.id;
            document.getElementById('sortie-title').value = sortie.title;
            document.getElementById('sortie-date').value = sortie.date;
            document.getElementById('sortie-location').value = sortie.location;
            document.getElementById('sortie-type').value = sortie.type;
            document.getElementById('sortie-description').value = sortie.description;
            document.getElementById('sortie-image').value = sortie.image || '';
        }
    } else {
        title.textContent = 'Ajouter une sortie';
        form.reset();
        document.getElementById('sortie-id').value = '';
    }

    modal.classList.add('active');
}

function saveSortie() {
    const id = document.getElementById('sortie-id').value;
    const sortieData = {
        title: document.getElementById('sortie-title').value,
        date: document.getElementById('sortie-date').value,
        location: document.getElementById('sortie-location').value,
        type: document.getElementById('sortie-type').value,
        description: document.getElementById('sortie-description').value,
        image: document.getElementById('sortie-image').value
    };

    if (id) {
        DataManager.updateSortie(id, sortieData);
    } else {
        DataManager.addSortie(sortieData);
    }

    closeModal('sortie-modal');
    loadSortiesTable();
    loadDashboardStats();
}

function editSortie(id) {
    showSortieModal(id);
}

function deleteSortie(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette sortie ?')) {
        DataManager.deleteSortie(id);
        loadSortiesTable();
        loadDashboardStats();
    }
}

// ============================================
// Gallery Admin
// ============================================
function initGalleryAdmin() {
    const section = document.getElementById('gallery-section');
    if (!section) return;

    loadGalleryTable();

    const addBtn = document.getElementById('add-photo-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => showPhotoModal());
    }
}

function loadGalleryTable() {
    const tbody = document.getElementById('gallery-tbody');
    if (!tbody) return;

    const photos = DataManager.getGallery();
    
    tbody.innerHTML = photos.map(photo => `
        <tr>
            <td><img src="${photo.url}" alt="${photo.caption || 'Photo'}"></td>
            <td>${photo.caption || 'Sans légende'}</td>
            <td class="table-actions">
                <button class="btn-delete" onclick="deletePhoto('${photo.id}')">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function showPhotoModal() {
    const modal = document.getElementById('photo-modal');
    const form = document.getElementById('photo-form');
    
    if (!modal || !form) return;

    form.reset();
    modal.classList.add('active');
}

function savePhoto() {
    const photoData = {
        url: document.getElementById('photo-url').value,
        caption: document.getElementById('photo-caption').value
    };

    DataManager.addPhoto(photoData);
    closeModal('photo-modal');
    loadGalleryTable();
    loadDashboardStats();
}

function deletePhoto(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
        DataManager.deletePhoto(id);
        loadGalleryTable();
        loadDashboardStats();
    }
}

// ============================================
// Members Admin
// ============================================
function initMembresAdmin() {
    const section = document.getElementById('membres-section');
    if (!section) return;

    loadMembresTable();

    const addBtn = document.getElementById('add-membre-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => showMembreModal());
    }
}

function loadMembresTable() {
    const tbody = document.getElementById('membres-tbody');
    if (!tbody) return;

    const membres = DataManager.getMembres();
    
    tbody.innerHTML = membres.map(membre => `
        <tr>
            <td><img src="${membre.photo}" alt="${membre.name}"></td>
            <td>${membre.name}</td>
            <td>${membre.role}</td>
            <td class="table-actions">
                <button class="btn-edit" onclick="editMembre('${membre.id}')">Modifier</button>
                <button class="btn-delete" onclick="deleteMembre('${membre.id}')">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function showMembreModal(membreId = null) {
    const modal = document.getElementById('membre-modal');
    const form = document.getElementById('membre-form');
    const title = document.getElementById('membre-modal-title');
    
    if (!modal || !form) return;

    if (membreId) {
        const membres = DataManager.getMembres();
        const membre = membres.find(m => m.id === membreId);
        if (membre) {
            title.textContent = 'Modifier le membre';
            document.getElementById('membre-id').value = membre.id;
            document.getElementById('membre-name').value = membre.name;
            document.getElementById('membre-role').value = membre.role;
            document.getElementById('membre-photo').value = membre.photo;
            document.getElementById('membre-description').value = membre.description || '';
        }
    } else {
        title.textContent = 'Ajouter un membre';
        form.reset();
        document.getElementById('membre-id').value = '';
    }

    modal.classList.add('active');
}

function saveMembre() {
    const id = document.getElementById('membre-id').value;
    const membreData = {
        name: document.getElementById('membre-name').value,
        role: document.getElementById('membre-role').value,
        photo: document.getElementById('membre-photo').value,
        description: document.getElementById('membre-description').value
    };

    if (id) {
        DataManager.updateMembre(id, membreData);
    } else {
        DataManager.addMembre(membreData);
    }

    closeModal('membre-modal');
    loadMembresTable();
    loadDashboardStats();
}

function editMembre(id) {
    showMembreModal(id);
}

function deleteMembre(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
        DataManager.deleteMembre(id);
        loadMembresTable();
        loadDashboardStats();
    }
}

// ============================================
// Actualites Admin
// ============================================
function initActualitesAdmin() {
    const section = document.getElementById('actualites-section');
    if (!section) return;

    loadActualitesTable();

    const addBtn = document.getElementById('add-actualite-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => showActualiteModal());
    }
}

function loadActualitesTable() {
    const tbody = document.getElementById('actualites-tbody');
    if (!tbody) return;

    const actualites = DataManager.getActualites();
    
    tbody.innerHTML = actualites.map(actu => `
        <tr>
            <td>${actu.title}</td>
            <td>${actu.date}</td>
            <td>${actu.description.substring(0, 80)}...</td>
            <td class="table-actions">
                <button class="btn-edit" onclick="editActualite('${actu.id}')">Modifier</button>
                <button class="btn-delete" onclick="deleteActualite('${actu.id}')">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function showActualiteModal(actualiteId = null) {
    const modal = document.getElementById('actualite-modal');
    const form = document.getElementById('actualite-form');
    const title = document.getElementById('actualite-modal-title');
    
    if (!modal || !form) return;

    if (actualiteId) {
        const actualites = DataManager.getActualites();
        const actu = actualites.find(a => a.id === actualiteId);
        if (actu) {
            title.textContent = 'Modifier l\'actualité';
            document.getElementById('actualite-id').value = actu.id;
            document.getElementById('actualite-title').value = actu.title;
            document.getElementById('actualite-date').value = actu.date;
            document.getElementById('actualite-description').value = actu.description;
            document.getElementById('actualite-image').value = actu.image || '';
        }
    } else {
        title.textContent = 'Ajouter une actualité';
        form.reset();
        document.getElementById('actualite-id').value = '';
        // Set today's date
        const today = new Date().toLocaleDateString('fr-FR');
        document.getElementById('actualite-date').value = today;
    }

    modal.classList.add('active');
}

function saveActualite() {
    const id = document.getElementById('actualite-id').value;
    const actualiteData = {
        title: document.getElementById('actualite-title').value,
        date: document.getElementById('actualite-date').value,
        description: document.getElementById('actualite-description').value,
        image: document.getElementById('actualite-image').value
    };

    if (id) {
        DataManager.updateActualite(id, actualiteData);
    } else {
        DataManager.addActualite(actualiteData);
    }

    closeModal('actualite-modal');
    loadActualitesTable();
    loadDashboardStats();
}

function editActualite(id) {
    showActualiteModal(id);
}

function deleteActualite(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
        DataManager.deleteActualite(id);
        loadActualitesTable();
        loadDashboardStats();
    }
}

// ============================================
// Modal Helpers
// ============================================
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal on background click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Close modal on close button click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-close')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
});

// ============================================
// Set Active Navigation
// ============================================
function setActiveNav() {
    const path = window.location.hash || '#dashboard';
    const navLinks = document.querySelectorAll('.admin-nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });

    // Show/hide sections based on hash
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const activeSection = document.getElementById(path.substring(1) + '-section');
    if (activeSection) {
        activeSection.style.display = 'block';
    } else {
        // Show dashboard by default
        const dashboardSection = document.getElementById('dashboard-section');
        if (dashboardSection) {
            dashboardSection.style.display = 'block';
        }
    }
}

// Listen for hash changes
window.addEventListener('hashchange', setActiveNav);

// Make functions globally available
window.saveSortie = saveSortie;
window.editSortie = editSortie;
window.deleteSortie = deleteSortie;
window.savePhoto = savePhoto;
window.deletePhoto = deletePhoto;
window.saveMembre = saveMembre;
window.editMembre = editMembre;
window.deleteMembre = deleteMembre;
window.saveActualite = saveActualite;
window.editActualite = editActualite;
window.deleteActualite = deleteActualite;
window.closeModal = closeModal;
