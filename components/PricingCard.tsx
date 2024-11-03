import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  highlighted = false,
}) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md ${
        highlighted ? "ring-2 ring-salmon" : ""
      }`}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-4xl font-bold mb-4">
        {price}
        <span className="text-sm font-normal">/month</span>
      </p>
      <ul className="mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <Check className="h-5 w-5 text-tangerine mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/contactus">
        <Button
          className={`w-full ${
            highlighted
              ? "bg-tangerine hover:bg-salmon"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          Choose Plan
        </Button>
      </Link>
    </div>
  );
};

export default PricingCard;
