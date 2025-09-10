// Three.js 3D Body Model Setup
class BodyModel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.bodyMesh = null;
        this.animationId = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.currentRotationX = 0;
        this.currentRotationY = 0;
        
        this.init();
        this.animate();
        this.addEventListeners();
    }
    
    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf8fafc);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75, 
            this.container.clientWidth / this.container.clientHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 5;
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
        
        // Lighting
        this.setupLighting();
        
        // Create body model
        this.createBodyModel();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Point light for highlights
        const pointLight = new THREE.PointLight(0x3b82f6, 0.5, 100);
        pointLight.position.set(-5, 5, 5);
        this.scene.add(pointLight);
    }
    
    createBodyModel() {
        // Create a simplified human body using basic geometries
        const bodyGroup = new THREE.Group();
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const headMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            shininess: 100
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.2;
        head.castShadow = true;
        bodyGroup.add(head);
        
        // Torso
        const torsoGeometry = new THREE.CylinderGeometry(0.4, 0.5, 1.2, 32);
        const torsoMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            shininess: 100
        });
        const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
        torso.position.y = 0.2;
        torso.castShadow = true;
        bodyGroup.add(torso);
        
        // Arms
        const armGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.8, 16);
        const armMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            shininess: 100
        });
        
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.6, 0.2, 0);
        leftArm.rotation.z = 0.3;
        leftArm.castShadow = true;
        bodyGroup.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(0.6, 0.2, 0);
        rightArm.rotation.z = -0.3;
        rightArm.castShadow = true;
        bodyGroup.add(rightArm);
        
        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.2, 0.25, 1.0, 16);
        const legMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            shininess: 100
        });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.2, -0.8, 0);
        leftLeg.castShadow = true;
        bodyGroup.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.2, -0.8, 0);
        rightLeg.castShadow = true;
        bodyGroup.add(rightLeg);
        
        // Add some medical visualization elements
        this.addMedicalElements(bodyGroup);
        
        this.bodyMesh = bodyGroup;
        this.scene.add(this.bodyMesh);
    }
    
    addMedicalElements(bodyGroup) {
        // Add some glowing points to represent vital organs
        const organPositions = [
            { x: 0, y: 0.8, z: 0.3 }, // Heart
            { x: -0.3, y: 0.6, z: 0.2 }, // Left lung
            { x: 0.3, y: 0.6, z: 0.2 }, // Right lung
            { x: 0, y: 0.2, z: 0.4 }, // Liver
            { x: 0, y: -0.2, z: 0.3 }, // Stomach
        ];
        
        organPositions.forEach((pos, index) => {
            const organGeometry = new THREE.SphereGeometry(0.08, 16, 16);
            const organMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x3b82f6,
                transparent: true,
                opacity: 0.8
            });
            const organ = new THREE.Mesh(organGeometry, organMaterial);
            organ.position.set(pos.x, pos.y, pos.z);
            bodyGroup.add(organ);
            
            // Add pulsing animation
            this.animateOrgan(organ, index);
        });
    }
    
    animateOrgan(organ, index) {
        const animate = () => {
            const time = Date.now() * 0.001;
            const scale = 1 + Math.sin(time * 2 + index) * 0.2;
            organ.scale.setScalar(scale);
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    addEventListeners() {
        // Mouse movement for rotation
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.mouseX = (event.clientX - rect.left) / rect.width;
            this.mouseY = (event.clientY - rect.top) / rect.height;
            
            this.targetRotationY = (this.mouseX - 0.5) * 0.5;
            this.targetRotationX = (this.mouseY - 0.5) * 0.3;
        });
        
        // Touch events for mobile
        this.container.addEventListener('touchmove', (event) => {
            event.preventDefault();
            const rect = this.container.getBoundingClientRect();
            const touch = event.touches[0];
            this.mouseX = (touch.clientX - rect.left) / rect.width;
            this.mouseY = (touch.clientY - rect.top) / rect.height;
            
            this.targetRotationY = (this.mouseX - 0.5) * 0.5;
            this.targetRotationX = (this.mouseY - 0.5) * 0.3;
        });
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Smooth rotation interpolation
        this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.05;
        this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;
        
        if (this.bodyMesh) {
            this.bodyMesh.rotation.x = this.currentRotationX;
            this.bodyMesh.rotation.y = this.currentRotationY;
            this.bodyMesh.rotation.z += 0.002; // Subtle continuous rotation
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Feature card animations
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Enhanced Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('impact-card') || 
                    entry.target.classList.contains('tech-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    // Observe all scroll animation elements
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// CTA button interactions
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple effect CSS
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .cta-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced shimmer effect for hero section
function initShimmerEffect() {
    const shimmerElements = document.querySelectorAll('.shimmer-effect');
    shimmerElements.forEach(element => {
        element.classList.add('animate-shimmer');
    });
}

// Enhanced particle system
function initParticleSystem() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    // Create floating particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            pointer-events: none;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Enhanced counter animation for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent;
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Enhanced loading animation
function initLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// Enhanced hover effects for interactive elements
function initEnhancedHoverEffects() {
    // Add magnetic effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            card.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Add tilt effect to tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            item.style.transform = `perspective(1000px) rotateX(${y * 0.1}deg) rotateY(${x * 0.1}deg) scale(1.05)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Interactive Demo Sandbox Class
class InteractiveDemo {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.bodyGroup = null;
        this.animationId = null;
        this.currentCondition = 'normal';
        this.rotationX = 0;
        this.rotationY = 0;
        this.zoom = 1;
        
        this.conditionData = {
            normal: {
                bodyFat: 15,
                muscleMass: 50,
                bloodPressure: 120,
                heartRate: 72,
                bodyTemp: 98.6,
                description: 'Healthy individual with normal body composition and vital signs.',
                color: 0x4ade80
            },
            obesity: {
                bodyFat: 35,
                muscleMass: 40,
                bloodPressure: 140,
                heartRate: 85,
                bodyTemp: 99.1,
                description: 'Individual with obesity showing increased body fat percentage and elevated vital signs.',
                color: 0xf59e0b
            },
            anemia: {
                bodyFat: 12,
                muscleMass: 45,
                bloodPressure: 100,
                heartRate: 95,
                bodyTemp: 97.8,
                description: 'Individual with anemia showing reduced oxygen-carrying capacity and compensatory heart rate increase.',
                color: 0xef4444
            },
            diabetes: {
                bodyFat: 25,
                muscleMass: 45,
                bloodPressure: 130,
                heartRate: 78,
                bodyTemp: 98.9,
                description: 'Individual with diabetes showing metabolic changes and elevated blood pressure.',
                color: 0x8b5cf6
            },
            hypertension: {
                bodyFat: 20,
                muscleMass: 48,
                bloodPressure: 160,
                heartRate: 88,
                bodyTemp: 99.0,
                description: 'Individual with hypertension showing elevated blood pressure and increased heart rate.',
                color: 0xdc2626
            },
            asthma: {
                bodyFat: 18,
                muscleMass: 47,
                bloodPressure: 115,
                heartRate: 82,
                bodyTemp: 98.7,
                description: 'Individual with asthma showing respiratory system changes and slightly elevated heart rate.',
                color: 0x06b6d4
            }
        };
        
        this.init();
        this.animate();
        this.addEventListeners();
    }
    
    init() {
        // Wait for container to be available
        if (!this.container) {
            console.error('Interactive demo container not found');
            return;
        }
        
        // Show fallback model initially
        const fallback = document.getElementById('model-fallback');
        if (fallback) {
            fallback.style.display = 'flex';
        }
        
        try {
            // Scene setup
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0xf8fafc);
            
            // Get container dimensions
            const rect = this.container.getBoundingClientRect();
            const width = rect.width || 400;
            const height = rect.height || 500;
            
            // Camera setup
            this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            this.camera.position.z = 5;
            
            // Renderer setup
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance"
            });
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            
            // Add renderer to container (don't clear existing content)
            this.container.appendChild(this.renderer.domElement);
            
            // Ensure canvas is visible
            this.renderer.domElement.style.position = 'absolute';
            this.renderer.domElement.style.top = '0';
            this.renderer.domElement.style.left = '0';
            this.renderer.domElement.style.zIndex = '1';
            this.renderer.domElement.style.width = '100%';
            this.renderer.domElement.style.height = '100%';
            this.renderer.domElement.style.borderRadius = '16px';
            
            // Lighting
            this.setupLighting();
            
            // Create interactive body model
            this.createInteractiveBodyModel();
            
            // Hide fallback and show 3D model
            if (fallback) {
                fallback.style.display = 'none';
            }
            
            // Handle window resize
            window.addEventListener('resize', () => this.onWindowResize());
            
            console.log('Interactive demo initialized successfully');
        } catch (error) {
            console.error('Failed to initialize 3D model:', error);
            // Keep fallback model visible
        }
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        
        // Point light for highlights
        const pointLight = new THREE.PointLight(0x3b82f6, 0.5, 100);
        pointLight.position.set(-5, 5, 5);
        this.scene.add(pointLight);
    }
    
    createInteractiveBodyModel() {
        this.bodyGroup = new THREE.Group();
        
        // Create body parts with different materials
        this.createBodyParts();
        
        // Add condition indicators
        this.addConditionIndicators();
        
        this.scene.add(this.bodyGroup);
        
        // Frame the model in view
        const box = new THREE.Box3().setFromObject(this.bodyGroup);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        this.bodyGroup.position.sub(center); // center at origin
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = this.camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / Math.tan(fov / 2)) * 1.2;
        this.camera.position.z = cameraZ;
        this.camera.lookAt(0, 0, 0);
        this.camera.updateProjectionMatrix();

        // Force a render to make sure everything is visible
        this.renderer.render(this.scene, this.camera);
        
        console.log('Body model created with', this.bodyGroup.children.length, 'parts');
    }
    
    createBodyParts() {
        // Create a more detailed and transparent human body model
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.35, 32, 32);
        const headMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.3;
        head.castShadow = true;
        head.userData = { part: 'head' };
        this.bodyGroup.add(head);
        
        // Neck
        const neckGeometry = new THREE.CylinderGeometry(0.12, 0.15, 0.3, 16);
        const neckMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        const neck = new THREE.Mesh(neckGeometry, neckMaterial);
        neck.position.y = 1.0;
        neck.castShadow = true;
        neck.userData = { part: 'neck' };
        this.bodyGroup.add(neck);
        
        // Torso (more detailed)
        const torsoGeometry = new THREE.CylinderGeometry(0.45, 0.55, 1.4, 32);
        const torsoMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
        torso.position.y = 0.1;
        torso.castShadow = true;
        torso.userData = { part: 'torso' };
        this.bodyGroup.add(torso);
        
        // Chest area (more defined)
        const chestGeometry = new THREE.CylinderGeometry(0.4, 0.45, 0.6, 32);
        const chestMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.6,
            shininess: 120
        });
        const chest = new THREE.Mesh(chestGeometry, chestMaterial);
        chest.position.y = 0.5;
        chest.castShadow = true;
        chest.userData = { part: 'chest' };
        this.bodyGroup.add(chest);
        
        // Shoulders
        const shoulderGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const shoulderMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        
        const leftShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
        leftShoulder.position.set(-0.5, 0.8, 0);
        leftShoulder.castShadow = true;
        leftShoulder.userData = { part: 'leftShoulder' };
        this.bodyGroup.add(leftShoulder);
        
        const rightShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
        rightShoulder.position.set(0.5, 0.8, 0);
        rightShoulder.castShadow = true;
        rightShoulder.userData = { part: 'rightShoulder' };
        this.bodyGroup.add(rightShoulder);
        
        // Upper Arms
        const upperArmGeometry = new THREE.CylinderGeometry(0.12, 0.15, 0.6, 16);
        const upperArmMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        
        const leftUpperArm = new THREE.Mesh(upperArmGeometry, upperArmMaterial);
        leftUpperArm.position.set(-0.7, 0.4, 0);
        leftUpperArm.rotation.z = 0.3;
        leftUpperArm.castShadow = true;
        leftUpperArm.userData = { part: 'leftUpperArm' };
        this.bodyGroup.add(leftUpperArm);
        
        const rightUpperArm = new THREE.Mesh(upperArmGeometry, upperArmMaterial);
        rightUpperArm.position.set(0.7, 0.4, 0);
        rightUpperArm.rotation.z = -0.3;
        rightUpperArm.castShadow = true;
        rightUpperArm.userData = { part: 'rightUpperArm' };
        this.bodyGroup.add(rightUpperArm);
        
        // Forearms
        const forearmGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.5, 16);
        const forearmMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        
        const leftForearm = new THREE.Mesh(forearmGeometry, forearmMaterial);
        leftForearm.position.set(-0.9, 0.0, 0);
        leftForearm.rotation.z = 0.2;
        leftForearm.castShadow = true;
        leftForearm.userData = { part: 'leftForearm' };
        this.bodyGroup.add(leftForearm);
        
        const rightForearm = new THREE.Mesh(forearmGeometry, forearmMaterial);
        rightForearm.position.set(0.9, 0.0, 0);
        rightForearm.rotation.z = -0.2;
        rightForearm.castShadow = true;
        rightForearm.userData = { part: 'rightForearm' };
        this.bodyGroup.add(rightForearm);
        
        // Hands
        const handGeometry = new THREE.SphereGeometry(0.08, 12, 12);
        const handMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        
        const leftHand = new THREE.Mesh(handGeometry, handMaterial);
        leftHand.position.set(-1.0, -0.1, 0);
        leftHand.castShadow = true;
        leftHand.userData = { part: 'leftHand' };
        this.bodyGroup.add(leftHand);
        
        const rightHand = new THREE.Mesh(handGeometry, handMaterial);
        rightHand.position.set(1.0, -0.1, 0);
        rightHand.castShadow = true;
        rightHand.userData = { part: 'rightHand' };
        this.bodyGroup.add(rightHand);
        
        // Hips
        const hipGeometry = new THREE.CylinderGeometry(0.3, 0.35, 0.4, 32);
        const hipMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        const hips = new THREE.Mesh(hipGeometry, hipMaterial);
        hips.position.y = -0.4;
        hips.castShadow = true;
        hips.userData = { part: 'hips' };
        this.bodyGroup.add(hips);
        
        // Thighs
        const thighGeometry = new THREE.CylinderGeometry(0.18, 0.22, 0.8, 16);
        const thighMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        
        const leftThigh = new THREE.Mesh(thighGeometry, thighMaterial);
        leftThigh.position.set(-0.15, -0.9, 0);
        leftThigh.castShadow = true;
        leftThigh.userData = { part: 'leftThigh' };
        this.bodyGroup.add(leftThigh);
        
        const rightThigh = new THREE.Mesh(thighGeometry, thighMaterial);
        rightThigh.position.set(0.15, -0.9, 0);
        rightThigh.castShadow = true;
        rightThigh.userData = { part: 'rightThigh' };
        this.bodyGroup.add(rightThigh);
        
        // Calves
        const calfGeometry = new THREE.CylinderGeometry(0.12, 0.15, 0.7, 16);
        const calfMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        
        const leftCalf = new THREE.Mesh(calfGeometry, calfMaterial);
        leftCalf.position.set(-0.15, -1.4, 0);
        leftCalf.castShadow = true;
        leftCalf.userData = { part: 'leftCalf' };
        this.bodyGroup.add(leftCalf);
        
        const rightCalf = new THREE.Mesh(calfGeometry, calfMaterial);
        rightCalf.position.set(0.15, -1.4, 0);
        rightCalf.castShadow = true;
        rightCalf.userData = { part: 'rightCalf' };
        this.bodyGroup.add(rightCalf);
        
        // Feet
        const footGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.4);
        const footMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffdbac,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        
        const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
        leftFoot.position.set(-0.15, -1.8, 0.1);
        leftFoot.castShadow = true;
        leftFoot.userData = { part: 'leftFoot' };
        this.bodyGroup.add(leftFoot);
        
        const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
        rightFoot.position.set(0.15, -1.8, 0.1);
        rightFoot.castShadow = true;
        rightFoot.userData = { part: 'rightFoot' };
        this.bodyGroup.add(rightFoot);
        
        // Add internal organs (semi-transparent)
        this.addInternalOrgans();
    }
    
    addInternalOrgans() {
        // Heart
        const heartGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const heartMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.6
        });
        const heart = new THREE.Mesh(heartGeometry, heartMaterial);
        heart.position.set(0, 0.8, 0.3);
        heart.userData = { organ: 'heart' };
        this.bodyGroup.add(heart);
        
        // Lungs
        const lungGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const lungMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x87ceeb,
            transparent: true,
            opacity: 0.5
        });
        
        const leftLung = new THREE.Mesh(lungGeometry, lungMaterial);
        leftLung.position.set(-0.3, 0.6, 0.2);
        leftLung.scale.set(0.8, 1.2, 0.6);
        leftLung.userData = { organ: 'leftLung' };
        this.bodyGroup.add(leftLung);
        
        const rightLung = new THREE.Mesh(lungGeometry, lungMaterial);
        rightLung.position.set(0.3, 0.6, 0.2);
        rightLung.scale.set(0.8, 1.2, 0.6);
        rightLung.userData = { organ: 'rightLung' };
        this.bodyGroup.add(rightLung);
        
        // Liver
        const liverGeometry = new THREE.SphereGeometry(0.25, 16, 16);
        const liverMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x90ee90,
            transparent: true,
            opacity: 0.5
        });
        const liver = new THREE.Mesh(liverGeometry, liverMaterial);
        liver.position.set(0, 0.2, 0.4);
        liver.scale.set(1.2, 0.8, 0.6);
        liver.userData = { organ: 'liver' };
        this.bodyGroup.add(liver);
        
        // Stomach
        const stomachGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const stomachMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffd700,
            transparent: true,
            opacity: 0.5
        });
        const stomach = new THREE.Mesh(stomachGeometry, stomachMaterial);
        stomach.position.set(0, -0.2, 0.3);
        stomach.scale.set(1.0, 0.8, 0.8);
        stomach.userData = { organ: 'stomach' };
        this.bodyGroup.add(stomach);
        
        // Kidneys
        const kidneyGeometry = new THREE.SphereGeometry(0.1, 12, 12);
        const kidneyMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x9370db,
            transparent: true,
            opacity: 0.6
        });
        
        const leftKidney = new THREE.Mesh(kidneyGeometry, kidneyMaterial);
        leftKidney.position.set(-0.4, -0.1, 0.2);
        leftKidney.scale.set(0.8, 1.2, 0.6);
        leftKidney.userData = { organ: 'leftKidney' };
        this.bodyGroup.add(leftKidney);
        
        const rightKidney = new THREE.Mesh(kidneyGeometry, kidneyMaterial);
        rightKidney.position.set(0.4, -0.1, 0.2);
        rightKidney.scale.set(0.8, 1.2, 0.6);
        rightKidney.userData = { organ: 'rightKidney' };
        this.bodyGroup.add(rightKidney);
    }
    
    addConditionIndicators() {
        // Add glowing indicators for different conditions
        const indicatorPositions = [
            { x: 0, y: 0.8, z: 0.3 }, // Heart
            { x: -0.3, y: 0.6, z: 0.2 }, // Left lung
            { x: 0.3, y: 0.6, z: 0.2 }, // Right lung
            { x: 0, y: 0.2, z: 0.4 }, // Liver
            { x: 0, y: -0.2, z: 0.3 }, // Stomach
        ];
        
        this.indicators = [];
        indicatorPositions.forEach((pos, index) => {
            // Create a pulsing indicator
            const indicatorGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const indicatorMaterial = new THREE.MeshBasicMaterial({ 
                color: this.conditionData[this.currentCondition].color,
                transparent: true,
                opacity: 0.8
            });
            const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
            indicator.position.set(pos.x, pos.y, pos.z);
            indicator.userData = { index: index };
            
            // Add a glow effect
            const glowGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({ 
                color: this.conditionData[this.currentCondition].color,
                transparent: true,
                opacity: 0.3
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            glow.position.copy(indicator.position);
            glow.userData = { glow: true };
            
            this.bodyGroup.add(indicator);
            this.bodyGroup.add(glow);
            this.indicators.push({ indicator, glow });
        });
    }
    
    updateCondition(condition) {
        this.currentCondition = condition;
        const data = this.conditionData[condition];
        
        // Update body appearance based on condition
        this.bodyGroup.children.forEach(child => {
            if (child.userData.part) {
                // Scale body parts based on condition
                if (condition === 'obesity') {
                    child.scale.setScalar(1.2);
                } else if (condition === 'anemia') {
                    child.scale.setScalar(0.9);
                } else {
                    child.scale.setScalar(1.0);
                }
            }
        });
        
        // Update indicators
        this.indicators.forEach(indicatorGroup => {
            indicatorGroup.indicator.material.color.setHex(data.color);
            indicatorGroup.glow.material.color.setHex(data.color);
        });
        
        // Update UI
        this.updateUI(data);
    }
    
    updateUI(data) {
        document.getElementById('current-condition').textContent = this.currentCondition.charAt(0).toUpperCase() + this.currentCondition.slice(1);
        document.getElementById('condition-description').textContent = data.description;
        document.getElementById('heart-rate').textContent = data.heartRate + ' BPM';
        document.getElementById('blood-pressure').textContent = data.bloodPressure + '/80';
        document.getElementById('body-temp').textContent = data.bodyTemp + '°F';
        
        // Update sliders
        document.getElementById('body-fat-slider').value = data.bodyFat;
        document.getElementById('muscle-mass-slider').value = data.muscleMass;
        document.getElementById('blood-pressure-slider').value = data.bloodPressure;
        
        // Update slider values
        document.querySelector('#body-fat-slider').nextElementSibling.textContent = data.bodyFat + '%';
        document.querySelector('#muscle-mass-slider').nextElementSibling.textContent = data.muscleMass + '%';
        document.querySelector('#blood-pressure-slider').nextElementSibling.textContent = data.bloodPressure + ' mmHg';
    }
    
    addEventListeners() {
        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateCondition(btn.dataset.condition);
            });
        });
        
        // Rotation controls
        document.getElementById('rotate-left').addEventListener('click', () => {
            this.rotationY += 0.5;
        });
        
        document.getElementById('rotate-right').addEventListener('click', () => {
            this.rotationY -= 0.5;
        });
        
        document.getElementById('reset-rotation').addEventListener('click', () => {
            this.rotationX = 0;
            this.rotationY = 0;
        });
        
        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', () => {
            this.zoom = Math.min(this.zoom * 1.2, 3);
        });
        
        document.getElementById('zoom-out').addEventListener('click', () => {
            this.zoom = Math.max(this.zoom / 1.2, 0.5);
        });
        
        // Slider controls
        document.getElementById('body-fat-slider').addEventListener('input', (e) => {
            const value = e.target.value;
            e.target.nextElementSibling.textContent = value + '%';
            // Update body appearance based on body fat
            this.updateBodyFat(parseInt(value));
        });
        
        document.getElementById('muscle-mass-slider').addEventListener('input', (e) => {
            const value = e.target.value;
            e.target.nextElementSibling.textContent = value + '%';
            // Update body appearance based on muscle mass
            this.updateMuscleMass(parseInt(value));
        });
        
        document.getElementById('blood-pressure-slider').addEventListener('input', (e) => {
            const value = e.target.value;
            e.target.nextElementSibling.textContent = value + ' mmHg';
            document.getElementById('blood-pressure').textContent = value + '/80';
        });
    }
    
    updateBodyFat(value) {
        // Scale body based on body fat percentage
        const scale = 0.8 + (value / 50) * 0.4; // Scale from 0.8 to 1.2
        this.bodyGroup.children.forEach(child => {
            if (child.userData.part) {
                child.scale.y = scale;
                child.scale.x = scale;
            }
        });
    }
    
    updateMuscleMass(value) {
        // Adjust muscle definition based on muscle mass
        const intensity = value / 80; // Normalize to 0-1
        this.bodyGroup.children.forEach(child => {
            if (child.userData.part && (child.userData.part.includes('Arm') || child.userData.part.includes('Leg'))) {
                child.material.shininess = 50 + intensity * 100;
            }
        });
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Apply rotation
        this.bodyGroup.rotation.x = this.rotationX;
        this.bodyGroup.rotation.y = this.rotationY;
        
        // Apply zoom (respect framing distance)
        this.camera.position.z = this.camera.position.z / this.zoom;
        
        // Animate indicators and glow effects
        this.indicators.forEach((indicatorGroup, index) => {
            const time = Date.now() * 0.001;
            const scale = 1 + Math.sin(time * 2 + index) * 0.2;
            const glowScale = 1 + Math.sin(time * 1.5 + index) * 0.3;
            
            indicatorGroup.indicator.scale.setScalar(scale);
            indicatorGroup.glow.scale.setScalar(glowScale);
        });
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Scroll to demo function
function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 2D Interactive Demo (SVG)
class InteractiveDemo2D {
    constructor(svgId) {
        this.svg = document.getElementById(svgId);
        this.root = this.svg ? this.svg.querySelector('#model-root') : null;
        this.organs = this.svg ? {
            heart: this.svg.querySelector('#heart'),
            lungLeft: this.svg.querySelector('#lungLeft'),
            lungRight: this.svg.querySelector('#lungRight'),
            liver: this.svg.querySelector('#liver'),
            stomach: this.svg.querySelector('#stomach'),
            pancreas: this.svg.querySelector('#pancreas'),
        } : {};
        this.currentCondition = 'normal';
        this.zoom = 1;
        this.rotation = 0;
        this.conditionData = {
            normal: { heart: 72, bp: '120/80', temp: '98.6°F', color: '#34d399', desc: 'Healthy state.' },
            obesity: { heart: 85, bp: '140/90', temp: '99.1°F', color: '#f59e0b', desc: 'Higher fat distribution.' },
            anemia: { heart: 95, bp: '100/80', temp: '97.8°F', color: '#ef4444', desc: 'Low oxygen capacity.' },
            diabetes: { heart: 78, bp: '130/85', temp: '98.9°F', color: '#8b5cf6', desc: 'Metabolic changes.' },
            hypertension: { heart: 88, bp: '160/100', temp: '99.0°F', color: '#dc2626', desc: 'Elevated blood pressure.' },
            asthma: { heart: 82, bp: '115/80', temp: '98.7°F', color: '#06b6d4', desc: 'Respiratory impact.' },
        };
        if (this.svg) {
            this.bindUI();
            this.applyCondition('normal');
            this.attachTooltips();
        }
    }
    bindUI() {
        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.applyCondition(btn.dataset.condition);
            });
        });
        // Rotate and zoom
        const rotateLeft = document.getElementById('rotate-left');
        const rotateRight = document.getElementById('rotate-right');
        const resetRotation = document.getElementById('reset-rotation');
        const zoomIn = document.getElementById('zoom-in');
        const zoomOut = document.getElementById('zoom-out');
        if (rotateLeft) rotateLeft.addEventListener('click', () => this.rotate(-5));
        if (rotateRight) rotateRight.addEventListener('click', () => this.rotate(5));
        if (resetRotation) resetRotation.addEventListener('click', () => this.resetView());
        if (zoomIn) zoomIn.addEventListener('click', () => this.setZoom(this.zoom * 1.1));
        if (zoomOut) zoomOut.addEventListener('click', () => this.setZoom(this.zoom / 1.1));
        // Sliders
        const setValueText = (input, text) => {
            const span = input?.parentElement?.querySelector('.slider-value');
            if (span) span.textContent = text;
        };
        const fat = document.getElementById('body-fat-slider');
        if (fat) {
            setValueText(fat, `${fat.value}%`);
            fat.addEventListener('input', e => { this.updateFat(parseInt(e.target.value)); setValueText(e.target, `${e.target.value}%`); });
        }
        const muscle = document.getElementById('muscle-mass-slider');
        if (muscle) {
            setValueText(muscle, `${muscle.value}%`);
            muscle.addEventListener('input', e => { this.updateMuscle(parseInt(e.target.value)); setValueText(e.target, `${e.target.value}%`); });
        }
        const bp = document.getElementById('blood-pressure-slider');
        if (bp) {
            setValueText(bp, `${bp.value} mmHg`);
            bp.addEventListener('input', e => { this.updateBP(parseInt(e.target.value)); setValueText(e.target, `${e.target.value} mmHg`); });
        }
        // Drag to rotate
        let dragging = false, startX = 0;
        this.svg.addEventListener('mousedown', e => { dragging = true; startX = e.clientX; });
        window.addEventListener('mouseup', () => dragging = false);
        window.addEventListener('mousemove', e => { if (dragging) this.rotate((e.clientX - startX) * 0.1); startX = e.clientX; });
        // Pinch/scroll zoom
        this.svg.addEventListener('wheel', e => { e.preventDefault(); this.setZoom(this.zoom * (e.deltaY > 0 ? 0.95 : 1.05)); });
    }
    applyCondition(key) {
        this.currentCondition = key;
        const data = this.conditionData[key];
        // Color accent on organs
        Object.values(this.organs).forEach(el => { if (el) el.setAttribute('opacity', el.id === 'heart' ? '0.85' : '0.55'); });
        if (this.organs.heart) this.organs.heart.setAttribute('fill', data.color);
        // Pulse animation intensity by condition
        const bpm = data.heart;
        this.pulseHeart(bpm);
        // Vital labels
        const hr = document.getElementById('heart-rate');
        const bp = document.getElementById('blood-pressure');
        const temp = document.getElementById('body-temp');
        if (hr) hr.textContent = data.heart + ' BPM';
        if (bp) bp.textContent = data.bp;
        if (temp) temp.textContent = data.temp;
        const cond = document.getElementById('current-condition');
        const desc = document.getElementById('condition-description');
        if (cond) cond.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        if (desc) desc.textContent = data.desc;
    }
    pulseHeart(bpm) {
        const heart = this.organs.heart;
        if (!heart) return;
        const period = 60000 / Math.max(40, Math.min(160, bpm)); // ms per beat
        heart.style.transition = 'transform 0.12s ease';
        clearInterval(this._pulseTimer);
        this._pulseTimer = setInterval(() => {
            heart.style.transform = 'scale(1.12)';
            setTimeout(() => { heart.style.transform = 'scale(1)'; }, 120);
        }, period);
    }
    rotate(delta) {
        this.rotation = (this.rotation + delta) % 360;
        if (this.root) this.root.setAttribute('transform', `rotate(${this.rotation}) scale(${this.zoom})`);
    }
    setZoom(z) {
        this.zoom = Math.max(0.7, Math.min(2.5, z));
        if (this.root) this.root.setAttribute('transform', `rotate(${this.rotation}) scale(${this.zoom})`);
    }
    resetView() { this.rotation = 0; this.zoom = 1; if (this.root) this.root.setAttribute('transform', ''); }
    updateFat(val) {
        // Expand torso/hips to simulate fat percentage
        const torso = this.svg.querySelector('#torso');
        const hips = this.svg.querySelector('#hips');
        if (torso) torso.setAttribute('width', String(90 + (val - 15) * 1.0));
        if (torso) torso.setAttribute('x', String(-0.5 * (90 + (val - 15) * 1.0)));
        if (hips) hips.setAttribute('width', String(80 + (val - 15) * 0.8));
        if (hips) hips.setAttribute('x', String(-0.5 * (80 + (val - 15) * 0.8)));
    }
    updateMuscle(val) {
        // Slightly increase arm/leg thickness
        const armLeft = this.svg.querySelector('#armLeft');
        const armRight = this.svg.querySelector('#armRight');
        const legLeft = this.svg.querySelector('#legLeft');
        const legRight = this.svg.querySelector('#legRight');
        const armW = 24 + (val - 50) * 0.2;
        const legW = 24 + (val - 50) * 0.2;
        if (armLeft) armLeft.setAttribute('width', String(armW));
        if (armRight) armRight.setAttribute('width', String(armW));
        if (legLeft) legLeft.setAttribute('width', String(legW));
        if (legRight) legRight.setAttribute('width', String(legW));
    }
    updateBP(val) {
        const label = document.getElementById('blood-pressure');
        if (label) label.textContent = `${val}/80`;
    }
    // Tooltips
    attachTooltips() {
        const container = document.querySelector('.interactive-model-container');
        if (!container) return;
        const tooltip = document.createElement('div');
        tooltip.className = 'organ-tooltip';
        tooltip.style.display = 'none';
        container.appendChild(tooltip);
        const showTip = (e, name, info) => {
            tooltip.innerHTML = `<strong>${name}</strong><div style="opacity:.85">${info}</div>`;
            const pt = this.svg.createSVGPoint();
            pt.x = e.clientX; pt.y = e.clientY;
            const loc = pt.matrixTransform(this.svg.getScreenCTM().inverse());
            tooltip.style.left = `${e.clientX - container.getBoundingClientRect().left}px`;
            tooltip.style.top = `${e.clientY - container.getBoundingClientRect().top - 12}px`;
            tooltip.style.display = 'block';
        };
        const hideTip = () => { tooltip.style.display = 'none'; };
        this.svg.querySelectorAll('.organ').forEach(el => {
            el.addEventListener('mousemove', (e) => showTip(e, el.dataset.name, el.dataset.info));
            el.addEventListener('mouseleave', hideTip);
            el.addEventListener('click', (e) => showTip(e, el.dataset.name, el.dataset.info));
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded. Please check the CDN link.');
        return;
    }
    
    // Initialize 2D demo immediately
    if (document.getElementById('body-2d')) {
        new InteractiveDemo2D('body-2d');
    }
    
    // (Optional) Initialize 3D body model if present in hero
    if (document.getElementById('body-canvas') && typeof THREE !== 'undefined') {
        new BodyModel('body-canvas');
    }
    
    // Initialize all other features
    initSmoothScrolling();
    initFeatureCards();
    initScrollAnimations();
    initNavbarScroll();
    initCTAButtons();
    addRippleStyles();
    initShimmerEffect();
    initParticleSystem();
    initCounterAnimations();
    initLoadingAnimation();
    initEnhancedHoverEffects();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Trigger any resize-dependent functions here
    }, 250);
});

// Add some interactive particle effects
function createParticleEffect() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particle effects
createParticleEffect();
