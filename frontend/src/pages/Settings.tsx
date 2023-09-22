import { useState, useEffect } from "react";
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
import SearchInput from "../ui/SearchInput";
import Loading from "../ui/Loading";
import UserImage from "../components/User/UserImage";

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
  
  
  const [changePasswordCurrent, setChangePasswordCurrent] = useState("");
  const [changePasswordNew1, setChangePasswordNew1] = useState("");
  const [changePasswordNew2, setChangePasswordNew2] = useState("");
  
  const changePasswordHandler = () => {
    console.log(changePasswordCurrent, changePasswordNew1, changePasswordNew2);
  }

  const [blockedUsers, setBlockedUsers] = useState<UserType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${
            currentUser!.username
          }/blocked-users`
          );
          setBlockedUsers(response.data);
      } catch (error) {
        setError(!!error);
      }
      setIsLoading(false);
    };

    fetchPostData();
  }, [currentUser]);

  if (isLoading) return <Loading />;
  if (error) return <p>An error occurred</p>;

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
                    className="absolute bottom-0 bg-opacity-70 !py-1"
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
                value={changePasswordCurrent}
                onChange={(prev) => setChangePasswordCurrent(prev)}
                type="password"
                placeholder="***************"
              />
              <Input
                label="New Password"
                id="newPassword1"
                value={changePasswordNew1}
                onChange={(prev) => setChangePasswordNew1(prev)}
                type="password"
                placeholder="***************"
              />
              <Input
                label="Confirm Password"
                id="newPassword2"
                value={changePasswordNew2}
                onChange={(prev) => setChangePasswordNew2(prev)}
                type="password"
                placeholder="***************"
              />
              <Button text="Save" bg={true} onClick={changePasswordHandler} className="xl:col-span-3" />
            </div>
          </Card>
        </div>
        <Card className="p-8 !text-left">
          <h3 className="mb-5 text-xl">Blocked Users</h3>
          {blockedUsers!.length ? (
            <>
              <SearchInput className="mb-5" />
              <Users users={blockedUsers!} mode="block" />
            </>
          ) : (
            <p>You don't have anyone in your block list</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Settings;
