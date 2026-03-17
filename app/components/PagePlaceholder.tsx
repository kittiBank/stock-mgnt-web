// Reusable page placeholder component
export default function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-950">{title}</h1>
      {description && <p className="text-blue-600 mt-2">{description}</p>}

      <div className="mt-8 bg-white rounded-lg border border-blue-200 p-12 text-center">
        <p className="text-blue-500">Page content coming soon...</p>
      </div>
    </div>
  );
}
