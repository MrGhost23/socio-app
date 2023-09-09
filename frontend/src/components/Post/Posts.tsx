import Post from "./Post";

type Props = {
  currentUserId: string;
  currentUserFullName: string;
  currentUserImage: string;
  posts: {
    id: string;
    text: string;
    image?: string;
    likes: number;
    comments: number;
    authorFullName: string;
    authorTag: string;
    authorImage: string;
    date: string;
    postComments: {
      id: string;
      text: string;
      date: string;
      authorId: string;
      authorFullName: string;
      authorImage: string;
    }[]
  }[];
}

const Posts: React.FC<Props> = ({ currentUserId, currentUserFullName, currentUserImage, posts }) => {
  return (
    <div className="flex flex-col gap-8">
      {
        posts.map(post =>
          <Post key={post.id} currentUserId={currentUserId} currentUserFullName={currentUserFullName} currentUserImage={currentUserImage} post={post} />
        )
      }
    </div>
  );
};

export default Posts;