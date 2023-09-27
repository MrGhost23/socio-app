import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [navigate]);

  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-8 h-[calc(100vh-82px)]">
      <p className="text-4xl text-gray-600 dark:text-textLighter font-bold">
        An error occurred!
      </p>
      <p className="text-2xl text-gray-500 dark:text-textLight font-semibold px-5 text-center">
        This page doesn't exist or you don't have access to it.
      </p>
      <p className="text-lg text-gray-500 dark:text-textLight px-5 text-center">
        You will be directed to the home page after {countdown} seconds.
      </p>
    </div>
  );
};

export default ErrorPage;
