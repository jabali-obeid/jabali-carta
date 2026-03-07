document.addEventListener('DOMContentLoaded', () => {
    // Fullscreen behavior on first user interaction
    const enterFullscreen = () => {
        const elem = document.documentElement;
        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen().catch(err => console.log("Fullscreen API error:", err));
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen().catch(err => console.log("Fullscreen API error:", err));
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen().catch(err => console.log("Fullscreen API error:", err));
            }
        }
        // Remove listeners after first trigger attempt to avoid repeated prompt if user exits fullscreen
        document.removeEventListener('click', enterFullscreen);
        document.removeEventListener('touchstart', enterFullscreen);
    };

    document.addEventListener('click', enterFullscreen);
    document.addEventListener('touchstart', enterFullscreen, { passive: true });

    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.menu-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show target section
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Re-trigger animation by doing a slight DOM redraw trick 
            const targetSection = document.getElementById(targetId);
            const categories = targetSection.querySelectorAll('.menu-category');
            categories.forEach(cat => {
                cat.style.animation = 'none';
                cat.offsetHeight; /* trigger reflow */
                cat.style.animation = null;
            });
        });
    });

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Collapsible Categories ---
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const category = header.closest('.menu-category');
            category.classList.toggle('collapsed');
        });
    });

    // --- Search Functionality ---
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const activeSection = document.querySelector('.menu-section.active');
        
        if (!activeSection) return;

        const categories = activeSection.querySelectorAll('.menu-category');

        categories.forEach(category => {
            const items = category.querySelectorAll('.menu-item');
            let hasVisibleItems = false;

            items.forEach(item => {
                const itemName = item.querySelector('.item-name')?.textContent.toLowerCase() || '';
                const itemDesc = item.querySelector('.item-desc')?.textContent.toLowerCase() || '';

                if (itemName.includes(searchTerm) || itemDesc.includes(searchTerm)) {
                    item.classList.remove('hidden');
                    hasVisibleItems = true;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Hide the entire category if no items match
            if (hasVisibleItems || searchTerm === '') {
                category.style.display = 'block';
                // If searching and found something, ensure it's not collapsed
                if (searchTerm !== '') {
                    category.classList.remove('collapsed');
                }
            } else {
                category.style.display = 'none';
            }
        });
    });

    // Clear search when changing tabs
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            searchInput.value = '';
            // Trigger input event to reset view
            searchInput.dispatchEvent(new Event('input'));
        });
    });
});

