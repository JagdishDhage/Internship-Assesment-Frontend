import React from 'react';
import Navbar from './Navigation/Navbar';
import './Root.css';
import { Link } from 'react-router-dom';
import Newsletter from './News/NewsLetter';
import { useNavigate } from 'react-router-dom';

const subjects = [
  {
    icon: '🧮',
    name: 'Mathematics',
    desc: 'Algebra, Calculus, Statistics, and more',
  },
  {
    icon: '🧪',
    name: 'Science',
    desc: 'Physics, Chemistry, Biology, and more',
  },
  {
    icon: '💻',
    name: 'Computer Science',
    desc: 'Programming, Data Structures, Algorithms',
  },
  {
    icon: '📊',
    name: 'Commerce',
    desc: 'Accounting, Economics, Business Studies',
  },
];

const features = [
  {
    icon: '📝',
    title: 'Comprehensive Coverage',
    description: 'Detailed notes covering all major subjects and topics'
  },
  {
    icon: '🎓',
    title: 'Expert Reviewed',
    description: 'All notes are created and reviewed by academic experts'
  },
  {
    icon: '📱',
    title: 'Accessible Anywhere',
    description: 'Access your notes on any device, anytime, anywhere'
  }
];

const steps = [
  {
    number: 1,
    title: 'Sign Up',
    description: 'Create your free account to get started'
  },
  {
    number: 2,
    title: 'Browse Notes',
    description: 'Find notes for your subjects and topics'
  },
  {
    number: 3,
    title: 'Download & Study',
    description: 'Access notes online or download for offline use'
  }
];

const testimonials = [
  {
    quote: "These notes helped me ace my exams! They're concise, clear, and cover everything that's important.",
    name: 'Onkar Gaikwad',
    position: 'Engineering Student, Pune'
  },
  {
    quote: "I love how well-organized these notes are. They make complex topics easy to understand and remember.",
    name: 'Ashish Wagh',
    position: 'Engineering Student, Pune'
  }
];

const footerLinks = [
  {
    title: 'Notes',
    items: ['Mathematics', 'Science', 'Computer Science', 'Commerce']
  },
  {
    title: 'Company',
    items: ['About Us', 'Team', 'Blog', 'Contact']
  },
  {
    title: 'Support',
    items: ['Help Center', 'Terms of Service', 'Privacy Policy', 'FAQ']
  }
];

const socialIcons = ['FB', 'TW', 'IG', 'YT'];

function Root() {
  const navigate = useNavigate();
  
  const handleNavigate = (subject) => {
    navigate(`/subjects/${(subject.name).toLowerCase()}`);
  };
  
  return (
    <div className="home-container">
      {/* Hero section */}
      <div className="hero-section">
        <div className="half-circle-container">
          <Navbar className='navbar' />
          <div className="headline-container">
            <h1 className="main-headline">India's Biggest Learning Platform</h1>
            <p className="sub-headline">Access comprehensive notes for all your academic needs</p>
            <div className="cta-buttons">
              <Link to='Subjects'>
                <button className="primary-btn">Get Started</button>
              </Link>
              <Link to="/Subjects">
                <button className="primary-btn">Browse Notes</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="features-section">
        <h2 className="section-title">Why Choose Our Notes</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular subjects section */}
      <div className="notes-section">
        <h2 className="section-title">Popular Subjects</h2>
        <div className="subjects-grid">
          {subjects.map((subject, index) => (
            <div className="subject-card" key={index} onClick={() => handleNavigate(subject)}>
              <div className="subject-icon">{subject.icon}</div>
              <h3>{subject.name}</h3>
              <p>{subject.desc}</p>
              <button className="text-btn">View Notes</button>
            </div>
          ))}
        </div>
      </div>

      {/* How it works section */}
      <div className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials section */}
      <div className="testimonials-section">
        <h2 className="section-title">What Our Students Say</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <p>"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter section */}
      <Newsletter />
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Learning Platform</h3>
          </div>
          <div className="footer-links">
            {footerLinks.map((column, index) => (
              <div className="footer-column" key={index}>
                <h4>{column.title}</h4>
                <ul>
                  {column.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-social">
            {socialIcons.map((icon, index) => (
              <div className="social-icon" key={index}>{icon}</div>
            ))}
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 Learning Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Root;