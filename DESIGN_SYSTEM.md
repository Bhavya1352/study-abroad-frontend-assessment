# 🎨 Complete Design System - Color Codes & Styles

## Color Palette

### Primary Colors
```
Indigo Purple:      #6366F1
Vibrant Purple:     #A855F7
Deep Purple:        #4F46E5
```

### Accent Colors
```
Cyan/Teal:          #06B6D4
Teal:               #0891B2
Deep Teal:          #0E7490
Green (Success):    #10B981
Deep Green:         #059669
```

### Neutrals
```
Light Background:   #F9FAFB
White:              #FFFFFF
Dark Surface:       #1E293B
Deep Dark:          #0F172A
```

## Gradient Definitions

### Primary Gradient
```css
background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
```

### Tri-Color Gradient
```css
background: linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%);
```

### Card Gradients
```css
/* Users Card */
background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));

/* Products Card */
background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.2));

/* Growth Card */
background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2));
```

### Background Gradients
```css
/* Light Mode */
background: linear-gradient(135deg, #F5F3FF 0%, #F0F9FF 50%, #ECFDF5 100%);
background-attachment: fixed;

/* Dark Mode */
background: linear-gradient(135deg, #0F172A 0%, #1A1A3E 50%, #0F3A3A 100%);
background-attachment: fixed;
```

## Typography Styles

### Gradient Text
```css
background: linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Font Weights
```
h1: 800 (extra bold)
h2: 800 (extra bold)
h3: 700 (bold)
h4: 700 (bold)
h5: 600 (semi-bold)
h6: 600 (semi-bold)
button: 700 (bold)
```

### Font Family
```
Primary: "Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif
```

## Component Styles

### Buttons

#### Contained Button
```css
background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
border-radius: 12px;
padding: 12px 28px;
transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
position: relative;
overflow: hidden;

&:hover {
  background: linear-gradient(135deg, #4F46E5 0%, #9333EA 100%);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.4);
}

&:active {
  transform: translateY(-2px) scale(1);
}
```

#### Outlined Button
```css
border: 2px solid #6366F1;
color: #6366F1;
border-radius: 12px;
transition: all 0.3s ease;

&:hover {
  background: rgba(99, 102, 241, 0.05);
  border-color: #A855F7;
  transform: translateY(-2px);
}
```

### Cards
```css
border-radius: 20px;
border: 1px solid rgba(255, 255, 255, 0.2);
background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
backdrop-filter: blur(10px);
transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
position: relative;
overflow: hidden;

/* Radial background glow */
&::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, [color]15, transparent);
  z-index: 0;
}

&:hover {
  transform: translateY(-12px) scale(1.01);
  box-shadow: 0 30px 60px [color]30, 0 0 1px rgba(6, 182, 212, 0.5);
}
```

### Text Fields
```css
border: 2px solid rgba(99, 102, 241, 0.2);
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(10px);
border-radius: 12px;
transition: all 0.3s ease-out;

&:hover {
  border: 2px solid #6366F1;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.2);
}

&:focus {
  border: 2px solid #A855F7;
  box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
}
```

### Navigation Bar
```css
background: linear-gradient(90deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
backdrop-filter: blur(20px);
border-bottom: 1px solid rgba(99, 102, 241, 0.1);
elevation: 0;
```

### Tables

#### Header
```css
background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
border-color: rgba(99, 102, 241, 0.2);
color: #6366F1;
font-weight: 700;
```

#### Row Hover
```css
background: linear-gradient(90deg, rgba(99, 102, 241, 0.05), rgba(6, 182, 212, 0.05));
transition: all 0.2s ease;
```

### Chips
```css
border-radius: 10px;
font-weight: 600;
background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
border: 1.5px solid rgba(99, 102, 241, 0.3);
transition: all 0.2s ease;

&:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));
  border-color: rgba(99, 102, 241, 0.6);
}
```

## Animation Easing Functions

### Spring-like Easing
```css
cubic-bezier(0.34, 1.56, 0.64, 1)
/* Creates a bouncy, natural movement */
```

### Smooth Easing
```css
ease | ease-out | ease-in-out
```

### Ripple Effect
```css
@keyframes ripple {
  from {
    width: 0;
    height: 0;
    opacity: 1;
  }
  to {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}
```

## Shadow Effects

### Subtle Shadow
```css
box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
```

### Medium Shadow
```css
box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
```

### Large Shadow with Glow
```css
box-shadow: 0 30px 60px rgba(99, 102, 241, 0.3), 0 0px 1px rgba(6, 182, 212, 0.5);
```

### Color-Specific Shadows
```css
/* Purple */
box-shadow: 0 20px 40px rgba(99, 102, 241, 0.4);

/* Cyan */
box-shadow: 0 20px 40px rgba(6, 182, 212, 0.4);

/* Green */
box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4);
```

## Border Styles

### Glassmorphic Border
```css
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Accent Border
```css
border: 1px solid rgba(99, 102, 241, 0.1);
border: 2px solid rgba(99, 102, 241, 0.2);
border: 2px solid #6366F1;
```

## Spacing

### Padding
```
Standard: 12px - 24px
Card Content: 16px - 24px
Button: 12px 28px
```

### Margin
```
Between sections: 24px (mb: 6 in Tailwind = 1.5rem)
Between cards: 12px (gap: 3)
```

## Glassmorphism Effects

### Base Glassmorphic Element
```css
background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
border: 1px solid rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border-radius: 16px;
```

### Deep Blur (for navigation)
```css
backdrop-filter: blur(20px);
```

### Shallow Blur (for inputs)
```css
backdrop-filter: blur(10px);
```

## Responsive Design

### Breakpoints (MUI)
```css
xs: 0px
sm: 600px
md: 900px
lg: 1200px
xl: 1536px
```

### Grid Layout
```jsx
xs={12}   /* Full width on mobile */
sm={6}    /* Half width on tablets */
md={4}    /* One-third on desktop */
```

---

## Implementation Guide

To apply these styles in your MUI components:

```tsx
<Box sx={{
  background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 30px 60px rgba(99, 102, 241, 0.3)',
  },
}}>
  {/* Content */}
</Box>
```

---

**All colors, gradients, and styles are production-ready! 🚀**
