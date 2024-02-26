import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";
import "../styles/globals.css";
import MetaHead from "@/Components/Head";
import { StepProvider } from "../context/StepContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      //disable: 'phone',
      duration: 700,
      easing: "ease-out-cubic",
    });
  });
  return (
    <SessionProvider session={session}>
      <StepProvider>
        <MetaHead />
        <Component {...pageProps} />
      </StepProvider>
    </SessionProvider>
  );
}
