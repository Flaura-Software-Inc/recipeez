import { ReactElement, useState } from 'react';
import Star from './icons/Star';
import style from './RatingSelector.module.scss';

type Props = {
  currentRating?: number;
  setRating: (rating: number) => void;
};
export default function RatingSelector({ currentRating, setRating }: Props) {
  const ratings: ReactElement[] = [];
  const [hoveredRating, setHoveredRating] = useState<number>();
  for (let ratingValue = 1; ratingValue <= 10; ratingValue += 1) {
    const fillStar = ratingValue <= (hoveredRating || (currentRating ?? 0));
    const starColour = fillStar ? 'yellow' : 'white';
    ratings.push(
      <div
        className={style.rating}
        onMouseEnter={() => setHoveredRating(ratingValue)}
        onMouseLeave={() => setHoveredRating(undefined)}
        onClick={() => setRating(ratingValue)}
        onKeyDown={() => setRating(ratingValue)}
        role="radio"
        aria-checked={currentRating === ratingValue}
        tabIndex={0}
      >
        <Star colour={starColour} />
        {ratingValue}
      </div>
    );
  }
  return <div className={style.ratingSelector}>{ratings}</div>;
}
