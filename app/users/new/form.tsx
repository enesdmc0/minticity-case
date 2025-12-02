'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { createUserAction } from './actions';

const CreateUserForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createUserAction, {
    success: false,
    message: '',
  });

  useEffect(() => {
    if (state.success) {
      router.push('/');
    }
  }, [state.success, router]);

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Full name
          <input
            required
            name="name"
            type="text"
            className="rounded border border-slate-300 px-3 py-2 text-base text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Username
          <input
            required
            name="username"
            type="text"
            className="rounded border border-slate-300 px-3 py-2 text-base text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Email
          <input
            required
            name="email"
            type="email"
            className="rounded border border-slate-300 px-3 py-2 text-base text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Phone
          <input
            required
            name="phone"
            type="text"
            className="rounded border border-slate-300 px-3 py-2 text-base text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </label>
        <label className="sm:col-span-2 flex flex-col gap-2 text-sm font-medium text-slate-700">
          Company name
          <input
            required
            name="company"
            type="text"
            className="rounded border border-slate-300 px-3 py-2 text-base text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </label>
      </div>

      {state.message && !state.success ? (
        <p className="mt-4 text-sm font-medium text-red-600">{state.message}</p>
      ) : null}

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="rounded border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Creating...' : 'Create user'}
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;
