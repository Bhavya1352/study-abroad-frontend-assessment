import api from './api';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  image: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
  company: {
    name: string;
    title: string;
    department: string;
  };
  age: number;
  birthDate: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Users API Service
 * Handles all user-related API calls
 */
export const usersService = {
  /**
   * Fetch paginated users list
   */
  getUsers: async (limit = 10, skip = 0): Promise<UsersResponse> => {
    return api.get<UsersResponse>(`/users?limit=${limit}&skip=${skip}`);
  },

  /**
   * Search users by query
   */
  searchUsers: async (query: string, limit = 10): Promise<UsersResponse> => {
    return api.get<UsersResponse>(`/users/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  },

  /**
   * Get single user by ID
   */
  getUserById: async (id: number): Promise<User> => {
    return api.get<User>(`/users/${id}`);
  },
};
