
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthUser } from "@/hooks/useAuthUser"; // NEW
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";
import Notices from "./pages/Notices";
import Bookmarks from "./pages/Bookmarks";
import Fellows from "./pages/Fellows";
import Events from "./pages/Events";
import Groups from "./pages/Groups";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Txt2YT from "./pages/Txt2YT";

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthUser();
  const location = useLocation();
  if (loading) return null; // Or loading spinner
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route
            path="/app"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Feed />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="notices" element={<Notices />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="fellows" element={<Fellows />} />
            <Route path="events" element={<Events />} />
            <Route path="groups" element={<Groups />} />
          </Route>
          <Route path="/txt2yt" element={<Txt2YT />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
