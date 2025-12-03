"use client";

import { useMemo, useState } from "react";
import UsersTable from "@/components/users-table";
import type { User } from "@/lib/types";

type SearchUsersProps = {
  users: User[];
};

const SearchUsers = ({ users }: SearchUsersProps) => {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    if (!query.trim()) {
      return users;
    }
    const searchValue = query.toLowerCase();
    return users.filter((user) => {
      const { name, email, username } = user;
      return (
        name.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue) ||
        username.toLowerCase().includes(searchValue)
      );
    });
  }, [query, users]);

  return (
    <section className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
      />
      <UsersTable users={filteredUsers} />
    </section>
  );
};

export default SearchUsers;
