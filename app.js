document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu-container");

    // Sécurité : on vérifie que la boîte du menu et les données existent bien
    if (!menuContainer || typeof menuData === 'undefined') return;

    let htmlContent = "";

    // On parcourt chaque ligne de notre fichier menuData.js
    menuData.forEach(item => {
        if (item.titre) {
            // S'il s'agit d'un titre de catégorie (Séparateur)
            htmlContent += `
                <div class="menu-category-title" style="width: 100%; margin-top: 45px; margin-bottom: 25px; text-align: center;">
                    <h3 style="color: #cda45e; font-size: 1.5rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #cda45e; display: inline-block; padding-bottom: 5px;">
                        ${item.titre}
                    </h3>
                </div>
            `;
        } else if (item.nom) {
            // S'il s'agit d'un plat classique
            htmlContent += `
                <div class="menu-item" style="margin-bottom: 20px; width: 100%; max-width: 800px; margin-left: auto; margin-right: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed rgba(255, 255, 255, 0.2); padding-bottom: 5px; margin-bottom: 8px;">
                        <h4 style="color: #ffffff; font-size: 1.1rem; margin: 0; font-family: 'Playfair Display', serif;">${item.nom}</h4>
                        <span style="color: #cda45e; font-weight: bold; margin-left: 15px; white-space: nowrap;">${item.prix}</span>
                    </div>
                    <p style="color: #aaaaaa; font-size: 0.95rem; font-style: italic; margin: 0;">${item.description}</p>
                </div>
            `;
        }
    });

    // On injecte tout le menu généré dans la page
    menuContainer.innerHTML = htmlContent;
});