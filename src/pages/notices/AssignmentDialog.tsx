
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
            window.open("https://classroom.google.com", "_blank");
          }}
        >
          Go to Submission Portal
        </Button>
      </div>
    </DialogContent>
  );
};

export default AssignmentDialog;
