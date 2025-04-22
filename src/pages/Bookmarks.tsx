import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, FileText, GraduationCap, Users, Trash, BookmarkX } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type BookmarkType = "research" | "internship" | "job" | "event";

interface BookmarkItem {
  id: number;
  title: string;
  description: string;
  type: BookmarkType;
  date: string;
  details?: string;
  company?: string;
  location?: string;
  salary?: string;
  deadline?: string;
  requirements?: string[];
  contact?: string;
  isBookmarked?: boolean;
}

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([
    {
      id: 1,
      title: "Research Opportunity: AI in Healthcare",
      description: "Join the research team working on innovative AI solutions for healthcare.",
      type: "research",
      date: "2023-07-15",
      details: "This research project focuses on developing AI algorithms to analyze medical images for early disease detection. The team is led by Dr. Johnson from the Computer Science department.",
      requirements: ["Knowledge of Python", "Experience with TensorFlow or PyTorch", "Interest in healthcare applications"],
      deadline: "2023-08-15",
      contact: "dr.johnson@srm.edu"
    },
    {
      id: 2,
      title: "Summer Internship at Tech Solutions Inc.",
      description: "Apply for a 3-month internship program focusing on web development and UI/UX design.",
      type: "internship",
      date: "2023-07-20",
      company: "Tech Solutions Inc.",
      location: "Chennai, Tamil Nadu",
      salary: "₹15,000/month",
      details: "This internship provides hands-on experience in web development using React, Node.js, and other modern technologies. Interns will work on real client projects under mentorship.",
      requirements: ["Basic understanding of HTML, CSS, JavaScript", "Knowledge of React is a plus", "Good communication skills"],
      deadline: "2023-08-30",
      contact: "careers@techsolutions.com"
    },
    {
      id: 3,
      title: "Workshop on Blockchain Technology",
      description: "Attend this workshop to learn about blockchain fundamentals and applications.",
      type: "event",
      date: "2023-08-05",
      details: "This one-day workshop will cover blockchain basics, smart contracts, and practical applications. Includes hands-on sessions and networking opportunities.",
      location: "Main Auditorium, SRM University",
      deadline: "2023-08-03",
      contact: "events@srm.edu"
    },
    {
      id: 4,
      title: "Job Opening: Software Developer",
      description: "Full-time position for recent graduates with knowledge of React and Node.js.",
      type: "job",
      date: "2023-08-10",
      company: "Innovate Tech",
      location: "Bangalore, Karnataka",
      salary: "₹6-10 LPA",
      details: "This is an entry-level position for recent graduates interested in full-stack development. You'll be working on cutting-edge web applications for various clients.",
      requirements: ["Bachelor's degree in CS or related field", "Knowledge of React, Node.js", "Good problem-solving skills", "0-2 years experience"],
      contact: "hr@innovatetech.com"
    },
    {
      id: 5,
      title: "Research Paper: Machine Learning Algorithms",
      description: "Review this important research paper on advanced ML algorithms for your project.",
      type: "research",
      date: "2023-08-12",
      details: "This paper presents novel machine learning approaches for image classification with limited training data. Important reference for students working on ML projects.",
      requirements: ["Basic understanding of machine learning concepts"],
      contact: "library@srm.edu"
    }
  ]);

  const [selectedBookmark, setSelectedBookmark] = useState<BookmarkItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Function to toggle bookmark status
  const toggleBookmark = (bookmarkId: number) => {
    setBookmarks(prevBookmarks => 
      prevBookmarks.map(bookmark => 
        bookmark.id === bookmarkId 
          ? { ...bookmark, isBookmarked: !(bookmark.isBookmarked ?? true) }
          : bookmark
      )
    );
    
    // Show toast notification
    const bookmark = bookmarks.find(b => b.id === bookmarkId);
    if (bookmark) {
      const action = bookmark.isBookmarked ? "removed from" : "added to";
      toast({
        title: `Bookmark ${action} your collection`,
        description: `"${bookmark.title}" has been ${action} your bookmarks.`,
        duration: 3000,
      });
    }
  };

  // Function to remove bookmark from list
  const removeBookmark = (bookmarkId: number) => {
    const bookmarkToRemove = bookmarks.find(b => b.id === bookmarkId);
    
    setBookmarks(prevBookmarks => 
      prevBookmarks.filter(bookmark => bookmark.id !== bookmarkId)
    );
    
    // Show toast notification
    if (bookmarkToRemove) {
      toast({
        title: "Bookmark removed",
        description: `"${bookmarkToRemove.title}" has been removed from your bookmarks.`,
        duration: 3000,
      });
    }
  };

  const handleViewDetails = (bookmark: BookmarkItem) => {
    setSelectedBookmark(bookmark);
    setDialogOpen(true);
  };

  // Set all bookmarks as initially bookmarked
  useEffect(() => {
    setBookmarks(prev => 
      prev.map(bookmark => ({ ...bookmark, isBookmarked: true }))
    );
  }, []);

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
            <BookmarkCard 
              key={bookmark.id} 
              bookmark={bookmark} 
              onViewDetails={handleViewDetails} 
              onToggleBookmark={toggleBookmark}
              onRemoveBookmark={removeBookmark}
            />
          ))}
          {bookmarks.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">You don't have any bookmarks yet.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="research" className="space-y-4">
          {bookmarks.filter(b => b.type === "research").map((bookmark) => (
            <BookmarkCard 
              key={bookmark.id} 
              bookmark={bookmark} 
              onViewDetails={handleViewDetails} 
              onToggleBookmark={toggleBookmark}
              onRemoveBookmark={removeBookmark}
            />
          ))}
          {bookmarks.filter(b => b.type === "research").length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No research bookmarks found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="internship" className="space-y-4">
          {bookmarks.filter(b => b.type === "internship").map((bookmark) => (
            <BookmarkCard 
              key={bookmark.id} 
              bookmark={bookmark} 
              onViewDetails={handleViewDetails} 
              onToggleBookmark={toggleBookmark}
              onRemoveBookmark={removeBookmark}
            />
          ))}
          {bookmarks.filter(b => b.type === "internship").length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No internship bookmarks found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="job" className="space-y-4">
          {bookmarks.filter(b => b.type === "job").map((bookmark) => (
            <BookmarkCard 
              key={bookmark.id} 
              bookmark={bookmark} 
              onViewDetails={handleViewDetails} 
              onToggleBookmark={toggleBookmark}
              onRemoveBookmark={removeBookmark}
            />
          ))}
          {bookmarks.filter(b => b.type === "job").length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No job bookmarks found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="event" className="space-y-4">
          {bookmarks.filter(b => b.type === "event").map((bookmark) => (
            <BookmarkCard 
              key={bookmark.id} 
              bookmark={bookmark} 
              onViewDetails={handleViewDetails} 
              onToggleBookmark={toggleBookmark}
              onRemoveBookmark={removeBookmark}
            />
          ))}
          {bookmarks.filter(b => b.type === "event").length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No event bookmarks found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedBookmark && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedBookmark.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-1 pt-2">
                  <span className="text-xs bg-muted px-2 py-1 rounded-full uppercase">
                    {selectedBookmark.type}
                  </span>
                  <span className="text-muted-foreground text-sm ml-2">
                    Saved on {new Date(selectedBookmark.date).toLocaleDateString()}
                  </span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {selectedBookmark.company && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">COMPANY</h3>
                    <p>{selectedBookmark.company}</p>
                  </div>
                )}
                
                {selectedBookmark.location && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">LOCATION</h3>
                    <p>{selectedBookmark.location}</p>
                  </div>
                )}
                
                {selectedBookmark.salary && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">COMPENSATION</h3>
                    <p>{selectedBookmark.salary}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">DESCRIPTION</h3>
                  <p>{selectedBookmark.details || selectedBookmark.description}</p>
                </div>
                
                {selectedBookmark.requirements && selectedBookmark.requirements.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">REQUIREMENTS</h3>
                    <ul className="list-disc pl-4 space-y-1">
                      {selectedBookmark.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedBookmark.deadline && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">DEADLINE</h3>
                    <p>{new Date(selectedBookmark.deadline).toLocaleDateString()}</p>
                  </div>
                )}
                
                {selectedBookmark.contact && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">CONTACT</h3>
                    <p>{selectedBookmark.contact}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                >
                  Close
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    removeBookmark(selectedBookmark.id);
                    setDialogOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <BookmarkX className="h-4 w-4" />
                  Remove Bookmark
                </Button>
                <Button>Apply Now</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface BookmarkCardProps {
  bookmark: BookmarkItem;
  onViewDetails: (bookmark: BookmarkItem) => void;
  onToggleBookmark: (bookmarkId: number) => void;
  onRemoveBookmark: (bookmarkId: number) => void;
}

const BookmarkCard = ({ bookmark, onViewDetails, onToggleBookmark, onRemoveBookmark }: BookmarkCardProps) => {
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
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemoveBookmark(bookmark.id)}
            className="h-8 w-8 text-muted-foreground hover:text-red-500"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Bookmark 
            className={`h-5 w-5 cursor-pointer ${bookmark.isBookmarked ? 'text-thrive-500' : 'text-muted-foreground'}`}
            fill={bookmark.isBookmarked ? "currentColor" : "none"}
            onClick={() => onToggleBookmark(bookmark.id)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{bookmark.description}</p>
        <div className="flex gap-2">
          <span className="text-xs bg-muted px-2 py-1 rounded-full uppercase">{bookmark.type}</span>
          <Button 
            variant="link" 
            className="text-sm text-thrive-500 hover:underline ml-auto p-0 h-auto" 
            onClick={() => onViewDetails(bookmark)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Bookmarks;
