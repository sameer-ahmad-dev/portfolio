# Sameer Ahmad - Portfolio Website

A modern, responsive personal portfolio website showcasing my expertise in Odoo ERP development, AI/ML engineering, and full-stack web development.

## Live Demo

[sameer-ahmad-dev.github.io/portfolio](https://sameer-ahmad-dev.github.io/portfolio/)

## Features

- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Particle Background** - Animated canvas-based particle system with interconnecting lines
- **Typewriter Effect** - Dynamic text cycling through specializations
- **Project Gallery** - Filterable grid of projects with category tabs and lightbox modal
- **Testimonials Carousel** - Auto-sliding client reviews with navigation controls
- **Skill Progress Bars** - Animated bars triggered on scroll
- **Counter Animations** - Stats that count up when scrolled into view
- **3D Card Tilt** - Interactive hover effect on service cards
- **Contact Form** - Styled form with loading and success states
- **WhatsApp Button** - Draggable floating button with edge snapping
- **Scroll Animations** - Custom AOS (Animate on Scroll) using Intersection Observer
- **Smooth Navigation** - Sticky navbar with active section highlighting

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Profile photo, typewriter intro, floating tech badges, stats counters |
| **About** | Bio, info cards (degree, location, email), service overview |
| **Services** | 6 service cards - Odoo Dev, ERP Implementation, API Integration, Migration, AI/ML, POS |
| **Experience** | Work timeline, education, and certifications |
| **Skills** | Animated progress bars across 4 categories |
| **Projects** | Filterable gallery with 9 projects and detail lightbox |
| **Testimonials** | 10 client reviews in a responsive carousel slider |
| **Contact** | Contact info, social links, and message form |

## Tech Stack

- **HTML5** - Semantic markup with accessibility attributes
- **CSS3** - Custom properties, gradients, animations, grid, flexbox
- **Vanilla JavaScript** - No frameworks or dependencies
- **Font Awesome 6.5.1** - Icon library
- **Google Fonts** - Inter + JetBrains Mono
- **Canvas API** - Particle animation background
- **Intersection Observer API** - Scroll-triggered animations

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Navy | `#0a0e1a` | Primary background |
| Electric Cyan | `#00d4ff` | Primary accent |
| Blue | `#3b82f6` | Secondary accent |
| Purple | `#8b5cf6` | Gradient accent |
| Gold | `#f59e0b` | Highlight accent |
| Green | `#10b981` | Success states |

## Project Structure

```
portfolio/
├── index.html          # Single-page HTML (all sections)
├── styles.css          # Complete stylesheet with responsive queries
├── script.js           # All interactive functionality
├── profile.png         # Profile photo
├── Sameer Ahamd.pdf    # Downloadable resume/CV
├── .gitignore          # Git ignore rules
└── README.md
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/sameer-ahmad-dev/portfolio.git
   ```

2. Open `index.html` in your browser - no build tools or server required.

## Customization

- **Colors** - Edit CSS variables in `:root` at the top of `styles.css`
- **Content** - Update text directly in `index.html`
- **Projects** - Add/edit project cards in the `#projects` section with `data-category` attributes
- **Typewriter phrases** - Modify the `phrases` array in `script.js`

## Performance

- Zero external JavaScript frameworks
- Minimal HTTP requests (1 HTML + 1 CSS + 1 JS + fonts + icons)
- Passive scroll event listeners
- Efficient canvas rendering with `requestAnimationFrame`
- Intersection Observer for lazy animations (no scroll event spam)

## Browser Support

Chrome, Firefox, Safari, Edge (all modern versions)

## Author

**Sameer Ahmad** - Odoo Developer & AI Engineer

- [LinkedIn](https://www.linkedin.com/in/sameer-ahmad-python-developer)
- [GitHub](https://github.com/sameer-ahmad-dev)
- [Email](mailto:sameerahmad.92824@gmail.com)

## License

This project is open source and available for personal use and reference.
