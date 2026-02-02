# NOMAD - Site Web d'Équipe d'Airsoft

Site web complet et fonctionnel pour l'équipe d'airsoft NOMAD avec panel d'administration.

![NOMAD Logo](images/logo-nomad.svg)

## 🎯 Fonctionnalités

### Site Web Public

- **Page d'accueil** - Présentation de l'équipe avec design militaire moderne
- **Sorties** - Affichage des missions passées et à venir
- **Galerie** - Photos avec lightbox pour visualisation en plein écran
- **Membres** - Présentation de l'équipe avec photos et rôles
- **Actualités** - Dernières news et annonces
- **Contact** - Formulaire de contact fonctionnel

### Panel d'Administration

- **Authentification sécurisée** - Login protégé pour accès admin
- **Dashboard** - Vue d'ensemble avec statistiques
- **Gestion des sorties** - Ajouter, modifier, supprimer des sorties
- **Gestion de la galerie** - Upload et organisation des photos
- **Gestion des membres** - Administration de l'équipe
- **Gestion des actualités** - Créer et modifier les news

## 🚀 Installation

### Prérequis

- Aucune installation requise ! Le site fonctionne directement dans le navigateur
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)

### Déploiement Local

1. Clonez ou téléchargez ce repository
2. Ouvrez `index.html` dans votre navigateur
3. C'est tout ! Le site est prêt à l'emploi

### Déploiement en Ligne

Le site est compatible avec tous les hébergeurs gratuits :

