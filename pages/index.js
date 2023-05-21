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
      {/* <!-- Primary Meta Tags --> */}
      <title>Blyssfull Magick</title>
      <meta name="title" content="Blyssfull Magick"/>
      <meta name="description" content="Try an Intro Session Today!"/>

      {/* <!-- Open Graph / Facebook --/> */}
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://www.blyssfullmagick.com/"/>
      <meta property="og:title" content="Blyssfull Magick"/>
      <meta property="og:description" content="Try an Intro Session Today!"/>
      <meta property="og:image" content="/metaLogo.png"/>

      {/* <!-- Twitter --/> */}
      <meta property="twitter:card" content="summary_large_image"/>
      <meta property="twitter:url" content="https://www.blyssfullmagick.com/"/>
      <meta property="twitter:title" content="Blyssfull Magick"/>
      <meta property="twitter:description" content="Try an Intro Session Today!"/>
      <meta property="twitter:image" content="/metaLogo.png"/>
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
