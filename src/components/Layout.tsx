
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Initial Profile set to match Rithvik Kaki's info (matches the main profile!)
const initialProfile = {
  avatarUrl: "https://i.pravatar.cc/100?img=12",      // The same avatar as in Profile
  name: "Rithvik Kaki",
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

  // Handler for avatar changes from Profile page via Outlet
  const handleAvatarChange = (newUrl: string) => {
    setProfile(prev => ({
      ...prev,
      avatarUrl: newUrl,
    }));
  };

  // Handler for profile changes from Profile page via Outlet
  const handleProfileChange = ({
    name,
    role,
    avatarUrl,
  }: { name?: string; role?: string; avatarUrl?: string }) => {
    setProfile(prev => ({
      ...prev,
      name: name !== undefined ? name : prev.name,
      role: role !== undefined ? role : prev.role,
      avatarUrl: avatarUrl !== undefined ? avatarUrl : prev.avatarUrl,
    }));
  };

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
          {/* Include name, role, avatarUrl & updaters in Outlet context */}
          <Outlet
            context={{
              avatarUrl: profile.avatarUrl,
              onAvatarChange: handleAvatarChange,
              onProfileChange: handleProfileChange,
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
