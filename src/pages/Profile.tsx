import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { EditIcon, Pencil, FileImage, BarChart2, Package, Calendar, BookOpen, Settings, Upload, X, Check, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import Post from "@/components/Post";
import HobbyTagsInput from "@/components/HobbyTagsInput";

// Use a color for edit button from the provided palette.
const EDIT_BUTTON_COLOR = "#9b87f5";

const PROGRAMS = [
  "B.Tech CSE", "B.Tech ECE", "MBA", "M.Tech", "BBA", "B.Sc", "BA", "B.Com"
];
const ROLES = ["Student", "Teacher", "Researcher"];
const PREDEFINED_INTERESTS = [
  "AI", "Web Dev", "Blockchain", "FinTech", "IoT", "Music", "ML", "Writing", "Football", "Guitar"
];

const Profile = () => {
  // ... keep existing code up to state initialization ...
  const { id } = useParams();

  // ----- NEW: Add additional profile fields and "About Me" -----
  // auto-generate join date if empty
  const getDefaultJoinDate = () => {
    const today = new Date();
    return today.toISOString().slice(0,10);
  };

  const [postText, setPostText] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("https://i.pravatar.cc/100?img=12");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // for photo
  const [uploadError, setUploadError] = useState<string | null>(null);

  // UPDATED PROFILE DATA SHAPE
  const [profileData, setProfileData] = useState({
    name: "Rithvik Kaki",
    bio: "Student | MERN Stack",
    department: "CS",
    university: "SRM University",
    year: "4",
    joined: getDefaultJoinDate(),
    course: "B.Tech Computer Science",
    program: "B.Tech CSE",
    role: "Student",
    hobbies: ["Guitar", "Football"],
    interests: ["AI", "Web Dev"],
    achievements: "Won Coding Hackathon 2024",
    aboutMe: "I love computers and building things!"
  });
  const [editProfileData, setEditProfileData] = useState({...profileData});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleLogout = () => {
    // Ideally, disconnect from Supabase/auth etc.
    window.location.href = "/login";
  };

  // Fix 1: Add posts array & [SHOW POSTS] when created!
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
        avatar: avatarUrl
      },
      timeAgo: "just now",
      content: postText,
      likes: 0,
      comments: 0
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    toast({
      title: "Post created",
      description: "Your post has been successfully published",
    });
  };

  // -------- PROFILE PHOTO UPLOAD FIX --------
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

      // Simulate progress
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

  // Save action: "instant" for now, but you can plug an actual upload here
  const handleUpdateAvatar = () => {
    if (previewUrl && uploadedImage) {
      setAvatarUrl(previewUrl);
      toast({
        title: "Profile photo updated",
        description: "Your profile photo has been successfully updated",
      });
      setDialogOpen(false);
      setUploadedImage(null);
      setPreviewUrl(null);
      setUploadProgress(0);
      setUploadError(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const cancelUpload = () => {
    setUploadedImage(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setUploadError(null);
    setDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ------- Profile Edit Logic with expanded fields -------
  const handleEditProfile = () => {
    setEditProfileData({...profileData});
    setIsEditing(true);
  };

  const saveProfileChanges = () => {
    setProfileData({...editProfileData});
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile details have been successfully updated",
    });
  };

  const cancelEditProfile = () => {
    setEditProfileData({...profileData});
    setIsEditing(false);
  };

  // ... rest of the code stays the same, render, etc. ...
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-black/90 rounded-lg overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-thrive-500/20 to-thrive-700/20"></div>
        <div className="p-6 relative">
          <div className="absolute -top-16 left-6 w-32 h-32 rounded-full bg-gradient-to-br from-thrive-300 to-thrive-600 p-1">
            <div className="w-full h-full rounded-full overflow-hidden relative group cursor-pointer" onClick={triggerFileInput}>
              <Avatar className="w-full h-full">
                <AvatarImage src={avatarUrl} alt={profileData.name} className="w-full h-full object-cover" />
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
              {/* Change: Edit button color */}
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
            {/* Expanded Profile Info */}
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
                    <div><span className="font-medium">Achievements:</span> <span dangerouslySetInnerHTML={{__html: profileData.achievements}} /></div>
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
                        onChange={e => setEditProfileData({...editProfileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Bio</label>
                      <Input 
                        value={editProfileData.bio} 
                        onChange={e => setEditProfileData({...editProfileData, bio: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Department</label>
                      <Input 
                        value={editProfileData.department} 
                        onChange={e => setEditProfileData({...editProfileData, department: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">University</label>
                      <Input 
                        value={editProfileData.university} 
                        onChange={e => setEditProfileData({...editProfileData, university: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Year</label>
                      <Input 
                        value={editProfileData.year} 
                        onChange={e => setEditProfileData({...editProfileData, year: e.target.value})}
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
                        onChange={e => setEditProfileData({...editProfileData, program: e.target.value})}
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
                        onChange={e => setEditProfileData({...editProfileData, course: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Role</label>
                      <select
                        className="w-full border rounded px-2 py-2 focus:outline-none"
                        value={editProfileData.role}
                        onChange={e => setEditProfileData({...editProfileData, role: e.target.value})}
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
                        onChange={(newTags) => setEditProfileData({...editProfileData, hobbies: newTags})}
                        placeholder="Add a hobby..."
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1">Interests</label>
                      <HobbyTagsInput
                        value={editProfileData.interests}
                        onChange={newTags => setEditProfileData({...editProfileData, interests: newTags})}
                        placeholder="Add an interest..."
                      />
                      {/* Optionally: Quick pick */}
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
                        onChange={e => setEditProfileData({...editProfileData, achievements: e.target.value})}
                        placeholder="Type or paste HTML here for rich formatting."
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1">About Me</label>
                      <Textarea
                        value={editProfileData.aboutMe}
                        onChange={e => setEditProfileData({...editProfileData, aboutMe: e.target.value})}
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
        
        {/* POSTS section now shows posts correctly */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-md shadow-sm border border-border p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={avatarUrl} 
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
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "This feature is under development",
                  });
                }}
              >
                <FileImage className="h-4 w-4" />
                <span>POST AD</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 flex-1"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Poll feature is under development",
                  });
                }}
              >
                <BarChart2 className="h-4 w-4" />
                <span>POLL</span>
              </Button>
            </div>
          </div>
          
          {/* Show posts */}
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
            
            <TabsContent value="blogs">
              <div className="py-8 text-center text-muted-foreground">
                No blogs yet.
              </div>
            </TabsContent>
            
            <TabsContent value="ads">
              <div className="py-8 text-center text-muted-foreground">
                No ads yet.
              </div>
            </TabsContent>
            
            <TabsContent value="bookmarks">
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
                  <div className="bg-[#9b87f5] h-2 rounded" style={{width: `${uploadProgress}%`}}></div>
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
    </div>
  );
};

export default Profile;
