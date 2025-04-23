
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

interface ChatListProps {
  userId: string;
  chats: any[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
  refreshChats: () => void;
}

const ChatList = ({
  userId,
  chats,
  selectedChatId,
  onSelectChat,
  refreshChats,
}: ChatListProps) => {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all profiles for displaying users
    supabase
      .from("profiles")
      .select("id,full_name,avatar_url")
      .then(({ data }) => setContacts(data || []));
  }, []);

  // Helper to get the other participant's info
  const getOther = (chat: any) => {
    const otherId = chat.user1_id === userId ? chat.user2_id : chat.user1_id;
    return contacts.find((c) => c.id === otherId);
  };

  return (
    <aside className="w-80 min-w-[250px] bg-muted border-r h-[75vh] flex flex-col">
      <h3 className="font-bold px-4 py-2 border-b">Chats</h3>
      <div className="flex-1 overflow-auto">
        {chats.length === 0 && (
          <div className="px-4 py-10 text-muted-foreground text-center">
            No chats yet
          </div>
        )}
        {chats.map((chat) => {
          const other = getOther(chat);
          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-card ${
                selectedChatId === chat.id ? "bg-card font-bold" : ""
              }`}
            >
              <Avatar>
                <AvatarImage src={other?.avatar_url || ""} />
                <AvatarFallback>{other?.full_name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <div>{other?.full_name || "Unknown"}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(chat.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Could add new chat/start conversation here */}
    </aside>
  );
};

export default ChatList;
