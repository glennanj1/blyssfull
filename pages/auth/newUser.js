import React, { useState } from "react";
import { useSession, useEffect } from "next-auth/react";
import { useRouter } from "next/router";
import Popup from "@/Components/PopUp";

export default function Welcome() {
  const [authed, setAuthed] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [popUp, setPopUp] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [subject, setSubject] = useState();
  const { data: session, status, user } = useSession();
  const router = useRouter();
  
  const validateInput = (name) => {
    const regex = /^[a-zA-Z]{1,20}$/;
    return regex.test(name);
  };
  
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const clearPopUp = () => {
      setPopUp(false);
      setMessage('');
      setType('');
      setSubject('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateInput(firstName) || !validateInput(lastName)) {
      // show pop up
      setPopUp(true);
      setMessage('Invalid input, only alphabets are allowed in first and last names.');
      setType('error');
      setSubject('Error');
      setTimeout(() => {
        clearPopUp();
      }, 5000);

      console.log('Invalid input, only alphabets are allowed in first and last names. No whitespace allowed');
      return;
    }
    fetch("/api/newuser/", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("res ok");
          reloadSession();
          router.push("/");
        } else {
          // show pop up
          setPopUp(true);
          setMessage('There was an problem saving the name please try again later');
          setType('error');
          setSubject('Error');
          setTimeout(() => {
            clearPopUp();
          }, 5000);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (authed) {
    return (
      <>
        {popUp ? (<Popup type={type} message={message} subject={subject} />) : null}
        <div class="md:shadow-xl pt-32 pb-12 md:p-80 md:pt-40 md:pb-20 w-50">
          <div>
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h2 className="break-words text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                    Welcome 👋{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-500">
                      {session.user.email}
                    </span>
                  </h2>
                  <p class="mt-1 text-sm text-gray-600">
                    Please Enter Some Details
                  </p>
                </div>
              </div>
              <div class="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            First name
                          </label>
                          <input
                            required
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            onChange={(event) =>
                              setFirstName(event.target.value)
                            }
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
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        Save
                      </button>
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
  if (status === "authenticated") {
    if (session.newUser === false) {
      router.push("/");
    }
    setTimeout(() => {
      setAuthed(true);
    }, 2000);
  }
  if (status === "unauthenticated") {
    router.push("/auth/Signin/");
  }

  return (
    <>
      <div class="animate-pulse md:shadow-xl pt-32 pb-12 md:p-80 md:pt-40 md:pb-20 w-50">
        <div>
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h2 className="bg-slate-700 h-20 rounded break-words text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"></h2>
              </div>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="bg-slate-700 h-10 rounded col-span-6 sm:col-span-3"></div>

                      <div className="bg-slate-700 h-10 rounded col-span-6 sm:col-span-3"></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="bg-slate-700 rounded inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    ></button>
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
