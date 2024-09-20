import ProductToCart from "@/components/product/ProductToCart";
import { db } from "@/db";
import path from "@/path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Product, Image as PrismaImage } from "@prisma/client";
import Image from "next/image";

interface ProductShowPageProps {
  params: {
    catName: string;
    prodId: string;
  };
}

interface ProductWithImages extends Product {
  images: PrismaImage[];
}

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

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center my-8">
        <h1 className="text-3xl font-bold text-violet-950 capitalize">
          {product?.slug ?? "Product Details"}
        </h1>
        <p className="text-gray-600 mt-2">{product?.description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product?.images?.length ? (
            <Image
              src={product.images[0].url}
              alt={product.slug}
              width={500}
              height={500}
              className="rounded-lg"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div>
          <ProductToCart prod={product} />
        </div>
      </div>

      <footer className="text-center my-8">
        <Link
          href={path.products(catName)}
          className="mt-4 inline-block bg-violet-950 text-white py-2 px-4 rounded hover:bg-violet-700 transition"
        >
          Back to {catName} products
        </Link>
      </footer>
    </div>
  );
}
