'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import Image from 'next/image';
import { Product } from '@/services/products';
import { formatCurrency } from '@/utils/helpers';
import { useRouter } from 'next/navigation';

/**
 * Product Card Component
 * Premium card with image hover zoom effect
 * Optimized with React.memo
 */

interface ProductCardProps {
  product: Product;
}

const ProductCard = React.memo(({ product }: ProductCardProps) => {
  const router = useRouter();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95))',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #6366F1, #A855F7, #EC4899, #06B6D4)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-12px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2), 0 0 0 1px rgba(6, 182, 212, 0.3)',
          '&::before': {
            opacity: 1,
          },
        },
      }}
      onClick={() => router.push(`/dashboard/products/${product.id}`)}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '75%', // 4:3 aspect ratio
          bgcolor: 'background.default',
          borderRadius: '12px 12px 0 0',
        }}
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          loading="lazy"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15) rotate(1deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        />
        {product.discountPercentage > 0 && (
          <Chip
            label={`-${product.discountPercentage.toFixed(0)}%`}
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: 'bold',
              fontSize: '0.75rem',
              height: 28,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
              animation: 'pulse 2s infinite',
            }}
          />
        )}
        {/* Stock indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: product.stock > 0 ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.7rem',
            fontWeight: 600,
            backdropFilter: 'blur(4px)',
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'currentColor',
            }}
          />
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Box>
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
        <Chip
          label={product.category}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            mb: 1.5,
            textTransform: 'capitalize',
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 26,
            borderRadius: 2,
            bgcolor: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.1))',
            color: 'secondary.main',
            border: '1px solid rgba(6, 182, 212, 0.2)',
          }}
        />

        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '3.2em',
            lineHeight: 1.3,
            color: 'text.primary',
            mb: 1,
          }}
        >
          {product.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Rating
            value={product.rating}
            precision={0.1}
            size="small"
            readOnly
            sx={{
              '& .MuiRating-icon': {
                color: '#F59E0B',
              },
            }}
          />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {product.rating} ({Math.floor(Math.random() * 500) + 50} reviews)
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
            <Typography variant="h5" fontWeight="800" sx={{ color: 'primary.main' }}>
              {formatCurrency(product.price)}
            </Typography>
            {product.discountPercentage > 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                {formatCurrency(product.price / (1 - product.discountPercentage / 100))}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {product.brand}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: product.stock > 10 ? 'success.main' : product.stock > 0 ? 'warning.main' : 'error.main',
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {product.stock > 10 ? 'Available' : product.stock > 0 ? 'Low Stock' : 'Out'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
