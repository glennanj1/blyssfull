// components/StepOne.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStep } from "../context/StepContext";
import { useSession } from "next-auth/react";
import { Transition } from '@headlessui/react';


export default function StepOne() {
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm();
  const { nextStep, updateFormData, formData } = useStep();
  const [services, setServices] = useState(false);
  const [error, setError] = useState("");
  const [errorMesage, setErrorMessage] = useState("");
  const [promo, setPromo] = useState(false);

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  const handleServiceChange = (e) => {
    debugger;
    updateFormData({
      ...formData,
      title: e.target.value,
      price: e.target[e.target.selectedIndex].dataset.price,
      description: e.target[e.target.selectedIndex].text,
      url: e.target[e.target.selectedIndex].dataset.url,
    });

    if (e.target[e.target.selectedIndex].text === "Introductory Session") {
      setPromo(true);
    } else if (
      e.target[e.target.selectedIndex].text !== "Introductory Session"
    ) {
      setPromo(false);
    } else {
      setPromo(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      debugger;
      try {
        // setIsLoading(true);
        const data = await fetchData();
        debugger;
        setServices(data.data);
      } catch {
        console.error("ERROR");
        setError(true);
        setErrorMessage(
          "There was an issue pulling services please try again shortly"
        );
      }
    };

    if (!services) {
      debugger;
      getData();
    }
  }, [services]);

  return (
    // <form className="h-full w-auto" onSubmit={handleSubmit(onSubmit)}>
    //   <input {...register("firstName")} placeholder="First Name" />
    //   <input {...register("lastName")} placeholder="Last Name" />
    //   <button type="submit">Next</button>
    // </form>
    <div className="mt-5 md:col-span-2 md:mt-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-start-1 col-end-7">
                <label
                  htmlFor="services"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Service
                </label>
                {services ? (
                  <>
                    {/* <select
                      required
                      onChange={handleServiceChange}
                      id="services"
                      name="services"
                      value={formData?.title}
                      autoComplete="services-name"
                      className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value=""></option>
                      {session?.introSessionUsed ? null : (
                        <option value="Introductory Session" label="Introductory Session">
                          Introductory Session
                        </option>
                      )}
                      {services?.map((s) => {
                        return (
                          <option
                            key={s?.id}
                            value={s?.attributes?.Title}
                            label={s?.attributes?.Title}
                            data-url={s?.attributes?.Url}
                            data-price={s?.attributes?.Price}
                          >
                            {s.attributes?.Title}
                          </option>
                        );
                      })}
                    </select> */}
                    <div className="container mx-auto px-4 py-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {services?.map((s) => {
                          <Transition
                            as="div"
                            key={service.id}
                            show={true}
                            enter="transform transition duration-[400ms]"
                            enterFrom="opacity-0 scale-75"
                            enterTo="opacity-100 scale-100"
                            className={`bg-white shadow rounded-lg p-4 cursor-pointer ${
                              selectedServices.includes(service.id)
                                ? "ring-2 ring-indigo-500"
                                : ""
                            }`}
                            onClick={() => toggleService(service.id)}
                          >
                            {service.name}
                          </Transition>
                        })}
                      </div>
                    </div>
                    <button
                      className="disabled:bg-purple-100 group relative flex w-full justify-center rounded-md bg-purple-700 py-2 px-3 text-sm font-semibold text-white hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      aria-label="Step 2"
                      type="submit"
                    >
                      Next
                    </button>
                  </>
                ) : null}
              </div>
              {promo ? (
                <>
                  <div className="col-span-6">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <input
                      required
                      type="text"
                      name="street-address"
                      id="street-address"
                      value={addressData.address}
                      onChange={(e) =>
                        setAddressData({ address: e.target.value })
                      }
                      autoComplete="street-address"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <input
                      required
                      type="text"
                      name="city"
                      id="city"
                      value={setAddressData.city}
                      onChange={(e) => setAddressData({ city: e.target.value })}
                      autoComplete="address-level2"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <input
                      required
                      type="text"
                      name="region"
                      id="region"
                      value={setAddressData.state}
                      onChange={(e) =>
                        setAddressData({ state: e.target.value })
                      }
                      autoComplete="address-level1"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <input
                      required
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      value={setAddressData.zip}
                      onChange={(e) => setAddressData({ zip: e.target.value })}
                      autoComplete="postal-code"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </form>
      <div className="bg-gray-50 mt-5 px-4 py-3 text-right sm:px-6"></div>
    </div>
  );
}

async function fetchData() {
  // check date for custom logic
  const response = await fetch("/api/getEvents");

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.log("Error checking time slot");
  }
}
