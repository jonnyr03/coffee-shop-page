// Coffee Farm Website - Main JavaScript
// Comprehensive functionality for subscription system, animations, and interactions

// Global variables
let currentStep = 1;
let subscriptionData = {
    plan: '',
    price: 0,
    coffee: '',
    grind: ''
};

let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];

// Coffee database with comprehensive information
const coffeeDatabase = {
    copan: {
        name: 'Copán',
        region: 'Copán',
        altitude: '1000-1600m',
        process: 'Washed',
        notes: ['Chocolate', 'Citrus', 'Caramel'],
        price: 24,
        description: 'Rich chocolate notes with bright citrus finish from high-altitude farms.',
        image: 'https://www.shutterstock.com/image-photo/coffee-tree-fresh-arabica-bean-600nw-2252798877.jpg'
    },
    intibuca: {
        name: 'Intibuca',
        region: 'Intibuca',
        altitude: '1200-1700m',
        process: 'Honey',
        notes: ['Orange', 'Peach', 'Floral'],
        price: 26,
        description: 'Delicate orange acidity with velvety body and peach flavors.',
        image: 'https://www.shutterstock.com/image-photo/coffee-tree-fresh-arabica-bean-600nw-2252798877.jpg'
    },
    ocotepeque: {
        name: 'Ocotepeque',
        region: 'Ocotepeque',
        altitude: '1200-1750m',
        process: 'Natural',
        notes: ['Tropical Fruits', 'Wine', 'Blackberry'],
        price: 28,
        description: 'Complex tropical fruits with wine-like profile and elegant finish.',
        image: 'https://www.shutterstock.com/image-photo/coffee-tree-fresh-arabica-bean-600nw-2252798877.jpg'
    },
    santabarbara: {
        name: 'Santa Barbara',
        region: 'Santa Barbara',
        altitude: '1100-1500m',
        process: 'Washed',
        notes: ['Caramel', 'Balanced', 'Milk Chocolate'],
        price: 25,
        description: 'Balanced acidity with medium body and caramel sweetness.',
        image: 'https://www.shutterstock.com/image-photo/coffee-tree-fresh-arabica-bean-600nw-2252798877.jpg'
    },
    comayagua: {
        name: 'Comayagua',
        region: 'Comayagua',
        altitude: '1000-1500m',
        process: 'Honey',
        notes: ['Tropical Fruit', 'Caramel', 'Nuts'],
        price: 23,
        description: 'Tropical fruit sweetness with well-balanced acidity.',
        image: 'https://www.shutterstock.com/image-photo/coffee-tree-fresh-arabica-bean-600nw-2252798877.jpg'
    },
    elparaiso: {
        name: 'El Paraíso',
        region: 'El Paraíso',
        altitude: '1000-1400m',
        process: 'Washed',
        notes: ['Brown Sugar', 'Nuts', 'Citrus'],
        price: 22,
        description: 'Sweet brown sugar notes with mild acidity and medium body.',
        image: 'https://www.shutterstock.com/image-photo/coffee-tree-fresh-arabica-bean-600nw-2252798877.jpg'
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCarousel();
    initializeParticles();
    initializeScrollAnimations();
    initializeCounters();
    initializeSubscriptionModal();
    initializeSmoothScrolling();
    initializeCart();
});

// Animation initialization
function initializeAnimations() {
    // Typewriter effect for hero text
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Honduran Coffee',
                'Mountain Grown',
                'Farm Fresh',
                'Direct Trade'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element, index) => {
        anime({
            targets: element,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: index * 100,
            duration: 600,
            easing: 'easeOutQuart'
        });
    });
}

// Initialize coffee carousel
function initializeCarousel() {
    if (document.getElementById('coffee-carousel')) {
        new Splide('#coffee-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                768: {
                    perPage: 1,
                },
                1024: {
                    perPage: 2,
                }
            }
        }).mount();
    }
}

// Floating coffee bean particles
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'coffee-bean';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
        
        // Animate particle falling
        anime({
            targets: particle,
            translateY: ['-100vh', '100vh'],
            translateX: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
            duration: Math.random() * 15000 + 10000,
            easing: 'linear',
            complete: function() {
                particle.remove();
                createParticle(); // Create new particle to maintain count
            }
        });
    }
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createParticle(), i * 1000);
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate counters when they come into view
                if (entry.target.hasAttribute('data-count')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Animated counters
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    
    anime({
        targets: { count: 0 },
        count: target,
        duration: duration,
        easing: 'easeOutQuart',
        update: function(anim) {
            element.textContent = Math.floor(anim.animatables[0].target.count).toLocaleString();
        }
    });
}

// Initialize counters separately for better control
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(counter);
    });
}

