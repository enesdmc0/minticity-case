import Link from 'next/link';
import UsersTable from '@/components/users-table';
import { fetchUsers } from '@/lib/users';

const Home = async () => {
  const users = await fetchUsers();

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">
          Team directory
        </h1>

        <Link
          href="/users/new"
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          New User
        </Link>
      </header>

      <UsersTable users={users} />
    </main>
  );
};

export default Home;
