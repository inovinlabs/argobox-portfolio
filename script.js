/**
 * Main JavaScript file for argobox.com
 * Handles navigation, animations, and interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Set active navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
    
    // Handle navbar style change on scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarStyle() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbarStyle);
    updateNavbarStyle();
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const formValues = Object.fromEntries(formData.entries());
                
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    throw new Error(result.error || 'Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again or contact me directly via email.');
            } finally {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
    
    // Initialize and animate the hero terminal
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        // The animation is handled by CSS, nothing to do here
        console.log('Terminal typing animation initialized');
    }
    
    // Create animated data streams in the dashboard
    function createDataStreamAnimation() {
        const dataStreamContainer = document.querySelector('.data-stream');
        
        if (!dataStreamContainer) {
            console.log('Data stream container not found');
            return;
        }

        // Clear existing lines
        dataStreamContainer.innerHTML = '';
        
        // Create new random lines
        for (let i = 0; i < 10; i++) {
            const line = document.createElement('div');
            line.classList.add('data-line');
            
            // Random positioning and animation
            const left = Math.random() * 90 + 5; // 5-95%
            const width = Math.random() * 40 + 10; // 10-50%
            const duration = Math.random() * 3 + 2; // 2-5s duration
            const delay = Math.random() * 2; // 0-2s delay
            
            line.style.cssText = `
                left: ${left}%;
                width: ${width}%;
                animation: datastream ${duration}s linear infinite;
                animation-delay: -${delay}s;
                opacity: ${Math.random() * 0.3 + 0.2};
            `;
            
            dataStreamContainer.appendChild(line);
        }
    }
    
    // Initialize the data stream animation immediately
    createDataStreamAnimation();
    
    // Refresh data streams every 8 seconds
    setInterval(createDataStreamAnimation, 8000);
    
    // Update terminal output with random status messages
    function updateTerminalOutput() {
        const terminalOutput = document.querySelector('.terminal-output');
        if (!terminalOutput) return;
        
        const statusMessages = [
            { text: 'All systems operational', type: '' },
            { text: 'Backup completed successfully', type: 'terminal-success' },
            { text: 'Security scan in progress', type: 'terminal-info' },
            { text: 'New updates available', type: 'terminal-warning' },
            { text: 'Optimizing database performance', type: 'terminal-info' }
        ];
        
        // Randomly update one of the lines
        const lineIndex = Math.floor(Math.random() * 2) + 4; // Only update the last few lines
        const lineToUpdate = terminalOutput.children[lineIndex];
        
        if (lineToUpdate) {
            const randomMessage = statusMessages[Math.floor(Math.random() * statusMessages.length)];
            lineToUpdate.textContent = `> ${randomMessage.text}`;
            lineToUpdate.className = 'terminal-line';
            if (randomMessage.type) {
                lineToUpdate.classList.add(randomMessage.type);
            }
        }
    }
    
    // Periodically update the terminal with new messages
    setInterval(updateTerminalOutput, 5000);
    
    // Simulated live metrics - randomly update values periodically
    function updateMetrics() {
        function updateMetricIfExists(selector, minValue, maxValue) {
            const valueElement = document.querySelector(selector + ' .metric-value') || 
                                document.querySelector(selector + ' .metric-header .metric-value');
                                
            const barElement = document.querySelector(selector + ' .metric-progress');
            
            if (valueElement && barElement) {
                const newValue = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
                valueElement.textContent = `${newValue}%`;
                barElement.style.width = `${newValue}%`;
                return true;
            }
            return false;
        }
        
        // Try different selectors to find the metrics
        // First attempt with nth-child
        let found = updateMetricIfExists('.metric:nth-child(1)', 20, 50);
        if (!found) {
            // Alternative approach - try by unique class or attribute
            updateMetricIfExists('[data-metric="cpu"]', 20, 50);
        }
        
        updateMetricIfExists('.metric:nth-child(2)', 45, 65) || 
        updateMetricIfExists('[data-metric="memory"]', 45, 65);
        
        updateMetricIfExists('.metric:nth-child(3)', 60, 65) || 
        updateMetricIfExists('[data-metric="storage"]', 60, 65);
        
        updateMetricIfExists('.metric:nth-child(4)', 15, 45) || 
        updateMetricIfExists('[data-metric="network"]', 15, 45);
    }
    
    // Update metrics every 5 seconds
    setInterval(updateMetrics, 5000);
    
    // Trigger an initial metrics update
    setTimeout(updateMetrics, 500);
    
    // Debug info - help determine if there are any issues
    console.log('Script loaded successfully');
    console.log('Sections found:', sections.length);
    console.log('Nav links found:', navItems.length);
    
    // Check if dashboard elements exist
    console.log('Data stream container exists:', 
        !!document.querySelector('.data-stream') || 
        !!document.querySelector('.tech-dashboard .data-stream'));
    
    console.log('Metrics containers exist:', 
        !!document.querySelector('.metric'));
    
    // Add some diagnostic info in case we're having issues
    if (!document.querySelector('.data-stream') && 
        !document.querySelector('.tech-dashboard .data-stream')) {
        console.warn('Data stream container not found - visualizations may not appear');
    }
});