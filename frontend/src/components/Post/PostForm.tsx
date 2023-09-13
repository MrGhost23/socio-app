import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { BsImage } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { selectUser } from "../../store/slices/authSlice";
import { createPost, selectPostLoading } from "../../store/slices/postsSlice";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import noAvatar from "../../assets/noAvatar.png";

import { RootState } from "../../store/store";

interface PostData {
  description: string;
  username: string | undefined;
  postImage?: File | string | object;
}

const PostForm: React.FC = () => {
  const user = useSelector(selectUser);
  const createPostLoading = useSelector(selectPostLoading);
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [image, setImage] = useState<object | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

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

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("username", user?.username);
    formData.append("description", description);
    // const postData: PostData = {
    //   description,
    //   username: user?.username,
    // };

    if (image) {
      formData.append("postImage", image);
    }
    if (!description && !image) {
      setDescriptionError("You must provide a description or image at least!");
      return;
    }
    dispatch(createPost(formData));

    setDescription("");
    setImage(null);
    setPreviewImage("");
  };

  return (
    <Card>
      <div className="mb-8 mx-10 py-6 flex flex-col items-center lg:items-start lg:flex-row gap-4">
        <img
          className="w-14 h-14 rounded-full shadow-lg"
          src={user!.userPicture || noAvatar}
          alt={`${user!.firstName} ${user!.lastName}'s profile picture`}
        />
        <div className="w-full flex flex-col items-center md:items-start gap-3">
          <textarea
            className={`w-full min-h-[6rem] h-fit max-h-[14rem] resize-y pl-4 pr-7 py-1.5 border rounded-xl outline-none ${
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
                text={createPostLoading ? "Loading..." : "Submit"}
                bg={true}
                onClick={createPostLoading ? null : submitHandler}
                className={`!px-10 !py-1.5 ${
                  createPostLoading ? "cursor-wait" : ""
                }`}
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
