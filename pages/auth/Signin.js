import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getCsrfToken } from "next-auth/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Signin({ csrfToken, providers }) {
  const router = useRouter()
  let [submitDisabled, setSubmitDisabled] = useState(false);
  let [email, setEmail] = useState();
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log("button clicked >> + button state " + submitDisabled);
    setSubmitDisabled(true);
    fetch('/api/auth/signin/email/', {
      method: 'POST',
      body: JSON.stringify({csrfToken, email}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      console.log(response);
      router.push('/auth/Verifyrequest/')
    }).catch(e => {
      console.log(e);
      router.push('/auth/error/')
    });
  };
  let handleChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <svg
              className="mx-auto h-12 w-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>

            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Blyssfull Magick"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="-space-y-px rounded-md shadow-sm">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                required
                placeholder="Email address"
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div>
                {/* <input id="email-address" name="email" type="email" /> */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitDisabled}
                className="group relative flex w-full justify-center rounded-md bg-purple-700 py-2 px-3 text-sm font-semibold text-white hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-purple-500 group-hover:text-purple-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
          {Object.values(providers).map((provider) => {
            provider !== "email" ? (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}
