// import { BaseQueryArg } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RoomsData } from "../models/IRooms";

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/" }),
  endpoints: (build) => ({
    fetchAllRooms: build.query<RoomsData, number>({
      query: (limit: number = 5) => ({
        url: "/room/",
        params: {
          limit: limit,
        },
      }),
    }),
    createRoom: build.mutation<RoomsData, RoomsData>({
      query: (room) => ({
        url: "/room/",
        method: "POST",
        body: room,
      }),
    }),
  }),
});
