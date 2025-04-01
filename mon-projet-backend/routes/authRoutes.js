// Routes pour l'authentification

// routes/authRoutes.js
const express = require('express');
const { checkSSHKey, getUserPermissions } = require('../auth');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { publicKey } = req.body;

    if (!publicKey) {
        return res.status(400).send('Clé SSH manquante');
    }

    try {
        // Vérifier la clé SSH
        await checkSSHKey(publicKey);

        // Si l'authentification réussit, on récupère les permissions de l'utilisateur
        const permissions = await getUserPermissions(publicKey);

        // Renvoyer les permissions ou un message d'accès autorisé
        res.status(200).json({ message: 'Authentification réussie', permissions });
    } catch (err) {
        console.error('Erreur d\'authentification SSH:', err);
        res.status(500).send('Erreur d\'authentification');
    }
});

module.exports = router;
