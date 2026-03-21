import axios from "axios";
import type { ZodiacSign } from "../types";
import { api } from "./api";
import { getTimezone } from "./activity";

interface BootstrapSessionParams {
  clerkUserId: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  token?: string | null;
}

interface UserMeResponse {
  success: boolean;
  data?: {
    zodiacSign?: ZodiacSign | null;
  };
}

function buildHeaders(params: { clerkUserId: string; token?: string | null }) {
  return {
    ...(params.token ? { Authorization: `Bearer ${params.token}` } : {}),
    "x-clerk-user-id": params.clerkUserId,
  };
}

export async function bootstrapSessionProfile(
  params: BootstrapSessionParams,
): Promise<{ zodiacSign: ZodiacSign | null }> {
  const headers = buildHeaders(params);

  try {
    const res = await api.get<UserMeResponse>("/users/me", { headers });
    return { zodiacSign: res.data.data?.zodiacSign ?? null };
  } catch (err) {
    if (!axios.isAxiosError(err) || err.response?.status !== 404) {
      throw err;
    }
  }

  await api.post(
    "/users/sync-clerk-user",
    {
      clerkUserId: params.clerkUserId,
      email: params.email,
      fullName: params.fullName,
      avatarUrl: params.avatarUrl,
      timezone: getTimezone(),
    },
    { headers },
  );

  const res = await api.get<UserMeResponse>("/users/me", { headers });
  return { zodiacSign: res.data.data?.zodiacSign ?? null };
}
