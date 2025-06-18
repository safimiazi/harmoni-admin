import { baseApi } from "@/redux/hooks/baseApi";

const autApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "auth/login", // set url name
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation } = autApi;
