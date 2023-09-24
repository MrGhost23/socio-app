import moment from "moment";

export const formatTime = (createdAt: string) => {
  const formatTime = moment(new Date(createdAt)).fromNow(true);
  return formatTime
    .replace("minutes", "m")
    .replace("hours", "h")
    .replace("an hour", "1h");
};
