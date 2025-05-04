// Main functionality for EcoZib website
function initializeApp() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const body = document.body;
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('body-scroll-lock');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('body-scroll-lock');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('body-scroll-lock');
        }
    });
    
    // Set initial active state based on URL hash
    function setInitialActive() {
        const hash = window.location.hash;
        if (hash) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                }
            });
        } else {
            // If no hash, set the Solutions as active by default
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#solutions') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Run initial setup
    setInitialActive();
    
    function highlightNavigation() {
        let scrollY = window.pageYOffset;
        let currentActive = null;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentActive = '#' + sectionId;
            }
        });
        
        if (currentActive) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentActive) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Add smooth scrolling to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update URL hash without jumping
            history.pushState(null, null, targetId);
            
            // Remove active class from all links and add to clicked link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Listen for components loaded event or run directly if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('componentsLoaded', initializeApp);
} else {
    // If DOM is already loaded and components might be in place
    setTimeout(initializeApp, 100);
} 