import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarSrc: string;
  color: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  avatarSrc,
  color,
}) => {
  return (
    <div className={`${color} p-6 rounded-lg shadow-md`}>
      <p className="text-lg mb-4 text-gray-800">{quote}</p>
      <div className="flex items-center">
        <Image
          src={avatarSrc}
          width={40}
          height={40}
          alt={`Avatar of ${author}`}
          className="rounded-full mr-4"
        />
        <div>
          <div className="font-bold text-gray-900">{author}</div>
          <div className="text-sm text-gray-600">{role}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
