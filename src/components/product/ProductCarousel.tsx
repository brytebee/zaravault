"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import path from "@/path";

interface Product {
  id: string;
  slug: string;
  price: number;
  images?: { url: string }[];
}

interface ProductCardProps {
  product: Product;
  categoryName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, categoryName }) => (
  <Link
    href={path.productShow(categoryName, product.id)}
    className="group px-3 py-4"
  >
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      {product.images && product.images[0] ? (
        <div className="relative h-56 w-full">
          <Image
            src={product.images[0].url}
            alt={product.slug}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ) : (
        <div className="h-56 bg-gray-200 flex items-center justify-center">
          <ShoppingBag className="h-16 w-16 text-gray-400" />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 truncate">
          {product.slug}
        </h3>
        <p className="text-gray-600 mt-2 text-lg font-medium">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  </Link>
);

interface ProductCarouselProps {
  products: Product[];
  categoryName: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  categoryName,
}) => {
  const sliderRef = useRef<Slider>(null);
  const [isHovering, setIsHovering] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true, // Enable infinite loop
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (isHovering) {
      sliderRef.current?.slickPause();
    } else {
      sliderRef.current?.slickPlay();
    }
  }, [isHovering]);

  return (
    <div
      className="relative px-8 py-6 bg-gray-50"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Slider ref={sliderRef} {...sliderSettings}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categoryName={categoryName}
          />
        ))}
      </Slider>
      {isHovering && (
        <>
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </>
      )}
    </div>
  );
};

export default ProductCarousel;
