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
            query: ({ page = 0, limit = 10, sort = "-createdAt", searchTerm = "", isDeleted = false }) => ({
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


        // LLM Provider
        createLlmProvider: builder.mutation({
            query: (data) => ({
                url: `llm-provider/post-llm-provider`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["LlmProvider"]

        }),
        deleteLlmProvider: builder.mutation({
            query: (id) => ({
                url: `llm-provider/delete-llm-provider/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["LlmProvider"]

        }),

        updateLlmProvider: builder.mutation({
            query: ({ id, body }) => ({
                url: `llm-provider/update-llm-provider/${id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ["LlmProvider"]

        }),
        getAllLlmProvider: builder.query({
            query: ({ page = 0, limit = 10, sort = "-createdAt", searchTerm = "", isDeleted = false }) => ({
                url: "llm-provider/get-all-llm-provider",
                method: "GET",
                params: {
                    isDeleted,
                    searchTerm,
                    page,
                    limit,
                    sort,
                },
            }),
            providesTags: ["LlmProvider"]
        }),


        //llm model:

        createLlmModel: builder.mutation({
            query: (data) => ({
                url: `llm-model/post-llm-model`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["LlmModel"]

        }),
        deleteLlmModel: builder.mutation({
            query: (id) => ({
                url: `llm-model/delete-llm-model/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["LlmModel"]

        }),

        updateLlmModel: builder.mutation({
            query: ({ id, body }) => ({
                url: `llm-model/update-llm-model/${id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ["LlmModel"]

        }),
        getAllLlmModel: builder.query({
            query: ({ page = 0, limit = 10, sort = "-createdAt", searchTerm = "", isDeleted = false }) => ({
                url: "llm-model/get-all-llm-model",
                method: "GET",
                params: {
                    isDeleted,
                    searchTerm,
                    page,
                    limit,
                    sort,
                },
            }),
            providesTags: ["LlmModel"]
        }),


        //llm eachalab:

        createEachalabModel: builder.mutation({
            query: (data) => ({
                url: `eachalab-model/post-eachalab-model`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["eachalabModel"]

        }),
        deleteEachalabModel: builder.mutation({
            query: (id) => ({
                url: `eachalab-model/delete-eachalab-model/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["eachalabModel"]

        }),

        updateEachalabModel: builder.mutation({
            query: ({ id, body }) => ({
                url: `eachalab-model/update-eachalab-model/${id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ["eachalabModel"]

        }),
        getAllEachalabModel: builder.query({
            query: ({ page = 0, limit = 10, sort = "-createdAt", searchTerm = "", isDeleted = false }) => ({
                url: "eachalab-model/get-all-eachalab-model",
                method: "GET",
                params: {
                    isDeleted,
                    searchTerm,
                    page,
                    limit,
                    sort,
                },
            }),
            providesTags: ["eachalabModel"]
        }),



        //configure::




        putConfigure: builder.mutation({
            query: ({ id, body }) => ({
                url: `configure/update-configure/${id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ["eachalabModel"]

        }),

        getConfigure: builder.query({
            query: () => ({
                url: "configure/get-configure",
                method: "GET",

            }),
            providesTags: ["eachalabModel"]
        }),

        logoutAdmin: builder.mutation({
            query: () => ({
                url: `auth/logout`,
                method: 'POST',
            }),
            invalidatesTags: ["eachalabModel"]

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
    useDeletePricingMutation,
    useCreateLlmProviderMutation,
    useDeleteLlmProviderMutation,
    useUpdateLlmProviderMutation,
    useGetAllLlmProviderQuery,

    useCreateLlmModelMutation,
    useDeleteLlmModelMutation,
    useUpdateLlmModelMutation,
    useGetAllLlmModelQuery,

    useCreateEachalabModelMutation,
    useDeleteEachalabModelMutation,
    useUpdateEachalabModelMutation,
    useGetAllEachalabModelQuery,

    usePutConfigureMutation,
    useGetConfigureQuery,

    useLogoutAdminMutation




} = userApi;
