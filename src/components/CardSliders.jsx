"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./PropertyCard";
import { Pagination, Thumbs, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import Link from "next/link";
import { SyncLoader } from "react-spinners";

const CardSliders = ({ title, loading, cards = [] }) => {
  // const swiper = useSwiper();
  const swiperRef = useRef();

  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between items-center">
        <Link href={"/property/"} className="w-full">
          <h1 className="text-xl font-normal relative capitalize">{title}</h1>
        </Link>
        <div className="flex flex-row md:w-20 justify-between items-center">
          <span
            className="border cursor-pointer text-base md:text-lg p-2 rounded-full border-gray-300 hover:border-gray-600 hover:bg-gray-100"
            id={"swiper-button-prev"}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <GrFormPrevious />
          </span>
          <span
            className="swiper-button-next border cursor-pointer text-base md:text-lg p-2 rounded-full border-gray-300 hover:border-gray-600 hover:bg-gray-100"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <GrFormNext />
          </span>
        </div>
      </div>
      <div className="w-full flex flex-row justify-start flex-wrap">
        {loading ? (
          <SyncLoader color={"#000"} loading={loading} size={10} />
        ) : cards?.length === 0 ? (
          <h1 className="w-full text-xl italic text-center">No data found</h1>
        ) : (
          <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={15}
            slidesPerView={"auto"}
            onSlideChange={() => {}}
            onSwiper={() => {}}
            freeMode={true}
            className="w-full"
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {cards?.length &&
              cards?.map((ele, i) => (
                <SwiperSlide
                  key={i}
                  className="w-auto max-w-[260px] md:max-w-[340px] py-12"
                >
                  <PropertyCard
                    key={i}
                    propertySlug={ele?.attributes?.slug}
                    propertyTitle={ele?.attributes?.title}
                    propertyLocation={ele?.attributes?.location}
                    propertyPrice={ele?.attributes?.price}
                    propertyImage={ele?.attributes?.image}
                    propertyType={ele?.attributes?.property_type}
                    propertyArea={ele?.attributes?.size}
                    propertyStatus={ele?.attributes?.status}
                    propertyCity={
                      ele?.attributes?.property_city?.data?.attributes?.city
                    }
                    propertyTown={
                      ele?.attributes?.property_town?.data?.attributes?.town
                    }
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default CardSliders;
