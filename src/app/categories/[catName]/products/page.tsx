import ProductToCart from "@/components/product/ProductToCart";
import { db } from "@/db";
import path from "@/path";
import Link from "next/link";

interface ProductsPageProps {
  params: {
    catName: string;
  };
}

export default async function ProductsPage({
  params: { catName },
}: ProductsPageProps) {
  const products = await db.product.findMany({
    where: { category: { name: catName } },
    include: { images: {} },
  });

  return (
    <div>
      {products.length < 1 ? (
        <p>No products yet in the {catName} category</p>
      ) : (
        <div>
          <div className=" bg-violet-950 text-center text-white text-lg py-4">
            {catName.charAt(0).toUpperCase()}
            {catName.slice(1)}
          </div>
          <div className="grid grid-cols-4 gap-8 mx-8">
            {products.map((prod) => (
              <div key={prod.id} className="col-span-1">
                <ProductToCart prod={prod} />
              </div>
            ))}
          </div>
        </div>
      )}
      <Link href={path.productCreate(catName)}>Add Product</Link>
    </div>
  );
}
