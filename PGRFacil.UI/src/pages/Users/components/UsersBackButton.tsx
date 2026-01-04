import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function UsersBackButton() {
  return (
    <Link
      to="/home"
      className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
    >
      <ArrowLeft
        size={16}
        className="mr-1 group-hover:-translate-x-1 transition-transform"
      />
      Voltar
    </Link>
  );
}
