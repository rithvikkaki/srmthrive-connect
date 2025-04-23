
import { Link } from "react-router-dom";
import { Users, Layers, Calendar, FileText, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import UpdateCard from "./UpdateCard";
import ContactsList from "./ContactsList";

interface SidebarProps {
  isOpen: boolean;
  avatarUrl: string;
  name: string;
  role: string;
}

const Sidebar = ({ isOpen, avatarUrl, name, role }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "bg-background border-r border-border overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "w-72" : "w-0"
      )}
    >
      {isOpen && (
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4">
            <div className="space-y-4">
              <Link to="/app/profile/me" className="block">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-thrive-300 to-thrive-600 flex items-center justify-center overflow-hidden">
                    <img 
                      src={avatarUrl} 
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-sm text-muted-foreground">{role}</p>
                  </div>
                </div>
              </Link>

              <nav className="space-y-1">
                <Link 
                  to="/app/fellows"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium uppercase text-sm">Fellows</span>
                </Link>
                <Link 
                  to="/app/groups"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <Layers className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium uppercase text-sm">Groups</span>
                </Link>
                <Link 
                  to="/app/events"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium uppercase text-sm">Events</span>
                </Link>
                <Link 
                  to="/app/notices"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium uppercase text-sm">Notices</span>
                </Link>
                <Link 
                  to="/app/bookmarks"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <Bookmark className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium uppercase text-sm">Bookmarks</span>
                </Link>
                {/* TXT2YT removed */}
              </nav>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Updates</h4>
                <div className="space-y-2">
                  <UpdateCard 
                    title="Practical Exams" 
                    description="Practical exams for the odd semester will start from April 25th, 2024. All students are required to bring their lab manuals and ID cards."
                    link="https://academia.srmist.edu.in"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border">
            <ContactsList />
          </div>
        </ScrollArea>
      )}
    </aside>
  );
};

export default Sidebar;
