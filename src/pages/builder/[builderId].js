"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import PageNotFound from "@/components/PageNotFound";
import PropertyCard from "@/components/PropertyCard";
import useGetBuilder from "@/hooks/useGetBuilder";
import useGetPropertyByBuilder from "@/hooks/useGetPropertyByBuilder";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SyncLoader } from "react-spinners";

const Page = () => {
  const { builderId } = useRouter().query;
  const { data: builder, loading, error } = useGetBuilder(builderId);
  const {
    data: properties,
    loading: propertiesLoading,
    error: propertiesError,
  } = useGetPropertyByBuilder(builder?.username);

  const pageNotFound = () => <PageNotFound />;

  useEffect(() => {
    if (builder === undefined) {
      pageNotFound();
    }
  }, [builder]);
  return (
    <div className="w-full h-screen box-border">
      <Navbar logo="black" position={"relative"} />
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <SyncLoader color="#000" loading={loading} size={15} />
        </div>
      ) : (
        <section className="w-full px-3 lg:px-20 py-10">
          <span className="text-sm md:text-base text-gray-500 uppercase font-semibold tracking-wider font-montserrat">
            Builders / {builder?.username}
          </span>
          <h1 className="text-6xl md:text-8xl font-light font-hernald text-black mt-16 mb-10 font-heldane  text-center md:text-left">
            {builder?.username}
          </h1>
          <h6 className="text-lg md:text-2xl font-semibold font-montserrat text-gray-700 capitalize text-center md:text-left">
            {builder?.address}
          </h6>
          <br />
          <br />
          <div className="w-full flex flex-row items-center justify-center md:justify-start gap-6 flex-wrap">
            {builder?.numberCall && (
              <button
                className="text-gray-900 border hover:text-white border-gray-900 w-64 h-16 font-semibold text-lg tracking-wider uppercase hover:bg-gray-700"
                onClick={() =>
                  window.open(`tel:${builder?.numberCall || 0}`, "_self")
                }
              >
                Call
              </button>
            )}
            {builder?.whatsappNumber && (
              <Link href={`https://wa.me/${builder?.whatsappNumber || ""}`}>
                <button className="bg-gray-900 text-white w-64 h-16 font-semibold text-lg tracking-wider uppercase hover:bg-gray-700">
                  Send Text
                </button>
              </Link>
            )}
          </div>
          <br />
          <br />
          <br />
          <h6 className="text-xl font-semibold font-montserrat text-gray-700 uppercase  text-center md:text-left">
            About :
          </h6>
          <p className="w-full text-sm md:text-base font-montserrat text-center md:text-left">
            {typeof builder?.about === "string" ? builder?.about : ""}
          </p>
          <section className="w-full py-10">
            {propertiesLoading ? (
              <SyncLoader color="#000" loading={propertiesLoading} size={15} />
            ) : (
              <>
                <h6 className="text-xl font-semibold font-montserrat text-gray-700 uppercase text-center md:text-left">
                  Projects :
                </h6>
                <br />
                <br />
                <div className="w-full flex flex-row items-center justify-center md:justify-start gap-6 flex-wrap">
                  {properties?.length > 0 ? (
                    properties?.map((project, index) => (
                      <div className="w-[300px]" key={project?.id}>
                        <PropertyCard
                          propertyImage={project?.attributes?.image}
                          propertySlug={project?.attributes?.slug}
                          propertyTitle={project?.attributes?.title}
                          propertyLocation={project?.attributes?.location}
                          propertyPrice={project?.attributes?.price}
                          propertyType={project?.attributes?.property_type}
                          propertyArea={project?.attributes?.size}
                          propertyStatus={project?.attributes?.status}
                          propertyCity={
                            project?.attributes?.property_city?.data?.attributes
                              ?.city
                          }
                          propertyTown={
                            project?.attributes?.property_town?.data?.attributes
                              ?.town
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-sm font-semibold text-center w-full text-gray-600">
                      No Projects Found
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        </section>
      )}
      <hr className="my-10" />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Page;
