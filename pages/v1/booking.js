// components/layout.js

import React from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import StepsContainer from "../StepsContainer";
import { useStep } from '@/context/StepContext';

const Layout = () => {
// Using useStep to access the formData from context
const { formData } = useStep();

  return (
    <>
      <Header isBooking={true} />
      <div className="md:shadow-xl lg:pt-32 pt-32 pb-12 lg:p-80 md:p-10 md:pt-40 md:pb-20 w-50">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-4">
                <h2 className="lg:text-2xl xl:text-6xl text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                  Book{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-500">
                    Here
                  </span>
                </h2>
                {formData?.price ? (
                  <h2 className="text-1xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4">
                    Price: ${formData?.price}
                  </h2>
                ) : null}
                <p className="mt-1 text-xl text-black underline">
                  Enter Some Details & Select a Service
                </p>
              </div>
            </div>
            <StepsContainer />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
