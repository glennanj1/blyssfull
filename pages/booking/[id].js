import { useRouter } from "next/router";
import useSWR from "swr";
import * as React from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import DateDisplay from "@/Components/DateDisplay";
import TimeDisplay from "@/Components/TimeDisplay";
import Popup from "@/Components/PopUp";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Booking() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/booking/${query.id}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;
  if (data) {
    return (
      <>
        <Header />
        <section className="relative">
          {/* Illustration behind hero content */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
            aria-hidden="true"
          >
            <svg
              width="100vw"
              height="578"
              viewBox="0 0 1360 578"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="illustration-01"
                >
                  <stop stopColor="purple" offset="0%" />
                  <stop stopColor="blue" offset="77.402%" />
                  <stop stopColor="white" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="url(#illustration-01)" fillRule="evenodd">
                <circle cx="1232" cy="128" r="128" />
                <circle cx="155" cy="443" r="64" />
              </g>
            </svg>
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-20 mx-auto">
            <Popup type="success" message="Successful booking!" subject="Success" />
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex md:items-center md:justify-center">
                <div className="md:flex-shrink-0">
                  <div className="p-8">
                    <div className="font-bold text-xl mb-2">
                      Thanks for Booking!
                    </div>
                    <div className="font-bold text-xl text-red-300 mb-2">
                      Please be sure to check your spam folder for email invites.
                    </div>
                    <div className="text-purple-700 break-words text-xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4">
                      {data.data.desc}
                    </div>
                    <div className="font-bold text-xl mb-2">Time:</div>
                    <p className="text-gray-700 text-base">
                      <TimeDisplay timestamp={data.data.date} />
                    </p>
                    <div className="font-bold text-xl mb-2">Date:</div>
                    <p className="text-gray-700 text-base">
                      <DateDisplay timestamp={data.data.date} />
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center md:justify-start space-x-3">
                      {/* <a
                        target="_blank"
                        href={data.data.links[0]?.href}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2"
                      >
                        Receipt Link
                      </a> */}
                      <a
                        target="_blank"
                        href={data.data?.calendarLink}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2"
                      >
                        Calendar Link
                      </a>
                      <a
                        target="_blank"
                        href={data.data?.meetLink}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2"
                      >
                        Meet Link
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}
