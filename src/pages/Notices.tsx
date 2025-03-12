
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, FileText, Clock } from "lucide-react";

const Notices = () => {
  const assignments = [
    {
      id: 1,
      title: "Database Management System Project",
      description: "Create a fully functional database with front-end connectivity",
      dueDate: "2024-04-12",
      subject: "DBMS"
    },
    {
      id: 2,
      title: "Machine Learning Case Study",
      description: "Analysis and implementation of ML algorithms on provided dataset",
      dueDate: "2024-04-18",
      subject: "ML"
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
          {[1, 2, 3, 4, 5].map((index) => (
            <NoticeCard 
              key={index}
              title={`Important Notice #${index}`}
              description={`This is an important notice for all students of SRM University regarding upcoming events and academic updates.`}
              date="2024-04-10"
              type={index % 3 === 0 ? "event" : index % 2 === 0 ? "academic" : "general"}
            />
          ))}
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabsContent>
        
        <TabsContent value="academic" className="space-y-4">
          {[2, 4].map((index) => (
            <NoticeCard 
              key={index}
              title={`Academic Update #${index}`}
              description={`This is an academic notice for all students of SRM University regarding course updates and exam schedules.`}
              date="2024-04-08"
              type="academic"
            />
          ))}
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          {[3].map((index) => (
            <NoticeCard 
              key={index}
              title={`Event Announcement #${index}`}
              description={`Exciting event coming up at SRM University! Don't miss this opportunity to participate and showcase your talents.`}
              date="2024-04-15"
              type="event"
            />
          ))}
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-4">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface NoticeCardProps {
  title: string;
  description: string;
  date: string;
  type: "academic" | "event" | "general";
}

const NoticeCard = ({ title, description, date, type }: NoticeCardProps) => {
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
          <a href="#" className="text-sm text-thrive-500 hover:underline">Read more</a>
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
}

const AssignmentCard = ({ assignment }: AssignmentProps) => {
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
          <a href="#" className="text-sm text-thrive-500 hover:underline">View Details</a>
        </div>
      </CardContent>
    </Card>
  );
};

export default Notices;
