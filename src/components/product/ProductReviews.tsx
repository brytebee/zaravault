import React from "react";
import { Star, User } from "lucide-react";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  averageRating,
}) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-violet-950 mb-6">
        Customer Reviews
      </h2>
      <div className="flex items-center space-x-2 mb-6">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(averageRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              fill="currentColor"
            />
          ))}
        </div>
        <span className="text-gray-600">
          {averageRating.toFixed(1)} ({reviews.length} reviews)
        </span>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center space-x-4 mb-2">
              <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
              <div>
                <p className="font-semibold">{review.userName}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
