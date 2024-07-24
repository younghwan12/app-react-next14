import qs from "query-string";
import appApi from "@/redux/appApi";
import { ProjectListRes, ProjectListReq } from "../types";
import { CommonApiResponse } from "@/common/types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["user"],
});

const projectApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<CommonApiResponse<ProjectListRes>, ProjectListReq>({
            query: (query) => ({
                // ?${qs.stringify(query)}
                url: `/project/projects`,
                method: "GET",
            }),
            providesTags: () => [{ type: "user" }],
        }),
        AddUser: builder.mutation<CommonApiResponse<ProjectListRes>, ProjectListReq>({
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

export default projectApi;
export const { useGetProjectsQuery } = projectApi;
