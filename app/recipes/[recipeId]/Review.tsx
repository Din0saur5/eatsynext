import { getPublicUserById } from "@/app/fetches";

const Review = async ({
  title,
  user_id,
  comment,
  rating,
  created,
}: {
  title: string;
  user_id: string;
  comment: string | null;
  rating: number;
  created: string;
}) => {
  const reviewer = await getPublicUserById(user_id);
  const createdAt = new Date(created).toDateString();
  if (reviewer) {
    return (
      <div>
        <h4>{title}</h4>
        <p>Rating: {rating}/5</p>
        <p>
          {createdAt} by {reviewer?.display_name}
        </p>
        <p>{comment}</p>
      </div>
    );
  }
};

export default Review;
