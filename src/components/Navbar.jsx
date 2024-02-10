"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const Navbar = ({ position, logo }) => {
  // const [menu, setMenu] = React.useState(false);
  return (
    <div
      className={`w-screen h-16 flex lg:flex-row items-center justify-between px-3 lg:px-36 py-3 gap-6 ${position} top-0 left-0 z-40 border border-[#fff5] border-t-0 border-l-0 border-r-0 shadow-sm`}
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
      <div className="flex flex-col md:flex-row">
        {/* <span
          className="text-4xl block md:hidden text-white
          transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <IoClose /> : <RxHamburgerMenu />}
        </span> */}
        {/* <ul
          className={` flex flex-col md:flex-row justify-center md:justify-between items-center text-white font-semibold text-xl font-roboto gap-3 bg-gray-800 z-50 ${
            menu
              ? "w-screen h-screen fixed top-24 left-0 border-t-2"
              : "relative"
          }`}
        >
          <li className="px-6 cursor-pointer">About</li>
          <li className="px-6 cursor-pointer">Contact</li>
          <li className="px-6 cursor-pointer">
            <Link href={"/properties"}>Properties</Link>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default Navbar;
