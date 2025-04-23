
import React, { useState } from "react";
import { EditIcon, Pencil, BarChart2, FileImage, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import PostCreateModal from "@/components/PostCreateModal";
import PollCreateModal from "@/components/PollCreateModal";
import AdCreateModal from "@/components/AdCreateModal";

// Placeholder BlogCard, AdCard, PollCard (use your existing PollCard if available)
const BlogCard = ({ post }: any) => (
  <div className="bg-card rounded-md border border-border p-4 mb-4">
    <div className="flex items-center gap-2 mb-2">
      <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
      <div>
        <div className="font-medium">{post.author.name}</div>
        <div className="text-xs text-muted-foreground">{post.timeAgo}</div>
      </div>
    </div>
    <div className="whitespace-pre-line">{post.content}</div>
    {post.image && (
      <img
        src={post.image}
        alt="Blog"
        className="rounded mt-2 max-h-56 object-contain border"
      />
    )}
  </div>
);

const AdCard = ({ ad }: any) => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
    <div className="flex items-center gap-2 mb-1">
      <img src={ad.author.avatar} alt={ad.author.name} className="w-7 h-7 rounded-full" />
      <div>
        <span className="font-medium">{ad.author.name} • </span>
        <span className="text-xs text-muted-foreground">{ad.timeAgo}</span>
      </div>
    </div>
    <div className="font-bold mb-1">{ad.title}</div>
    <div className="text-sm mb-1">{ad.desc}</div>
    {ad.image && (
      <img src={ad.image} alt="Ad" className="rounded mt-2 max-h-40 object-contain border" />
    )}
  </div>
);

import PollCard from "@/components/PollCard"; // Use the real one

const Blogs = () => {
  // Demo user info
  const username = "Rithvik Kaki";
  const avatarUrl = "https://i.pravatar.cc/100?img=12";

  const [posts, setPosts] = useState<any[]>([
    {
      id: "blog-1",
      author: { id: "4", name: username, avatar: avatarUrl },
      timeAgo: "1 minute ago",
      content: "What is blog? A blog (a shortened version of 'weblog') is an online journal or informational website...",
      image: undefined,
      type: "blog",
    },
  ]);
  const [ads, setAds] = useState<any[]>([]);
  const [polls, setPolls] = useState<any[]>([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const { toast } = useToast();

  const [postText, setPostText] = useState("");

  // For new blog post
  const handleCreatePost = (post: any) => setPosts([post, ...posts]);
  // For posting an ad
  const handleCreateAd = (ad: any) => {
    setAds([ad, ...ads]);
    toast({ title: "Ad posted", description: "Your ad is now live." });
  };
  // For polls
  const handleCreatePoll = (poll: any) => setPolls([poll, ...polls]);

  // Blog button handler, use the blog modal (identical to post for now)
  const handleBlogButtonClick = () => setShowBlogModal(true);
  const handleCreateBlog = (post: any) => {
    setPosts([post, ...posts]);
    toast({ title: "Blog published", description: "Your blog post is live." });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-card rounded-md p-4 border border-border mb-4">
        <Input
          placeholder={`WHAT'S ON YOUR MIND? ${username.toUpperCase()}`}
          value={postText}
          onChange={e => setPostText(e.target.value)}
          className="mb-3"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowPostModal(true)}
          >
            <EditIcon className="h-4 w-4" />
            CREATE POST
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleBlogButtonClick}
          >
            <BookOpen className="h-4 w-4" />
            BLOG
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowAdModal(true)}
          >
            <FileImage className="h-4 w-4" />
            POST AD
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowPollModal(true)}
          >
            <BarChart2 className="h-4 w-4" />
            POLL
          </Button>
        </div>
      </div>

      <PostCreateModal
        open={showPostModal}
        onOpenChange={setShowPostModal}
        onCreate={handleCreatePost}
        username={username}
        avatarUrl={avatarUrl}
      />

      {/* Blog Modal uses same PostCreateModal for now */}
      <PostCreateModal
        open={showBlogModal}
        onOpenChange={setShowBlogModal}
        onCreate={handleCreateBlog}
        username={username}
        avatarUrl={avatarUrl}
      />

      <AdCreateModal
        open={showAdModal}
        onOpenChange={setShowAdModal}
        onCreate={handleCreateAd}
        username={username}
        avatarUrl={avatarUrl}
      />
      <PollCreateModal
        open={showPollModal}
        onOpenChange={setShowPollModal}
        onCreate={handleCreatePoll}
      />

      {/* Feed: Show newest first, polls+ads+posts interleaved */}
      {[...polls, ...ads, ...posts]
        .sort((a, b) => (b.id > a.id ? 1 : -1))
        .map(item =>
          item.type === "ad" ? (
            <AdCard ad={item} key={item.id} />
          ) : item.options ? (
            <PollCard
              key={item.id}
              id={item.id}
              title={item.question}
              description={""}
              options={item.options.map((text: string, idx: number) => ({
                id: String(idx),
                text,
                votes: item.votes[idx],
                percentage:
                  item.votes.reduce((a: number, b: number) => a + b, 0) === 0
                    ? 0
                    : Math.round(
                        (item.votes[idx] * 100) /
                          item.votes.reduce((a: number, b: number) => a + b, 0)
                      ),
              }))}
            />
          ) : (
            <BlogCard post={item} key={item.id} />
          )
        )}
    </div>
  );
};

export default Blogs;
