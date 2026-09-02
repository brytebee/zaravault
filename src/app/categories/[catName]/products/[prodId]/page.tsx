import React from "react";
import ProductToCart from "@/components/product/ProductToCart";
import { db } from "@/db";
import path from "@/path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Product, Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ProductReviews from "@/components/product/ProductReviews"; // Import the new component

interface ProductShowPageProps {
  params: {
    catName: string;
    prodId: string;
  };
}

interface ProductWithImages extends Product {
  images: PrismaImage[];
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock data for reviews
const mockReviews: Review[] = [
  {
    id: "1",
    userName: "John Doe",
    rating: 5,
    comment: "Excellent product! Exactly what I was looking for.",
    date: "2023-09-15",
  },
  {
    id: "2",
    userName: "Jane Smith",
    rating: 4,
    comment: "Good quality, but shipping took longer than expected.",
    date: "2023-09-10",
  },
  {
    id: "3",
    userName: "Mike Johnson",
    rating: 5,
    comment: "Fantastic value for money. Highly recommended!",
    date: "2023-09-05",
  },
  {
    id: "4",
    userName: "Emily Brown",
    rating: 3,
    comment: "Decent product, but not as durable as I hoped.",
    date: "2023-08-30",
  },
];

export default async function ProductShowPage({
  params: { catName, prodId },
}: ProductShowPageProps) {
  const product = (await db.product.findUnique({
    where: { id: prodId },
    include: { images: true },
  })) as ProductWithImages | null;

  if (!product) {
    notFound();
  }

  // Calculate average rating
  const averageRating =
    mockReviews.reduce((acc, review) => acc + review.rating, 0) /
    mockReviews.length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link
        href={path.products(catName)}
        className="inline-flex items-center text-violet-600 hover:text-violet-800 transition mb-6"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to {catName} products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center">
            {product?.images?.length ? (
              <Image
                src={product.images[0].url}
                alt={product.slug}
                width={600}
                height={600}
                className="rounded-lg object-contain max-h-[600px]"
              />
            ) : (
              <div className="h-[600px] w-full flex items-center justify-center bg-gray-200 rounded-lg">
                <p className="text-gray-500 text-xl">No image available</p>
              </div>
            )}
          </div>
          {product?.images?.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto py-2">
              {product.images.slice(1).map((image, index) => (
                <Image
                  key={image.id}
                  src={image.url}
                  alt={`${product.slug} - Image ${index + 2}`}
                  width={100}
                  height={100}
                  className="rounded-md object-cover cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-violet-950 capitalize">
            {product?.slug ?? "Product Details"}
          </h1>
          <p className="text-gray-600 text-lg">{product?.description}</p>

          <div className="text-3xl font-bold text-violet-950">
            ${product?.price.toFixed(2)}
          </div>

          <div className="py-4">
            <ProductToCart prod={product} />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Category: {catName}</li>
              <li>SKU: {product?.id.slice(0, 8).toUpperCase()}</li>
              {/* Add more product details as needed */}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <ProductReviews reviews={mockReviews} averageRating={averageRating} />

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-violet-950 mb-6">
          Related Products
        </h2>
        <p className="text-gray-600">
          Coming soon: Related products from the {catName} category.
        </p>
      </div>
    </div>
  );
}
