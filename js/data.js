// ============================================
// NOMAD - Data Management
// LocalStorage-based CRUD operations
// ============================================

const DataManager = {
    // ============================================
    // Sorties (Outings) Management
    // ============================================
    getSorties() {
        const data = localStorage.getItem('nomad_sorties');
        return data ? JSON.parse(data) : this.getDefaultSorties();
    },

    saveSorties(sorties) {
        localStorage.setItem('nomad_sorties', JSON.stringify(sorties));
    },

    addSortie(sortie) {
        const sorties = this.getSorties();
        sortie.id = Date.now().toString();
        sorties.push(sortie);
        this.saveSorties(sorties);
        return sortie;
    },

    updateSortie(id, updatedData) {
        const sorties = this.getSorties();
        const index = sorties.findIndex(s => s.id === id);
        if (index !== -1) {
            sorties[index] = { ...sorties[index], ...updatedData };
            this.saveSorties(sorties);
            return sorties[index];
        }
        return null;
    },

    deleteSortie(id) {
        const sorties = this.getSorties();
        const filtered = sorties.filter(s => s.id !== id);
        this.saveSorties(filtered);
    },

    getDefaultSorties() {
        return [
            {
                id: '1',
                title: 'Opération Desert Storm',
                date: '15 Mars 2026',
                location: 'Terrain Delta Force, Bordeaux',
                description: 'Grande opération tactique sur le thème du désert. Scénario immersif avec objectifs multiples.',
                type: 'upcoming',
                image: 'https://via.placeholder.com/400x200/4a5d3a/ffffff?text=Desert+Storm'
            },
            {
                id: '2',
                title: 'Night Ops',
                date: '28 Février 2026',
                location: 'Forest Tactical Arena, Lyon',
                description: 'Opération nocturne en forêt. Équipement NVG recommandé. Infiltration et exfiltration tactique.',
                type: 'past',
                image: 'https://via.placeholder.com/400x200/2c2c2c/ffffff?text=Night+Ops'
            },
            {
                id: '3',
                title: 'Urban Warfare',
                date: '14 Janvier 2026',
                location: 'CQB Arena, Paris',
                description: 'Combat urbain rapproché dans un environnement CQB. Tactiques de room clearing et coordination équipe.',
                type: 'past',
                image: 'https://via.placeholder.com/400x200/8b9474/ffffff?text=Urban+Warfare'
            }
        ];
    },

    // ============================================
    // Gallery Management
    // ============================================
    getGallery() {
        const data = localStorage.getItem('nomad_gallery');
        return data ? JSON.parse(data) : this.getDefaultGallery();
    },

    saveGallery(gallery) {
        localStorage.setItem('nomad_gallery', JSON.stringify(gallery));
    },

    addPhoto(photo) {
        const gallery = this.getGallery();
        photo.id = Date.now().toString();
        gallery.push(photo);
        this.saveGallery(gallery);
        return photo;
    },

    deletePhoto(id) {
        const gallery = this.getGallery();
        const filtered = gallery.filter(p => p.id !== id);
        this.saveGallery(filtered);
    },

    getDefaultGallery() {
        return [
            { id: '1', url: 'https://via.placeholder.com/400/4a5d3a/ffffff?text=NOMAD+1', caption: 'Sortie tactique' },
            { id: '2', url: 'https://via.placeholder.com/400/8b9474/ffffff?text=NOMAD+2', caption: 'Équipe NOMAD' },
            { id: '3', url: 'https://via.placeholder.com/400/d4a574/ffffff?text=NOMAD+3', caption: 'Action' },
            { id: '4', url: 'https://via.placeholder.com/400/2c2c2c/ffffff?text=NOMAD+4', caption: 'Préparation' },
            { id: '5', url: 'https://via.placeholder.com/400/4a5d3a/ffffff?text=NOMAD+5', caption: 'En mission' },
            { id: '6', url: 'https://via.placeholder.com/400/8b9474/ffffff?text=NOMAD+6', caption: 'Briefing' }
        ];
    },

    // ============================================
    // Members Management
    // ============================================
    getMembres() {
        const data = localStorage.getItem('nomad_membres');
        return data ? JSON.parse(data) : this.getDefaultMembres();
    },

    saveMembres(membres) {
        localStorage.setItem('nomad_membres', JSON.stringify(membres));
    },

    addMembre(membre) {
        const membres = this.getMembres();
        membre.id = Date.now().toString();
        membres.push(membre);
        this.saveMembres(membres);
        return membre;
    },

    updateMembre(id, updatedData) {
        const membres = this.getMembres();
        const index = membres.findIndex(m => m.id === id);
        if (index !== -1) {
            membres[index] = { ...membres[index], ...updatedData };
            this.saveMembres(membres);
            return membres[index];
        }
        return null;
    },

    deleteMembre(id) {
        const membres = this.getMembres();
        const filtered = membres.filter(m => m.id !== id);
        this.saveMembres(filtered);
    },

    getDefaultMembres() {
        return [
            {
                id: '1',
                name: 'Alexandre "Alpha" Martin',
                role: 'Chef d\'équipe',
                photo: 'https://ui-avatars.com/api/?name=Alexandre+Martin&size=200&background=4a5d3a&color=fff',
                description: 'Leader expérimenté, spécialiste tactique'
            },
            {
                id: '2',
                name: 'Thomas "Hawk" Bernard',
                role: 'Tireur de précision',
                photo: 'https://ui-avatars.com/api/?name=Thomas+Bernard&size=200&background=8b9474&color=fff',
                description: 'Expert en reconnaissance et tir longue distance'
            },
            {
                id: '3',
                name: 'Lucas "Ghost" Dupont',
                role: 'Éclaireur',
                photo: 'https://ui-avatars.com/api/?name=Lucas+Dupont&size=200&background=d4a574&color=fff',
                description: 'Spécialiste infiltration et reconnaissance'
            },
            {
                id: '4',
                name: 'Marine "Phoenix" Laurent',
                role: 'Médic',
                photo: 'https://ui-avatars.com/api/?name=Marine+Laurent&size=200&background=4a5d3a&color=fff',
                description: 'Responsable sécurité et premiers secours'
            },
            {
                id: '5',
                name: 'Kevin "Tank" Moreau',
                role: 'Support',
                photo: 'https://ui-avatars.com/api/?name=Kevin+Moreau&size=200&background=8b9474&color=fff',
                description: 'Spécialiste armement lourd et soutien'
            },
            {
                id: '6',
                name: 'Sarah "Viper" Rousseau',
                role: 'Assaut',
                photo: 'https://ui-avatars.com/api/?name=Sarah+Rousseau&size=200&background=d4a574&color=fff',
                description: 'Expert en CQB et action rapide'
            }
        ];
    },

    // ============================================
    // Actualites (News) Management
    // ============================================
    getActualites() {
        const data = localStorage.getItem('nomad_actualites');
        return data ? JSON.parse(data) : this.getDefaultActualites();
    },

    saveActualites(actualites) {
        localStorage.setItem('nomad_actualites', JSON.stringify(actualites));
    },

    addActualite(actualite) {
        const actualites = this.getActualites();
        actualite.id = Date.now().toString();
        actualites.unshift(actualite); // Add to beginning
        this.saveActualites(actualites);
        return actualite;
    },

    updateActualite(id, updatedData) {
        const actualites = this.getActualites();
        const index = actualites.findIndex(a => a.id === id);
        if (index !== -1) {
            actualites[index] = { ...actualites[index], ...updatedData };
            this.saveActualites(actualites);
            return actualites[index];
        }
        return null;
    },

    deleteActualite(id) {
        const actualites = this.getActualites();
        const filtered = actualites.filter(a => a.id !== id);
        this.saveActualites(filtered);
    },

    getDefaultActualites() {
        return [
            {
                id: '1',
                title: 'Nouvelle saison 2026',
                date: '1 Janvier 2026',
                description: 'Début de notre nouvelle saison avec de nombreux événements prévus. Rejoignez-nous pour une année riche en actions !',
                image: 'https://via.placeholder.com/400x200/4a5d3a/ffffff?text=Saison+2026'
            },
            {
                id: '2',
                title: 'Recrutement ouvert',
                date: '15 Décembre 2025',
                description: 'NOMAD recrute ! Si vous êtes passionné d\'airsoft et recherchez une équipe soudée, contactez-nous.',
                image: 'https://via.placeholder.com/400x200/8b9474/ffffff?text=Recrutement'
            },
            {
                id: '3',
                title: 'Nouveau partenariat terrain',
                date: '1 Décembre 2025',
                description: 'Nous sommes heureux d\'annoncer notre partenariat avec le terrain Delta Force pour des sessions exclusives.',
                image: 'https://via.placeholder.com/400x200/d4a574/ffffff?text=Partenariat'
            }
        ];
    },

    // ============================================
    // Statistics
    // ============================================
    getStats() {
        return {
            totalSorties: this.getSorties().length,
            totalPhotos: this.getGallery().length,
            totalMembres: this.getMembres().length,
            totalActualites: this.getActualites().length
        };
    },

    // ============================================
    // Reset to defaults (for testing)
    // ============================================
    resetToDefaults() {
        localStorage.removeItem('nomad_sorties');
        localStorage.removeItem('nomad_gallery');
        localStorage.removeItem('nomad_membres');
        localStorage.removeItem('nomad_actualites');
    }
};

// Make DataManager available globally
window.DataManager = DataManager;
