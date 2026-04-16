import { assistantApiClient } from "./client";
import { AssistantApiError } from "./errors";
import { assistantSessionStore } from "./session-store";
import {
  AssistantChatResult,
  AssistantRequires,
  AssistantSessionRecord,
  AssistantStage,
} from "./types";

const getRequiredField = (stage: AssistantStage): AssistantRequires => {
  switch (stage) {
    case "awaiting_name":
      return "name";
    case "awaiting_email":
      return "email";
    case "awaiting_otp":
      return "otp";
    default:
      return null;
  }
};

const createConversationId = () => crypto.randomUUID();

const saveSession = (
  existingConversationId: string | undefined,
  sessionId: string,
  stage: AssistantStage
) => {
  const now = Date.now();
  const conversationId = existingConversationId || createConversationId();
  const previous = assistantSessionStore.get(conversationId);

  const record: AssistantSessionRecord = {
    conversationId,
    sessionId,
    stage,
    createdAt: previous?.createdAt || now,
    updatedAt: now,
  };

  assistantSessionStore.set(record);

  return conversationId;
};

const normalizeResult = (
  conversationId: string,
  reply: string,
  stage: AssistantStage
): AssistantChatResult => ({
  reply,
  stage,
  requires: getRequiredField(stage),
  conversationId,
});

const sendByStage = async (
  sessionId: string,
  stage: AssistantStage,
  message: string
) => {
  if (stage === "awaiting_otp") {
    return assistantApiClient.verifyOtp(sessionId, message);
  }

  return assistantApiClient.sendMessage(sessionId, message);
};

export const assistantService = {
  async handleMessage({
    conversationId,
    message,
    retryOnMissingSession = true,
  }: {
    conversationId?: string;
    message?: string;
    retryOnMissingSession?: boolean;
  }): Promise<{
    body: AssistantChatResult;
    setConversationCookie?: string;
  }> {
    const trimmedMessage = message?.trim();
    const existingSession = conversationId
      ? assistantSessionStore.get(conversationId)
      : null;

    try {
      if (!existingSession) {
        const started = await assistantApiClient.startSession();
        const newConversationId = saveSession(
          conversationId,
          started.sessionId,
          started.stage
        );

        if (!trimmedMessage) {
          return {
            body: normalizeResult(
              newConversationId,
              started.reply,
              started.stage
            ),
            setConversationCookie: newConversationId,
          };
        }

        const continued = await sendByStage(
          started.sessionId,
          started.stage,
          trimmedMessage
        );

        saveSession(newConversationId, continued.sessionId, continued.stage);

        return {
          body: normalizeResult(
            newConversationId,
            continued.reply,
            continued.stage
          ),
          setConversationCookie: newConversationId,
        };
      }

      if (!trimmedMessage) {
        throw new AssistantApiError({
          code:
            existingSession.stage === "awaiting_otp"
              ? "OTP_REQUIRED"
              : "MESSAGE_REQUIRED",
          stage: existingSession.stage,
        });
      }

      const continued = await sendByStage(
        existingSession.sessionId,
        existingSession.stage,
        trimmedMessage
      );

      saveSession(
        existingSession.conversationId,
        continued.sessionId,
        continued.stage
      );

      return {
        body: normalizeResult(
          existingSession.conversationId,
          continued.reply,
          continued.stage
        ),
      };
    } catch (error) {
      if (
        retryOnMissingSession &&
        error instanceof AssistantApiError &&
        error.code === "ASSISTANT_SESSION_NOT_FOUND"
      ) {
        if (conversationId) {
          assistantSessionStore.delete(conversationId);
        }

        return this.handleMessage({
          conversationId: undefined,
          message,
          retryOnMissingSession: false,
        });
      }

      throw error;
    }
  },
};
