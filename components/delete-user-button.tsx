"use client";

import { useOptimistic as useOptimistic } from "react";
import { useTransition } from "react";
import { deleteUserAction } from "@/lib/actions/delete-user-action";

type DeleteUserButtonProps = {
  userId: number;
};

const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [isDeleted, setOptimisticDeleted] = useOptimistic(false);

  const handleDelete = () => {
    startTransition(() => {
      setOptimisticDeleted(true);
      deleteUserAction(userId).then((result) => {
        if (!result.success) {
          setOptimisticDeleted(false);
          alert("Failed to delete user. Please try again.");
        }
      });
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending || isDeleted}
      className="rounded border border-red-200 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleted ? "Deleted" : isPending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteUserButton;
