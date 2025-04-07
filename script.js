// Tambahkan ini sebelum penutup </body>
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu');
    const navbar = document.querySelector('.navbar');
    
    menuIcon.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
    
    // Tutup navbar ketika mengklik link (opsional)
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
        });
    });
});

// Merubah lokasi aktif section pada navbar
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 160;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        };
    });
    // sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

// Platform logo URLs (can be replaced with your own images)
const platformLogos = {
    github: "file/github.png",
    kaggle: "file/kaggle.png",
};

// Centralized project data
const allProjects = [
    {
        id: 1,
        title: "Penerbangan",
        category: "data_science",
        description: "A complete e-commerce platform with integrated payment system and inventory management. Built with modern technology to provide a seamless online shopping experience.",
        features: [
            "Integration with multiple payment gateways",
            "AI-based product recommendation system",
            "Real-time inventory management",
            "Analytics dashboard for sellers"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
        imageUrl: "file/birthday.jpg",
        platforms: [
            {
                name: "GitHub",
                logo: "github",
                url: "https://github.com/nafishr24/obesity-prediction-kaggle"
            },
            {
                name: "Kaggle",
                logo: "kaggle",
                url: "https://github.com/nafishr24/obesity-prediction-kaggle"
            }
        ]
    },
    // Other projects can be added here...
    {
        id: 2,
        title: "E-Commerce",
        category: "web",
        description: "A complete e-commerce platform with integrated payment system and inventory management. Built with modern technology to provide a seamless online shopping experience.",
        features: [
            "Integration with multiple payment gateways",
            "AI-based product recommendation system",
            "Real-time inventory management",
            "Analytics dashboard for sellers"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
        imageUrl: "file/birthday.jpg",
        platforms: [
            {
                name: "GitHub",
                logo: "github",
                url: "https://github.com/nafishr24/obesity-prediction-kaggle"
            }
        ]
    },
];

// State management
const state = {
    currentCategory: 'all',
    currentProjectIndex: 0,
    filteredProjects: []
};

// DOM Elements
const projectDisplay = document.getElementById('project-display');
const tabButtons = document.querySelectorAll('.tab-btn');

// Filter projects by category
function filterProjects(category) {
    state.currentCategory = category;
    state.currentProjectIndex = 0;
    
    if (category === 'all') {
        state.filteredProjects = [...allProjects];
    } else {
        state.filteredProjects = allProjects.filter(
            project => project.category === category
        );
    }
    
    renderProject();
}

// Render current project
function renderProject() {
    if (state.filteredProjects.length === 0) {
        projectDisplay.innerHTML = `
            <div class="no-projects">
                <p>No projects available in this category</p>
            </div>
        `;
        return;
    }
    
    const project = state.filteredProjects[state.currentProjectIndex];
    const projectIndex = state.currentProjectIndex;
    const totalProjects = state.filteredProjects.length;
    
    // Generate platform links HTML
    const platformsHTML = project.platforms ? `
        <div class="project-platforms">
            <h4>Published On:</h4>
            <div class="platform-links">
                ${project.platforms.map(platform => `
                    <a href="${platform.url}" target="_blank" class="platform-link">
                        <img src="${platformLogos[platform.logo]}" alt="${platform.name}" class="platform-logo">
                        <span>${platform.name}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    ` : '';
    
    projectDisplay.innerHTML = `
        <div class="project-container">
            <div class="project-details">
                <h2 class="project-title">${project.title}</h2>
                <p class="project-description">${project.description}</p>
                
                <div class="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-tech">
                    <h4>Technologies Used:</h4>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                ${platformsHTML}
            </div>
            
            <div class="project-media">
                <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
                
                <div class="project-nav">
                    <button class="nav-btn prev-btn" onclick="navigate(-1)" 
                        ${projectIndex === 0 ? 'disabled' : ''}>
                        &lt;
                    </button>
                    
                    <span class="project-counter">${projectIndex + 1} / ${totalProjects}</span>
                    
                    <button class="nav-btn next-btn" onclick="navigate(1)" 
                        ${projectIndex === totalProjects - 1 ? 'disabled' : ''}>
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Navigation function
function navigate(direction) {
    const newIndex = state.currentProjectIndex + direction;
    
    if (newIndex >= 0 && newIndex < state.filteredProjects.length) {
        state.currentProjectIndex = newIndex;
        renderProject();
    }
}

// Activate category
function activateCategory(category) {
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    filterProjects(category);
}

// Event listeners
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        activateCategory(btn.dataset.category);
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    activateCategory('all');
});

// Expose functions to global scope
window.navigate = navigate;
