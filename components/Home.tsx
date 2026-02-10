import React from "react";
import { Helmet } from "react-helmet-async";
import { Hero, Philosophy, Services, Profile, Flow, Contact } from "../Sections";

interface HomeProps {
  isLoaded: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoaded }) => {
  return (
    <>
      <Helmet>
        <title>Arcle | ITコンサルティング - 個の弧をつなぎ、縁という円を描く</title>
        <meta name="description" content="Arcle（アークル）は愛知県一宮市を拠点とするITコンサルティング企業です。情シス代行、データ活用支援、生成AI活用支援、Web制作を通じて、お客様のビジネス成長を支援します。" />
        <link rel="canonical" href="https://arcle.net/" />
      </Helmet>
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
