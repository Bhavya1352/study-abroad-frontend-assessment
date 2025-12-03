import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * UI Store for global UI state
 * - Theme mode (dark/light)
 * - Toast notifications
 * - Sidebar state
 */

export interface Toast {
  id: string;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface UIState {
  themeMode: 'light' | 'dark';
  sidebarOpen: boolean;
  toasts: Toast[];
  
  // Actions
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      themeMode: 'light',
      sidebarOpen: true,
      toasts: [],

      toggleTheme: () => {
        set((state) => ({
          themeMode: state.themeMode === 'light' ? 'dark' : 'light',
        }));
      },

      setThemeMode: (mode: 'light' | 'dark') => {
        set({ themeMode: mode });
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open });
      },

      addToast: (toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(7);
        set((state) => ({
          toasts: [...state.toasts, { ...toast, id }],
        }));

        // Auto-remove after duration (default 5s)
        const duration = toast.duration || 5000;
        setTimeout(() => {
          get().removeToast(id);
        }, duration);
      },

      removeToast: (id: string) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

// Selectors
export const selectThemeMode = (state: UIState) => state.themeMode;
export const selectSidebarOpen = (state: UIState) => state.sidebarOpen;
export const selectToasts = (state: UIState) => state.toasts;
