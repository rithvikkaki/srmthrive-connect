
// Improved YouTube Search Edge Function: redeployed with extra logging to ensure env loads

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY");

  if (!YOUTUBE_API_KEY) {
    console.error("YOUTUBE_API_KEY Secret NOT found in Deno.env!");
    return new Response(
      JSON.stringify({ error: "YouTube API key not configured in server." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  try {
    const { query } = await req.json();
    if (!query) {
      return new Response(JSON.stringify({ error: "No search query provided." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=16&key=${YOUTUBE_API_KEY}`;
    console.log("Fetching YouTube API endpoint:", endpoint);
    const resp = await fetch(endpoint);

    if (!resp.ok) {
      // Try to parse Google error response
      let errJson: any = {};
      try {
        errJson = await resp.json();
      } catch {
        errJson = { error: "Unknown error from YouTube API." };
      }
      let errorMessage = "Failed to fetch from YouTube API.";
      if (errJson?.error?.message) {
        errorMessage = `YouTube API error: ${errJson.error.message}`;
      } else if (typeof errJson?.error === "string") {
        errorMessage = `YouTube API error: ${errJson.error}`;
      }
      console.error("YouTube API error:", errorMessage);
      return new Response(JSON.stringify({ error: errorMessage }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 502,
      });
    }
    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Generic error in youtube-search:", err);
    return new Response(JSON.stringify({ error: "Error contacting YouTube API" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
