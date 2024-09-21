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

// export default async function ProductShowPage({
//   params: { catName, prodId },
// }: ProductShowPageProps) {
//   const product = await db.product.findUnique({
//     where: { id: prodId },
//     include: { images: true },
//   });

//   if (!product) {
//     notFound();
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Link
//         href={path.categoryShow(catName)}
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to {catName} products
//       </Link>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-4">
//           {product.images && product.images.length > 0 ? (
//             <div className="relative h-96 rounded-lg overflow-hidden">
//               <Image
//                 src={product.images[0].url}
//                 alt={product.slug}
//                 layout="fill"
//                 objectFit="cover"
//                 className="transition-transform duration-300 hover:scale-105"
//               />
//             </div>
//           ) : (
//             <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
//               <p className="text-gray-500">No image available</p>
//             </div>
//           )}
//         </div>

//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             {product.slug}
//           </h1>
//           <p className="text-xl font-semibold text-blue-600 mb-4">
//             ${product.price.toFixed(2)}
//           </p>
//           <p className="text-gray-600 mb-6">{product.description}</p>

//           <ProductToCart prod={product} />

//           <div className="mt-8">
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">
//               Product Details
//             </h2>
//             <ul className="list-disc list-inside text-gray-600">
//               <li>Category: {catName}</li>
//               <li>SKU: {product.id}</li>
//               {/* Add more product details as needed */}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
