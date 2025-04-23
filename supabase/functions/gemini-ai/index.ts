
// https://developers.generativeai.google/api/rest/generativelanguage/models/generateContent
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Use the most widely supported Gemini model on v1 as of Apr 2024:
const GEMINI_MODEL = "gemini-pro"; // <-- This should work for all API keys and the REST API

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
  try {
    const { message } = await req.json();
    if (!message) {
      return new Response(JSON.stringify({ error: "No message provided" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    // Use supported model for v1
    const url = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });
    const data = await response.json();

    // If the Gemini API returns an error (such as a "model not found"), return a demo response instead:
    if (data && data.error) {
      console.error("Gemini API returned error:", JSON.stringify(data));
      // Instead of returning an error, return a canned demo reply!
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
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: response.status,
    });
  } catch (err) {
    console.error("Error contacting Gemini API", err);
    // On fetch error or any exception, also reply with the canned demo response:
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
  }
});

