import React from "react";
import { Helmet } from "react-helmet-async";
import { Hero, Philosophy, Services, Profile, Flow, FAQ, Contact } from "../Sections";

interface HomeProps {
  isLoaded: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoaded }) => {
  return (
    <>
      <Helmet>
        <title>Arcle | 愛知県一宮市のITコンサルティング - DX推進・情シス代行・データ活用・生成AI</title>
        <meta name="description" content="Arcle（アークル）は愛知県一宮市のITコンサルティング企業です。中小企業向けに情シス代行、データ活用支援（Tableau・PowerBI）、生成AI導入支援、Web制作を提供。DX推進のパートナーとして経営課題を解決します。" />
        <link rel="canonical" href="https://arcle.net/" />
      </Helmet>
      <Hero isLoaded={isLoaded} />
      <Philosophy />
      <Services />
      <Profile />
      <Flow />
      <FAQ />
      <Contact />
    </>
  );
};

export default Home;
