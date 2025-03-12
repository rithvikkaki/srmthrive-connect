
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, FileText, GraduationCap, Users } from "lucide-react";

const Bookmarks = () => {
  const [bookmarks] = useState([
    {
      id: 1,
      title: "Research Opportunity: AI in Healthcare",
      description: "Join the research team working on innovative AI solutions for healthcare.",
      type: "research",
      date: "2023-07-15"
    },
    {
      id: 2,
      title: "Summer Internship at Tech Solutions Inc.",
      description: "Apply for a 3-month internship program focusing on web development and UI/UX design.",
      type: "internship",
      date: "2023-07-20"
    },
    {
      id: 3,
      title: "Workshop on Blockchain Technology",
      description: "Attend this workshop to learn about blockchain fundamentals and applications.",
      type: "event",
      date: "2023-08-05"
    },
    {
      id: 4,
      title: "Job Opening: Software Developer",
      description: "Full-time position for recent graduates with knowledge of React and Node.js.",
      type: "job",
      date: "2023-08-10"
    },
    {
      id: 5,
      title: "Research Paper: Machine Learning Algorithms",
      description: "Review this important research paper on advanced ML algorithms for your project.",
      type: "research",
      date: "2023-08-12"
    }
  ]);

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Bookmark className="h-6 w-6 text-thrive-500" />
        <h1 className="text-3xl font-bold">My Bookmarks</h1>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="internship">Internships</TabsTrigger>
          <TabsTrigger value="job">Jobs</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </TabsContent>
        
        <TabsContent value="research" className="space-y-4">
          {bookmarks.filter(b => b.type === "research").map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </TabsContent>
        
        <TabsContent value="internship" className="space-y-4">
          {bookmarks.filter(b => b.type === "internship").map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </TabsContent>
        
        <TabsContent value="job" className="space-y-4">
          {bookmarks.filter(b => b.type === "job").map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </TabsContent>
        
        <TabsContent value="event" className="space-y-4">
          {bookmarks.filter(b => b.type === "event").map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface BookmarkItem {
  id: number;
  title: string;
  description: string;
  type: "research" | "internship" | "job" | "event";
  date: string;
}

const BookmarkCard = ({ bookmark }: { bookmark: BookmarkItem }) => {
  const getTypeIcon = () => {
    switch (bookmark.type) {
      case "research":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "internship":
        return <GraduationCap className="h-5 w-5 text-green-500" />;
      case "job":
        return <Users className="h-5 w-5 text-purple-500" />;
      case "event":
        return <Bookmark className="h-5 w-5 text-orange-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex gap-3">
          <div className="bg-muted p-2 rounded-full mt-1">
            {getTypeIcon()}
          </div>
          <div>
            <CardTitle className="text-xl">{bookmark.title}</CardTitle>
            <CardDescription>Saved on {new Date(bookmark.date).toLocaleDateString()}</CardDescription>
          </div>
        </div>
        <Bookmark className="h-5 w-5 text-thrive-500 cursor-pointer" fill="currentColor" />
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{bookmark.description}</p>
        <div className="flex gap-2">
          <span className="text-xs bg-muted px-2 py-1 rounded-full uppercase">{bookmark.type}</span>
          <a href="#" className="text-sm text-thrive-500 hover:underline ml-auto">View Details</a>
        </div>
      </CardContent>
    </Card>
  );
};

export default Bookmarks;
