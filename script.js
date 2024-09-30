// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active navigation item
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero section
const heroText = "Tanmay Devare";
const heroElement = document.querySelector('.hero-content h1');
let i = 0;

function typeWriter() {
    if (i < heroText.length) {
        heroElement.innerHTML += heroText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

window.onload = typeWriter;

// Animate on scroll initialization
AOS.init({
    duration: 1000,
    once: true
});

// Add fade-in effect to sections
document.querySelectorAll('section').forEach(section => {
    section.setAttribute('data-aos', 'fade-up');
});

// Add tilt effect to project cards
VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-mode', currentTheme === 'dark');
themeToggle.checked = currentTheme === 'dark';

themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Particle effect for hero section
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        projectCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Skills visualization
const skillBars = document.querySelectorAll('.progress-bar');
const skillCategories = document.querySelectorAll('.skill-category');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const progress = bar.parentElement.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
};

// Trigger skill bar animation when the skills section is in view
const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateSkillBars();
    }
}, { threshold: 0.5 });

observer.observe(skillsSection);

// Sort skills by proficiency
const sortSkillsBtn = document.getElementById('sort-skills');
sortSkillsBtn.addEventListener('click', () => {
    skillCategories.forEach(category => {
        const skills = Array.from(category.querySelectorAll('.skill-bar'));
        skills.sort((a, b) => {
            return parseInt(b.querySelector('.skill-progress').getAttribute('data-progress')) - 
                   parseInt(a.querySelector('.skill-progress').getAttribute('data-progress'));
        });
        skills.forEach(skill => category.appendChild(skill));
    });
});

// Search skills
const searchSkills = document.getElementById('search-skills');
searchSkills.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.skill-bar').forEach(skill => {
        const skillName = skill.getAttribute('data-skill').toLowerCase();
        if (skillName.includes(searchTerm)) {
            skill.style.display = 'block';
        } else {
            skill.style.display = 'none';
        }
    });
});

// Form validation
const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
});

// Lazy loading images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.querySelector('#theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
            document.body.classList.add('dark-mode');
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }    
    }

    toggleSwitch.addEventListener('change', switchTheme, false);
});