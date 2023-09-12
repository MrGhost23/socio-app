import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { PostType } from "../../Types/Post.types";
import Card from "../../ui/Card";
import UserImage from "../User/UserImage";
import UserTag from "../User/UserTag";
import UserFullName from "../User/UserFullName";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";
import PostStats from "./PostStats";
import CommentForm from "../Comment/CommentForm";
import VerticalLine from "../../ui/VerticalLine";
import Comments from "../Comment/Comments";
import PostMenu from "./PostMenu";
import PostForm from "./PostForm";

type Props = {
  post: PostType;
};

const Post: React.FC<Props> = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);

  const DUMMY_COMMENTS = [
    {
      id: '1',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, atque?',
      date: 'about 9 hours ago',
      authorId: 'Heisenberg',
      authorFullName: 'Omar Adel',
      authorImage: 'https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024',
    },
    {
      id: '2',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, atque?',
      date: 'about 9 hours ago',
      authorId: 'Heisenberg',
      authorFullName: 'Omar Adel',
      authorImage: 'https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024',
    },
    {
      id: '3',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, atque?',
      date: 'about 9 hours ago',
      authorId: 'Heisenberg',
      authorFullName: 'Omar Adel',
      authorImage: 'https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024',
    },
  ];
  
  return (
    <Card className="px-8 py-6 !text-left">
      <div className="relative mb-2 flex flex-row justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <UserImage
            className="w-14 !mb-0"
            src={post.userPicture}
            alt={post.firstName + " " + post.lastName}
            id={post.username}
          />
          <div className="flex flex-col items-start gap-1">
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row items-center md:gap-2">
                <UserFullName
                  fullName={post.firstName + " " + post.lastName}
                  id={post.username}
                />
                <UserTag tag={post.username} id={post.username} />
              </div>
              <PostDate
                date={formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
                id={post._id}
              />
            </div>
          </div>
        </div>
        <PostMenu
          postId={post._id}
          username={post.username}
          userFirstName={post.firstName}
          userLastName={post.lastName}
          setIsEditing={setIsEditing}
        />
      </div>
      <div className="flex flex-col">
        {
          isEditing ?
          <PostForm />
          :
            <>
              <PostText description={post.description} />
              {post.postImage && <PostImage src={post.postImage} alt="" />}
            </>
        }
        <VerticalLine className="my-2" />
        <PostStats
          likes={post.likes}
          comments={post.comments.length}
          postId={post._id}
        />
        <VerticalLine className="mb-5" />
        <Comments comments={DUMMY_COMMENTS} />
        <CommentForm postId={post._id}  />
      </div>
    </Card>
  );
};

export default Post;
