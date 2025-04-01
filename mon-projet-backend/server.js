const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const createSshTunnel = require('./sshTunnel');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

// Ouvrir le tunnel SSH au démarrage du serveur
createSshTunnel()
    .then((conn) => {
        console.log('🚀 Serveur démarré avec un tunnel SSH actif !');
        app.listen(port, () => {
            console.log(`Serveur backend en écoute sur http://localhost:${port}`);
        });
    })
    /*.catch((err) => {
        console.error('❌ Échec de l\'ouverture du tunnel SSH');
        process.exit(1); // Quitte le processus en cas d'échec
    });
*/