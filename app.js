(function() {
    const body = document.body;
    const toggle = document.getElementById('theme-toggle');
    const moon = document.getElementById('icon-moon');
    const sun = document.getElementById('icon-sun');

    function apply(isDark) {
        body.classList.toggle('dark-mode', isDark);
        if (moon && sun) {
            moon.style.display = isDark ? 'none' : '';
            sun.style.display = isDark ? '' : 'none';
        }
    }

    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    apply(stored ? stored === 'dark' : prefersDark);

    if (toggle) {
        toggle.addEventListener('click', function() {
            const next = !body.classList.contains('dark-mode');
            apply(next);
            localStorage.setItem('theme', next ? 'dark' : 'light');
        });
    }

    document.querySelectorAll('.scroll-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const nav = document.querySelector('.nav');
            const navHeight = nav ? nav.offsetHeight : 0;
            window.scrollTo({
                top: target.offsetTop - navHeight - 20,
                behavior: 'smooth'
            });
        });
    });

    const fadeElements = document.querySelectorAll('.fade-in-element');
    if (fadeElements.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) entry.target.classList.add('fade-in-visible');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        fadeElements.forEach(function(el) { observer.observe(el); });
    }
})();
