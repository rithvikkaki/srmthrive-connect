
import { useState } from "react";

type Params = {
  message: string;
  apiKey: string;
};

/*
The Gemini API is returning 404 errors for the previous endpoint.
According to the latest Google Generative Language API docs:
- Use model `gemini-1.0-pro-latest`
- Endpoint: https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro-latest:generateContent

*/

export function useGeminiReply() {
  const [loading, setLoading] = useState(false);

  async function getGeminiReply({ message, apiKey }: Params): Promise<string> {
    setLoading(true);
    try {
      const url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro-latest:generateContent?key=" + apiKey;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      });
      const data = await response.json();
      setLoading(false);

      // Check for errors in response
      if (data.error) {
        return `Error: ${data.error.message || "Unknown error from Gemini"}`;
      }

      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't think of a reply."
      );
    } catch (err: any) {
      setLoading(false);
      return "Error reaching Gemini. Please try again.";
    }
  }
  return { getGeminiReply, loading };
}
