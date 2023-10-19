import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ApiData, Room } from "../models/IRooms";
import csrftoken from "./CsrfcToken";
console.log(csrftoken);

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/" }),
  tagTypes: ["Room"],
  endpoints: (build) => ({
    fetchAllRooms: build.query<ApiData, number>({
      query: (limit: number = 5) => ({
        url: "/room/",
        params: {
          limit: limit,
        },
      }),
      providesTags: () => ["Room"],
    }),
    createRoom: build.mutation<Room, Room>({
      query: (room) => ({
        url: "/room/",
        method: "POST",
        body: room,
        headers: { "X-CSRFToken": csrftoken },
        mode: "same-origin", // Do not send CSRF token to another domain.
      }),
      invalidatesTags: ["Room"],
    }),
    deleteRoom: build.mutation<Room, Room>({
      query: (room) => ({
        url: `/room/${room.id}/`,
        method: "Delete",
        headers: { "X-CSRFToken": csrftoken },
        mode: "same-origin", // Do not send CSRF token to another domain.
      }),
      invalidatesTags: ["Room"],
    }),
    editRoom: build.mutation<Room, Room>({
      query: (room) => ({
        url: `/room/${room.id}/`,
        method: "Put",
        body: room,
        headers: { "X-CSRFToken": csrftoken },
        mode: "same-origin", // Do not send CSRF token to another domain.
      }),
      invalidatesTags: ["Room"],
    }),
  }),
});
