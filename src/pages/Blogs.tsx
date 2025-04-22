import { useState } from "react";
import { EditIcon, Pencil, FileImage, BarChart2, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Post from "@/components/Post";
import PollCard from "@/components/PollCard";
import UserCard from "@/components/UserCard";
import BlogForm from "@/components/BlogForm";

const Blogs = () => {
  const [postText, setPostText] = useState("");
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogs, setBlogs] = useState([
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

  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

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
    toast({
      title: "Post created",
      description: "Your post has been successfully published",
    });
    setPostText("");
  };

  const handleBlogSubmit = (title: string, content: string, image: File | null) => {
    // Create a new blog post
    const newBlog = {
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

    setBlogs([newBlog, ...blogs]);
    setShowBlogForm(false);
    toast({
      title: "Blog published",
      description: "Your blog post has been successfully published",
    });
  };

  const handleDeleteBlog = (blogId: string) => {
    setBlogs(current => current.filter(blog => blog.id !== blogId));
    toast({
      title: "Blog deleted",
      description: "Your blog post has been deleted",
      variant: "destructive",
    });
    setBlogToDelete(null);
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
            {blogs.map(blog => (
              <div className="relative" key={blog.id}>
                <Post 
                  id={blog.id}
                  author={blog.author}
                  timeAgo={blog.timeAgo}
                  content={blog.content}
                  image={blog.image}
                  likes={blog.likes}
                  comments={blog.comments}
                />
                {/* Blog menu for deleting (three dots) */}
                <div className="absolute top-2 right-2 z-10">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setBlogToDelete(blog.id)}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  {blogToDelete === blog.id && (
                    <div className="absolute right-10 top-2 bg-white border shadow-md rounded-lg p-2">
                      <button className="flex items-center text-red-500 gap-2" onClick={() => handleDeleteBlog(blog.id)}>
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Polls</h3>
            <PollCard 
              id="2"
              title="NEXT"
              description="Movie: I will fight for those who cannot fight for themselves. 'Now I know, that only love can truly save the world."
              options={[
                { id: "1", text: "", votes: 62, percentage: 62 },
                { id: "2", text: "", votes: 8, percentage: 8 },
                { id: "3", text: "", votes: 31, percentage: 31 }
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

export default Blogs;
