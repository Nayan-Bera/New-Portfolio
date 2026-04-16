import {
  AssistantApiErrorPayload,
  AssistantErrorCode,
  AssistantStage,
} from "./types";

const knownAssistantErrorCodes = new Set<AssistantErrorCode>([
  "API_KEY_REQUIRED",
  "INVALID_API_KEY",
  "MESSAGE_REQUIRED",
  "SESSION_ID_REQUIRED",
  "OTP_REQUIRED",
  "ASSISTANT_SESSION_NOT_FOUND",
  "ASSISTANT_OTP_NOT_PENDING",
  "ASSISTANT_OTP_NOT_FOUND",
  "ASSISTANT_OTP_EXPIRED",
  "ASSISTANT_INVALID_OTP",
  "ASSISTANT_EMAIL_NOT_VERIFIED",
  "RATE_LIMIT_EXCEEDED",
  "ASSISTANT_API_NOT_CONFIGURED",
  "INVALID_ASSISTANT_RESPONSE",
  "UPSTREAM_REQUEST_FAILED",
  "INTERNAL_SERVER_ERROR",
]);

const defaultMessages: Record<AssistantErrorCode, string> = {
  API_KEY_REQUIRED: "Assistant API key is required.",
  INVALID_API_KEY: "Assistant API key is invalid.",
  MESSAGE_REQUIRED: "A message is required.",
  SESSION_ID_REQUIRED: "Session ID is required.",
  OTP_REQUIRED: "An OTP is required.",
  ASSISTANT_SESSION_NOT_FOUND: "Assistant session was not found.",
  ASSISTANT_OTP_NOT_PENDING: "There is no OTP verification pending.",
  ASSISTANT_OTP_NOT_FOUND: "OTP challenge was not found.",
  ASSISTANT_OTP_EXPIRED: "OTP has expired. Please request a new one.",
  ASSISTANT_INVALID_OTP: "OTP is invalid.",
  ASSISTANT_EMAIL_NOT_VERIFIED: "Email address is not verified yet.",
  RATE_LIMIT_EXCEEDED: "Too many assistant requests. Please try again shortly.",
  ASSISTANT_API_NOT_CONFIGURED: "Assistant API is not configured.",
  INVALID_ASSISTANT_RESPONSE: "Assistant API returned an invalid response.",
  UPSTREAM_REQUEST_FAILED: "Assistant API request failed.",
  INTERNAL_SERVER_ERROR: "Unexpected assistant server error.",
};

const defaultStatuses: Record<AssistantErrorCode, number> = {
  API_KEY_REQUIRED: 500,
  INVALID_API_KEY: 502,
  MESSAGE_REQUIRED: 400,
  SESSION_ID_REQUIRED: 400,
  OTP_REQUIRED: 400,
  ASSISTANT_SESSION_NOT_FOUND: 404,
  ASSISTANT_OTP_NOT_PENDING: 409,
  ASSISTANT_OTP_NOT_FOUND: 404,
  ASSISTANT_OTP_EXPIRED: 410,
  ASSISTANT_INVALID_OTP: 401,
  ASSISTANT_EMAIL_NOT_VERIFIED: 403,
  RATE_LIMIT_EXCEEDED: 429,
  ASSISTANT_API_NOT_CONFIGURED: 500,
  INVALID_ASSISTANT_RESPONSE: 502,
  UPSTREAM_REQUEST_FAILED: 502,
  INTERNAL_SERVER_ERROR: 500,
};

export class AssistantApiError extends Error {
  code: AssistantErrorCode;
  status: number;
  stage?: AssistantStage;
  retryable: boolean;
  resetConversation: boolean;

  constructor({
    code,
    message,
    status,
    stage,
    retryable = false,
    resetConversation = false,
  }: {
    code: AssistantErrorCode;
    message?: string;
    status?: number;
    stage?: AssistantStage;
    retryable?: boolean;
    resetConversation?: boolean;
  }) {
    super(message || defaultMessages[code]);
    this.name = "AssistantApiError";
    this.code = code;
    this.status = status || defaultStatuses[code];
    this.stage = stage;
    this.retryable = retryable;
    this.resetConversation = resetConversation;
  }
}

export const isAssistantApiError = (
  error: unknown
): error is AssistantApiError => error instanceof AssistantApiError;

export const normalizeAssistantErrorCode = (
  payload?: AssistantApiErrorPayload | string | null
): AssistantErrorCode => {
  if (
    typeof payload === "string" &&
    knownAssistantErrorCodes.has(payload as AssistantErrorCode)
  ) {
    return payload as AssistantErrorCode;
  }

  if (!payload || typeof payload === "string") {
    return "UPSTREAM_REQUEST_FAILED";
  }

  const candidate = payload.code || payload.error;

  if (
    candidate &&
    knownAssistantErrorCodes.has(candidate as AssistantErrorCode)
  ) {
    return candidate as AssistantErrorCode;
  }

  return "UPSTREAM_REQUEST_FAILED";
};

export const extractAssistantErrorMessage = (
  payload?: AssistantApiErrorPayload | string | null
) => {
  if (typeof payload === "string") {
    return payload.trim() || undefined;
  }

  return payload?.message?.trim() || payload?.reply?.trim() || undefined;
};

export const createAssistantErrorResponse = (error: AssistantApiError) => ({
  error: {
    code: error.code,
    message: error.message,
    stage: error.stage,
    retryable: error.retryable,
  },
});
