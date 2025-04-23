import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { EditIcon, Pencil, FileImage, BarChart2, Calendar, BookOpen, Settings, Upload, X, Check, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import Post from "@/components/Post";
import HobbyTagsInput from "@/components/HobbyTagsInput";
import AdCreateModal from "@/components/AdCreateModal";
import PollCreateModal from "@/components/PollCreateModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuthUser } from "@/hooks/useAuthUser";

import Sidebar from "@/components/profile/Sidebar";
import PostsSection from "@/components/profile/PostsSection";

const EDIT_BUTTON_COLOR = "#9b87f5";

const PROGRAMS = [
  "B.Tech CSE", "B.Tech ECE", "MBA", "M.Tech", "BBA", "B.Sc", "BA", "B.Com"
];
const ROLES = ["Student", "Teacher", "Researcher"];
const PREDEFINED_INTERESTS = [
  "AI", "Web Dev", "Blockchain", "FinTech", "IoT", "Music", "ML", "Writing", "Football", "Guitar"
];

interface OutletProfileContext {
  avatarUrl: string;
  onAvatarChange: (url: string) => void;
  onProfileChange?: (data: { name?: string; role?: string; avatarUrl?: string }) => void;
  name: string;
  role: string;
}

// Util: map DB profile row to local state
function mapProfileFromDb(db: any) {
  return {
    name: db.full_name || db.email || "",
    bio: db.bio || "",
    department: db.department || "",
    university: db.university || "",
    year: db.year || "",
    joined: db.joined || (new Date().toISOString().slice(0,10)),
    course: db.course || "",
    program: db.program || "",
    role: db.role || "Student",
    hobbies: db.hobbies || [],
    interests: db.interests || [],
    achievements: db.achievements || "",
    aboutMe: db.about_me || "",
    avatarUrl: db.avatar_url || "https://i.pravatar.cc/100?img=12",
  };
}
function mapProfileToDb(data: any, userId: string) {
  return {
    id: userId,
    full_name: data.name,
    bio: data.bio,
    department: data.department,
    university: data.university,
    year: data.year,
    joined: data.joined,
    course: data.course,
    program: data.program,
    role: data.role,
    hobbies: data.hobbies,
    interests: data.interests,
    achievements: data.achievements,
    about_me: data.aboutMe,
    avatar_url: data.avatarUrl,
  };
}

const Profile = () => {
  const {
    avatarUrl: globalAvatarUrl,
    onAvatarChange,
    onProfileChange,
    name: globalName,
    role: globalRole,
  } = useOutletContext<OutletProfileContext>();
  const { user, loading } = useAuthUser();
  const { toast } = useToast();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // --- Data fetching/sync with Supabase ---
  // Only show own profile (from /app/profile/me or if user.id matches id)
  const profileUserId = (id === "me" || !id) ? user?.id : id;

  // Fetch user's profile from Supabase 
  const { data: dbProfile, isLoading, isError } = useQuery({
    queryKey: ["profile", profileUserId],
    queryFn: async () => {
      if (!profileUserId) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profileUserId)
        .maybeSingle();
      if (error) {
        throw new Error("Couldn't load profile");
      }
      return data;
    },
    enabled: !!profileUserId,
    refetchOnWindowFocus: false,
  });

  const [profileData, setProfileData] = useState({
    name: "Rithvik Kaki",
    bio: "Student | MERN Stack",
    department: "CS",
    university: "SRM University",
    year: "4",
    joined: new Date().toISOString().slice(0,10),
    course: "B.Tech Computer Science",
    program: "B.Tech CSE",
    role: "Student",
    hobbies: ["Guitar", "Football"],
    interests: ["AI", "Web Dev"],
    achievements: "Won Coding Hackathon 2024",
    aboutMe: "I love computers and building things!",
    avatarUrl: "https://i.pravatar.cc/100?img=12"
  });
  // Used for editing
  const [editProfileData, setEditProfileData] = useState({ ...profileData });
  const [isEditing, setIsEditing] = useState(false);

  // On load, update profileData with DB values (one-way, until next save)
  useEffect(() => {
    if (dbProfile) {
      const mapped = mapProfileFromDb(dbProfile);
      setProfileData(mapped);
      setEditProfileData(mapped);
      // Sync with global layout if name/role/avatar changed
      if (onProfileChange) {
        onProfileChange({ name: mapped.name, role: mapped.role, avatarUrl: mapped.avatarUrl });
      }
      if (onAvatarChange) {
        onAvatarChange(mapped.avatarUrl);
      }
    }
    // On first login/profile creation, this will also populate the backend
  // eslint-disable-next-line
  }, [dbProfile]);

  // On initial mount, if user logged in and no profile exists, create one
  useEffect(() => {
    if (user && !isLoading && dbProfile === null) {
      // Create profile with defaults & Supabase info
      const defaults = {
        ...profileData,
        name: user.user_metadata?.full_name || user.email || "User",
        avatarUrl: user.user_metadata?.avatar_url || profileData.avatarUrl,
        joined: new Date().toISOString().slice(0,10),
      };
      supabase.from("profiles")
        .insert([mapProfileToDb(defaults, user.id)])
        .then(({ error }) => {
          if (error) {
            toast({
              variant: "destructive",
              title: "Profile init failed",
              description: error.message,
            });
          } else {
            toast({ title: "Welcome!", description: "Your profile was created." });
            queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
          }
        });
    }
    // eslint-disable-next-line
  }, [user, dbProfile, isLoading]);

  // --- Avatar/photo upload/update (frontend only) ---
  const [postText, setPostText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [posts, setPosts] = useState([
    {
      id: "4",
      author: {
        id: "4",
        name: "Rithvik Kaki",
        avatar: "https://i.pravatar.cc/100?img=12"
      },
      timeAgo: "7 months ago",
      content: "Minor project presentation",
      likes: 0,
      comments: 0
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadError(null);
      if (!file.type.startsWith("image/")) {
        setUploadError("Please select an image file");
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file.",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File too large (max 5MB)");
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Upload an image smaller than 5MB.",
        });
        return;
      }
      setUploadedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDialogOpen(true);
      setUploadProgress(10);

      let progress = 10;
      const interval = setInterval(() => {
        progress += 25 + Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          setUploadProgress(progress);
          clearInterval(interval);
        } else {
          setUploadProgress(progress);
        }
      }, 150);
    }
  };

  // Save avatar URL to backend and update everywhere in app
  const avatarMutation = useMutation({
    mutationFn: async (avatarUrl: string) => {
      if (!profileUserId) throw new Error("No user ID");
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", profileUserId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", profileUserId] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Failed to update photo",
        description: error.message,
      });
    }
  });

  const handleUpdateAvatar = () => {
    if (previewUrl && uploadedImage) {
      if (onAvatarChange) onAvatarChange(previewUrl);
      if (onProfileChange) onProfileChange({ avatarUrl: previewUrl });
      setProfileData(pd => ({ ...pd, avatarUrl: previewUrl }));
      avatarMutation.mutate(previewUrl);
      toast({ title: "Profile photo updated", description: "Your profile photo has been successfully updated" });
      setDialogOpen(false);
      setUploadedImage(null);
      setPreviewUrl(null);
      setUploadProgress(0);
      setUploadError(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  const triggerFileInput = () => fileInputRef.current?.click();

  // --- Profile edit/save + sync to backend ---
  const profileMutation = useMutation({
    mutationFn: async (newProfile: typeof profileData) => {
      if (!profileUserId) throw new Error("No user ID");
      const updateData = mapProfileToDb(newProfile, profileUserId);
      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", profileUserId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", profileUserId] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: error.message,
      });
    }
  });

  const handleEditProfile = () => {
    setEditProfileData({ ...profileData });
    setIsEditing(true);
  };
  const saveProfileChanges = () => {
    setProfileData({ ...editProfileData });
    setIsEditing(false);
    if (onProfileChange) {
      onProfileChange({ name: editProfileData.name, role: editProfileData.role });
    }
    profileMutation.mutate({ ...editProfileData, avatarUrl: profileData.avatarUrl }); // Use current avatar url unless changed
    toast({
      title: "Profile updated",
      description: "Your profile details have been successfully updated",
    });
  };
  const cancelEditProfile = () => {
    setEditProfileData({ ...profileData });
    setIsEditing(false);
  };

  // -- Ad and Poll logic (kept as-is) --
  const [showAdModal, setShowAdModal] = useState(false);
  const [ads, setAds] = useState<any[]>([]);
  const [showPollModal, setShowPollModal] = useState(false);
  const [polls, setPolls] = useState<any[]>([]);
  const handleCreateAd = (ad: any) => {
    setAds([ad, ...ads]);
    toast({
      title: "Ad created",
      description: "Your ad has been successfully published",
    });
  };
  const handleCreatePoll = (poll: any) => {
    setPolls([poll, ...polls]);
    toast({
      title: "Poll created",
      description: "Your poll has been successfully published",
    });
  };
  const cancelUpload = () => {
    setDialogOpen(false);
    setUploadedImage(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };
  const handleSubmitPost = () => {
    if (!postText.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Post content cannot be empty",
      });
      return;
    }
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        id: "4",
        name: profileData.name,
        avatar: profileData.avatarUrl
      },
      timeAgo: "just now",
      content: postText,
      likes: 0,
      comments: 0
    };
    setPosts([newPost, ...posts]);
    setPostText("");
    toast({ title: "Post created", description: "Your post has been successfully published" });
  };

  // UI states for loading/errors
  if (loading || isLoading) {
    return <div className="py-16 text-center text-muted-foreground">Loading profile...</div>;
  }
  if (isError) {
    return <div className="py-16 text-center text-red-500">Failed to load profile. Please try again.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-black/90 rounded-lg overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-thrive-500/20 to-thrive-700/20"></div>
        <div className="p-6 relative">
          <div className="absolute -top-16 left-6 w-32 h-32 rounded-full bg-gradient-to-br from-thrive-300 to-thrive-600 p-1">
            <div className="w-full h-full rounded-full overflow-hidden relative group cursor-pointer" onClick={triggerFileInput}>
              <Avatar className="w-full h-full">
                <AvatarImage src={profileData.avatarUrl} alt={profileData.name} className="w-full h-full object-cover" />
                <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="flex justify-between items-start pt-16">
            <div className="text-white cursor-pointer" onClick={handleEditProfile}>
              <h1 className="text-3xl font-bold">{profileData.name}</h1>
              <div className="flex gap-4 text-white/80 mt-1">
                <span>{posts.length} Posts</span>
                <span>3 Blogs</span>
                <span>6 Friends</span>
              </div>
              <p className="text-white/60 mt-1">{profileData.bio}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="text-white border-0"
                style={{ background: EDIT_BUTTON_COLOR }}
                onClick={handleEditProfile}
              >
                <Pencil className="h-4 w-4 mr-1" />
                EDIT
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="ml-2"
              >
                <LogOut className="h-4 w-4 mr-1" />
                LOGOUT
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Sidebar
          profileData={profileData}
          isEditing={isEditing}
          handleEditProfile={handleEditProfile}
          cancelEditProfile={cancelEditProfile}
          saveProfileChanges={saveProfileChanges}
          editProfileData={editProfileData}
          setEditProfileData={setEditProfileData}
          EDIT_BUTTON_COLOR={EDIT_BUTTON_COLOR}
          PROGRAMS={PROGRAMS}
          ROLES={ROLES}
          PREDEFINED_INTERESTS={PREDEFINED_INTERESTS}
          HobbyTagsInput={HobbyTagsInput}
          Textarea={Textarea}
        />
        <div className="md:col-span-2 space-y-6">
          <PostsSection
            postText={postText}
            setPostText={setPostText}
            handleSubmitPost={handleSubmitPost}
            profileData={profileData}
            posts={posts}
            ads={ads}
            setShowAdModal={setShowAdModal}
            polls={polls}
            setShowPollModal={setShowPollModal}
          />
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Photo</DialogTitle>
            <DialogDescription>
              Preview and save your new profile photo
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            {previewUrl && (
              <div className="relative mb-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-muted"
                />
              </div>
            )}
            <div className="w-full flex flex-col gap-2">
              <Button
                className="w-full bg-thrive-500 hover:bg-thrive-600"
                onClick={handleUpdateAvatar}
                disabled={uploadProgress < 100}
              >
                Save Photo
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={cancelUpload}
              >
                Cancel
              </Button>
              {uploadError && <div className="text-red-500 mt-2">{uploadError}</div>}
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-thrive-500 h-2 rounded-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }} />
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {showAdModal && (
        <AdCreateModal
          open={showAdModal}
          onOpenChange={setShowAdModal}
          onCreate={handleCreateAd}
          user={{
            id: profileUserId,
            name: profileData.name,
            avatar: profileData.avatarUrl,
          }}
        />
      )}
      {showPollModal && (
        <PollCreateModal
          open={showPollModal}
          onOpenChange={setShowPollModal}
          onCreate={handleCreatePoll}
        />
      )}
    </div>
  );
};

export default Profile;
