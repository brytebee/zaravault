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
  });

  return (
    <div>
      Products page
      {products.length < 1 ? (
        <p>No products yet in the {catName} category</p>
      ) : (
        <div>
          {products.map((prod) => (
            // product card
            <div key={prod.id}>
              <ProductToCart prod={prod} />
            </div>
          ))}
        </div>
      )}
      <Link href={path.productCreate(catName)}>Add Product</Link>
    </div>
  );
}
