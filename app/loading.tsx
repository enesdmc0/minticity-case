const Loading = () => (
  <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12">
    <section className="flex justify-between">
      <div className="h-8 w-72 animate-pulse rounded bg-slate-200" />
      <div className="h-8 w-20 animate-pulse rounded bg-slate-200 self-start" />
    </section>
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {[...Array(5)].map((_, index) => (
        <div
          key={String(index)}
          className="grid grid-cols-6 gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0"
        >
          {[...Array(5)].map((__, cellIndex) => (
            <div key={`${index}-${cellIndex}`} className="h-4 w-full animate-pulse rounded bg-slate-200" />
          ))}
          <div className="flex justify-end">
            <div className="h-6 w-16 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </section>
  </main>
);

export default Loading;
