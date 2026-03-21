import * as SecureStore from "expo-secure-store";

const TERMS_CONSENT_KEY = "astradaily_terms_consent_v1";

export async function loadTermsConsent(): Promise<boolean> {
  try {
    const value = await SecureStore.getItemAsync(TERMS_CONSENT_KEY);
    return value === "true";
  } catch {
    return false;
  }
}

export async function saveTermsConsent(accepted: boolean): Promise<void> {
  try {
    if (accepted) {
      await SecureStore.setItemAsync(TERMS_CONSENT_KEY, "true");
    } else {
      await SecureStore.deleteItemAsync(TERMS_CONSENT_KEY);
    }
  } catch {
    // Non-fatal; local consent can be re-confirmed if storage fails.
  }
}
