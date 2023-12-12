import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;
  if (id === 'kids') return notFound();
  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  );
}
