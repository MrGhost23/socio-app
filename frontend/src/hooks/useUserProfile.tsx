import { useEffect, useState } from "react";
import axios from "axios";
import { ProfileType } from "../Types/Profile.types";

interface UserProfileHook {
  profile: ProfileType | null;
  loading: boolean;
  error: string | null;
}

// Custom hook for fetching user profile data
const useUserProfile = (username?: string): UserProfileHook => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<ProfileType[]>(
          `http://localhost:5000/api/v1/users/${username}`
        );
        setProfile(response.data[0]);
        setLoading(false);
      } catch (error) {
        setError("Error fetching profile data.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  return { profile, loading, error };
};

export default useUserProfile;
