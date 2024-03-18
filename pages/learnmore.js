import React, { useEffect, useState } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import DOMPurify from 'dompurify';

function Pricing() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!services.length) {
      fetchData().then(data => {
        if (data && data.data) {
          setServices(data.data);
        }
      }).catch(error => {
        console.error("ERROR", error);
        setError(true);
        setErrorMessage("There was an issue pulling services please try again shortly");
      });
    }
  }, []);

  const displayAvailableServices = services?.filter(service => {
    return service?.attributes?.Active === true && !service?.attributes?.AdditionalService === true
  })
  
  async function fetchData() {
    const response = await fetch("/api/getEvents");
    if (!response.ok) throw new Error("Error fetching services");
    return await response.json();
  }
  return (
    <>
      <Header />
      <section className="relative">
        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div
          className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none"
          aria-hidden="true"
        ></div>
        <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pt-12 pb-12 md:pb-20">
              <h2 className="h2 mb-4">Our Pricing</h2>
              <p className="text-xl text-gray-600">
                Sessions
              </p>
            </div>

            <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {displayAvailableServices ? displayAvailableServices.map(service => {
              const cleanHTML = DOMPurify.sanitize(service?.attributes?.Description);

              return (
              <div key={service.id} className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <svg
                  className="w-16 h-16 p-1 -mt-1 mb-2"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <rect
                      className="fill-current text-purple-600"
                      width="64"
                      height="64"
                      rx="32"
                    />
                    <g strokeWidth="2" transform="translate(19.429 20.571)">
                      <circle
                        className="stroke-current text-white"
                        strokeLinecap="square"
                        cx="12.571"
                        cy="12.571"
                        r="1.143"
                      />
                      <path
                        className="stroke-current text-white"
                        d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"
                      />
                      <path
                        className="stroke-current text-blue-300"
                        d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"
                      />
                    </g>
                  </g>
                </svg>
                <h5 className="text-sm font-bold leading-snug tracking-tight mb-1">${service?.attributes?.Price}</h5>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                  {service?.attributes?.Title}
                </h4>
                <p className="text-gray-600 text-center"
                  dangerouslySetInnerHTML={{ __html: cleanHTML }} >
                </p>
              </div>
              )
            }) : null}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Pricing;
