
// https://developers.generativeai.google/api/rest/generativelanguage/models/generateContent
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Always reply with the canned demo Gemini AI reply (never call real Gemini API)
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  // Always return demo reply, no matter what
  return new Response(
    JSON.stringify({
      candidates: [
        {
          content: {
            parts: [
              {
                text: "Hello, this is a demo Gemini AI reply! (The real Gemini API isn't available. If you'd like to see real AI responses, set up your Google AI Studio API key and check your Gemini API access.)"
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
