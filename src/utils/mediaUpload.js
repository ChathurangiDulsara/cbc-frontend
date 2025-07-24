import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yegxaprmqpalgilgiooq.supabase.co";
const SUPABASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllZ3hhcHJtcXBhbGdpbGdpb29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MTY5MjMsImV4cCI6MjA2ODQ5MjkyM30.5x8wqc8Gh9HIe-lVypjz-M8Rqp2GHpGnkeAKaoeNz5o`;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function sanitizeFileName(name) {
  return name
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "");
}

export default function uploadMediaToSupabase(file) {
  return new Promise(async (resolve, reject) => {
    if (!file) {
      reject("File not added");
      return;
    }

    try {
      const timestamp = Date.now();
      const cleanName = sanitizeFileName(file.name);
      const fileName = `${timestamp}-${cleanName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        reject(uploadError.message || "Failed to upload file");
        return;
      }

      const { publicUrl, error: urlError } = supabase.storage
        .from("images")
        .getPublicUrl(data.path);

      if (urlError) {
        reject(urlError.message || "Failed to get public URL");
        return;
      }

      resolve(publicUrl);
    } catch (err) {
      reject(err.message || "Unknown upload error");
    }
  });
}
