import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">

          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-4">
            <div className="mb-2">
              {/* Logo */}
              <Link href='' className="inline-block" aria-label="Cruip">
                {/* <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="footer-logo">
                      <stop stopColor="purple" offset="0%" />
                      <stop stopColor="blue" offset="25.871%" />
                      <stop stopColor="white" offset="100%" />
                    </radialGradient>
                  </defs>
                  <rect width="32" height="32" rx="16" fill="url(#footer-logo)" fillRule="nonzero" />
                </svg> */}
                <img src='/eye6.svg' className="w-16 h-16" alt='logo2 ' />
              </Link>
            </div>
            {/* <div className="text-sm text-gray-600">
              <Link
                href={{
                  pathname: "/Policies",
                  query: {
                    type: 'Terms'
                  }
                }}
                as="/Terms"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">Terms</Link>
              ·
              <Link href={{
                pathname: "/Policies",
                query: {
                  type: 'Privacy'
                }
              }} 
              as='/PrivacyPolicy'
              className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">Privacy Policy</Link>
            </div> */}
          </div>

          {/* 2nd block */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Products</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link href='' className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Healing Potions</Link>
              </li>
            </ul>
          </div> */}

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-4">
            <h6 className="text-gray-800 font-medium mb-2">Resources</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link
                  href={{
                    pathname: "/Policies",
                    query: {
                      type: 'Cookie'
                    }
                  }}
                  as="/CookiePolicy"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Cookie Policy</Link>
              </li>
              <li className="mb-2">
                <Link
                  href={{
                    pathname: "/Policies",
                    query: {
                      type: 'Disclaimer'
                    }
                  }}
                  as="/Disclaimer"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Disclaimer</Link>
              </li>
              <li className="mb-2">
              <Link
                href={{
                  pathname: "/Policies",
                  query: {
                    type: 'Terms'
                  }
                }}
                as="/Terms"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">Terms</Link>
              </li>
              <li className="mb-2">
              <Link href={{
                pathname: "/Policies",
                query: {
                  type: 'Privacy'
                }
              }} 
              as='/PrivacyPolicy'
              className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-4">
            <h6 className="text-gray-800 font-medium mb-2">Navigation</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link href='/' className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Home</Link>
              </li>
              <li className="mb-2">
                <Link href='/book' className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Book</Link>
              </li>
              <li className="mb-2">
                <Link href='/About' className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">About</Link>
              </li>
              <li className="mb-2">
                <Link href='/learnmore' className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Pricing</Link>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="text-gray-800 font-medium mb-2">Subscribe</h6>
            <p className="text-sm text-gray-600 mb-4">Get the latest news and articles to your inbox every month.</p>
            <form>
              <div className="flex flex-wrap mb-4">
                <div className="w-full">
                  <label className="block text-sm sr-only" htmlFor="newsletter">Email</label>
                  <div className="relative flex items-center max-w-xs">
                    <input id="newsletter" type="email" className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm" placeholder="Your email" required />
                    <button type="submit" className="absolute inset-0 left-auto" aria-label="Subscribe">
                      <span className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300" aria-hidden="true"></span>
                      <svg className="w-3 h-3 fill-current text-blue-600 mx-3 flex-shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg>
                    </button>
                  </div>
                  Success message
                  <p className="mt-2 text-green-600 text-sm">Thanks for subscribing!</p>
                </div>
              </div>
            </form>
          </div> */}

        </div>

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">

          {/* Social links */}
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">

            <li className="ml-4">
              <Link href='https://instagram.com/blyssfull_magick?igshid=MmIzYWVlNDQ5Yg==' className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Instagram">
                <svg className="w-8 h-8 p-1 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z" />
                </svg>
              </Link>
            </li>

            <li className="ml-4">
              <Link href='https://www.facebook.com/profile.php?id=100092394606618&mibextid=LQQJ4d' className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Facebook">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                </svg>
              </Link>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className="text-sm text-gray-600 mr-4">Made by <a className="text-blue-600 hover:underline" href="https://techbridge.dev/">TechBridge Consulting LLC</a>. All rights reserved.</div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
