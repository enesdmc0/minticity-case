import Link from "next/link";
import { notFound } from "next/navigation";
import UserForm from "@/components/user-form";
import { findLocalUserById, getDeletedUserIds } from "@/lib/local-users";
import { fetchUserById } from "@/lib/users";
import type { User } from "@/lib/types";

type UserDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const UserDetailPage = async ({ params }: UserDetailPageProps) => {
  const { id } = await params;
  const userId = Number(id);

  if (Number.isNaN(userId)) {
    notFound();
  }

  let user: User | undefined;
  try {
    user = await fetchUserById({ id: userId });
  } catch {
    const deletedIds = await getDeletedUserIds();
    if (deletedIds.includes(userId)) {
      notFound();
    }
    user = await findLocalUserById(userId);
  }

  if (!user) {
    notFound();
  }

  const fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`;

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
      <div className="flex flex-col gap-2">
        <Link href="/" className="text-sm font-semibold text-gray-600 hover:underline">
          ← Back to list
        </Link>
        <h1 className="text-3xl font-semibold text-slate-900">{user.name}</h1>
        <p className="text-sm text-slate-500">User ID #{user.id}</p>
      </div>

      <UserForm mode="view" user={user} />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Additional info</h2>
        <dl className="grid gap-4 sm:grid-cols-2 mt-4">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Website</dt>
            <dd className="text-base text-slate-900">{user.website}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Address
            </dt>
            <dd className="text-base text-slate-900">{fullAddress}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Company</dt>
            <dd className="text-base text-slate-900">
              {user.company.name}
              <span className="block text-sm text-slate-600">{user.company.catchPhrase}</span>
              <span className="block text-sm text-slate-600">{user.company.bs}</span>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
};

export default UserDetailPage;
