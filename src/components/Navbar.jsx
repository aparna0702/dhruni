"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import useGetAllPropertyCities from "@/hooks/useGetAllPropertyCities";
import useGetPropertyByStatus from "@/hooks/useGetPropertyByStatus";
import { useRouter } from "next/router";
import useGetSingleCollection from "@/hooks/useGetSingleCollection";

const Navbar = ({ position, logo, menu, handle }) => {
  const { data: cities, loading, error } = useGetAllPropertyCities();
  const {
    data: webConfig,
    loading: webConfigLoading,
    error: webConfigError,
  } = useGetSingleCollection("web-config");

  const router = useRouter();
  const {
    data: exclusiveListings,
    loading: exclusiveListingsLoading,
    error: exclusiveListingsError,
  } = useGetPropertyByStatus("Exclusive", 10);

  const [propertyMenu, setPropertyMenu] = React.useState(false);
  const [locationMenu, setLocationMenu] = React.useState(false);
  return (
    <div
      className={`w-full h-16 flex flex-row items-center justify-between px-3 lg:px-36 py-3 gap-6 ${position} top-0 left-0 z-[1010] border border-[#fff5] border-t-0 border-l-0 border-r-0 shadow-sm`}
    >
      <div className="w-16 h-16">
        <Link href={"/"}>
          {logo === "black" ? (
            <Image
              src="/assets/images/dhruniRealty.jpeg"
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full"
            />
          ) : (
            <Image
              src="/assets/images/dhruniRealty.png"
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full"
            />
          )}
        </Link>
      </div>
      <span
        className="text-4xl block md:hidden text-white
          transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => handle(!menu)}
      >
        {menu ? <IoClose /> : <RxHamburgerMenu />}
      </span>
      <ul
        className={` md:flex hidden flex-col md:flex-row justify-center md:justify-between items-center text-white font-semibold text-sm font-roboto gap-3 z-50 relative`}
      >
        <li className="px-6 cursor-pointer relative">
          <button
            onClick={() => setLocationMenu(!locationMenu)}
            className={`${
              router.pathname === "/"
                ? "text-white"
                : "border border-gray-400 bg-white text-black hover:bg-gray-200"
            } focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center`}
            type="button"
            onBlur={() =>
              setTimeout(() => {
                setLocationMenu(false);
              }, 500)
            }
          >
            Select Locations
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 ${
              locationMenu ? "block" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute`}
          >
            <ul
              className="py-2 text-sm text-gray-800"
              aria-labelledby="dropdownDefaultButton"
            >
              {cities?.map((ele) => (
                <li key={ele?.id}>
                  <a
                    href={`/property/${ele?.attributes?.slug}/`}
                    className="block px-4 py-2 hover:bg-gray-300 capitalize"
                  >
                    {ele?.attributes?.city}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li className="px-6 cursor-pointer relative">
          <button
            onClick={() => setPropertyMenu(!propertyMenu)}
            className={`${
              router.pathname === "/"
                ? "text-white"
                : "border border-gray-400 bg-white text-black hover:bg-gray-200"
            } focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center`}
            type="button"
            onBlur={() =>
              setTimeout(() => {
                setPropertyMenu(false);
              }, 300)
            }
          >
            Properties
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 ${
              propertyMenu ? "block" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute`}
          >
            <ul
              className="py-2 text-sm text-gray-700 "
              aria-labelledby="dropdownDefaultButton"
            >
              {exclusiveListings?.map((ele) => (
                <li key={ele?.id}>
                  <a
                    href={`/${ele?.attributes?.slug}/`}
                    className="block px-4 py-2 hover:bg-gray-300 capitalize"
                  >
                    {ele?.attributes?.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <Link href={webConfig?.attributes?.EnquireNowButton || "/"}>
          <button className="border border-gray-400 bg-white text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm">
            Enquire Now
          </button>
        </Link>
      </ul>
      {menu && (
        <div className="w-full h-screen bg-white fixed top-16 left-0 text-black">
          <ul
            className={`flex flex-col w-full h-full justify-center items-center font-semibold text-sm font-roboto gap-10 z-50 relative`}
          >
            <li className="px-6 cursor-pointer">
              <Link href={"/"}>Home</Link>
            </li>
            {/* <li className="px-6 cursor-pointer">Contact</li> */}
            <li className="px-6 cursor-pointer relative">
              <button
                onBlur={() =>
                  setTimeout(() => {
                    setLocationMenu(false);
                  }, 500)
                }
                onClick={() => setLocationMenu(!locationMenu)}
                className="text-black focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Select Locations
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                className={`z-10 ${
                  locationMenu ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute`}
              >
                <ul
                  className="py-2 text-sm text-gray-800"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {cities?.map((ele) => (
                    <li key={ele?.id}>
                      <a
                        href={`/property/${ele?.attributes?.slug}/`}
                        className="block px-4 py-2 hover:bg-gray-300 capitalize"
                      >
                        {ele?.attributes?.city}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="px-6 cursor-pointer relative">
              <button
                onBlur={() =>
                  setTimeout(() => {
                    setPropertyMenu(false);
                  }, 500)
                }
                onClick={() => setPropertyMenu(!propertyMenu)}
                className="text-black focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Properties
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                className={`z-10 ${
                  propertyMenu ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 "
                  aria-labelledby="dropdownDefaultButton"
                >
                  {exclusiveListings?.map((ele) => (
                    <li key={ele?.id}>
                      <a
                        href={`/${ele?.attributes?.slug}/`}
                        className="block px-4 py-2 hover:bg-gray-300 capitalize"
                      >
                        {ele?.attributes?.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <Link href={webConfig?.attributes?.EnquireNowButton || "/"}>
              <button className="border border-gray-400 bg-white text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm">
                Enquire Now
              </button>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
