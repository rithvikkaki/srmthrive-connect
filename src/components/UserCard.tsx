
import { Link } from "react-router-dom";

interface UserCardProps {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

const UserCard = ({ id, name, role, avatar }: UserCardProps) => {
  return (
    <Link 
      to={`/app/profile/${id}`}
      className="flex items-center space-x-3 mb-6"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-thrive-300 to-thrive-600 flex items-center justify-center overflow-hidden">
        <img 
          src={avatar} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </Link>
  );
};

export default UserCard;
