import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {icon}
      <h3 className="text-xl font-bold mt-4 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
export default FeatureCard;
