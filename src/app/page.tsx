"use client"

import BuiltForEveryRole from "@/components/Landing_page/BuiltForEveryRole";
import Footer from "@/components/Landing_page/Footer";
import Hero from "@/components/Landing_page/Hero";
import HowItWorks from "@/components/Landing_page/HowItWorks";
import Marketplace from "@/components/Landing_page/Marketplace";
import Nav from "@/components/Landing_page/Nav";
import ValuePreposition from "@/components/Landing_page/ValuePreposition";
import WhatIsRenova from "@/components/Landing_page/WhatIsRenova";
import WhyRenova from "@/components/Landing_page/WhyRenova";

export default function Home() {
  return (
    <main className="h-full w-full overflow-auto">
      <Nav />
      <Hero />
      <ValuePreposition />
      <WhatIsRenova />
      <HowItWorks />
      <BuiltForEveryRole />
      <Marketplace />
      <WhyRenova />
      <Footer />
    </main>
  );
}
