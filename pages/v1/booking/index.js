// components/layout.js

import React, { useState, useEffect } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import StepsContainer from "../../StepsContainer";
import { useStep } from "@/context/StepContext";
import AccordionBasic from "@/Components/Accordian";

const Layout = () => {
  // Using useStep to access the formData from context
  const { formData } = useStep();
  const [price, setPrice] = useState();

  useEffect(() => {
    let totalPrice = 0;

    // Add the price of the primary service if it exists
    if (formData?.service?.attributes?.Price) {
      totalPrice += formData.service.attributes.Price;
    }

    // Add the prices of all additional services if any exist
    if (
      formData?.additionalServices &&
      formData.additionalServices.length > 0
    ) {
      formData.additionalServices.forEach((additionalService) => {
        totalPrice += additionalService.attributes.Price;
      });
    }
    // Update the price state with the calculated total price
    setPrice(totalPrice);
  }, [formData, setPrice]);

  return (
    <>
      <Header isBooking={true} />
      <div className="md:shadow-xl lg:pt-32 pt-32 pb-12 lg:p-80 md:p-10 md:pt-40 md:pb-20 w-50">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-4">
                <h2 className="lg:text-2xl xl:text-4xl text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                  Step {formData?.step?.number}:
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-500">
                    {" "}
                    {formData?.step?.title}
                  </span>
                </h2>
              </div>
            </div>
            <div className="lg:col-span-1">
             {formData?.service?.attributes?.Description ? (
              <div className="px-4 sm:px-4">
                <AccordionBasic title="Details">          
                  <span className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-blue-300">
                    {" "}
                    {formData?.service?.attributes?.Description}
                  </span>
                </AccordionBasic>
                <p className="mt-1 text-xl text-black underline"></p>
              </div>
             ) : null}
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-4">
                {formData?.service?.attributes?.Price ? (
                  <h2 className="lg:text-2xl xl:text-4xl text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                    Price: ${price}
                  </h2>
                ) : null}
              </div>
            </div>
            <div className="md:col-span-4">
              <StepsContainer />
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <Footer />
    </>
  );
};

export default Layout;
