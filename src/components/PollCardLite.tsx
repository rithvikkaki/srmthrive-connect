
import React from "react";

interface PollCardLiteProps {
  poll: {
    id: string;
    question: string;
    options: string[];
    votes: number[];
    type: string;
    visibility: string;
  };
}

const PollCardLite: React.FC<PollCardLiteProps> = ({ poll }) => (
  <div className="bg-muted rounded-md p-4 border border-border animate-fade-in">
    <div className="font-semibold">{poll.question}</div>
    <ul className="mt-2 space-y-1">
      {poll.options.map((opt, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <span className="inline-block bg-card px-2 rounded">{opt}</span>
          <span className="text-xs font-mono text-muted-foreground">{poll.votes[idx] || 0} votes</span>
        </li>
      ))}
    </ul>
    <div className="text-xs text-muted-foreground mt-1">
      Type: {poll.type}, Visibility: {poll.visibility}
    </div>
  </div>
);

export default PollCardLite;
