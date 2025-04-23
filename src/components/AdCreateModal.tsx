
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdCreateModalProps {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  onCreate: (ad: any) => void;
  username: string;
  avatarUrl: string;
}

const AdCreateModal: React.FC<AdCreateModalProps> = ({ open, onOpenChange, onCreate, username, avatarUrl }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !desc.trim()) return;
    setLoading(true);
    setTimeout(() => {
      onCreate({
        id: `ad-${Date.now()}`,
        title, desc,
        image: image ? URL.createObjectURL(image) : undefined,
        author: {
          id: "4",
          name: username,
          avatar: avatarUrl,
        },
        timeAgo: "just now",
        type: "ad",
      });
      setTitle("");
      setDesc("");
      setImage(null);
      setLoading(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Ad</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Ad Title" value={title} onChange={e => setTitle(e.target.value)} disabled={loading} maxLength={100} />
          <textarea
            className="w-full border rounded bg-muted p-2 text-base resize-none min-h-[70px]"
            placeholder="Describe your ad..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
            maxLength={300}
            disabled={loading}
          />
          <Input type="file" accept="image/*" onChange={handleImage} disabled={loading} />
          <Button className="w-full bg-thrive-500 hover:bg-thrive-600" onClick={handleSubmit} disabled={loading || !title.trim() || !desc.trim()}>
            {loading ? "Posting..." : "Create Ad"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdCreateModal;
