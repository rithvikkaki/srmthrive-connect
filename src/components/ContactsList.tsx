
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

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
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Fellows</h4>
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {contacts.map((contact) => (
          <Link 
            key={contact.id}
            to={`/app/profile/${contact.id}`}
            className="flex items-center gap-2 hover:bg-muted p-1 rounded-md transition-colors"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src={contact.avatar} 
                alt={contact.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm">{contact.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContactsList;
