import { User } from './types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const USERS_ENDPOINT = `${API_BASE_URL}/users`;

const defaultFetchOptions: RequestInit = {
  // Always fetch fresh data for SSR pages.
  cache: 'no-store',
};

type FetchUsersParams = {
  signal?: AbortSignal;
};

export const fetchUsers = async ({ signal }: FetchUsersParams = {}): Promise<User[]> => {
  const response = await fetch(USERS_ENDPOINT, {
    ...defaultFetchOptions,
    signal,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data: User[] = await response.json();
  return data;
};

type FetchUserParams = {
  id: number;
  signal?: AbortSignal;
};

export const fetchUserById = async ({ id, signal }: FetchUserParams): Promise<User> => {
  const response = await fetch(`${USERS_ENDPOINT}/${id}`, {
    ...defaultFetchOptions,
    signal,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  const data: User = await response.json();
  return data;
};
