import { NextRequest, NextResponse } from "next/server";
import {
  createAssistantErrorResponse,
  isAssistantApiError,
} from "@/src/server/assistant/errors";
import { assistantService } from "@/src/server/assistant/service";

type IncomingMessage = {
  role: "assistant" | "user";
  content: string;
};

type ChatRequest = {
  message?: string;
  history?: IncomingMessage[];
};

const CONVERSATION_COOKIE_NAME = "assistant_conversation_id";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export async function POST(req: NextRequest) {
  try {
    const { message } = (await req.json()) as ChatRequest;
    const conversationId = req.cookies.get(CONVERSATION_COOKIE_NAME)?.value;

    const result = await assistantService.handleMessage({
      conversationId,
      message,
    });

    const response = NextResponse.json(result.body, { status: 200 });

    if (result.setConversationCookie) {
      response.cookies.set({
        name: CONVERSATION_COOKIE_NAME,
        value: result.setConversationCookie,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: COOKIE_MAX_AGE_SECONDS,
      });
    }

    return response;
  } catch (error) {
    if (isAssistantApiError(error)) {
      const response = NextResponse.json(
        createAssistantErrorResponse(error),
        { status: error.status }
      );

      if (error.resetConversation) {
        response.cookies.set({
          name: CONVERSATION_COOKIE_NAME,
          value: "",
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 0,
        });
      }

      return response;
    }

    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to process assistant message",
          retryable: true,
        },
      },
      { status: 500 }
    );
  }
}
