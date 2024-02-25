import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Router from "next/router";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Paypal from "../../../Components/Paypal";
import Calcom from "../../../Components/Calcom";

export default function Book() {
  const { data: session, status } = useSession();
  const [authed, setAuthed] = useState(false);
  const [price, setPrice] = useState(null);
  const [desc, setDesc] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formValid, setFormValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSlotAvailable, setIsSlotAvailable] = useState(true);
  const [promo, setPromo] = useState(false);
  const [addressData, setAddressData] = useState({address: '', city: '', state: '', zip: ''});
  const [showPayment, setShowPayment] = useState(false);

  const [showCalcom, setshowCalcom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState();
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState([])
  const handleSubmit = async (event, router) => {
    event.preventDefault();

    const data = {
      id: Date.now() + Math.floor(Math.random() * 100),
      intent: "CAPTURE",
      status: "COMPLETED",
      purchase_units: [
        {
          reference_id: "promo",
          amount: {
            currency_code: "USD",
            value: "0",
          },
          shipping: {
            name: {
              full_name: `${session.name}`,
            },
            address: {
              address_line_1: `${addressData.address}`,
              admin_area_2: `${addressData.state}`,
              admin_area_1: `${addressData.city}`,
              postal_code: `${addressData.zip}`,
              country_code: "US",
            },
          },
        },
      ],
      date: selectedDate,
      desc: desc,
      userId: session.id,
    };

    try {
      const response = await fetch("/api/booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save transaction");
      }

      const savedTransaction = await response.json();
      Router.push(`/booking/${savedTransaction}`);
    } catch (error) {
      console.log("Error saving transaction:", error);
    }
  }

  async function getServices() {
    try {
        setIsLoading(true);
        const response = await fetch('/api/getEvents');
        const data = await response.json();
        setServices(data.data.events);
    } catch {
        console.error('ERROR')
        setError(true);
        setErrorMessage('There was an issue pulling services please try again shortly')
    }
  }

  useEffect(() => {
    console.log()
    if (!services) {
        getServices();
    }
    // promo is the free one form fields are moving to calcom
    if (promo && price === null) {
      setFormValid(false);
    } else if (selectedDate !== null && price !== null) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
    debugger;
  }, [selectedDate, price, setFormValid, formValid, loading, isSlotAvailable, services]);

  const handleServiceChange = (e) => {
      setPrice(e.target.value);
      setDesc(e.target[e.target.selectedIndex].text);
      debugger;
      if (e.target[e.target.selectedIndex].text === "Introductory Session") {
          setPromo(true);
          debugger;
        } else if (e.target[e.target.selectedIndex].text !== "Introductory Session") {
            setPromo(false);
            debugger;
        } else {
            setPromo(false);
            debugger;
    }
  };

  // *** Fix ME
  if (!authed) {
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
                  {price ? (
                    <h2 className="text-1xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4">
                      Price: ${price}
                    </h2>
                  ) : null}
                  <p className="mt-1 text-xl text-black underline">
                    Enter Some Details & Select a Service
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
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
                            <select
                            required
                            onChange={handleServiceChange}
                            id="services"
                            name="services"
                            value={price}
                            autoComplete="services-name"
                            className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          >
                          <option value=""></option>
                            {session?.introSessionUsed ? null : (
                              <option value="0.00" label="Introductory Session">
                              Introductory Session
                            </option>
                            )}
                             {services?.map(s => {
                                return (
                                <option
                                  key={s.id}
                                  value={s.slug}
                                  label={s.title}
                                >
                                  {s.title}
                                </option>
                                )
                             })}
                            </select>
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
                                onChange={(e) => setAddressData({address: e.target.value})}
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
                                onChange={(e) => setAddressData({city: e.target.value})}
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
                                onChange={(e) => setAddressData({state: e.target.value})}
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
                                onChange={(e) => setAddressData({zip: e.target.value})}
                                autoComplete="postal-code"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </>
                        ) : null}
                      </div>
                      {/* calcom here */}
                      {showCalcom &&

                        <div className="w-[800px] h-[100vh] mt-5 px-4 py-3">
                          <Calcom />
                        </div>
                      }
                      <div className="bg-gray-50 mt-5 px-4 py-3 text-right sm:px-6">
                        {promo && showPayment ? (
                          <button
                            disabled={!isSlotAvailable}
                            type="submit"
                            className="disabled:bg-purple-100 group relative flex w-full justify-center rounded-md bg-purple-700 py-2 px-3 text-sm font-semibold text-white hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            aria-label="Subscribe"
                          >
                            Book
                          </button>
                        ) : (
                          <Paypal
                            isDisabled={formValid || !isSlotAvailable}
                            cost={price}
                            date={selectedDate}
                            desc={desc}
                            userId={session?.id}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
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
      <Header isBooking={true} />
      <div className="animate-pulse md:shadow-xl lg:pt-32 pt-32 pb-12 lg:p-80 md:p-10 md:pt-40 md:pb-20 w-50">
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

async function checkAvailability() {
  // check date for custom logic
  const response = await fetch("http://localhost:3005/api/additional-services");

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.log("Error checking time slot");
  }
}
