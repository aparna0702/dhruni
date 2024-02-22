"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import useGetBlog from "@/hooks/useGetBlog";
import parse from "html-react-parser";
import { SyncLoader } from "react-spinners";
import PageNotFound from "@/components/PageNotFound";
import { useRouter } from "next/router";

const Page = () => {
  const { blogId } = useRouter().query;
  const { data: blog, loading, error } = useGetBlog(blogId);

  console.log(blog)

  const pageNotFound = () => <PageNotFound />;

  useEffect(() => {
    if (blog === null) {
      pageNotFound();
    }
  }, [blog]);

  return (
    <div className="w-full">
      <Navbar position={"relative"} logo={"black"} />
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <SyncLoader color={"#000"} loading={loading} size={10} />
        </div>
      ) : (
        <>
          <div className="w-full h-[75vh]">
            {blog?.attributes?.image?.data?.attributes?.formats?.large?.url !==
            undefined ? (
              <Image
                src={`${blog?.attributes?.image?.data?.attributes?.formats?.large?.url}`}
                alt="house"
                width={0}
                height={0}
                sizes={"100vw"}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              ""
            )}
          </div>
          <div className="w-full px-3 md:px-20">
            <h1 className="text-xl mt-10 mb-2">{blog?.attributes?.title}</h1>
            <h3 className="text-base text-gray-500">
              {blog?.attributes?.title}
            </h3>
            <hr width="100%" className="my-3" />
            <div className="w-full flex flex-row items-center justify-center gap-6">
              <span className="text-xs text-gray-600">
                {blog?.attributes?.title}
              </span>
              <span className="text-xs text-gray-600">
                {blog?.attributes?.title}
              </span>
            </div>
            <hr width="100%" className="my-3" />
            <div className="w-full py-4">
              {blog?.attributes?.content !== undefined
                ? parse(blog?.attributes?.content)
                : ""}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
