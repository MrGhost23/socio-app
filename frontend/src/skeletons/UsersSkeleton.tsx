import SkeletonWrapper from "./SkeletonWrapper";
import SkeletonElement from "./SkeletonElement";

type Props = {
  title: string;
  usersNumber: number;
  mode?: string;
  className?: string;
};

const UsersSkeleton: React.FC<Props> = ({
  title,
  usersNumber,
  mode,
  className,
}) => {
  const classes =
    mode === "follow"
      ? "grid grid-cols-1 md:grid-cols-2 gap-3"
      : mode === "suggest"
      ? "flex flex-row xl:flex-col gap-5 md:gap-8 xl:gap-3"
      : "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-3";

  return (
    <SkeletonWrapper className={className}>
      <h3 className="mb-5 text-xl">{title}</h3>
      <div className={classes}>
        {Array.from({ length: usersNumber }, (_, index) => (
          <div
            key={index}
            className={
              mode === "suggest"
                ? "flex flex-col xl:flex-row items-center xl:items-start xl:gap-2"
                : "flex flex-row gap-2"
            }
          >
            <SkeletonElement
              type="avatar"
              className="min-w-[4rem] w-16 min-h-[4rem] h-16 mb-4"
            />
            <div
              className={
                mode === "suggest"
                  ? "flex flex-col items-center xl:items-start gap-1.5"
                  : "flex flex-col gap-1.5"
              }
            >
              <SkeletonElement type="text" className="!w-24" />
              <SkeletonElement type="text" className="!w-16" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonWrapper>
  );
};

export default UsersSkeleton;
