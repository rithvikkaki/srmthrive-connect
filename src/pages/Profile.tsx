
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
    name: db.full_name || "Rithvik Kaki",
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
        <div className="space-y-6">
          <div className="bg-card rounded-md shadow-sm border border-border p-4">
            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm uppercase text-muted-foreground mb-1">STUDENT</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{profileData.department}</p>
                      <p className="text-sm text-muted-foreground">{profileData.university}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Year {profileData.year}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div><span className="font-medium">Joined:</span> {profileData.joined}</div>
                    <div><span className="font-medium">Program:</span> {profileData.program}</div>
                    <div><span className="font-medium">Course:</span> {profileData.course}</div>
                    <div><span className="font-medium">Role:</span> {profileData.role}</div>
                    <div><span className="font-medium">Hobbies:</span> {profileData.hobbies.join(", ")}</div>
                    <div><span className="font-medium">Interests:</span> {profileData.interests.join(", ")}</div>
                    <div><span className="font-medium">Achievements:</span> <span dangerouslySetInnerHTML={{ __html: profileData.achievements }} /></div>
                    <div>
                      <span className="font-medium">About Me:</span>
                      <div className="text-sm">{profileData.aboutMe}</div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-0"
                  style={{ background: EDIT_BUTTON_COLOR }}
                  onClick={handleEditProfile}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  EDIT
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm uppercase text-muted-foreground mb-1">EDIT PROFILE</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Name</label>
                      <Input
                        value={editProfileData.name}
                        onChange={e => setEditProfileData({ ...editProfileData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Bio</label>
                      <Input
                        value={editProfileData.bio}
                        onChange={e => setEditProfileData({ ...editProfileData, bio: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Department</label>
                      <Input
                        value={editProfileData.department}
                        onChange={e => setEditProfileData({ ...editProfileData, department: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">University</label>
                      <Input
                        value={editProfileData.university}
                        onChange={e => setEditProfileData({ ...editProfileData, university: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Year</label>
                      <Input
                        value={editProfileData.year}
                        onChange={e => setEditProfileData({ ...editProfileData, year: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Joined</label>
                      <Input
                        value={editProfileData.joined}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Program</label>
                      <select
                        className="w-full border rounded px-2 py-2 focus:outline-none"
                        value={editProfileData.program}
                        onChange={e => setEditProfileData({ ...editProfileData, program: e.target.value })}
                      >
                        {PROGRAMS.map(option => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Course</label>
                      <Input
                        value={editProfileData.course}
                        onChange={e => setEditProfileData({ ...editProfileData, course: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Role</label>
                      <select
                        className="w-full border rounded px-2 py-2 focus:outline-none"
                        value={editProfileData.role}
                        onChange={e => setEditProfileData({ ...editProfileData, role: e.target.value })}
                      >
                        {ROLES.map(option => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1">Hobbies</label>
                      <HobbyTagsInput
                        value={editProfileData.hobbies}
                        onChange={(newTags) => setEditProfileData({ ...editProfileData, hobbies: newTags })}
                        placeholder="Add a hobby..."
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1">Interests</label>
                      <HobbyTagsInput
                        value={editProfileData.interests}
                        onChange={newTags => setEditProfileData({ ...editProfileData, interests: newTags })}
                        placeholder="Add an interest..."
                      />
                      <div className="mt-1 flex flex-wrap gap-2">
                        {PREDEFINED_INTERESTS.map(opt => (
                          <button
                            type="button"
                            key={opt}
                            onClick={() =>
                              !editProfileData.interests.includes(opt) &&
                              setEditProfileData({
                                ...editProfileData,
                                interests: [...editProfileData.interests, opt]
                              })
                            }
                            className={`px-2 py-0.5 rounded text-xs
                              ${editProfileData.interests.includes(opt)
                                ? "bg-[#9b87f5] text-white"
                                : "bg-muted text-gray-700 hover:bg-gray-300"}
                            `}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1">Achievements (rich text allowed)</label>
                      <Textarea
                        value={editProfileData.achievements}
                        onChange={e => setEditProfileData({ ...editProfileData, achievements: e.target.value })}
                        placeholder="Type or paste HTML here for rich formatting."
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1">About Me</label>
                      <Textarea
                        value={editProfileData.aboutMe}
                        onChange={e => setEditProfileData({ ...editProfileData, aboutMe: e.target.value })}
                        placeholder="Tell us about yourself!"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={cancelEditProfile}
                  >
                    <X className="h-4 w-4 mr-1" />
                    CANCEL
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-thrive-500 hover:bg-thrive-600"
                    onClick={saveProfileChanges}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    SAVE
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="bg-card rounded-md shadow-sm border border-border p-4">
            <div className="flex flex-col items-center">
              <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="font-medium">Joined on</h3>
              <p className="text-muted-foreground">{profileData.joined}</p>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-md shadow-sm border border-border p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Input
                placeholder={`WHAT'S ON YOUR MIND? ${profileData.name.toUpperCase()}`}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 flex-1"
                onClick={handleSubmitPost}
              >
                <EditIcon className="h-4 w-4" />
                <span>CREATE POST</span>
              </Button>
              <Link to="/app/blogs" className="flex-1">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full"
                >
                  <Pencil className="h-4 w-4" />
                  <span>WRITE BLOG</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                className="flex items-center gap-2 flex-1"
                onClick={() => setShowAdModal(true)}
              >
                <FileImage className="h-4 w-4" />
                <span>POST AD</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 flex-1"
                onClick={() => setShowPollModal(true)}
              >
                <BarChart2 className="h-4 w-4" />
                <span>POLL</span>
              </Button>
            </div>
          </div>
          <Tabs defaultValue="posts">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="posts"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-thrive-500 data-[state=active]:bg-transparent"
              >
                POSTS
              </TabsTrigger>
              <TabsTrigger
                value="blogs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-thrive-500 data-[state=active]:bg-transparent"
              >
                BLOGS
              </TabsTrigger>
              <TabsTrigger
                value="ads"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-thrive-500 data-[state=active]:bg-transparent"
              >
                ADS
              </TabsTrigger>
              <TabsTrigger
                value="polls"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-thrive-500 data-[state=active]:bg-transparent"
              >
                POLLS
              </TabsTrigger>
              <TabsTrigger
                value="bookmarks"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-thrive-500 data-[state=active]:bg-transparent"
              >
                BOOKMARKS
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-6 space-y-6">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  timeAgo={post.timeAgo}
                  content={post.content}
                  likes={post.likes}
                  comments={post.comments}
                />
              ))}
              {posts.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No posts yet.
                </div>
              )}
            </TabsContent>
            <TabsContent value="blogs" className="mt-6 space-y-6">
              <div className="py-8 text-center text-muted-foreground">
                No blogs yet.
              </div>
            </TabsContent>
            <TabsContent value="ads" className="mt-6 space-y-6">
              {ads.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No ads yet.
                </div>
              )}
              {ads.map((ad) => (
                <div key={ad.id} className="bg-muted rounded-md p-4 border border-border space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={ad.author.avatar} alt={ad.author.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="font-medium">{ad.author.name}</span>
                  </div>
                  <div className="font-semibold text-lg">{ad.title}</div>
                  <div className="text-muted-foreground">{ad.desc}</div>
                  {ad.image && (
                    <img src={ad.image} alt="Ad" className="w-full max-h-64 rounded object-contain mt-2" />
                  )}
                  <div className="text-xs text-muted-foreground mt-1">{ad.timeAgo}</div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="polls" className="mt-6 space-y-6">
              {polls.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No polls yet.
                </div>
              )}
              {polls.map((poll) => (
                <div key={poll.id} className="bg-muted rounded-md p-4 border border-border animate-fade-in">
                  <div className="font-semibold">{poll.question}</div>
                  <ul className="mt-2 space-y-1">
                    {poll.options.map((opt: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="inline-block bg-card px-2 rounded">{opt}</span>
                        <span className="text-xs font-mono text-muted-foreground">{poll.votes[idx] || 0} votes</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-muted-foreground mt-1">Type: {poll.type}, Visibility: {poll.visibility}</div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="bookmarks" className="mt-6 space-y-6">
              <div className="py-8 text-center text-muted-foreground">
                No bookmarks yet.
              </div>
            </TabsContent>
          </Tabs>
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
                <button
                  className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                  onClick={cancelUpload}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {uploadError && <div className="text-red-500 text-sm mb-2">{uploadError}</div>}
            {uploadProgress > 0 && (
              <div className="w-full mb-2">
                <div className="h-2 bg-muted rounded">
                  <div className="bg-[#9b87f5] h-2 rounded" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <div className="text-xs text-muted-foreground text-right">{uploadProgress}%</div>
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={cancelUpload}>Cancel</Button>
              <Button
                onClick={handleUpdateAvatar}
                disabled={uploadProgress < 100}
              >
                Save New Photo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <AdCreateModal
        open={showAdModal}
        onOpenChange={setShowAdModal}
        onCreate={handleCreateAd}
        username={profileData.name}
        avatarUrl={profileData.avatarUrl}
      />
      <PollCreateModal
        open={showPollModal}
        onOpenChange={setShowPollModal}
        onCreate={handleCreatePoll}
      />
    </div>
  );
};

export default Profile;
