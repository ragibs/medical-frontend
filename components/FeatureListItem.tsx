import { LucideIcon } from "lucide-react";

interface FeatureListItemProps {
  icon: React.ReactElement<LucideIcon>;
  text: string;
}

const FeatureListItem: React.FC<FeatureListItemProps> = ({ icon, text }) => {
  return (
    <li className="flex items-center space-x-3">
      {icon}
      <span>{text}</span>
    </li>
  );
};

export default FeatureListItem;
