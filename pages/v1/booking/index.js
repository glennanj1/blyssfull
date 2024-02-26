// components/layout.js

import React, { useState, useEffect } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import StepsContainer from "../../StepsContainer";
import { useStep } from "@/context/StepContext";

const Layout = () => {
  // Using useStep to access the formData from context
  const { formData } = useStep();
  const [price, setPrice] = useState();

  useEffect(() => {
    if (
      formData?.service?.attributes?.Price &&
      formData?.additionalService?.attributes?.Price
    ) {
      const combinedPrice = formData?.service?.attributes?.Price + formData?.additionalService?.attributes?.Price
      setPrice(
        combinedPrice
      );
    } else if (formData?.service?.attributes?.Price) {
      setPrice(formData?.service?.attributes?.Price);
    } else {
      setPrice(0);
    }
  }, [formData]);

  return (
    <>
      <Header isBooking={true} />
      <div className="md:shadow-xl lg:pt-32 pt-32 pb-12 lg:p-80 md:p-10 md:pt-40 md:pb-20 w-50">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-4">
                <h2 className="lg:text-2xl xl:text-6xl text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                  Book{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-500">
                    Here
                  </span>
                </h2>
                {formData?.service?.attributes?.Price ? (
                  <h2 className="text-1xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4">
                    Price: ${price}
                  </h2>
                ) : null}
                <p className="mt-1 text-xl text-black underline">
                  {formData?.step?.title}
                </p>
              </div>
            </div>
            <div className="md:col-span-4">
              <StepsContainer />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
