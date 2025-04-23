
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default AssignmentCard;
