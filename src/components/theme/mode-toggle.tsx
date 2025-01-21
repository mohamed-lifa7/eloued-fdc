"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ModeToggle() {
  const [svg, setSvg] = useState(<Moon className="h-w-6 w-6" />);
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    if (theme === "light") {
      setTheme("dark");
      setSvg(<MoonIcon className="h-10 w-10" />);
    } else {
      setTheme("light");
      setSvg(<SunIcon className="h-10 w-10" />);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      className="h-10 w-10 rounded-full"
    >
      {svg}
      <span className="sr-only">Toggle Mode</span>
    </Button>
  );
}
