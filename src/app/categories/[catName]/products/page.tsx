import { createCart } from "@/actions";
import FormButton from "@/components/common/form-button";
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

  console.log(products);

  return (
    <div>
      Products page
      {products.length < 1 ? (
        <p>No products yet in the {catName} category</p>
      ) : (
        <div>
          {products.map((prod) => (
            // product card
            <form action={createCart}>
              <p>{prod.slug}</p>
              <p>{prod.description}</p>
              <p>{prod.quantity}</p>
              <p>{prod.price}</p>
              <FormButton>Add to Cart</FormButton>
            </form>
          ))}
        </div>
      )}
      <Link href={path.productCreate(catName)}>Add Product</Link>
    </div>
  );
}
