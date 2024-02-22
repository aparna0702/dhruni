"use client";
import Map from "@/components/Map";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import useGetAllProperties from "@/hooks/useGetAllProperties";
import useGetAllPropertyTowns from "@/hooks/useGetAllPropertyTowns";
import useGetCity from "@/hooks/useGetCity";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SyncLoader } from "react-spinners";

const Page = () => {
  const { city } = useRouter().query;
  const { data: property, loading, error } = useGetAllProperties(city, "all");
  const {
    data: towns,
    loading: townLoading,
    error: townError,
  } = useGetAllPropertyTowns(city);

  const {
    data: cityData,
    loading: cityLoading,
    error: cityError,
  } = useGetCity(city);

  return (
    <div className="w-full font-inter relative">
      <Navbar position={"relative"} logo={"black"} />
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <SyncLoader color="#000" loading={loading} size={10} />
        </div>
      ) : (
        <>
          <section className="w-full bg-white px-3 lg:px-36 py-5 flex flex-row items-center overflow-x-scroll border border-r-0 border-l-0 sticky top-0 z-20 no-scrollbar">
            {towns?.map((ele) => (
              <Link
                href={`/property/${city}/${ele?.attributes?.slug}`}
                key={ele.id}
              >
                <span className="rounded-full w-[150px] text-center text-xs px-3 py-2 mx-2 border border-gray-400 text-gray-800 hover:bg-gray-200 capitalize hover:cursor-pointer truncate">
                  {ele?.attributes?.town}
                </span>
              </Link>
            ))}
          </section>
          <section className="w-full py-10 flex md:flex-row-reverse flex-col items-start px-3 md:px-10 gap-4">
            <div className="w-full 2xl:w-1/2 h-[70vh]">
              <Map lat={cityData?.attributes?.latitude} lng={cityData?.attributes?.longitude}/>
              {/* <Image
                src={"/assets/images/map.jpeg"}
                alt="property"
                width={0}
                height={0}
                sizes={"100vw"}
                className="w-full h-full"
              /> */}
            </div>
            {property?.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <h1 className="text-xl italic">No data found</h1>
              </div>
            ) : (
              <div className="w-full h-[80vh] 2xl:w-1/2 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-scroll no-scrollbar">
                {property?.map((ele) => (
                  <PropertyCard
                    key={ele?.id}
                    propertyId={ele?.id}
                    propertyTitle={ele?.attributes?.title}
                    propertyStatus={ele?.attributes?.status}
                    propertyLocation={ele?.attributes?.location}
                    propertyArea={ele?.attributes?.size}
                    propertyPrice={ele?.attributes?.price}
                    propertyType={
                      ele?.attributes?.property_type?.data?.attributes?.type
                    }
                    propertyImage={ele?.attributes?.image}
                    propertySlug={ele?.attributes?.slug}
                    propertyCity={
                      ele?.attributes?.property_city.data.attributes.slug
                    }
                    propertyTown={
                      ele?.attributes?.property_town.data.attributes.slug
                    }
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Page;