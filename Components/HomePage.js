import React from "react";
import Link from "next/link";
export default function HomePage() {
  return (
    <div className="bg-violet-300" data-aos="flip-left">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:translate-y-0 lg:-translate-x-1/2"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#6d28d9" />
                <stop offset={1} stopColor="#6d28d9" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Blyssfull Magick
            </h2>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-1xl">
              Through a range of spiritual practices and techniques, our service
              can help you overcome any emotional or spiritual blockages that
              may be preventing you from living the life you want. We work with
              you to identify the root causes of your struggles and help you
              find the tools to move forward with clarity and confidence.
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-300"></p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link
                href="/v1/booking/"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book now
              </Link>
              <Link
                href="/learnmore"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8 blur-sm">
            {/* <div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/6zbs6FgBrnDGzxiGio" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/art-abstract-pixels-6zbs6FgBrnDGzxiGio">via GIPHY</a></p> */}
            {/* <img
            className="absolute top-0 left-0 w-[40rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            src="https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            //src="https://images.unsplash.com/photo-1590732488817-d34f0d6237a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt="Picture"
            width={1824}
            height={1080}
        /> */}
            <video
              autoPlay
              playsInline
              defaultmuted="true"
              muted
              loop
              className="absolute top-0 left-0 w-[40rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10 h-80v object-cover"
              // style={{
              //   width: "100%",
              //   height: "100vh",
              //   top: "0",
              //   // position: "absolute",
              //   // zIndex: "-1",

              // }}
            >
              <source
                src="/orb.mp4"
                // src="/drippy.mp4"
                //src="https://finespecdetailing.b-cdn.net/drippy.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
