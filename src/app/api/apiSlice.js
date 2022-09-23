import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      //   transformResponse: (res) => {
      //     return res.map((post) => {
      //       post.title = "changed the title";
      //       return post;
      //     });
      //   },
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (todo) => {
        return {
          url: "/todos",
          method: "POST",
          body: todo,
        };
      },
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ todoId }) => ({
        url: `/todos/${todoId}`,
        method: "DELETE",
        body: todoId,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// start with use <endpoint method name> and Query or Mutation
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;

//createApi is like axios, but in a separate file (slice) and auto generate hooks to use in components.
// also like asyncThunk.
// this example does not use global store but can be used with a global store
