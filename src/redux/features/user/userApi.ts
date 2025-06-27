import { baseApi } from "@/redux/hooks/baseApi";
const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => ({
                url: "users/me",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        updateProfileImage: builder.mutation({
            query: (formData) => ({
                url: "users/upload-image",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["User"]

        }),
        updateUserData: builder.mutation({
            query: (data) => ({
                url: "users/update-profile",
                method: "PUT",
                body: data,
            }),
            // invalidatesTags: ["User"]

        }),
        getDashboardStats: builder.query({
            query: () => ({
                url: "users/dashboard",
                method: "GET",
            }),

        }),
        getAllVerifiedUser: builder.query({
            query: ({ page = 0, limit = 10, sort = "-createdAt", searchTerm = "" }) => ({
                url: "users",
                method: "GET",
                params: {
                    isDeleted: false,
                    isVerified: true,
                    searchTerm,
                    page,
                    limit,
                    sort,
                },
            }),
        }),
        getAllUser: builder.query({
            query: ({ page = 0, limit = 10, sort = "-createdAt", searchTerm = "", isDeleted = false, isVerified = true }) => ({
                url: "users",
                method: "GET",
                params: {
                    isDeleted,
                    isVerified,
                    searchTerm,
                    page,
                    limit,
                    sort,
                },
            }),
        }),
        getSingleUser: builder.query({
            query: (id) => ({
                url: `users/single/${id}`,
                method: "GET",


            }),
        }),

        tokenLog: builder.query({
            query: ({ page = 0, limit = 10, sort = "-timestamp", searchTerm = "" }) => ({
                url: "token-log/get-all-token-log",
                method: "GET",
                params: {
                    searchTerm,
                    page,
                    limit,
                    sort,
                },
            }),
        }),

        toggleUserDelete: builder.mutation({
            query: ({ userId, deleted }) => ({
                url: `users/delete/${userId}`,
                method: 'PATCH',
                body: { deleted }

            }),
        }),
        createPricing: builder.mutation({
            query: (data) => ({
                url: `pricing/create-pricing`,
                method: 'POST',
                body: data,
            }),
        }),
        deletePricing: builder.mutation({
            query: (id) => ({
                url: `pricing/delete-pricing/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["pricing"]

        }),

        updatePricing: builder.mutation({
            query: ({ id, body }) => ({
                url: `pricing/update-pricing/${id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ["pricing"]

        }),
        getAllPricingPlan: builder.query({
            query: ({ page = 0, limit = 10, sort = "-createdAt", searchTerm = "", isDeleted = false, isVerified = true }) => ({
                url: "pricing/get-all-pricing",
                method: "GET",
                params: {
                    isDeleted,
                    searchTerm,
                    page,
                    limit,
                    sort,
                },
            }),
            providesTags: ["pricing"]
        }),

    }),

    overrideExisting: false,
});

export const { useGetMeQuery,
    useUpdateProfileImageMutation,
    useUpdateUserDataMutation,
    useGetDashboardStatsQuery,
    useGetAllVerifiedUserQuery,
    useGetAllUserQuery,
    useGetSingleUserQuery,
    useToggleUserDeleteMutation,
    useTokenLogQuery,
    useCreatePricingMutation,
    useUpdatePricingMutation,
    useGetAllPricingPlanQuery,
    useDeletePricingMutation
    // useUpdateAddressMutation,
    // usePostAddressMutation,
    // useDeleteAddressMutation,
    // useUpdateUserMutation



} = userApi;
