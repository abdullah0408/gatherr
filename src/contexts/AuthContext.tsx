"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { User as PrismaUser } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

// Define the type for the AuthContext value
interface AuthContextType {
  userDetails: PrismaUser | null; // Holds the details of the authenticated user
  isLoading: boolean; // Indicates whether user details are still being fetched
  isSignedIn: boolean | undefined; // Indicates whether the user is signed in
  isLoaded: boolean | undefined; // Indicates whether the user details are fully loaded
}

// Create the AuthContext with an initial value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode; // ReactNode to render all child components
}

/**
 * AuthProvider component
 * - Fetches user details and provides them via AuthContext.
 * - Ensures loading state while the data is being fetched.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State to store the authenticated user's details
  const [userDetails, setUserDetails] = useState<PrismaUser | null>(null);
  // State to manage the loading indicator for fetching user details
  const [isLoading, setIsLoading] = useState(true);

  // Fetches the current user status from Clerk
  const { isSignedIn, user, isLoaded } = useUser();

  /**
   * Fetches the authenticated user's details from Clerk and Prisma.
   * - Uses Clerk's `currentUser` to get the user session.
   * - Queries Prisma to fetch the user's full details from the database.
   */
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (isLoaded && isSignedIn && user) {
          // Fetch the full user details from Prisma using the Clerk user ID
          const fetchedUserDetails = await prisma.user.findUnique({
            where: { id: user.id },
          });

          // Update state with fetched user details
          setUserDetails(fetchedUserDetails);
        } else {
          // Handle the case where the user is not signed in or the user is still loading
          setUserDetails(null);
        }
      } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching user details:", error);
        // Ensure userDetails is reset to null in case of an error
        setUserDetails(null);
      } finally {
        // Stop the loading state regardless of success or failure
        setIsLoading(false);
      }
    };

    // Trigger the fetch operation when the component mounts
    fetchUserDetails();
  }, [isSignedIn, user, isLoaded]); // Depend on user sign-in and loading states

  return (
    /**
     * Provide the `userDetails`, `isLoading`, `isSignedIn`, and `isLoaded` states to the entire app via context.
     * - Allows child components to access the authenticated user's details.
     * - Useful for conditional rendering based on the loading state or user info.
     */
    <AuthContext.Provider
      value={{ userDetails, isLoading, isSignedIn, isLoaded }}
    >
      {children}
    </AuthContext.Provider>
  );
};
