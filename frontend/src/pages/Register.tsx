import { useState } from "react";
import FormLayout from "../components/FormLayout";
import Input from "../ui/Input";
import connection from "../assets/connection.svg";
import { Link } from "react-router-dom";
import { register } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { countries } from "../utils/countries";

import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import Button from "../ui/Button";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!country) {
      setCountryError("You must provide a country");
      return;
    }
    dispatch(
      register({
        firstName,
        lastName,
        email,
        password,
        country: country.label,
        username,
      })
    );
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
                label="Username"
                id="username"
                value={username}
                onChange={(prev) => setUsername(prev)}
                type="text"
                placeholder="whateveriam"
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
              <Select
                placeholder="Country"
                isSearchable
                name="countries"
                onChange={setCountry}
                options={countries}
                noOptionsMessage={() => "Please select a country"}
              />
              {countryError && <p className="text-red-600">{countryError}</p>}
            </div>
          </div>
          <Button
            text="Sign Up"
            bg={true}
            type="submit"
            className="block bg-sky-500 text-white w-full py-2 hover:bg-sky-600 mb-4"
          />
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
