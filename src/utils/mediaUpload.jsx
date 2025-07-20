import { createClient } from "@supabase/supabase-js";

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllZ3hhcHJtcXBhbGdpbGdpb29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MTY5MjMsImV4cCI6MjA2ODQ5MjkyM30.5x8wqc8Gh9HIe-lVypjz-M8Rqp2GHpGnkeAKaoeNz5o`;

const url = "/https://yegxaprmqpalgilgiooq.supabase.com";

export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("File not added");
    }
    let fileName = file.name;
    const extension = fileName.split(".")[fileName.split(".").length - 1];

    const supabase = createClient(url, key);

    const timestamp = new Date().getTime();

    fileName = timestamp +file.name+ "." + extension;

    supabase.storage.from("images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    }).then(()=>{
      const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
      resolve(publicUrl);
    }).catch((err)=>{
      reject(err);
    });
  });
}
