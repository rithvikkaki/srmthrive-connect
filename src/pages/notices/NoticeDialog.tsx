
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

export default NoticeDialog;
