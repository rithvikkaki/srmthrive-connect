import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

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

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
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
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const { toast } = useToast();

  const handleLike = () => {
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: bookmarked ? "This post has been removed from your bookmarks" : "This post has been added to your bookmarks",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href + `?post=${id}`);
    toast({
      title: "Post link copied to clipboard",
      description: "Share it with your friends!",
    });
  };

  const handleAddComment = () => {
    if (!commentText.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Comment cannot be empty." });
      return;
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        id: "me",
        name: "Rithvik Kaki",
        avatar: "https://i.pravatar.cc/100?img=12"
      },
      content: commentText,
      timeAgo: "just now"
    };

    setCommentsList([newComment, ...commentsList]);
    setCommentText("");
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
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs">{commentsList.length + comments}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 flex-1"
            onClick={handleShare}
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
        
        {showComments && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="w-8 h-8">
                <img 
                  src="https://i.pravatar.cc/100?img=12" 
                  alt="Your avatar"
                  className="w-full h-full object-cover"
                />
              </Avatar>
              <div className="flex-1 flex items-center gap-2">
                <Input
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 h-9"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddComment();
                    }
                  }}
                />
                <Button 
                  size="sm" 
                  className="h-9 px-3"
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {commentsList.map(comment => (
                <div key={comment.id} className="flex gap-2">
                  <Avatar className="w-7 h-7">
                    <img 
                      src={comment.author.avatar} 
                      alt={comment.author.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted p-2 rounded-md">
                      <Link to={`/app/profile/${comment.author.id}`} className="text-xs font-medium">
                        {comment.author.name}
                      </Link>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button className="text-xs text-muted-foreground hover:text-foreground">Like</button>
                      <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
                      <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {commentsList.length === 0 && comments === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Be the first to comment on this post
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
