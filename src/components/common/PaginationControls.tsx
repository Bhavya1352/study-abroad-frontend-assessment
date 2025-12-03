'use client';

import React, { useMemo } from 'react';
import { Box, Pagination, Typography, Select, MenuItem, FormControl } from '@mui/material';

/**
 * Pagination Controls Component
 * Features:
 * - Page navigation
 * - Items per page selector
 * - Total items display
 * - Optimized with useMemo
 */

interface PaginationControlsProps {
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
}

const PaginationControls = React.memo(({
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
}: PaginationControlsProps) => {
  const totalPages = useMemo(() => Math.ceil(total / rowsPerPage), [total, rowsPerPage]);
  
  const startItem = useMemo(() => (page - 1) * rowsPerPage + 1, [page, rowsPerPage]);
  const endItem = useMemo(() => Math.min(page * rowsPerPage, total), [page, rowsPerPage, total]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        py: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {startItem} to {endItem} of {total} entries
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {onRowsPerPageChange && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Rows per page:
            </Typography>
            <FormControl size="small">
              <Select
                value={rowsPerPage}
                onChange={(e) => onRowsPerPageChange(e.target.value as number)}
                sx={{ minWidth: 70 }}
              >
                {rowsPerPageOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
});

PaginationControls.displayName = 'PaginationControls';

export default PaginationControls;
