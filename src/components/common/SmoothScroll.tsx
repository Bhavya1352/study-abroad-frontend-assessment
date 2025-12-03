'use client';

import React, { useEffect } from 'react';
import { Box, Button, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ScrollSection {
  id: string;
  title: string;
  color: string;
}

interface SmoothScrollProps {
  sections?: ScrollSection[];
  showIndicator?: boolean;
}

export default function SmoothScroll({ 
  sections = [], 
  showIndicator = true 
}: SmoothScrollProps) {
  const theme = useTheme();
  const [currentSection, setCurrentSection] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, clientHeight } = element;
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + clientHeight - 100) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (sections.length === 0) {
    return null;
  }

  return (
    <>
      {/* Scroll Indicator - Vertical dots on the side */}
      {showIndicator && (
        <Box
          sx={{
            position: 'fixed',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 900,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            '@media (max-width: 768px)': {
              display: 'none',
            },
          }}
        >
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              title={section.title}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: 'none',
                backgroundColor: currentSection === index ? section.color : 'rgba(200, 200, 200, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: currentSection === index ? 'scale(1.5)' : 'scale(1)',
                boxShadow: currentSection === index ? `0 0 8px ${section.color}` : 'none',
              }}
            />
          ))}
        </Box>
      )}

      {/* Scroll Indicator - Horizontal buttons at bottom */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 80,
          left: 0,
          right: 0,
          zIndex: 900,
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          flexWrap: 'wrap',
          padding: 2,
          '@media (min-width: 769px)': {
            display: 'none',
          },
        }}
      >
        {sections.map((section) => (
          <Button
            key={section.id}
            size="small"
            onClick={() => scrollToSection(section.id)}
            sx={{
              backgroundColor: section.color,
              color: 'white',
              textTransform: 'none',
              fontSize: '0.75rem',
              padding: '4px 8px',
              '&:hover': {
                backgroundColor: section.color,
                opacity: 0.8,
              },
            }}
          >
            {section.title}
          </Button>
        ))}
      </Box>
    </>
  );
}
