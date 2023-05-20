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
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#c4b5fd" />
        <meta property="og:image" content="/metaLogo.png" />
        <meta property="og:title" content="Blyssfull Magick" />
        <meta
          property="og:description"
          content="Through a range of spiritual practices and techniques, our service can help you overcome any emotional or spiritual blockages."
        />
        <meta property="og:type" content="website" />

        <meta
          name="Blyssfull Magick"
          content="Try an Intro Session Today!"
        />
        <title>Blyssfull Magick</title>
        <link rel="apple-touch-icon" href="/BlyssfullLogo.png" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="icon" href="icon3.ico" />
      </Head>
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
