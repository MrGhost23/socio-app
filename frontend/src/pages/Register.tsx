import { useState } from "react";
import FormLayout from "../components/FormLayout";
import Input from "../ui/Input";
import connection from "../assets/connection.svg";
import { Link } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="grid lg:grid-cols-2">
      <div className="lg:flex hidden justify-center items-center">
        <img src={connection} alt="" />
      </div>
      <FormLayout>
        <form
          className="w-full max-w-lg shadow-sm px-8 py-10"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                label="First Name"
                id="firstName"
                value={firstName}
                onChange={(prev) => setFirstName(prev)}
                type="text"
                placeholder="Omar"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Input
                label="Last Name"
                id="lastName"
                value={lastName}
                onChange={(prev) => setLastName(prev)}
                type="text"
                placeholder="Mohamed"
              />
            </div>
          </div>
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
              <p className="text-gray-600 text-xs italic">
                Make it strong with at least 6 numbers
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <Input
                label="Country"
                id="country"
                value={country}
                onChange={(prev) => setCountry(prev)}
                type="text"
                placeholder="Egypt"
              />
            </div>
          </div>
          <button
            type="submit"
            className="block bg-sky-500 text-white w-full py-2 hover:bg-sky-600 mb-4"
          >
            Sign Up
          </button>
          <p>
            Have an account?
            <Link to="/login" className="font-bold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </FormLayout>
    </div>
  );
};

export default Register;
