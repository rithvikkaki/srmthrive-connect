import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const YT_API_KEY = "AIzaSyARbuc7JlDNJ1bXrM1QcPUm5jt7lr-kqz8";

interface YTVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    channelTitle: string;
    description: string;
  };
}

const getWatchLater = () => {
  const raw = localStorage.getItem("yt-watch-later");
  return raw ? JSON.parse(raw) as string[] : [];
};

const setWatchLater = (list: string[]) => {
  localStorage.setItem("yt-watch-later", JSON.stringify(list));
};

export default function Txt2YT() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<YTVideo[]>([]);
  const [error, setError] = useState("");
  const [watchLater, setWatchLaterState] = useState<string[]>(getWatchLater());
  const navigate = useNavigate();

  // Search for YouTube videos
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setVideos([]);
    try {
      const resp = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=16&key=${YT_API_KEY}`);
      const data = await resp.json();
      if (data.error) throw new Error(data.error.message);
      setVideos(data.items || []);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch results.");
    }
    setLoading(false);
  };

  // Add/remove "Watch Later"
  const toggleWatchLater = (id: string) => {
    let newList = watchLater.includes(id)
      ? watchLater.filter(v => v !== id)
      : [...watchLater, id];
    setWatchLater(newList);
    setWatchLaterState(newList);
  };

  // Persist to localStorage
  const setWatchLater = (list: string[]) => {
    localStorage.setItem("yt-watch-later", JSON.stringify(list));
  };

  React.useEffect(() => {
    setWatchLater(watchLater);
  }, [watchLater]);

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Back Button */}
      <button
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded bg-[#9b87f5] text-white hover:bg-[#7d67e5] focus:outline-none focus:ring-2 focus:ring-[#9b87f5]"
        onClick={() => navigate("/app")}
        type="button"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>
      <div className="flex items-center mb-8 gap-3">
        <Youtube className="w-8 h-8 text-red-500" />
        <h1 className="text-3xl font-bold">Txt 2 YT</h1>
      </div>
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-7">
        <Input
          type="text"
          placeholder="Search YouTube videos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="default">Search</Button>
      </form>
      {loading && (
        <div className="text-center py-8 text-lg text-muted-foreground">Loading...</div>
      )}
      {error && (
        <div className="text-center py-8 text-red-600 font-semibold">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {videos.map(v => (
          <div key={v.id.videoId} className="flex gap-3 bg-card border rounded-lg shadow p-3 items-center hover:bg-muted transition group">
            <a
              href={`https://youtube.com/watch?v=${v.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <img
                src={v.snippet.thumbnails.medium.url}
                alt={v.snippet.title}
                className="w-32 h-20 rounded object-cover border"
              />
            </a>
            <div className="flex-1">
              <a
                href={`https://youtube.com/watch?v=${v.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold group-hover:underline line-clamp-2"
              >
                {v.snippet.title}
              </a>
              <div className="text-xs mt-1 text-muted-foreground">
                {v.snippet.channelTitle}
              </div>
              <Button
                size="sm"
                variant={watchLater.includes(v.id.videoId) ? "secondary" : "outline"}
                className="mt-1"
                onClick={() => toggleWatchLater(v.id.videoId)}
                type="button"
              >
                {watchLater.includes(v.id.videoId) ? "Added" : "Watch later"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Watch Later Section */}
      {watchLater.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-3">Watch Later</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos
              .filter(v => watchLater.includes(v.id.videoId))
              .map(v => (
              <div key={v.id.videoId} className="flex items-center gap-3 bg-muted p-3 rounded-lg border">
                <a
                  href={`https://youtube.com/watch?v=${v.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={v.snippet.thumbnails.medium.url}
                    alt={v.snippet.title}
                    className="w-20 h-12 rounded object-cover border"
                  />
                </a>
                <div>
                  <a
                    href={`https://youtube.com/watch?v=${v.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline line-clamp-2"
                  >
                    {v.snippet.title}
                  </a>
                  <div className="text-xs mt-1 text-muted-foreground">{v.snippet.channelTitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
