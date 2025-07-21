import { createClient } from "@supabase/supabase-js";

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllZ3hhcHJtcXBhbGdpbGdpb29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MTY5MjMsImV4cCI6MjA2ODQ5MjkyM30.5x8wqc8Gh9HIe-lVypjz-M8Rqp2GHpGnkeAKaoeNz5o`;

const url = "https://yegxaprmqpalgilgiooq.supabase.co"; 

const supabase = createClient(url, key);

export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("File not added");
      return;
    }

    let fileName = file.name;
    const extension = fileName.split(".").pop();
    const timestamp = new Date().getTime();
    fileName = `${timestamp}-${fileName}.${extension}`;

    supabase.storage.from("images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,

     }).then(() => {

      const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;

      resolve(publicUrl);

    }).catch((err) => {
      reject(err);
    });
  });
}
