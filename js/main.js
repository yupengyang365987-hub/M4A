// Main JavaScript for Mock For All Website

const translations = {
    en: {
        branding: {
            name: 'Mock For All'
        },
        nav: {
            about: {
                label: 'About M4A',
                mission: {
                    title: 'Our Mission',
                    description: 'Explains what Mock For All stands for and its core values.'
                },
                founders: {
                    title: "Founders' Story",
                    description: 'Shares how and why Mock For All started.'
                },
                team: {
                    title: 'Our Team',
                    description: 'Introduces the members, volunteers, and contributors behind the platform.'
                },
                partners: {
                    title: 'Partners & Advisors',
                    description: 'Highlights schools, mentors, or organizations that collaborate with M4A.'
                },
                press: {
                    title: 'Press & Impact',
                    description: 'Shows the platform’s reach, statistics, and any media mentions.'
                },
                faq: {
                    title: 'FAQ / Governance',
                    description: 'Provides transparency about how the platform operates and answers common questions.'
                }
            }
        }
    },
    zh: {
        branding: {
            name: 'Mock For All 慕辩众享'
        },
        nav: {
            about: {
                label: '关于M4A',
                mission: {
                    title: '愿景与使命',
                    description: '阐述 Mock For All 的核心价值与教育理念。'
                },
                founders: {
                    title: '创立故事',
                    description: '分享 Mock For All 成立的初心与历程。'
                },
                team: {
                    title: '我们的团队',
                    description: '介绍平台背后的团队成员、志愿者与贡献者。'
                },
                partners: {
                    title: '合作伙伴与顾问',
                    description: '展示与 M4A 合作的学校、导师及机构。'
                },
                press: {
                    title: '媒体与影响',
                    description: '呈现平台的影响力数据与媒体报道。'
                },
                faq: {
                    title: '常见问题与治理',
                    description: '说明平台的运营透明度并解答常见疑问。'
                }
            }
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

function isDesktopView() {
    return window.matchMedia('(min-width: 769px)').matches;
}

function closeAllDropdowns(except) {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        if (dropdown !== except) {
            dropdown.classList.remove('open');
            const trigger = dropdown.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const languageButtons = document.querySelectorAll('.language-option');
    const storedLanguagePreference = localStorage.getItem('m4a-language');
    const storedLanguage = storedLanguagePreference && translations[storedLanguagePreference] ? storedLanguagePreference : 'en';

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
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

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (!trigger || !menu) {
            return;
        }

        const openDropdown = () => {
            closeAllDropdowns(dropdown);
            dropdown.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
        };

        const closeDropdown = () => {
            dropdown.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        };

        trigger.addEventListener('click', event => {
            if (isDesktopView()) {
                event.preventDefault();
                if (dropdown.classList.contains('open')) {
                    closeDropdown();
                } else {
                    openDropdown();
                }
            } else {
                event.preventDefault();
                const isOpen = dropdown.classList.toggle('open');
                trigger.setAttribute('aria-expanded', String(isOpen));
            }
        });

        trigger.addEventListener('mouseenter', () => {
            if (isDesktopView()) {
                openDropdown();
            }
        });

        trigger.addEventListener('focus', () => {
            if (isDesktopView()) {
                openDropdown();
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (isDesktopView()) {
                closeDropdown();
            }
        });

        dropdown.addEventListener('keyup', event => {
            if (event.key === 'Escape') {
                closeDropdown();
                trigger.focus();
            }
        });
    });

    document.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }

        if (!target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    document.addEventListener('focusin', event => {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }

        if (!target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

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
