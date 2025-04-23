
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreatePostButtonProps {
  onClick: () => void;
}

export default function CreatePostButton({ onClick }: CreatePostButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed z-30 bottom-8 right-8 md:bottom-10 md:right-12 flex items-center justify-center bg-[#9b87f5] text-white rounded-full w-14 h-14 shadow-lg hover:bg-[#7E69AB] transition-colors animate-fade-in"
      aria-label="Create Post"
      title="Create Post"
      style={{ boxShadow: "0 4px 16px #9b87f544" }}
    >
      <Plus className="w-8 h-8" />
    </button>
  );
}
