document.addEventListener("DOMContentLoaded", function() {
    
    // 1. RETRAIT DE L'ÉCRAN DE CHARGEMENT
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 600); 

    // 2. STATUT D'OUVERTURE EN TEMPS RÉEL
    function updateRestaurantStatus() {
        const now = new Date();
        const day = now.getDay(); 
        const time = now.getHours() + (now.getMinutes() / 60);

        const dot = document.getElementById('status-dot');
        const text = document.getElementById('status-text');
        if (!dot || !text) return;

        const schedule = {
            0: [{start: 12, end: 15}], // Dimanche
            1: [], // Lundi (Fermé)
            2: [{start: 12, end: 15}, {start: 19, end: 22}], // Mardi
            3: [{start: 19, end: 22}], // Mercredi (Fermé midi)
            4: [{start: 12, end: 15}, {start: 19, end: 22}], // Jeudi
            5: [{start: 12, end: 15}, {start: 19, end: 22}], // Vendredi
            6: [{start: 12, end: 15}, {start: 19, end: 22}]  // Samedi
        };

        const todayHours = schedule[day];
        let isOpen = false;
        let currentPeriod = null;

        for (let period of todayHours) {
            if (time >= period.start && time < period.end) {
                isOpen = true;
                currentPeriod = period;
                break;
            }
        }

        if (isOpen) {
            dot.style.backgroundColor = '#4ade80'; // Vert
            text.innerText = `Ouvert (jusqu'à ${currentPeriod.end}h)`;
        } else {
            dot.style.backgroundColor = '#ff4d4d'; // Rouge
            
            let nextOpenDay = day;
            let nextOpenTime = null;
            let daysChecked = 0;

            while (daysChecked < 7 && nextOpenTime === null) {
                let hoursToCheck = schedule[nextOpenDay];
                for (let period of hoursToCheck) {
                    if (daysChecked === 0) {
                        if (time < period.start) { nextOpenTime = period.start; break; }
                    } else {
                        nextOpenTime = period.start; break;
                    }
                }
                if (nextOpenTime !== null) break;
                nextOpenDay = (nextOpenDay + 1) % 7;
                daysChecked++;
            }

            let momentName = "";
            if (nextOpenDay === day) {
                momentName = nextOpenTime < 17 ? "ce midi" : "ce soir";
            } else if (nextOpenDay === (day + 1) % 7) {
                momentName = "demain";
            } else {
                momentName = dayNames[nextOpenDay];
            }
            
            text.innerText = `Fermé (Ouvre ${momentName} à ${nextOpenTime}h)`;
        }
    }

    updateRestaurantStatus();
    setInterval(updateRestaurantStatus, 60000);

    // 3. ANIMATIONS FLUIDES AU DÉFILEMENT (SCROLL REVEAL)
    const revealElements = document.querySelectorAll('.reveal, .section-title, .menu-image-container, .contact-info');
    
    const revealOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px" 
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 4. SYSTÈME D'ONGLETS POUR LE MENU
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuImgs = document.querySelectorAll('.menu-img');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            menuImgs.forEach(img => img.classList.remove('active'));

            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');
            const targetImg = document.getElementById(targetId);
            if(targetImg) {
                targetImg.classList.add('active');
            }
        });
    });

    // 5. GESTION RGPD DES COOKIES (Le fameux cerveau !)
    const banner = document.getElementById("cookie-banner");
    const consent = localStorage.getItem("kascade_cookie_consent");

    if (banner) {
        if (consent === "accepted") {
            // S'il a déjà accepté, on charge Google Analytics discrètement
            if(typeof window.loadGTM === "function") window.loadGTM();
        } else if (!consent) {
            // S'il n'a fait aucun choix, on affiche la belle carte
            banner.style.display = "block"; 
        }

        document.getElementById("btn-accept-cookies")?.addEventListener("click", function() {
            localStorage.setItem("kascade_cookie_consent", "accepted");
            banner.style.display = "none";
            if(typeof window.loadGTM === "function") window.loadGTM();
        });

        document.getElementById("btn-refuse-cookies")?.addEventListener("click", function() {
            localStorage.setItem("kascade_cookie_consent", "refused");
            banner.style.display = "none";
        });
    }
});