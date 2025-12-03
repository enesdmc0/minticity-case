"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import type { User } from "@/lib/types";
import { createUserAction } from "@/app/users/new/actions";

type UserFormProps = {
  mode: "create" | "view";
  user?: User;
};

type UserFormField = {
  label: string;
  name: "name" | "username" | "email" | "phone" | "company";
  type?: string;
  colSpan?: "single" | "full";
};

const userFormFields: UserFormField[] = [
  { label: "Full name", name: "name" },
  { label: "Username", name: "username" },
  { label: "Email", name: "email", type: "email" },
  { label: "Phone", name: "phone" },
  { label: "Company name", name: "company", colSpan: "full" },
];

const UserForm = ({ mode, user }: UserFormProps) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createUserAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state.success, router]);

  const initial = user ?? {
    name: "",
    username: "",
    email: "",
    phone: "",
    company: {
      name: "",
    },
  };
  const readOnly = mode === "view";

  return (
    <form
      action={mode === "create" ? formAction : undefined}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {userFormFields.map((field) => {
          const { name, label, type = "text", colSpan } = field;
          const value = name === "company" ? initial.company?.name ?? "" : initial[name];
          return (
            <label
              key={name}
              className={`flex flex-col gap-2 text-sm font-medium text-slate-700 ${
                colSpan === "full" ? "sm:col-span-2" : ""
              }`}
            >
              {label}
              <input
                required
                name={name}
                type={type}
                defaultValue={value}
                readOnly={readOnly}
                className="rounded border border-slate-300 px-3 py-2 text-base text-slate-900 focus:border-indigo-500 focus:outline-none disabled:opacity-70"
              />
            </label>
          );
        })}
      </div>

      {mode === "create" ? (
        <>
          {state.message && !state.success ? (
            <p className="mt-4 text-sm font-medium text-red-600">{state.message}</p>
          ) : null}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Creating..." : "Create user"}
            </button>
          </div>
        </>
      ) : null}
    </form>
  );
};

export default UserForm;
