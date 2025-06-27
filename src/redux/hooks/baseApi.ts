import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
import Cookies from "js-cookie";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "omit",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User","pricing"],
  endpoints: () => ({}),
});
