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
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95))',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
              '& th': {
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderBottom: '2px solid rgba(99, 102, 241, 0.2)',
                py: 2,
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
                <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6" color="text.secondary" fontWeight={500}>
                    No users found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your search criteria
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{
                  '&:hover': {
                    bgcolor: 'linear-gradient(90deg, rgba(99, 102, 241, 0.05), rgba(6, 182, 212, 0.05))',
                    cursor: 'pointer',
                    transform: 'translateX(4px)',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  borderBottom: '1px solid rgba(99, 102, 241, 0.08)',
                  '&:nth-of-type(even)': {
                    bgcolor: 'rgba(99, 102, 241, 0.02)',
                  },
                }}
                onClick={() => router.push(`/dashboard/users/${user.id}`)}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                    <Avatar
                      src={user.image}
                      alt={user.firstName}
                      sx={{
                        width: 48,
                        height: 48,
                        border: '3px solid',
                        borderColor: user.gender === 'male' ? 'primary.main' : 'secondary.main',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
                        },
                      }}
                    >
                      {user.firstName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight={700} color="text.primary">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        ID: {user.id}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500} color="text.primary">
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500} color="text.primary">
                    {user.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.gender}
                    size="small"
                    color={user.gender === 'male' ? 'primary' : 'secondary'}
                    sx={{
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 28,
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    {user.company.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
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
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'scale(1.1)',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                      },
                    }}
                  >
                    <VisibilityIcon sx={{ fontSize: 18 }} />
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
