"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, MoonIcon, SunIcon } from "lucide-react";

export default function ModeToggle() {
  const [svg, setSvg] = useState(<Moon className="w-6 h-w-6"/>);
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    if (theme === "light") {
      setTheme("dark");
      setSvg(<MoonIcon className="w-6 h-w-6"/>);
    } else {
      setTheme("light");
      setSvg(<SunIcon className="w-6 h-w-6"/>);
    }
  };

  return (
    <Button isIconOnly variant="flat" onClick={handleClick} size="md">
      {svg}
    </Button>
  );
}
