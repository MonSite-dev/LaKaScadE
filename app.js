function renderMenu(filterCategory) {
    const container = document.getElementById('menu-container');
    
    // Animation de fondu (disparition)
    container.style.opacity = 0;
    
    setTimeout(() => {
        container.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'menu-grid';

        const category = menuData.find(cat => cat.categorie === filterCategory);
        
        if (category) {
            category.plats.forEach(plat => {
                
                // --- ON VÉRIFIE SI C'EST UN TITRE DE SÉPARATION ---
                if (plat.type === "titre") {
                    const titreDiv = document.createElement('div');
                    titreDiv.className = 'separateur-categorie';
                    titreDiv.innerHTML = `<h2>${plat.nom}</h2>`;
                    grid.appendChild(titreDiv);
                } 
                // --- SINON, C'EST UN PLAT NORMAL ---
                else {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'menu-item';
                    
                    const headerDiv = document.createElement('div');
                    headerDiv.className = 'menu-item-header';
                    
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'menu-item-name';
                    nameSpan.textContent = plat.nom;
                    
                    const priceSpan = document.createElement('span');
                    priceSpan.className = 'menu-item-price';
                    priceSpan.textContent = plat.prix;
                    
                    headerDiv.appendChild(nameSpan);
                    headerDiv.appendChild(priceSpan);
                    itemDiv.appendChild(headerDiv);
                    
                    if (plat.desc && plat.desc.trim() !== '') {
                        const descDiv = document.createElement('div');
                        descDiv.className = 'menu-item-desc';
                        descDiv.textContent = plat.desc;
                        itemDiv.appendChild(descDiv);
                    }
                    
                    grid.appendChild(itemDiv);
                }
            });
        }
        
        container.appendChild(grid);
        // Animation de fondu (apparition)
        container.style.opacity = 1;
    }, 300); // Attendre 300ms pour l'effet visuel
}

// Gérer les clics sur les boutons d'onglets
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // 1. On gère l'apparence des boutons
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        // 2. On récupère le nom de l'onglet cliqué VIA LE DATA-FILTER
        const categorie = e.target.getAttribute('data-filter');
        
        // 3. On affiche la liste des plats correspondants
        renderMenu(categorie);
        
        // 4. On cache les notes par défaut
        document.getElementById('info-entrees').style.display = 'none';
        document.getElementById('info-plats').style.display = 'none';

        // 5. On affiche la bonne note selon le data-filter exact !
        if (categorie === 'Entrées') {
            document.getElementById('info-entrees').style.display = 'block';
        } else if (categorie === 'Plats') {
            document.getElementById('info-plats').style.display = 'block';
        }
    });
});

// Charger la première catégorie au lancement
document.addEventListener('DOMContentLoaded', () => renderMenu('Entrées'));