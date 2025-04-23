
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Send } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar } from "@/components/ui/avatar";
import { useAuthUser } from "@/hooks/useAuthUser";

interface FellowChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fellow: {
    id: string;
    name: string;
    avatar: string;
  } | null;
}

const FellowChatModal = ({ open, onOpenChange, fellow }: FellowChatModalProps) => {
  const { user } = useAuthUser();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Get or create chat
  useEffect(() => {
    if (!(user && fellow && open)) return;
    const getOrCreateChat = async () => {
      // Look for existing chat
      const { data: chat } = await supabase
        .from("chats")
        .select("id")
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .in("user1_id", [user.id, fellow.id])
        .in("user2_id", [user.id, fellow.id])
        .maybeSingle();
      let foundChatId = chat?.id;
      if (!foundChatId) {
        // Create chat if not found
        const { data: newChat } = await supabase
          .from("chats")
          .insert([{ user1_id: user.id, user2_id: fellow.id }])
          .select()
          .single();
        foundChatId = newChat.id;
      }
      setChatId(foundChatId);
    };
    getOrCreateChat();
  }, [user, fellow, open]);

  // Fetch and subscribe to messages
  useEffect(() => {
    if (!chatId || !open) return;
    supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .then(({ data }) => setMessages(data || []));

    const channel = supabase
      .channel(`realtime:messages-fellow-${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          setMessages((msgs) => [...msgs, payload.new]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, open]);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || !chatId || !user) return;
    setSending(true);
    await supabase.from("messages").insert({
      chat_id: chatId,
      sender_id: user.id,
      content: input.trim(),
    });
    setInput("");
    setSending(false);
  };

  // WhatsApp inspired colors
  // Outgoing: bg-[#DCF8C6] (light green), Incoming: bg-white/dark:bg-muted.

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="max-w-md w-full p-0 flex flex-col">
        <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-[#075E54] text-white">
          <Avatar className="h-10 w-10">
            <img src={fellow?.avatar} alt={fellow?.name} className="w-full h-full object-cover"/>
          </Avatar>
          <span className="font-semibold">{fellow?.name}</span>
        </div>
        <div ref={chatBodyRef} className="flex-1 px-3 py-4 overflow-y-auto bg-[#ece5dd]">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 pt-24">No messages yet. Start the conversation!</div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_id === user?.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-3 py-2 my-1 max-w-[70%] shadow text-sm
                ${msg.sender_id === user?.id
                  ? "bg-[#DCF8C6] text-gray-800"
                  : "bg-white dark:bg-muted text-gray-900 dark:text-gray-50"}`}
              >
                {msg.content}
                <div className="text-[10px] leading-tight text-right opacity-60 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-t bg-white">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 rounded-full px-4 py-2 border focus:outline-none text-sm"
            placeholder="Type a message"
            onKeyDown={e => e.key === "Enter" && handleSend()}
            disabled={sending}
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="p-2 bg-[#25d366] rounded-full text-white hover:bg-[#22ba5b] transition-colors"
            aria-label="Send"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FellowChatModal;
