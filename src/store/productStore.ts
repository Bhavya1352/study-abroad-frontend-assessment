import { create } from 'zustand';
import { productsService, type Product, type ProductsResponse, type Category } from '@/services/products';
import { CACHE_DURATION } from '@/utils/constants';
import { isCacheValid } from '@/utils/helpers';

/**
 * Products Store with Zustand
 * 
 * Features:
 * - Client-side caching for better performance
 * - Category filtering support
 * - Search functionality
 * - Pagination
 * - Loading and error states
 * - Cache invalidation strategy
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  categories: Category[];
  total: number;
  isLoading: boolean;
  error: string | null;
  
  // Cache for product lists
  listCache: Map<string, CacheEntry<ProductsResponse>>;
  // Cache for individual products
  productCache: Map<number, CacheEntry<Product>>;
  // Cache for categories
  categoriesCache: CacheEntry<Category[]> | null;
  
  // Actions
  fetchProducts: (limit?: number, skip?: number, forceRefresh?: boolean) => Promise<void>;
  searchProducts: (query: string, limit?: number, forceRefresh?: boolean) => Promise<void>;
  fetchProductsByCategory: (category: string, limit?: number, skip?: number, forceRefresh?: boolean) => Promise<void>;
  fetchProductById: (id: number, forceRefresh?: boolean) => Promise<void>;
  fetchCategories: (forceRefresh?: boolean) => Promise<void>;
  clearError: () => void;
  clearCache: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  currentProduct: null,
  categories: [],
  total: 0,
  isLoading: false,
  error: null,
  listCache: new Map(),
  productCache: new Map(),
  categoriesCache: null,

  /**
   * Fetch paginated products with caching
   * Cache Strategy: Results are cached for 5 minutes to reduce API load
   */
  fetchProducts: async (limit = 10, skip = 0, forceRefresh = false) => {
    const cacheKey = `all-${limit}-${skip}`;
    const cached = get().listCache.get(cacheKey);
    
    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && cached && isCacheValid(cached.timestamp, CACHE_DURATION)) {
      set({
        products: cached.data.products,
        total: cached.data.total,
        error: null,
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await productsService.getProducts(limit, skip);
      
      // Update cache
      const newCache = new Map(get().listCache);
      newCache.set(cacheKey, {
        data: response,
        timestamp: Date.now(),
      });

      set({
        products: response.products,
        total: response.total,
        listCache: newCache,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
      set({
        products: [],
        total: 0,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  /**
   * Search products by query with caching
   */
  searchProducts: async (query: string, limit = 10, forceRefresh = false) => {
    const cacheKey = `search-${query}-${limit}`;
    const cached = get().listCache.get(cacheKey);
    
    // Return cached data if valid
    if (!forceRefresh && cached && isCacheValid(cached.timestamp, CACHE_DURATION)) {
      set({
        products: cached.data.products,
        total: cached.data.total,
        error: null,
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await productsService.searchProducts(query, limit);
      
      // Update cache
      const newCache = new Map(get().listCache);
      newCache.set(cacheKey, {
        data: response,
        timestamp: Date.now(),
      });

      set({
        products: response.products,
        total: response.total,
        listCache: newCache,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search products';
      set({
        products: [],
        total: 0,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  /**
   * Fetch products by category with caching
   */
  fetchProductsByCategory: async (category: string, limit = 10, skip = 0, forceRefresh = false) => {
    const cacheKey = `category-${category}-${limit}-${skip}`;
    const cached = get().listCache.get(cacheKey);
    
    // Return cached data if valid
    if (!forceRefresh && cached && isCacheValid(cached.timestamp, CACHE_DURATION)) {
      set({
        products: cached.data.products,
        total: cached.data.total,
        error: null,
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await productsService.getProductsByCategory(category, limit, skip);
      
      // Update cache
      const newCache = new Map(get().listCache);
      newCache.set(cacheKey, {
        data: response,
        timestamp: Date.now(),
      });

      set({
        products: response.products,
        total: response.total,
        listCache: newCache,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products by category';
      set({
        products: [],
        total: 0,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  /**
   * Fetch single product by ID with caching
   */
  fetchProductById: async (id: number, forceRefresh = false) => {
    const cached = get().productCache.get(id);
    
    // Return cached data if valid
    if (!forceRefresh && cached && isCacheValid(cached.timestamp, CACHE_DURATION)) {
      set({
        currentProduct: cached.data,
        error: null,
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const product = await productsService.getProductById(id);
      
      // Update cache
      const newCache = new Map(get().productCache);
      newCache.set(id, {
        data: product,
        timestamp: Date.now(),
      });

      set({
        currentProduct: product,
        productCache: newCache,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
      set({
        currentProduct: null,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  /**
   * Fetch all categories with caching
   */
  fetchCategories: async (forceRefresh = false) => {
    const cached = get().categoriesCache;
    
    // Return cached data if valid
    if (!forceRefresh && cached && isCacheValid(cached.timestamp, CACHE_DURATION)) {
      set({
        categories: cached.data,
        error: null,
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const categories = await productsService.getCategories();
      
      set({
        categories,
        categoriesCache: {
          data: categories,
          timestamp: Date.now(),
        },
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      set({
        categories: [],
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
   * Clear all caches
   */
  clearCache: () => {
    set({
      listCache: new Map(),
      productCache: new Map(),
      categoriesCache: null,
    });
  },
}));

// Optimized selectors
export const selectProducts = (state: ProductState) => state.products;
export const selectCurrentProduct = (state: ProductState) => state.currentProduct;
export const selectCategories = (state: ProductState) => state.categories;
export const selectTotal = (state: ProductState) => state.total;
export const selectIsLoading = (state: ProductState) => state.isLoading;
export const selectError = (state: ProductState) => state.error;
