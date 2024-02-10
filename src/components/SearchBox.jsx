import useGetPropertiesBySearch from "@/hooks/useGetPropertiesBySearch";
import { formatIndianCurrency } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SyncLoader } from "react-spinners";

const SearchBox = ({ open, type, text }) => {
  const { data, loading, error } = useGetPropertiesBySearch(text);

  return (
    <div
      className={`${
        type === "navbar"
          ? "w-screen h-screen md:w-full md:h-auto md:absolute md:left-0 md:min-w-[260px] md:max-w-[300px] md:max-w-[450px] fixed top-16 left-0 z-50"
          : "absolute top-8 w-full min-w-[260px] max-w-[300px] md:max-w-[450px] m-4"
      }  bg-white p-4 bg-white shadow-xl ${open ? "block" : "hidden"}`}
    >
      {loading ? (
        <SyncLoader color={"#000"} loading={loading} size={10} />
      ) : (
        data?.map((ele) => (
          <Link href={`/property/${ele?.id}`} key={ele?.id}>
            <div
              className="w-full flex flex-row h-20 text-xs lg:text-sm justify-between my-3"
              key={ele?.id}
            >
              <div className="w-4/12 h-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${ele?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}
                  alt="house"
                  width={0}
                  height={0}
                  sizes={"100vw"}
                  className="w-full h-full"
                />
              </div>
              <div className="w-7/12 h-full flex flex-col items-start justify-start text-left">
                <h6 className="text-base">{ele?.attributes.title}</h6>
                <p>{ele?.attributes.location}</p>
                <p>{formatIndianCurrency(ele?.attributes.price)}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default SearchBox;
