"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

const CopyIdComponent = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(id);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      size="icon"
      disabled={isCopied}
      className={cn(className)}
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
};

export default CopyIdComponent;
