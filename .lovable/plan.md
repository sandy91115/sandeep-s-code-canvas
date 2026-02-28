

# 🚀 Sandeep Chaudhary — Premium 3D Developer Portfolio

## Overview
A futuristic, dark-themed (black + saffron accent) portfolio with immersive 3D elements throughout, smooth scroll-based animations, and Apple-level polish. Built with React + Vite, Tailwind CSS, React Three Fiber, Framer Motion, and GSAP.

---

## 🎬 Loading Screen
- Animated "SC" logo with saffron glow effect
- Smooth fade-out transition into the main site

## 🖱️ Custom Cursor
- Custom dot + ring cursor that reacts to hoverable elements
- Magnetic pull effect on interactive elements

## 🏠 Section 1: Hero (Full Screen)
- **3D glassmorphism sphere** rotating in the center using React Three Fiber with reflective/refractive materials
- Large animated headline: *"Backend Engineer Crafting Scalable Systems"*
- Typewriter effect cycling through: Java, Spring Boot, REST APIs, PostgreSQL, Docker, etc.
- Scroll-down indicator with bouncing arrow animation
- Parallax particle background

## 👤 Section 2: About
- Split layout: left side with animated text reveal, right side with a stylized portrait placeholder
- Floating background particles using Three.js
- Animated stat cards (1+ year experience, B.Tech CSE 2024, projects count)
- Cards animate in on scroll with staggered fade + slide

## 🧠 Section 3: Skills
- **3D interactive skill globe** — tech icons orbiting a central node
- Backend skills (Java, Spring Boot, PostgreSQL, Docker, REST APIs) rendered larger/brighter
- Frontend skills (HTML, CSS, JavaScript, React) shown as secondary orbiting elements
- Hover on any icon shows a tooltip with proficiency level
- Glow effects on hover

## 💼 Section 4: Experience
- Vertical timeline with scroll-triggered reveal animations
- Each experience card slides in from alternating sides
- Saffron accent line connecting timeline nodes
- Animated progress dots that fill as you scroll past

## 🛠️ Section 5: Projects (Case Studies)
- **3D tilting card stack** with hover parallax effect
- Each card shows project name, tech stack badges, and a brief tagline
- Click opens a modal with full case study:
  - **Problem** → **Solution** → **Architecture** → **Tech Decisions** → **Challenges** → **Impact**
- Animated background grid pattern
- Placeholder projects: RFQ System (CS-Cart Addon), REST API Platform
- Resume-ready bullet points included in each case study

## ⚡ Section 6: Tech Stack
- Animated badge grid with icons
- Saffron glow effect on hover
- Grouped by category: Languages, Frameworks, Databases, DevOps, Tools
- Badges animate in with staggered scale effect on scroll

## 🗺️ Section 7: Roadmap / Learning
- Animated progress bars for current learning goals (e.g., Microservices, Cloud, System Design)
- Cards reveal on scroll with subtle slide-up animation
- "Currently exploring" badges with pulse animation

## 📬 Section 8: Contact
- Glassmorphism card with frosted glass effect
- Contact form with animated focus states (glowing saffron border)
- Magnetic hover effect on the submit button
- Social links: GitHub, LinkedIn, Twitter/X, and more — with hover animations
- Email and location info

## 🎨 Design System
- **Primary background:** Deep black (#0a0a0a)
- **Accent color:** Saffron (#FF9933) with glow variants
- **Typography:** Clean sans-serif, large headlines, readable body text
- **Glass effects:** Frosted glass cards with subtle borders
- **Consistent spacing** and responsive grid throughout

## ✨ Animation & Effects
- Smooth scrolling via CSS/JS smooth scroll behavior
- GSAP ScrollTrigger for scroll-based section reveals
- Framer Motion for component-level animations and page transitions
- Parallax layers on background elements
- All 3D scenes lazy-loaded with Suspense for performance

## 📱 Responsive Design
- Fully responsive across desktop, tablet, and mobile
- 3D elements gracefully degrade on mobile (simpler geometry, fewer particles)
- Touch-friendly interactions

## 📁 Architecture
- Clean component structure: each section as its own component
- Separate `/components/3d/` folder for Three.js scenes
- Separate `/components/animations/` for reusable animation wrappers
- Data-driven: project info, skills, experience stored in config files for easy updates

