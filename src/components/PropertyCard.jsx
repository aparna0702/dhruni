"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { formatIndianCurrency, getDaysFromNow } from "@/utils";

const PropertyCard = ({
  propertyTitle,
  propertyPrice,
  propertyLocation,
  propertySlug,
  propertyArea,
  propertyImage,
  propertyType,
  propertyStatus,
  propertyCity,
  propertyTown,
}) => {
  console.log(propertyImage);
  return (
    <article className="m-2 shadow-md max-h-[450px] border border-gray-300 pb-4 w-full block font-inter">
      <Link href={`/${propertySlug}`} className="cursor-pointer">
        <header className="w-full md:h-60 h-56 relative">
          <span className="text-xs absolute top-2 left-2 font-medium bg-white px-2 py-1">
            {propertyStatus}
          </span>
          {propertyImage?.data?.attributes?.formats?.medium?.url !==
          undefined ? (
            <Image
              src={`${propertyImage?.data?.attributes?.formats?.medium?.url}`}
              alt="house"
              width={0}
              height={0}
              sizes={"100vw"}
              style={{ objectFit: "cover" }}
              className="w-full h-full"
            />
          ) : (
            ""
          )}
        </header>
      </Link>
      <div className="flex flex-col justify-center items-start mt-3 p-2 md:px-5 h-24">
        <p className="text-base font-medium uppercase">{propertyTitle}</p>
        <p className="text-xs text-gray-500 font-medium capitalize">{`${
          propertyType?.data?.attributes?.type === undefined
            ? "Property"
            : propertyType?.data?.attributes?.type
        } in ${propertyLocation}`}</p>
        <div className="w-full mt-4 pr-4 flex flex-wrap justify-between items-center">
          <span className="flex flex-col items-start justify-center">
            <h6 className="text-xs text-black">Area</h6>
            <h6 className="text-sm font-medium">{`${propertyArea}`} sqft</h6>
          </span>
          <span className="flex flex-col items-start justify-center">
            <h6 className="text-xs text-black">Price</h6>
            <h6 className="text-sm font-medium">
              {formatIndianCurrency(propertyPrice)}
            </h6>
          </span>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
