"use server";

import { revalidatePath } from "next/cache";
import { saveLocalUser } from "@/lib/local-users";
import type { User } from "@/lib/types";

export type CreateUserFormState = {
  success: boolean;
  message: string;
};

const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export const createUserAction = async (
  _prevState: CreateUserFormState,
  formData: FormData,
): Promise<CreateUserFormState> => {
  const name = formData.get("name")?.toString().trim();
  const username = formData.get("username")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const company = formData.get("company")?.toString().trim();

  if (!name || !username || !email || !phone || !company) {
    return { success: false, message: "All fields are required." };
  }

  if (!validateEmail(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const newUser: User = {
    id: Date.now(),
    name,
    username,
    email,
    phone,
    website: "N/A",
    address: {
      street: "N/A",
      suite: "N/A",
      city: "N/A",
      zipcode: "N/A",
      geo: { lat: "0", lng: "0" },
    },
    company: {
      name: company,
      catchPhrase: "Custom entry",
      bs: "local-user",
    },
  };

  await saveLocalUser(newUser);
  revalidatePath("/");

  return { success: true, message: "User created successfully." };
};
