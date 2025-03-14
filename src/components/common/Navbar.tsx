import React from "react";
import Link from "next/link";
import UserButton from "../UserButton";
import SearchField from "@/components/SearchField";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          Gather
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto hidden sm:block" />
      </div>
    </header>
  );
};

export default Navbar;
