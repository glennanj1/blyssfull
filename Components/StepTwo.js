import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStep } from "../context/StepContext";
import { Transition } from "@headlessui/react";

export default function StepOne() {
  // useForm hook for form handling
  const { register, handleSubmit } = useForm();
  // Accessing context for navigation and data update
  const { nextStep, prevStep, updateFormData, formData } = useStep();
  // Local state for managing UI and data
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState(
    formData.additionalService || null
  );
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch services data once on component mount
  useEffect(() => {
    // Avoid refetching services if already fetched
    updateFormData({
      ...formData,
      step: { title: "Select an Additional Service", number: 2 },
    });

    if (!services.length) {
      fetchData()
        .then((data) => {
          // Update state with fetched data
          setServices(data.data);
        })
        .catch((error) => {
          // Handle fetch errors
          console.error("ERROR", error);
          setError(true);
          setErrorMessage(
            "There was an issue pulling services please try again shortly"
          );
        });
    }
  }, []); // Empty dependency array to run once

  const handleServiceSelect = (service) => {
    // Initialize selectedServices as an array if it's undefined or null
    const currentSelectedServices = selectedServices || [];

    // Check if the service is already selected
    const isServiceSelected = currentSelectedServices.some(
      (selectedService) => selectedService.id === service.id
    );

    let updatedServices = [];

    if (currentSelectedServices.length === 0) {
      // If no services are currently selected, add the new service to the selection
      updatedServices = [service];
    } else {
      if (isServiceSelected) {
        // If the service is already selected, remove it from the selection
        updatedServices = currentSelectedServices.filter(
          (selectedService) => selectedService.id !== service.id
        );
      } else {
        // If the service is not currently selected, add it to the selection
        // This allows adding to an existing selection, enabling multi-select functionality
        // updatedServices = [...currentSelectedServices, service];
      }
    }

    setSelectedServices(updatedServices); // Update the state with the new list of selected services

    // Update context or form data with the new selection
    updateFormData({
      ...formData,
      additionalServices: updatedServices,
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
                <label
                  htmlFor="additionalServices"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Additional Services
                </label>
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {services.map((service) => (
                      <>
                        <Transition
                          as="div"
                          key={service.id}
                          show={true}
                          enter="transform transition duration-[400ms]"
                          enterFrom="opacity-0 scale-75"
                          enterTo="opacity-100 scale-100"
                          data-tooltip-target="tooltip-default"
                          className={`bg-white shadow rounded-lg p-4 cursor-pointer ${
                            formData.additionalServices?.some(
                              (selectedService) =>
                                selectedService.id === service.id
                            )
                              ? "ring-2 ring-indigo-500"
                              : ""
                          }`}
                          onClick={() => handleServiceSelect(service)}
                        >
                          {service.attributes?.Title}
                        </Transition>
                        <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Tooltip content
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                {/* Navigation buttons */}
                <button
                  disabled={!formData?.service}
                  type="submit"
                  className="mt-4 w-full flex justify-center rounded-md bg-purple-700 py-2 px-4 text-sm font-semibold text-white hover:bg-purple-500 disabled:bg-purple-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Next
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  className="mt-4 w-full flex justify-center rounded-md bg-gray-500 py-2 px-4 text-sm font-semibold text-white hover:bg-gray-400 disabled:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
