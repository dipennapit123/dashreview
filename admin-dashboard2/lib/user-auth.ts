import { headers } from "next/headers";
import { env } from "./env";
import { ApiError } from "./api-error";
import { firebaseAdminAuth } from "./firebase-admin";

/**
 * Verifies Firebase ID token (Authorization: Bearer <token>) and returns uid.
 * For local/dev fallback only, x-clerk-user-id is accepted when explicitly enabled.
 */
export async function getUserIdFromRequest(): Promise<string> {
  const h = await headers();
  const authHeader = h.get("authorization");
  const headerUserId = h.get("x-clerk-user-id");

  if (authHeader?.startsWith("Bearer ")) {
    try {
      const token = authHeader.slice("Bearer ".length);
      const decoded = await firebaseAdminAuth.verifyIdToken(token, true);
      if (!decoded?.uid) {
        throw new ApiError(401, "Invalid token.");
      }
      return decoded.uid;
    } catch (e) {
      console.error(
        "[user-auth] Firebase verifyIdToken failed:",
        e instanceof Error ? e.message : e,
      );
      throw new ApiError(401, "Invalid token.");
    }
  }

  // Optional fallback for local testing only.
  if (process.env.ALLOW_HEADER_USER_ID_FALLBACK === "true" && headerUserId) {
    return headerUserId;
  }

  throw new ApiError(401, "Missing authenticated user.");
}
