
import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface HobbyTagsInputProps {
  value: string[];
  onChange: (val: string[]) => void;
  placeholder?: string;
}

const HobbyTagsInput = ({ value, onChange, placeholder }: HobbyTagsInputProps) => {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    if (!tag.trim() || value.includes(tag.trim())) return;
    onChange([...value, tag.trim()]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (input) addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded px-2 py-1 bg-muted min-h-[40px]">
      {value.map((tag, idx) => (
        <span
          className="flex items-center bg-[#9b87f5] text-white px-2 py-0.5 rounded-full mr-1 mb-1"
          key={tag + idx}
        >
          {tag}
          <button
            type="button"
            className="ml-1 focus:outline-none"
            onClick={() => onChange(value.filter((t, i) => i !== idx))}
          >
            <X size={15} />
          </button>
        </span>
      ))}
      <input
        className="border-none outline-none flex-1 bg-transparent min-w-[100px] text-sm"
        type="text"
        value={input}
        placeholder={placeholder || "Add..."}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default HobbyTagsInput;
