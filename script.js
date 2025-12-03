// WhatsApp Group Link
const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/CMVS4Jjc5xP6UAL9SMgfJS';

// Get form elements
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Validate form
    if (!name || !email || !phone) {
        alert('Sila lengkapkan semua maklumat!');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak sah!');
        return;
    }
    
    // Show loading state
    showLoading();
    
    // Store data in localStorage (optional - for record keeping)
    storeUserData(name, email, phone);
    
    // Simulate processing time
    setTimeout(() => {
        // Show success message
        showSuccessMessage(name);
        
        // Redirect to WhatsApp group after 2 seconds
        setTimeout(() => {
            redirectToWhatsApp();
        }, 2000);
    }, 1000);
});

// Show loading state
function showLoading() {
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
}

// Hide loading state
function hideLoading() {
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
}

// Store user data
function storeUserData(name, email, phone) {
    const userData = {
        name: name,
        email: email,
        phone: phone,
        timestamp: new Date().toISOString()
    };
    
    // Get existing data
    let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    
    // Add new registration
    registrations.push(userData);
    
    // Store back to localStorage
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    console.log('User registered:', userData);
}

// Show success message
function showSuccessMessage(name) {
    hideLoading();
    
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Create success message
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        padding: 3rem;
        border-radius: 1.5rem;
        text-align: center;
        max-width: 500px;
        margin: 1rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: slideUp 0.4s ease-out;
    `;
    
    messageBox.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
        <h2 style="color: white; font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem;">Tahniah ${name}!</h2>
        <p style="color: rgba(255, 255, 255, 0.95); font-size: 1.1rem; margin-bottom: 1rem;">Pendaftaran anda berjaya!</p>
        <p style="color: rgba(255, 255, 255, 0.9); font-size: 1rem;">Anda akan dibawa ke WhatsApp group sebentar lagi...</p>
    `;
    
    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);
    
    // Add animations to document
    if (!document.getElementById('dynamicAnimations')) {
        const style = document.createElement('style');
        style.id = 'dynamicAnimations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Redirect to WhatsApp
function redirectToWhatsApp() {
    window.location.href = WHATSAPP_GROUP_URL;
}

// Add input animations
const inputs = document.querySelectorAll('.form-group input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.25s ease-in-out';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Add smooth scroll behavior for anchor links
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

// Add entrance animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe benefit cards for animation
document.querySelectorAll('.benefit-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Format: 01X-XXXX XXXX
    if (value.length > 0) {
        if (value.length <= 3) {
            e.target.value = value;
        } else if (value.length <= 7) {
            e.target.value = value.slice(0, 3) + '-' + value.slice(3);
        } else {
            e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7) + ' ' + value.slice(7, 11);
        }
    }
});

// Console welcome message
console.log('%c🎉 Welcome to MLM Platform! 🎉', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cBuilt with ❤️ for your success', 'font-size: 14px; color: #764ba2;');
