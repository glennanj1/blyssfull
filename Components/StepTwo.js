import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStep } from "../context/StepContext";
import { Transition } from '@headlessui/react';

export default function StepOne() {
  // useForm hook for form handling
  const { register, handleSubmit } = useForm();
  // Accessing context for navigation and data update
  const { nextStep, prevStep, updateFormData, formData } = useStep();
  // Local state for managing UI and data
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(formData.additionalService || null);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch services data once on component mount
  useEffect(() => {
    // Avoid refetching services if already fetched
    updateFormData({ ...formData, step: { title: 'Select an Additional Service', number: 2 } });

    if (!services.length) {
      fetchData().then(data => {
        // Update state with fetched data
        setServices(data.data);
      }).catch(error => {
        // Handle fetch errors
        console.error("ERROR", error);
        setError(true);
        setErrorMessage("There was an issue pulling services please try again shortly");
      });
    }
  }, []); // Empty dependency array to run once

  // Handles service selection, allowing toggle behavior
  const handleServiceSelect = (service) => {
    const isSameServiceSelected = selectedService?.id === service?.id;

    // Update selected service or unset if the same service is selected again
    const serviceToSet = isSameServiceSelected ? null : service;
    setSelectedService(serviceToSet);
    // Update context with the new selection
    updateFormData({
      ...formData,
      additionalService: serviceToSet,
    });
  };

  // Handles form submission, moving to the next step
  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  // Navigate back to the previous step
  const onBack = () => {
    prevStep();
  };

  // Fetch services data
  async function fetchData() {
    const response = await fetch("/api/getServices");
    if (!response.ok) throw new Error("Error fetching services");
    return await response.json();
  }

  return (
    <div className="mt-5 md:mt-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              {/* Services selection grid */}
              <div className="col-span-6 sm:col-start-1 col-end-7">
                <label htmlFor="additionalServices" className="block text-sm font-medium leading-6 text-gray-900">Additional Services</label>
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {services.map((service) => (
                      <Transition
                        as="div"
                        key={service.id}
                        show={true}
                        enter="transform transition duration-[400ms]"
                        enterFrom="opacity-0 scale-75"
                        enterTo="opacity-100 scale-100"
                        className={`bg-white shadow rounded-lg p-4 cursor-pointer ${selectedService?.id === service?.id ? "ring-2 ring-indigo-500" : ""}`}
                        onClick={() => handleServiceSelect(service)}
                      >
                        {service.attributes?.Title}
                      </Transition>
                    ))}
                  </div>
                </div>
                {/* Navigation buttons */}
                <button type="submit" className="mt-4 w-full flex justify-center rounded-md bg-purple-700 py-2 px-4 text-sm font-semibold text-white hover:bg-purple-500 disabled:bg-purple-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Next
                </button>
                <button type="button" onClick={onBack} className="mt-4 w-full flex justify-center rounded-md bg-gray-500 py-2 px-4 text-sm font-semibold text-white hover:bg-gray-400 disabled:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}