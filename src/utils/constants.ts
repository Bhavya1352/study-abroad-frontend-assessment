// API Constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dummyjson.com';

// Pagination Constants
export const ITEMS_PER_PAGE = 10;
export const DEFAULT_SKIP = 0;

// Cache Duration (5 minutes)
export const CACHE_DURATION = 5 * 60 * 1000;

// Debounce Delay (ms)
export const SEARCH_DEBOUNCE_DELAY = 500;

// Local Storage Keys
export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_DATA_KEY = 'user_data';
export const THEME_MODE_KEY = 'theme_mode';

// Routes
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: '/dashboard/users',
  PRODUCTS: '/dashboard/products',
};

// Protected Routes
export const PROTECTED_ROUTES = ['/dashboard'];
