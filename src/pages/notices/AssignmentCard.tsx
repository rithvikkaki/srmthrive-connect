
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AssignmentCardProps {
  title: string;
  description: string;
  dueDate: string;
  portal: "classroom" | "academia";
  onClick: () => void;
}

const getPortalLink = (portal: "classroom" | "academia") =>
  portal === "classroom"
    ? { url: "https://classroom.google.com", label: "Go to Submission Portal" }
    : { url: "https://www.academia.edu.in", label: "Go to Submission Portal" };

const AssignmentCard = ({ title, description, dueDate, portal, onClick }: AssignmentCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center gap-4">
      <div className="bg-muted p-2 rounded-full">
        <FileText className="h-5 w-5 text-blue-500" />
      </div>
      <div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>Due: {new Date(dueDate).toLocaleDateString()}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
      <div className="flex justify-between mt-4">
        <Button 
          variant="link" 
          className="text-sm text-thrive-500 hover:underline p-0 h-auto"
          onClick={onClick}
        >
          Details
        </Button>
        <a
          href={getPortalLink(portal).url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-thrive-600 text-sm font-semibold hover:underline"
        >
          {getPortalLink(portal).label}
        </a>
      </div>
    </CardContent>
  </Card>
);

export default AssignmentCard;
