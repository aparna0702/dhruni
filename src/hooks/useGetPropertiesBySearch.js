"use client";
import { useState, useEffect } from "react";
const NEXT_PUBLIC_STRAPI_KEY = process.env.NEXT_PUBLIC_STRAPI_KEY;
const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function useGetPropertiesBySearch(text) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${NEXT_PUBLIC_STRAPI_URL}/api/properties?${
            text !== ""
              ? `filters[$or][0][location][$containsi]=${text}&filters[$or][1][builder][username][$containsi]=${text}&filters[$or][2][title][$containsi]=${text}`
              : ""
          }&populate=image&pagination[limit]=5`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${NEXT_PUBLIC_STRAPI_KEY}`,
            },
          }
        );
        const data = await res.json();
        setResult(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [text]);
  return { data: result, loading, error };
}
