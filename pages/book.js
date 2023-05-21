import { useSession } from "next-auth/react";
import Router from "next/router";
import { useState, useEffect } from "react";
import Paypal from "../Components/Paypal";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import CustomDatePicker from "@/Components/CustomDatePicker";
import Example from "@/Components/ServiceSelection";

export default function Book() {
  const { data: session, status } = useSession();
  //const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [formValid, setFormValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSlotAvailable, setIsSlotAvailable] = useState(true);
  const [promo, setPromo] = useState(false);

  async function handleSubmit(event, router) {
    event.preventDefault();
    let data = {
      id: Date.now() + Math.floor(Math.random() * 100),
      intent: "CAPTURE",
      status: "COMPLETED",
      purchase_units: [
        {
          reference_id: "default",
          amount: {
            currency_code: "USD",
            value: "0",
          },
          shipping: {
            name: {
              full_name: "Test Name",
            },
            address: {
              address_line_1: "123 Test Drive",
              admin_area_2: "Test",
              admin_area_1: "EX",
              postal_code: "00000",
              country_code: "US",
            },
          },
        },
      ],
      date: selectedDate,
      desc: desc,
      userId: session.id,
    };
    console.log("Data being sent to API:", data);
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
        // show a modal that the transaction didn't go through and to try again
      }

      const savedTransaction = await response.json();
      // show success and redirect
      debugger;
      Router.push(`/booking/${savedTransaction}`);
      console.log("Transaction saved:", savedTransaction);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  }

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setLoading(true);
    // Call your backend API to check if the selected date and time slot is available
    const isAvailable = await checkAvailability(date, desc);
    setIsSlotAvailable(!isAvailable);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedDate != null && price != null) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [selectedDate, price, setFormValid, formValid, loading, isSlotAvailable]);

  const handleServiceChange = (e) => {
    setPrice(e.target.value);
    setDesc(e.target[e.target.selectedIndex].text);
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

  if (authed) {
    return (
      <>
        <Header isBooking={true} />
        {/* <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
        Book
        </h1> */}
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
                  <p className="mt-1 text-sm text-gray-600">
                    Enter Some Details & Select a Service
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        {/* <label
                              htmlFor="first-name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              First name */}
                        {/* </label>
                            <input
                              required
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="last-name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Last name
                            </label>
                            <input
                              required
                              type="text"
                              name="last-name"
                              id="last-name"
                              autoComplete="family-name"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <input
                              required
                              type="text"
                              name="email-address"
                              id="email-address"
                              readOnly={true}
                              value={session.user?.email}
                              autoComplete="email"
                              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div> */}

                        <div className="col-span-6 sm:col-start-1 col-end-7">
                          <label
                            htmlFor="services"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Service
                          </label>
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
                            <option value="0.00" label="Introductory Session">
                              Introductory Session
                            </option>
                            <option
                              value="111.00"
                              label="1 Hour Distance Reiki Session"
                            >
                              1 Hour Distance Reiki Session
                            </option>
                            <option
                              value="55.00"
                              label="30 Minute Distance Reiki Session"
                            >
                              30 Minute Distance Reiki Session
                            </option>
                            <option
                              value="33.00"
                              label="30 Minute Tarot Reading"
                            >
                              30 Minute Tarot Reading
                            </option>
                            <option
                              value="33.00"
                              label="30 Minute Oracle Reading"
                            >
                              30 Minute Oracle Reading
                            </option>
                            <option
                              value="22.00"
                              label="15 Minute Oracle Reading"
                            >
                              15 Minute Oracle Reading
                            </option>
                            <option
                              value="100000.00"
                              label="15 Minute Oracle Reading"
                            >
                              15 Minute Special Reading
                            </option>
                          </select>
                        </div>
                        <Example />

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
                                autoComplete="postal-code"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </>
                        ) : null}

                        <div className="col-span-6 sm:col-start-1 col-end-7">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Pick Date
                          </label>
                          <CustomDatePicker onChange={handleDateChange} />
                          {loading && <p>Loading availability...</p>}
                          {!isSlotAvailable && (
                            <p className="text-red-500">
                              The selected date and time slot is already booked.
                              Please choose a different slot.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="bg-gray-50 mt-5 px-4 py-3 text-right sm:px-6">
                        {promo ? (
                          <button
                            type="submit"
                            onClick={handleSubmit}
                            className="group relative flex w-full justify-center rounded-md bg-purple-700 py-2 px-3 text-sm font-semibold text-white hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            aria-label="Subscribe"
                          >
                            Book
                          </button>
                        ) : (
                          <Paypal
                            isDisabled={formValid}
                            cost={price}
                            date={selectedDate}
                            desc={desc}
                            userId={session.id}
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
    router.push("/auth/Signin/");
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

async function checkAvailability(reqDate, reqDesc) {
  const response = await fetch("/api/checkDate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reqDate, reqDesc }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.isWithinTimeSlots;
  } else {
    // display new error instead maybe?
    console.log("Error checking time slot");
  }
}
