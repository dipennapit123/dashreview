import express from "express";
import cors from "cors";
import morgan from "morgan";
import { json } from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

// Origins allowed for CORS (admin dashboard local + production)
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];
if (process.env.CORS_ORIGIN) {
  ALLOWED_ORIGINS.push(...process.env.CORS_ORIGIN.split(",").map((o) => o.trim()));
}

export const createApp = () => {
  const app = express();

  // CORS first: explicit origins so Vercel serverless always sends the header
  app.use((req, res, next) => {
    const origin = req.header("Origin");
    const allowOrigin =
      origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    res.setHeader("Access-Control-Allow-Origin", allowOrigin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });

  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
        return cb(null, ALLOWED_ORIGINS[0]);
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.use(morgan("dev"));
  app.use(json());

  app.use("/api", router);

  // 404 for unmatched routes (so response goes through CORS and has correct headers)
  app.use((_req, res) => {
    res.status(404).json({ success: false, error: { message: "Not found" } });
  });

  app.use(errorHandler);

  return app;
};

