import { useState } from "react";
import FormLayout from "../components/FormLayout";
import Input from "../ui/Input";
import connection from "../assets/connection.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login } from "../store/slices/authSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      login({
        email,
        password,
      })
    );

    setEmail("");
    setPassword("");
    navigate("/");
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
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500">{error}</p>}

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
