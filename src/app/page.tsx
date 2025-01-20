"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "../hooks/useAuth"; // Make sure the path is correct

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOut from '../components/SignOut';
import Link from "next/link";

export default function Home() {
  const { setTheme } = useTheme();
  const { userDetails } = useAuth(); // Access user details from context

  return (
    <>
      <SignOut />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
      <Link href="/hello">Hello</Link>
    </>
  );
}
