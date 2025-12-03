export const API_BASE_URL = "https://jsonplaceholder.typicode.com";
export const USERS_ENDPOINT = `${API_BASE_URL}/users`;

export const ERROR_MESSAGES = {
  fetchUsers: "Failed to fetch users",
  fetchUser: "Failed to fetch user",
  deleteUser: "Failed to delete user. Please try again.",
} as const;
