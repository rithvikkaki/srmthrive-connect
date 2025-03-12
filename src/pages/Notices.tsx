
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, FileText } from "lucide-react";

const Notices = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Notices & Announcements</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <NoticeCard 
              key={index}
              title={`Important Notice #${index}`}
              description={`This is an important notice for all students of SRM University regarding upcoming events and academic updates.`}
              date="2023-08-10"
              type={index % 3 === 0 ? "event" : index % 2 === 0 ? "academic" : "general"}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="academic" className="space-y-4">
          {[2, 4].map((index) => (
            <NoticeCard 
              key={index}
              title={`Academic Update #${index}`}
              description={`This is an academic notice for all students of SRM University regarding course updates and exam schedules.`}
              date="2023-08-08"
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
              date="2023-08-15"
              type="event"
            />
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

export default Notices;
