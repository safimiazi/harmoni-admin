import { baseApi } from "@/redux/hooks/baseApi";

const managementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAnalytics: builder.query<any, void>({
      query: () => ({
        url: "analytics/dashboard-analytics",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardAnalyticsQuery } = managementApi;
