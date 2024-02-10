import Image from "next/image";
import React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";
import useGetSingleCollection from "@/hooks/useGetSingleCollection";

const Footer = () => {
  const { data: footer, loading, error } = useGetSingleCollection("web-config");
  return (
    <footer className="w-full py-6 md:px-20 px-5 bg-black relative">
      <div className="w-full flex flex-row ">
        <div className="w-full flex flex-col justify-center text-white md:flex-row md:justify-between items-center flex-wrap gap-4 text-center">
          <span className="w-[150px] flex flex-row justify-between text-2xl">
            <Link
              href={
                footer?.attributes?.linkedin !== undefined
                  ? footer?.attributes?.linkedin
                  : ""
              }
            >
              <FaLinkedinIn />
            </Link>
            <Link
              href={
                footer?.attributes?.instagram !== undefined
                  ? footer?.attributes?.instagram
                  : ""
              }
            >
              <FaInstagram />
            </Link>
            <Link
              href={
                footer?.attributes?.twitter !== undefined
                  ? footer?.attributes?.twitter
                  : ""
              }
            >
              <BsTwitterX />
            </Link>
          </span>
          <span className="flex justify-center">
            <Link href="/">
              <Image
                src={"/assets/images/dhruniRealty.png"}
                alt="logo"
                width={0}
                height={0}
                sizes={"100vw"}
                className="w-20 h-20"
              />
            </Link>
          </span>
          <span className="text-sm font-semibold text-gray-400">
            © 2024 Dhruni Realty
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
