
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface PollCardProps {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
}

const PollCard = ({ id, title, description, options }: PollCardProps) => {
  const [voted, setVoted] = useState<string | null>(null);
  
  const handleVote = (optionId: string) => {
    if (!voted) {
      setVoted(optionId);
    }
  };
  
  return (
    <div className="bg-card rounded-md shadow-sm border border-border p-4">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium">{title}</h4>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      <div className="space-y-2">
        {options.map(option => (
          <div key={option.id} className="relative">
            {voted ? (
              <div className="flex items-center gap-2">
                <div className="w-full h-10 relative rounded-md overflow-hidden border border-border">
                  <div 
                    className={cn(
                      "absolute top-0 left-0 h-full",
                      {
                        "bg-thrive-500/20": voted === option.id,
                        "bg-secondary": voted !== option.id
                      }
                    )}
                    style={{ width: `${option.percentage}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-sm font-medium">{option.text}</span>
                    <span className="text-sm">{option.percentage}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full justify-start h-10 font-normal"
                onClick={() => handleVote(option.id)}
              >
                {option.text}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollCard;
