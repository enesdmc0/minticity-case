import Link from 'next/link';
import UserForm from '@/components/user-form';

const CreateUserPage = () => {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Link
          href="/"
          className="text-sm font-semibold text-gray-600 hover:underline"
        >
          ← Back to list
        </Link>
        <h1 className="text-3xl font-semibold text-slate-900">
          Create a new user
        </h1>
      </div>

      <UserForm mode="create" />
    </main>
  );
};

export default CreateUserPage;
