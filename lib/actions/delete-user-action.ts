"use server";

import { revalidatePath } from "next/cache";
import { deleteLocalUser, markRemoteUserDeleted, findLocalUserById } from "@/lib/local-users";

type DeleteUserResult = {
  success: boolean;
  message?: string;
};

export const deleteUserAction = async (id: number): Promise<DeleteUserResult> => {
  const localUser = await findLocalUserById(id);

  if (localUser) {
    await deleteLocalUser(id);
  } else {
    await markRemoteUserDeleted(id);
  }

  revalidatePath("/");

  return { success: true };
};
