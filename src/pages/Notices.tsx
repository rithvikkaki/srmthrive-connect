
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, FileText, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface NoticeDialogProps {
  notice: {
    id: number;
    title: string;
    description: string;
    date: string;
    type: "academic" | "event" | "general";
    fullContent?: string;
  } | null;
  onClose: () => void;
}

const NoticeDialog = ({ notice, onClose }: NoticeDialogProps) => {
  if (!notice) return null;
  
  const getTypeText = () => {
    switch (notice.type) {
      case "academic": return "Academic Notice";
      case "event": return "Event Notice";
      default: return "General Notice";
    }
  };
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{notice.title}</DialogTitle>
        <DialogDescription>
          {getTypeText()} • Posted on {new Date(notice.date).toLocaleDateString()}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <p className="text-foreground">
          {notice.fullContent || notice.description}
        </p>
        
        {notice.type === "academic" && (
          <div className="border border-border rounded p-3">
            <h4 className="font-medium text-sm mb-2">Important Dates</h4>
            <ul className="text-sm space-y-1">
              <li>• Syllabus Completion: April 10, 2024</li>
              <li>• Revision Classes: April 11-15, 2024</li>
              <li>• Final Examinations: April 20-30, 2024</li>
            </ul>
          </div>
        )}
        
        {notice.type === "event" && (
          <div className="border border-border rounded p-3">
            <h4 className="font-medium text-sm mb-2">Event Details</h4>
            <ul className="text-sm space-y-1">
              <li>• Date: April 20, 2024</li>
              <li>• Venue: Main Auditorium</li>
              <li>• Time: 10:00 AM - 4:00 PM</li>
              <li>• Registration: Required (Link below)</li>
            </ul>
          </div>
        )}
        
        {notice.type === "event" && (
          <Button className="w-full">Register for Event</Button>
        )}
        
        {notice.type === "academic" && (
          <Button 
            className="w-full"
            onClick={() => {
              window.open("https://academia.srmist.edu.in", "_blank");
            }}
          >
            Go to Academia Portal
          </Button>
        )}
      </div>
    </DialogContent>
  );
};

interface AssignmentDialogProps {
  assignment: {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    subject: string;
    details?: string;
  } | null;
  onClose: () => void;
}

const AssignmentDialog = ({ assignment, onClose }: AssignmentDialogProps) => {
  if (!assignment) return null;
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{assignment.title}</DialogTitle>
        <DialogDescription>
          {assignment.subject} • Due on {new Date(assignment.dueDate).toLocaleDateString()}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <p className="text-foreground">
          {assignment.details || assignment.description}
        </p>
        
        <div className="border border-border rounded p-3">
          <h4 className="font-medium text-sm mb-2">Submission Guidelines</h4>
          <ul className="text-sm space-y-1">
            <li>• Format: PDF document</li>
            <li>• Maximum Size: 10MB</li>
            <li>• Naming Convention: REGNO_TITLE</li>
            <li>• Submit via the Academia portal</li>
          </ul>
        </div>
        
        <Button 
          className="w-full"
          onClick={() => {
            window.open("https://academia.srmist.edu.in", "_blank");
          }}
        >
          Go to Submission Portal
        </Button>
      </div>
    </DialogContent>
  );
};

