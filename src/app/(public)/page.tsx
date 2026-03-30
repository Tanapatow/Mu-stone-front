import HeroSection from "@/components/home/home.section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
