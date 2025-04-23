
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Post from "@/components/Post";
import { Link } from "react-router-dom";
import { EditIcon, Pencil, FileImage, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdCard from "@/components/AdCard";
import PollCardLite from "@/components/PollCardLite";

interface PostsSectionProps {
  postText: string;
  setPostText: (arg: string) => void;
  handleSubmitPost: () => void;
  profileData: any;
  posts: any[];
  ads: any[];
  setShowAdModal: (arg: boolean) => void;
  polls: any[];
  setShowPollModal: (arg: boolean) => void;
}

const PostsSection: React.FC<PostsSectionProps> = ({
  postText,
  setPostText,
  handleSubmitPost,
  profileData,
  posts,
  ads,
  setShowAdModal,
  polls,
  setShowPollModal,
}) => (
  <div>
    <div className="bg-card rounded-md shadow-sm border border-border p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={profileData.avatarUrl}
            alt={profileData.name}
            className="w-full h-full object-cover"
          />
        </div>
        <input
          placeholder={`WHAT'S ON YOUR MIND? ${profileData.name.toUpperCase()}`}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
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
        <Link to="/app/blogs" className="flex-1">
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full"
          >
            <Pencil className="h-4 w-4" />
            <span>WRITE BLOG</span>
          </Button>
        </Link>
        <Button
          variant="outline"
          className="flex items-center gap-2 flex-1"
          onClick={() => setShowAdModal(true)}
        >
          <FileImage className="h-4 w-4" />
          <span>POST AD</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 flex-1"
          onClick={() => setShowPollModal(true)}
        >
          <BarChart2 className="h-4 w-4" />
          <span>POLL</span>
        </Button>
      </div>
    </div>

    <Tabs defaultValue="posts">
      <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0">
        <TabsTrigger value="posts">POSTS</TabsTrigger>
        <TabsTrigger value="blogs">BLOGS</TabsTrigger>
        <TabsTrigger value="ads">ADS</TabsTrigger>
        <TabsTrigger value="polls">POLLS</TabsTrigger>
        <TabsTrigger value="bookmarks">BOOKMARKS</TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="mt-6 space-y-6">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            timeAgo={post.timeAgo}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
        {posts.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            No posts yet.
          </div>
        )}
      </TabsContent>
      <TabsContent value="blogs" className="mt-6 space-y-6">
        <div className="py-8 text-center text-muted-foreground">
          No blogs yet.
        </div>
      </TabsContent>
      <TabsContent value="ads" className="mt-6 space-y-6">
        {ads.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            No ads yet.
          </div>
        )}
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </TabsContent>
      <TabsContent value="polls" className="mt-6 space-y-6">
        {polls.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            No polls yet.
          </div>
        )}
        {polls.map((poll) => (
          <PollCardLite key={poll.id} poll={poll} />
        ))}
      </TabsContent>
      <TabsContent value="bookmarks" className="mt-6 space-y-6">
        <div className="py-8 text-center text-muted-foreground">
          No bookmarks yet.
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

export default PostsSection;
