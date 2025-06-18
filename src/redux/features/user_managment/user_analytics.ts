import { baseApi } from "@/redux/hooks/baseApi";

const user_analytics = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userAnalyticsForBarCharts: builder.query<any, void>({
      query: () => ({
        url: "analytics/user-role-analytics",
        method: "GET",
      }),
    }),
  }),
});

export const { useUserAnalyticsForBarChartsQuery } = user_analytics;
