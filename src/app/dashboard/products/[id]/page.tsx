'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Rating,
  Divider,
  Alert,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import { DetailSkeleton } from '@/components/common/LoadingSkeleton';
import { formatCurrency } from '@/utils/helpers';

/**
 * Product Detail Page
 * Features:
 * - Image carousel
 * - Two-column layout
 * - Product specifications
 * - Reviews section
 */

interface ProductDetailPageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const productId = parseInt(params.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentProduct = useProductStore((state) => state.currentProduct);
  const isLoading = useProductStore((state) => state.isLoading);
  const error = useProductStore((state) => state.error);
  const fetchProductById = useProductStore((state) => state.fetchProductById);

  useEffect(() => {
    fetchProductById(productId);
  }, [productId, fetchProductById]);

  const handlePrevImage = () => {
    if (currentProduct?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? currentProduct.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (currentProduct?.images) {
      setCurrentImageIndex((prev) =>
        prev === currentProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (isLoading) {
    return (
      <Box>
        <DetailSkeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/dashboard/products')}
        >
          Back to Products
        </Button>
      </Box>
    );
  }

  if (!currentProduct) {
    return (
      <Box>
        <Alert severity="info">Product not found</Alert>
      </Box>
    );
  }

  const images = currentProduct.images || [currentProduct.thumbnail];

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/dashboard/products')}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Grid container spacing={4}>
        {/* Left Column - Images */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              position: 'relative',
              bgcolor: 'background.default',
            }}
          >
            {/* Main Image Carousel */}
            <Box
              sx={{
                position: 'relative',
                paddingTop: '100%',
                overflow: 'hidden',
                borderRadius: 2,
                bgcolor: 'background.paper',
              }}
            >
              <Box
                component="img"
                src={images[currentImageIndex]}
                alt={currentProduct.title}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{
                      position: 'absolute',
                      left: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'background.paper', opacity: 0.9 },
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'background.paper', opacity: 0.9 },
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </>
              )}
            </Box>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  mt: 2,
                  overflowX: 'auto',
                  pb: 1,
                }}
              >
                {images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    sx={{
                      minWidth: 80,
                      height: 80,
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: 2,
                      borderColor:
                        index === currentImageIndex ? 'primary.main' : 'transparent',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.light',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt={`${currentProduct.title} ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Right Column - Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Chip
              label={currentProduct.category}
              sx={{ mb: 2, textTransform: 'capitalize' }}
            />

            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {currentProduct.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              Brand: {currentProduct.brand}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={currentProduct.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({currentProduct.rating})
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
                {formatCurrency(currentProduct.price)}
              </Typography>
              {currentProduct.discountPercentage > 0 && (
                <Chip
                  label={`Save ${currentProduct.discountPercentage.toFixed(0)}%`}
                  color="error"
                  size="small"
                />
              )}
            </Box>

            <Typography variant="body1" color="text.secondary" paragraph>
              {currentProduct.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Stock Status */}
            <Box sx={{ mb: 3 }}>
              {currentProduct.stock > 0 ? (
                <Chip label={`${currentProduct.stock} in stock`} color="success" />
              ) : (
                <Chip label="Out of stock" color="error" />
              )}
            </Box>

            {/* Features */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocalShippingIcon color="primary" />
                <Typography variant="body2">
                  {currentProduct.shippingInformation || 'Free shipping available'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <VerifiedUserIcon color="primary" />
                <Typography variant="body2">
                  {currentProduct.warrantyInformation || '1 year warranty'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AssignmentReturnIcon color="primary" />
                <Typography variant="body2">
                  {currentProduct.returnPolicy || '30 days return policy'}
                </Typography>
              </Box>
            </Box>

            {/* Product Tags */}
            {currentProduct.tags && currentProduct.tags.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tags:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {currentProduct.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}
          </Paper>

          {/* Reviews Section */}
          {currentProduct.reviews && currentProduct.reviews.length > 0 && (
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Customer Reviews
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {currentProduct.reviews.slice(0, 3).map((review, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {review.reviewerName}
                    </Typography>
                    <Rating value={review.rating} size="small" readOnly />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {review.comment}
                  </Typography>
                  {index < currentProduct.reviews!.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