// Subscription modal functionality
function initializeSubscriptionModal() {
    // Plan selection
    document.querySelectorAll('.plan-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.plan-option').forEach(opt => {
                opt.classList.remove('border-caramel', 'bg-caramel/5');
                opt.classList.add('border-gray-200');
            });
            
            this.classList.remove('border-gray-200');
            this.classList.add('border-caramel', 'bg-caramel/5');
            
            subscriptionData.plan = this.dataset.plan;
            subscriptionData.price = parseInt(this.dataset.price);
        });
    });
    
    // Coffee selection
    document.querySelectorAll('.coffee-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.coffee-option').forEach(opt => {
                opt.classList.remove('border-caramel', 'bg-caramel/5');
                opt.classList.add('border-gray-200');
            });
            
            this.classList.remove('border-gray-200');
            this.classList.add('border-caramel', 'bg-caramel/5');
            
            subscriptionData.coffee = this.dataset.coffee;
        });
    });
    
    // Grind selection
    document.querySelectorAll('.grind-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.grind-option').forEach(opt => {
                opt.classList.remove('border-caramel', 'bg-caramel/5');
                opt.classList.add('border-gray-200');
            });
            
            this.classList.remove('border-gray-200');
            this.classList.add('border-caramel', 'bg-caramel/5');
            
            subscriptionData.grind = this.dataset.grind;
        });
    });
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Shopping cart functionality
function initializeCart() {
    updateCartDisplay();
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const coffeeId = this.dataset.coffee;
            const coffee = coffeeDatabase[coffeeId];
            
            if (coffee) {
                addToCart(coffeeId, coffee);
            }
        });
    });
}

function addToCart(coffeeId, coffee) {
    const existingItem = cart.find(item => item.id === coffeeId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: coffeeId,
            name: coffee.name,
            price: coffee.price,
            quantity: 1,
            image: coffee.image
        });
    }
    
    localStorage.setItem('coffeeCart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Added to cart!', 'success');
}

function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
        element.style.display = cartCount > 0 ? 'block' : 'none';
    });
}

// Modal functions
function openSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        currentStep = 1;
        showStep(1);
    }
}

function closeSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        resetSubscriptionForm();
    }
}

function resetSubscriptionForm() {
    currentStep = 1;
    subscriptionData = { plan: '', price: 0, coffee: '', grind: '' };
    
    // Reset all selections
    document.querySelectorAll('.plan-option, .coffee-option, .grind-option').forEach(option => {
        option.classList.remove('border-caramel', 'bg-caramel/5');
        option.classList.add('border-gray-200');
    });
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.subscription-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    
    // Show current step
    const currentStepEl = document.getElementById(`step${step}`);
    if (currentStepEl) {
        currentStepEl.classList.add('active');
    }
    
    // Update order summary if on step 4
    if (step === 4) {
        updateOrderSummary();
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            if (!subscriptionData.plan) {
                showNotification('Please select a subscription plan', 'error');
                return false;
            }
            break;
        case 2:
            if (!subscriptionData.coffee) {
                showNotification('Please select a coffee variety', 'error');
                return false;
            }
            break;
        case 3:
            if (!subscriptionData.grind) {
                showNotification('Please select a grind preference', 'error');
                return false;
            }
            break;
    }
    return true;
}

function updateOrderSummary() {
    const selectedPlanEl = document.getElementById('selectedPlan');
    const selectedCoffeeEl = document.getElementById('selectedCoffee');
    const selectedGrindEl = document.getElementById('selectedGrind');
    const totalPriceEl = document.getElementById('totalPrice');
    
    if (selectedPlanEl) selectedPlanEl.textContent = subscriptionData.plan.charAt(0).toUpperCase() + subscriptionData.plan.slice(1);
    if (selectedCoffeeEl) selectedCoffeeEl.textContent = coffeeDatabase[subscriptionData.coffee]?.name || '-';
    if (selectedGrindEl) selectedGrindEl.textContent = subscriptionData.grind.charAt(0).toUpperCase() + subscriptionData.grind.slice(1);
    if (totalPriceEl) totalPriceEl.textContent = `$${subscriptionData.price}/month`;
}

function completeSubscription() {
    // Simulate subscription completion
    showNotification('Subscription created successfully! Welcome to Café Montaña!', 'success');
    
    // Simulate email confirmation
    setTimeout(() => {
        showNotification('Confirmation email sent with your invoice and brewing guide!', 'info');
    }, 2000);
    
    closeSubscriptionModal();
    
    // Add to cart simulation
    if (subscriptionData.coffee && coffeeDatabase[subscriptionData.coffee]) {
        addToCart(subscriptionData.coffee, coffeeDatabase[subscriptionData.coffee]);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
    
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'info':
        default:
            notification.classList.add('bg-caramel', 'text-white');
            break;
    }
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Navigation highlight on scroll
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-caramel');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-caramel');
        }
    });
}

// Debounced scroll event listener
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(updateActiveNavigation, 10);
});

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

// Export functions for global access
window.openSubscriptionModal = openSubscriptionModal;
window.closeSubscriptionModal = closeSubscriptionModal;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.completeSubscription = completeSubscription;
window.toggleMobileMenu = toggleMobileMenu;
window.showNotification = showNotification;

// Initialize navigation highlighting
updateActiveNavigation();