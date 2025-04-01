// Logique d'authentification SSH

// auth.js

const fs = require('fs');
const path = require('path');

// Chemin vers le fichier JSON des utilisateurs
const usersFilePath = path.join(__dirname, 'users.json');

// Liste de clés SSH valides pour les tests (ici, juste des chaînes fictives)
const validPublicKeys = [
    "abc", // Clé fictive 1
    "def", // Clé fictive 2
    "AAAAB3NzaC1yc2EAAAADAQABAAABgQCcOgBjlVicJhkgptYlBAp1U9Tn69T8Tf/DD6fSrjGquYEgWJ9ZGxN3AfiBGKxWFR87EipiBJDVi3u3YKUjY6P6g7TTTIGhlXL2LL3MbU0PL+rn8Pb6NmJ0IdTtwGVkFGrixLJmR/LxnXL9RdyD1zx3nE2MF8+CF7bjK6NPt07M1923uywvYFWUfwXwwzWbeo4+etJQt5XCFNLRhwdqPm0SBFWRdvRNieCuXu5M81LoEDPXFKXf0yBFKJZYTMRQBd3kgZy0crWLZXNv6jJ+Xt7T/yT1K90z91VG3gCCccIbrlCe/l94T+VpVr7LTHykE30wco7oLGr+gNhy3YqQwycadrc/TaxZkM1K8tjIpr6B0Bf+PtQAMb4bCsY2QLStH3lxhB+bF6PLoabFm0Q0WlNYknuES90tOO1ucpEpINlqCRQNYmrPbR8XI0Cb1RWtSsFNs+rfNPO2sYcZ2GsrvmVDy5oCb83RISbxbJTfhPT7OLvUdBGrvc/jxa550Jtf+SE=" // Clé fictive 3
];

// Fonction pour vérifier si la clé SSH est valide
const checkSSHKey = (publicKey) => {
    return new Promise((resolve, reject) => {
        // Simuler une validation de clé SSH : vérifier si la clé est dans la liste des clés valides
        if (validPublicKeys.includes(publicKey)) {
            resolve(true);
        } else {
            reject('Clé SSH invalide');
        }
    });
};

// Fonction pour récupérer les permissions d'un utilisateur depuis le fichier JSON
const getUserPermissions = (publicKey) => {
    return new Promise((resolve, reject) => {
        fs.readFile(usersFilePath, 'utf8', (err, data) => {
            if (err) {
                return reject('Erreur lors de la lecture du fichier des utilisateurs');
            }

            const users = JSON.parse(data);

            const user = users.find(u => u.public_key === publicKey);
            if (!user) {
                return reject('Utilisateur non trouvé');
            }

            resolve(user.permissions);
        });
    });
};

module.exports = { checkSSHKey, getUserPermissions };
