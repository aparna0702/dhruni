"use client";
import { useState, useEffect } from "react";
const NEXT_PUBLIC_STRAPI_KEY = process.env.NEXT_PUBLIC_STRAPI_KEY;
const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function useGetPropertyByBuilder(username) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();
  const [error, setError] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${NEXT_PUBLIC_STRAPI_URL}/api/properties?populate=*&filters[builder][username][$eqi]=${username}`,
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
  }, [username]);

  return { data: result, loading, error };
}
