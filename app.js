document.addEventListener("DOMContentLoaded", function() {
    
    // 1. RETRAIT DU PRELOADER
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
    }, 500);

    // 2. STATUT D'OUVERTURE EN TEMPS RÉEL (Sécurisé pour dimanches et lundis)
    try {
        const dot = document.getElementById('status-dot');
        const text = document.getElementById('status-text');

        if (dot && text) {
            const now = new Date();
            const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
            const time = now.getHours() + (now.getMinutes() / 60);

            const schedule = {
                0: [{start: 12, end: 15}], // Dimanche midi
                1: [], // Lundi fermé
                2: [{start: 12, end: 15}, {start: 19, end: 22}], // Mardi
                3: [{start: 19, end: 22}], // Mercredi soir
                4: [{start: 12, end: 15}, {start: 19, end: 22}], // Jeudi
                5: [{start: 12, end: 15}, {start: 19, end: 22}], // Vendredi
                6: [{start: 12, end: 15}, {start: 19, end: 22}]  // Samedi
            };

            const todayHours = schedule[day] || [];
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
                dot.style.backgroundColor = '#4ade80';
                text.innerText = `Ouvert (jusqu'à ${currentPeriod.end}h)`;
            } else {
                dot.style.backgroundColor = '#ff4d4d';

                let nextOpenDay = day;
                let nextOpenTime = null;
                let daysChecked = 0;

                while (daysChecked < 7 && nextOpenTime === null) {
                    let hoursToCheck = schedule[nextOpenDay] || [];
                    for (let period of hoursToCheck) {
                        if (daysChecked === 0) {
                            if (time < period.start) {
                                nextOpenTime = period.start;
                                break;
                            }
                        } else {
                            nextOpenTime = period.start;
                            break;
                        }
                    }
                    if (nextOpenTime !== null) break;
                    nextOpenDay = (nextOpenDay + 1) % 7;
                    daysChecked++;
                }

                const dayNames = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
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
    } catch (e) {
        console.error("Erreur statut horaires :", e);
    }

    // 3. APPARITION DU CONTENU (Scroll Reveal)
    try {
        const revealElements = document.querySelectorAll('.reveal, .section-title, .menu-image-container, .contact-info');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.05 });

            revealElements.forEach(el => observer.observe(el));
        } else {
            // Secours si le navigateur mobile bloque l'observateur
            revealElements.forEach(el => el.classList.add('active'));
        }
    } catch (e) {
        // En cas d'anomalie, on force l'affichage de tout le contenu
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }

    // 4. ONGLETS DU MENU
    try {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const menuImgs = document.querySelectorAll('.menu-img');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                menuImgs.forEach(img => img.classList.remove('active'));

                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                const targetImg = document.getElementById(targetId);
                if (targetImg) targetImg.classList.add('active');
            });
        });
    } catch (e) {
        console.error("Erreur onglets menu :", e);
    }

    // 5. BANDEAU COOKIES RGPD
    try {
        const banner = document.getElementById("cookie-banner");
        const consent = localStorage.getItem("kascade_cookie_consent");

        if (banner) {
            if (consent === "accepted") {
                if (typeof window.loadGTM === "function") window.loadGTM();
            } else if (!consent) {
                banner.style.display = "block";
            }

            document.getElementById("btn-accept-cookies")?.addEventListener("click", function() {
                localStorage.setItem("kascade_cookie_consent", "accepted");
                banner.style.display = "none";
                if (typeof window.loadGTM === "function") window.loadGTM();
            });

            document.getElementById("btn-refuse-cookies")?.addEventListener("click", function() {
                localStorage.setItem("kascade_cookie_consent", "refused");
                banner.style.display = "none";
            });
        }
    } catch (e) {
        console.error("Erreur cookies :", e);
    }
});