document.addEventListener("DOMContentLoaded", () => {
    const bouton = document.getElementById("boutton");
    const input = document.getElementById("input");
    const reponse = document.getElementById("reponse");

    bouton.addEventListener("click", async () => {
        const publicKey = input.value.trim();

        if (!publicKey) {
            reponse.textContent = "Veuillez entrer une clé SSH.";
            reponse.style.color = "red";
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ publicKey }),
            });

            const data = await response.json();

            if (response.ok) {
                reponse.textContent = `Authentification réussie ! Permissions : ${data.permissions.join(", ")}`;
                reponse.style.color = "green";
            } else {
                reponse.textContent = "Authentification échouée. Clé SSH invalide.";
                reponse.style.color = "red";
            }
        } catch (error) {
            reponse.textContent = "Erreur de connexion au serveur.";
            reponse.style.color = "red";
            console.error("Erreur:", error);
        }
    });
});
