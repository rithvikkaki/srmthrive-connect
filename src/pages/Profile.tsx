
import { useState } from "react";
import { useParams } from "react-router-dom";
import { EditIcon, Pencil, FileImage, BarChart2, Package, Calendar, BookOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Post from "@/components/Post";

const Profile = () => {
  const { id } = useParams();
  const [postText, setPostText] = useState("");

  const handleSubmitPost = () => {
    // Would handle post submission in a real app
    setPostText("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-black/90 rounded-lg overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-thrive-500/20 to-thrive-700/20"></div>
        <div className="p-6 relative">
          <div className="absolute -top-16 left-6 w-32 h-32 rounded-full bg-gradient-to-br from-thrive-300 to-thrive-600 p-1">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img 
                src="https://i.pravatar.cc/100?img=12" 
                alt="Rithvik Kaki"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-start pt-16">
            <div className="text-white">
              <h1 className="text-3xl font-bold">Rithvik Kaki</h1>
              <div className="flex gap-4 text-white/80 mt-1">
                <span>3 Posts</span>
                <span>3 Blogs</span>
                <span>6 Friends</span>
              </div>
              <p className="text-white/60 mt-1">Student | MERN Stack</p>
            </div>
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              EDIT
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="bg-card rounded-md shadow-sm border border-border p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm uppercase text-muted-foreground mb-1">STUDENT</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">CS</p>
                    <p className="text-sm text-muted-foreground">SRM University</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Year 4</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="text-thrive-500">
                EDIT
              </Button>
            </div>
          </div>
          
          <div className="bg-card rounded-md shadow-sm border border-border p-4">
            <div className="flex flex-col items-center">
              <Package className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="font-medium">Joined on</h3>
              <p className="text-muted-foreground">THU DEC 17 2020</p>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-md shadow-sm border border-border p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="https://i.pravatar.cc/100?img=12" 
                  alt="Rithvik Kaki"
                  className="w-full h-full object-cover"
                />
              </div>
              <Input
                placeholder="WHAT'S ON YOUR MIND? RITHVIK KAKI"
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
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 flex-1"
              >
                <Pencil className="h-4 w-4" />
                <span>WRITE BLOG</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 flex-1"
              >
                <FileImage className="h-4 w-4" />
                <span>POST AD</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 flex-1"
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
                value="bookmarks" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-thrive-500 data-[state=active]:bg-transparent"
              >
                BOOKMARKS
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="mt-6 space-y-6">
              <Post 
                id="4"
                author={{
                  id: "4",
                  name: "Rithvik Kaki",
                  avatar: "https://i.pravatar.cc/100?img=12"
                }}
                timeAgo="7 months ago"
                content="Minor project presentation"
                likes={0}
                comments={0}
              />
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
    </div>
  );
};

export default Profile;
