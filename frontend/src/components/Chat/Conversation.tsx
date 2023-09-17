import { useEffect } from "react";
import useUserProfile from "../../hooks/useUserProfile";
import noAvatar from "../../assets/noAvatar.png";

const Conversation = ({ chat, currentUserId }) => {
  const username = chat.members.find((username) => username !== currentUserId);
  const { profile, loading } = useUserProfile(username, true);
  console.log(profile?.firstName);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
          <div className="w-1/4">
            <img
              src={profile?.userPicture || noAvatar}
              className="object-cover h-12 w-12 rounded-full"
              alt={profile?.username}
            />
          </div>
          <div className="w-full">
            <div className="flex items-center flex-wrap gap-2">
              <div className="text-lg font-semibold">
                {profile?.firstName + " " + profile?.lastName}
              </div>
              <span className="text-sm text-gray-500">12:23AM</span>
            </div>

            <span className="text-gray-500 font-medium">بدخله براحة خالص</span>
          </div>
        </div>
      )}
    </>
  );
};
export default Conversation;
