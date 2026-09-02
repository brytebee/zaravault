import React from "react";
import ProductToCart from "@/components/product/ProductToCart";
import { db } from "@/db";
import path from "@/path";
import Link from "next/link";
import ProductCarousel from "@/components/product/ProductCarousel";
import { PlusCircle } from "lucide-react";

interface ProductsPageProps {
  params: {
    catName: string;
  };
}

export default async function ProductsPage({
  params: { catName },
}: ProductsPageProps) {
  const products = await db.product.findMany({
    where: {
      category: { name: catName },
    },
    include: {
      images: {},
    },
  });

  const capitalizedCatName = catName.charAt(0).toUpperCase() + catName.slice(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {capitalizedCatName}
        </h1>
        <p className="text-xl text-gray-600">
          Explore our collection of {catName} products
        </p>
      </header>

      {products.length < 1 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <p className="text-xl text-gray-700 mb-4">
            No products yet in the {catName} category
          </p>
          <Link
            href={path.productCreate(catName)}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Product
          </Link>
        </div>
      ) : (
        <div>
          <ProductCarousel products={products} categoryName={catName} />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <Link
                  href={path.productShow(catName, prod.id)}
                  className="block p-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {prod.slug}
                  </h3>
                  <p className="text-gray-600 mb-4">${prod.price.toFixed(2)}</p>
                </Link>
                <div className="px-4 pb-4">
                  <ProductToCart prod={prod} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          href={path.productCreate(catName)}
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg"
        >
          <PlusCircle className="mr-2 h-6 w-6" />
          Add Product
        </Link>
      </div>
    </div>
  );
}
