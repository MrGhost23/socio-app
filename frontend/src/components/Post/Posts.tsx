import Post from "./Post";

type Props = {
  currentUserFullName: string;
  currentUserImage: string;
  posts: {
    id: number,
    text: string,
    image: string,
    likes: number,
    comments: number,
    authorFullName: string,
    authorTag: string,
    authorImage: string,
    date: string
  }[];
}

const Posts: React.FC<Props> = ({ currentUserFullName, currentUserImage, posts }) => {
  return (
    <>
      {
        posts.map(post =>
          <Post key={post.id} currentUserFullName={currentUserFullName} currentUserImage={currentUserImage} post={post} />
        )
      }
    </>
  );
};

export default Posts;