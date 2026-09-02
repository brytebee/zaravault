import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Layers } from "lucide-react";
import { db } from "@/db";
import Button from "@/components/common/button";
import path from "@/path";

export default async function CategoriesPage() {
  const categories = await db.category.findMany({});

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
          Product Categories
        </h1>
        <p className="text-xl text-gray-600">
          Explore our wide range of product categories
        </p>
      </div>

      {/* Categories Grid */}
      {categories.length < 1 ? (
        <div className="text-center py-12">
          <Layers className="mx-auto h-16 w-16 text-gray-400 animate-bounce" />
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            No categories available
          </h3>
          <p className="mt-2 text-lg text-gray-500">
            Get started by adding a new category!
          </p>
          <div className="mt-8">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <Link href={path.categoryCreate()}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Category
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              href={path.products(category.name)}
              key={category.id}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                {category.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">
                    {category.name}
                  </h3>
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
          <Link href={path.categoryCreate()}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Category
          </Link>
        </Button>
      </div>
    </div>
  );
}
