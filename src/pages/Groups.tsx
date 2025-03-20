
import { useState } from "react";
import { UsersRound, SearchIcon, BookOpen, Code, Rocket, Camera, Music, Beaker, Globe, Heart, Pen, Dumbbell, PieChart, Utensils } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const groups = [
    {
      id: 1,
      name: "Web Development Club",
      description: "Learn and collaborate on web development projects",
      members: 156,
      category: "tech",
      icon: <Code className="h-10 w-10 text-blue-500" />
    },
    {
      id: 2,
      name: "SRM Literature Society",
      description: "Discuss books, poetry and promote literary arts",
      members: 87,
      category: "academic",
      icon: <BookOpen className="h-10 w-10 text-green-500" />
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
  ];

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
                <Button variant="outline" size="sm">Join Group</Button>
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
    </div>
  );
};

export default Groups;
