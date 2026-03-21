import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete account & data | AstraDaily",
  description: "Request deletion of your AstraDaily account and associated data.",
};

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/40 backdrop-blur">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Delete your account and data
        </h1>
        <p className="mt-3 text-sm text-slate-300">
          You can request that we delete your AstraDaily account and all
          associated data (e.g. your sign-in profile, chosen zodiac sign, and
          usage information).
        </p>
        <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <p className="text-sm font-medium text-slate-200">
            How to request deletion
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Send an email to us at{" "}
            <a
              href="mailto:dipennapit45@gmail.com?subject=AstraDaily%20Account%20Deletion%20Request"
              className="font-medium text-[#7f13ec] underline hover:no-underline"
            >
              dipennapit45@gmail.com
            </a>{" "}
            with the subject line &quot;AstraDaily Account Deletion Request&quot;
            and the email address you use to sign in to the app. We will
            verify that the request comes from the account holder (for example
            by confirming the email or replying to your account email) before
            deleting your account and data. Once verified, we will process the
            request and confirm when removal is complete.
          </p>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          For more about how we handle your data, see our{" "}
          <a
            href="/privacy"
            className="text-slate-400 underline hover:text-slate-300"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}
