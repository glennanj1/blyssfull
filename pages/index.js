import Head from "next/head";
import HomePage from "@/Components/HomePage";
import Header from "@/Components/Header";
import HeroHome from "@/Components/Hero";
import Testimonials from "@/Components/Testimonials";
import Features from "@/Components/Features";
import Newsletter from "@/Components/Email";
import Footer from "@/Components/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.newUser === true) {
    router.push("/auth/newUser/");
  }

  return (
    <div className="bg-violet-300">
     
      <Header />
      <HeroHome />
      <HomePage />
      <Features />
      <Testimonials />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}
