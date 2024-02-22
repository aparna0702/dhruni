"use client";
import { formatDateToString } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ title, image, date, slug }) => {
  return (
    <article className="w-full p-2">
      <Link
        href={`/blog/${slug}`}
        className="w-full flex flex-row items-center justify-evenly gap-2"
      >
        <span className="w-1/2 max-w-[200px]">
          <Image
            src={`${image}`}
            alt="house"
            width={0}
            height={0}
            sizes={"100vw"}
            className="w-full h-full"
          />
        </span>
        <div className="w-1/2 flex flex-col justify-start overflow-hidden max-h-[120px] ">
          <h6 className="w-full font-bold text-xs text-gray-700 mb-2">
            {formatDateToString(new Date(date))}
          </h6>
          <p className="w-full text-sm font-medium">{title}</p>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
