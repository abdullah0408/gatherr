"use client";
import { useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
const SignOutButton = () => {
  const { signOut } = useAuth();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    queryClient.clear();
    await signOut();
    window.location.href = "/sign-in";
  };

  return (
    <button onClick={handleLogout} className="flex items-center">
      <LogOut className="mr-2 size-4" />
      Sign out
    </button>
  );
};

export default SignOutButton;
