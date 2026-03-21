import { create } from "zustand";
import type { Horoscope, ZodiacSign } from "../types";

interface SessionState {
  clerkUserId: string | null;
  token: string | null;
  zodiacSign: ZodiacSign | null;
  todayHoroscope: Horoscope | null;
  history: Horoscope[];
  historyZodiac: ZodiacSign | null;
  termsAccepted: boolean;
  consentLoaded: boolean;
  theme: "dark" | "system";
  defaultDayMode: "yesterday" | "today" | "tomorrow";
  setAuth: (payload: { clerkUserId: string; token: string }) => void;
  setZodiacSign: (sign: ZodiacSign | null) => void;
  setTodayHoroscope: (h: Horoscope | null) => void;
  setHistory: (items: Horoscope[], zodiacSign: ZodiacSign | null) => void;
  setTermsAccepted: (accepted: boolean) => void;
  setConsentLoaded: (loaded: boolean) => void;
  setTheme: (theme: "dark" | "system") => void;
  setDefaultDayMode: (mode: "yesterday" | "today" | "tomorrow") => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  clerkUserId: null,
  token: null,
  zodiacSign: null,
  todayHoroscope: null,
  history: [],
  historyZodiac: null,
  termsAccepted: false,
  consentLoaded: false,
  theme: "dark",
  defaultDayMode: "today",
  setAuth: ({ clerkUserId, token }) => set({ clerkUserId, token }),
  setZodiacSign: (zodiacSign) => set({ zodiacSign }),
  setTodayHoroscope: (todayHoroscope) => set({ todayHoroscope }),
  setHistory: (history, historyZodiac) => set({ history, historyZodiac }),
  setTermsAccepted: (termsAccepted) => set({ termsAccepted }),
  setConsentLoaded: (consentLoaded) => set({ consentLoaded }),
  setTheme: (theme) => set({ theme }),
  setDefaultDayMode: (defaultDayMode) => set({ defaultDayMode }),
  logout: () =>
    set({
      clerkUserId: null,
      token: null,
      zodiacSign: null,
      todayHoroscope: null,
      history: [],
      historyZodiac: null,
      termsAccepted: false,
      consentLoaded: false,
      theme: "dark",
      defaultDayMode: "today",
    }),
}));

