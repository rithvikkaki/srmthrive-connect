
import React from "react";

interface AdCardProps {
  ad: {
    id: string;
    title: string;
    desc: string;
    image?: string;
    author: { avatar: string; name: string };
    timeAgo: string;
  };
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => (
  <div className="bg-muted rounded-md p-4 border border-border space-y-2 animate-fade-in">
    <div className="flex items-center gap-2 mb-2">
      <img src={ad.author.avatar} alt={ad.author.name} className="w-8 h-8 rounded-full object-cover" />
      <span className="font-medium">{ad.author.name}</span>
    </div>
    <div className="font-semibold text-lg">{ad.title}</div>
    <div className="text-muted-foreground">{ad.desc}</div>
    {ad.image && (
      <img src={ad.image} alt="Ad" className="w-full max-h-64 rounded object-contain mt-2" />
    )}
    <div className="text-xs text-muted-foreground mt-1">{ad.timeAgo}</div>
  </div>
);

export default AdCard;
