"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorBoundary = ({ error, reset }: ErrorProps) => {
  return (
    <main className="flex flex-col items-start gap-4 px-6 py-12 mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold text-red-600">Something went wrong.</h1>
      <p className="text-sm text-slate-600">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </main>
  );
};

export default ErrorBoundary;
