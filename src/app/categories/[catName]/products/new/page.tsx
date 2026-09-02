import ProductCreateForm from "@/components/product/ProductCreateForm";

interface ProdPageProps {
  params: {
    catName: string;
  };
}
export default function ProductCreatePage({
  params: { catName },
}: ProdPageProps) {
  return (
    <div>
      <ProductCreateForm catName={catName} />
    </div>
  );
}
