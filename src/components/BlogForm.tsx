
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BlogFormProps {
  onClose: () => void;
  onSubmit: (title: string, content: string, image: File | null) => void;
}

const BlogForm = ({ onClose, onSubmit }: BlogFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content, image);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card shadow-lg rounded-lg w-full max-w-2xl border border-border">
        <div className="flex justify-between items-center border-b border-border p-4">
          <h3 className="text-lg font-medium">Write Blog</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Textarea
                placeholder="Write your blog content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[200px]"
              />
            </div>
            
            {preview && (
              <div className="relative">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-auto max-h-64 object-cover rounded-md"
                />
                <Button 
                  type="button"
                  variant="destructive" 
                  size="icon"
                  className="absolute top-2 right-2 w-6 h-6"
                  onClick={() => {
                    setImage(null);
                    setPreview(null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            <div>
              <Input
                type="file"
                accept="image/*"
                id="blog-image"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById("blog-image")?.click()}
              >
                Upload media
              </Button>
              {image && <span className="ml-2 text-sm">{image.name}</span>}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              DISCARD
            </Button>
            <Button type="submit">
              DONE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
