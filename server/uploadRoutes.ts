/**
 * Logo upload route — POST /api/upload-logo
 * Accepts multipart/form-data with a single "file" field (image/webp or any image).
 * Stores in S3 and returns { url }.
 * Protected: admin only.
 */

import { Request, Response, Express } from "express";
import multer, { FileFilterCallback } from "multer";
import { storagePut } from "./storage";
import { sdk } from "./_core/sdk";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB raw upload limit
  fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

async function getAdminFromRequest(req: Request): Promise<boolean> {
  try {
    const user = await sdk.authenticateRequest(req);
    return user?.role === "admin";
  } catch {
    return false;
  }
}

export function registerUploadRoutes(app: Express) {
  app.post(
    "/api/upload-logo",
    upload.single("file"),
    async (req: Request, res: Response) => {
      try {
        // Auth check
        const isAdmin = await getAdminFromRequest(req);
        if (!isAdmin) {
          res.status(403).json({ error: "Admin access required" });
          return;
        }

        if (!req.file) {
          res.status(400).json({ error: "No file provided" });
          return;
        }

        const suffix = Date.now().toString(36);
        const key = `logos/logo-${suffix}.webp`;
        const { url } = await storagePut(key, req.file.buffer, "image/webp");

        res.json({ url });
      } catch (err: unknown) {
        console.error("[UploadLogo]", err);
        res.status(500).json({ error: err instanceof Error ? err.message : "Upload failed" });
      }
    }
  );
}
