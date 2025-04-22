
import { useState } from "react";
import { EditIcon, Pencil, FileImage, BarChart2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Post from "@/components/Post";
import PollCard from "@/components/PollCard";
import UserCard from "@/components/UserCard";
import BlogForm from "@/components/BlogForm";

const Feed = () => {
  const [postText, setPostText] = useState("");
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: "1",
      author: {
        id: "1",
        name: "Shekhar",
        avatar: "https://i.pravatar.cc/100?img=11"
      },
      timeAgo: "6 months ago",
      content: "I am Shekhar from 3rd year",
      likes: 1,
      comments: 0
    },
    {
      id: "2",
      author: {
        id: "2",
        name: "Ram",
        avatar: "https://i.pravatar.cc/100?img=33"
      },
      timeAgo: "7 months ago",
      content: "Hi! I am Ram from SRM University.",
      likes: 2,
      comments: 1,
      isLiked: true
    },
    {
      id: "3",
      author: {
        id: "3",
        name: "MUKUL",
        avatar: "https://i.pravatar.cc/100?img=45"
      },
      timeAgo: "7 months ago",
      content: "Hello everyone!",
      likes: 0,
      comments: 0
    },
    {
      id: "4",
      author: {
        id: "4",
        name: "Rithvik Kaki",
        avatar: "https://i.pravatar.cc/100?img=12"
      },
      timeAgo: "a minute ago",
      content: "What is blog? A blog (a shortened version of 'weblog') is an online journal or informational website displaying information in reverse chronological order, with the latest posts appearing first, at the top. It is a platform where a writer or a group of writers share their views on an individual subject.",
      image: "/lovable-uploads/0fed3929-0d14-470a-ad7b-e302d12eaecd.png",
      likes: 1,
      comments: 0
    }
  ]);
  const { toast } = useToast();

  const handleSubmitPost = () => {
    if (!postText.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Post content cannot be empty",
      });
      return;
    }

    // Create a new post
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        id: "4",
        name: "Rithvik Kaki",
        avatar: "https://i.pravatar.cc/100?img=12"
      },
      timeAgo: "just now",
      content: postText,
      likes: 0,
      comments: 0
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    toast({
      title: "Post created",
      description: "Your post has been successfully published",
    });
  };

  const handleBlogSubmit = (title: string, content: string, image: File | null) => {
    // Create a new blog post
    const newPost = {
      id: `blog-${Date.now()}`,
      author: {
        id: "4",
        name: "Rithvik Kaki",
        avatar: "https://i.pravatar.cc/100?img=12"
      },
      timeAgo: "just now",
      content: `${title}\n\n${content}`,
      likes: 0,
      comments: 0,
      image: image ? URL.createObjectURL(image) : undefined
    };

    setPosts([newPost, ...posts]);
    setShowBlogForm(false);
    toast({
      title: "Blog published",
      description: "Your blog post has been successfully published",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-md shadow-sm border border-border p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="https://i.pravatar.cc/100?img=12" 
                  alt="Rithvik Kaki"
                  className="w-full h-full object-cover"
                />
              </div>
              <Input
                placeholder="WHAT'S ON YOUR MIND? RITHVIK KAKI"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 flex-1"
                onClick={handleSubmitPost}
              >
                <EditIcon className="h-4 w-4" />
                <span>CREATE POST</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 flex-1"
                onClick={() => setShowBlogForm(true)}
              >
                <Pencil className="h-4 w-4" />
                <span>WRITE BLOG</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 flex-1"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Post Ad feature is under development",
                  });
                }}
              >
                <FileImage className="h-4 w-4" />
                <span>POST AD</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 flex-1"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Poll feature is under development",
                  });
                }}
              >
                <BarChart2 className="h-4 w-4" />
                <span>POLL</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            {posts.map(post => (
              <Post 
                key={post.id}
                id={post.id}
                author={post.author}
                timeAgo={post.timeAgo}
                content={post.content}
                image={post.image}
                likes={post.likes}
                comments={post.comments}
                isLiked={post.isLiked}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Polls</h3>
            <PollCard 
              id="1"
              title="SKIP"
              description="Friday party. Are you guys ready?"
              options={[
                { id: "1", text: "YES", votes: 12, percentage: 62 },
                { id: "2", text: "NO", votes: 8, percentage: 38 }
              ]}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Contacts</h3>
            </div>
            <div className="bg-card rounded-md shadow-sm border border-border p-4">
              <h4 className="font-medium mb-3">Fellows</h4>
              <div className="space-y-3">
                <UserCard 
                  id="1"
                  name="Naina Upadhyay"
                  role="Student"
                  avatar="https://i.pravatar.cc/100?img=5"
                />
                <UserCard 
                  id="2"
                  name="Wonder Woman"
                  role="Student"
                  avatar="https://i.pravatar.cc/100?img=32"
                />
                <UserCard 
                  id="3"
                  name="Bill Gates"
                  role="Student"
                  avatar="https://i.pravatar.cc/100?img=60"
                />
                <UserCard 
                  id="4"
                  name="Devesh Kumar Singh"
                  role="Student"
                  avatar="https://i.pravatar.cc/100?img=15"
                />
                <UserCard 
                  id="5"
                  name="Chetan Bhardwaj"
                  role="Student"
                  avatar="https://i.pravatar.cc/100?img=25"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showBlogForm && (
        <BlogForm 
          onClose={() => setShowBlogForm(false)}
          onSubmit={handleBlogSubmit}
        />
      )}
    </div>
  );
};

export default Feed;
