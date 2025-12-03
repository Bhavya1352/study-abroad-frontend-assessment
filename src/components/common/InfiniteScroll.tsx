'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface InfiniteScrollProps {
  onLoadMore: () => void | Promise<void>;
  isLoading: boolean;
  hasMore: boolean;
  threshold?: number;
  children: React.ReactNode;
}

export default function InfiniteScroll({
  onLoadMore,
  isLoading,
  hasMore,
  threshold = 200,
  children,
}: InfiniteScrollProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading && hasMore) {
        onLoadMore();
      }
    },
    [onLoadMore, isLoading, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleIntersection, threshold]);

  return (
    <Box ref={containerRef}>
      {children}
      
      {/* Loader at the bottom */}
      <Box
        ref={loaderRef}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          minHeight: 100,
        }}
      >
        {isLoading && hasMore && (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={40} />
            <Box sx={{ marginTop: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
              Loading more...
            </Box>
          </Box>
        )}
        {!hasMore && (
          <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
            No more items to load
          </Box>
        )}
      </Box>
    </Box>
  );
}
