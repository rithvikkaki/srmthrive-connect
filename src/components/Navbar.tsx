
import { Link } from "react-router-dom";
import { Menu, Search, Bell, MessageCircle, Home, BookOpen, GraduationCap, Menu as MenuIcon, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  avatarUrl: string;
  name: string;
  role: string;
}

const notifications = [
  {
    id: 1,
    type: "success",
    icon: <CheckCircle className="w-4 h-4 text-green-600 mr-2" />,
    message: "Your event registration is confirmed!",
    time: "1 min ago"
  },
  {
    id: 2,
    type: "warning",
    icon: <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />,
    message: "Assignment deadline tomorrow.",
    time: "10 min ago"
  },
  {
    id: 3,
    type: "message",
    icon: <MessageSquare className="w-4 h-4 text-thrive-500 mr-2" />,
    message: "You received a new message from Aman.",
    time: "20 min ago"
  },
];

const Navbar = ({ sidebarOpen, setSidebarOpen, avatarUrl, name, role }: NavbarProps) => {
  return (
    <header className="bg-background border-b border-border z-10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <Link to="/app" className="flex items-center">
              <h1 className="text-2xl font-serif italic tracking-wide">
                <span className="text-thrive-500">SRM</span>Thrive
              </h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/app" className="nav-link">
              <Home className="w-6 h-6 text-thrive-500" />
            </Link>
            <Link to="/app/blogs" className="nav-link">
              <BookOpen className="w-6 h-6" />
            </Link>
            <Link to="/app/fellows" className="nav-link">
              <MessageCircle className="w-6 h-6" />
            </Link>
            <Link to="/app/notices" className="nav-link">
              <GraduationCap className="w-6 h-6" />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <Input 
                type="search" 
                placeholder="Search" 
                className="pr-8"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative focus:ring-2 focus:ring-thrive-200/60" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-thrive-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[99] w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notif) => (
                  <DropdownMenuItem key={notif.id} className="flex items-start space-x-2">
                    <span className="pt-0.5">{notif.icon}</span>
                    <span>
                      <span className="block text-sm">{notif.message}</span>
                      <span className="block text-xs text-muted-foreground">{notif.time}</span>
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/app/profile/me">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-thrive-300 to-thrive-600 flex items-center justify-center overflow-hidden">
                <img 
                  src={avatarUrl} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
