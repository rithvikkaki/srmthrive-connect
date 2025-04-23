
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreatePollButtonProps {
  onClick: () => void;
}

export default function CreatePollButton({ onClick }: CreatePollButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed z-30 bottom-28 right-8 md:bottom-36 md:right-12 flex items-center justify-center bg-secondary text-black rounded-full w-14 h-14 shadow-lg hover:bg-[#9b87f511] border border-[#9b87f5] transition-colors animate-fade-in"
      aria-label="Create Poll"
      title="Create Poll"
      style={{ boxShadow: "0 2px 14px #9b87f544" }}
    >
      <Pencil className="w-7 h-7" />
    </button>
  );
}
