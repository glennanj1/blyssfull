import React, { useState, useEffect } from "react";
import Modal from "@/Utils/Modal";
import { useSession } from "next-auth/react";
import Link from "next/link";

function HeroHome() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    console.log(videoModalOpen);
  });

  return (
    <section className="relative bg-violet-300">
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
          {/* Section header */}
          <div className="flex flex-col items-center flex-wrap content-center justify-center text-center pb-12 md:pb-16">
            <img
              src="/DarkLogoBlyssfull.svg"
              width="100%"
              className="h-20v hover:animate-float"
              style={{ filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))" }}
              alt="logo"
            />
            {session ? (
              <h1
                className="break-words text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                Welcome{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-700">
                  {session.name.split(" ")[0]}
                </span>
              </h1>
            ) : (
              <h1
                className="break-words text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                Blyssfull{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-700">
                  Magick
                </span>
              </h1>
            )}
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Start your spiritual journey today!
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <Link
                    className="btn shadow-purple-500/50 text-white bg-purple-700 hover:bg-purple-500 w-full mb-4 sm:w-auto sm:mb-0"
                    href="/book"
                  >
                    Book Now
                  </Link>
                </div>
                <div>
                  <Link
                    className="btn shadow-slate-900/50 text-white bg-slate-900 hover:bg-slate-700 w-full sm:w-auto sm:ml-4"
                    href="/learnmore"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
              <div 
                data-aos="zoom-y-in"
                data-aos-delay="300"
                className="flex justify-center content-center md:items-start md:justify-center py-4 md:py-8"
              >
                {/* Social links */}
                <ul className="flex mb-4 md:order-1 md:mb-0">
                  <li className="mr-3">
                    <Link
                      href="https://instagram.com/blyssfull_magick?igshid=MmIzYWVlNDQ5Yg=="
                      className="flex justify-center items-center text-black-600 hover:text-white bg-purple-400 hover:bg-purple-300 rounded-full shadow transition duration-150 ease-in-out"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-8 h-8 p-1.5 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z" />
                      </svg>
                    </Link>
                  </li>

                  <li className="mr-3">
                    <Link
                      href="https://www.facebook.com/profile.php?id=100092394606618&mibextid=LQQJ4d"
                      className="flex justify-center items-center text-black-600 hover:text-white bg-purple-400 hover:bg-purple-300 rounded-full shadow transition duration-150 ease-in-out"
                      aria-label="Facebook"
                    >
                      <svg
                        className="w-8 h-8 fill-current"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div>
            <div
              className="relative flex justify-center mb-8 bg-fixed h-40v bg-bottom"
              data-aos="zoom-y-out"
              data-aos-delay="450"
              style={{ backgroundImage: "url(/tarrot.png)" }}
            >
              <div className="flex flex-col justify-center ">
                {/* <img className="mx-auto" src="https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" width="768" height="400" alt="Hero" /> */}
                {/* <svg
                  className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto"
                  width="768"
                  height="400"
                  viewBox="0 0 768 432"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <linearGradient
                      x1="50%"
                      y1="0%"
                      x2="50%"
                      y2="100%"
                      id="hero-ill-a"
                    >
                      <stop stopColor="purple" offset="0%" />
                      <stop stopColor="blue" offset="77.402%" />
                      <stop stopColor="white" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      x1="50%"
                      y1="0%"
                      x2="50%"
                      y2="99.24%"
                      id="hero-ill-b"
                    >
                      <stop stopColor="purple" offset="0%" />
                      <stop stopColor="blue" offset="48.57%" />
                      <stop stopColor="white" stopOpacity="0" offset="100%" />
                    </linearGradient>
                    <radialGradient
                      cx="21.152%"
                      cy="86.063%"
                      fx="21.152%"
                      fy="86.063%"
                      r="79.941%"
                      id="hero-ill-e"
                    >
                      <stop stopColor="purple" offset="0%" />
                      <stop stopColor="blue" offset="25.871%" />
                      <stop stopColor="white" offset="100%" />
                    </radialGradient>
                    <circle id="hero-ill-d" cx="384" cy="216" r="64" />
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <circle
                      fillOpacity=".04"
                      fill="url(#hero-ill-a)"
                      cx="384"
                      cy="216"
                      r="128"
                    />
                    <circle
                      fillOpacity=".16"
                      fill="url(#hero-ill-b)"
                      cx="384"
                      cy="216"
                      r="96"
                    />
                    <g fillRule="nonzero">
                      <use fill="#000" xlinkHref="#hero-ill-d" />
                      <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d" />
                    </g>
                  </g>
                </svg> */}
                <img
                  alt="metaLogo"
                  width="400"
                  height="400"
                  className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto"
                  src="/metaLogo.png"
                />
              </div>
              <button
                className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setVideoModalOpen(true);
                }}
                aria-controls="modal"
              >
                <svg
                  className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                  <path d="M10 17l6-5-6-5z" />
                </svg>
                <span className="ml-3">Watch the full video (22 seconds)</span>
              </button>
            </div>

            {/* Modal */}
            {videoModalOpen ? (
              <Modal
                id="modal"
                ariaLabel="modal-headline"
                show={videoModalOpen}
                handleClose={() => setVideoModalOpen(false)}
              >
                <div className="relative pb-9/16">
                  <iframe
                    className="absolute w-full h-full"
                    src="/healing.mp4"
                    title="Video"
                    allowFullScreen
                  ></iframe>
                </div>
              </Modal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
