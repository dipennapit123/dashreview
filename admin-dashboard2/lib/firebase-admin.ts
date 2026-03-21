import { getApps, initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { env } from "./env";

function getPrivateKey() {
  if (!env.firebasePrivateKey) return "";
  return env.firebasePrivateKey.replace(/\\n/g, "\n");
}

function initFirebaseAdmin() {
  if (getApps().length > 0) return getApps()[0];

  // Prefer explicit service account credentials in production.
  if (
    env.firebaseProjectId &&
    env.firebaseClientEmail &&
    env.firebasePrivateKey
  ) {
    return initializeApp({
      credential: cert({
        projectId: env.firebaseProjectId,
        clientEmail: env.firebaseClientEmail,
        privateKey: getPrivateKey(),
      }),
    });
  }

  // Fallback for environments with ADC configured.
  return initializeApp({
    credential: applicationDefault(),
    ...(env.firebaseProjectId ? { projectId: env.firebaseProjectId } : {}),
  });
}

const app = initFirebaseAdmin();
export const firebaseAdminAuth = getAuth(app);
