'use client';

import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { User } from '@/services/users';
import { useRouter } from 'next/navigation';

/**
 * Users Table Component
 * Displays users in a professional table with hover effects
 * Optimized with React.memo and useMemo
 */

interface UserTableProps {
  users: User[];
}

const UserTable = React.memo(({ users }: UserTableProps) => {
  const router = useRouter();

  const tableData = useMemo(() => users, [users]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'background.default',
              '& th': {
                fontWeight: 600,
                color: 'text.primary',
              },
            }}
          >
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Company</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body2" color="text.secondary" py={4}>
                  No users found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                    cursor: 'pointer',
                  },
                  transition: 'background-color 0.2s',
                }}
                onClick={() => router.push(`/dashboard/users/${user.id}`)}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={user.image} alt={user.firstName}>
                      {user.firstName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {user.id}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.phone}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.gender}
                    size="small"
                    color={user.gender === 'male' ? 'primary' : 'secondary'}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {user.company.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.company.title}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/users/${user.id}`);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

UserTable.displayName = 'UserTable';

export default UserTable;
