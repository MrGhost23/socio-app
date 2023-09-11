import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  following: string | number | Array<string>;
  followers: string | number | Array<string>;
};

const UserStats: React.FC<Props> = (props) => {
  const location = useLocation();
  const path = location.pathname.split("/").slice(0, 3).join("/");

  return (
    <div className="mb-5 flex flex-row gap-3 text-gray-500 font-medium tracking-wide">
      <Link to={`${path}/followers`} className="flex flex-col gap-1">
        <p>Followers</p>
        <p className="text-xl font-semibold">{props.followers}</p>
      </Link>
      <div className="w-0.5 h-16 bg-gray-200"></div>
      <Link to={`${path}/following`} className="flex flex-col gap-1">
        <p>Following</p>
        <p className="text-xl font-semibold">{props.following}</p>
      </Link>
    </div>
  );
};

export default UserStats;
