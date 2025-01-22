"use client";

import * as React from "react";
import { Monitor, Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenuItem,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const {theme, setTheme } = useTheme();

  return (
    <>
    <DropdownMenuItem onClick={() => setTheme("system")}>
      <Monitor className="mr-2 size-4" />
      System Default
      {theme == "system" && <Check className="ms-2 size-4" />}
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => setTheme("light")}>
      <Sun className="mr-2 size-4" />
      Light
      {theme == "light" && <Check className="ms-2 size-4 " />}
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => setTheme("dark")}>
      <Moon className="mr-2 size-4" />
      Dark
      {theme == "dark" && <Check className="ms-2 size-4" />}
    </DropdownMenuItem>
</>
  );
}
export default ModeToggle;