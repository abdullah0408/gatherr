"use client";
import { useAuth } from "@clerk/nextjs";

const SignOut = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return <button onClick={handleLogout}>Sign Out</button>;
};

export default SignOut;