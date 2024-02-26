// components/StepsContainer.js
"use client";
import React, { useState, useEffect } from "react";
import { useStep } from "../context/StepContext";
import StepOne from "../Components/StepOne";
import StepTwo from "../Components/StepTwo";
import StepThree from "../Components/StepThree";
import StepFour from "../Components/StepFour";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function StepsContainer() {
  const { data: session, status } = useSession();
  const [authed, setAuthed] = useState(false);

  const { currentStep } = useStep();

  useEffect(() => {
    
  }, []);

  if (authed) {
    const renderStep = () => {
        switch (currentStep) {
          case 1:
            return <StepOne />;
          // Handle other cases for other steps
          case 2:
            return <StepTwo />;
          case 3:
            return <StepThree />;
          case 4:
            return <StepFour />;
          default:
            return <div>Likely Redirect</div>;
        }
      };

      return <div>{renderStep()}</div>;
    
  }

  if (status === "authenticated") {
    setTimeout(() => {
      setAuthed(true);
    }, 2000);
  }

  if (status === "unauthenticated") {
    Router.push("/auth/Signin/");
  }

  return (
    <>
      <div className="animate-pulse md:shadow-xl lg:pt-32 pt-32 pb-12 lg:p-40 md:p-10 md:pt-40 md:pb-20 w-50">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-4">
                <h2 className="h-40 bg-slate-700 rounded lg:text-2xl xl:text-6xl text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                  <span className="h-20 bg-slate-700 rounded bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-500"></span>
                </h2>
                <p className="h-10 bg-slate-700 rounded mt-1 text-sm text-gray-600"></p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-1">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-start-1 col-end-7">
                        <label
                          htmlFor="services"
                          className="h-5 bg-slate-700 rounded block text-sm font-medium leading-6 text-gray-900"
                        ></label>
                        <label
                          htmlFor="services"
                          className="h-10 mt-2 bg-slate-700 rounded block text-sm font-medium leading-6 text-gray-900"
                        ></label>
                      </div>

                      <div className="col-span-6 sm:col-start-1 col-end-7">
                        <label className="h-5 mt-2 bg-slate-700 rounded block text-sm font-medium leading-6 text-gray-900"></label>
                        <label className="h-10 mt-2 bg-slate-700 rounded block text-sm font-medium leading-6 text-gray-900"></label>
                      </div>
                    </div>
                    <div className="h-20 bg-slate-700 rounded bg-gray-50 mt-5 px-4 py-3 text-right sm:px-6"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
