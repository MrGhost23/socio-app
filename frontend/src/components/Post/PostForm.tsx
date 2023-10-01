import { useState } from "react";
import { useSelector } from "react-redux";
import { BsImage } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { selectUser } from "../../store/slices/authSlice";
import UserImage from "../User/UserImage";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import usePostActions from "../../hooks/usePostActions";
import { PostType } from "../../Types/Post.types";

type Props = {
  addPost?: (postData: PostType) => void;
  updatePost?: (postId: string, description: string, image: string) => void;
  text?: string;
  postId?: string;
  postImage?: string;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostForm: React.FC<Props> = ({
  addPost,
  text,
  postImage,
  postId,
  setIsEditing,
  updatePost,
}) => {
  const user = useSelector(selectUser);

  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(text || "");
  const [descriptionError, setDescriptionError] = useState("");
  const [image, setImage] = useState<object | string | null>(postImage || null);
  const [previewImage, setPreviewImage] = useState<string>(
    postImage
      ? `https://socio-irdl.onrender.com/post_assets/${encodeURIComponent(
          postImage
        )}`
      : ""
  );

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const removeImageHandler = () => {
    setImage({});
    setPreviewImage("");
  };

  const { createPost, editPost } = usePostActions();

  const submitHandler = async () => {
    setIsLoading(true);
    if (updatePost) {
      const formData = new FormData();
      formData.append("description", description);

      if (image && image instanceof File) {
        formData.append("postImage", image);
      }

      const updatedPost = await editPost(postId!, formData);

      updatePost(
        updatedPost!._id,
        updatedPost!.description,
        updatedPost!.postImage!
      );

      setIsEditing!(false);
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("username", user!.username);
    formData.append("description", description);
    if (image instanceof File) {
      formData.append("postImage", image);
    }

    if (!description && !(image instanceof File)) {
      setDescriptionError("You must provide a description or image at least!");
      setIsLoading(false);
      return;
    }

    const postData = await createPost(formData);

    addPost!(postData);
    setDescription("");
    setImage(null);
    setPreviewImage("");
    setIsLoading(false);
  };

  return (
    <Card className={text && "shadow-none"}>
      <div
        className={
          text
            ? "py-6 flex flex-col items-center lg:items-start lg:flex-row gap-4"
            : "mb-8 mx-6 md:mx-8 lg:mx-10 py-6 flex flex-col items-center lg:items-start lg:flex-row gap-4"
        }
      >
        {!text && (
          <UserImage
            className="min-w-[3.5rem] w-14 min-h-[3.5rem] h-14 rounded-full shadow-lg"
            src={user!.userPicture}
            username={user!.username}
          />
        )}
        <div className="w-full flex flex-col items-center md:items-start gap-3">
          <textarea
            className={`w-full min-h-[6rem] h-fit max-h-[14rem] resize-y pl-4 pr-7 py-1.5 border rounded-xl outline-none dark:bg-primarylessDarker dark:border-none ${
              descriptionError && "border-red-700 bg-red-100"
            }`}
            placeholder="Share something.."
            value={description}
            onChange={changeHandler}
          />
          {descriptionError && (
            <p className="text-red-700">{descriptionError}</p>
          )}
          <div className="w-full flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-fit flex flex-row items-center gap-1 border rounded-xl px-5 py-2 cursor-pointer transition duration-500 hover:description-white hover:bg-sky-500">
              <BsImage />
              <span className="description-sm font-semibold tracking-wide">
                Photo
              </span>
              <input
                className="absolute top-0 right-0 w-full h-full opacity-0"
                type="file"
                name="postImage"
                value=""
                accept="image/*"
                onChange={uploadImageHandler}
              />
            </div>
            <div className="">
              <Button
                text={isLoading ? "Loading..." : !text ? "Submit" : "Save"}
                bg={true}
                onClick={isLoading ? () => {} : submitHandler}
                className={`!px-10 !py-1.5 ${isLoading ? "cursor-wait" : ""}`}
              />
            </div>
          </div>
          {previewImage && (
            <div
              className="relative sm:self-start rounded-lg overflow-hidden"
              onClick={removeImageHandler}
            >
              <div className="absolute top-0 left-0 w-full h-full flex flex-row items-center justify-center grow opacity-0 transition duration-500 hover:opacity-100">
                <MdOutlineClose className="description-3xl description-white z-50" />
                <div className="absolute w-full h-full bg-black bg-opacity-20"></div>
              </div>
              <img className="w-16 h-16" src={previewImage} alt="" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PostForm;
