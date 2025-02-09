"use client";
import React from "react";

const Newsletter = () => {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [valid, setValid] = React.useState(true);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setValid(false);
      return;
    }
    try {
      setValid(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/news-letters`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_KEY}`,
          },
          body: JSON.stringify({
            data: {
              email,
              subscribed: false,
            },
          }),
        }
      );
      if (response.ok) {
        setMessage("You have successfully subscribed to our newsletter");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="w-full my-14 py-4 md:px-16 px-8 flex flex-row flex-wrap justify-center lg:justify-between items-start gap-4">
      <div className="w-full md:w-1/2 max-w-[430px]">
        <h1 className="text-2xl md:text-3xl font-medium text-black font-ebGaramond">
          Weekly Luxury Newsletter
        </h1>
        <p className="w-10/12 mt-4 text-md text-gray-600">
          {`Receive the beautifully curated selection of what's trending in
            luxury with inside stories and tips from our experts`}
        </p>
      </div>
      <div className="w-full md:w-1/2 max-w-[430px] flex flex-col gap-5 items-start">
        {message === "" ? (
          <>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 px-4 py-2 focus:outline-none"
            />
            {!valid && (
              <h6 className="text-red-600 text-xs">
                Please enter a valid Email
              </h6>
            )}
            <button
              className="bg-black hover:bg-black text-white font-semibold px-4 py-2 w-full"
              onClick={handleSubmit}
            >
              Subscribe
            </button>
            <span className="text-xs text-gray-800 text-left">
              BY SHARING YOUR EMAIL, YOU AGREE TO OUR TERMS OF USE AND PRIVACY.
            </span>
          </>
        ) : (
          <h3 className="text-green-600 text-xl font-bold">{message}</h3>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
