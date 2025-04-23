
// https://developers.generativeai.google/api/rest/generativelanguage/models/generateContent
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Always reply with the WhatsApp Gemini AI demo reply that echoes the user message and mentions the contact name.
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  let contactName = "your contact";
  let message = "";
  try {
    const body = await req.json();
    message = typeof body.message === "string" ? body.message : "";
    if (typeof body.contactName === "string" && body.contactName.trim() !== "") {
      contactName = body.contactName.trim();
    }
  } catch (_) {
    // Fail gracefully: Use the defaults if parsing fails
  }
  const replyText = `Hello from WhatsApp Gemini! You said to ${contactName}: "${message}"`;

  return new Response(
    JSON.stringify({
      candidates: [
        {
          content: {
            parts: [
              {
                text: replyText
              }
            ]
          }
        }
      ]
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    }
  );
});
