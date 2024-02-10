"use client";
import Navbar from "@/components/Navbar";
import useGetAllBlogs from "@/hooks/useGetAllBlogs";
import { formatDateToString } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { data: blog, loading, error } = useGetAllBlogs();

  return (
    <div className="w-screen px-3 md:px-20 font-inter">
      <Navbar position={"relative"} logo={"black"} />
      <div className="w-full my-6">
        <h1 className="text-4xl w-full text-center font-semibold font-heldane text-gray-800">
          Journal
        </h1>
        <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 gap-6">
          {blog.length > 0 ? (
            blog?.map((ele) => (
              <article
                className="w-full border border-gray-400 rounded-lg p-2 max-w-[320px]"
                key={ele?.id}
              >
                <Link href={`/blog/${ele?.id}`}>
                  <header className="w-full h-48">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${ele?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                      alt="logo"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-full"
                    />
                  </header>

                  <div className="w-full mt-1 px-4 pb-4">
                    <h6 className="text-xs mt-10 mb-2 text-gray-700">
                      {formatDateToString(
                        new Date(ele?.attributes?.publishedAt)
                      )}
                    </h6>
                    <h2 className="text-base font-heldane">
                      {ele?.attributes?.title}
                    </h2>
                    <h2 className="text-sm text-gray-500 truncate mt-2">
                      {ele?.attributes?.caption}
                    </h2>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <h1 className="text-xl italic text-center w-full">
              No Blogs found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
