import React from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/db";
import path from "@/path";
import { ShoppingBag, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const ProductCarousel = dynamic(
  () => import("@/components/product/ProductCarousel"),
  {
    ssr: false,
  }
);

async function getFeaturedProducts() {
  const categories = await db.category.findMany({
    include: {
      products: {
        include: { images: true },
        take: 10, // Limit to 10 products per category
      },
    },
    take: 5, // Limit to 5 categories
  });

  return categories;
}

export default async function Home() {
  const featuredCategories = await getFeaturedProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-12 mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-xl mb-8">
          Discover amazing products from various categories
        </p>
        <Link
          href={path.categories()}
          className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition duration-300"
        >
          Explore Categories
        </Link>
      </div>

      {/* Featured Products Section */}
      {featuredCategories.map((category) => (
        <div key={category.id} className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {category.name}
            </h2>
            <Link
              href={path.products(category.name)}
              className="text-purple-600 hover:text-purple-800 flex items-center"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <ProductCarousel
            products={category.products}
            categoryName={category.name}
          />
        </div>
      ))}

      {/* Call-to-Action Section */}
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to add your products?
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          Start by creating a new category for your items.
        </p>
        <Link
          href={path.categoryCreate()}
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-teal-600 transition duration-300"
        >
          Create a Category
        </Link>
      </div>
    </div>
  );
}
