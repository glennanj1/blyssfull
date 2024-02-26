import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStep } from "../context/StepContext";
import { useSession } from "next-auth/react";
import { Transition } from '@headlessui/react';

export default function StepOne() {
  const { register, handleSubmit, setValue } = useForm();
  const { nextStep, updateFormData, formData } = useStep();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(formData.service || null);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [promo, setPromo] = useState(false);

  useEffect(() => {
    updateFormData({...formData, step: {title: 'Select a Service', number: 1}})
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
  }, [services, formData, updateFormData]);

  const handleServiceSelect = (service) => {
    debugger;
    console.log(service);
    setSelectedService(service);
    updateFormData({
      ...formData,
      service: service,
      
    });
    if (service.title === "Introductory Session") {
      setPromo(true);
    } else {
      setPromo(false);
    }
  };

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  async function fetchData() {
    const response = await fetch("/api/getEvents");
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error fetching services");
    }
  }

  return (
    <div className="mt-5 md:mt-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-start-1 col-end-7">
                <label htmlFor="services" className="block text-sm font-medium leading-6 text-gray-900">Service</label>
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {services.map((service) => (
                      <Transition
                        as="div"
                        key={service?.id}
                        show={true}
                        enter="transform transition duration-[400ms]"
                        enterFrom="opacity-0 scale-75"
                        enterTo="opacity-100 scale-100"
                        className={`bg-white shadow rounded-lg p-4 cursor-pointer ${selectedService?.id === service?.id ? "ring-2 ring-indigo-500" : ""}`}
                        onClick={() => handleServiceSelect(service)}
                      >
                        {service?.attributes?.Title}
                      </Transition>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="disabled:bg-purple-100 group relative flex w-full justify-center rounded-md bg-purple-700 py-2 px-4 text-sm font-semibold text-white hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
                >
                  Next
                </button>
              </div>
              {promo && (
                <h1>Display Promo Data</h1>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
