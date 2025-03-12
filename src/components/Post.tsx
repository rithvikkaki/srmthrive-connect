
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PostProps {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const Post = ({
  id,
  author,
  timeAgo,
  content,
  image,
  likes,
  comments,
  isLiked = false,
  isBookmarked = false,
}: PostProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="bg-card rounded-md shadow-sm overflow-hidden border border-border animate-fade-in">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <Link to={`/app/profile/${author.id}`}>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={author.avatar} 
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div>
              <Link to={`/app/profile/${author.id}`} className="font-medium hover:underline">
                {author.name}
              </Link>
              <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mb-3">
          <p className="text-sm">{content}</p>
        </div>
        
        {image && (
          <div className="mb-3 -mx-4">
            <img 
              src={image} 
              alt="Post content" 
              className="w-full object-cover max-h-96"
            />
          </div>
        )}
        
        <div className="flex border-t border-border pt-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 flex-1"
            onClick={handleLike}
          >
            <Heart 
              className={cn("h-4 w-4", {
                "fill-red-500 text-red-500": liked,
                "text-muted-foreground": !liked
              })} 
            />
            <span className={cn("text-xs", {
              "text-red-500": liked
            })}>
              {likeCount}
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 flex-1"
          >
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs">{comments}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 flex-1"
          >
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center justify-center w-10"
            onClick={handleBookmark}
          >
            <Bookmark 
              className={cn("h-4 w-4", {
                "fill-thrive-500 text-thrive-500": bookmarked,
                "text-muted-foreground": !bookmarked
              })} 
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
