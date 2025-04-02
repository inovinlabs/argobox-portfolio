/**
 * Main JavaScript file for argobox.com
 * Handles navigation, animations, and interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a backend service
            // For now, we'll just simulate a successful submission
            
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Form submission:', formValues);
            
            // Show success message (in a real implementation)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Create animated data streams
    function createRandomDataLines() {
        const dataStreamContainer = document.querySelector('.data-stream');
        
        if (!dataStreamContainer) return;
        
        // Remove existing lines
        const existingLines = dataStreamContainer.querySelectorAll('.data-line');
        existingLines.forEach(line => line.remove());
        
        // Create new random lines
        for (let i = 0; i < 10; i++) {
            const line = document.createElement('div');
            line.classList.add('data-line');
            
            // Random positioning and animation
            const left = Math.random() * 90 + 5; // 5-95%
            const width = Math.random() * 40 + 10; // 10-50%
            const duration = Math.random() * 3 + 2; // 2-5s
            
            line.style.left = `${left}%`;
            line.style.width = `${width}%`;
            line.style.animationDuration = `${duration}s`;
            
            dataStreamContainer.appendChild(line);
        }
    }
    
    // Initial data lines creation
    createRandomDataLines();
    
    // Refresh data lines periodically
    setInterval(createRandomDataLines, 10000);
    
    // Simulated live metrics - randomly update values periodically
    function updateMetrics() {
        const cpuValue = document.querySelector('.metric:nth-child(1) .metric-value');
        const cpuBar = document.querySelector('.metric:nth-child(1) .metric-progress');
        
        const memValue = document.querySelector('.metric:nth-child(2) .metric-value');
        const memBar = document.querySelector('.metric:nth-child(2) .metric-progress');
        
        const storageValue = document.querySelector('.metric:nth-child(3) .metric-value');
        const storageBar = document.querySelector('.metric:nth-child(3) .metric-progress');
        
        const networkValue = document.querySelector('.metric:nth-child(4) .metric-value');
        const networkBar = document.querySelector('.metric:nth-child(4) .metric-progress');
        
        if (cpuValue && cpuBar) {
            const newCpuValue = Math.floor(Math.random() * 30) + 20; // 20-50%
            cpuValue.textContent = `${newCpuValue}%`;
            cpuBar.style.width = `${newCpuValue}%`;
        }
        
        if (memValue && memBar) {
            const newMemValue = Math.floor(Math.random() * 20) + 45; // 45-65%
            memValue.textContent = `${newMemValue}%`;
            memBar.style.width = `${newMemValue}%`;
        }
        
        if (storageValue && storageBar) {
            const newStorageValue = Math.floor(Math.random() * 5) + 60; // 60-65%
            storageValue.textContent = `${newStorageValue}%`;
            storageBar.style.width = `${newStorageValue}%`;
        }
        
        if (networkValue && networkBar) {
            const newNetworkValue = Math.floor(Math.random() * 30) + 15; // 15-45%
            networkValue.textContent = `${newNetworkValue}%`;
            networkBar.style.width = `${newNetworkValue}%`;
        }
    }
    
    // Update metrics every 5 seconds
    setInterval(updateMetrics, 5000);
    
    // Trigger an initial metrics update
    updateMetrics();
});