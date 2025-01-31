interface ITotalCardProps {
  title: string;
  value: number;
  gradient: string;
}

export const TotalCard = ({ title, value, gradient }: ITotalCardProps) => (
  <div
    className={`p-8 rounded-2xl shadow-lg ${gradient} flex flex-col justify-between h-full transition-all duration-300 transform hover:scale-105`}
  >
    <h1 className="text-3xl font-semibold text-gray-100">{title}</h1>
    <p className="text-5xl font-bold mt-2 text-gray-100">${value.toFixed(2)}</p>
  </div>
);
