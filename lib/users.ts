import { USERS_ENDPOINT, ERROR_MESSAGES } from "./constants";
import { User } from "./types";

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
    throw new Error(ERROR_MESSAGES.fetchUsers);
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
    throw new Error(ERROR_MESSAGES.fetchUser);
  }

  const data: User = await response.json();
  return data;
};
