import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, ShoppingBag } from "lucide-react";
import { db } from "@/db";
import Button from "@/components/common/button";
import path from "@/path";

interface CategoryShowPageProps {
  params: {
    catName: string;
  };
}

export default async function CategoryShowPage({
  params: { catName },
}: CategoryShowPageProps) {
  const category = await db.category.findUnique({
    where: { name: catName },
    include: { products: { include: { images: true } } },
  });

  if (!category) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-800">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
          {category.name}
        </h1>
        {category.imageUrl && (
          <div className="relative w-full h-72 rounded-lg overflow-hidden">
            <Image
              src={category.imageUrl}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}
      </div>

      {/* If No Products Exist */}
      {category.products.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 animate-bounce" />
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            No products available
          </h3>
          <p className="mt-2 text-lg text-gray-500">
            Get started by adding a new product!
          </p>
          <div className="mt-8">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <Link href={path.productCreate(catName)}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {category.products.map((product) => (
            <Link
              href={path.productShow(catName, product.id)}
              key={product.id}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                {product.images[0] && (
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.images[0].url}
                      alt={product.slug}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600">
                    {product.slug}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description.slice(0, 100)}...
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Footer Section */}
      <div className="mt-16 text-center">
        <Button
          asChild
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
        >
          <Link href={path.productCreate(catName)}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Product
          </Link>
        </Button>
      </div>
    </div>
  );
}
