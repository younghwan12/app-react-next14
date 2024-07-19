import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { config } from "@/common/config";

const baseQuery = fetchBaseQuery({
    baseUrl: config.url.API_BASE_URL,
});

const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({}),
});

function bearerAuth(token: string | undefined) {
    return `Bearer ${token} `;
}

export default appApi;