const Notices = () => {
  const [selectedNotice, setSelectedNotice] = useState<{
    id: number;
    title: string;
    description: string;
    date: string;
    type: "academic" | "event" | "general";
    fullContent?: string;
  } | null>(null);
  
  const [selectedAssignment, setSelectedAssignment] = useState<{
    id: number;
    title: string;
    description: string;
    dueDate: string;
    subject: string;
    details?: string;
  } | null>(null);

  const notices = [
    {
      id: 1,
      title: "Important Notice #1",
      description: "This is an important notice for all students of SRM University regarding upcoming events and academic updates.",
      date: "2024-04-10",
      type: "general" as const,
      fullContent: "This is an important notice for all students of SRM University regarding upcoming events and academic updates. Please ensure that you check your student portal regularly for the latest information. All students are required to update their personal information and contact details in the student portal by April 15th, 2024. Failure to do so may result in communication issues regarding important academic matters."
    },
    {
      id: 2,
      title: "Academic Update #2",
      description: "This is an academic notice for all students of SRM University regarding course updates and exam schedules.",
      date: "2024-04-08",
      type: "academic" as const,
      fullContent: "This is an academic notice for all students of SRM University regarding course updates and exam schedules. The end semester examination timetable has been published and is available in the Academia portal. Students are advised to check their exam dates and prepare accordingly. All pending assignments must be submitted by April 15th, 2024. Special revision sessions will be conducted for all subjects during the week before examinations."
    },
    {
      id: 3,
      title: "Event Announcement #3",
      description: "Exciting event coming up at SRM University! Don't miss this opportunity to participate and showcase your talents.",
      date: "2024-04-15",
      type: "event" as const,
      fullContent: "Exciting event coming up at SRM University! The Annual Cultural Fest 'Rhythm 2024' will be held from April 20-22, 2024. Don't miss this opportunity to participate and showcase your talents. The event will feature competitions in music, dance, drama, literature, and fine arts. Cash prizes worth over ₹5,00,000 to be won! Registration is open until April 15th, 2024. Register now to secure your spot."
    },
    {
      id: 4,
      title: "Academic Update #4",
      description: "Important information regarding the upcoming semester registration process and fee payment.",
      date: "2024-04-08",
      type: "academic" as const,
      fullContent: "Important information regarding the upcoming semester registration process and fee payment. The registration for the next semester will begin on May 1st, 2024. Students are required to clear all pending dues before the registration process. The fee payment window will be open from May 1-15, 2024. Late payment will attract penalty as per university rules. Students with scholarship need to renew their applications before April 25th, 2024."
    },
    {
      id: 5,
      title: "Important Notice #5",
      description: "Updates regarding the campus facilities and maintenance schedule for the upcoming month.",
      date: "2024-04-10",
      type: "general" as const,
      fullContent: "Updates regarding the campus facilities and maintenance schedule for the upcoming month. The central library will remain closed for renovation from April 20-25, 2024. During this period, the digital library will be accessible 24/7. The sports complex will undergo routine maintenance on April 18-19, 2024. Alternative arrangements have been made at the secondary sports field. The campus Wi-Fi infrastructure is being upgraded on April 22, 2024, which may cause temporary connectivity issues."
    }
  ];
  
  const assignments = [
    {
      id: 1,
      title: "Database Management System Project",
      description: "Create a fully functional database with front-end connectivity",
      dueDate: "2024-04-12",
      subject: "DBMS",
      details: "Create a fully functional database with front-end connectivity. This project requires you to design and implement a relational database for a real-world scenario of your choice. The application should include at least 5 tables with proper relationships, normalization up to 3NF, and a user-friendly interface for data manipulation. Implement CRUD operations, advanced queries, stored procedures, and transactions. Ensure proper error handling and data validation. Bonus points for implementing additional features like user authentication, logging, or data visualization."
    },
    {
      id: 2,
      title: "Machine Learning Case Study",
      description: "Analysis and implementation of ML algorithms on provided dataset",
      dueDate: "2024-04-18",
      subject: "ML",
      details: "Analysis and implementation of ML algorithms on the provided dataset. You are required to apply various machine learning techniques to analyze the customer churn dataset. Tasks include data preprocessing, feature selection, model training using at least 3 different algorithms, evaluation of model performance, and detailed analysis of results. Submission should include your code files, a report explaining your methodology and findings, and a presentation summarizing your approach and results."
    }
  ];
  
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Notices & Announcements</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {notices.map((notice) => (
            <NoticeCard 
              key={notice.id}
              title={notice.title}
              description={notice.description}
              date={notice.date}
              type={notice.type}
              onClick={() => setSelectedNotice(notice)}
            />
          ))}
          {assignments.map((assignment) => (
            <AssignmentCard 
              key={assignment.id} 
              assignment={assignment}
              onClick={() => setSelectedAssignment(assignment)}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="academic" className="space-y-4">
          {notices.filter(n => n.type === "academic").map((notice) => (
            <NoticeCard 
              key={notice.id}
              title={notice.title}
              description={notice.description}
              date={notice.date}
              type={notice.type}
              onClick={() => setSelectedNotice(notice)}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          {notices.filter(n => n.type === "event").map((notice) => (
            <NoticeCard 
              key={notice.id}
              title={notice.title}
              description={notice.description}
              date={notice.date}
              type={notice.type}
              onClick={() => setSelectedNotice(notice)}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-4">
          {assignments.map((assignment) => (
            <AssignmentCard 
              key={assignment.id} 
              assignment={assignment}
              onClick={() => setSelectedAssignment(assignment)}
            />
          ))}
        </TabsContent>
      </Tabs>
      
      <Dialog open={!!selectedNotice} onOpenChange={() => setSelectedNotice(null)}>
        <NoticeDialog notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
      </Dialog>
      
      <Dialog open={!!selectedAssignment} onOpenChange={() => setSelectedAssignment(null)}>
        <AssignmentDialog assignment={selectedAssignment} onClose={() => setSelectedAssignment(null)} />
      </Dialog>
    </div>
  );
};

interface NoticeCardProps {
  title: string;
  description: string;
  date: string;
  type: "academic" | "event" | "general";
  onClick: () => void;
}

const NoticeCard = ({ title, description, date, type, onClick }: NoticeCardProps) => {
  const getTypeIcon = () => {
    switch (type) {
      case "academic":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "event":
        return <Calendar className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-orange-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="bg-muted p-2 rounded-full">
          {getTypeIcon()}
        </div>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>Posted on {new Date(date).toLocaleDateString()}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex justify-end mt-4">
          <Button 
            variant="link" 
            className="text-sm text-thrive-500 hover:underline p-0 h-auto"
            onClick={onClick}
          >
            Read more
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface AssignmentProps {
  assignment: {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    subject: string;
  };
  onClick: () => void;
}

const AssignmentCard = ({ assignment, onClick }: AssignmentProps) => {
  const daysUntilDue = () => {
    const today = new Date();
    const due = new Date(assignment.dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const days = daysUntilDue();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="bg-muted p-2 rounded-full">
          <Clock className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <CardTitle className="text-xl">{assignment.title}</CardTitle>
          <CardDescription>Subject: {assignment.subject}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-3">{assignment.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium text-red-600">
              Due: {new Date(assignment.dueDate).toLocaleDateString()}
            </span>
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${days <= 3 ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
              {days <= 0 ? 'Overdue' : `${days} days left`}
            </span>
          </div>
          <Button 
            variant="link" 
            className="text-sm text-thrive-500 hover:underline p-0 h-auto"
            onClick={onClick}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Notices;