#### Netlify
1. Créez un compte sur [Netlify](https://www.netlify.com/)
2. Glissez-déposez le dossier complet sur Netlify
3. Votre site est en ligne !

#### GitHub Pages
1. Créez un repository GitHub
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans les paramètres
4. Accédez à votre site via `username.github.io/repository-name`

#### Vercel
1. Créez un compte sur [Vercel](https://vercel.com/)
2. Importez votre repository ou uploadez les fichiers
3. Déployez en un clic

## 📁 Structure du Projet

```
/
├── index.html              # Page d'accueil
├── sorties.html           # Page des sorties
├── galerie.html           # Galerie photo
├── membres.html           # Liste des membres
├── actualites.html        # Page des actualités
├── contact.html           # Formulaire de contact
├── admin/
│   ├── login.html        # Page de connexion admin
│   └── dashboard.html    # Panel d'administration
├── css/
│   ├── style.css         # Styles principaux
│   └── admin.css         # Styles admin
├── js/
│   ├── main.js           # JavaScript principal
│   ├── data.js           # Gestion des données
│   └── admin.js          # Panel admin
├── images/
│   └── logo-nomad.svg    # Logo de l'équipe
└── README.md             # Cette documentation
```

## 🔐 Accès Admin

### Identifiants par Défaut

- **URL Admin**: `/admin/login.html`
- **Utilisateur**: `admin`
- **Mot de passe**: `nomad2026`

⚠️ **Important**: Changez ces identifiants dans le fichier `js/admin.js` pour la production !

### Changer les Identifiants

Ouvrez `js/admin.js` et modifiez :

```javascript
const AUTH = {
    credentials: {
        username: 'votre_nouveau_username',
        password: 'votre_nouveau_password'
    },
    // ...
};
```

## 💾 Gestion des Données

### LocalStorage

Le site utilise le LocalStorage du navigateur pour stocker les données. Les données sont conservées même après fermeture du navigateur.

### Données Initiales

Le site est livré avec des données de démonstration :
- 3 sorties
- 6 photos
- 6 membres
- 3 actualités

### Réinitialiser les Données

Pour revenir aux données par défaut, ouvrez la console du navigateur (F12) et tapez :

```javascript
DataManager.resetToDefaults();
location.reload();
```

### Migration vers Firebase (Optionnel)

Pour une utilisation en production avec base de données, vous pouvez facilement migrer vers Firebase :

1. Créez un projet Firebase
2. Remplacez les fonctions dans `js/data.js` par des appels Firebase
3. Les fonctions CRUD restent identiques, seul le backend change

## 🎨 Personnalisation

### Couleurs

Modifiez les couleurs dans `css/style.css` :

```css
:root {
    --color-primary: #4a5d3a;      /* Vert olive */
    --color-secondary: #8b9474;    /* Vert clair */
    --color-accent: #d4a574;       /* Beige sable */
    --color-dark: #2c2c2c;         /* Noir */
    --color-light: #f5f5f5;        /* Gris clair */
}
```

### Logo

Remplacez `images/logo-nomad.svg` par votre propre logo. Formats acceptés : SVG, PNG, JPG

### Contenu

Utilisez le panel admin pour modifier :
- Les sorties
- Les photos
- Les membres
- Les actualités

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints à :
- 480px (Mobile)
- 768px (Tablette)
- 1024px (Desktop)
- 1200px (Large Desktop)

## 🌐 Compatibilité

- ✅ Chrome (dernière version)
- ✅ Firefox (dernière version)
- ✅ Safari (dernière version)
- ✅ Edge (dernière version)
- ✅ Mobile (iOS, Android)

## 📋 Utilisation du Panel Admin

### 1. Connexion

1. Allez sur `/admin/login.html`
2. Entrez les identifiants
3. Cliquez sur "Se connecter"

### 2. Gérer les Sorties

1. Cliquez sur "Sorties" dans le menu
2. Utilisez "+ Ajouter une sortie"
3. Remplissez le formulaire
4. Enregistrez

### 3. Gérer la Galerie

1. Cliquez sur "Galerie"
2. Ajoutez des photos via leur URL
3. Ajoutez une légende (optionnel)

### 4. Gérer les Membres

1. Cliquez sur "Membres"
2. Ajoutez un membre avec nom, rôle, photo
3. Modifiez ou supprimez selon besoin

### 5. Gérer les Actualités

1. Cliquez sur "Actualités"
2. Créez une nouvelle actualité
3. Ajoutez titre, date, description, image

## 🔒 Sécurité

### Pour la Démonstration
- Authentification simple via SessionStorage
- Protection basique des routes admin

### Pour la Production
Il est recommandé de :
1. Utiliser un vrai backend (Node.js, PHP, Firebase)
2. Implémenter JWT ou OAuth
3. Ajouter HTTPS
4. Valider toutes les entrées côté serveur
5. Implémenter un rate limiting

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles et animations
- **JavaScript (Vanilla)** - Aucune dépendance externe
- **LocalStorage** - Stockage des données
- **SVG** - Logo et graphiques

## 📊 Performance

- ⚡ Chargement rapide (pas de dépendances)
- 🖼️ Lazy loading des images
- 📦 Code optimisé et commenté
- 🎯 Animations CSS performantes

## 🐛 Dépannage

### Les données ne se sauvegardent pas
- Vérifiez que le LocalStorage est activé dans votre navigateur
- Vérifiez que vous n'êtes pas en mode navigation privée

### L'admin ne fonctionne pas
- Vérifiez que JavaScript est activé
- Ouvrez la console (F12) pour voir les erreurs
- Vérifiez que vous utilisez les bons identifiants

### Les images ne s'affichent pas
- Vérifiez que les URLs des images sont valides
- Vérifiez votre connexion Internet
- Utilisez des URLs HTTPS

## 📝 TODO / Améliorations Futures

- [ ] Upload d'images local (avec base64)
- [ ] Éditeur WYSIWYG pour les descriptions
- [ ] Drag & drop pour réorganiser la galerie
- [ ] Export/Import des données
- [ ] Multilingue (FR/EN)
- [ ] Mode sombre
- [ ] Notifications push
- [ ] Calendrier interactif des sorties
- [ ] Système de commentaires
- [ ] Intégration réseaux sociaux

## 👥 Contribution

Pour contribuer au projet :
1. Forkez le repository
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Pushez (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est libre de droits pour usage personnel et commercial.

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez l'équipe NOMAD

## 🎖️ Crédits

Développé avec ❤️ pour l'équipe NOMAD

---

**NOMAD - Équipe d'Airsoft Tactique**

*Tactique • Respect • Camaraderie*
