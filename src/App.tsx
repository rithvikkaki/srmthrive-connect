
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

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
          <Route path="/app" element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="notices" element={<Notices />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="fellows" element={<Fellows />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
