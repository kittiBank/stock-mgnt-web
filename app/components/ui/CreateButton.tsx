"use client";

import { Plus } from "lucide-react";
import Button from "./Button";

interface CreateButtonProps {
  onClick: () => void;
  label?: string;
  variant?: "success" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

// Reusable CreateButton component
export default function CreateButton({
  onClick,
  label = "เพิ่มใหม่",
  variant = "success",
  size = "md",
}: CreateButtonProps) {
  return (
    <div className="flex justify-end mb-6">
      <Button variant={variant} size={size} onClick={onClick}>
        <Plus size={18} />
        <span>{label}</span>
      </Button>
    </div>
  );
}
