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
    <div className="container mx-auto px-4">
      <header className="text-center my-8">
        <h1 className="text-3xl font-bold text-violet-950 capitalize">
          {catName.charAt(0).toUpperCase() + catName.slice(1)}
        </h1>
        <p className="text-gray-600 mt-2">
          Explore our collection of {catName} products
        </p>
      </header>

      {products.length < 1 ? (
        <div className="text-center my-16">
          <p className="text-lg text-gray-500">
            No products yet in the {catName} category
          </p>
          <Link
            href={path.productCreate(catName)}
            className="mt-4 inline-block bg-violet-950 text-white py-2 px-4 rounded hover:bg-violet-700 transition"
          >
            Add Product
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((prod) => (
              <Link
                key={prod.id}
                href={path.productShow(catName, prod.id)}
                className="col-span-1"
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                  <ProductToCart prod={prod} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <footer className="text-center my-8">
        <Link
          href={path.productCreate(catName)}
          className="mt-4 inline-block bg-violet-950 text-white py-2 px-4 rounded hover:bg-violet-700 transition"
        >
          Add Product
        </Link>
      </footer>
    </div>
  );
}
