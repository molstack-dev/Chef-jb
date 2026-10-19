(function() {
    var allCourses = [];

    function getCategoryLabel(cat) {
        var map = { cursos: 'Curso', asesorias: 'Asesoría', eventos: 'Evento', seminarios: 'Seminario', diplomados: 'Diplomado' };
        return map[cat] || cat || 'Curso';
    }

    function getBadgeClass(cat) {
        var map = { cursos: 'bg-purple-600', asesorias: 'bg-amber-600', eventos: 'bg-green-600', seminarios: 'bg-blue-600', diplomados: 'bg-red-600' };
        return map[cat] || 'bg-gray-600';
    }

    function isUserAdmin() {
        var user = getCurrentUser();
        return user && user.role === 'admin';
    }

    // Un servicio está vencido si el backend lo marca así
    // o si es un evento cuya fecha/hora ya pasó.
    function isExpired(course) {
        if (course.is_expired === true || course.is_expired === 1 || course.is_expired === '1') {
            return true;
        }

        if ((course.category === 'eventos' || course.category === 'evento') && course.event_date) {
            // Formato ISO con "T" (compatible con Safari/iOS).
            // Sin hora definida, se considera vigente hasta el final del día.
            var eventDate = new Date(course.event_date + 'T' + (course.event_time || '23:59'));
            if (!isNaN(eventDate.getTime())) {
                return eventDate < new Date();
            }
        }

        return false;
    }

    // Nadie ve tarjetas vencidas.
    // Si quieres que el admin sí las vea, agrega al inicio:
    // if (isUserAdmin()) return courses;
    function filterPastEvents(courses) {
        return courses.filter(function(course) {
            return !isExpired(course);
        });
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    function formatTime(timeString) {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    }

    function renderCourses(filter) {
        var grid = document.getElementById('courses-grid');
        if (!grid) return;

        // Primero se descartan los vencidos, luego se filtra por categoría
        var available = filterPastEvents(allCourses);

        var filtered = filter === 'all' ? available : available.filter(function(c) {
            return c.category === filter;
        });

        if (filtered.length === 0 && filter !== 'all') {
            var map = { cursos: 'cursos', asesorias: 'asesorias', eventos: 'evento' };
            var dbCat = map[filter] || filter;
            filtered = available.filter(function(c) { return c.category === dbCat; });
        }

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="col-span-full text-center text-gray-400 py-8">No hay cursos en esta categoría.</div>';
            return;
        }

        grid.innerHTML = '';
        filtered.forEach(function(c) {
            var card = document.createElement('div');
            // Tarjeta compacta en móvil, amplia en desktop
            card.className = 'product-card p-3 md:p-6 rounded-xl bg-gray-800 bg-opacity-90 fade-in flex flex-col h-full';
            card.setAttribute('data-category', c.category || 'cursos');
            card.setAttribute('data-title', c.title || '');
            card.setAttribute('data-detail', (c.description_detail || c.description || ''));
            card.setAttribute('data-price', Number(c.price) || 0);

            var imgHtml = c.image
                ? '<div class="rounded-lg mb-2 md:mb-4 overflow-hidden bg-gray-700 aspect-square"><img src="' + c.image + '" class="w-full h-full object-cover rounded-lg" alt="' + c.title + '"></div>'
                : '';

            var eventInfo = '';
            if ((c.category === 'eventos' || c.category === 'evento') && c.event_date) {
                var dateFormatted = formatDate(c.event_date);
                var timeFormatted = formatTime(c.event_time);
                eventInfo = '<div class="mb-1.5 md:mb-3 text-[10px] md:text-sm text-gray-300">' +
                           '<div class="flex items-center gap-1 mb-0.5 md:mb-1">' +
                               '<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 md:h-4 md:w-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                                   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />' +
                               '</svg>' +
                               '<span class="truncate">' + dateFormatted + '</span>' +
                           '</div>';
                if (timeFormatted) {
                    eventInfo += '<div class="flex items-center gap-1">' +
                                    '<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 md:h-4 md:w-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                                        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />' +
                                    '</svg>' +
                                    '<span>' + timeFormatted + '</span>' +
                                 '</div>';
                }
                eventInfo += '</div>';
            }

            var inscriptionBtn = '<a href="registro.html" class="flex-1 text-center py-1.5 md:py-2 px-2 bg-green-600 text-white rounded-lg text-[10px] md:text-sm font-semibold hover:bg-green-700 transition-colors">Inscribirse</a>';

            card.innerHTML =
                imgHtml +
                '<div class="mb-1.5 md:mb-4">' +
                '<span class="inline-block px-2 py-0.5 md:px-3 md:py-1 ' + getBadgeClass(c.category) + ' text-white rounded-full text-[10px] md:text-sm">' + getCategoryLabel(c.category) + '</span>' +
                '</div>' +
                '<h4 class="text-sm md:text-2xl font-semibold mb-1.5 md:mb-3 text-white line-clamp-2 leading-tight">' + c.title + '</h4>' +
                eventInfo +
                '<div class="flex justify-between items-center mb-2 md:mb-4 gap-1">' +
                '<span class="text-amber-500 font-bold text-sm md:text-base">$' + Number(c.price).toLocaleString('es-ES') + '</span>' +
                '<span class="text-gray-400 text-[10px] md:text-sm truncate">' + (c.duration || '') + '</span>' +
                '</div>' +
                '<div class="mb-2 md:mb-4 flex-grow hidden md:block">' +
                '<p class="text-gray-400 text-sm line-clamp-2">' + (c.description || '') + '</p>' +
                '</div>' +
                '<div class="flex justify-end gap-2 md:space-x-3 mt-auto">' +
                '<button class="ver-detalles-btn flex-1 text-center py-1.5 md:py-2 px-2 purple-border-button rounded-lg text-xs md:text-base font-semibold transition-colors">Detalles</button>' +
                inscriptionBtn +
                '</div>';

            grid.appendChild(card);
        });
    }

    function setupFilters() {
        var btns = document.querySelectorAll('.filter-btn');
        btns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                btns.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                renderCourses(btn.getAttribute('data-filter'));
            });
        });
    }

    // Se registra una sola vez (antes se acumulaba en cada render)
    function setupDetailsClick(grid) {
        grid.addEventListener('click', function(e) {
            if (e.target.classList.contains('ver-detalles-btn')) {
                var card = e.target.closest('.product-card');
                if (card && typeof showCourseDetails === 'function') {
                    showCourseDetails(
                        card.getAttribute('data-title'),
                        card.getAttribute('data-detail')
                    );
                }
            }
        });
    }

    async function loadCatalogCourses() {
        var grid = document.getElementById('courses-grid');
        if (!grid) return;

        try {
            var resp = await fetch('/backend/api/cursos-get.php');
            var result = await resp.json();

            if (!result.success || result.data.length === 0) {
                grid.innerHTML = '<div class="col-span-full text-center text-gray-400 py-8">No hay cursos disponibles.</div>';
                return;
            }

            allCourses = result.data;
            setupFilters();
            setupDetailsClick(grid);
            renderCourses('all');
        } catch (e) {
            console.error('Error loading courses:', e);
            grid.innerHTML = '<div class="col-span-full text-center text-red-400 py-8">Error: ' + e.message + '</div>';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadCatalogCourses);
    } else {
        loadCatalogCourses();
    }
})();