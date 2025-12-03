'use client';

import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
} from '@mui/material';
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
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
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
        }}
      >
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
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
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Chip
          label={product.category}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            mb: 1,
            textTransform: 'capitalize',
          }}
        />

        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '3.2em',
          }}
        >
          {product.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating value={product.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({product.rating})
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            {formatCurrency(product.price)}
          </Typography>
          {product.stock > 0 ? (
            <Typography variant="body2" color="success.main">
              In Stock ({product.stock})
            </Typography>
          ) : (
            <Typography variant="body2" color="error.main">
              Out of Stock
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
