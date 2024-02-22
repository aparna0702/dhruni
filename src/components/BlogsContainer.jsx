import React from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";

const BlogsContainer = ({ cards }) => {
  return (
    <div className="w-full">
      <h1 className="w-1/2 text-xl font-normal relative capitalize pr-3">
        Latest Stories
      </h1>
      <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-3">
        {cards?.map((ele) => (
          <BlogCard
            key={ele?.id}
            title={ele?.attributes?.title}
            image={ele?.attributes?.image?.data?.attributes?.url}
            date={ele?.attributes?.publishedAt}
            slug={ele?.attributes?.slug}
          />
        ))}
      </div>
      <h6 className="w-full mt-8 text-right text-xs font-medium text-gray-700 hover:text-blue-500 hover:underline">
        <Link href={"/blog"} className="w-full">
          Read More
        </Link>
      </h6>
    </div>
  );
};

export default BlogsContainer;
