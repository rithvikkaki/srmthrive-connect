
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, CirclePlus, CircleMinus } from "lucide-react";

const DURATION_OPTIONS = [
  { label: "24 hours", value: 24 * 60 * 60 },
  { label: "3 days", value: 3 * 24 * 60 * 60 },
  { label: "1 week", value: 7 * 24 * 60 * 60 },
  { label: "Custom", value: "custom" },
];

const VISIBILITY_OPTIONS = [
  { label: "Public", value: "public" },
  { label: "Followers", value: "followers" },
  { label: "Private", value: "private" },
];

const TYPE_OPTIONS = [
  { label: "Single Choice", value: "single" },
  { label: "Multiple Choice", value: "multiple" },
];

interface PollCreateModalProps {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  onCreate: (data: any) => void;
}
const MIN_OPTIONS = 2;

const PollCreateModal: React.FC<PollCreateModalProps> = ({ open, onOpenChange, onCreate }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState<number | "custom">(DURATION_OPTIONS[0].value);
  const [customDuration, setCustomDuration] = useState(1);
  const [visibility, setVisibility] = useState("public");
  const [type, setType] = useState("single");
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (idx: number, value: string) => {
    setOptions(opts => opts.map((o, i) => i === idx ? value : o));
  };
  const handleAddOption = () => setOptions(o => o.length < 6 ? [...o, ""] : o);
  const handleRemoveOption = (idx: number) => {
    if (options.length > MIN_OPTIONS) setOptions(opts => opts.filter((_, i) => i !== idx));
  };

  const getDurationSeconds = () => {
    if (duration === "custom") {
      return customDuration * 60 * 60;
    }
    return duration;
  };

  const handleSubmit = () => {
    if (!question.trim() || options.some(opt => !opt.trim())) return;
    setLoading(true);
    setTimeout(() => {
      const durationSeconds = getDurationSeconds();

      onCreate({
        id: `poll-${Date.now()}`,
        question,
        options: options.filter(Boolean),
        duration: durationSeconds,
        endsAt: Date.now() + durationSeconds * 1000,
        visibility,
        type,
        votes: options.map(() => 0),
      });
      setQuestion("");
      setOptions(["", ""]);
      setDuration(DURATION_OPTIONS[0].value);
      setCustomDuration(1);
      setVisibility("public");
      setType("single");
      setLoading(false);
      onOpenChange(false);
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Poll</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="What's your question?"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            maxLength={150}
            disabled={loading}
          />
          <div className="space-y-2">
            {options.map((opt, idx) => (
              <div className="flex items-center gap-2" key={idx}>
                <Input
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={e => handleOptionChange(idx, e.target.value)}
                  maxLength={50}
                  className="flex-1"
                  disabled={loading}
                />
                {options.length > MIN_OPTIONS && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveOption(idx)}
                    className="text-destructive"
                  >
                    <CircleMinus />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={handleAddOption} disabled={options.length >= 6 || loading} className="gap-1">
              <CirclePlus className="h-4 w-4" /> Add Option
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {DURATION_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`px-3 py-1 rounded text-xs border ${duration === opt.value ? "bg-[#9b87f5] text-white border-[#9b87f5]" : "border-border bg-muted"}`}
                onClick={() => setDuration(opt.value)}
                disabled={loading}
                type="button"
              >
                {opt.label}
              </button>
            ))}
            {duration === "custom" && (
              <div className="flex items-center ml-2 gap-1">
                <Input
                  type="number"
                  min={1}
                  value={customDuration}
                  onChange={e => setCustomDuration(Number(e.target.value))}
                  className="max-w-[90px]"
                  disabled={loading}
                />
                <span className="text-sm text-muted-foreground">hour(s)</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {VISIBILITY_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`px-3 py-1 rounded text-xs border ${visibility === opt.value ? "bg-[#9b87f5] text-white border-[#9b87f5]" : "border-border bg-muted"}`}
                onClick={() => setVisibility(opt.value)}
                disabled={loading}
                type="button"
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {TYPE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`px-3 py-1 rounded text-xs border ${type === opt.value ? "bg-[#9b87f5] text-white border-[#9b87f5]" : "border-border bg-muted"}`}
                onClick={() => setType(opt.value)}
                disabled={loading}
                type="button"
              >
                {opt.label}
              </button>
            ))}
          </div>
          <Button
            className="w-full bg-thrive-500 hover:bg-thrive-600 mt-2"
            onClick={handleSubmit}
            disabled={loading || !question.trim() || options.some(o => !o.trim())}
          >
            {loading ? "Creating..." : "Create Poll"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PollCreateModal;

