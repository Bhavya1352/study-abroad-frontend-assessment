'use client';

import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useUIStore } from '@/store/uiStore';

/**
 * Toast Container Component
 * Displays toast notifications using MUI Snackbar
 * Manages multiple toasts with auto-dismiss
 */
export default function ToastContainer() {
  const toasts = useUIStore((state) => state.toasts);
  const removeToast = useUIStore((state) => state.removeToast);

  return (
    <>
      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          style={{ top: `${80 + index * 70}px` }}
        >
          <Alert
            onClose={() => removeToast(toast.id)}
            severity={toast.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
