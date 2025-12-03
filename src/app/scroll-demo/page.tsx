'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SmoothScroll from '@/components/common/SmoothScroll';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import { useScrollDirection, useInView, useSmoothScroll } from '@/hooks/useScroll';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface DemoItem {
  id: number;
  title: string;
  description: string;
}

export default function ScrollDemoPage() {
  const theme = useTheme();
  const [items, setItems] = useState<DemoItem[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Item ${i + 1}`,
      description: `This is demo item number ${i + 1}`,
    }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollDirection = useScrollDirection();
  const { scrollToElement } = useSmoothScroll();

  const sections = [
    { id: 'intro', title: 'Intro', color: '#06b6d4' },
    { id: 'features', title: 'Features', color: '#8b5cf6' },
    { id: 'infinite', title: 'Infinite', color: '#ec4899' },
    { id: 'contact', title: 'Contact', color: '#f59e0b' },
  ];

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newItems = Array.from({ length: 5 }, (_, i) => ({
      id: items.length + i + 1,
      title: `Item ${items.length + i + 1}`,
      description: `Dynamically loaded item ${items.length + i + 1}`,
    }));

    setItems(prev => [...prev, ...newItems]);
    setIsLoading(false);

    if (items.length > 50) {
      setHasMore(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', scrollBehavior: 'smooth' }}>
      {/* Scroll Direction Indicator */}
      {scrollDirection && (
        <Box
          sx={{
            position: 'fixed',
            top: 100,
            left: 20,
            zIndex: 800,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            padding: '8px 16px',
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {scrollDirection === 'down' ? '⬇️ Scrolling Down' : '⬆️ Scrolling Up'}
        </Box>
      )}

      {/* Smooth Scroll Navigation */}
      <SmoothScroll sections={sections} showIndicator={true} />

      {/* Introduction Section */}
      <Box
        id="intro"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', zIndex: 10 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              marginBottom: 2,
              animation: 'slideInUp 0.8s ease-out',
            }}
          >
            🚀 Advanced Scrolling Features
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              marginBottom: 4,
              animation: 'slideInUp 0.8s ease-out 0.2s both',
            }}
          >
            Explore smooth scrolling, infinite scroll, scroll detection, and more
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => scrollToElement('features')}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              animation: 'slideInUp 0.8s ease-out 0.4s both',
            }}
          >
            Scroll to Features
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        id="features"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '60px 20px',
          background: `linear-gradient(135deg, ${theme.palette.secondary.main}20, ${theme.palette.info.main}20)`,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ marginBottom: 6, textAlign: 'center', fontWeight: 700 }}>
            Scrolling Features
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                title: '🎯 Smooth Scroll',
                description: 'Smooth scrolling to sections with animated navigation dots',
              },
              {
                title: '♾️ Infinite Scroll',
                description: 'Automatically load more items as you scroll down',
              },
              {
                title: '📍 Scroll Direction',
                description: 'Detect scroll direction (up/down) for dynamic UI changes',
              },
              {
                title: '👁️ In-View Detection',
                description: 'Detect when elements enter the viewport',
              },
              {
                title: '📊 Scroll Progress',
                description: 'Visual progress bar showing scroll position',
              },
              {
                title: '🔝 Back to Top',
                description: 'Quick button to scroll back to top smoothly',
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Infinite Scroll Section */}
      <Box
        id="infinite"
        sx={{
          minHeight: '100vh',
          padding: '60px 20px',
          background: `linear-gradient(135deg, ${theme.palette.info.main}20, ${theme.palette.success.main}20)`,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ marginBottom: 4, textAlign: 'center', fontWeight: 700 }}>
            Infinite Scroll Demo
          </Typography>

          <InfiniteScroll
            onLoadMore={handleLoadMore}
            isLoading={isLoading}
            hasMore={hasMore}
            threshold={200}
          >
            <Stack spacing={2}>
              {items.map((item, index) => (
                <Paper
                  key={item.id}
                  sx={{
                    padding: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}${20 + index * 2}, ${theme.palette.secondary.main}${10 + index})`,
                    transition: 'all 0.3s ease',
                    animation: 'slideInUp 0.5s ease-out',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      boxShadow: 2,
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">{item.description}</Typography>
                </Paper>
              ))}
            </Stack>
          </InfiniteScroll>
        </Container>
      </Box>

      {/* Contact/CTA Section */}
      <Box
        id="contact"
        sx={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme.palette.success.main}20, ${theme.palette.warning.main}20)`,
          padding: '60px 20px',
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ marginBottom: 2, fontWeight: 700 }}>
            Ready to Scroll?
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3, color: 'text.secondary' }}>
            Try scrolling down to load more items, or use the navigation dots on the right (desktop)
            to jump to different sections.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={() => scrollToElement('intro')}
            >
              Back to Top
            </Button>
            <Button
              variant="outlined"
              onClick={() => scrollToElement('features')}
            >
              View Features
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
