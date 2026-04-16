import { AssistantSessionRecord } from "./types";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24;

export interface AssistantSessionStore {
  get(conversationId: string): AssistantSessionRecord | null;
  set(record: AssistantSessionRecord): void;
  delete(conversationId: string): void;
}

class InMemoryAssistantSessionStore implements AssistantSessionStore {
  private readonly sessions = new Map<string, AssistantSessionRecord>();

  get(conversationId: string) {
    const record = this.sessions.get(conversationId);

    if (!record) {
      return null;
    }

    if (Date.now() - record.updatedAt > SESSION_TTL_MS) {
      this.sessions.delete(conversationId);
      return null;
    }

    return record;
  }

  set(record: AssistantSessionRecord) {
    this.sessions.set(record.conversationId, record);
  }

  delete(conversationId: string) {
    this.sessions.delete(conversationId);
  }
}

export const assistantSessionStore: AssistantSessionStore =
  new InMemoryAssistantSessionStore();
