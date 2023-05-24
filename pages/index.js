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
      <meta name="title" content="Blyssfull Magick"></meta>
      <meta name="description" content="Try an Introductory Session Today! Tarot Readings, Oracle Readings, and Reiki Sessions all remote."></meta>

      {/* <!-- Open Graph / Facebook --/> */}
      <meta property="og:type" content="website"></meta>
      <meta property="og:url" content="https://www.blyssfullmagick.com/"></meta>
      <meta property="og:title" content="Blyssfull Magick"></meta>
      <meta property="og:description" content="Try an Intro Session Today!"></meta>
      <meta property="og:image" content="/metaLogo.png"></meta>

      {/* <!-- Twitter --></meta> */}
      <meta property="twitter:card" content="summary_large_image"></meta>
      <meta property="twitter:url" content="https://www.blyssfullmagick.com/"></meta>
      <meta property="twitter:title" content="Blyssfull Magick"></meta>
      <meta property="twitter:description" content="Try an Intro Session Today!"></meta>
      <meta property="twitter:image" content="/metaLogo.png"></meta>

      {/* Link */}
      <link rel='icon' type='image/png' href='icon3.ico' />
      <link rel='icon' sizes='192x192' href='icon3.ico'/>
      <link rel='apple-touch-icon' href='icon3.ico'/>
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
