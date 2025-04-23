
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Send } from "lucide-react";

interface ChatWindowProps {
  chatId: string;
  userId: string;
}

const ChatWindow = ({ chatId, userId }: ChatWindowProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Get messages for this chat
  useEffect(() => {
    if (!chatId) return;
    supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .then(({ data }) => setMessages(data || []));
  }, [chatId, refresh]);

  // Listen for new messages in real time
  useEffect(() => {
    const channel = supabase
      .channel(`realtime:messages:${chatId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `chat_id=eq.${chatId}` },
        (payload) => {
          setMessages((msgs) => [...msgs, payload.new]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setSending(true);
    await supabase.from("messages").insert({
      chat_id: chatId,
      sender_id: userId,
      content: input.trim(),
    });
    setInput("");
    setSending(false);
    setRefresh((c) => c + 1);
  };

  return (
    <div className="flex flex-col h-[75vh]">
      <div ref={chatBodyRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-muted-foreground text-center pt-20">
            No messages yet. Say hi!
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender_id === userId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-xs whitespace-pre-wrap ${
                msg.sender_id === userId
                  ? "bg-thrive-500 text-white"
                  : "bg-gray-100 dark:bg-muted text-foreground"
              }`}
            >
              <span>{msg.content}</span>
              <div className="text-xs opacity-60 mt-1 text-right">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t px-4 py-3 flex items-center gap-2 bg-card">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2 outline-none"
          placeholder="Type a message..."
          onKeyDown={e => e.key === "Enter" && handleSend()}
          disabled={sending}
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-full bg-thrive-500 hover:bg-thrive-600 text-white"
          disabled={sending || !input.trim()}
          aria-label="Send"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
