
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthUser } from "@/hooks/useAuthUser";

interface Contact {
  id: string;
  name: string;
  avatar: string;
}

const contacts: Contact[] = [
  { id: "1", name: "Naina Upadhyay", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: "2", name: "Wonder Woman", avatar: "https://i.pravatar.cc/100?img=32" },
  { id: "3", name: "Bill Gates", avatar: "https://i.pravatar.cc/100?img=60" },
  { id: "4", name: "Devesh Kumar Singh", avatar: "https://i.pravatar.cc/100?img=15" },
  { id: "5", name: "Chetan Bhardwaj", avatar: "https://i.pravatar.cc/100?img=25" },
];

const ContactsList = () => {
  const navigate = useNavigate();
  const { user } = useAuthUser();

  // Helper to start or go to chat with a contact
  const handleChat = async (contactId: string) => {
    if (!user) return;
    // Look for existing chat
    const { data: chat } = await supabase
      .from("chats")
      .select("id")
      .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
      .in("user1_id", [user.id, contactId])
      .in("user2_id", [user.id, contactId])
      .maybeSingle();

    let chatId = chat?.id;
    if (!chatId) {
      // Create if not found
      const { data: newChat } = await supabase
        .from("chats")
        .insert([
          { user1_id: user.id, user2_id: contactId }
        ])
        .select()
        .single();
      chatId = newChat.id;
    }
    // Redirect to chat page or open thread
    navigate(`/app/chat?chatId=${chatId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Fellows</h4>
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center gap-2 hover:bg-muted p-1 rounded-md transition-colors cursor-pointer"
            onClick={() => handleChat(contact.id)}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm">{contact.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsList;
