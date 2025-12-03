import api from './api';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  reviews?: Review[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

/**
 * Products API Service
 * Handles all product-related API calls
 */
export const productsService = {
  /**
   * Fetch paginated products list
   */
  getProducts: async (limit = 10, skip = 0): Promise<ProductsResponse> => {
    return api.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
  },

  /**
   * Search products by query
   */
  searchProducts: async (query: string, limit = 10): Promise<ProductsResponse> => {
    return api.get<ProductsResponse>(
      `/products/search?q=${encodeURIComponent(query)}&limit=${limit}`
    );
  },

  /**
   * Get products by category
   */
  getProductsByCategory: async (
    category: string,
    limit = 10,
    skip = 0
  ): Promise<ProductsResponse> => {
    return api.get<ProductsResponse>(
      `/products/category/${category}?limit=${limit}&skip=${skip}`
    );
  },

  /**
   * Get single product by ID
   */
  getProductById: async (id: number): Promise<Product> => {
    return api.get<Product>(`/products/${id}`);
  },

  /**
   * Get all categories
   */
  getCategories: async (): Promise<Category[]> => {
    return api.get<Category[]>('/products/categories');
  },
};
