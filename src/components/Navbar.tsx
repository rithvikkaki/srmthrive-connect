
import { useEffect, useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  avatarUrl: string;
  name: string;
  role: string;
}

type NotificationType = "success" | "warning" | "message" | "info" | "other";

const iconsMap: { [K in NotificationType]: JSX.Element } = {
  success: <CheckCircle className="w-4 h-4 text-green-600 mr-2" />,
  warning: <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />,
  message: <MessageSquare className="w-4 h-4 text-thrive-500 mr-2" />,
  info: <AlertCircle className="w-4 h-4 text-blue-500 mr-2" />,
  other: <AlertCircle className="w-4 h-4 text-muted-foreground mr-2" />,
};

const Navbar = ({ sidebarOpen, setSidebarOpen, avatarUrl, name, role }: NavbarProps) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch current user id from session
    async function fetchNotifications() {
      setLoading(true);
      // Try to get the logged-in user's id from localStorage/session
      // We assume JWT is managed by supabase
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) {
        setLoading(false);
        setNotifications([]);
        return;
      }
      // Fetch most recent notifications from backend
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) {
        setNotifications([]);
      } else if (data && data.length > 0) {
        setNotifications(data);
      } else {
        setNotifications([]);
      }
      setLoading(false);
    }
    fetchNotifications();
  }, []);

  // fallback sample for demo when no notifications for user exist
  const randomNotifications = [
    {
      id: "demo1",
      type: "success",
      message: "Your event registration is confirmed!",
      created_at: Date.now(),
    },
    {
      id: "demo2",
      type: "warning",
      message: "Assignment deadline tomorrow.",
      created_at: Date.now(),
    },
    {
      id: "demo3",
      type: "message",
      message: "You received a new message from Aman.",
      created_at: Date.now(),
    },
  ];

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
              <DropdownMenuContent align="end" className="z-[99] w-80 bg-popover">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {loading ? (
                  <DropdownMenuItem disabled>
                    Loading...
                  </DropdownMenuItem>
                ) : (notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <DropdownMenuItem key={notif.id} className="flex items-start space-x-2">
                      <span className="pt-0.5">
                        {iconsMap[notif.type as NotificationType] ?? iconsMap.other}
                      </span>
                      <span>
                        <span className="block text-sm">{notif.message}</span>
                        <span className="block text-xs text-muted-foreground">
                          {new Date(notif.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </span>
                    </DropdownMenuItem>
                  ))
                ) : (
                  randomNotifications.map((notif) => (
                    <DropdownMenuItem key={notif.id} className="flex items-start space-x-2 opacity-70">
                      <span className="pt-0.5">
                        {iconsMap[notif.type as NotificationType] ?? iconsMap.other}
                      </span>
                      <span>
                        <span className="block text-sm">{notif.message}</span>
                        <span className="block text-xs text-muted-foreground">Just now</span>
                      </span>
                    </DropdownMenuItem>
                  ))
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
