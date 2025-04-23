
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Image, Upload, Lock, Tag, Eye, EyeOff, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const TAGS = [
  { label: "#Study", value: "study" },
  { label: "#Event", value: "event" },
  { label: "#Update", value: "update" },
  { label: "#Help", value: "help" },
];

const PRIVACY = [
  { label: "Public", value: "public", icon: Eye },
  { label: "Followers", value: "followers", icon: Lock },
  { label: "Private", value: "private", icon: EyeOff },
];

interface PostCreateModalProps {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  onCreate: (post: any) => void;
  username: string;
  avatarUrl: string;
}

const MAX_LENGTH = 500;
const MAX_IMAGES = 4;

const PostCreateModal: React.FC<PostCreateModalProps> = ({ open, onOpenChange, onCreate, username, avatarUrl }) => {
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState(PRIVACY[0].value);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter(file => 
      file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    ).slice(0, MAX_IMAGES - images.length);
    setImages([...images, ...valid]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(tags =>
      tags.includes(tag) ? tags.filter(t => t !== tag) : tags.length < 3 ? [...tags, tag] : tags
    );
  };

  const handlePrivacyChange = (val: string) => setPrivacy(val);

  const handleSubmit = () => {
    if (!content.trim() && images.length === 0) {
      toast({ variant: "destructive", title: "Cannot post", description: "Text or image required." });
      return;
    }
    setLoading(true);
    const imageUrls = images.map(file => URL.createObjectURL(file));
    setTimeout(() => {
      onCreate({
        id: `post-${Date.now()}`,
        author: { id: "4", name: username, avatar: avatarUrl },
        timeAgo: "just now",
        content: content,
        tags: selectedTags,
        privacy,
        image: imageUrls.length === 1 ? imageUrls[0] : undefined,
        images: imageUrls.length > 1 ? imageUrls : undefined,
        likes: 0,
        comments: 0,
        isLiked: false
      });
      setContent("");
      setPrivacy(PRIVACY[0].value);
      setSelectedTags([]);
      setImages([]);
      setLoading(false);
      onOpenChange(false);
      toast({ title: "Post created", description: "Your post is live!" });
    }, 1200); // simulate async/DB
  };

  return (
    <Dialog open={open} onOpenChange={b => !loading && onOpenChange(b)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <img src={avatarUrl} alt={username} className="w-10 h-10 rounded-full object-cover" />
              <span className="font-medium">{username}</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div>
          <textarea
            className="w-full border rounded bg-muted text-base p-2 resize-none mb-2 h-24 focus:outline-none"
            placeholder="What's on your mind?"
            maxLength={MAX_LENGTH}
            value={content}
            disabled={loading}
            onChange={e => setContent(e.target.value)}
          />
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs ${content.length > MAX_LENGTH ? "text-red-500" : "text-muted-foreground"}`}>
              {content.length}/{MAX_LENGTH}
            </span>
            <span className="text-xs text-muted-foreground">{loading && "Posting..."}</span>
          </div>
          {/* Images preview */}
          {images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto mb-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img src={URL.createObjectURL(img)} className="w-20 h-20 rounded object-cover border" />
                  <button type="button"
                    className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                    onClick={() => handleRemoveImage(idx)}
                    disabled={loading}
                  >
                    <span className="sr-only">Remove Image</span>
                    <Check size={14} className="rotate-45" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-3 mb-2">
            <Button variant="outline" size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={images.length >= MAX_IMAGES || loading}
              className="gap-1"
            >
              <Image className="h-4 w-4" />
              Add Image
            </Button>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleAddImages}
              disabled={images.length >= MAX_IMAGES || loading}
            />
            <div className="text-xs text-muted-foreground">
              {images.length}/{MAX_IMAGES} images
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Tag className="inline-block text-muted-foreground" size={15} />
            {TAGS.map(t => (
              <button
                key={t.value}
                type="button"
                onClick={() => handleTagChange(t.label)}
                className={cn("px-2 py-0.5 rounded-full text-xs border",
                  selectedTags.includes(t.label)
                    ? "bg-[#9b87f5] text-white border-[#9b87f5]"
                    : "bg-muted text-muted-foreground border border-border"
                )}
                disabled={loading}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-4">
            {PRIVACY.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={cn(
                  "flex items-center px-3 py-1 rounded text-xs border gap-1",
                  privacy === opt.value
                    ? "bg-[#9b87f5] text-white border-[#9b87f5]"
                    : "bg-muted text-muted-foreground border"
                )}
                onClick={() => handlePrivacyChange(opt.value)}
                disabled={loading}
              >
                <opt.icon className="h-4 w-4" />
                {opt.label}
              </button>
            ))}
          </div>
          <Button
            className="w-full bg-thrive-500 hover:bg-thrive-600"
            onClick={handleSubmit}
            disabled={loading || (!content.trim() && images.length === 0)}
          >
            {loading ? (
              <span className="flex items-center gap-2"><Upload className="h-4 w-4 animate-spin" />Posting...</span>
            ) : (
              <span>Post</span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreateModal;
