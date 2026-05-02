"use client";

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

const Page = () => {
  return (
    <RootLayout>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Problem />
        <Platform />
        <Differentiation />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </RootLayout>
  );
};

export default Page;
