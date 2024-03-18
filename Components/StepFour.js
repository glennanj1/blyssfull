import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStep } from "../context/StepContext";
import Calcom from "./Calcom";

export default function StepOne() {
  const { handleSubmit } = useForm();
  const { nextStep, prevStep, updateFormData, formData } = useStep();
  const [url, setUrl] = useState();

  useEffect(() => {
    updateFormData({...formData, step: {title: 'Book', number: 4}})
    getService()
  }, []);

  const onBack = () => {
    prevStep();
  }

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  const getService = () => {
    let finalServices = [];
    if (formData.additionalServices.length > 0) {
      const matchingServices = formData?.services?.filter(service => service.attributes.Title.match(formData.service?.attributes?.Title))
      finalServices = [...matchingServices];
    }

    if (finalServices.length > 0) {
      let addOn = finalServices.find(service => service.attributes.Title.match("\\+"));
     debugger;
      setUrl(addOn.attributes?.Url)
    } else {
      setUrl(formData.service.attributes.Url)
    }

  }

  return (
    <div className="mt-5 md:mt-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-start-1 col-end-7">
                {url ? (<Calcom theurl={url} />) : null}
              </div>
                <button
                  onClick={() => onBack()}
                  className="disabled:bg-purple-100 group relative flex w-full justify-center rounded-md bg-purple-700 py-2 px-4 text-sm font-semibold text-white hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
                >
                  Back
                </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
