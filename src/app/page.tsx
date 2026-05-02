"use client";

import { useState } from "react";
import RootLayout from "./layout";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Problem from "@/components/Problem";
import Platform from "@/components/Platform";
import Differentiation from "@/components/Differentiation";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ArmorClaw from "@/components/ArmorClaw";

const Page = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <RootLayout>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero startTyping={loaded} />
        <TrustBar />
        <Problem />
        <Platform />
        <Differentiation />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <ArmorClaw />
    </RootLayout>
  );
};

export default Page;
