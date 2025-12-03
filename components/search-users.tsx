"use client";

import { useMemo, useState } from "react";
import UsersTable from "@/components/users-table";
import type { User } from "@/lib/types";

type SearchUsersProps = {
  users: User[];
};

const SearchUsers = ({ users }: SearchUsersProps) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5;

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

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  const currentPageUsers = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredUsers, page]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(1);
  };

  return (
    <section className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search by name, username, or email..."
        value={query}
        onChange={handleSearchChange}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
      />

      <UsersTable users={currentPageUsers} />

      <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="rounded border border-slate-200 px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          className="rounded border border-slate-200 px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default SearchUsers;
