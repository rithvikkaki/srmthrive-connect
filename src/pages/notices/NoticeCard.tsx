
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default NoticeCard;
