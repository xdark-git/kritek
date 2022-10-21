import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reduxApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
    addPosts: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post?.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostsMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = reduxApi;
