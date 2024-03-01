import Image from "next/image";
import React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";
import useGetSingleCollection from "@/hooks/useGetSingleCollection";
import useGetPropertyByStatus from "@/hooks/useGetPropertyByStatus";
import parse from "html-react-parser";
import useGetAllPropertyCities from "@/hooks/useGetAllPropertyCities";

const Footer = () => {
  const { data: footer, loading, error } = useGetSingleCollection("web-config");
  const {
    data: newListings,
    loading: newListingsLoading,
    error: newListingsError,
  } = useGetPropertyByStatus("New Launched", 10);

  const {
    data: exclusiveListings,
    loading: exclusiveListingsLoading,
    error: exclusiveListingsError,
  } = useGetPropertyByStatus("Exclusive", 10);

  const {
    data: cities,
    loading: cityLoading,
    error: cityError,
  } = useGetAllPropertyCities();

  return (
    <footer className="w-full py-6 md:px-20 px-5 bg-black relative">
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-wrap flex-col justify-center text-white md:flex-row md:justify-between items-start flex-wrap gap-4 text-center">
          <div className="w-full md:w-[350px] text-sm text-left text-gray-200">
            <strong>ABOUT: </strong>
            <br />
            {typeof footer?.attributes?.footerAbout === "string"
              ? parse(footer?.attributes?.footerAbout)
              : ""}
          </div>
          <div className="text-left">
            {newListings?.length > 0 ? (
              <>
                <strong>New Launched:</strong>
                <br />
                <ul>
                  {newListings?.map((item, index) => (
                    <li key={index} className="text-gray-300 hover:text-white">
                      <Link href={`/${item?.attributes?.slug}`}>
                        {item?.attributes?.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="text-left">
            {exclusiveListings?.length > 0 ? (
              <>
                <strong>Exclusive Listings:</strong>
                <br />
                <ul>
                  {exclusiveListings?.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-300 hover:text-white capitalize"
                    >
                      <Link href={`/${item?.attributes?.slug}`}>
                        {item?.attributes?.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="text-left">
            {cities?.length > 0 ? (
              <>
                <strong>Property Locations:</strong>
                <br />
                <ul>
                  {cities?.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-300 hover:text-white capitalize"
                    >
                      <Link href={`/${item?.attributes?.slug}`}>
                        {item?.attributes?.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <hr className="w-full border border-gray-700 my-4" />
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
