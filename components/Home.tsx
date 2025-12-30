import React from "react";
import { Hero, Philosophy, Services, Profile, Flow, Contact } from "../Sections";

interface HomeProps {
  isLoaded: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoaded }) => {
  return (
    <>
      <Hero isLoaded={isLoaded} />
      <Philosophy />
      <Services />
      <Profile />
      <Flow />
      <Contact />
    </>
  );
};

export default Home;
