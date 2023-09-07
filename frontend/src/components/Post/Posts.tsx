import Post from "./Post";

type Props = {
  currentUserId: string;
  currentUserFullName: string;
  currentUserImage: string;
  posts: {
    id: string,
    text: string,
    image?: string,
    likes: number,
    comments: number,
    authorFullName: string,
    authorTag: string,
    authorImage: string,
    date: string
  }[];
}

const Posts: React.FC<Props> = ({ currentUserId, currentUserFullName, currentUserImage, posts }) => {
  return (
    <>
      {
        posts.map(post =>
          <Post key={post.id} currentUserId={currentUserId} currentUserFullName={currentUserFullName} currentUserImage={currentUserImage} post={post} />
        )
      }
    </>
  );
};

export default Posts;