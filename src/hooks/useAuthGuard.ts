'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/utils/constants';

/**
 * Auth Guard Hook
 * Protects routes by redirecting unauthenticated users to login
 * 
 * Usage:
 * useAuthGuard(); // Call at the top of protected pages
 */
export function useAuthGuard() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, router]);

  return { isAuthenticated };
}
