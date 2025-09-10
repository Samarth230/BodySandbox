import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// React-compatible Body Sandbox Landing Page Component
const BodySandboxReact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const impactRef = useRef(null);
  const techRef = useRef(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Hero Section Component
  const HeroSection = () => (
    <motion.section 
      className="hero"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-particles"></div>
      </div>
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          variants={staggerContainer}
        >
          <motion.h1 
            className="hero-title"
            variants={staggerItem}
          >
            <motion.span 
              className="title-main"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Body Sandbox
            </motion.span>
            <motion.span 
              className="title-subtitle"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              An Interactive 3D Human Body to Experiment With
            </motion.span>
          </motion.h1>
          <motion.p 
            className="hero-description"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            Explore the human body like never before with our cutting-edge 3D medical simulator. 
            Perfect for medical education, patient awareness, and research applications.
          </motion.p>
          <motion.div 
            className="hero-buttons"
            variants={fadeInUp}
            transition={{ delay: 0.8 }}
          >
            <motion.button 
              className="cta-button primary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              See the Demo
            </motion.button>
            <motion.button 
              className="cta-button secondary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div 
          className="hero-visual"
          variants={fadeInRight}
          transition={{ delay: 1 }}
        >
          <div className="body-model-container">
            <canvas id="body-canvas"></canvas>
            <div className="model-overlay">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Vein_art_rotating.gif" 
                alt="Revolving human body"
                className="body-gif"
                style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'16px'}}
              />
              <motion.div 
                className="shimmer-effect"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );

  // Features Section Component
  const FeaturesSection = () => {
    const featuresRef = useRef(null);
    const isInView = useInView(featuresRef, { once: true, threshold: 0.1 });

    const features = [
      {
        icon: "🔍",
        title: "3D Body Explorer",
        description: "Navigate through detailed anatomical structures with intuitive controls and real-time rendering."
      },
      {
        icon: "💊",
        title: "Apply Medical Presets",
        description: "Simulate various medical conditions and treatments with pre-configured scenarios."
      },
      {
        icon: "🧪",
        title: "Sandbox Simulation",
        description: "Create custom experiments and test hypotheses in a controlled virtual environment."
      },
      {
        icon: "📊",
        title: "Dynamic Vitals Visualization",
        description: "Monitor real-time vital signs and physiological responses with interactive charts."
      },
      {
        icon: "🎓",
        title: "Educational Tooltips",
        description: "Learn with contextual information and guided tutorials throughout your exploration."
      }
    ];

    return (
      <motion.section 
        id="features" 
        className="features"
        ref={featuresRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div 
            className="section-header"
            variants={fadeInUp}
          >
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">Everything you need for comprehensive medical simulation</p>
          </motion.div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                variants={staggerItem}
                whileHover={{ 
                  scale: 1.03, 
                  y: -12,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="feature-icon"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  };

  // Impact Section Component
  const ImpactSection = () => {
    const impactRef = useRef(null);
    const isInView = useInView(impactRef, { once: true, threshold: 0.1 });

    const impactData = [
      {
        icon: "🎓",
        title: "Medical Education",
        description: "Enhancing learning outcomes for medical students and professionals with immersive 3D experiences.",
        stats: [
          { number: "10K+", label: "Students" },
          { number: "95%", label: "Retention" }
        ]
      },
      {
        icon: "👥",
        title: "Patient Awareness",
        description: "Empowering patients with visual understanding of their conditions and treatment options.",
        stats: [
          { number: "50K+", label: "Patients" },
          { number: "87%", label: "Satisfaction" }
        ]
      },
      {
        icon: "🔬",
        title: "Research Sandbox",
        description: "Providing researchers with powerful tools for hypothesis testing and data visualization.",
        stats: [
          { number: "200+", label: "Studies" },
          { number: "15", label: "Publications" }
        ]
      }
    ];

    return (
      <motion.section 
        id="impact" 
        className="impact"
        ref={impactRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div 
            className="section-header"
            variants={fadeInUp}
          >
            <h2 className="section-title">Making an Impact</h2>
            <p className="section-subtitle">Transforming medical education and patient care worldwide</p>
          </motion.div>
          <div className="impact-grid">
            {impactData.map((impact, index) => (
              <motion.div 
                key={index}
                className="impact-card"
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.02, 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div 
                  className="impact-icon"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {impact.icon}
                </motion.div>
                <h3 className="impact-title">{impact.title}</h3>
                <p className="impact-description">{impact.description}</p>
                <div className="impact-stats">
                  {impact.stats.map((stat, statIndex) => (
                    <motion.div 
                      key={statIndex}
                      className="stat"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.span 
                        className="stat-number"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.5 + index * 0.2 + statIndex * 0.1 }}
                      >
                        {stat.number}
                      </motion.span>
                      <span className="stat-label">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  };

  // Tech Stack Section Component
  const TechStackSection = () => {
    const techRef = useRef(null);
    const isInView = useInView(techRef, { once: true, threshold: 0.1 });

    const techItems = [
      { name: "Three.js", category: "3D Graphics" },
      { name: "Unity", category: "Game Engine" },
      { name: "Chart.js", category: "Data Visualization" },
      { name: "D3.js", category: "Interactive Charts" },
      { name: "Node.js", category: "Backend" },
      { name: "Flask", category: "API Framework" },
      { name: "WHO", category: "Medical Data" },
      { name: "NIH", category: "Research Data" }
    ];

    return (
      <motion.section 
        id="tech" 
        className="tech-stack"
        ref={techRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div 
            className="section-header"
            variants={fadeInUp}
          >
            <h2 className="section-title">Built with Modern Technology</h2>
            <p className="section-subtitle">Leveraging cutting-edge tools and frameworks for optimal performance</p>
          </motion.div>
          <div className="tech-grid">
            {techItems.map((tech, index) => (
              <motion.div 
                key={index}
                className="tech-item"
                variants={staggerItem}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="tech-logo"
                  whileHover={{ 
                    scale: 1.1,
                    color: "#2563eb",
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {tech.name}
                </motion.div>
                <span className="tech-category">{tech.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  };

  // Loading Component
  const LoadingScreen = () => (
    <motion.div 
      className="loading-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );

  return (
    <div className="body-sandbox-app">
      <LoadingScreen />
      
      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🧬</span>
            <span className="logo-text">Body Sandbox</span>
          </div>
          <div className="nav-links">
            <motion.a 
              href="#features" 
              className="nav-link"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Features
            </motion.a>
            <motion.a 
              href="#impact" 
              className="nav-link"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Impact
            </motion.a>
            <motion.a 
              href="#tech" 
              className="nav-link"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Technology
            </motion.a>
            <motion.a 
              href="#contact" 
              className="nav-link"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.a>
          </div>
          <motion.button 
            className="cta-button nav-cta"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Early Access
          </motion.button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <HeroSection />
      <FeaturesSection />
      <ImpactSection />
      <TechStackSection />

      {/* Footer */}
      <motion.footer 
        id="contact" 
        className="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🧬</span>
                <span className="logo-text">Body Sandbox</span>
              </div>
              <p className="footer-mission">
                Advancing medical education and patient care through innovative 3D visualization technology.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#impact">Impact</a></li>
                <li><a href="#tech">Technology</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Contact</h4>
              <ul className="footer-links">
                <li><a href="mailto:hello@bodysandbox.com">bodysandbox@gmail.com</a></li>
                <li><a href="tel:+1234567890">+91 9876543210</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Body Sandbox. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default BodySandboxReact;
