"use client";
import { useState, useEffect } from "react";
const NEXT_PUBLIC_STRAPI_KEY = process.env.NEXT_PUBLIC_STRAPI_KEY;
const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function useGetAllProperties(
  city = "all",
  town = "all",
  type = "all"
) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${NEXT_PUBLIC_STRAPI_URL}/api/properties?${
            city !== "all" ? `filters[property_city][slug][$eq]=${city}&` : ``
          }${
            type !== "all" ? `filters[property_type][slug][$eq]=${type}&` : ``
          }${
            town !== "all" ? `filters[property_town][slug][$eq]=${town}&` : ``
          }populate=image&populate=property_type&populate=property_city&populate=property_town`,
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
  }, [city]);
  return { data: result, loading, error };
}
