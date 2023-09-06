import { useState } from "react";
import FormLayout from "../components/FormLayout";
import Input from "../ui/Input";
import connection from "../assets/connection.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="grid lg:grid-cols-2">
      <div className="lg:flex hidden justify-center items-center">
        <img src={connection} alt="" className="" />
      </div>
      <FormLayout>
        <form
          className="w-full max-w-lg shadow-sm px-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <Input
                label="Email"
                id="email"
                value={email}
                onChange={(prev) => setEmail(prev)}
                type="email"
                placeholder="whatever@gmail.com"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <Input
                label="Password"
                id="password"
                value={password}
                onChange={(prev) => setPassword(prev)}
                type="password"
                placeholder="***************"
              />
            </div>
          </div>

          <button
            type="submit"
            className="block bg-sky-500 text-white w-full py-2 hover:bg-sky-600 mb-4"
          >
            Log in
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="font-bold">
              Sign Up
            </Link>
          </p>
        </form>
      </FormLayout>
    </div>
  );
};

export default Login;
