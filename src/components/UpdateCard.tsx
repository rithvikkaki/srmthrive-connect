
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface UpdateCardProps {
  title: string;
  description: string;
  link: string;
  className?: string;
}

const UpdateCard = ({ title, description, link, className }: UpdateCardProps) => {
  return (
    <div className={cn("p-3 bg-muted/50 rounded-md", className)}>
      <Link to={link} className="text-sm font-medium text-thrive-600 hover:underline">
        {title}
      </Link>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <Link to={link} className="text-xs text-center block mt-2 text-muted-foreground hover:text-foreground">
        LINK
      </Link>
    </div>
  );
};

export default UpdateCard;
