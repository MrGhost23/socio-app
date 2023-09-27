const ErrorPage: React.FC = () => {
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-8">
      <p className="text-4xl text-gray-600 dark:text-textLighter font-bold">
        An error occurred!
      </p>
      <p className="text-2xl text-gray-500 dark:text-textLight font-semibold">
        This page doesn't exist or you don't have access to it.
      </p>
    </div>
  );
};

export default ErrorPage;
