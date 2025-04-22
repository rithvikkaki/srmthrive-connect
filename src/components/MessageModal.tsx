
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MessageModalProps {
  open: boolean;
  onClose: () => void;
  fellowName: string;
}

export default function MessageModal({ open, onClose, fellowName }: MessageModalProps) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage("");
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">
        <div className="bg-white dark:bg-background w-full max-w-md rounded-md shadow-xl z-50 p-6">
          <h2 className="font-bold text-lg mb-2">Message to {fellowName}</h2>
          {sent ? (
            <div className="text-green-600 py-6 text-center font-medium">Message sent!</div>
          ) : (
            <>
              <Input 
                placeholder="Type your message..." 
                value={message}
                className="mb-4"
                onChange={(e) => setMessage(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSend} disabled={!message.trim()}>Send</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
}
