
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users } from "lucide-react";
import UserCard from "@/components/UserCard";

const Fellows = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const fellows = [
    {
      id: "1",
      name: "Arun Kumar",
      role: "Computer Science Student",
      avatar: "https://i.pravatar.cc/150?img=1",
      department: "Computer Science"
    },
    {
      id: "2",
      name: "Priya Sharma",
      role: "Civil Engineering Student",
      avatar: "https://i.pravatar.cc/150?img=2",
      department: "Civil Engineering"
    },
    {
      id: "3",
      name: "Vikram Singh",
      role: "Electrical Engineering Student",
      avatar: "https://i.pravatar.cc/150?img=3",
      department: "Electrical Engineering"
    },
    {
      id: "4",
      name: "Meera Patel",
      role: "Computer Science Student",
      avatar: "https://i.pravatar.cc/150?img=4",
      department: "Computer Science"
    },
    {
      id: "5",
      name: "Rahul Verma",
      role: "Mechanical Engineering Student",
      avatar: "https://i.pravatar.cc/150?img=5",
      department: "Mechanical Engineering"
    },
    {
      id: "6",
      name: "Deepa Nair",
      role: "Civil Engineering Student",
      avatar: "https://i.pravatar.cc/150?img=6",
      department: "Civil Engineering"
    },
    {
      id: "7",
      name: "Kiran Reddy",
      role: "Computer Science Student",
      avatar: "https://i.pravatar.cc/150?img=7",
      department: "Computer Science"
    },
    {
      id: "8",
      name: "Anjali Gupta",
      role: "Electrical Engineering Student",
      avatar: "https://i.pravatar.cc/150?img=8",
      department: "Electrical Engineering"
    }
  ];

  const filteredFellows = searchQuery 
    ? fellows.filter(fellow => 
        fellow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fellow.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fellow.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : fellows;

  const getFilteredByDepartment = (department: string) => {
    return filteredFellows.filter(fellow => fellow.department === department);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-thrive-500" />
        <h1 className="text-3xl font-bold">SRMThrive Fellows</h1>
      </div>
      
      <div className="relative w-full max-w-md mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search fellows by name, role, or department" 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Fellows</TabsTrigger>
          <TabsTrigger value="cs">Computer Science</TabsTrigger>
          <TabsTrigger value="ce">Civil Engineering</TabsTrigger>
          <TabsTrigger value="ee">Electrical Engineering</TabsTrigger>
          <TabsTrigger value="me">Mechanical Engineering</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFellows.map(fellow => (
                  <UserCard 
                    key={fellow.id}
                    id={fellow.id}
                    name={fellow.name}
                    role={fellow.role}
                    avatar={fellow.avatar}
                  />
                ))}
                {filteredFellows.length === 0 && (
                  <p className="text-muted-foreground col-span-3 text-center py-8">
                    No fellows found matching your search criteria
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cs">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredByDepartment("Computer Science").map(fellow => (
                  <UserCard 
                    key={fellow.id}
                    id={fellow.id}
                    name={fellow.name}
                    role={fellow.role}
                    avatar={fellow.avatar}
                  />
                ))}
                {getFilteredByDepartment("Computer Science").length === 0 && (
                  <p className="text-muted-foreground col-span-3 text-center py-8">
                    No Computer Science fellows found matching your search criteria
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ce">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredByDepartment("Civil Engineering").map(fellow => (
                  <UserCard 
                    key={fellow.id}
                    id={fellow.id}
                    name={fellow.name}
                    role={fellow.role}
                    avatar={fellow.avatar}
                  />
                ))}
                {getFilteredByDepartment("Civil Engineering").length === 0 && (
                  <p className="text-muted-foreground col-span-3 text-center py-8">
                    No Civil Engineering fellows found matching your search criteria
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ee">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredByDepartment("Electrical Engineering").map(fellow => (
                  <UserCard 
                    key={fellow.id}
                    id={fellow.id}
                    name={fellow.name}
                    role={fellow.role}
                    avatar={fellow.avatar}
                  />
                ))}
                {getFilteredByDepartment("Electrical Engineering").length === 0 && (
                  <p className="text-muted-foreground col-span-3 text-center py-8">
                    No Electrical Engineering fellows found matching your search criteria
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="me">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredByDepartment("Mechanical Engineering").map(fellow => (
                  <UserCard 
                    key={fellow.id}
                    id={fellow.id}
                    name={fellow.name}
                    role={fellow.role}
                    avatar={fellow.avatar}
                  />
                ))}
                {getFilteredByDepartment("Mechanical Engineering").length === 0 && (
                  <p className="text-muted-foreground col-span-3 text-center py-8">
                    No Mechanical Engineering fellows found matching your search criteria
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Fellows;
