import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { RootState } from "../store/store";
import { selectUser, setUser } from "../store/slices/authSlice";
import { selectSideOpen } from "../store/slices/sidebarSlice";
import { UserType } from "../Types/User.types";
import Sidebar from "../components/Sidebar";
import Users from "../components/User/Users";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import UserImage from "../components/User/UserImage";
import UsersSkeleton from "../skeletons/UsersSkeleton";
import { useNavigate } from "react-router-dom";
import NoDataMessage from "../components/NoDataMessage";
import useInfiniteFetch from "../hooks/useInfiniteFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeletons/PostSkeleton";

type Props = {
  navIsSticky: boolean;
};

const Settings: React.FC<Props> = ({ navIsSticky }) => {
  const currentUser = useSelector(selectUser);

  const sideOpen = useSelector(selectSideOpen);

  const [image, setImage] = useState<object>();
  const [previewImage, setPreviewImage] = useState<string>("");

  const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const [firstName, setFirstName] = useState(currentUser!.firstName || "");
  const [lastName, setLastName] = useState(currentUser!.lastName || "");
  const [email, setEmail] = useState(currentUser!.email || "");
  const [country, setCountry] = useState(currentUser!.country || "");
  const [occupation, setOccupation] = useState(currentUser!.occupation || "");
  const [bio, setBio] = useState(currentUser!.bio || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const toHome = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  const submitHandler = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/users/updateUser`,
        {
          bio,
          firstName,
          lastName,
          country,
          occupation,
          confirmPassword,
        }
      );
      dispatch(setUser(response.data));
      toast.info("Done.");
    } catch (error) {
      console.log(error);
      toast.info("Error.");
    }
  };

  const uploadPic = async (e) => {
    e.preventDefault();

    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append("userPicture", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/updateUserPicture",
        formData
      );

      if (response.status === 200) {
        // idk, gonna add some functionality later
        setPreviewImage("");
      } else {
        // idk, gonna add some error state later
        console.error("Error updating profile picture:", response.status);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const changePasswordHandler = async () => {
    try {
      setLoading(true);
      setError("");

      if (newPassword !== confirmNewPassword) {
        setError("New passwords do not match");
        return;
      }

      const response = await axios.patch(
        "http://localhost:5000/api/v1/users/updatePassword",
        {
          currentPassword,
          newPassword,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setSuccess(true);
        toHome();
      } else {
        setError("An error occurred while changing the password");
      }
    } catch (error) {
      setError("An error occurred while changing the password");
    } finally {
      setLoading(false);
    }
  };

  const {
    data: blockedUsers,
    loading: blockedUsersIsLoading,
    hasMore: blockedUsersHasMore,
    fetchMoreData: fetchMoreBlockedUsers,
  } = useInfiniteFetch<UserType>(
    `http://localhost:5000/api/v1/users/${currentUser!.username}/blocked-users`,
    "get",
    20
  );

  return (
    <div
      className={`w-full ${
        sideOpen ? "fixed" : ""
      } px-4 sm:px-10 md:px-10 lg:pl-0 flex flex-col lg:grid lg:grid-cols-4 gap-8 lg:gap-16`}
    >
      <Sidebar navIsSticky={navIsSticky} />
      <div className="col-span-3 py-10 flex flex-col xl:grid xl:grid-cols-3 gap-8 xl:gap-16">
        <div className="col-span-2 flex flex-col gap-8">
          <Card className="!text-left p-8">
            <h3 className="mb-5 text-xl">Account Info</h3>
            <div className="flex flex-row justify-center">
              <div className="relative w-fit mb-5 rounded-full overflow-hidden">
                <UserImage
                  src={previewImage || currentUser!.userPicture}
                  username={currentUser!.username}
                  className="min-w-[6rem] w-24 min-h-[6rem] h-24"
                />
                <input
                  className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
                  type="file"
                  value=""
                  onChange={uploadImageHandler}
                />
                {previewImage && (
                  <Button
                    text="Save"
                    bg={true}
                    onClick={uploadPic}
                    className="absolute bottom-0 w-full bg-opacity-70 !py-1"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-row justify-center"></div>
            <div className="mb-5 grid gri-cols-1">
              <Textarea
                label="Bio"
                id="bio"
                value={bio}
                onChange={(prev) => setBio(prev)}
                placeholder="Non sunt magna esse ea velit sint laborum irure sint minim ut excepteur mollit nulla."
              />
            </div>
            <div className="mb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              <Input
                label="First Name"
                id="firstName"
                value={firstName}
                onChange={(prev) => setFirstName(prev)}
                type="text"
                placeholder="Omar"
              />
              <Input
                label="Last Name"
                id="lastName"
                value={lastName}
                onChange={(prev) => setLastName(prev)}
                type="text"
                placeholder="Mohamed"
              />
              <Input
                label="Email"
                id="email"
                value={email}
                onChange={(prev) => setEmail(prev)}
                type="email"
                placeholder="whatever@gmail.com"
              />
              <Input
                label="Country"
                id="country"
                value={country}
                onChange={(prev) => setCountry(prev)}
                type="text"
                placeholder="Egypt"
              />
              <Input
                label="Occupation"
                id="occupation"
                value={occupation}
                onChange={(prev) => setOccupation(prev)}
                type="text"
                placeholder="Web Dev."
              />
              <Input
                label="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(prev) => setConfirmPassword(prev)}
                type="password"
                placeholder="***************"
              />
            </div>
            <div className="mb-5">
              <Button text="Save" bg={true} onClick={submitHandler} />
            </div>
          </Card>
          <Card className="!text-left p-8">
            <h3 className="mb-5 text-xl">Change Password</h3>
            <div className="mb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              <Input
                label="Current Password"
                id="currentPassword"
                value={currentPassword}
                onChange={(prev) => setCurrentPassword(prev)}
                type="password"
                placeholder="***************"
              />
              <Input
                label="New Password"
                id="newPassword1"
                value={newPassword}
                onChange={(prev) => setNewPassword(prev)}
                type="password"
                placeholder="***************"
              />
              <Input
                label="Confirm Password"
                id="newPassword2"
                value={confirmNewPassword}
                onChange={(prev) => setConfirmNewPassword(prev)}
                type="password"
                placeholder="***************"
              />
              <Button
                text={
                  success
                    ? "Password changed successfully!"
                    : loading
                    ? "Loading..."
                    : "Save"
                }
                bg={true}
                onClick={changePasswordHandler}
                className={`xl:col-span-3 ${success ? "bg-green-600" : ""}`}
                disabled={loading}
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </Card>
        </div>
        {blockedUsersIsLoading ? (
          <UsersSkeleton
            title="Blocked Users"
            usersNumber={6}
            mode="block"
            className="!p-8"
          />
        ) : (
          <Card className="p-8 !pb-5 !text-left">
            <h3 className="mb-5 text-xl">Blocked Users</h3>
            {blockedUsers && blockedUsers?.length > 0 ? (
              <InfiniteScroll
                dataLength={blockedUsers.length}
                next={fetchMoreBlockedUsers}
                hasMore={blockedUsersHasMore}
                loader={<PostSkeleton className="mt-8" />}
              >
                <Users users={blockedUsers} mode="block" />
              </InfiniteScroll>
            ) : (
              <NoDataMessage message="You don't have anyone in your block list" />
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default Settings;
