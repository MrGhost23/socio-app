import { BsSearch } from "react-icons/bs";

type Props = {
  className?: string;
};

const SearchInput: React.FC<Props> = ({ className }) => {
  return (
    <form
      className={
        className
          ? className + " flex items-center w-full"
          : "flex items-center w-full"
      }
    >
      <label className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BsSearch className="w-4 h-4 text-gray-500" />
        </div>
        <input
          type="text"
          className="bg-gray-200 border-none outline-none appearance-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 p-2.5  dark:bg-primarylessDarker dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500 focus:bg-gray-50"
          placeholder="Search..."
          required
        />
      </div>
    </form>
  );
};

export default SearchInput;
