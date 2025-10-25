// Navbar functionality - shared across all pages

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks && hamburger) {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks && hamburger) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Save language preference
function saveLanguagePreference(lang) {
    try {
        localStorage.setItem('preferredLanguage', lang);
    } catch(e) {
        console.warn('Could not save language preference:', e);
    }
}

// Function to initialize language switcher
function initLanguageSwitcher() {
    const mobileSwitcher = document.querySelector('.language-switcher-mobile');

    let currentPath = window.location.pathname;

    // Normalize path to ensure trailing slash
    if (!currentPath.endsWith('/')) {
        currentPath = currentPath + '/';
    }

    // Map of English to Spanish paths
    const pathMap = {
        '/en/': '/es/',
        '/en/places-to-stay/': '/es/lugares-para-hospedarse/',
        '/es/': '/en/',
        '/es/lugares-para-hospedarse/': '/en/places-to-stay/'
    };

    // Update the mobile language switcher href based on current page
    if (pathMap[currentPath] && mobileSwitcher) {
        const targetPath = pathMap[currentPath];

        const newMobileSwitcher = mobileSwitcher.cloneNode(true);
        mobileSwitcher.parentNode.replaceChild(newMobileSwitcher, mobileSwitcher);
        newMobileSwitcher.href = targetPath;
        newMobileSwitcher.removeAttribute('onclick');

        newMobileSwitcher.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const lang = targetPath.startsWith('/es/') ? 'es' : 'en';
            saveLanguagePreference(lang);
            closeMenu(); // Close the mobile menu when switching languages
            window.location.href = targetPath;
        }, true);
    }
}

// Initialize navbar functionality after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait for navbar to be loaded (since it's loaded via fetch)
    setTimeout(function() {
        // Navbar scroll effect
        const nav = document.querySelector('nav');
        if (nav) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });
        }

        // Mobile dropdown toggle
        document.querySelectorAll('.dropdown > a').forEach(function(dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = this.parentElement;
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Close mobile menu when clicking dropdown links
        document.querySelectorAll('.dropdown-content a').forEach(function(link) {
            link.addEventListener('click', closeMenu);
        });

        // Initialize language switcher
        initLanguageSwitcher();
    }, 100);
});