export default function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center px-2 mb-8">
      <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
      <p className="text-sm sm:text-base text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
