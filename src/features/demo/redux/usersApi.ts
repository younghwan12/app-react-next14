import qs from "query-string";
import appApi from "@/redux/appApi";
import { UserListReq, UserListRes } from "../types";
import { CommonApiResponse } from "@/common/types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["user"],
});

const issuesMgtApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserList: builder.query<CommonApiResponse<UserListRes>, UserListReq>({
            query: (query) => ({
                // ?${qs.stringify(query)}
                url: `/user`,
                method: "GET",
            }),
            providesTags: () => [{ type: "user" }],
        }),
        AddUser: builder.mutation<CommonApiResponse<UserListRes>, UserListReq>({
            query: (query) => ({
                // ?${qs.stringify(query)}
                url: `/user`,
                method: "POST",
                body: query,
            }),
            invalidatesTags: () => [{ type: "user" }],
        }),
    }),
    overrideExisting: true,
});

export default issuesMgtApi;
export const { useGetUserListQuery, useLazyGetUserListQuery } = issuesMgtApi;
