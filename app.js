document.addEventListener("DOMContentLoaded", () => {
    
    // GESTION DU MENU EN IMAGES
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuImgs = document.querySelectorAll('.menu-img');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 1. On enlève la classe 'active' de tous les boutons et images
            tabBtns.forEach(b => b.classList.remove('active'));
            menuImgs.forEach(img => img.classList.remove('active'));
            
            // 2. On met en surbrillance le bouton cliqué
            e.target.classList.add('active');
            
            // 3. On affiche l'image correspondante avec un petit effet de fondu
            const targetId = e.target.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

});