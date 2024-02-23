"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Amenities from "@/components/Amenities";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import { FaArrowLeft } from "react-icons/fa";
import {
  formatIndianCurrency,
  formatDateToString,
  getSpentYearsAgent,
} from "@/utils";
import { FiCamera } from "react-icons/fi";
import GalleryModal from "@/components/GalleryModal";
import parse from "html-react-parser";
import useGetProperty from "@/hooks/useGetProperty";
import { SyncLoader } from "react-spinners";
import CardSliders from "@/components/CardSliders";
import useGetAllProperties from "@/hooks/useGetAllProperties";
import { useRouter } from "next/router";
import PageNotFound from "@/components/PageNotFound";
import Head from "next/head";
import Map from "@/components/Map";
import MapContext from "@/hooks/useMapContext";

const PropertyDetails = () => {
  const { city, town, propId } = useRouter().query;
  const {
    data: similarProperty,
    similarLoading,
    similarError,
  } = useGetAllProperties(city, town);

  const { data: property, loading, error } = useGetProperty(propId);
  const [inputQuery, setInputQuery] = React.useState("");
  const [agentQuery, setAgentQuery] = React.useState("");
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const images = [];

  const pageNotFound = () => <PageNotFound />;

  useEffect(() => {
    if (property === null) {
      pageNotFound();
    }
  }, [propId]);

  if (property?.attributes?.imageGallery?.data?.length > 0) {
    property?.attributes?.imageGallery?.data?.forEach((ele) => {
      images.push({
        src: `${ele?.attributes?.formats?.medium?.url}`,
        original: `${ele?.attributes?.url}`,
        width: 320,
        height: 174,
        caption: property?.attributes?.title,
      });
    });
  }
  console.log(property);
  return (
    <div className="w-full font-inter relative">
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <SyncLoader color="#000" loading={loading} size={10} />
        </div>
      ) : (
        <>
          <Head>
            <title>{property?.attributes?.title}</title>
            {property?.attributes?.SEO?.length > 0 &&
              property?.attributes?.SEO?.map((ele, i) => (
                <meta name={ele.name} content={ele.content} key={i} />
              ))}
          </Head>
          <GalleryModal
            open={galleryOpen}
            close={setGalleryOpen}
            images={images}
          />
          <section className="flex lg:hidden w-full h-16 fixed bottom-0 left-0 bg-white z-40 flex flex-row justify-between items-center px-8 border border-t-gray-400 border-t-1 border-b-0 border-l-0 border-r-0">
            <button className="w-full min-w-[100px] bg-red-800 text-base text-center mx-2 p-2 font-semibold text-white">
              Call
            </button>
            <button className="w-full min-w-[100px] bg-red-800 text-base text-center mx-2 p-2 font-semibold text-white">
              Text
            </button>
          </section>
          <Navbar position={"relative"} logo={"black"} />
          <section className="w-full bg-white px-3 lg:px-36 py-3 border border-r-0 border-l-0 border-b-0 sticky top-0 z-20">
            <Link
              href={"/property"}
              className="flex items-center text-sm text-gray-700"
            >
              <span className="pr-2">
                <FaArrowLeft />
              </span>
              Back to search
            </Link>
          </section>
          <section
            className={`w-full relative grid grid-cols-1 gap-1 lg:grid-cols-4 lg:px-16 max-h-[70vh]`}
          >
            <button
              className="absolute bottom-5 right-2 md:right-20 text-white font-bold flex flex-row items-center bg-[#000a] py-2 px-4 rounded-full border border-gray-500 text-xs lg:text-sm z-10"
              onClick={() => {
                setGalleryOpen(true);
              }}
            >
              <span className="pr-3">
                <FiCamera />
              </span>
              {`${
                1 +
                (isNaN(property?.attributes?.imageGallery?.data?.length)
                  ? 0
                  : property?.attributes?.imageGallery?.data?.length)
              } ${
                isNaN(property?.attributes?.imageGallery?.data?.length)
                  ? "Photo"
                  : "Photos"
              }`}
            </button>
            <div className="row-span-2 col-span-2 overflow-hidden">
              <Image
                src={`${property?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                alt={"property"}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover hover:scale-105 duration-500"
              />
            </div>
            {property?.attributes?.imageGallery?.data?.map((_, i) =>
              i < 4 ? (
                <div
                  className={`${
                    isNaN(property?.attributes?.imageGallery?.data?.length) ||
                    property?.attributes?.imageGallery?.data?.length < 4
                      ? "hidden"
                      : "block"
                  }
                overflow-hidden z-[1]`}
                  key={i}
                >
                  <Image
                    src={`${property?.attributes?.imageGallery?.data?.[i]?.attributes?.formats?.medium?.url}`}
                    alt={"property"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full object-cover hover:scale-105 duration-500"
                  />
                </div>
              ) : (
                <></>
              )
            )}
          </section>
          <br />
          <section
            className="w-full py-4 flex flex-col flex-col lg:flex-row justify-between lg:px-16 px-10 
      gap-10 items-start relative"
          >
            <div className="w-full lg:w-4/6">
              <div className="w-full flex flex-col gap-4 ">
                <h1 className="md:text-4xl text-xl font-medium font-ebGaramond">
                  {property?.attributes?.title}
                </h1>
                <h2 className="font-semibold text-xl md:text-3xl font-ebGaramond">
                  {formatIndianCurrency(property?.attributes?.price)}
                </h2>
                <ul className="flex flex-row">
                  <li className="pr-6 text-gray-700 text-sm md:text-md font-normal">
                    {`${property?.attributes?.BHK} BHK`}
                  </li>
                  <li className="pr-6 text-gray-700 text-sm md:text-md font-normal">
                    4 Baths
                  </li>
                  <li className="pr-6 text-gray-700 text-sm md:text-md font-normal">
                    {`${property?.attributes?.size} m`}
                    <sup>2</sup>
                  </li>
                </ul>
                <div className="w-full text-sm lg:text-base text-gray-800">
                  {typeof property?.attributes?.description === "string"
                    ? parse(property?.attributes?.description)
                    : ""}
                </div>
                <span className="mt-3 text-gray-600 text-xs md:text-sm font-semibold">
                  {`Listed ${formatDateToString(
                    new Date(property?.attributes?.publishedAt)
                  )} `}
                </span>
              </div>
              <hr width="100%" className="my-10" />
              <div className="w-full">
                <h1 className="md:text-3xl text-xl font-ebGaramond font-medium">
                  Features
                </h1>
                <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property?.attributes?.amenities?.data.length > 0 ? (
                    property?.attributes?.amenities?.data?.map((ele, i) => (
                      <div
                        key={i}
                        className="text-sm md:text-lg flex flex-row gap-4 items-center"
                      >
                        <span>
                          {Amenities(ele?.attributes?.iconId?.toLowerCase())}
                        </span>
                        <span className="capitalize">
                          {ele?.attributes?.amenity}
                        </span>
                      </div>
                    ))
                  ) : (
                    <h1 className="text-lg italic">
                      Contact Agent for more details
                    </h1>
                  )}
                </div>
              </div>
              <hr width="100%" className="my-10" />
              <div className="flex flex-col gap-8 w-full justify-center items-center top-10 p-5">
                <h1 className="w-full md:text-3xl text-xl font-ebGaramond font-medium">
                  Ask a Question
                </h1>
                <div className="w-full flex flex-row items-center gap-5">
                  <div className="w-12">
                    <Image
                      src="/assets/images/avatar.webp"
                      alt={"Avatar"}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%" }}
                      className="rounded-full border border-gray-400"
                    />
                  </div>
                  <span className="text-base font-medium">
                    {property?.attributes?.builder?.data?.attributes?.username}
                  </span>
                </div>
                <div className="w-full my-2">
                  <textarea
                    placeholder="Ask the agent for more information about this property."
                    className="w-full h-32 text-md p-2 focus:outline-none border border-gray-400"
                    onChange={(e) => setAgentQuery(e.target.value)}
                    value={agentQuery}
                    style={{ resize: "none" }}
                  ></textarea>
                  <button className="my-2 w-48 h-12 text-white text-md font-bold bg-red-800 hover:bg-red-900 cursor-pointer">
                    Send message
                  </button>
                </div>
              </div>
              <hr width="100%" className="my-10" />
              <div className="w-full">
                <h1 className="md:text-3xl text-xl font-ebGaramond font-medium">
                  Explore the Area
                </h1>
                <br />
                <p className="md:text-lg text-sm">
                  {property?.attributes?.location}
                </p>
                <br />
                <div className="w-full h-96 border border-black">
                  <MapContext.Provider
                    value={{
                      lat: property?.attributes?.latitude || 0,
                      lng: property?.attributes?.longitude || 0,
                    }}
                  >
                    <Map />
                  </MapContext.Provider>
                </div>
                <br />
                {/* <Link
                  href="https://goo.gl/maps/7JYz9Zq8qfXZ7Q6r9"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-gray-800 mt-5 hover:underline"
                >
                  See in Google Maps
                </Link> */}
              </div>
              <hr width="100%" className="my-10" />
              <div className="w-full">
                <h1 className="md:text-3xl text-xl font-ebGaramond font-medium">
                  About the Building
                </h1>
                <br />
                <table>
                  <thead>
                    <tr>
                      <th className="text-left w-[200px]">Year built</th>
                      <th className="text-left w-[150px]">Property type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0</td>
                      <td>
                        {
                          property?.attributes?.property_type?.data?.attributes
                            ?.type
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr width="100%" className="my-10" />
              <div className="w-full">
                <h1 className="md:text-3xl text-xl font-ebGaramond font-medium">
                  Listed by
                </h1>
                <br />
                <h6 className="font-medium">About</h6>
                <p className="text-sm lg:text-base text-gray-800">
                  {typeof property?.attributes?.builder?.data?.attributes
                    ?.about === "string"
                    ? parse(
                        property?.attributes?.builder?.data?.attributes?.about
                      )
                    : ""}
                </p>
                <br />
                <h6 className="font-medium">Registered on Dhruni Realty</h6>
                <p className="text-sm lg:text-base text-gray-800">
                  {property?.attributes?.builder?.data?.attributes?.createdAt.slice(
                    0,
                    4
                  )}
                </p>
                <br />
                <h6 className="font-medium">Address</h6>
                <p className="text-sm lg:text-base text-gray-800">
                  {property?.attributes?.builder?.data?.attributes?.address}
                </p>
                <br />
                <h6 className="font-medium">Phone number</h6>
                <p className="text-sm lg:text-base text-gray-800">
                  {property?.attributes?.builder?.data?.attributes?.contact}
                </p>
                <br />
                <p className="text-right">
                  <Link
                    href={`/builder/${property?.attributes?.builder?.data?.attributes?.slug}`}
                    className="text-gray-700 text-base hover:underline font-semibold w-full text-center"
                  >
                    More Listings
                  </Link>
                </p>
              </div>
            </div>
            <article className="lg:w-2/6 lg:max-w-[375px] hidden lg:flex flex flex-col gap-8 sticky border border-gray-300 justify-center items-center top-16 p-5">
              <div className="w-full flex flex-row items-center gap-5">
                <div className="w-1/5">
                  <Image
                    src="/assets/images/avatar.webp"
                    alt={"Avatar"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%" }}
                    className="rounded-full border border-gray-400"
                  />
                </div>
                <div className="w-4/5 flex flex-col justify-center">
                  <span className="text-base font-medium">
                    {property?.attributes?.builder?.data?.attributes?.username}
                  </span>
                  <span className="text-sm text-gray-700">{`${getSpentYearsAgent(
                    new Date(
                      property?.attributes?.builder?.data?.attributes?.createdAt
                    )
                  )} year with Dhruni`}</span>
                </div>
              </div>
              <div className="w-full text-gray-800">
                <h4 className="text-lg font-semibold">Contact the agent</h4>
                <div className="w-full my-2 border border-gray-400">
                  <textarea
                    placeholder="Type your message..."
                    className="w-full h-32 text-md p-2 focus:outline-none"
                    onChange={(e) => setInputQuery(e.target.value)}
                    value={inputQuery}
                  ></textarea>
                  <div className="flex flex-row flex-wrap gap-4 p-3">
                    <span
                      className="border border-red-800 text-red-700 cursor-pointer rounded-lg p-2"
                      onClick={(event) => {
                        event.preventDefault();
                        setInputQuery("Is this property still available?");
                      }}
                    >
                      Is it available?
                    </span>
                    <span
                      className="border border-red-800 text-red-700 cursor-pointer rounded-lg p-2"
                      onClick={(event) => {
                        event.preventDefault();
                        setInputQuery("I'd like more property details.");
                      }}
                    >
                      Share more details
                    </span>
                    <span
                      className="border border-red-800 text-red-700 cursor-pointer rounded-lg p-2"
                      onClick={(event) => {
                        event.preventDefault();
                        setInputQuery(
                          "I'd like to schedule a viewing for the property."
                        );
                      }}
                    >
                      Schedule a waiting
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <button className="w-full h-12 text-white text-md font-bold bg-red-800 hover:bg-red-900 cursor-pointer">
                  Send message
                </button>
              </div>
            </article>
          </section>
          {similarProperty?.length > 0 ? (
            <>
              <hr width="100%" className="my-10" />
              <section className="w-full my-14 py-4 md:px-20 px-10">
                <CardSliders
                  title="Similar Properties"
                  cards={similarProperty}
                />
              </section>
            </>
          ) : (
            ""
          )}
          <hr width="100%" className="my-10" />
          <Newsletter />
          <hr width="100%" className="my-10" />
          <Footer />
        </>
      )}
    </div>
  );
};

export default PropertyDetails;
