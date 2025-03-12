
import { Link } from "react-router-dom";
import { Users, Layers, Calendar, FileText, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import UpdateCard from "./UpdateCard";
import ContactsList from "./ContactsList";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
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
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-thrive-300 to-thrive-600 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/100?img=12" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Rithvik Kaki</h3>
                  <p className="text-sm text-muted-foreground">Student</p>
                </div>
              </div>

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
              </nav>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Updates</h4>
                <div className="space-y-2">
                  <UpdateCard 
                    title="Practical Exams" 
                    description="Practical exams for the odd semester will start fr"
                    link="#"
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
