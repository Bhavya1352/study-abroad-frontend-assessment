'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import { useUserStore } from '@/store/userStore';
import UserTable from '@/components/users/UserTable';
import SearchBar from '@/components/common/SearchBar';
import PaginationControls from '@/components/common/PaginationControls';
import { TableSkeleton } from '@/components/common/LoadingSkeleton';
import { ITEMS_PER_PAGE } from '@/utils/constants';

/**
 * Users List Page
 * Features:
 * - Debounced search
 * - Pagination
 * - Caching
 * - Loading states
 * - Error handling
 */

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');

  const users = useUserStore((state) => state.users);
  const total = useUserStore((state) => state.total);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const searchUsers = useUserStore((state) => state.searchUsers);

  // Fetch users on mount and when pagination changes
  useEffect(() => {
    if (!searchQuery) {
      const skip = (page - 1) * rowsPerPage;
      fetchUsers(rowsPerPage, skip);
    }
  }, [page, rowsPerPage, searchQuery, fetchUsers]);

  // Handle search with debouncing (handled in SearchBar component)
  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setPage(1); // Reset to first page on search

      if (query.trim()) {
        searchUsers(query, 100); // Get more results for search
      } else {
        fetchUsers(rowsPerPage, 0);
      }
    },
    [searchUsers, fetchUsers, rowsPerPage]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="800"
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          👥 Users Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Manage and view all users in the system with advanced search and filtering
        </Typography>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search users by name, email, or username..."
        />
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Users Table */}
      {isLoading ? (
        <Paper sx={{ p: 3 }}>
          <TableSkeleton />
        </Paper>
      ) : (
        <>
          <UserTable users={users} />

          {/* Pagination */}
          {!searchQuery && total > 0 && (
            <Paper sx={{ mt: 2, p: 2 }}>
              <PaginationControls
                total={total}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </Paper>
          )}

          {searchQuery && users.length > 0 && (
            <Paper sx={{ mt: 2, p: 2 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                Found {users.length} result(s) for "{searchQuery}"
              </Typography>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
}
