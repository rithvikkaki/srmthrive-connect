
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Dummy profile data -- replace with real user info as needed
const dummyProfile = {
  avatarUrl: "https://i.pravatar.cc/100?img=5",
  name: "Naina Upadhyay",
  role: "Student",
};

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        avatarUrl={dummyProfile.avatarUrl}
        name={dummyProfile.name}
        role={dummyProfile.role}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          avatarUrl={dummyProfile.avatarUrl}
          name={dummyProfile.name}
          role={dummyProfile.role}
        />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

