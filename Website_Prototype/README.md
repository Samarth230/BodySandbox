# Body Sandbox - Interactive 3D Medical Body Simulator

A modern, visually stunning landing page for an interactive 3D medical body simulator project. Built with cutting-edge web technologies and featuring a premium, clean visual style with glassmorphism effects.

## 🚀 Features

- **Immersive 3D Hero Section**: Interactive Three.js-powered human body model with smooth animations
- **Modern Design**: Clean whitespace, elegant typography, and glassmorphism-inspired cards
- **Responsive Layout**: Perfect appearance on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, smooth scrolling, and animated transitions
- **Medical Professionalism**: Carefully chosen color palette and iconography for medical credibility
- **Accessibility**: Focus states, reduced motion support, and semantic HTML structure

## 🎨 Design System

### Color Palette
- **Primary Blue**: #2563eb (Trust and professionalism)
- **Secondary Purple**: #7c3aed (Innovation and creativity)
- **Accent Green**: #059669 (Health and growth)
- **Neutral Grays**: Comprehensive gray scale for text and backgrounds

### Typography
- **Primary Font**: Inter (Clean, modern, highly readable)
- **Secondary Font**: Montserrat (Elegant headings and branding)

### Key Design Elements
- Glassmorphism effects with subtle transparency and blur
- Smooth gradients and soft shadows
- Rounded corners and modern spacing
- Subtle animations and micro-interactions

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js for interactive 3D body model
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Animations**: CSS animations and JavaScript interactions
- **Responsive Design**: Mobile-first approach with breakpoints

## 📁 Project Structure

```
Body Sandbox/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality and 3D model
└── README.md           # Project documentation
```

## 🚀 Getting Started

1. **Clone or Download**: Get the project files
2. **Open in Browser**: Simply open `index.html` in a modern web browser
3. **Local Server** (Recommended): For best performance, serve from a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 🎯 Sections Overview

### Hero Section
- Dynamic 3D human body model with mouse/touch interaction
- Animated gradient background with floating particles
- Compelling headline and call-to-action buttons
- Shimmer effect overlay on the 3D model

### Features Section
- Five interactive feature cards with hover animations
- Medical-themed iconography and descriptions
- Glassmorphism card design with subtle shadows

### Impact Section
- Three impact areas with statistics and metrics
- Clean grid layout with engaging visuals
- Animated counters and hover effects

### Tech Stack Section
- Technology badges in a responsive grid
- Clean, professional presentation
- Hover animations for interactivity

### Footer
- Minimal, elegant design
- Contact information and quick links
- Mission statement and branding

## 📱 Responsive Design

The landing page is fully responsive with breakpoints at:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## ♿ Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- Focus states for keyboard navigation
- Reduced motion support for users with vestibular disorders
- High contrast ratios for text readability
- Alt text for images and icons

## 🎨 Customization

### Colors
Update the CSS custom properties in `:root` to change the color scheme:
```css
:root {
    --primary-blue: #your-color;
    --secondary-purple: #your-color;
    --accent-green: #your-color;
}
```

### Typography
Change fonts by updating the Google Fonts import and CSS variables:
```css
--font-primary: 'Your-Font', sans-serif;
--font-secondary: 'Your-Font', sans-serif;
```

### 3D Model
Modify the `createBodyModel()` function in `script.js` to customize the 3D body representation.

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📞 Contact

For questions or support, please contact:
- Email: hello@bodysandbox.com
- Phone: +1 (234) 567-890

---

**Body Sandbox** - Advancing medical education and patient care through innovative 3D visualization technology.
