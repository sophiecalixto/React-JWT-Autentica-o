import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://suadatabase.com",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/users/signin",
          method: "post",
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }) => {
        return {
          url: "/users/signup",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authAPI;
