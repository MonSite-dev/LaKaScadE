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
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderMenu(e.target.getAttribute('data-filter'));
    });
});

// Charger la première catégorie au lancement
document.addEventListener('DOMContentLoaded', () => renderMenu('Entrées'));