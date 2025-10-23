// Main JavaScript for Mock For All Website

const translations = {
    en: {
        branding: {
            name: 'Mock For All'
        }
    },
    zh: {
        branding: {
            name: 'Mock For All 慕辩众享'
        }
    }
};

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

function getTranslation(language, key) {
    return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), translations[language]);
}

function updateLanguage(language) {
    const languageButtons = document.querySelectorAll('.language-option');
    languageButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.language === language);
    });

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const translation = getTranslation(language, element.getAttribute('data-i18n'));
        if (typeof translation === 'string') {
            element.textContent = translation;
        }
    });

    document.documentElement.setAttribute('lang', language === 'zh' ? 'zh-Hans' : 'en');
    localStorage.setItem('m4a-language', language);
}

document.addEventListener('DOMContentLoaded', () => {
    const normalizePath = (path) => {
        if (!path) {
            return '/';
        }

        let normalized = path;
        if (normalized.endsWith('index.html')) {
            normalized = normalized.slice(0, -'index.html'.length);
        }

        if (normalized.length > 1 && normalized.endsWith('/')) {
            normalized = normalized.slice(0, -1);
        }

        return normalized || '/';
    };

    const currentPath = normalizePath(window.location.pathname);
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-links');
    const languageButtons = document.querySelectorAll('.language-option');
    const hasLanguageToggle = languageButtons.length > 0;
    const storedLanguagePreference = localStorage.getItem('m4a-language');
    const storedLanguage = hasLanguageToggle && storedLanguagePreference && translations[storedLanguagePreference]
        ? storedLanguagePreference
        : 'en';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) {
            return;
        }

        const linkPath = normalizePath(new URL(href, window.location.origin + '/').pathname);

        if (currentPath === linkPath || (currentPath.startsWith(linkPath + '/') && linkPath !== '/')) {
            link.classList.add('active');
        }

        link.addEventListener('click', () => {
            if (navList && navList.classList.contains('mobile-active')) {
                navList.classList.remove('mobile-active');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!expanded));
            navList.classList.toggle('mobile-active');
        });
    }

    const videoAcademyLink = Array.from(navLinks).find(link => (link.getAttribute('href') || '').includes('video-academy'));
    if (currentPath.startsWith('/videos/')) {
        videoAcademyLink?.classList.add('active');
    }

    const showcaseLink = Array.from(navLinks).find(link => (link.getAttribute('href') || '').includes('showcase'));
    if (currentPath.startsWith('/showcase/') && showcaseLink) {
        showcaseLink.classList.add('active');
    }

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const language = button.dataset.language;
            if (language) {
                updateLanguage(language);
            }
        });
    });

    updateLanguage(storedLanguage);

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', event => {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                event.preventDefault();
            }
        });
    });

    const animatedElements = document.querySelectorAll('.feature-card, .card, .video-card, .about-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
