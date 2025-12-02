const UserDetailLoading = () => (
  <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
    <div className="flex flex-col gap-2">
      <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
      <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
    </div>
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default UserDetailLoading;
