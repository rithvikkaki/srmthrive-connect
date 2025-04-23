
import { useState } from "react";
import { Search } from "lucide-react";
import FellowChatModal from "./FellowChatModal";
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
  const { user } = useAuthUser();
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  return (
    <>
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
              onClick={() => {
                setSelectedContact(contact);
                setChatModalOpen(true);
              }}
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
      <FellowChatModal
        open={chatModalOpen}
        onOpenChange={(open) => {
          setChatModalOpen(open);
          if (!open) setSelectedContact(null);
        }}
        fellow={selectedContact}
      />
    </>
  );
};

export default ContactsList;
