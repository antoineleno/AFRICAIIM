# AFRICAIIM Website Typography Guide

## Design System Overview
This document outlines the consistent typography system used across the AFRICAIIM website to ensure professional and coherent text styling.

---

## Color Palette
- **Primary Green**: `#1a5443` - Used for headings and primary elements
- **Accent Gold**: `#d4a574` - Used for labels, decorative elements, and highlights
- **Text Gray**: Various shades for body text and secondary content

---

## Typography Hierarchy

### 1. **Navigation Bar**
- **Logo ("AFRICAIIM")**: `text-2xl` (24px)
- **Subtitle ("Business School")**: `text-base` (16px)
- **Menu Items**: `text-lg` (18px) - About, Program, Events & News, Campus Life, Contact Us
- **Apply Now Button**: `text-lg` (18px)
- **Font Style**: Clean, professional sans-serif

---

### 2. **Hero Section**
- **Main Title**: 
  - Mobile: `text-6xl` (60px)
  - Tablet: `text-7xl` (72px)
  - Desktop: `text-8xl` (96px)
  - Font Weight: `300` (light)
  - Color: White
- **Subtitle**: `text-2xl` to `text-3xl` (24-30px)
  - Color: Gold (`#d4a574`)
  - Font Weight: `300` (light)

---

### 3. **Section Headers (Standard Pattern)**
Used in: About, Programs, Chancellor Message, Events & News, Campus, Admission Form

- **Section Label**: 
  - Size: `text-base` (16px)
  - Transform: `uppercase`
  - Tracking: `tracking-widest` or `tracking-wider`
  - Font Weight: `font-bold`
  - Color: Gold (`#d4a574`)

- **Section Heading**: 
  - Size: `text-5xl md:text-6xl` (48-60px)
  - Font Weight: `font-light`
  - Line Height: `leading-tight`
  - Color: Primary Green (`#1a5443`)

- **Section Description**:
  - Size: `text-lg` to `text-xl` (18-20px)
  - Font Weight: `font-light`
  - Line Height: `leading-relaxed`
  - Color: `text-gray-600`, `text-gray-700`, or `text-gray-900`

---

### 4. **Body Text Standards**

#### About Section
- Slide Titles: `text-4xl` (36px), font-light
- Slide Content: `text-lg` (18px), font-light

#### Programs Section
- Description Text: `text-lg` (18px), font-light
- Timeline Labels: `text-base` (16px), font-weight 500
- Strong Emphasis: Bold inline, Primary Green color

#### Chancellor Message
- Quote Text: `text-xl md:text-2xl` (20-24px), italic, font-light
- Body Paragraphs: `text-lg` (18px), font-light, leading-relaxed
- Signature Name: `text-2xl` (24px), font-light
- Signature Title: `text-lg` (18px), font-light
- Organization: `text-base` (16px), font-light

#### Events & News
- Card Titles: `text-2xl` (24px), font-light
- Card Excerpts: `text-base` (16px), font-light
- Modal Content: `text-lg` (18px), font-light

#### Campus
- Feature Titles: `text-2xl` (24px), font-bold
- Feature Descriptions: `text-gray-600`, font-light

---

### 5. **Footer**
- Section Headings: `text-lg` (18px), Gold color
- Links: Default size, `text-white/80`, hover `text-white`
- Contact Info: Default size

---

## Font Weight Guidelines

1. **Light (300)**: 
   - Hero title and subtitle
   - All section headings (h2)
   - Body paragraphs
   - Descriptions
   - Quotes

2. **Normal (400)**:
   - Default body text
   - Standard paragraphs

3. **Medium (500)**:
   - Timeline labels
   - Emphasized text

4. **Bold (700)**:
   - Section labels (uppercase)
   - Feature titles
   - Emphasis text

---

## Spacing & Leading

- **Tight Leading**: Used for large headings (`leading-tight`)
- **Relaxed Leading**: Used for body text and descriptions (`leading-relaxed`)
- **Letter Spacing**: `tracking-widest` for uppercase labels, `tracking-wider` for some labels

---

## Responsive Breakpoints

- **Mobile First**: Base sizes for mobile
- **md (768px+)**: Tablet sizes (typically +1 size)
- **lg (1024px+)**: Desktop sizes

### Size Progression Examples:
- `text-5xl md:text-6xl` - 48px → 60px
- `text-6xl md:text-7xl lg:text-8xl` - 60px → 72px → 96px
- `text-2xl md:text-3xl` - 24px → 30px

---

## Consistency Checklist ✅

- [x] All section headings use `text-5xl md:text-6xl`
- [x] All section labels use `text-base uppercase tracking-widest font-bold`
- [x] Navigation menu items use `text-lg`
- [x] Description texts consistently use `text-lg` or `text-xl`
- [x] Font weights consistently applied (light for headings, normal/bold for emphasis)
- [x] Color scheme consistent (Primary Green for headings, Gold for labels)
- [x] Leading and spacing consistent across similar elements

---

## Best Practices

1. **Maintain Hierarchy**: Ensure visual hierarchy is clear (Hero > Section Heading > Body)
2. **Use Light Font for Elegance**: The light font weight (300) gives a professional, elegant appearance
3. **Consistent Colors**: Stick to the defined color palette
4. **Responsive Sizing**: Always provide responsive sizes for better mobile experience
5. **Readable Line Height**: Use `leading-relaxed` for body text to improve readability
6. **Appropriate Contrast**: Ensure sufficient contrast between text and background

---

## Recent Updates (February 2025)

### Navigation
- Updated menu items from default to `text-lg` for better visibility
- Logo increased from `text-xl` to `text-2xl`
- Subtitle increased from `text-sm` to `text-base`

### Section Headings Standardization
- **Campus**: Updated from `text-4xl md:text-5xl` to `text-5xl md:text-6xl`
- **Admission Form**: Updated from `text-4xl md:text-5xl` to `text-5xl md:text-6xl`
- Now all major sections use the same heading size for visual consistency

---

## File Reference

Components with consistent typography:
- `Navigation.tsx` - Navigation bar
- `Hero.tsx` - Hero section
- `About.tsx` - About section
- `Programs.tsx` - Programs section
- `ChancellorMessage.tsx` - Chancellor's message
- `EventsNews.tsx` - Events and news
- `Campus.tsx` - Campus life
- `AdmissionForm.tsx` - Contact form
- `Footer.tsx` - Footer
- `Dashboard.tsx` - Student dashboard
- `AdmissionsDashboard.tsx` - Admissions portal

---

*This typography system ensures a professional, coherent, and accessible user experience across the entire AFRICAIIM website.*
