"use client";
import React from "react";

const Newsletter = () => {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = fetch("https://api.example.com/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            email,
            subscribed: false,
          },
        }),
      });
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
