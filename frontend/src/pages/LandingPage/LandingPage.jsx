import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import heroImage from "../../assets/image1.jpg";
import logo from "../../assets/logo5.png";


const LandingPage = () => {
  const canvasRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create multiple floating shapes for more dynamic background
    const shapes = [];
    const colors = [0xff0055, 0x00aaff, 0x7700ff, 0x00ff88];
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.TetrahedronGeometry(1.1, 0),
      new THREE.SphereGeometry(0.8, 12, 12)
    ];

    for (let i = 0; i < 12; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.7
      });
      const shape = new THREE.Mesh(geometry, material);

      // Random positions
      shape.position.x = (Math.random() - 0.5) * 10;
      shape.position.y = (Math.random() - 0.5) * 10;
      shape.position.z = (Math.random() - 0.5) * 5;

      // Random rotation speeds
      shape.userData = {
        speedX: Math.random() * 0.01 - 0.005,
        speedY: Math.random() * 0.01 - 0.005,
        speedZ: Math.random() * 0.01 - 0.005,
      };

      scene.add(shape);
      shapes.push(shape);
    }

    // Add particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(ambientLight, pointLight);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Animate all shapes
      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.speedX;
        shape.rotation.y += shape.userData.speedY;
        shape.rotation.z += shape.userData.speedZ;

        // Subtle floating movement
        shape.position.y += 0.001;
        if (shape.position.y > 5) shape.position.y = -5;
      });

      // Rotate particles
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="landing-page">
      <canvas ref={canvasRef} className="bg-canvas" />

      {/* Animated background overlay */}
      <div className="animated-bg-overlay"></div>

      <header className="header">
        <div className="header-container">
            <img
              src={logo}
              alt="HypeHunter Logo"
              className="header-logo"
            />
          <h1 className="logo">HypeHunter</h1>
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            {isAuthenticated ? (
              <>
                <Link to="/feed" className="nav-button">Dashboard</Link>
                <button onClick={handleLogout} className="nav-button outline">Log Out</button>
              </>
            ) : (
              <>
                <Link to="/auth?mode=login" className="nav-button outline">Sign In</Link>
                <Link to="/auth?mode=signup" className="nav-button primary">Sign Up</Link>
              </>
            )}
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>
            <span className="hero-gradient">Unlock the Future </span>
            <span>of Gaming Insights</span>
          </h2>
          <p>
            HypeHunter gives streamers, developers, and agencies real-time insights
            into the most trending and upcoming games. Stay ahead of the curve with
            our subscription-based dashboard.
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <Link to="/feed" className="cta-button primary">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/auth?mode=signup" className="cta-button primary">Get Started Free</Link>
                <button className="cta-button secondary">Watch Demo</button>
              </>
            )}
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Active Games Tracked</span>
            </div>
            <div className="stat">
              <span className="stat-number">2.5M</span>
              <span className="stat-label">Data Points Daily</span>
            </div>
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Accuracy Rate</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">

          <div className="hero-image-container">
            <img src={heroImage} alt="HypeHunter Dashboard Preview" />
            <div className="image-overlay">
              <div className="floating-element element-1"></div>
              <div className="floating-element element-2"></div>
              <div className="floating-element element-3"></div>
            </div>

          </div>

        </div>

      </section>

      {/* Clients Section */}
      <section className="clients">
        <h3>Trusted by industry leaders</h3>
        <div className="client-logos">
          <div className="client-logo">TWITCH</div>
          <div className="client-logo">UBISOFT</div>
          <div className="client-logo">FAZE</div>
          <div className="client-logo">ROGUE</div>
          <div className="client-logo">ESL</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <h2>Why Choose HypeHunter?</h2>
          <p>Powerful insights tailored for each segment of the gaming industry</p>
        </div>
        <div className="feature-cards">
          <div className="card">
            <div className="card-icon">🎮</div>
            <h3>For Streamers</h3>
            <p>
              Discover trending games and plan content that captures audience
              attention instantly. Track what's gaining traction before it goes viral.
            </p>
            <ul>
              <li>Real-time trending alerts</li>
              <li>Audience interest analysis</li>
              <li>Content planning tools</li>
            </ul>
          </div>
          <div className="card">
            <div className="card-icon">👨‍💻</div>
            <h3>For Developers</h3>
            <p>
              Gain insights into game popularity, user interests, and emerging
              trends to guide development and marketing strategies.
            </p>
            <ul>
              <li>Market gap identification</li>
              <li>Competitor analysis</li>
              <li>Feature popularity tracking</li>
            </ul>
          </div>
          <div className="card">
            <div className="card-icon">🏢</div>
            <h3>For Agencies</h3>
            <p>
              Track the gaming market, optimize campaigns, and provide clients
              with actionable insights to maximize ROI.
            </p>
            <ul>
              <li>Campaign performance analytics</li>
              <li>Influencer matching tools</li>
              <li>ROI forecasting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-header">
          <h2>What Our Users Say</h2>
        </div>
        <div className="testimonial-cards">
          <div className="testimonial">
            <div className="testimonial-content">
              "HypeHunter helped me discover games weeks before they went viral. My viewership increased by 45%!"
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-details">
                <h4>SarahStreams</h4>
                <p>Twitch Partner</p>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-content">
              "The data accuracy is incredible. We've refined our development roadmap based on HypeHunter insights."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-details">
                <h4>Mark Chen</h4>
                <p>Indie Game Studio Director</p>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-content">
              "Our campaign performance improved dramatically once we started using HypeHunter's trend predictions."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-details">
                <h4>Jennifer Adams</h4>
                <p>Marketing Agency CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="section-header">
          <h2>Flexible Plans For Every Need</h2>
          <p>Start with a free plan and upgrade as you grow</p>
        </div>
        <div className="pricing-cards">
          <div className="card">
            <h3>Starter</h3>
            <div className="price">$9<span>/month</span></div>
            <p>Perfect for individual creators</p>
            <ul>
              <li>Access to trending games</li>
              <li>Basic dashboard</li>
              <li>Weekly reports</li>
              <li>Email support</li>
            </ul>
            {isAuthenticated ? (
              <button className="cta-button outline">Upgrade Plan</button>
            ) : (
              <Link to="/auth?mode=signup" className="cta-button outline">Get Started</Link>
            )}
          </div>
          <div className="card popular">
            <div className="popular-badge">Most Popular</div>
            <h3>Pro</h3>
            <div className="price">$29<span>/month</span></div>
            <p>For serious content creators</p>
            <ul>
              <li>Full dashboard access</li>
              <li>Advanced analytics & insights</li>
              <li>Real-time alerts</li>
              <li>Priority support</li>
              <li>Custom reports</li>
            </ul>
            {isAuthenticated ? (
              <button className="cta-button primary">Upgrade Now</button>
            ) : (
              <Link to="/auth?mode=signup" className="cta-button primary">Subscribe Now</Link>
            )}
          </div>
          <div className="card">
            <h3>Enterprise</h3>
            <div className="price">Custom</div>
            <p>For teams and agencies</p>
            <ul>
              <li>Custom dashboards</li>
              <li>Dedicated account manager</li>
              <li>API access</li>
              <li>White-label reports</li>
              <li>Team collaboration tools</li>
            </ul>
            <button className="cta-button outline">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to unlock gaming insights?</h2>
          <p>Join thousands of streamers, developers, and agencies using HypeHunter daily</p>
          <div className="cta-buttons">
            {isAuthenticated ? (
              <Link to="/feed" className="cta-button primary large">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/auth?mode=signup" className="cta-button primary large">Start Free Trial</Link>
                <button className="cta-button secondary large">Schedule a Demo</button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HypeHunter</h3>
            <p>Powering the future of gaming insights</p>
            <div className="social-links">
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="Discord">🎮</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#">Use Cases</a>
            <a href="#">Integrations</a>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <a href="#">Blog</a>
            <a href="#">API Docs</a>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#">Careers</a>
            <a href="#contact">Contact</a>
            <a href="#">Legal</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 HypeHunter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;