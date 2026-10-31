import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const oauth2Client = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  ? new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.APP_URL}/auth/callback`
    )
  : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // OAuth URL
  app.get("/api/auth/url", (req, res) => {
    if (!oauth2Client) {
      return res.status(501).json({ error: "Google OAuth credentials are not configured on the server." });
    }
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/drive.file"],
      prompt: "consent",
    });
    res.json({ url });
  });

  // OAuth Callback
  app.get("/auth/callback", async (req, res) => {
    if (!oauth2Client) {
      return res.status(501).send("Google OAuth credentials are not configured on the server.");
    }
    const { code } = req.query;
    try {
      const { tokens } = await oauth2Client.getToken(code as string);
      // In a real app, store these tokens securely (e.g., in a database or session)
      // For this demo, we'll just send a success message
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', tokens: ${JSON.stringify(tokens)} }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. You can close this window.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("Error exchanging code for tokens:", error);
      res.status(500).send("Authentication failed");
    }
  });

  // Upload to Drive
  app.post("/api/upload", async (req, res) => {
    const { pdfBase64, fileName, tokens } = req.body;
    
    if (!tokens) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const auth = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );
      auth.setCredentials(tokens);

      const drive = google.drive({ version: "v3", auth });
      
      const fileMetadata = {
        name: fileName,
        parents: process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : [],
      };

      const media = {
        mimeType: "application/pdf",
        body: Buffer.from(pdfBase64, 'base64'),
      };

      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id, webViewLink",
      });

      res.json({ success: true, fileId: response.data.id, link: response.data.webViewLink });
    } catch (error) {
      console.error("Error uploading to Drive:", error);
      res.status(500).json({ error: "Upload failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
