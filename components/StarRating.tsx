import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

type StarRatingProps = {
  rating: number | null// Expect a number for the rating
  totalStars?: number; // Optionally set the total number of stars to display
};

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5 }) => {
    if (rating === null) {
        return (
          <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => (
              <BsStar key={`null-${index}`} className="text-gray-300" />
            ))}
          </div>
        );
      }
    
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStar;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <BsStarFill key={`full-${index}`} className="text-yellow-500" />
      ))}
      {halfStar > 0 && <BsStarHalf className="text-yellow-500" />}
      {[...Array(emptyStars)].map((_, index) => (
        <BsStar key={`empty-${index}`} className="text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;
