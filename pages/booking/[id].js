import { useRouter } from "next/router";
import useSWR from "swr";
import * as React from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import DateDisplay from "@/Components/DateDisplay";
import TimeDisplay from "@/Components/TimeDisplay";

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

          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Hero content */}
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Hero image */}
              <div>
                <div
                  className="relative flex justify-center mb-8 h-50v bg-bottom"
                >
                  <div className="flex flex-col justify-top">
                    <div class="max-w-sm rounded overflow-hidden shadow-lg shadow-indigo-500/50">
                      {/* <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
                      <div class="px-6 py-2">
                        <div class="font-bold text-xl mb-2">
                          Thanks for Booking!
                        </div>
                      </div>
                      <div class="px-6 py-2">
                        <p class="text-purple-700 break-words text-xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4">
                          {data.data.desc}
                        </p>
                      </div>
                      <div class="px-6 py-2">
                        <div class="font-bold text-xl mb-2">Time:</div>
                        <p class="text-gray-700 text-base">
                          <TimeDisplay timestamp={data.data.date} />
                        </p>
                      </div>
                      <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Date:</div>
                        <p class="text-gray-700 text-base">
                          <DateDisplay timestamp={data.data.date} />
                        </p>
                      </div>
                      <div class="px-6 pt-4 pb-2">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          <a target="_blank" href={data.data.links[0]?.href}>
                            Receipt Link
                          </a>
                        </span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          <a target="_blank" href={data.data?.calendarLink}>
                            Calendar Link
                          </a>
                        </span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          <a target="_blank" href={data.data?.meetLink}>
                            Meet Link
                          </a>
                        </span>
                      </div>
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
