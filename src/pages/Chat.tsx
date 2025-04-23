
import { useEffect, useState } from "react";
import ChatList from "@/components/ChatList";
import ChatWindow from "@/components/ChatWindow";
import { useAuthUser } from "@/hooks/useAuthUser";
import { supabase } from "@/integrations/supabase/client";

const Chat = () => {
  const { user, loading } = useAuthUser();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(0);

  // Fetch chat list for the logged in user
  useEffect(() => {
    if (!user) return;
    supabase
      .from("chats")
      .select("*")
      .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setChats(data || []);
      });
  }, [user, refresh]);

  // Listen for new chats in real time
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("realtime:chats")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chats" },
        () => setRefresh((c) => c + 1)
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to use chat.</div>;

  return (
    <div className="flex max-h-[75vh] rounded-lg border overflow-hidden bg-white dark:bg-muted shadow">
      <ChatList
        userId={user.id}
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        refreshChats={() => setRefresh((c) => c + 1)}
      />
      <div className="border-l w-full flex-1 min-w-0">
        {selectedChatId ? (
          <ChatWindow chatId={selectedChatId} userId={user.id} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};
export default Chat;
