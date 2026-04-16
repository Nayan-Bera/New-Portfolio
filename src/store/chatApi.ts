"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

export type ChatRequest = {
  message?: string;
  history: ChatMessage[];
};

export type ChatResponse = {
  reply: string;
  stage?: string;
  requires?: "name" | "email" | "otp" | null;
  conversationId?: string;
};

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    sendChatMessage: builder.mutation<ChatResponse, ChatRequest>({
      query: (body) => ({
        url: "api/chat",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendChatMessageMutation } = chatApi;
