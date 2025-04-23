import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Post from "@/components/Post";
import PollCard from "@/components/PollCard";
import UserCard from "@/components/UserCard";
import BlogForm from "@/components/BlogForm";
import PostCreateModal from "@/components/PostCreateModal";
import CreatePostButton from "@/components/CreatePostButton";
import CreatePollButton from "@/components/CreatePollButton";
import PollCreateModal from "@/components/PollCreateModal";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: "1",
      author: { id: "1", name: "Shekhar", avatar: "https://i.pravatar.cc/100?img=11" },
      timeAgo: "6 months ago",
      content: "I am Shekhar from 3rd year",
      likes: 1,
      comments: 0,
      image: undefined,
      images: undefined,
      isLiked: false,
      tags: [],
      privacy: "public",
    },
    {
      id: "2",
      author: { id: "2", name: "Ram", avatar: "https://i.pravatar.cc/100?img=33" },
      timeAgo: "7 months ago",
      content: "Hi! I am Ram from SRM University.",
      likes: 2,
      comments: 1,
      image: undefined,
      images: undefined,
      isLiked: true,
      tags: [],
      privacy: "public",
    },
    {
      id: "3",
      author: { id: "3", name: "MUKUL", avatar: "https://i.pravatar.cc/100?img=45" },
      timeAgo: "7 months ago",
      content: "Hello everyone!",
      likes: 0,
      comments: 0,
      image: undefined,
      images: undefined,
      isLiked: false,
      tags: [],
      privacy: "public",
    },
    {
      id: "4",
      author: { id: "4", name: "Rithvik Kaki", avatar: "https://i.pravatar.cc/100?img=12" },
      timeAgo: "a minute ago",
      content: "What is blog? A blog (a shortened version of 'weblog') is an online journal or informational website displaying information in reverse chronological order, with the latest posts appearing first, at the top. It is a platform where a writer or a group of writers share their views on an individual subject.",
      image: "/lovable-uploads/0fed3929-0d14-470a-ad7b-e302d12eaecd.png",
      images: undefined,
      likes: 1,
      comments: 0,
      isLiked: false,
      tags: [],
      privacy: "public",
    },
  ]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const { toast } = useToast();
  const [polls, setPolls] = useState<any[]>([]);
  const [showPollModal, setShowPollModal] = useState(false);

  const username = posts.find(p => p.author.id === "4")?.author.name || "Rithvik Kaki";
  const avatarUrl = posts.find(p => p.author.id === "4")?.author.avatar || "https://i.pravatar.cc/100?img=12";

  const handleCreatePost = (post: any) => setPosts([post, ...posts]);

  const handleBlogSubmit = (title: string, content: string, image: File | null) => {
    const newPost = {
      id: `blog-${Date.now()}`,
      author: { id: "4", name: "Rithvik Kaki", avatar: avatarUrl },
      timeAgo: "just now",
      content: `${title}\n\n${content}`,
      likes: 0,
      comments: 0,
      image: image ? URL.createObjectURL(image) : undefined,
      images: undefined,
      isLiked: false,
      tags: [],
      privacy: "public",
    };
    setPosts([newPost, ...posts]);
    setShowBlogForm(false);
    toast({
      title: "Blog published",
      description: "Your blog post has been successfully published",
    });
  };

  // Poll create handler
  const handleCreatePoll = (poll: any) => {
    setPolls([poll, ...polls]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <CreatePostButton onClick={() => setShowPostModal(true)} />
      <CreatePollButton onClick={() => setShowPollModal(true)} />
      <PostCreateModal
        open={showPostModal}
        onOpenChange={setShowPostModal}
        onCreate={handleCreatePost}
        username={username}
        avatarUrl={avatarUrl}
      />
      <PollCreateModal
        open={showPollModal}
        onOpenChange={setShowPollModal}
        onCreate={handleCreatePoll}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-6">
            {posts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                author={post.author}
                timeAgo={post.timeAgo}
                content={post.content}
                image={post.image}
                images={post.images}
                likes={post.likes}
                comments={post.comments}
                isLiked={post.isLiked}
                tags={post.tags}
                privacy={post.privacy}
              />
            ))}
            {polls.map((poll) => (
              <div className="animate-fade-in" key={poll.id}>
                <PollCard
                  id={poll.id}
                  title={poll.question}
                  description={""}
                  options={poll.options.map((text: string, idx: number) => ({
                    id: String(idx),
                    text,
                    votes: poll.votes[idx],
                    percentage:
                      poll.votes.reduce((a: number, b: number) => a + b, 0) === 0
                        ? 0
                        : Math.round(
                            (poll.votes[idx] * 100) /
                              poll.votes.reduce((a: number, b: number) => a + b, 0)
                          ),
                  }))}
                />
              </div>
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
                { id: "2", text: "NO", votes: 8, percentage: 38 },
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
                <UserCard id="1" name="Naina Upadhyay" role="Student" avatar="https://i.pravatar.cc/100?img=5" />
                <UserCard id="2" name="Wonder Woman" role="Student" avatar="https://i.pravatar.cc/100?img=32" />
                <UserCard id="3" name="Bill Gates" role="Student" avatar="https://i.pravatar.cc/100?img=60" />
                <UserCard id="4" name="Devesh Kumar Singh" role="Student" avatar="https://i.pravatar.cc/100?img=15" />
                <UserCard id="5" name="Chetan Bhardwaj" role="Student" avatar="https://i.pravatar.cc/100?img=25" />
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
