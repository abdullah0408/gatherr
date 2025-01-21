"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "../../hooks/useAuth"; // Make sure the path is correct

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from '../../components/common/SignOutButton';
import Link from "next/link";

export default function Home() {
  const { setTheme } = useTheme();
  const { userDetails } = useAuth(); // Access user details from context

  return (
    <>
      {/* Example of displaying user details */}
      {userDetails ? (
        <div>
          <h2>Welcome, {userDetails.name}</h2>
          <p>Email: {userDetails.email}</p>
            <p>Username: {userDetails.username}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            <p>Profile Picture: <img src={userDetails.profilePicture ?? ''} alt="Profile" /></p>
            <p>Bio: {userDetails.bio}</p>
            <p>Birthday: {userDetails.birthday}</p>
            <p>Gender: {userDetails.gender}</p>
            <p>External ID: {userDetails.externalId}</p>
            <p>Client IP: {userDetails.clientIp}</p>
            <p>User Agent: {userDetails.userAgent}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </>
  );
}
