import HeroSection from "@/components/home/home.section";
import Navbar from "@/components/layouts/home/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <HeroSection />
      </main>
    </>
  );
}
