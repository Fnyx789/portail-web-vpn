const { Client } = require('ssh2');
const dotenv = require('dotenv');

dotenv.config(); // Charger les variables d'environnement

// Fonction pour ouvrir un tunnel SSH
const createSshTunnel = () => {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        
        conn.on('debug', (message) => {
            console.log('Debug SSH:', message);
        });
        
        conn.on('ready', () => {
            console.log('Tunnel SSH ouvert avec succès');
            resolve(conn); // Retourne la connexion SSH active
        }).on('error', (err) => {
            console.error('Erreur de connexion SSH:', err.message);
            console.error('Détails de l\'erreur:', err.stack);  // Affiche plus d'infos pour le débogage
            reject(err);        
        }).connect({
            host: process.env.SSH_HOST,   // Adresse du serveur distant
            port: 22,                     // Port SSH (22 par défaut)
            username: process.env.SSH_USER,
            privateKey: require('fs').readFileSync(process.env.SSH_PRIVATE_KEY) // Clé privée SSH
        });
    });
};

module.exports = createSshTunnel;
