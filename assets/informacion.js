/* ============================================================
   INFORMACION.JS
   FAQ (event delegation) + Carrusel Instagram
   Solo se usa en views/informacion.html
   ============================================================ */

/* ============================================================
   FAQ — Event delegation global
   Escucha clics en cualquier .faq-question del documento.
   No requiere onclick en el HTML.
   ============================================================ */
document.addEventListener('click', function (e) {
    var btn = e.target.closest('.faq-question');
    if (!btn) return;

    e.preventDefault();

    var answer = btn.nextElementSibling;
    var icon   = btn.querySelector('svg');
    if (!answer || !answer.classList.contains('faq-answer')) return;

    var wasHidden = answer.classList.contains('hidden');

    /* Cerrar todos */
    document.querySelectorAll('.faq-answer').forEach(function (a) {
        a.classList.add('hidden');
    });
    document.querySelectorAll('.faq-question svg').forEach(function (s) {
        s.classList.remove('rotate-180');
    });
    document.querySelectorAll('.faq-question').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
    });

    /* Abrir el actual si estaba cerrado */
    if (wasHidden) {
        answer.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
        btn.setAttribute('aria-expanded', 'true');
    }
});

/* ============================================================
   CARRUSEL INSTAGRAM
   Pausa al hacer hover (desktop) / tap (móvil)
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    var track = document.getElementById('instaCarouselTrack');
    if (!track) return;

    var wrapper = track.parentElement;

    /* Pausar al hacer clic en el contenedor */
    wrapper.addEventListener('click', function () {
        track.classList.toggle('paused');
    });

    /* Pausar al tocar en móvil */
    wrapper.querySelectorAll('.insta-carousel-item').forEach(function (item) {
        item.addEventListener('touchstart', function () {
            track.classList.add('paused');
        }, { passive: true });
    });

    /* Reanudar 4s después de soltar en móvil */
    var resumeTimer;
    wrapper.addEventListener('touchstart', function () {
        clearTimeout(resumeTimer);
    }, { passive: true });
    wrapper.addEventListener('touchend', function () {
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function () {
            track.classList.remove('paused');
        }, 4000);
    }, { passive: true });
});