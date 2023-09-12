import Card from "../../ui/Card";
import UserImage from "../User/UserImage";
import UserTag from "../User/UserTag";
import UserFullName from "../User/UserFullName";
import PostBookmarkIcon from "./PostBookmarkIcon";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";
import PostStats from "./PostStats";
import CommentForm from "../Comment/CommentForm";
import VerticalLine from "../../ui/VerticalLine";
import Comments from "../Comment/Comments";
import { PostType } from "../../Types/Post.types";
import { formatDistanceToNow } from "date-fns";
import noAvatar from "../../assets/noAvatar.png";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import Button from '../../ui/Button';
import {FaRegBookmark} from 'react-icons/fa6';
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { IoWarningOutline } from "react-icons/io5";
import { PiWarningBold } from "react-icons/pi";

type Props = {
  currentUserId: string | undefined;
  currentUserFullName: string | undefined;
  currentUserImage: string | undefined;
  post: PostType;
};

const Post: React.FC<Props> = ({
  currentUserId,
  currentUserFullName,
  currentUserImage,
  post,
}) => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <Card className="px-8 py-6 !text-left">
      <div className="relative mb-2 flex flex-row justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <UserImage
            className="w-14 !mb-0"
            src={post.userPicture || noAvatar}
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
        <BsThreeDots className="text-xl cursor-pointer" onClick={() => setMenuOpened((prevState) => !prevState)} />
        {menuOpened && (
          <ul className="absolute top-6 right-0 px-4 py-5 bg-white rounded border border-gray-10 shadow-md flex flex-col gap-4">
            <li className="flex flex-row items-center gap-2">
              <FaRegBookmark />
              <Button text="Bookmark" bg={false} />
            </li>
            <li className="flex flex-row items-center gap-2">
              <FaPen />
              <Button text="Edit Post" bg={false} />
            </li>
            <li className="flex flex-row items-center gap-2">
              <FaRegTrashAlt />
              <Button text="Delete Post" bg={false} />
            </li>
            <li className="flex flex-row items-center gap-2">
              <ImBlocked />
              <Button text="Block User" bg={false} />
            </li>
            <li className="flex flex-row items-center gap-2">
              <PiWarningBold className="text-lg"  />
              <Button text="Report User" bg={false} />
            </li>
          </ul>
        )}
      </div>
      <div className="flex flex-col">
        <PostText description={post.description} />
        {post.postImage && <PostImage src={post.postImage} alt="" />}
        <VerticalLine className="my-2" />
        <PostStats
          likes={post.likes}
          comments={post.comments.length}
          postId={post._id}
        />
        <VerticalLine className="mb-5" />
        <Comments comments={post.comments} />
        <CommentForm
          postId={post._id}
          currentUserId={currentUserId}
          currentUserImage={currentUserImage}
          currentUserFullName={currentUserFullName}
        />
      </div>
    </Card>
  );
};

export default Post;
