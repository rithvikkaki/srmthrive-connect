
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Dummy profile data, but now set as reactive state
const initialProfile = {
  avatarUrl: "https://i.pravatar.cc/100?img=5",
  name: "Naina Upadhyay",
  role: "Student",
};

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const handleAvatarChange = (newUrl: string) => {
    setProfile(prev => ({
      ...prev,
      avatarUrl: newUrl,
    }));
  };

  // If you plan to let users change name/role later, you can pass handlers for those too.

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        avatarUrl={profile.avatarUrl}
        name={profile.name}
        role={profile.role}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          avatarUrl={profile.avatarUrl}
          name={profile.name}
          role={profile.role}
        />
        <main className="flex-1 overflow-y-auto p-4">
          {/* Pass the avatarUrl, name, role, and avatar change handler to Outlet (children routes) */}
          <Outlet
            context={{
              avatarUrl: profile.avatarUrl,
              onAvatarChange: handleAvatarChange,
              name: profile.name,
              role: profile.role,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Layout;
