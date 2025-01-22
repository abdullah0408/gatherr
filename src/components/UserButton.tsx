"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
    DropdownMenuPortal,
    DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
} from "./ui/dropdown-menu";
import UserProfilePicture from "./UserProfilePicture";
import { Monitor, User } from "lucide-react";
import Link from "next/link";
import ThemeButton from "./ThemeButton";
import SignOutButton from "./SignOutButton";
import { useAuth } from "@/hooks/useAuth";
interface UserButtonProps {
  className?: string;
}

const UserButton = ({ className }: UserButtonProps) => {
    const { userDetails } = useAuth();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <UserProfilePicture
          profilePictureUrl={userDetails?.profilePicture}
          size={40}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
          <DropdownMenuLabel>
            Logged in as @{userDetails?.username}
          </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/user/${userDetails?.username}`}>
          <DropdownMenuItem>
            <div className="flex items-center">
              <User className="mr-2 size-4" />
              Profile
            </div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <ThemeButton />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
