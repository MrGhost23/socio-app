import Users from "../components/User/Users";
import Card from "../ui/Card";
import Input from "../ui/Input";
import { useState } from "react";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { selectSideOpen } from "../store/slices/sidebarSlice";
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const sideOpen = useSelector(selectSideOpen);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  const suggestedUsers = [
    {
      id: "1",
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140480477833203742/ce7ca87cc7bd870fc40642fd245b011b.png",
      fullName: "Omar Mohamed",
      followers: 400,
    },
    {
      id: "2",
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140480078644531220/352a1b49195bfa773765b4fdfb17da42.png",
      fullName: "Tomasa Runolfsson",
      followers: 400,
    },
    {
      id: "3",
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140479590012309534/50e2e84b6427e2112ea02507b5bc849f.png",
      fullName: "Hubert White",
      followers: 400,
    },
    {
      id: "4",
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140477104467742791/6183b49eced8a25862b25a0f2f110f94.png",
      fullName: "Adelbert Sawayn",
      followers: 400,
    },
    {
      id: "5",
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140476544339427468/38f761c6e7dd7701cacaa81409ffbaa2.png",
      fullName: "Yvette Mayer",
      followers: 400,
    },
  ];

  const submitHandler = () => {
    console.log(username);
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(country);
    console.log(bio);
    console.log(password);
  };

  return (

    <div
      className={`w-full ${
        sideOpen ? "fixed" : ""
      } px-4 sm:px-10 md:px-20 lg:pl-0 flex flex-col lg:grid lg:grid-cols-4 gap-8 lg:gap-16`}
    >
      <Sidebar />
      <div className="col-span-3 py-10 flex flex-col xl:grid xl:grid-cols-3 gap-8 xl:gap-16">
        <Card className="!text-left p-8 col-span-2">
          <h3 className="mb-5 text-xl">Account Info</h3>
          <div className="mb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            <Input
              label="Username"
              id="username"
              value={username}
              onChange={(prev) => setUsername(prev)}
              type="text"
              placeholder="MrGhost"
            />
            <Input
              label="First Name"
              id="firstName"
              value={firstName}
              onChange={(prev) => setFirstName(prev)}
              type="text"
              placeholder="Omar"
            />
            <Input
              label="Last Name"
              id="lastName"
              value={lastName}
              onChange={(prev) => setLastName(prev)}
              type="text"
              placeholder="Mohamed"
            />
            <Input
              label="Email"
              id="email"
              value={email}
              onChange={(prev) => setEmail(prev)}
              type="email"
              placeholder="whatever@gmail.com"
            />
            <Input
              label="Country"
              id="country"
              value={country}
              onChange={(prev) => setCountry(prev)}
              type="text"
              placeholder="Egypt"
            />
            <Input
              label="Occupation"
              id="occupation"
              value={occupation}
              onChange={(prev) => setOccupation(prev)}
              type="text"
              placeholder="Web Dev."
            />
          </div>
          <div className="mb-5 grid gri-cols-1">
            <Textarea
              label="Bio"
              id="bio"
              value={bio}
              onChange={(prev) => setBio(prev)}
              placeholder="Non sunt magna esse ea velit sint laborum irure sint minim ut excepteur mollit nulla."
            />
          </div>
          <div className="mb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            <Input
              label="Password"
              id="password"
              value={password}
              onChange={(prev) => setPassword(prev)}
              type="password"
              placeholder="***************"
            />
            <Button text="Save" bg={true} onClick={submitHandler} />
          </div>
        </Card>
        <Card className="p-8 !text-left">
          <h3 className="mb-5 text-xl">Blocked Users</h3>
          <Users users={suggestedUsers} mode="block" />
        </Card>
      </div>
    </div>
  );
};

export default Settings;
