
import { cn } from "@/lib/utils";

interface UpdateCardProps {
  title: string;
  description: string;
  link: string;
  className?: string;
}

const UpdateCard = ({ title, description, link, className }: UpdateCardProps) => {
  return (
    <div className={cn("p-3 bg-muted/50 rounded-md", className)}>
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-thrive-600 hover:underline">
        {title}
      </a>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-center block mt-2 text-muted-foreground hover:text-foreground">
        LINK
      </a>
    </div>
  );
};

export default UpdateCard;
