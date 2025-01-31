// Reusable TotalCard Component
interface ITotalCardProps {
  title: string;
  value: number;
  gradient: string;
}

export const TotalCard = ({ title, value, gradient }: ITotalCardProps) => (
  <div
    className={`p-6 rounded-lg shadow-xl w-1/2 ${gradient} flex flex-col justify-center`}
  >
    <h1 className="text-2xl font-bold text-blue-950">{title}</h1>
    <p className="text-4xl font-semibold mt-2 text-gray-100">
      ${value.toFixed(2)}
    </p>
  </div>
);
