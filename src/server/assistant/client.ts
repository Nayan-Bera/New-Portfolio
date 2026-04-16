import {
  AssistantApiError,
  extractAssistantErrorMessage,
  normalizeAssistantErrorCode,
} from "./errors";
import {
  AssistantApiErrorPayload,
  AssistantApiSuccess,
  AssistantStage,
} from "./types";

type AssistantRequestBody = Record<string, string>;
type AssistantRequestPayload = AssistantRequestBody | object;

const getRequiredEnv = (
  name: "ASSISTANT_API_BASE_URL" | "ASSISTANT_API_KEY"
) => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new AssistantApiError({
      code: "ASSISTANT_API_NOT_CONFIGURED",
      message: `Missing required environment variable: ${name}`,
    });
  }

  return value;
};

const parseJsonSafely = async (response: Response) => {
  const raw = await response.text();

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AssistantApiSuccess | AssistantApiErrorPayload;
  } catch {
    return raw;
  }
};

const normalizeSuccessPayload = (
  payload: AssistantApiSuccess | AssistantApiErrorPayload | string | null
) => {
  if (!payload || typeof payload === "string") {
    throw new AssistantApiError({
      code: "INVALID_ASSISTANT_RESPONSE",
      message: "Assistant API returned a non-JSON response.",
    });
  }

  const sessionId = payload.sessionId;
  const stage = payload.stage;
  const reply = payload.reply;

  if (
    typeof sessionId !== "string" ||
    typeof stage !== "string" ||
    typeof reply !== "string"
  ) {
    throw new AssistantApiError({
      code: "INVALID_ASSISTANT_RESPONSE",
      message: "Assistant API response is missing sessionId, stage, or reply.",
    });
  }

  return {
    sessionId,
    stage: stage as AssistantStage,
    reply: reply.trim(),
  };
};

export class AssistantApiClient {
  private getConfig() {
    return {
      baseUrl: getRequiredEnv("ASSISTANT_API_BASE_URL"),
      apiKey: getRequiredEnv("ASSISTANT_API_KEY"),
    };
  }

  private async request(
    path: "/assistant/chat" | "/assistant/verify-otp",
    body: AssistantRequestPayload
  ) {
    const { baseUrl, apiKey } = this.getConfig();

    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const payload = await parseJsonSafely(response);

    if (!response.ok) {
      const code = normalizeAssistantErrorCode(payload);

      throw new AssistantApiError({
        code,
        message: extractAssistantErrorMessage(payload),
        status: response.status,
        stage:
          payload && typeof payload !== "string" ? payload.stage : undefined,
        retryable: response.status >= 500 || response.status === 429,
        resetConversation: code === "ASSISTANT_SESSION_NOT_FOUND",
      });
    }

    return normalizeSuccessPayload(payload);
  }

  startSession() {
    return this.request("/assistant/chat", {});
  }

  sendMessage(sessionId: string, message: string) {
    return this.request("/assistant/chat", { sessionId, message });
  }

  verifyOtp(sessionId: string, otp: string) {
    return this.request("/assistant/verify-otp", { sessionId, otp });
  }
}

export const assistantApiClient = new AssistantApiClient();
