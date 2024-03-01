"use client";
import Map from "@/components/Map";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import useGetAllProperties from "@/hooks/useGetAllProperties";
import useGetAllPropertyType from "@/hooks/useGetAllPropertyType";
import useGetTown from "@/hooks/useGetTown";
import MapContext from "@/hooks/useMapContext";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { SyncLoader } from "react-spinners";

const Page = () => {
  const { city, town } = useRouter().query;

  const { data: property, loading, error } = useGetAllProperties(city, town);

  const {
    data: propTypes,
    loading: typeLoading,
    error: typeError,
  } = useGetAllPropertyType();

  const {
    data: townData,
    loading: townLoading,
    error: townError,
  } = useGetTown(town);

  return (
    <div className="w-full font-inter relative">
      <Navbar position={"relative"} logo={"black"} />
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <SyncLoader color="#000" loading={loading} size={10} />
        </div>
      ) : (
        <>
          <section className="w-full py-10 flex md:flex-row-reverse flex-col items-start px-3 md:px-10 gap-4">
            <div className="w-full 2xl:w-1/2 h-[75vh]">
              <MapContext.Provider
                value={{
                  lat: townData?.attributes?.latitude || 0,
                  lng: townData?.attributes?.longitude || 0,
                  zoom: 14,
                }}
              >
                <Map />
              </MapContext.Provider>
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
              <div className="w-full h-[80vh] 2xl:w-1/2 px-2 grid grid-cols-1 lg:grid-cols-2 gap-2 overflow-y-scroll no-scrollbar">
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
                      ele?.attributes?.property_city?.data?.attributes?.slug
                    }
                    propertyTown={
                      ele?.attributes?.property_town?.data?.attributes?.slug
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
