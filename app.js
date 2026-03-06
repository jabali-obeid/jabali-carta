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
});
