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
  return (
    <div>
      <h4>{title}</h4>
      <p>{"⭐".repeat(rating)}</p>
      <p>{comment}</p>
      <p>
        {createdAt} by {reviewer?.display_name}
      </p>
    </div>
  );
};

export default Review;
