"use client";

import { useOptimistic as useOptimistic, useState } from "react";
import { useTransition } from "react";
import { deleteUserAction } from "@/lib/actions/delete-user-action";
import { ERROR_MESSAGES } from "@/lib/constants";

type DeleteUserButtonProps = {
  userId: number;
};

const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [isDeleted, setOptimisticDeleted] = useOptimistic(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = () => {
    startTransition(() => {
      setOptimisticDeleted(true);
      deleteUserAction(userId).then((result) => {
        if (!result.success) {
          setOptimisticDeleted(false);
          setErrorMessage(ERROR_MESSAGES.deleteUser);
        } else {
          setErrorMessage(null);
        }
      });
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending || isDeleted}
        className="rounded border border-red-200 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isDeleted ? "Deleted" : isPending ? "Deleting..." : "Delete"}
      </button>
      {errorMessage ? (
        <span className="text-[10px] font-medium text-red-600">{errorMessage}</span>
      ) : null}
    </div>
  );
};

export default DeleteUserButton;
