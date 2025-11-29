// Theme Toggle Functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button emoji
    const themeButton = document.querySelector('.theme-toggle');
    themeButton.textContent = newTheme === 'dark' ? '☀️' : '🌓';
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeButton = document.querySelector('.theme-toggle');
    if (themeButton) {
        themeButton.textContent = savedTheme === 'dark' ? '☀️' : '🌓';
    }
});

// Download Resume
function downloadResume() {
    alert('Resume download started!');
    console.log('Downloading resume...');
    // In a real implementation, you would trigger an actual download
    // window.location.href = 'path/to/your/resume.pdf';
}

// View Project
function viewProject(projectName) {
    alert(`Opening ${projectName}...`);
    console.log(`View project: ${projectName}`);
    // In a real implementation, you would navigate to the project page
}

// Send Email
function sendEmail() {
    const email = 'roshanmukhiya77799@gmail.com';
    const subject = 'Hello from your portfolio!';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

// Connect on LinkedIn
function connectLinkedIn() {
    window.open('https://www.linkedin.com', '_blank');
}

// View GitHub
function viewGitHub() {
    window.open('https://www.github.com', '_blank');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-section').forEach(section => {
    observer.observe(section);
});

// Canvas Drawing Functionality
let canvas, ctx, isDrawing = false;
let currentColor = '#6366f1';
let currentSize = 5;

window.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('drawingCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    // Fill canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Color picker event
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('change', (e) => {
            currentColor = e.target.value;
        });
    }
    
    // Brush size event
    const brushSize = document.getElementById('brushSize');
    const brushSizeValue = document.getElementById('brushSizeValue');
    if (brushSize && brushSizeValue) {
        brushSize.addEventListener('input', (e) => {
            currentSize = e.target.value;
            brushSizeValue.textContent = currentSize;
        });
    }
    
    // Mouse events for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);
});

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
}

function handleTouchMove(e) {
    if (!isDrawing) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
}

function clearCanvas() {
    if (!ctx || !canvas) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    if (!canvas) return;
    
    // Create a download link
    const link = document.createElement('a');
    link.download = 'my-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
    
    alert('Drawing saved!');
}

// Add animation to skill badges on page load
window.addEventListener('load', () => {
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        setTimeout(() => {
            badge.classList.add('fade-in');
        }, index * 50);
    });
});