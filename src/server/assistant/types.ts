export const assistantStages = [
  "awaiting_name",
  "awaiting_email",
  "awaiting_otp",
  "ready",
] as const;

export type AssistantStage = (typeof assistantStages)[number] | string;

export type AssistantRequires = "name" | "email" | "otp" | null;

export type AssistantApiSuccess = {
  sessionId: string;
  stage: AssistantStage;
  reply: string;
};

export type AssistantErrorCode =
  | "API_KEY_REQUIRED"
  | "INVALID_API_KEY"
  | "MESSAGE_REQUIRED"
  | "SESSION_ID_REQUIRED"
  | "OTP_REQUIRED"
  | "ASSISTANT_SESSION_NOT_FOUND"
  | "ASSISTANT_OTP_NOT_PENDING"
  | "ASSISTANT_OTP_NOT_FOUND"
  | "ASSISTANT_OTP_EXPIRED"
  | "ASSISTANT_INVALID_OTP"
  | "ASSISTANT_EMAIL_NOT_VERIFIED"
  | "RATE_LIMIT_EXCEEDED"
  | "ASSISTANT_API_NOT_CONFIGURED"
  | "INVALID_ASSISTANT_RESPONSE"
  | "UPSTREAM_REQUEST_FAILED"
  | "INTERNAL_SERVER_ERROR";

export type AssistantApiErrorPayload = {
  sessionId?: string;
  code?: string;
  error?: string;
  message?: string;
  reply?: string;
  stage?: AssistantStage;
};

export type AssistantSessionRecord = {
  conversationId: string;
  sessionId: string;
  stage: AssistantStage;
  createdAt: number;
  updatedAt: number;
};

export type AssistantChatResult = {
  reply: string;
  stage: AssistantStage;
  requires: AssistantRequires;
  conversationId: string;
};
