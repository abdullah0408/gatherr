"use client";
import { useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
const SignOutButton = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <button onClick={handleLogout} className="flex items-center">
      <LogOut className="mr-2 size-4" />
      Sign out
    </button>
  );
};

export default SignOutButton;
