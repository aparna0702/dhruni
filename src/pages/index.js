"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import CardSliders from "@/components/CardSliders";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Pagination,
  Navigation,
  Autoplay,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import parse from "html-react-parser";
import "swiper/css/effect-fade";
import SearchBox from "@/components/SearchBox";
import Link from "next/link";
import BlogsContainer from "@/components/BlogsContainer";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { IoClose, IoLocationOutline } from "react-icons/io5";
import { FiArrowRight } from "react-icons/fi";
import useGetPropertyBySortAndOffset from "@/hooks/useGetPropertyBySortAndOffset";
import useGetBlogsBySortAndOffset from "@/hooks/useGetBlogsBySortAndOffset";
import useGetHomePageContent from "@/hooks/useGetSingleCollection";
import useGetPropertyByStatus from "@/hooks/useGetPropertyByStatus";
import { RxHamburgerMenu } from "react-icons/rx";

const Page = () => {
  const [searchText, setSearchText] = useState("");
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  const {
    data: exclusiveListings,
    loading: exclusiveListingsLoading,
    error: exclusiveListingsError,
  } = useGetPropertyByStatus("Exclusive", 10);

  const {
    data: newListings,
    loading: newListingsLoading,
    error: newListingsError,
  } = useGetPropertyByStatus("New Launched", 10);

  const {
    data: allProperties,
    loading: propertiesLoading,
    error: propertiesError,
  } = useGetPropertyBySortAndOffset("title", 10);

  const {
    data: recentBlogs,
    loading: blogsLoading,
    error: blogsError,
  } = useGetBlogsBySortAndOffset("publishedAt", 10);

  const {
    data: homePage,
    loading: homePageLoading,
    error: homePageError,
  } = useGetHomePageContent("home-page");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center font-inter">
      <Navbar
        position={"absolute"}
        logo={"white"}
        menu={menu}
        handle={setMenu}
      />
      {isScrolled && (
        <nav className="w-full fixed top-0 left-0 h-16 px-3 md:px-24 lg:px-32 gap-6 bg-white shadow-sm z-30 duration-300 flex flex-row items-center justify-between">
          <div className="w-16 h-16">
            <Link href={"/"}>
              <Image
                src="/assets/images/dhruniRealty.jpeg"
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full"
              />
            </Link>
          </div>
          <div className="w-3/6 max-w-[400px] w-auto">
            <span className="w-full h-full flex flex-row justify-center items-center bg-white pl-5 md:px-5 text-xl rounded-full border border-gray-300 relative">
              {searchText.length > 2 && (
                <SearchBox
                  open={openSearchBox}
                  type={"navbar"}
                  text={searchText}
                />
              )}
              <span>
                <IoLocationOutline />
              </span>
              <input
                type="text"
                className="px-5 pl-2 py-2 focus:outline-none w-full text-sm bg-transparent"
                placeholder="Property Name, Location or Builder"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setOpenSearchBox(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setOpenSearchBox(false);
                  }, 250)
                }
              />
            </span>
          </div>
          <span
            className="w-10 text-2xl md:text-4xl block text-black
          transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <IoClose /> : <RxHamburgerMenu />}
          </span>
        </nav>
      )}
      <main className="w-full h-[60vh] lg:h-[70vh] flex flex-wrap flex-col justify-center items-center relative text-center pt-[100px] rounded-bl-3xl rounded-br-3xl border-box">
        <div className="w-full h-full absolute top-0 left-0 z-[1] rounded-bl-3xl rounded-br-3xl overflow-hidden">
          <span className="w-full h-full bg-[rgba(0,0,0,0.5)] absolute z-[2] top-0 left-0"></span>
          <Swiper
            modules={[EffectFade, Navigation, Autoplay, Pagination, A11y]}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            onSlideChange={() => {}}
            onSwiper={() => {}}
            navigation={true}
            effect={"fade"}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full h-full"
          >
            {homePage?.attributes?.carousel?.data?.length > 0
              ? homePage?.attributes?.carousel?.data?.map((ele) => (
                  <SwiperSlide key={ele?.id} className="w-full h-full">
                    <Image
                      src={`${ele?.attributes?.url}`}
                      alt={`${
                        ele?.attributes?.caption ||
                        ele?.attributes?.alternativeText
                      }`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </SwiperSlide>
                ))
              : Array.from({ length: 7 }).map((ele, i) => (
                  <SwiperSlide key={i} className="w-full h-full">
                    <Image
                      src={`/assets/images/bg${i + 1}.webp`}
                      alt={`LuxuryHomes${i + 1}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
        <h1 className="text-3xl md:text-4xl font-heldane font-medium text-center text-white tracking-normal z-10">
          {`Explore India's Finest Properties`}
        </h1>
        <div className="w-full max-w-[700px] h-[45px] mt-6 flex flex-row justify-center items-center px-6 relative z-10">
          <span className="w-full h-full flex flex-row justify-center items-center bg-white pl-5 md:px-5 text-xl md:rounded-tr-none md:rounded-br-none rounded-full overflow-hidden">
            {searchText.length > 2 && (
              <SearchBox open={openSearchBox} type={"hero"} text={searchText} />
            )}
            <span>
              <IoLocationOutline />
            </span>
            <input
              type="text"
              className="px-5 pl-2 py-2 focus:outline-none w-full text-sm bg-transparent"
              placeholder="Property Name, Location or Builder"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => setOpenSearchBox(true)}
              onBlur={() =>
                setTimeout(() => {
                  setOpenSearchBox(false);
                }, 250)
              }
            />
          </span>
          <input
            type="submit"
            className="hidden md:block md:w-1/3 h-full bg-red-800 border-none text-white text-lg font-normal cursor-pointer rounded-tr-full rounded-br-full hover:bg-red-900"
            value="Search"
          />
        </div>
        <h6 className="hidden md:block text-xs text-white mt-5 font-semibold z-[5]">
          EXPLORE 500+ HOMES, MANSIONS AND VILLAS FOR SALE WORLDWIDE IN ONE
          SIMPLE SEARCH
        </h6>
      </main>
      <div className="bg-[#f3f2ed] w-full h-48 lg:h-36 relative -top-6 z-0 rounded-bl-3xl rounded-br-3xl pt-8 px-3 md:px-36 flex flex-col md:flex-row flex-wrap items-center justify-center gap-4">
        {homePage?.attributes?.builderLogo?.data?.length > 0 ? (
          <>
            <h6 className="text-gray-700 font-semibold w-full md:w-1/6 min-w-[250px] text-center uppercase">
              {`Trusted By`}
            </h6>
            <div className="w-full md:w-4/6 flex flex-row flex-wrap items-center">
              <Swiper
                modules={[Autoplay, Pagination, A11y]}
                loop={true}
                freeMode={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                spaceBetween={30}
                slidesPerView={3}
                onSlideChange={() => {}}
                onSwiper={() => {}}
                className="h-28"
                style={{ display: "flex", alignItems: "center" }}
              >
                {homePage?.attributes?.builderLogo?.data?.map((ele) => (
                  <SwiperSlide
                    key={ele?.id}
                    className="w-full h-full"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Link
                      href={`${ele?.attributes?.caption || "/"}`}
                      target="_blank"
                      className="cursor-pointer"
                      style={{ display: "flex", alignItems: "center" }}
                      key={ele.id}
                    >
                      <Image
                        src={`${ele?.attributes?.url}`}
                        alt={`${ele?.attributes?.alternativeText || "Builder"}`}
                        width={150}
                        height={100}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {exclusiveListings?.length > 0 ? (
        <section className="w-full py-4 md:px-20 px-3 my-14">
          <CardSliders title={`Exclusive Listings`} cards={exclusiveListings} />
        </section>
      ) : (
        ""
      )}
      {newListings?.length > 0 ? (
        <section className="w-full py-4 md:px-20 px-3 my-14">
          <CardSliders title={`New Listings`} cards={newListings} />
        </section>
      ) : (
        ""
      )}
      <hr width={"100%"} />
      <section className="w-full py-12 lg:px-36 px-10 my-14 flex flex-wrap flex-row justify-evenly items-center relative gap-10 bg-[#f3f2ed]">
        <div className="w-full md:w-2/5 z-10 mt-10 md:mt-0">
          <h3 className="text-xl md:text-3xl font-ebGaramond font-medium text-gray-800">{`For those who seek an exceptional home and life, there is only Dhruni's Realty.`}</h3>
          <div className="flex flex-row items-start justify-between mt-10">
            <span className="w-1/12 mt-3 border border-gray-800" />
            <p className="w-10/12 text-md md:text-lg text-gray-600">
              {`Dhruni's Realty, with its global network of great agents, provides transforming experiences through centuries of history and innovation in the luxury real estate market.`}
            </p>
          </div>
        </div>
        <div className="w-full md:w-2/5 h-96 relative">
          <div className="absolute top-0 left-0 z-1 h-full w-full bg-[radial-gradient(#000,transparent_2px)] bg-[size:20px_20px]"></div>
          <Image
            src={"/assets/images/lux4.jpg"}
            alt={"luxury Home"}
            width={0}
            height={0}
            sizes={"100vw"}
            className="relative -bottom-20 left-5 md:-bottom-24 md:left-10 rounded-xl shadow-2xl w-full h-full object-cover"
          />
        </div>
      </section>
      {allProperties?.length > 0 ? (
        <section className="w-full py-4 md:px-20 px-3 my-14">
          <CardSliders title={`Listings`} cards={allProperties} />
        </section>
      ) : (
        ""
      )}
      {recentBlogs?.length > 0 ? (
        <section className="w-full my-14 py-4 md:px-20 px-3">
          <BlogsContainer cards={recentBlogs} />
        </section>
      ) : (
        ""
      )}
      <section className="w-full my-14 py-4 md:px-20 px-3">
        <div
          className="w-full p-8 text-white h-96 md:h-72 bg-[linear-gradient(to_right,rgba(0,0,0,0.80),rgba(0,0,0,0.4)),url('../../public/assets/images/lux2.jpg')] 
        relative bg-center bg-cover bg-norepeat overflow-hidden"
        >
          <div className="w-5/6 md:w-3/6 h-full flex flex-col justify-between">
            <span>
              <h1 className="text-xl md:text-4xl font-ebGaramond font-medium">
                Join 100+ <br />
                real estate offices
              </h1>
              <p className="text-sm md:text-lg mt-4">
                Showcase your listings on DhruniRealty, the newest way to
                explore luxury marketplace.
              </p>
            </span>
            <button className="flex flex-row items-center justify-between text-semibold w-44 h-12 px-9 text-black bg-white font-semibold">
              Get started
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>
      {homePage?.attributes?.content !== undefined ? (
        <section className="w-full my-14 py-4 md:px-20 px-10">
          {parse(homePage?.attributes?.content)}
        </section>
      ) : (
        ""
      )}
      <hr width={"100%"} />
      <Newsletter />
      <hr width={"100%"} />
      <Footer />
    </div>
  );
};

export default Page;
