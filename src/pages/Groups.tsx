import { useState } from "react";
import { UsersRound, SearchIcon, BookOpen, Code, Rocket, Camera, Music, Beaker, Globe, Heart, Pen, Dumbbell, PieChart, Utensils, Send, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

interface Group {
  id: number;
  name: string;
  description: string;
  members: number;
  category: string;
  icon: JSX.Element;
  joined?: boolean;
  discussions?: Discussion[];
}

interface Discussion {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
  replies: DiscussionReply[];
}

interface DiscussionReply {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
}

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: "Web Development Club",
      description: "Learn and collaborate on web development projects",
      members: 156,
      category: "tech",
      icon: <Code className="h-10 w-10 text-blue-500" />,
      discussions: [
        {
          id: "1",
          author: {
            id: "4",
            name: "Rithvik Kaki",
            avatar: "https://i.pravatar.cc/100?img=12"
          },
          content: "Hey everyone! I'm working on a React project and having trouble with state management. Has anyone used Redux Toolkit and can share some tips?",
          timeAgo: "2 days ago",
          replies: [
            {
              id: "1-1",
              author: {
                id: "1",
                name: "Shekhar",
                avatar: "https://i.pravatar.cc/100?img=11"
              },
              content: "I've been using Redux Toolkit for a while now. It really simplifies the boilerplate compared to traditional Redux. Happy to help if you have specific questions!",
              timeAgo: "1 day ago"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "SRM Literature Society",
      description: "Discuss books, poetry and promote literary arts",
      members: 87,
      category: "academic",
      icon: <BookOpen className="h-10 w-10 text-green-500" />,
      discussions: [
        {
          id: "2",
          author: {
            id: "2",
            name: "Ram",
            avatar: "https://i.pravatar.cc/100?img=33"
          },
          content: "Just finished reading 'The Midnight Library' by Matt Haig. Highly recommend it for our next book club meeting. Any thoughts?",
          timeAgo: "3 days ago",
          replies: []
        }
      ]
    },
    {
      id: 3,
      name: "Startup Incubator Group",
      description: "For student entrepreneurs to share ideas and get mentorship",
      members: 134,
      category: "business",
      icon: <Rocket className="h-10 w-10 text-purple-500" />
    },
    {
      id: 4,
      name: "Photography Club",
      description: "Share photos, tips and organize photo walks",
      members: 92,
      category: "creative",
      icon: <Camera className="h-10 w-10 text-amber-500" />
    },
    {
      id: 5,
      name: "SRM Music Circle",
      description: "For music enthusiasts and performers",
      members: 108,
      category: "creative",
      icon: <Music className="h-10 w-10 text-red-500" />
    },
    {
      id: 6,
      name: "Research & Innovation Cell",
      description: "Collaborate on research projects across disciplines",
      members: 73,
      category: "academic",
      icon: <Beaker className="h-10 w-10 text-indigo-500" />
    },
    {
      id: 7,
      name: "Global Exchange Network",
      description: "Connect with international students and cultural exchange",
      members: 89,
      category: "cultural",
      icon: <Globe className="h-10 w-10 text-teal-500" />
    },
    {
      id: 8,
      name: "Social Outreach Team",
      description: "Volunteer for community service and social causes",
      members: 112,
      category: "service",
      icon: <Heart className="h-10 w-10 text-pink-500" />
    },
    {
      id: 9,
      name: "Creative Writing Club",
      description: "Workshops and sessions for aspiring writers",
      members: 64,
      category: "creative",
      icon: <Pen className="h-10 w-10 text-yellow-500" />
    },
    {
      id: 10,
      name: "Sports & Fitness Community",
      description: "Join sports teams and fitness activities",
      members: 145,
      category: "sports",
      icon: <Dumbbell className="h-10 w-10 text-orange-500" />
    },
    {
      id: 11,
      name: "Data Science Club",
      description: "Explore data analysis, machine learning and AI",
      members: 93,
      category: "tech",
      icon: <PieChart className="h-10 w-10 text-blue-600" />
    },
    {
      id: 12,
      name: "Culinary Arts Society",
      description: "Cook-offs, recipe sharing and food exploration",
      members: 76,
      category: "lifestyle",
      icon: <Utensils className="h-10 w-10 text-emerald-500" />
    }
  ]);

  // Handle joining a group
  const handleJoinGroup = (groupId: number) => {
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { 
              ...group, 
              joined: !group.joined,
              members: group.joined ? group.members - 1 : group.members + 1
            }
          : group
      )
    );
    
    const group = groups.find(g => g.id === groupId);
    if (group) {
      const action = group.joined ? "left" : "joined";
      toast({
        title: `Successfully ${action} group`,
        description: `You have ${action} "${group.name}"`,
        duration: 3000,
      });
    }
  };

  const handleOpenGroup = (group: Group) => {
    setSelectedGroup(group);
  };

  const handleAddDiscussion = () => {
    if (!selectedGroup || !newDiscussion.trim()) return;
    
    const discussion: Discussion = {
      id: `disc-${Date.now()}`,
      author: {
        id: "me",
        name: "Rithvik Kaki",
        avatar: "https://i.pravatar.cc/100?img=12"
      },
      content: newDiscussion,
      timeAgo: "just now",
      replies: []
    };
    
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === selectedGroup.id 
          ? { 
              ...group, 
              discussions: [...(group.discussions || []), discussion]
            }
          : group
      )
    );
    
    setNewDiscussion("");
    toast({
      title: "Discussion posted",
      description: "Your discussion has been added to the group",
    });
    
    // Update the selected group
    const updatedGroup = groups.find(g => g.id === selectedGroup.id);
    if (updatedGroup) {
      setSelectedGroup({
        ...updatedGroup,
        discussions: [...(updatedGroup.discussions || []), discussion]
      });
    }
  };

  const handleAddReply = (discussionId: string) => {
    if (!selectedGroup || !replyText.trim()) return;
    
    const reply: DiscussionReply = {
      id: `reply-${Date.now()}`,
      author: {
        id: "me",
        name: "Rithvik Kaki",
        avatar: "https://i.pravatar.cc/100?img=12"
      },
      content: replyText,
      timeAgo: "just now"
    };
    
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === selectedGroup.id 
          ? { 
              ...group, 
              discussions: (group.discussions || []).map(disc => 
                disc.id === discussionId
                  ? { ...disc, replies: [...disc.replies, reply] }
                  : disc
              )
            }
          : group
      )
    );
    
    setReplyText("");
    setReplyingTo(null);
    toast({
      title: "Reply posted",
      description: "Your reply has been added to the discussion",
    });
    
    // Update the selected group
    const updatedGroup = groups.find(g => g.id === selectedGroup.id);
    if (updatedGroup) {
      setSelectedGroup(updatedGroup);
    }
  };

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <UsersRound className="h-6 w-6 text-thrive-500" />
        <h1 className="text-3xl font-bold">Student Groups</h1>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Input
            className="pl-10"
            placeholder="Search groups by name, description or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <p className="text-sm text-muted-foreground mr-2 pt-1">Popular categories:</p>
          {["tech", "academic", "creative", "business", "cultural"].map(category => (
            <Badge 
              key={category}
              variant="outline"
              className="cursor-pointer hover:bg-accent"
              onClick={() => setSearchTerm(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroups.map(group => (
          <Card key={group.id} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-background p-2 rounded-xl border w-14 h-14 flex items-center justify-center">
                {group.icon}
              </div>
              <div>
                <CardTitle className="text-xl">{group.name}</CardTitle>
                <CardDescription>{group.members} members</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{group.description}</p>
              <div className="flex justify-between items-center mt-4">
                <Badge variant="outline" className="uppercase">{group.category}</Badge>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleOpenGroup(group)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Discussions
                  </Button>
                  <Button 
                    variant={group.joined ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleJoinGroup(group.id)}
                  >
                    {group.joined ? "Leave Group" : "Join Group"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredGroups.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No groups found matching your search.</p>
          <Button 
            variant="link" 
            className="mt-2"
            onClick={() => setSearchTerm("")}
          >
            Clear search
          </Button>
        </div>
      )}
      
      <Dialog open={!!selectedGroup} onOpenChange={(open) => !open && setSelectedGroup(null)}>
        {selectedGroup && (
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-muted">
                  {selectedGroup.icon}
                </div>
                <span>{selectedGroup.name}</span>
              </DialogTitle>
              <DialogDescription>
                {selectedGroup.members} members • {selectedGroup.category}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="discussions" className="flex-1 flex flex-col overflow-hidden">
              <TabsList>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              
              <TabsContent value="discussions" className="flex-1 flex flex-col overflow-hidden">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4 mb-4">
                    {selectedGroup.discussions?.length ? (
                      selectedGroup.discussions.map(discussion => (
                        <div key={discussion.id} className="border rounded-md p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar className="h-10 w-10">
                              <img 
                                src={discussion.author.avatar} 
                                alt={discussion.author.name}
                                className="w-full h-full object-cover"
                              />
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{discussion.author.name}</p>
                                <span className="text-xs text-muted-foreground">{discussion.timeAgo}</span>
                              </div>
                              <p className="mt-1">{discussion.content}</p>
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs mt-2"
                                onClick={() => setReplyingTo(discussion.id)}
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                          
                          {discussion.replies.length > 0 && (
                            <div className="ml-12 space-y-3 border-l-2 pl-4 mt-4">
                              {discussion.replies.map(reply => (
                                <div key={reply.id} className="flex items-start gap-3">
                                  <Avatar className="h-7 w-7">
                                    <img 
                                      src={reply.author.avatar} 
                                      alt={reply.author.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <p className="font-medium text-sm">{reply.author.name}</p>
                                      <span className="text-xs text-muted-foreground">{reply.timeAgo}</span>
                                    </div>
                                    <p className="text-sm mt-1">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {replyingTo === discussion.id && (
                            <div className="mt-3 ml-12">
                              <div className="flex items-start gap-2">
                                <Avatar className="h-7 w-7">
                                  <img 
                                    src="https://i.pravatar.cc/100?img=12" 
                                    alt="Your avatar"
                                    className="w-full h-full object-cover"
                                  />
                                </Avatar>
                                <div className="flex-1">
                                  <Textarea
                                    placeholder="Write a reply..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="min-h-[80px] text-sm"
                                  />
                                  <div className="flex justify-end gap-2 mt-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setReplyingTo(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button 
                                      size="sm"
                                      onClick={() => handleAddReply(discussion.id)}
                                      disabled={!replyText.trim()}
                                    >
                                      Post Reply
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No discussions yet. Be the first to start a conversation!</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="mt-4 border-t pt-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <img 
                        src="https://i.pravatar.cc/100?img=12" 
                        alt="Your avatar"
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Start a new discussion..."
                        value={newDiscussion}
                        onChange={(e) => setNewDiscussion(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end mt-2">
                        <Button 
                          onClick={handleAddDiscussion}
                          disabled={!newDiscussion.trim()}
                        >
                          Post Discussion
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="about">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Description</h3>
                    <p className="text-muted-foreground">{selectedGroup.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Category</h3>
                    <Badge variant="outline" className="uppercase">{selectedGroup.category}</Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Membership</h3>
                    <p className="text-muted-foreground">
                      {selectedGroup.joined ? 
                        "You are a member of this group" : 
                        "You are not a member of this group"}
                    </p>
                    <Button 
                      className="mt-2"
                      variant={selectedGroup.joined ? "destructive" : "default"}
                      onClick={() => handleJoinGroup(selectedGroup.id)}
                    >
                      {selectedGroup.joined ? "Leave Group" : "Join Group"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Groups;
