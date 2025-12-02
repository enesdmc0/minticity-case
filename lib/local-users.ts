import { cookies } from "next/headers";
import type { User } from "./types";

const LOCAL_USERS_COOKIE = "minticity_local_users";

const readLocalUsers = async (): Promise<User[]> => {
  const cookieStore = await cookies();
  const store = cookieStore.get(LOCAL_USERS_COOKIE)?.value;

  if (!store) return [];

  try {
    return JSON.parse(store) as User[];
  } catch {
    return [];
  }
};

export const getLocalUsers = async (): Promise<User[]> => {
  return readLocalUsers();
};

export const findLocalUserById = async (id: number): Promise<User | undefined> => {
  const users = await readLocalUsers();
  return users.find((user) => user.id === id);
};

export const saveLocalUser = async (user: User): Promise<void> => {
  const cookieStore = await cookies();
  const current = await readLocalUsers();
  const nextUsers = [user, ...current];

  cookieStore.set(LOCAL_USERS_COOKIE, JSON.stringify(nextUsers), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
};
