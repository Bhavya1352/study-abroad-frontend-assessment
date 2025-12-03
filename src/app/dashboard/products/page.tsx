'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Box, Paper, FormControl, Select, MenuItem, Alert, Chip, Typography } from '@mui/material';
import { useProductStore } from '@/store/productStore';
import ProductCard from '@/components/products/ProductCard';
import SearchBar from '@/components/common/SearchBar';
import PaginationControls from '@/components/common/PaginationControls';
import { GridSkeleton } from '@/components/common/LoadingSkeleton';
import { ITEMS_PER_PAGE } from '@/utils/constants';

/**
 * Products List Page
 * Features:
 * - Responsive grid layout
 * - Category filter
 * - Debounced search
 * - Pagination
 * - Caching
 * - Performance optimized
 */

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const products = useProductStore((state) => state.products);
  const categories = useProductStore((state) => state.categories);
  const total = useProductStore((state) => state.total);
  const isLoading = useProductStore((state) => state.isLoading);
  const error = useProductStore((state) => state.error);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const searchProducts = useProductStore((state) => state.searchProducts);
  const fetchProductsByCategory = useProductStore((state) => state.fetchProductsByCategory);
  const fetchCategories = useProductStore((state) => state.fetchCategories);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch products based on filters
  useEffect(() => {
    if (searchQuery) {
      return; // Don't fetch if searching
    }

    const skip = (page - 1) * rowsPerPage;

    if (selectedCategory === 'all') {
      fetchProducts(rowsPerPage, skip);
    } else {
      fetchProductsByCategory(selectedCategory, rowsPerPage, skip);
    }
  }, [page, rowsPerPage, selectedCategory, searchQuery, fetchProducts, fetchProductsByCategory]);

  // Handle search
  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setPage(1);
      setSelectedCategory('all');

      if (query.trim()) {
        searchProducts(query, 100);
      } else {
        fetchProducts(rowsPerPage, 0);
      }
    },
    [searchProducts, fetchProducts, rowsPerPage]
  );

  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  }, []);

  // Memoize category chips
  const categoryChips = useMemo(() => {
    return [
      { slug: 'all', name: 'All Products' },
      ...categories.map((cat) => ({
        slug: cat.slug,
        name: cat.name || cat.slug,
      })),
    ];
  }, [categories]);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="800"
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #06B6D4 0%, #10B981 50%, #F59E0B 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          🛍️ Products Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Browse and manage all products with advanced category filters and search
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2, mb: 0, alignItems: 'center' }}>
          <Box>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search products by name, brand, or category..."
            />
          </Box>
          <Box>
            <FormControl fullWidth>
              <Select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value as string)}
                displayEmpty
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.slug} value={category.slug}>
                    {category.name || category.slug}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Category Chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {categoryChips.slice(0, 10).map((category) => (
            <Chip
              key={category.slug}
              label={category.name}
              onClick={() => handleCategoryChange(category.slug)}
              color={selectedCategory === category.slug ? 'primary' : 'default'}
              sx={{
                textTransform: 'capitalize',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: selectedCategory === category.slug ? 'primary.dark' : 'action.hover',
                },
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Products Grid */}
      {isLoading ? (
        <GridSkeleton count={rowsPerPage} />
      ) : (
        <>
          {products.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No products found
              </Typography>
            </Paper>
          ) : (
            <>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
                {products.map((product) => (
                  <Box key={product.id}>
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Box>

              {/* Pagination */}
              {!searchQuery && total > 0 && (
                <Paper sx={{ mt: 3, p: 2 }}>
                  <PaginationControls
                    total={total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                  />
                </Paper>
              )}

              {searchQuery && products.length > 0 && (
                <Paper sx={{ mt: 3, p: 2 }}>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Found {products.length} result(s) for "{searchQuery}"
                  </Typography>
                </Paper>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
}
