interface ProductDetailsPageProps {
  params: { id: string };
}

export default function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = params;
  console.log(id);
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}
