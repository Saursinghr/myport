// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Toggle menu icon
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu after clicking a link
        navMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

// Active link highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Section reveal animations
sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// Set dark mode as mandatory
document.documentElement.setAttribute('data-theme', 'dark');

// Remove theme toggle button
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.style.display = 'none';
}

// Skills Section Animations
function initSkillsAnimations() {
    // Animate skill categories on scroll
    gsap.utils.toArray('.skill-category').forEach((category, index) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2
        });
    });

    // Animate progress bars
    gsap.utils.toArray('.skill-item').forEach((item) => {
        const progressBar = item.querySelector('.progress-bar');
        const percentageSpan = item.querySelector('.skill-percentage');
        const targetWidth = progressBar.style.width;
        
        // Set initial state
        gsap.set(progressBar, { width: 0 });
        gsap.set(percentageSpan, { textContent: '0%' });

        // Create animation
        gsap.to(progressBar, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse"
            },
            width: targetWidth,
            duration: 1.5,
            ease: "power2.out"
        });

        // Animate percentage number
        gsap.to(percentageSpan, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse"
            },
            textContent: targetWidth,
            duration: 1.5,
            snap: { textContent: 1 },
            stagger: 1,
            ease: "power2.out"
        });
    });
}

// Interactive hover effects
function initSkillsInteractions() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "0 10px 20px rgba(0,0,0,0.15)"
            });
            
            // Highlight progress bar
            const progressBar = item.querySelector('.progress-bar');
            gsap.to(progressBar, {
                brightness: 1.2,
                duration: 0.3
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
            });
            
            // Reset progress bar
            const progressBar = item.querySelector('.progress-bar');
            gsap.to(progressBar, {
                brightness: 1,
                duration: 0.3
            });
        });
    });
}

// Initialize skills animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSkillsAnimations();
    initSkillsInteractions();
});

// Slideshow functionality
function showSlides(container, n) {
    let slides = container.getElementsByClassName("slide");
    let dots = container.getElementsByClassName("dot");
    
    if (n > slides.length) {n = 1}
    if (n < 1) {n = slides.length}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active");
    }
    
    slides[n-1].style.display = "block";
    dots[n-1].classList.add("active");
}

function changeSlide(button, direction) {
    let container = button.closest('.slideshow-container');
    let slides = container.getElementsByClassName("slide");
    let currentSlide = 0;
    
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].style.display === "block") {
            currentSlide = i + 1;
            break;
        }
    }
    
    showSlides(container, currentSlide + direction);
}

function currentSlide(dot, n) {
    let container = dot.closest('.slideshow-container');
    showSlides(container, n);
}

// Initialize all slideshows
document.addEventListener('DOMContentLoaded', function() {
    let slideshows = document.getElementsByClassName('slideshow-container');
    for (let slideshow of slideshows) {
        showSlides(slideshow, 1);
    }
}); 