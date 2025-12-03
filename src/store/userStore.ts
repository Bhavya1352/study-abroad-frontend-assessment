import { create } from 'zustand';
import { usersService, type User, type UsersResponse } from '@/services/users';
import { CACHE_DURATION } from '@/utils/constants';
import { isCacheValid } from '@/utils/helpers';

/**
 * Users Store with Zustand
 * 
 * Features:
 * - Client-side caching to reduce API calls
 * - Loading and error states
 * - Pagination support
 * - Search functionality
 * - Cache invalidation based on time
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  total: number;
  isLoading: boolean;
  error: string | null;
  
  // Cache for lists (key: "limit-skip" or "search-query")
  listCache: Map<string, CacheEntry<UsersResponse>>;
  // Cache for individual users (key: userId)
  userCache: Map<number, CacheEntry<User>>;
  
  // Actions
  fetchUsers: (limit?: number, skip?: number, forceRefresh?: boolean) => Promise<void>;
  searchUsers: (query: string, limit?: number, forceRefresh?: boolean) => Promise<void>;
  fetchUserById: (id: number, forceRefresh?: boolean) => Promise<void>;
  clearError: () => void;
  clearCache: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  currentUser: null,
  total: 0,
  isLoading: false,
  error: null,
  listCache: new Map(),
  userCache: new Map(),

  /**
   * Fetch paginated users with caching
   * Cache Strategy: Cache results for 5 minutes to avoid redundant API calls
   */
  fetchUsers: async (limit = 10, skip = 0, forceRefresh = false) => {
    const cacheKey = `${limit}-${skip}`;
    const cached = get().listCache.get(cacheKey);
    
    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && cached && isCacheValid(cached.timestamp, CACHE_DURATION)) {
      set({
        users: cached.data.users,
        total: cached.data.total,
        error: null,
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await usersService.getUsers(limit, skip);
      
      // Update cache
      const newCache = new Map(get().listCache);
      newCache.set(cacheKey, {
        data: response,
        timestamp: Date.now(),
      });

      set({
        users: response.users,
        total: response.total,
        listCache: newCache,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users';
      set({
        users: [],
        total: 0,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  /**
   * Search users by query with caching
   */
  searchUsers: async (query: string, limit = 10, forceRefresh = false) => {
    const cacheKey = `search-${query}-${limit}`;
    const cached = get().listCache.get(cacheKey);
    
    // Return cached data if valid
    if (!forceRefresh && cached && isCacheValid(cached.timestamp, CACHE_DURATION)) {
      set({
        users: cached.data.users,
        total: cached.data.total,
        error: null,
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await usersService.searchUsers(query, limit);
      
      // Update cache
      const newCache = new Map(get().listCache);
      newCache.set(cacheKey, {
        data: response,
        timestamp: Date.now(),
      });

      set({
        users: response.users,
        total: response.total,
        listCache: newCache,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search users';
      set({
        users: [],
        total: 0,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  /**
   * Fetch single user by ID with caching
   */
  fetchUserById: async (id: number, forceRefresh = false) => {
    const cached = get().userCache.get(id);
    
    // Return cached data if valid
    if (!forceRefresh && cached && isCacheValid(cached.timestamp, CACHE_DURATION)) {
      set({
        currentUser: cached.data,
        error: null,
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const user = await usersService.getUserById(id);
      
      // Update cache
      const newCache = new Map(get().userCache);
      newCache.set(id, {
        data: user,
        timestamp: Date.now(),
      });

      set({
        currentUser: user,
        userCache: newCache,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user';
      set({
        currentUser: null,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  /**
   * Clear error state
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Clear all caches (useful when data needs to be refreshed)
   */
  clearCache: () => {
    set({
      listCache: new Map(),
      userCache: new Map(),
    });
  },
}));

// Optimized selectors to prevent unnecessary re-renders
export const selectUsers = (state: UserState) => state.users;
export const selectCurrentUser = (state: UserState) => state.currentUser;
export const selectTotal = (state: UserState) => state.total;
export const selectIsLoading = (state: UserState) => state.isLoading;
export const selectError = (state: UserState) => state.error;
